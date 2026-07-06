-- ============================================================================
-- Home Rentals — Supabase schema (Phase 2)
-- Run this in the Supabase SQL editor when wiring up the database.
-- Phase 1 (the deployed app) runs on mock data and does NOT need this yet.
-- ============================================================================

-- Enums --------------------------------------------------------------------
create type user_role       as enum ('landlord', 'tenant');
create type unit_status     as enum ('vacant', 'occupied');
create type tenant_status   as enum ('active', 'evicted', 'past_due');
create type payment_status  as enum ('paid', 'pending', 'late');
create type notif_status    as enum ('sent', 'failed');

-- 1. profiles --------------------------------------------------------------
create table public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  role         user_role not null default 'tenant',
  full_name    text not null,
  phone_number text,
  created_at   timestamptz not null default now()
);

-- 2. properties ------------------------------------------------------------
create table public.properties (
  id          uuid primary key default gen_random_uuid(),
  landlord_id uuid not null references public.profiles (id) on delete cascade,
  name        text not null,
  address     text,
  created_at  timestamptz not null default now()
);

-- 3. units -----------------------------------------------------------------
create table public.units (
  id          uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties (id) on delete cascade,
  unit_number text not null,
  rent_amount numeric(12,2) not null default 0,
  status      unit_status not null default 'vacant',
  created_at  timestamptz not null default now()
);

-- 4. tenants ---------------------------------------------------------------
create table public.tenants (
  id              uuid primary key default gen_random_uuid(),
  profile_id      uuid references public.profiles (id) on delete set null,
  unit_id         uuid references public.units (id) on delete set null,
  rent_start_date date,
  rent_due_day    int not null default 5 check (rent_due_day between 1 and 28),
  whatsapp_number text,
  status          tenant_status not null default 'active'
);

-- 5. payments --------------------------------------------------------------
create table public.payments (
  id             uuid primary key default gen_random_uuid(),
  tenant_id      uuid not null references public.tenants (id) on delete cascade,
  amount_paid    numeric(12,2) not null default 0,
  payment_date   date,
  billing_period text not null,            -- 'MM-YYYY'
  status         payment_status not null default 'pending',
  created_at     timestamptz not null default now()
);

-- 6. notifications ---------------------------------------------------------
create table public.notifications (
  id              uuid primary key default gen_random_uuid(),
  recipient_phone text not null,
  message_body    text not null,
  sent_at         timestamptz not null default now(),
  status          notif_status not null default 'sent'
);

-- ============================================================================
-- Row Level Security
-- ============================================================================
alter table public.profiles      enable row level security;
alter table public.properties    enable row level security;
alter table public.units         enable row level security;
alter table public.tenants       enable row level security;
alter table public.payments      enable row level security;
alter table public.notifications enable row level security;

-- Everyone can read/update their own profile.
create policy "own profile: read"   on public.profiles for select using (auth.uid() = id);
create policy "own profile: update" on public.profiles for update using (auth.uid() = id);
create policy "own profile: insert" on public.profiles for insert with check (auth.uid() = id);

-- Landlords manage their own properties.
create policy "landlord owns properties" on public.properties
  for all using (landlord_id = auth.uid()) with check (landlord_id = auth.uid());

-- Units belong to a landlord via their property.
create policy "landlord owns units" on public.units
  for all using (
    exists (select 1 from public.properties p
            where p.id = units.property_id and p.landlord_id = auth.uid())
  );

-- Landlords manage tenants in their units; tenants can read their own row.
create policy "landlord manages tenants" on public.tenants
  for all using (
    exists (
      select 1 from public.units u
      join public.properties p on p.id = u.property_id
      where u.id = tenants.unit_id and p.landlord_id = auth.uid()
    )
  );
create policy "tenant reads self" on public.tenants
  for select using (profile_id = auth.uid());

-- Payments: landlord (via tenant->unit->property) full access; tenant reads own.
create policy "landlord manages payments" on public.payments
  for all using (
    exists (
      select 1 from public.tenants t
      join public.units u on u.id = t.unit_id
      join public.properties p on p.id = u.property_id
      where t.id = payments.tenant_id and p.landlord_id = auth.uid()
    )
  );
create policy "tenant reads own payments" on public.payments
  for select using (
    exists (select 1 from public.tenants t
            where t.id = payments.tenant_id and t.profile_id = auth.uid())
  );

-- ============================================================================
-- Auto-create a profile row when a new auth user signs up.
-- ============================================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, role, full_name, phone_number)
  values (
    new.id,
    coalesce((new.raw_user_meta_data ->> 'role')::user_role, 'tenant'),
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.raw_user_meta_data ->> 'phone_number'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

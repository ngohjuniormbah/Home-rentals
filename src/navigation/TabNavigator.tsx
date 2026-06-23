import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BuildingsScreen } from '@/screens/BuildingsScreen';
import { ChatsScreen } from '@/screens/ChatsScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { TenantsScreen } from '@/screens/TenantsScreen';
import { colors } from '@/theme';
import { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

const ICONS: Record<keyof TabParamList, keyof typeof Ionicons.glyphMap> = {
  Home: 'grid',
  Buildings: 'business',
  Tenants: 'people',
  Chats: 'chatbubble-ellipses',
  Settings: 'settings',
};

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          height: 88,
          paddingTop: 8,
          paddingBottom: 28,
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={focused ? ICONS[route.name] : (`${ICONS[route.name]}-outline` as keyof typeof Ionicons.glyphMap)}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Buildings" component={BuildingsScreen} />
      <Tab.Screen name="Tenants" component={TenantsScreen} />
      <Tab.Screen name="Chats" component={ChatsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

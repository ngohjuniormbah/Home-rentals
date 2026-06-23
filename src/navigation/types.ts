import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type TabParamList = {
  Home: undefined;
  Buildings: undefined;
  Tenants: undefined;
  Chats: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Tabs: undefined;
};

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;

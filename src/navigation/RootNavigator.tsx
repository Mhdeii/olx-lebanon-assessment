import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import { t } from '../i18n/t';
import { TranslationKey } from '../i18n/strings';
import { CustomText } from '../components/CustomText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/Home/HomeScreen';
import { LanguageToggle } from '../components/LanguageToggle';
import SearchResultsScreen from '../screens/Search/SearchResultsScreen';
import SearchFiltersScreen from '../screens/Search/SearchFiltersScreen';
import { COLORS } from '../constants/colors';
import { View, Text } from 'react-native';

const PlaceholderScreen = ({ tx, children }: { tx: TranslationKey; children?: React.ReactNode }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
    <CustomText tx={tx} style={{ fontSize: 18, fontWeight: '600', marginBottom: 20 }} />
    {children}
  </View>
);

export type RootStackParamList = {
  MainTabs: undefined;
  SearchResults: { categoryId?: string; query?: string };
  SearchFilters: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

import AccountScreen from '../screens/Account/AccountScreen';

const TabNavigator = observer(() => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.black,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          height: 60,
          paddingBottom: 8,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: t('home'),
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />
        }}
      />
      <Tab.Screen
        name="Chats"
        children={() => <PlaceholderScreen tx="chats" />}
        options={{
          tabBarLabel: t('chats'),
          tabBarIcon: ({ color, size }) => <Ionicons name="chatbubbles-outline" size={size} color={color} />
        }}
      />
      <Tab.Screen
        name="Sell"
        children={() => <PlaceholderScreen tx="sell" />}
        options={{
          tabBarLabel: t('sell'),
          tabBarIcon: ({ color }) => (
            <View style={{
              backgroundColor: COLORS.primary,
              width: 50,
              height: 50,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: -20,
              borderWidth: 4,
              borderColor: COLORS.white,
            }}>
              <Ionicons name="add" size={30} color={COLORS.black} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MyAds"
        children={() => <PlaceholderScreen tx="my_ads" />}
        options={{
          tabBarLabel: t('my_ads'),
          tabBarIcon: ({ color, size }) => <Ionicons name="document-text-outline" size={size} color={color} />
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: t('account'),
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />
        }}
      />
    </Tab.Navigator>
  );
});

const RootNavigator = observer(() => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.white,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: COLORS.textPrimary,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}>
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchResults"
        component={SearchResultsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchFilters"
        component={SearchFiltersScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
});

export default RootNavigator;

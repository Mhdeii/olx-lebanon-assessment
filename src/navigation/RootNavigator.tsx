import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home/HomeScreen';
import SearchResultsScreen from '../screens/Search/SearchResultsScreen';
import SearchFiltersScreen from '../screens/Search/SearchFiltersScreen';
import {COLORS} from '../constants/colors';

export type RootStackParamList = {
  Home: undefined;
  SearchResults: {categoryId?: string; query?: string};
  SearchFilters: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
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
        name="Home" 
        component={HomeScreen} 
        options={{headerShown: false}} 
      />
      <Stack.Screen 
        name="SearchResults" 
        component={SearchResultsScreen} 
        options={{title: ''}} // Dynamic title handled in screen
      />
      <Stack.Screen 
        name="SearchFilters" 
        component={SearchFiltersScreen} 
        options={{title: 'Filters'}} 
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;

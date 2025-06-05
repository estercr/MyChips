import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DashboardScreen from '../views/Dashboard/DashboardScreen';
import CategoriesScreen from '../views/Categories/CategoriesScreen';
import ExpensesScreen from '../views/Expenses/ExpensesScreen';

import Feather from 'react-native-vector-icons/Feather';

export type CategoriesStackParamList = {
  Categories: undefined;
  Expenses: { categoryId: string };
};

export type RootTabParamList = {
  Dashboard: undefined;
  CategoriesStack: undefined;
};

const Stack = createNativeStackNavigator<CategoriesStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function CategoriesStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categories" component={CategoriesScreen} options={{ title: 'Categorias' }} />
      <Stack.Screen name="Expenses" component={ExpensesScreen} options={{ title: 'Despesas' }}/>
    </Stack.Navigator>
  );
}

const tabBarIcon = (routeName: string, color: string, sizeIcon: number) => {
  const icons: Record<string, string> = {
                Dashboard: 'pie-chart',
                CategoriesStack: 'grid',
              };
  return <Feather name={icons[routeName]} size={sizeIcon} color={color} />;
  };

//TODO: Esse dark mode é legal mas não está funcionando direito, talvez seja por causa do tema do react navigation. Verificar isso depois
//TODO: ajustar navegação.

export default function AppNavigator() {
  const scheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => tabBarIcon(route.name, color, size),
            tabBarActiveTintColor: '#1e90ff',
            tabBarInactiveTintColor: '#999',
          })}
        >
          <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard' }} />
          <Tab.Screen name="CategoriesStack" component={CategoriesStackNavigator} options={{ title: 'Categorias' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

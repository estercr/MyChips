import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DashboardScreen from '../views/Dashboard/DashboardScreen';
import CategoriesScreen from '../views/Categories/CategoriesScreen';
import ExpensesScreen from '../views/Expenses/ExpensesScreen';

export type RootStackParamList = {
  Dashboard: undefined;
  Categories: undefined;
  Expenses: { categoryId: string };
};

const Tab = createBottomTabNavigator<RootStackParamList>();

//TODO: Implementar ícones para as abas
//TODO: Esse dark mode é legal mas não está funcionando direito, talvez seja por causa do tema do react navigation. Verificar isso depois
//TODO: ajustar navegação.
export default function AppNavigator() {
  const scheme = useColorScheme();

  return (
    <SafeAreaProvider>
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Tab.Navigator>
          <Tab.Screen name="Dashboard" component={DashboardScreen} />
          <Tab.Screen name="Categories" component={CategoriesScreen} />
          <Tab.Screen name="Expenses" component={ExpensesScreen} />
        </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}

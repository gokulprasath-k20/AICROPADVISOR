import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import CropRecommendationScreen from './src/screens/CropRecommendationScreen';
import CropPricesScreen from './src/screens/CropPricesScreen';
import WeatherScreen from './src/screens/WeatherScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CropDetailsScreen from './src/screens/CropDetailsScreen';
import InvestmentAnalysisScreen from './src/screens/InvestmentAnalysisScreen';

// Import theme
import { theme } from './src/theme/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Main Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Recommend') {
            iconName = focused ? 'leaf' : 'leaf-outline';
          } else if (route.name === 'Prices') {
            iconName = focused ? 'trending-up' : 'trending-up-outline';
          } else if (route.name === 'Weather') {
            iconName = focused ? 'cloud' : 'cloud-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Crop Advisor' }}
      />
      <Tab.Screen 
        name="Recommend" 
        component={CropRecommendationScreen} 
        options={{ title: 'Crop Advice' }}
      />
      <Tab.Screen 
        name="Prices" 
        component={CropPricesScreen} 
        options={{ title: 'Market Prices' }}
      />
      <Tab.Screen 
        name="Weather" 
        component={WeatherScreen} 
        options={{ title: 'Weather' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

// Root Stack Navigator
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="MainTabs" 
          component={MainTabs} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="CropDetails" 
          component={CropDetailsScreen}
          options={{ 
            title: 'Crop Details',
            headerStyle: { backgroundColor: theme.colors.primary },
            headerTintColor: '#fff'
          }}
        />
        <Stack.Screen 
          name="InvestmentAnalysis" 
          component={InvestmentAnalysisScreen}
          options={{ 
            title: 'Investment Analysis',
            headerStyle: { backgroundColor: theme.colors.primary },
            headerTintColor: '#fff'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar style="light" backgroundColor={theme.colors.primary} />
      <AppNavigator />
    </PaperProvider>
  );
}

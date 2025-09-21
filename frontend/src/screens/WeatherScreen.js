import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Dimensions,
} from 'react-native';
import {
  Card,
  Title,
  Surface,
  Button,
  ActivityIndicator,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme, gradients } from '../theme/theme';
import * as Location from 'expo-location';

const { width } = Dimensions.get('window');

const WeatherScreen = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState({
    current: {
      temperature: 28,
      humidity: 75,
      condition: 'Partly Cloudy',
      windSpeed: 12,
      pressure: 1013,
      visibility: 10,
      uvIndex: 6,
    },
    forecast: [
      { day: 'आज', temp: 28, condition: 'partly-sunny', humidity: 75, rainfall: 0 },
      { day: 'कल', temp: 30, condition: 'sunny', humidity: 70, rainfall: 0 },
      { day: 'परसों', temp: 26, condition: 'rainy', humidity: 85, rainfall: 15 },
      { day: 'बुधवार', temp: 25, condition: 'cloudy', humidity: 80, rainfall: 5 },
      { day: 'गुरुवार', temp: 29, condition: 'partly-sunny', humidity: 72, rainfall: 0 },
    ]
  });
  const [district, setDistrict] = useState('Ranchi');

  useEffect(() => {
    getLocationAndWeather();
  }, []);

  const getLocationAndWeather = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      
      // Simulate weather data based on location
      // In a real app, you would call a weather API here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
    } catch (error) {
      console.error('Error getting location:', error);
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getLocationAndWeather();
    setRefreshing(false);
  };

  const getWeatherIcon = (condition) => {
    const icons = {
      'sunny': 'sunny',
      'partly-sunny': 'partly-sunny',
      'cloudy': 'cloudy',
      'rainy': 'rainy',
      'thunderstorm': 'thunderstorm',
    };
    return icons[condition] || 'partly-sunny';
  };

  const getWeatherColor = (condition) => {
    const colors = {
      'sunny': '#FF9800',
      'partly-sunny': '#FFC107',
      'cloudy': '#9E9E9E',
      'rainy': '#2196F3',
      'thunderstorm': '#673AB7',
    };
    return colors[condition] || '#FFC107';
  };

  const getConditionText = (condition) => {
    const conditions = {
      'sunny': 'धूप',
      'partly-sunny': 'आंशिक धूप',
      'cloudy': 'बादल',
      'rainy': 'बारिश',
      'thunderstorm': 'तूफान',
    };
    return conditions[condition] || 'सामान्य';
  };

  const getUVIndexText = (uvIndex) => {
    if (uvIndex <= 2) return 'कम';
    if (uvIndex <= 5) return 'मध्यम';
    if (uvIndex <= 7) return 'उच्च';
    if (uvIndex <= 10) return 'बहुत उच्च';
    return 'अत्यधिक';
  };

  const getUVIndexColor = (uvIndex) => {
    if (uvIndex <= 2) return '#4CAF50';
    if (uvIndex <= 5) return '#FF9800';
    if (uvIndex <= 7) return '#F44336';
    if (uvIndex <= 10) return '#9C27B0';
    return '#E91E63';
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>मौसम की जानकारी लोड हो रही है...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      {/* Current Weather Header */}
      <LinearGradient colors={gradients.primary} style={styles.header}>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={20} color="#fff" />
          <Text style={styles.locationText}>{district}, झारखंड</Text>
        </View>
        
        <View style={styles.currentWeatherContainer}>
          <Ionicons 
            name={getWeatherIcon(weatherData.current.condition)} 
            size={80} 
            color="#fff" 
          />
          <Text style={styles.currentTemp}>
            {weatherData.current.temperature}°C
          </Text>
          <Text style={styles.currentCondition}>
            {getConditionText(weatherData.current.condition)}
          </Text>
        </View>
      </LinearGradient>

      {/* Weather Details */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>विस्तृत जानकारी</Title>
        <View style={styles.detailsGrid}>
          <Surface style={styles.detailCard}>
            <Ionicons name="water" size={24} color="#2196F3" />
            <Text style={styles.detailLabel}>नमी</Text>
            <Text style={styles.detailValue}>{weatherData.current.humidity}%</Text>
          </Surface>
          
          <Surface style={styles.detailCard}>
            <Ionicons name="speedometer" size={24} color="#FF9800" />
            <Text style={styles.detailLabel}>हवा की गति</Text>
            <Text style={styles.detailValue}>{weatherData.current.windSpeed} km/h</Text>
          </Surface>
          
          <Surface style={styles.detailCard}>
            <Ionicons name="barbell" size={24} color="#9C27B0" />
            <Text style={styles.detailLabel}>दबाव</Text>
            <Text style={styles.detailValue}>{weatherData.current.pressure} mb</Text>
          </Surface>
          
          <Surface style={styles.detailCard}>
            <Ionicons name="eye" size={24} color="#4CAF50" />
            <Text style={styles.detailLabel}>दृश्यता</Text>
            <Text style={styles.detailValue}>{weatherData.current.visibility} km</Text>
          </Surface>
          
          <Surface style={styles.detailCard}>
            <Ionicons name="sunny" size={24} color={getUVIndexColor(weatherData.current.uvIndex)} />
            <Text style={styles.detailLabel}>UV इंडेक्स</Text>
            <Text style={[styles.detailValue, { color: getUVIndexColor(weatherData.current.uvIndex) }]}>
              {weatherData.current.uvIndex} ({getUVIndexText(weatherData.current.uvIndex)})
            </Text>
          </Surface>
        </View>
      </View>

      {/* 5-Day Forecast */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>5 दिन का पूर्वानुमान</Title>
        {weatherData.forecast.map((day, index) => (
          <Card key={index} style={styles.forecastCard}>
            <Card.Content>
              <View style={styles.forecastRow}>
                <View style={styles.forecastDay}>
                  <Text style={styles.dayText}>{day.day}</Text>
                </View>
                
                <View style={styles.forecastWeather}>
                  <Ionicons 
                    name={getWeatherIcon(day.condition)} 
                    size={32} 
                    color={getWeatherColor(day.condition)} 
                  />
                  <Text style={styles.forecastCondition}>
                    {getConditionText(day.condition)}
                  </Text>
                </View>
                
                <View style={styles.forecastTemp}>
                  <Text style={styles.tempText}>{day.temp}°C</Text>
                </View>
                
                <View style={styles.forecastDetails}>
                  <Text style={styles.humidityText}>💧 {day.humidity}%</Text>
                  {day.rainfall > 0 && (
                    <Text style={styles.rainfallText}>🌧️ {day.rainfall}mm</Text>
                  )}
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* Agricultural Advice */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>कृषि सलाह</Title>
        <Card style={styles.adviceCard}>
          <Card.Content>
            <View style={styles.adviceItem}>
              <Ionicons name="leaf" size={20} color="#4CAF50" />
              <Text style={styles.adviceText}>
                आज का मौसम धान की रोपाई के लिए उपयुक्त है
              </Text>
            </View>
            
            <View style={styles.adviceItem}>
              <Ionicons name="water" size={20} color="#2196F3" />
              <Text style={styles.adviceText}>
                उच्च नमी के कारण फंगल रोगों से बचाव करें
              </Text>
            </View>
            
            <View style={styles.adviceItem}>
              <Ionicons name="warning" size={20} color="#FF9800" />
              <Text style={styles.adviceText}>
                अगले 2 दिन बारिश की संभावना है, फसल की कटाई स्थगित करें
              </Text>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Weather Alerts */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>मौसम चेतावनी</Title>
        <Card style={styles.alertCard}>
          <LinearGradient colors={['#FF9800', '#F57C00']} style={styles.alertHeader}>
            <Ionicons name="warning" size={24} color="#fff" />
            <Text style={styles.alertTitle}>मध्यम चेतावनी</Text>
          </LinearGradient>
          <Card.Content>
            <Text style={styles.alertText}>
              अगले 48 घंटों में तेज बारिश की संभावना है। कृपया अपनी फसलों की सुरक्षा के लिए आवश्यक कदम उठाएं।
            </Text>
            <Text style={styles.alertTime}>
              जारी: आज सुबह 6:00 बजे
            </Text>
          </Card.Content>
        </Card>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: theme.colors.text,
  },
  header: {
    padding: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
  },
  currentWeatherContainer: {
    alignItems: 'center',
  },
  currentTemp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  currentCondition: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
    marginTop: 5,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 15,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailCard: {
    width: (width - 60) / 2,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 12,
    color: theme.colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 4,
    textAlign: 'center',
  },
  forecastCard: {
    marginBottom: 10,
    borderRadius: 10,
    elevation: 1,
  },
  forecastRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  forecastDay: {
    flex: 1,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  forecastWeather: {
    flex: 2,
    alignItems: 'center',
  },
  forecastCondition: {
    fontSize: 12,
    color: theme.colors.text,
    marginTop: 4,
  },
  forecastTemp: {
    flex: 1,
    alignItems: 'center',
  },
  tempText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  forecastDetails: {
    flex: 1,
    alignItems: 'flex-end',
  },
  humidityText: {
    fontSize: 12,
    color: theme.colors.text,
  },
  rainfallText: {
    fontSize: 12,
    color: '#2196F3',
    marginTop: 2,
  },
  adviceCard: {
    borderRadius: 15,
    elevation: 2,
  },
  adviceItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  adviceText: {
    marginLeft: 10,
    flex: 1,
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 20,
  },
  alertCard: {
    borderRadius: 15,
    elevation: 3,
    overflow: 'hidden',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  alertText: {
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 20,
    marginBottom: 10,
  },
  alertTime: {
    fontSize: 12,
    color: theme.colors.text,
    opacity: 0.6,
  },
});

export default WeatherScreen;

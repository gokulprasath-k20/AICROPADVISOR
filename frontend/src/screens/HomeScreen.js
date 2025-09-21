import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Surface,
  Avatar,
  Chip,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme, gradients } from '../theme/theme';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [greeting, setGreeting] = useState('');
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 28,
    humidity: 75,
    condition: 'Partly Cloudy'
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('सुप्रभात');
    } else if (hour < 17) {
      setGreeting('नमस्कार');
    } else {
      setGreeting('शुभ संध्या');
    }
  }, []);

  const quickActions = [
    {
      title: 'फसल सुझाव',
      subtitle: 'AI से फसल की सलाह',
      icon: 'leaf',
      color: '#4CAF50',
      onPress: () => navigation.navigate('Recommend'),
    },
    {
      title: 'बाजार भाव',
      subtitle: 'आज के दाम',
      icon: 'trending-up',
      color: '#FF9800',
      onPress: () => navigation.navigate('Prices'),
    },
    {
      title: 'मौसम जानकारी',
      subtitle: 'आज का मौसम',
      icon: 'cloud',
      color: '#2196F3',
      onPress: () => navigation.navigate('Weather'),
    },
    {
      title: 'निवेश विश्लेषण',
      subtitle: 'लाभ की गणना',
      icon: 'calculator',
      color: '#9C27B0',
      onPress: () => navigation.navigate('InvestmentAnalysis'),
    },
  ];

  const todaysTips = [
    'धान की फसल के लिए उचित जल प्रबंधन करें',
    'मक्का में खरपतवार नियंत्रण आवश्यक है',
    'गेहूं की बुआई का समय आ गया है',
  ];

  const cropSeasons = [
    { name: 'खरीफ', crops: ['धान', 'मक्का', 'कपास'], color: '#4CAF50' },
    { name: 'रबी', crops: ['गेहूं', 'चना', 'सरसों'], color: '#FF9800' },
    { name: 'जायद', crops: ['तरबूज', 'खरबूजा'], color: '#2196F3' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Gradient */}
      <LinearGradient colors={gradients.primary} style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greetingText}>{greeting}, किसान जी!</Text>
            <Text style={styles.locationText}>📍 झारखंड, भारत</Text>
          </View>
          <Avatar.Icon
            size={50}
            icon="account"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
          />
        </View>
        
        {/* Weather Card */}
        <Surface style={styles.weatherCard}>
          <View style={styles.weatherContent}>
            <Ionicons name="partly-sunny" size={40} color="#FF9800" />
            <View style={styles.weatherText}>
              <Text style={styles.temperature}>{currentWeather.temperature}°C</Text>
              <Text style={styles.weatherCondition}>{currentWeather.condition}</Text>
              <Text style={styles.humidity}>नमी: {currentWeather.humidity}%</Text>
            </View>
          </View>
        </Surface>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>त्वरित सेवाएं</Title>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickActionCard}
              onPress={action.onPress}
            >
              <LinearGradient
                colors={[action.color, action.color + '80']}
                style={styles.quickActionGradient}
              >
                <Ionicons name={action.icon} size={30} color="#fff" />
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Today's Tips */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>आज की सलाह</Title>
        <Card style={styles.tipsCard}>
          <Card.Content>
            {todaysTips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Ionicons name="bulb" size={20} color="#FF9800" />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      </View>

      {/* Crop Seasons */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>फसली मौसम</Title>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {cropSeasons.map((season, index) => (
            <Card key={index} style={[styles.seasonCard, { borderLeftColor: season.color }]}>
              <Card.Content>
                <Title style={[styles.seasonTitle, { color: season.color }]}>
                  {season.name}
                </Title>
                <View style={styles.cropChips}>
                  {season.crops.map((crop, cropIndex) => (
                    <Chip
                      key={cropIndex}
                      style={[styles.cropChip, { backgroundColor: season.color + '20' }]}
                      textStyle={{ color: season.color, fontSize: 12 }}
                    >
                      {crop}
                    </Chip>
                  ))}
                </View>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </View>

      {/* Emergency Contacts */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>आपातकालीन संपर्क</Title>
        <Card style={styles.emergencyCard}>
          <Card.Content>
            <View style={styles.emergencyItem}>
              <Ionicons name="call" size={20} color="#4CAF50" />
              <Text style={styles.emergencyText}>कृषि हेल्पलाइन: 1800-180-1551</Text>
            </View>
            <View style={styles.emergencyItem}>
              <Ionicons name="medical" size={20} color="#F44336" />
              <Text style={styles.emergencyText}>पशु चिकित्सा: 1800-11-2266</Text>
            </View>
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
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  locationText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  weatherCard: {
    borderRadius: 15,
    elevation: 4,
    backgroundColor: '#fff',
  },
  weatherContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  weatherText: {
    marginLeft: 15,
    flex: 1,
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  weatherCondition: {
    fontSize: 16,
    color: theme.colors.text,
    opacity: 0.7,
  },
  humidity: {
    fontSize: 14,
    color: theme.colors.text,
    opacity: 0.6,
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
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 60) / 2,
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
  },
  quickActionGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
    textAlign: 'center',
  },
  tipsCard: {
    borderRadius: 15,
    elevation: 2,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipText: {
    marginLeft: 10,
    flex: 1,
    fontSize: 14,
    color: theme.colors.text,
  },
  seasonCard: {
    width: 180,
    marginRight: 15,
    borderRadius: 15,
    elevation: 2,
    borderLeftWidth: 4,
  },
  seasonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cropChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cropChip: {
    marginRight: 8,
    marginBottom: 4,
  },
  emergencyCard: {
    borderRadius: 15,
    elevation: 2,
  },
  emergencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  emergencyText: {
    marginLeft: 10,
    fontSize: 14,
    color: theme.colors.text,
  },
});

export default HomeScreen;

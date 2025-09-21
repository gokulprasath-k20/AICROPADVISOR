import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Chip,
  Surface,
  ActivityIndicator,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme, gradients } from '../theme/theme';
import axios from 'axios';

const { width } = Dimensions.get('window');

const CropDetailsScreen = ({ route }) => {
  const { crop } = route.params;
  const [loading, setLoading] = useState(true);
  const [cropInfo, setCropInfo] = useState(null);

  useEffect(() => {
    fetchCropDetails();
  }, []);

  const fetchCropDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/crop-info/${crop}`);
      setCropInfo(response.data);
    } catch (error) {
      console.error('Error fetching crop details:', error);
      // Fallback data
      setCropInfo({
        crop: crop,
        season: 'खरीफ',
        investment_per_ha: 35000,
        expected_revenue_per_ha: 45000,
        expected_profit_per_ha: 10000,
        profit_margin: '30%',
        water_requirement: 'उच्च',
        suitable_districts: ['रांची', 'धनबाद', 'जमशेदपुर'],
        current_market_price: 25.0
      });
    } finally {
      setLoading(false);
    }
  };

  const getCropEmoji = (cropName) => {
    const cropEmojis = {
      rice: '🌾',
      wheat: '🌾',
      maize: '🌽',
      cotton: '🌿',
      sugarcane: '🎋',
      chickpea: '🫘',
      kidney_beans: '🫘',
      banana: '🍌',
      apple: '🍎',
      coconut: '🥥',
    };
    return cropEmojis[cropName] || '🌱';
  };

  const getCropNameInHindi = (cropName) => {
    const cropNames = {
      rice: 'धान',
      wheat: 'गेहूं',
      maize: 'मक्का',
      cotton: 'कपास',
      sugarcane: 'गन्ना',
      chickpea: 'चना',
      kidney_beans: 'राजमा',
      banana: 'केला',
      coconut: 'नारियल',
      apple: 'सेब',
    };
    return cropNames[cropName] || cropName;
  };

  const getCropDetails = (cropName) => {
    const details = {
      rice: {
        description: 'धान भारत की मुख्य खाद्य फसल है। यह खरीफ मौसम में उगाई जाती है और अधिक पानी की आवश्यकता होती है।',
        soilType: 'चिकनी मिट्टी, दोमट मिट्टी',
        climate: 'उष्णकटिबंधीय और उपोष्णकटिबंधीय',
        sowingTime: 'जून-जुलाई',
        harvestTime: 'नवंबर-दिसंबर',
        varieties: ['बासमती', 'आईआर-64', 'पूसा-1121'],
        diseases: ['ब्लास्ट', 'बैक्टीरियल लीफ ब्लाइट', 'शीथ ब्लाइट'],
        fertilizers: ['यूरिया', 'डीएपी', 'पोटाश'],
      },
      wheat: {
        description: 'गेहूं रबी मौसम की मुख्य फसल है। यह ठंडे मौसम में उगाई जाती है और कम पानी की आवश्यकता होती है।',
        soilType: 'दोमट मिट्टी, काली मिट्टी',
        climate: 'शीतोष्ण',
        sowingTime: 'नवंबर-दिसंबर',
        harvestTime: 'अप्रैल-मई',
        varieties: ['एचडी-2967', 'डब्ल्यूएच-147', 'पीबीडब्ल्यू-343'],
        diseases: ['रस्ट', 'स्मट', 'कर्नल बंट'],
        fertilizers: ['यूरिया', 'डीएपी', 'एमओपी'],
      },
      maize: {
        description: 'मक्का एक बहुउपयोगी फसल है जो खाद्य और चारे दोनों के रूप में उपयोग होती है।',
        soilType: 'दोमट मिट्टी, बलुई दोमट',
        climate: 'उष्णकटिबंधीय और समशीतोष्ण',
        sowingTime: 'जून-जुलाई (खरीफ), फरवरी-मार्च (रबी)',
        harvestTime: 'सितंबर-अक्टूबर (खरीफ), जून-जुलाई (रबी)',
        varieties: ['एचएम-4', 'पीएचएम-1', 'डीकेसी-9081'],
        diseases: ['मेडिस लीफ ब्लाइट', 'कॉमन रस्ट', 'स्टेम बोरर'],
        fertilizers: ['यूरिया', 'डीएपी', 'जिंक सल्फेट'],
      }
    };
    return details[cropName] || details.rice;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>फसल की जानकारी लोड हो रही है...</Text>
      </View>
    );
  }

  const cropDetails = getCropDetails(crop);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={gradients.primary} style={styles.header}>
        <Text style={styles.cropEmoji}>{getCropEmoji(crop)}</Text>
        <Text style={styles.cropName}>{getCropNameInHindi(crop)}</Text>
        <Text style={styles.cropNameEng}>({crop})</Text>
      </LinearGradient>

      {/* Basic Info */}
      <View style={styles.section}>
        <Card style={styles.infoCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>मूलभूत जानकारी</Title>
            <Paragraph style={styles.description}>
              {cropDetails.description}
            </Paragraph>
          </Card.Content>
        </Card>
      </View>

      {/* Financial Overview */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>वित्तीय विवरण</Title>
        <View style={styles.financialGrid}>
          <Surface style={styles.financialCard}>
            <Ionicons name="trending-down" size={24} color="#F44336" />
            <Text style={styles.financialLabel}>निवेश</Text>
            <Text style={styles.financialValue}>
              ₹{cropInfo?.investment_per_ha?.toLocaleString()}
            </Text>
            <Text style={styles.financialUnit}>प्रति हेक्टेयर</Text>
          </Surface>
          
          <Surface style={styles.financialCard}>
            <Ionicons name="trending-up" size={24} color="#4CAF50" />
            <Text style={styles.financialLabel}>आय</Text>
            <Text style={styles.financialValue}>
              ₹{cropInfo?.expected_revenue_per_ha?.toLocaleString()}
            </Text>
            <Text style={styles.financialUnit}>प्रति हेक्टेयर</Text>
          </Surface>
          
          <Surface style={styles.financialCard}>
            <Ionicons name="cash" size={24} color="#2196F3" />
            <Text style={styles.financialLabel}>लाभ</Text>
            <Text style={styles.financialValue}>
              ₹{cropInfo?.expected_profit_per_ha?.toLocaleString()}
            </Text>
            <Text style={styles.financialUnit}>प्रति हेक्टेयर</Text>
          </Surface>
          
          <Surface style={styles.financialCard}>
            <Ionicons name="pie-chart" size={24} color="#FF9800" />
            <Text style={styles.financialLabel}>लाभ मार्जिन</Text>
            <Text style={styles.financialValue}>
              {cropInfo?.profit_margin}
            </Text>
            <Text style={styles.financialUnit}>कुल आय का</Text>
          </Surface>
        </View>
      </View>

      {/* Growing Conditions */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>उगाने की शर्तें</Title>
        <Card style={styles.conditionsCard}>
          <Card.Content>
            <View style={styles.conditionItem}>
              <Ionicons name="earth" size={20} color="#8D6E63" />
              <Text style={styles.conditionLabel}>मिट्टी:</Text>
              <Text style={styles.conditionValue}>{cropDetails.soilType}</Text>
            </View>
            
            <View style={styles.conditionItem}>
              <Ionicons name="thermometer" size={20} color="#FF5722" />
              <Text style={styles.conditionLabel}>जलवायु:</Text>
              <Text style={styles.conditionValue}>{cropDetails.climate}</Text>
            </View>
            
            <View style={styles.conditionItem}>
              <Ionicons name="water" size={20} color="#2196F3" />
              <Text style={styles.conditionLabel}>पानी की आवश्यकता:</Text>
              <Text style={styles.conditionValue}>{cropInfo?.water_requirement}</Text>
            </View>
            
            <View style={styles.conditionItem}>
              <Ionicons name="calendar" size={20} color="#4CAF50" />
              <Text style={styles.conditionLabel}>मौसम:</Text>
              <Text style={styles.conditionValue}>{cropInfo?.season}</Text>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Timing */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>समय सारणी</Title>
        <View style={styles.timingGrid}>
          <Surface style={styles.timingCard}>
            <Ionicons name="play" size={24} color="#4CAF50" />
            <Text style={styles.timingLabel}>बुआई का समय</Text>
            <Text style={styles.timingValue}>{cropDetails.sowingTime}</Text>
          </Surface>
          
          <Surface style={styles.timingCard}>
            <Ionicons name="checkmark" size={24} color="#FF9800" />
            <Text style={styles.timingLabel}>कटाई का समय</Text>
            <Text style={styles.timingValue}>{cropDetails.harvestTime}</Text>
          </Surface>
        </View>
      </View>

      {/* Suitable Districts */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>उपयुक्त जिले</Title>
        <Card style={styles.districtsCard}>
          <Card.Content>
            <View style={styles.chipsContainer}>
              {cropInfo?.suitable_districts?.map((district, index) => (
                <Chip
                  key={index}
                  style={styles.districtChip}
                  textStyle={styles.chipText}
                >
                  {district}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Varieties */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>मुख्य किस्में</Title>
        <Card style={styles.varietiesCard}>
          <Card.Content>
            <View style={styles.chipsContainer}>
              {cropDetails.varieties.map((variety, index) => (
                <Chip
                  key={index}
                  style={[styles.varietyChip, { backgroundColor: theme.colors.primary + '20' }]}
                  textStyle={[styles.chipText, { color: theme.colors.primary }]}
                >
                  {variety}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Common Diseases */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>सामान्य रोग</Title>
        <Card style={styles.diseasesCard}>
          <Card.Content>
            {cropDetails.diseases.map((disease, index) => (
              <View key={index} style={styles.diseaseItem}>
                <Ionicons name="warning" size={16} color="#F44336" />
                <Text style={styles.diseaseText}>{disease}</Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      </View>

      {/* Fertilizers */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>अनुशंसित उर्वरक</Title>
        <Card style={styles.fertilizersCard}>
          <Card.Content>
            <View style={styles.chipsContainer}>
              {cropDetails.fertilizers.map((fertilizer, index) => (
                <Chip
                  key={index}
                  style={[styles.fertilizerChip, { backgroundColor: '#4CAF50' + '20' }]}
                  textStyle={[styles.chipText, { color: '#4CAF50' }]}
                >
                  {fertilizer}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Current Market Price */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>वर्तमान बाजार भाव</Title>
        <Card style={styles.priceCard}>
          <LinearGradient colors={['#4CAF50', '#66BB6A']} style={styles.priceHeader}>
            <Ionicons name="pricetag" size={32} color="#fff" />
            <Text style={styles.currentPrice}>
              ₹{cropInfo?.current_market_price} प्रति किलो
            </Text>
          </LinearGradient>
          <Card.Content>
            <Text style={styles.priceNote}>
              * यह भाव झारखंड के मुख्य बाजारों का औसत है
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
    padding: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  cropEmoji: {
    fontSize: 64,
    marginBottom: 15,
  },
  cropName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  cropNameEng: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    textTransform: 'capitalize',
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
  infoCard: {
    borderRadius: 15,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 24,
  },
  financialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  financialCard: {
    width: (width - 60) / 2,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
    marginBottom: 15,
  },
  financialLabel: {
    fontSize: 14,
    color: theme.colors.text,
    marginTop: 8,
  },
  financialValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 4,
  },
  financialUnit: {
    fontSize: 12,
    color: theme.colors.text,
    opacity: 0.7,
    marginTop: 2,
  },
  conditionsCard: {
    borderRadius: 15,
    elevation: 2,
  },
  conditionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  conditionLabel: {
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: 10,
    flex: 1,
  },
  conditionValue: {
    fontSize: 16,
    color: theme.colors.text,
    flex: 2,
    textAlign: 'right',
  },
  timingGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timingCard: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  timingLabel: {
    fontSize: 14,
    color: theme.colors.text,
    marginTop: 10,
    textAlign: 'center',
  },
  timingValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 5,
    textAlign: 'center',
  },
  districtsCard: {
    borderRadius: 15,
    elevation: 2,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  districtChip: {
    marginRight: 10,
    marginBottom: 8,
    backgroundColor: theme.colors.accent + '20',
  },
  chipText: {
    color: theme.colors.text,
  },
  varietiesCard: {
    borderRadius: 15,
    elevation: 2,
  },
  varietyChip: {
    marginRight: 10,
    marginBottom: 8,
  },
  diseasesCard: {
    borderRadius: 15,
    elevation: 2,
  },
  diseaseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  diseaseText: {
    marginLeft: 10,
    fontSize: 16,
    color: theme.colors.text,
  },
  fertilizersCard: {
    borderRadius: 15,
    elevation: 2,
  },
  fertilizerChip: {
    marginRight: 10,
    marginBottom: 8,
  },
  priceCard: {
    borderRadius: 15,
    elevation: 3,
    overflow: 'hidden',
  },
  priceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  currentPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 15,
  },
  priceNote: {
    fontSize: 12,
    color: theme.colors.text,
    opacity: 0.7,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default CropDetailsScreen;

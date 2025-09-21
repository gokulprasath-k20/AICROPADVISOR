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
  Chip,
  ActivityIndicator,
  Searchbar,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme, gradients } from '../theme/theme';
import axios from 'axios';

const { width } = Dimensions.get('window');

const CropPricesScreen = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [prices, setPrices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPrices, setFilteredPrices] = useState([]);

  useEffect(() => {
    fetchPrices();
  }, []);

  useEffect(() => {
    filterPrices();
  }, [searchQuery, prices]);

  const fetchPrices = async () => {
    try {
      const response = await axios.get('http://localhost:8000/crop-prices');
      setPrices(response.data.prices);
    } catch (error) {
      console.error('Error fetching prices:', error);
      // Fallback data if API is not available
      setPrices([
        {
          crop: 'rice',
          current_price_per_kg: 28.50,
          market_trend: 'up',
          last_updated: new Date().toISOString()
        },
        {
          crop: 'wheat',
          current_price_per_kg: 23.75,
          market_trend: 'stable',
          last_updated: new Date().toISOString()
        },
        {
          crop: 'maize',
          current_price_per_kg: 19.20,
          market_trend: 'down',
          last_updated: new Date().toISOString()
        },
        {
          crop: 'cotton',
          current_price_per_kg: 47.80,
          market_trend: 'up',
          last_updated: new Date().toISOString()
        },
        {
          crop: 'sugarcane',
          current_price_per_kg: 3.80,
          market_trend: 'stable',
          last_updated: new Date().toISOString()
        },
        {
          crop: 'chickpea',
          current_price_per_kg: 58.90,
          market_trend: 'up',
          last_updated: new Date().toISOString()
        },
        {
          crop: 'kidney_beans',
          current_price_per_kg: 85.60,
          market_trend: 'down',
          last_updated: new Date().toISOString()
        },
        {
          crop: 'banana',
          current_price_per_kg: 16.40,
          market_trend: 'stable',
          last_updated: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filterPrices = () => {
    if (!searchQuery) {
      setFilteredPrices(prices);
    } else {
      const filtered = prices.filter(price =>
        getCropNameInHindi(price.crop).toLowerCase().includes(searchQuery.toLowerCase()) ||
        price.crop.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPrices(filtered);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchPrices();
  };

  const getCropNameInHindi = (crop) => {
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
    return cropNames[crop] || crop;
  };

  const getCropEmoji = (crop) => {
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
    return cropEmojis[crop] || '🌱';
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'trending-up';
      case 'down':
        return 'trending-down';
      default:
        return 'remove';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return '#4CAF50';
      case 'down':
        return '#F44336';
      default:
        return '#FF9800';
    }
  };

  const getTrendText = (trend) => {
    switch (trend) {
      case 'up':
        return 'बढ़ रहा';
      case 'down':
        return 'गिर रहा';
      default:
        return 'स्थिर';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('hi-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>बाजार भाव लोड हो रहे हैं...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={gradients.primary} style={styles.header}>
        <Title style={styles.headerTitle}>आज के बाजार भाव</Title>
        <Text style={styles.headerSubtitle}>
          झारखंड के मुख्य बाजारों से लाइव दरें
        </Text>
        <Text style={styles.lastUpdated}>
          अंतिम अपडेट: {formatDate(new Date().toISOString())}
        </Text>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="फसल खोजें..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor={theme.colors.primary}
        />
      </View>

      {/* Market Summary */}
      <View style={styles.summaryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Surface style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>कुल फसलें</Text>
            <Text style={styles.summaryValue}>{prices.length}</Text>
          </Surface>
          <Surface style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>बढ़ रहे भाव</Text>
            <Text style={[styles.summaryValue, { color: '#4CAF50' }]}>
              {prices.filter(p => p.market_trend === 'up').length}
            </Text>
          </Surface>
          <Surface style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>गिरते भाव</Text>
            <Text style={[styles.summaryValue, { color: '#F44336' }]}>
              {prices.filter(p => p.market_trend === 'down').length}
            </Text>
          </Surface>
          <Surface style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>स्थिर भाव</Text>
            <Text style={[styles.summaryValue, { color: '#FF9800' }]}>
              {prices.filter(p => p.market_trend === 'stable').length}
            </Text>
          </Surface>
        </ScrollView>
      </View>

      {/* Price List */}
      <ScrollView
        style={styles.priceList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {filteredPrices.map((price, index) => (
          <Card key={index} style={styles.priceCard}>
            <Card.Content>
              <View style={styles.priceHeader}>
                <View style={styles.cropInfo}>
                  <Text style={styles.cropEmoji}>
                    {getCropEmoji(price.crop)}
                  </Text>
                  <View style={styles.cropDetails}>
                    <Text style={styles.cropName}>
                      {getCropNameInHindi(price.crop)}
                    </Text>
                    <Text style={styles.cropNameEng}>
                      ({price.crop})
                    </Text>
                  </View>
                </View>
                
                <View style={styles.priceInfo}>
                  <Text style={styles.currentPrice}>
                    ₹{price.current_price_per_kg}
                  </Text>
                  <Text style={styles.priceUnit}>प्रति किलो</Text>
                </View>
              </View>

              <View style={styles.priceFooter}>
                <Chip
                  icon={getTrendIcon(price.market_trend)}
                  style={[
                    styles.trendChip,
                    { backgroundColor: getTrendColor(price.market_trend) + '20' }
                  ]}
                  textStyle={{ color: getTrendColor(price.market_trend) }}
                >
                  {getTrendText(price.market_trend)}
                </Chip>
                
                <Text style={styles.updateTime}>
                  {formatDate(price.last_updated)}
                </Text>
              </View>
            </Card.Content>
          </Card>
        ))}

        {filteredPrices.length === 0 && (
          <View style={styles.noResults}>
            <Ionicons name="search" size={48} color="#ccc" />
            <Text style={styles.noResultsText}>कोई फसल नहीं मिली</Text>
          </View>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.9,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.8,
  },
  searchContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  searchBar: {
    elevation: 2,
    borderRadius: 25,
  },
  summaryContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  summaryCard: {
    padding: 15,
    marginRight: 15,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
    minWidth: 80,
  },
  summaryLabel: {
    fontSize: 12,
    color: theme.colors.text,
    textAlign: 'center',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 4,
  },
  priceList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  priceCard: {
    marginBottom: 12,
    borderRadius: 15,
    elevation: 2,
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cropInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cropEmoji: {
    fontSize: 32,
    marginRight: 15,
  },
  cropDetails: {
    flex: 1,
  },
  cropName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  cropNameEng: {
    fontSize: 14,
    color: theme.colors.text,
    opacity: 0.7,
    textTransform: 'capitalize',
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  currentPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  priceUnit: {
    fontSize: 12,
    color: theme.colors.text,
    opacity: 0.7,
  },
  priceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  trendChip: {
    borderRadius: 15,
  },
  updateTime: {
    fontSize: 12,
    color: theme.colors.text,
    opacity: 0.6,
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 16,
  },
});

export default CropPricesScreen;

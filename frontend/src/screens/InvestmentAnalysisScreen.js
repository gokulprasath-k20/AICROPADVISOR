import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {
  Card,
  Title,
  TextInput,
  Button,
  Surface,
  ActivityIndicator,
  Divider,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme, gradients } from '../theme/theme';
import axios from 'axios';

const { width } = Dimensions.get('window');

const InvestmentAnalysisScreen = ({ route }) => {
  const { crop } = route.params;
  const [loading, setLoading] = useState(false);
  const [area, setArea] = useState('1');
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    if (crop) {
      calculateInvestment();
    }
  }, [crop]);

  const calculateInvestment = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/investment-analysis/${crop}?area_hectares=${parseFloat(area) || 1}`
      );
      setAnalysis(response.data);
    } catch (error) {
      console.error('Error fetching investment analysis:', error);
      // Fallback data
      const areaValue = parseFloat(area) || 1;
      setAnalysis({
        crop: crop,
        area_hectares: areaValue,
        total_investment: 35000 * areaValue,
        cost_breakdown: {
          seeds: 5250 * areaValue,
          fertilizers: 8750 * areaValue,
          pesticides: 3500 * areaValue,
          irrigation: 7000 * areaValue,
          labor: 7000 * areaValue,
          machinery: 3500 * areaValue,
        },
        expected_yield_kg: 2000 * areaValue,
        expected_revenue: 50000 * areaValue,
        expected_profit: 15000 * areaValue,
        roi_percentage: 42.86,
        break_even_price_per_kg: 17.5,
        season: 'खरीफ',
        risk_level: 'मध्यम'
      });
    } finally {
      setLoading(false);
    }
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

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'कम':
      case 'Low':
        return '#4CAF50';
      case 'मध्यम':
      case 'Medium':
        return '#FF9800';
      case 'उच्च':
      case 'High':
        return '#F44336';
      default:
        return '#FF9800';
    }
  };

  const getROIColor = (roi) => {
    if (roi >= 40) return '#4CAF50';
    if (roi >= 20) return '#FF9800';
    return '#F44336';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('hi-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAreaChange = (value) => {
    setArea(value);
  };

  const handleRecalculate = () => {
    if (!area || parseFloat(area) <= 0) {
      Alert.alert('त्रुटि', 'कृपया वैध क्षेत्रफल दर्ज करें');
      return;
    }
    calculateInvestment();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={gradients.primary} style={styles.header}>
        <Text style={styles.cropEmoji}>{getCropEmoji(crop)}</Text>
        <Text style={styles.headerTitle}>निवेश विश्लेषण</Text>
        <Text style={styles.cropName}>{getCropNameInHindi(crop)}</Text>
      </LinearGradient>

      {/* Area Input */}
      <View style={styles.section}>
        <Card style={styles.inputCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>खेत का क्षेत्रफल</Title>
            <TextInput
              label="क्षेत्रफल (हेक्टेयर में)"
              value={area}
              onChangeText={handleAreaChange}
              keyboardType="numeric"
              mode="outlined"
              style={styles.areaInput}
              right={<TextInput.Icon icon="resize" />}
            />
            <Button
              mode="contained"
              onPress={handleRecalculate}
              loading={loading}
              disabled={loading}
              style={styles.calculateButton}
              contentStyle={styles.buttonContent}
            >
              {loading ? 'गणना हो रही है...' : 'गणना करें'}
            </Button>
          </Card.Content>
        </Card>
      </View>

      {analysis && (
        <>
          {/* Financial Overview */}
          <View style={styles.section}>
            <Title style={styles.sectionTitle}>वित्तीय सारांश</Title>
            <View style={styles.overviewGrid}>
              <Surface style={styles.overviewCard}>
                <Ionicons name="trending-down" size={28} color="#F44336" />
                <Text style={styles.overviewLabel}>कुल निवेश</Text>
                <Text style={styles.overviewValue}>
                  {formatCurrency(analysis.total_investment)}
                </Text>
              </Surface>
              
              <Surface style={styles.overviewCard}>
                <Ionicons name="trending-up" size={28} color="#4CAF50" />
                <Text style={styles.overviewLabel}>अपेक्षित आय</Text>
                <Text style={styles.overviewValue}>
                  {formatCurrency(analysis.expected_revenue)}
                </Text>
              </Surface>
              
              <Surface style={styles.overviewCard}>
                <Ionicons name="cash" size={28} color="#2196F3" />
                <Text style={styles.overviewLabel}>शुद्ध लाभ</Text>
                <Text style={styles.overviewValue}>
                  {formatCurrency(analysis.expected_profit)}
                </Text>
              </Surface>
              
              <Surface style={styles.overviewCard}>
                <Ionicons name="pie-chart" size={28} color={getROIColor(analysis.roi_percentage)} />
                <Text style={styles.overviewLabel}>ROI</Text>
                <Text style={[styles.overviewValue, { color: getROIColor(analysis.roi_percentage) }]}>
                  {analysis.roi_percentage.toFixed(1)}%
                </Text>
              </Surface>
            </View>
          </View>

          {/* Cost Breakdown */}
          <View style={styles.section}>
            <Title style={styles.sectionTitle}>लागत विवरण</Title>
            <Card style={styles.breakdownCard}>
              <Card.Content>
                {Object.entries(analysis.cost_breakdown).map(([category, amount], index) => {
                  const categoryNames = {
                    seeds: 'बीज',
                    fertilizers: 'उर्वरक',
                    pesticides: 'कीटनाशक',
                    irrigation: 'सिंचाई',
                    labor: 'मजदूरी',
                    machinery: 'मशीनरी'
                  };
                  
                  const categoryIcons = {
                    seeds: 'leaf',
                    fertilizers: 'flask',
                    pesticides: 'bug',
                    irrigation: 'water',
                    labor: 'people',
                    machinery: 'construct'
                  };
                  
                  const percentage = (amount / analysis.total_investment * 100).toFixed(1);
                  
                  return (
                    <View key={category}>
                      <View style={styles.breakdownItem}>
                        <View style={styles.breakdownLeft}>
                          <Ionicons 
                            name={categoryIcons[category]} 
                            size={20} 
                            color={theme.colors.primary} 
                          />
                          <Text style={styles.breakdownCategory}>
                            {categoryNames[category]}
                          </Text>
                        </View>
                        <View style={styles.breakdownRight}>
                          <Text style={styles.breakdownAmount}>
                            {formatCurrency(amount)}
                          </Text>
                          <Text style={styles.breakdownPercentage}>
                            ({percentage}%)
                          </Text>
                        </View>
                      </View>
                      {index < Object.entries(analysis.cost_breakdown).length - 1 && (
                        <Divider style={styles.breakdownDivider} />
                      )}
                    </View>
                  );
                })}
              </Card.Content>
            </Card>
          </View>

          {/* Production Details */}
          <View style={styles.section}>
            <Title style={styles.sectionTitle}>उत्पादन विवरण</Title>
            <Card style={styles.productionCard}>
              <Card.Content>
                <View style={styles.productionItem}>
                  <Ionicons name="scale" size={20} color="#4CAF50" />
                  <Text style={styles.productionLabel}>अपेक्षित उत्पादन:</Text>
                  <Text style={styles.productionValue}>
                    {analysis.expected_yield_kg.toLocaleString()} किलो
                  </Text>
                </View>
                
                <View style={styles.productionItem}>
                  <Ionicons name="calculator" size={20} color="#FF9800" />
                  <Text style={styles.productionLabel}>ब्रेक-ईवन प्राइस:</Text>
                  <Text style={styles.productionValue}>
                    ₹{analysis.break_even_price_per_kg.toFixed(2)} प्रति किलो
                  </Text>
                </View>
                
                <View style={styles.productionItem}>
                  <Ionicons name="calendar" size={20} color="#2196F3" />
                  <Text style={styles.productionLabel}>मौसम:</Text>
                  <Text style={styles.productionValue}>
                    {analysis.season}
                  </Text>
                </View>
                
                <View style={styles.productionItem}>
                  <Ionicons name="shield" size={20} color={getRiskColor(analysis.risk_level)} />
                  <Text style={styles.productionLabel}>जोखिम स्तर:</Text>
                  <Text style={[styles.productionValue, { color: getRiskColor(analysis.risk_level) }]}>
                    {analysis.risk_level}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          </View>

          {/* Profitability Analysis */}
          <View style={styles.section}>
            <Title style={styles.sectionTitle}>लाभप्रदता विश्लेषण</Title>
            <Card style={styles.profitabilityCard}>
              <LinearGradient 
                colors={analysis.expected_profit > 0 ? ['#4CAF50', '#66BB6A'] : ['#F44336', '#EF5350']} 
                style={styles.profitabilityHeader}
              >
                <Ionicons 
                  name={analysis.expected_profit > 0 ? "trending-up" : "trending-down"} 
                  size={32} 
                  color="#fff" 
                />
                <Text style={styles.profitabilityTitle}>
                  {analysis.expected_profit > 0 ? 'लाभदायक निवेश' : 'हानिकारक निवेश'}
                </Text>
              </LinearGradient>
              
              <Card.Content style={styles.profitabilityContent}>
                <Text style={styles.profitabilityText}>
                  {analysis.area_hectares} हेक्टेयर में {getCropNameInHindi(crop)} की खेती से आपको{' '}
                  <Text style={[styles.profitAmount, { 
                    color: analysis.expected_profit > 0 ? '#4CAF50' : '#F44336' 
                  }]}>
                    {formatCurrency(Math.abs(analysis.expected_profit))}
                  </Text>
                  {analysis.expected_profit > 0 ? ' का लाभ' : ' की हानि'} हो सकती है।
                </Text>
                
                <Text style={styles.roiText}>
                  निवेश पर रिटर्न (ROI): {' '}
                  <Text style={[styles.roiValue, { color: getROIColor(analysis.roi_percentage) }]}>
                    {analysis.roi_percentage.toFixed(1)}%
                  </Text>
                </Text>
              </Card.Content>
            </Card>
          </View>

          {/* Recommendations */}
          <View style={styles.section}>
            <Title style={styles.sectionTitle}>सुझाव</Title>
            <Card style={styles.recommendationsCard}>
              <Card.Content>
                <View style={styles.recommendationItem}>
                  <Ionicons name="bulb" size={16} color="#FF9800" />
                  <Text style={styles.recommendationText}>
                    बेहतर लाभ के लिए उच्च गुणवत्ता वाले बीजों का उपयोग करें
                  </Text>
                </View>
                
                <View style={styles.recommendationItem}>
                  <Ionicons name="water" size={16} color="#2196F3" />
                  <Text style={styles.recommendationText}>
                    ड्रिप इरिगेशन से पानी की बचत और बेहतर उत्पादन
                  </Text>
                </View>
                
                <View style={styles.recommendationItem}>
                  <Ionicons name="trending-up" size={16} color="#4CAF50" />
                  <Text style={styles.recommendationText}>
                    बाजार भाव की नियमित जांच करें और सही समय पर बेचें
                  </Text>
                </View>
                
                <View style={styles.recommendationItem}>
                  <Ionicons name="shield-checkmark" size={16} color="#9C27B0" />
                  <Text style={styles.recommendationText}>
                    फसल बीमा करवाना न भूलें
                  </Text>
                </View>
              </Card.Content>
            </Card>
          </View>
        </>
      )}

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
    padding: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  cropEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  cropName: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
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
  inputCard: {
    borderRadius: 15,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 15,
    textAlign: 'center',
  },
  areaInput: {
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  calculateButton: {
    borderRadius: 25,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  overviewCard: {
    width: (width - 60) / 2,
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    alignItems: 'center',
    marginBottom: 15,
  },
  overviewLabel: {
    fontSize: 14,
    color: theme.colors.text,
    marginTop: 10,
    textAlign: 'center',
  },
  overviewValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 5,
    textAlign: 'center',
  },
  breakdownCard: {
    borderRadius: 15,
    elevation: 2,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  breakdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  breakdownCategory: {
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: 12,
  },
  breakdownRight: {
    alignItems: 'flex-end',
  },
  breakdownAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  breakdownPercentage: {
    fontSize: 12,
    color: theme.colors.text,
    opacity: 0.7,
  },
  breakdownDivider: {
    marginVertical: 5,
  },
  productionCard: {
    borderRadius: 15,
    elevation: 2,
  },
  productionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  productionLabel: {
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: 12,
    flex: 1,
  },
  productionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  profitabilityCard: {
    borderRadius: 15,
    elevation: 3,
    overflow: 'hidden',
  },
  profitabilityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profitabilityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 15,
  },
  profitabilityContent: {
    padding: 20,
  },
  profitabilityText: {
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 24,
    marginBottom: 15,
  },
  profitAmount: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  roiText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  roiValue: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  recommendationsCard: {
    borderRadius: 15,
    elevation: 2,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  recommendationText: {
    marginLeft: 12,
    flex: 1,
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 20,
  },
});

export default InvestmentAnalysisScreen;

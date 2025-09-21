import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import {
  Card,
  Title,
  TextInput,
  Button,
  Surface,
  Chip,
  ActivityIndicator,
  Divider,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme, gradients } from '../theme/theme';
import axios from 'axios';

const { width } = Dimensions.get('window');

const CropRecommendationScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
  });
  const [recommendation, setRecommendation] = useState(null);

  const inputFields = [
    { key: 'N', label: 'नाइट्रोजन (N)', unit: 'kg/ha', icon: 'leaf', placeholder: '80-120' },
    { key: 'P', label: 'फास्फोरस (P)', unit: 'kg/ha', icon: 'flask', placeholder: '40-60' },
    { key: 'K', label: 'पोटैशियम (K)', unit: 'kg/ha', icon: 'nutrition', placeholder: '40-60' },
    { key: 'temperature', label: 'तापमान', unit: '°C', icon: 'thermometer', placeholder: '20-30' },
    { key: 'humidity', label: 'नमी', unit: '%', icon: 'water', placeholder: '60-90' },
    { key: 'ph', label: 'मिट्टी का pH', unit: '', icon: 'beaker', placeholder: '6.0-7.5' },
    { key: 'rainfall', label: 'वर्षा', unit: 'mm', icon: 'rainy', placeholder: '100-200' },
  ];

  const handleInputChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const validateForm = () => {
    for (const field of inputFields) {
      if (!formData[field.key] || formData[field.key].trim() === '') {
        Alert.alert('त्रुटि', `कृपया ${field.label} दर्ज करें`);
        return false;
      }
      const numValue = parseFloat(formData[field.key]);
      if (isNaN(numValue) || numValue < 0) {
        Alert.alert('त्रुटि', `${field.label} में वैध संख्या दर्ज करें`);
        return false;
      }
    }
    return true;
  };

  const getRecommendation = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/recommend-crop', {
        N: parseFloat(formData.N),
        P: parseFloat(formData.P),
        K: parseFloat(formData.K),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        ph: parseFloat(formData.ph),
        rainfall: parseFloat(formData.rainfall),
      });

      setRecommendation(response.data);
    } catch (error) {
      console.error('Error getting recommendation:', error);
      Alert.alert('त्रुटि', 'सर्वर से जुड़ने में समस्या है। कृपया बाद में प्रयास करें।');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      N: '',
      P: '',
      K: '',
      temperature: '',
      humidity: '',
      ph: '',
      rainfall: '',
    });
    setRecommendation(null);
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

  const getSustainabilityColor = (score) => {
    if (score >= 8) return '#4CAF50';
    if (score >= 6) return '#FF9800';
    return '#F44336';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={gradients.primary} style={styles.header}>
        <Title style={styles.headerTitle}>AI फसल सुझाव</Title>
        <Text style={styles.headerSubtitle}>
          मिट्टी और मौसम की जानकारी दें, सबसे अच्छी फसल का सुझाव पाएं
        </Text>
      </LinearGradient>

      {/* Input Form */}
      <View style={styles.section}>
        <Card style={styles.formCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>मिट्टी और मौसम की जानकारी</Title>
            
            {inputFields.map((field, index) => (
              <View key={field.key} style={styles.inputContainer}>
                <TextInput
                  label={`${field.label} ${field.unit ? `(${field.unit})` : ''}`}
                  value={formData[field.key]}
                  onChangeText={(value) => handleInputChange(field.key, value)}
                  keyboardType="numeric"
                  placeholder={field.placeholder}
                  mode="outlined"
                  style={styles.input}
                  left={<TextInput.Icon icon={field.icon} />}
                  theme={{ colors: { primary: theme.colors.primary } }}
                />
              </View>
            ))}

            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={getRecommendation}
                loading={loading}
                disabled={loading}
                style={styles.recommendButton}
                contentStyle={styles.buttonContent}
              >
                {loading ? 'विश्लेषण हो रहा है...' : 'फसल सुझाव पाएं'}
              </Button>
              
              <Button
                mode="outlined"
                onPress={resetForm}
                style={styles.resetButton}
                contentStyle={styles.buttonContent}
              >
                रीसेट करें
              </Button>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Recommendation Result */}
      {recommendation && (
        <View style={styles.section}>
          <Card style={styles.resultCard}>
            <LinearGradient
              colors={[theme.colors.primary, theme.colors.accent]}
              style={styles.resultHeader}
            >
              <Text style={styles.resultTitle}>सुझावित फसल</Text>
              <Text style={styles.cropName}>
                {getCropEmoji(recommendation.crop)} {recommendation.crop}
              </Text>
            </LinearGradient>
            
            <Card.Content style={styles.resultContent}>
              {/* Key Metrics */}
              <View style={styles.metricsContainer}>
                <Surface style={styles.metricCard}>
                  <Ionicons name="trending-up" size={24} color="#4CAF50" />
                  <Text style={styles.metricLabel}>अनुमानित उत्पादन</Text>
                  <Text style={styles.metricValue}>
                    {recommendation.predicted_yield_kg_per_ha} kg/ha
                  </Text>
                </Surface>
                
                <Surface style={styles.metricCard}>
                  <Ionicons 
                    name="leaf" 
                    size={24} 
                    color={getSustainabilityColor(recommendation.sustainability_score)} 
                  />
                  <Text style={styles.metricLabel}>स्थिरता स्कोर</Text>
                  <Text style={[
                    styles.metricValue,
                    { color: getSustainabilityColor(recommendation.sustainability_score) }
                  ]}>
                    {recommendation.sustainability_score}/10
                  </Text>
                </Surface>
                
                <Surface style={styles.metricCard}>
                  <Ionicons name="checkmark-circle" size={24} color="#2196F3" />
                  <Text style={styles.metricLabel}>विश्वसनीयता</Text>
                  <Text style={styles.metricValue}>
                    {(recommendation.confidence * 100).toFixed(1)}%
                  </Text>
                </Surface>
              </View>

              <Divider style={styles.divider} />

              {/* Recommendations */}
              <Title style={styles.recommendationsTitle}>सुझाव</Title>
              {recommendation.recommendations.map((rec, index) => (
                <View key={index} style={styles.recommendationItem}>
                  <Ionicons name="bulb" size={16} color="#FF9800" />
                  <Text style={styles.recommendationText}>{rec}</Text>
                </View>
              ))}

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <Button
                  mode="contained"
                  onPress={() => navigation.navigate('CropDetails', { 
                    crop: recommendation.crop 
                  })}
                  style={styles.actionButton}
                  icon="information"
                >
                  विस्तृत जानकारी
                </Button>
                
                <Button
                  mode="outlined"
                  onPress={() => navigation.navigate('InvestmentAnalysis', { 
                    crop: recommendation.crop 
                  })}
                  style={styles.actionButton}
                  icon="calculator"
                >
                  निवेश विश्लेषण
                </Button>
              </View>
            </Card.Content>
          </Card>
        </View>
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
  section: {
    padding: 20,
  },
  formCard: {
    borderRadius: 15,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 15,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 20,
  },
  recommendButton: {
    marginBottom: 10,
    borderRadius: 25,
  },
  resetButton: {
    borderRadius: 25,
    borderColor: theme.colors.primary,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  resultCard: {
    borderRadius: 15,
    elevation: 4,
    overflow: 'hidden',
  },
  resultHeader: {
    padding: 20,
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  cropName: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
    textTransform: 'capitalize',
  },
  resultContent: {
    padding: 0,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  metricCard: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    flex: 1,
    marginHorizontal: 5,
  },
  metricLabel: {
    fontSize: 12,
    color: theme.colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 4,
  },
  divider: {
    marginVertical: 10,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginBottom: 8,
  },
  recommendationText: {
    marginLeft: 10,
    flex: 1,
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 20,
  },
});

export default CropRecommendationScreen;

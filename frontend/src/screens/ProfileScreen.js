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
  Avatar,
  List,
  Switch,
  Button,
  Divider,
  Surface,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme, gradients } from '../theme/theme';

const { width } = Dimensions.get('window');

const ProfileScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true);
  const [voiceInput, setVoiceInput] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [language, setLanguage] = useState('hindi');

  const userProfile = {
    name: 'राम कुमार',
    phone: '+91 98765 43210',
    district: 'रांची',
    farmSize: '2.5 एकड़',
    primaryCrops: ['धान', 'गेहूं', 'मक्का'],
    experience: '15 साल',
  };

  const handleLanguageChange = () => {
    Alert.alert(
      'भाषा बदलें',
      'कृपया अपनी पसंदीदा भाषा चुनें',
      [
        { text: 'हिंदी', onPress: () => setLanguage('hindi') },
        { text: 'English', onPress: () => setLanguage('english') },
        { text: 'संथाली', onPress: () => setLanguage('santhali') },
        { text: 'रद्द करें', style: 'cancel' },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'लॉग आउट',
      'क्या आप वाकई लॉग आउट करना चाहते हैं?',
      [
        { text: 'रद्द करें', style: 'cancel' },
        { text: 'हां', onPress: () => console.log('Logged out') },
      ]
    );
  };

  const profileStats = [
    { label: 'कुल सुझाव', value: '47', icon: 'leaf', color: '#4CAF50' },
    { label: 'सफल फसलें', value: '23', icon: 'checkmark-circle', color: '#2196F3' },
    { label: 'बचत', value: '₹15,000', icon: 'trending-up', color: '#FF9800' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <LinearGradient colors={gradients.primary} style={styles.header}>
        <Avatar.Text
          size={80}
          label="रक"
          style={styles.avatar}
          labelStyle={{ fontSize: 24, color: theme.colors.primary }}
        />
        <Text style={styles.userName}>{userProfile.name}</Text>
        <Text style={styles.userLocation}>
          📍 {userProfile.district}, झारखंड
        </Text>
        <Text style={styles.userPhone}>📞 {userProfile.phone}</Text>
      </LinearGradient>

      {/* Profile Stats */}
      <View style={styles.statsContainer}>
        {profileStats.map((stat, index) => (
          <Surface key={index} style={styles.statCard}>
            <Ionicons name={stat.icon} size={24} color={stat.color} />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </Surface>
        ))}
      </View>

      {/* Farm Information */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>खेत की जानकारी</Title>
        <Card style={styles.infoCard}>
          <Card.Content>
            <View style={styles.infoRow}>
              <Ionicons name="resize" size={20} color="#4CAF50" />
              <Text style={styles.infoLabel}>खेत का आकार:</Text>
              <Text style={styles.infoValue}>{userProfile.farmSize}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Ionicons name="time" size={20} color="#FF9800" />
              <Text style={styles.infoLabel}>अनुभव:</Text>
              <Text style={styles.infoValue}>{userProfile.experience}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Ionicons name="leaf" size={20} color="#2196F3" />
              <Text style={styles.infoLabel}>मुख्य फसलें:</Text>
              <Text style={styles.infoValue}>
                {userProfile.primaryCrops.join(', ')}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>सेटिंग्स</Title>
        <Card style={styles.settingsCard}>
          <List.Item
            title="सूचनाएं"
            description="फसल और मौसम की अलर्ट"
            left={props => <List.Icon {...props} icon="bell" color="#FF9800" />}
            right={() => (
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                color={theme.colors.primary}
              />
            )}
          />
          
          <Divider />
          
          <List.Item
            title="आवाज इनपुट"
            description="बोलकर जानकारी दें"
            left={props => <List.Icon {...props} icon="microphone" color="#2196F3" />}
            right={() => (
              <Switch
                value={voiceInput}
                onValueChange={setVoiceInput}
                color={theme.colors.primary}
              />
            )}
          />
          
          <Divider />
          
          <List.Item
            title="ऑफलाइन मोड"
            description="इंटरनेट के बिना उपयोग"
            left={props => <List.Icon {...props} icon="cloud-offline" color="#9C27B0" />}
            right={() => (
              <Switch
                value={offlineMode}
                onValueChange={setOfflineMode}
                color={theme.colors.primary}
              />
            )}
          />
          
          <Divider />
          
          <List.Item
            title="भाषा"
            description={language === 'hindi' ? 'हिंदी' : language === 'english' ? 'English' : 'संथाली'}
            left={props => <List.Icon {...props} icon="translate" color="#4CAF50" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={handleLanguageChange}
          />
        </Card>
      </View>

      {/* App Information */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>ऐप की जानकारी</Title>
        <Card style={styles.infoCard}>
          <List.Item
            title="सहायता"
            description="उपयोग गाइड और FAQ"
            left={props => <List.Icon {...props} icon="help-circle" color="#2196F3" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => Alert.alert('सहायता', 'सहायता पेज जल्द ही उपलब्ध होगा')}
          />
          
          <Divider />
          
          <List.Item
            title="फीडबैक"
            description="अपनी राय साझा करें"
            left={props => <List.Icon {...props} icon="message" color="#FF9800" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => Alert.alert('फीडबैक', 'फीडबैक फॉर्म जल्द ही उपलब्ध होगा')}
          />
          
          <Divider />
          
          <List.Item
            title="ऐप के बारे में"
            description="संस्करण 1.0.0"
            left={props => <List.Icon {...props} icon="information" color="#9C27B0" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => Alert.alert(
              'किसान मित्र',
              'Smart India Hackathon 2025\nझारखंड कृषि सहायक ऐप\nसंस्करण: 1.0.0\n\nविकसित: AI टीम'
            )}
          />
        </Card>
      </View>

      {/* Emergency Contacts */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>आपातकालीन संपर्क</Title>
        <Card style={styles.emergencyCard}>
          <Card.Content>
            <View style={styles.emergencyItem}>
              <Ionicons name="call" size={20} color="#4CAF50" />
              <View style={styles.emergencyText}>
                <Text style={styles.emergencyTitle}>कृषि हेल्पलाइन</Text>
                <Text style={styles.emergencyNumber}>1800-180-1551</Text>
              </View>
              <Button
                mode="outlined"
                compact
                onPress={() => Alert.alert('कॉल', 'कृषि हेल्पलाइन पर कॉल करें?')}
              >
                कॉल करें
              </Button>
            </View>
            
            <Divider style={styles.emergencyDivider} />
            
            <View style={styles.emergencyItem}>
              <Ionicons name="medical" size={20} color="#F44336" />
              <View style={styles.emergencyText}>
                <Text style={styles.emergencyTitle}>पशु चिकित्सा</Text>
                <Text style={styles.emergencyNumber}>1800-11-2266</Text>
              </View>
              <Button
                mode="outlined"
                compact
                onPress={() => Alert.alert('कॉल', 'पशु चिकित्सा हेल्पलाइन पर कॉल करें?')}
              >
                कॉल करें
              </Button>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Logout Button */}
      <View style={styles.section}>
        <Button
          mode="contained"
          onPress={handleLogout}
          style={styles.logoutButton}
          contentStyle={styles.logoutButtonContent}
          buttonColor="#F44336"
        >
          लॉग आउट
        </Button>
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
    padding: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  avatar: {
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  userLocation: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 5,
  },
  userPhone: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginTop: -20,
  },
  statCard: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    flex: 1,
    marginHorizontal: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.text,
    marginTop: 4,
    textAlign: 'center',
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: 10,
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    flex: 1,
    textAlign: 'right',
  },
  settingsCard: {
    borderRadius: 15,
    elevation: 2,
  },
  emergencyCard: {
    borderRadius: 15,
    elevation: 2,
  },
  emergencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  emergencyText: {
    flex: 1,
    marginLeft: 15,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  emergencyNumber: {
    fontSize: 14,
    color: theme.colors.text,
    opacity: 0.7,
  },
  emergencyDivider: {
    marginVertical: 10,
  },
  logoutButton: {
    borderRadius: 25,
    elevation: 2,
  },
  logoutButtonContent: {
    paddingVertical: 8,
  },
});

export default ProfileScreen;

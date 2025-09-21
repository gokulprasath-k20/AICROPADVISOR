import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2E7D32', // Deep Green
    accent: '#4CAF50', // Light Green
    background: '#F1F8E9', // Very Light Green
    surface: '#FFFFFF',
    text: '#1B5E20', // Dark Green
    placeholder: '#81C784', // Medium Green
    backdrop: 'rgba(46, 125, 50, 0.5)',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
  },
  roundness: 12,
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'System',
      fontWeight: '100',
    },
  },
};

export const gradients = {
  primary: ['#2E7D32', '#4CAF50'],
  secondary: ['#81C784', '#A5D6A7'],
  background: ['#F1F8E9', '#E8F5E8'],
  card: ['#FFFFFF', '#F8F8F8'],
};

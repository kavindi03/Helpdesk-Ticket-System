// src/theme.js
import { createTheme } from '@mui/material/styles';

// Modern 2025 Pastel Color Palette
const colors = {
  primary: {
    main: '#7FB3D5',  // Soft Blue
    light: '#A5C7E5',
    dark: '#5A8FBB',
    contrastText: '#1A365D',
  },
  secondary: {
    main: '#D4A5E5',  // Lavender
    light: '#E8D0F1',
    dark: '#C17BD5',
    contrastText: '#4A235A',
  },
  success: {
    main: '#A8E6CF',  // Mint
    light: '#D4F3E6',
    dark: '#7ED4B3',
    contrastText: '#1B5E20',
  },
  warning: {
    main: '#FFD3B6',  // Peach
    light: '#FFE9D9',
    dark: '#FFB88C',
    contrastText: '#E65100',
  },
  error: {
    main: '#FFAAA5',  // Soft Coral
    light: '#FFD8D6',
    dark: '#FF8A80',
    contrastText: '#B71C1C',
  },
  info: {
    main: '#A5D8FF',  // Sky Blue
    light: '#D4EBFF',
    dark: '#7EC6FF',
    contrastText: '#01579B',
  },
  background: {
    default: '#F8FAFF',
    paper: '#FFFFFF',
    light: '#F5F9FF',
    lightGradient: 'linear-gradient(135deg, #F8FAFF 0%, #F5F7FF 100%)',
    cardGradient: 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFF 100%)',
    dashboardGradient: 'linear-gradient(135deg, #F0F7FF 0%, #F8F0FF 100%)',
    contentGradient: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFF 100%)',
    formGradient: 'linear-gradient(145deg, #F8FAFF 0%, #F0F4FF 100%)',
    glass: 'rgba(255, 255, 255, 0.7)',
    ticketCard: 'linear-gradient(145deg, #FFFFFF 0%, #F8F9FF 100%)',
    overlay: 'rgba(255, 255, 255, 0.9)',
    container: '#FFFFFF',
    containerSecondary: '#F8F9FF',
    containerTertiary: '#F0F2FF',
    pastelBlue: '#E6F2FF',
    pastelPink: '#FFE6F2',
    pastelGreen: '#E6FFE6',
    pastelYellow: '#FFFFE0',
    pastelPurple: '#F0E6FF'
  },
  text: {
    primary: '#37474F',
    secondary: '#546E7A',
    disabled: '#A0AEC0',
  },
  border: {
    light: '#E2E8F0',
    medium: '#CBD5E0',
  },
};

// Modern glass morphism effect
const glassEffect = {
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.4)'
};

// Create the theme
const theme = createTheme({
  palette: {
    ...colors,
    mode: 'light',
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: '"Inter", "Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.5px',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    body1: {
      fontSize: '0.9375rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.57,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.2px',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.66,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.5px',
      lineHeight: 2.5,
      textTransform: 'uppercase',
    },
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.02)',
    '0px 4px 8px rgba(0, 0, 0, 0.03)',
    '0px 6px 12px rgba(0, 0, 0, 0.05)',
    '0px 8px 16px rgba(0, 0, 0, 0.06)',
    '0px 10px 20px rgba(0, 0, 0, 0.07)',
    '0px 12px 24px rgba(0, 0, 0, 0.08)',
    '0px 14px 28px rgba(0, 0, 0, 0.09)',
    '0px 16px 32px rgba(0, 0, 0, 0.1)',
    '0px 18px 36px rgba(0, 0, 0, 0.11)',
    '0px 20px 40px rgba(0, 0, 0, 0.12)',
    '0px 22px 44px rgba(0, 0, 0, 0.13)',
    '0px 24px 48px rgba(0, 0, 0, 0.14)',
    '0px 26px 52px rgba(0, 0, 0, 0.15)',
    '0px 28px 56px rgba(0, 0, 0, 0.16)',
    '0px 30px 60px rgba(0, 0, 0, 0.17)',
    '0px 32px 64px rgba(0, 0, 0, 0.18)',
    '0px 34px 68px rgba(0, 0, 0, 0.19)',
    '0px 36px 72px rgba(0, 0, 0, 0.2)',
    '0px 38px 76px rgba(0, 0, 0, 0.21)',
    '0px 40px 80px rgba(0, 0, 0, 0.22)',
    '0px 42px 84px rgba(0, 0, 0, 0.23)',
    '0px 44px 88px rgba(0, 0, 0, 0.24)',
    '0px 46px 92px rgba(0, 0, 0, 0.25)',
    '0px 48px 96px rgba(0, 0, 0, 0.26)'
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          background: colors.background.default,
          backgroundImage: `
            radial-gradient(at 0% 0%, rgba(127, 179, 213, 0.1) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(212, 165, 229, 0.1) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(168, 230, 207, 0.1) 0px, transparent 50%)
          `,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          minHeight: '100vh',
          margin: 0,
          padding: 0,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
          margin: 0,
          padding: 0,
          '&::before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 10% 20%, rgba(108, 99, 255, 0.05) 0%, rgba(255, 101, 132, 0.05) 100%)',
            zIndex: -1,
          },
          '& .dashboard-header': {
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(108, 99, 255, 0.1)',
            marginBottom: '24px',
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.15)',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background.container,
          borderRadius: 20,
          padding: '32px',
          margin: '16px auto',
          boxShadow: '0 8px 32px rgba(108, 99, 255, 0.1)',
          border: '1px solid rgba(108, 99, 255, 0.1)',
          '&.MuiContainer-maxWidthXl': {
            maxWidth: '1440px',
          },
          '&.secondary-container': {
            backgroundColor: colors.background.containerSecondary,
            border: '1px solid rgba(108, 99, 255, 0.15)',
          },
          '&.tertiary-container': {
            backgroundColor: colors.background.containerTertiary,
            border: '1px solid rgba(108, 99, 255, 0.2)',
          }
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.2)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover:before': {
            opacity: 1,
          },
          '&:active': {
            transform: 'translateY(1px)',
          },
        },
        contained: {
          background: `linear-gradient(45deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
          color: 'white',
          '&:hover': {
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.03)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #6C63FF 30%, #FF6584 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #5B52E0 30%, #E64A6F 90%)',
            boxShadow: '0 8px 24px rgba(108, 99, 255, 0.5)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.15)',
            transform: 'translateY(-6px)',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.3s ease',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.2)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: '2px',
              boxShadow: '0 0 0 4px rgba(127, 179, 213, 0.2)',
            },
          },
        },
        input: {
          '&::placeholder': {
            opacity: 0.6,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            '& fieldset': {
              borderWidth: 2,
              borderColor: colors.border.light,
            },
            '&:hover fieldset': {
              borderColor: colors.primary.main,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary.main,
              boxShadow: `0 0 0 4px ${colors.primary.light}40`,
            },
          },
        },
      },
    },
  },
});

export default theme;
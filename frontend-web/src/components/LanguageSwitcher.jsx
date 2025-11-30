import React from 'react';
import {
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Box,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = ({ variant = 'default' }) => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event, newLanguage) => {
    if (newLanguage !== null) {
      i18n.changeLanguage(newLanguage);
      
      document.documentElement.dir = newLanguage === 'am' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLanguage;
    }
  };

  const currentLang = i18n.language;

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'am', label: 'አማርኛ', flag: '🇪🇹' },
    { code: 'or', label: 'Afaan Oromoo', flag: '🇪🇹' },
    { code: 'ti', label: 'ትግርኛ', flag: '🇪🇹' },
  ];

  if (variant === 'compact') {
    return (
      <ToggleButtonGroup
        value={currentLang}
        exclusive
        onChange={handleLanguageChange}
        size="small"
        sx={{ height: 36 }}
      >
        {languages.map((lang) => (
          <ToggleButton key={lang.code} value={lang.code} sx={{ px: 1.5 }}>
            <span style={{ fontSize: '1.2rem' }}>{lang.flag}</span>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    );
  }

  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="body2" color="text.secondary">
        Language:
      </Typography>
      <ToggleButtonGroup
        value={currentLang}
        exclusive
        onChange={handleLanguageChange}
        color="primary"
      >
        {languages.map((lang) => (
          <Tooltip key={lang.code} title={lang.label} arrow>
            <ToggleButton value={lang.code} sx={{ textTransform: 'none' }}>
              <span style={{ marginRight: 8, fontSize: '1.3rem' }}>{lang.flag}</span>
              {lang.code === 'en' || lang.code === 'am' ? lang.label : ''}
            </ToggleButton>
          </Tooltip>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default LanguageSwitcher;
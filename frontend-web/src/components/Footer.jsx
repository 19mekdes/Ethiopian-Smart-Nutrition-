import React from 'react';
import { Box, Container, Typography, Link, Grid, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isAmharic = i18n.language === 'am';

  return (
    <Box
      sx={{
        backgroundColor: '#0C8040', 
        py: { xs: 5, md: 8 },
        mt: 'auto',
        
        direction: i18n.dir(),
        fontFamily: isAmharic ? 'Nyala, "Abyssinica SIL", serif' : 'Roboto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ textAlign: { xs: 'center', md: isAmharic ? 'right' : 'left' } }}>
          
          
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              {t('footer.projectTitle')}
            </Typography>
            <Typography variant="body2">
              {t('footer.projectDesc')}
            </Typography>
          </Grid>

          
          <Grid item xs={12} md={4} sx={{ 
            textAlign: 'center', 
            
            order: { xs: 3, md: 2 } 
          }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium' }}>
              {t('footer.partners')}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: { xs: 2, md: 3 }, 
              flexWrap: 'wrap', 
              mt: 1 
            }}>
              
              <img
                src="https://placehold.co/100x60/transparent/FFF?text=MoH"
                alt="Ministry of Health Ethiopia"
                style={{ height: 60, filter: 'brightness(0) invert(1)', objectFit: 'contain' }}
              />
              <img
                src="https://placehold.co/100x50/transparent/FFF?text=UNICEF"
                alt="UNICEF Ethiopia"
                style={{ height: 50, filter: 'brightness(0) invert(1)', objectFit: 'contain' }}
              />
              <img
                src="https://placehold.co/100x55/transparent/FFF?text=SEQOTA"
                alt="Seqota Declaration"
                style={{ height: 55, filter: 'brightness(0) invert(1)', objectFit: 'contain' }}
              />
            </Box>
          </Grid>

          
          <Grid item xs={12} md={4} sx={{ 
            textAlign: { xs: 'center', md: isAmharic ? 'left' : 'right' },
            
            order: { xs: 2, md: 3 }
          }}>
            <Typography variant="body2">
              © 2025 {t('footer.copyright')}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {t('footer.contact')}: 
              <Link href="mailto:nutrition@moh.gov.et" color="inherit" underline="hover" sx={{ ml: isAmharic ? 0 : 0.5, mr: isAmharic ? 0.5 : 0 }}>
                nutrition@moh.gov.et
              </Link>
            </Typography>
            <Typography variant="body2">
              {t('footer.version')}: 1.0.0 | {t('footer.poweredBy')}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.3)', my: 3 }} />

        
        <Typography variant="body2" align="center" sx={{ opacity: 0.8 }}>
          {t('footer.tagline')}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
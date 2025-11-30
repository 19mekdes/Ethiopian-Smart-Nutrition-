import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CircularProgress, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import GrowthChart from '../components/GrowthChart.jsx'; // Assuming this component exists

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [stats, setStats] = useState({ normal: 0, mam: 0, sam: 0 });
  const [loading, setLoading] = useState(true);
  const isAmharic = i18n.language === 'am';

  // State to hold any error during data fetching
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real application, you might use __app_id, __firebase_config, and auth to secure this call
    axios.get('/api/dashboard/stats')
      .then(res => {
        setStats(res.data);
        setLoading(false);
        setError(null);
      })
      .catch(err => {
        console.error("Failed to fetch dashboard stats:", err);
        setError(t('dashboard.fetchError'));
        setLoading(false);
      });
  }, [t]); // Added t as dependency for translation key updates

  const statCards = [
    { titleKey: 'dashboard.healthy', value: stats.normal, color: theme.palette.success.main, bgColor: '#4CAF50' },
    { titleKey: 'dashboard.mam', value: stats.mam, color: theme.palette.warning.main, bgColor: '#FF9800' },
    { titleKey: 'dashboard.sam', value: stats.sam, color: theme.palette.error.main, bgColor: '#F44336' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}
        dir={isAmharic ? 'rtl' : 'ltr'}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ mb: 4, fontFamily: isAmharic ? 'Nyala, "Abyssinica SIL", serif' : 'Roboto' }}
        >
          {t('dashboard.title')}
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 6 }}>
            <CircularProgress />
            <Typography variant="h6" sx={{ ml: 2 }}>{t('common.loading')}</Typography>
          </Box>
        ) : error ? (
          <Typography color="error" variant="h6">{error}</Typography>
        ) : (
          <Grid container spacing={4}>
            {/* Statistics Cards */}
            {statCards.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  sx={{ 
                    textAlign: 'center', 
                    boxShadow: 6, 
                    borderRadius: '12px',
                    backgroundColor: card.bgColor,
                    color: 'white'
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography 
                      variant="h6" 
                      component="h2" 
                      gutterBottom
                      sx={{ fontFamily: isAmharic ? 'Nyala, "Abyssinica SIL", serif' : 'Roboto' }}
                    >
                      {t(card.titleKey)}
                    </Typography>
                    <Typography variant="h3" component="p" fontWeight="bold">
                      {card.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {/* Growth Chart */}
            <Grid item xs={12}>
              <Box sx={{ mt: 4, p: 3, border: '1px solid #ddd', borderRadius: '12px', boxShadow: 3 }}>
                <Typography 
                  variant="h5" 
                  gutterBottom
                  sx={{ fontFamily: isAmharic ? 'Nyala, "Abyssinica SIL", serif' : 'Roboto' }}
                >
                  {t('dashboard.growthChartTitle')}
                </Typography>
                {/* Visual context for growth monitoring in Ethiopian children */}
                [Image of WHO child growth standard chart]
                <GrowthChart />
              </Box>
            </Grid>
          </Grid>
        )}

      </Container>
      
      <Footer />
    </Box>
  );
};

export default Dashboard;
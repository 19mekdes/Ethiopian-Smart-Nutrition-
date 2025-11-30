import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../contexts/AuthContext.jsx";

import { useNavigate } from "react-router-dom";

import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Fab,
  Icon
} from "@mui/material";



const ChildrenList = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  const { 
      user, 
      loading: authLoading, 
      db, 
      isConfigError 
  } = useContext(AuthContext);

  const userId = user?.uid;
  const isAmharic = i18n.language === 'am';

  
  const [loading, setLoading] = useState(authLoading);
  const [children, setChildren] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {

    
    if (authLoading || isConfigError || !userId || !db) {
        if (!authLoading && (isConfigError || !userId || !db)) {
             setLoading(false); 
        }
        return () => {}; // Cleanup returns an empty function
    }

    
    const collectionPath = 'children'; 

    // Real-time listener for children's data (using the mock DB structure)
    const unsubscribeFunction = db.collection(collectionPath).onSnapshot(
      (snapshot) => {
        const childrenData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        // Sort children alphabetically by name
        childrenData.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

        setChildren(childrenData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Mock DB Children Fetch Error:", err);
        setError(t("childrenList.fetchError") + (err.message || 'Unknown Error'));
        setLoading(false);
      }
    );

    // Cleanup the listener when the component unmounts or dependencies change
    return unsubscribeFunction;
  }, [db, userId, authLoading, isConfigError, t]); 
  
  const handleAddChildClick = () => {
      navigate('/add-child');
  };

  const handleChildClick = (childId) => {
      navigate(`/child/${childId}`);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>{t("common.loadingData")}</Typography>
        </Box>
      );
    }

    if (isConfigError) {
        // This should not happen with the mock system, but is kept as a safeguard
        return (
            <Alert severity="error" sx={{ mt: 3 }}>
                {t("System Error")}: {t("childrenList.authDisabled")}. {t("common.contactAdmin")}
            </Alert>
        );
    }
    
    if (error) {
        return <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>;
    }

    if (!children.length) {
      return (
        <Alert severity="info" sx={{ mt: 3 }}>
          {t("childrenList.noChildrenMessage")}
        </Alert>
      );
    }

    return (
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {children.map((child) => (
          <Grid item xs={12} sm={6} md={4} key={child.id}>
            <Card 
                onClick={() => handleChildClick(child.id)} 
                sx={{ 
                    cursor: 'pointer', 
                    transition: '0.3s',
                    '&:hover': { 
                        boxShadow: 6, 
                        borderColor: 'primary.main',
                        transform: 'translateY(-2px)'
                    },
                    border: '1px solid #ccc'
                }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {child.name}
                    </Typography>
                    <Icon color="primary">face</Icon>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    {t("childrenList.woreda")}: {child.woreda || 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {t("childrenList.age")}: {child.ageMonths ? `${Math.floor(child.ageMonths / 12)} ${t("childrenList.years")}, ${child.ageMonths % 12} ${t("childrenList.months")}` : 'N/A'}
                </Typography>
                <Box sx={{ mt: 1, p: 1, backgroundColor: '#f0f0f0', borderRadius: 1 }}>
                    <Typography variant="subtitle2" color="primary">
                        {t("childrenList.lastVisit")}: {child.lastVisitDate || t("childrenList.noRecord")}
                    </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  // Determine if the Add button should be disabled (only if loading is occurring)
  const isFormDisabled = loading;

  return (
    <Container maxWidth="lg" sx={{ py: 4, direction: i18n.dir(), fontFamily: isAmharic ? 'Nyala, "Abyssinica SIL", serif' : 'Roboto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" component="h2" color="primary" sx={{ fontWeight: 'bold' }}>
          {t("childrenList.pageTitle")}
        </Typography>
      </Box>

      {renderContent()}
      
      {/* Add Floating Action Button for adding a child */}
      <Fab 
          color="secondary" 
          aria-label="add" 
          onClick={handleAddChildClick}
          disabled={isFormDisabled}
          sx={{ 
              position: 'fixed', 
              bottom: 16, 
              right: 16, 
              backgroundColor: '#0C8040', // Custom secondary color for visibility
              '&:hover': { backgroundColor: '#1B5E20' }
          }}
      >
        <Icon>add</Icon>
      </Fab>
      
    </Container>
  );
};

export default ChildrenList;
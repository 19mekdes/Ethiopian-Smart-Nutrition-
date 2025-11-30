import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { CircularProgress, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';


const Home = () => {
    
    const { user, loading } = useContext(AuthContext); 
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        
        if (loading) return;

        
        if (user) {
            navigate('/dashboard', { replace: true });
        } else {
            
            navigate('/login', { replace: true });
        }
    }, [user, loading, navigate]);

    // Di
    return (
        <Box 
            sx={{ 
                minHeight: '100vh', 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center', 
                backgroundColor: '#f5f5f5' 
            }}
        >
            <CircularProgress color="primary" size={60} />
            <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
                {t("common.checkingAuth")}
            </Typography>
        </Box>
    );
};

export default Home;
import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import { AuthContext } from '../contexts/AuthContext.jsx'; 

const Navbar = () => {
  const { t, i18n } = useTranslation();
  
  const { user, logout } = useContext(AuthContext); 
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null); 
  const [langMenu, setLangMenu] = React.useState(null); 

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangMenu(null);
    
    document.dir = i18n.dir(lng) === 'rtl' ? 'rtl' : 'ltr'; 
  };

  const handleLogout = () => {
    
    logout();
    navigate('/');
    handleClose();
  };
  
  // Define navigation items
  const navItems = [
    { labelKey: 'nav.dashboard', path: '/dashboard', authRequired: true },
    { labelKey: 'nav.children', path: '/children', authRequired: true },
    { labelKey: 'nav.registerChild', path: '/register-child', authRequired: true },
    { labelKey: 'nav.login', path: '/login', authRequired: false },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#0C8040', mb: 3 }}>
      <Toolbar>
        
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
          onClick={handleMenu}
        >
          <MenuIcon />
        </IconButton>

        
        <Typography
          variant="h6"
          component="div"
          onClick={() => navigate('/')} 
          sx={{
            flexGrow: 1,
            cursor: 'pointer',
            fontFamily: i18n.language === 'am' ? 'Nyala, "Abyssinica SIL", serif' : 'Roboto',
            fontSize: { xs: '1rem', sm: '1.3rem' },
            
            textAlign: i18n.dir() === 'rtl' ? 'right' : 'left',
          }}
        >
          {t('app.title')}
        </Typography>

        
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          
          {user && (
            <>
              {navItems.filter(item => item.authRequired).map(item => (
                <Button key={item.path} color="inherit" onClick={() => navigate(item.path)}>
                  {t(item.labelKey)}
                </Button>
              ))}
              
              
              <Button color="inherit" disabled sx={{ textTransform: 'none', opacity: 1, '&.Mui-disabled': { color: 'white' } }}>
                👋 {user.name || t('nav.healthWorker')} ({user.woreda || t('nav.woreda')})
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                {t('nav.logout')}
              </Button>
            </>
          )}

          
          {!user && (
            <Button color="inherit" onClick={() => navigate('/login')}>
              {t('nav.login')}
            </Button>
          )}
        </Box>

        
        <IconButton color="inherit" onClick={(e) => setLangMenu(e.currentTarget)}>
          <LanguageIcon />
        </IconButton>
        <Menu 
          anchorEl={langMenu} 
          open={Boolean(langMenu)} 
          onClose={() => setLangMenu(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={() => changeLanguage('en')}>🇬🇧 {t('lang.english')}</MenuItem>
          <MenuItem onClick={() => changeLanguage('am')}>🇪🇹 {t('lang.amharic')}</MenuItem>
          <MenuItem onClick={() => changeLanguage('or')}>🇴🇲 {t('lang.oromo')}</MenuItem>
        </Menu>

        
        <Menu 
          anchorEl={anchorEl} 
          open={Boolean(anchorEl)} 
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          
          {user ? (
            <>
              {navItems.filter(item => item.authRequired).map(item => (
                <MenuItem key={item.path} onClick={() => { navigate(item.path); handleClose(); }}>
                  {t(item.labelKey)}
                </MenuItem>
              ))}
              <MenuItem disabled>{user.name || t('nav.healthWorker')}</MenuItem>
              <MenuItem onClick={handleLogout}>{t('nav.logout')}</MenuItem>
            </>
          ) : (
            <MenuItem onClick={() => { navigate('/login'); handleClose(); }}>
              {t('nav.login')}
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
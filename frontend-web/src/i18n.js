import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      app: { title: 'Ethiopia Smart Nutrition' },
      home: {
        heroTitle: 'Improving child nutrition across Ethiopia',
        heroSubtitle: 'Track growth, register children, and support health workers.',
        getStarted: 'Get Started',
        stuntingRate: 'Stunting rate',
        woredasCovered: 'Woredas covered',
        childrenMonitored: 'Children monitored',
      },
      nav: {
        dashboard: 'Dashboard',
        children: 'Children',
        registerChild: 'Register Child',
        logout: 'Logout',
        login: 'Login',
      },
    },
  },
  am: {
    translation: {
      app: { title: 'የኢትዮጵያ አስማርት ነው' },
      home: {
        heroTitle: 'የሕፃናት እንክብካቤ ማሻሻያ',
        heroSubtitle: 'ሕፃናትን ተከታትለው ይመዝግቡ፣ ደጋፊ ስራዎችን ይደግፉ።',
        getStarted: 'ጀምር',
        stuntingRate: 'የስታንቲንግ ተደራሽነት',
        woredasCovered: 'የተሸፈኑ ወረዳዎች',
        childrenMonitored: 'የተከታተሉ ሕፃናት',
      },
      nav: {
        dashboard: 'ታዳሚ',
        children: 'ሕፃናት',
        registerChild: 'ሕፃን መመዝገብ',
        logout: 'ውድቀት',
        login: 'እውቂያ',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;

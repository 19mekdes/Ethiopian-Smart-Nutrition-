import React, { createContext, useState, useEffect } from 'react';


const mockChildrenData = [
    { id: 'child-001', name: 'Almaz Tadesse', woreda: 'Gulele', ageMonths: 18, lastVisitDate: '2025-10-20' },
    { id: 'child-002', name: 'Bruk Fantu', woreda: 'Arada', ageMonths: 28, lastVisitDate: '2025-11-15' },
    { id: 'child-003', name: 'Chala Dibaba', woreda: 'Lideta', ageMonths: 5, lastVisitDate: '2025-11-25' },
    { id: 'child-004', name: 'Genet Sisay', woreda: 'Kolfe', ageMonths: 36, lastVisitDate: '2025-09-01' },
];


const mockUserProfile = { 
    name: 'Abeba Kebede (Mock)', 
    woreda: 'Addis Ketema', 
    uid: 'mock-user-12345'
};


const mockDb = { 
    isMock: true,
    
    collection: (path) => ({
        onSnapshot: (callback) => {
            
            setTimeout(() => {
                const snapshot = {
                    docs: mockChildrenData.map(data => ({
                        id: data.id,
                        data: () => data,
                    })),
                };
                callback(snapshot);
            }, 500);

            // Return unsubscribe function
            return () => console.log('Mock listener unsubscribed.');
        },
    }),
};



export const AuthContext = createContext({
  user: null,
  loading: true,
  logout: () => {},
  db: null,
  auth: null,
  isConfigError: false, 
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isConfigError] = useState(false);

  useEffect(() => {
    
    setTimeout(() => {
      
      setUser(mockUserProfile);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLogin = (email, password) => {
    
    return new Promise((resolve, reject) => {
      setLoading(true);
      setTimeout(() => {
        
        if (email === 'healthworker@mock.com' && password === 'password123') { 
            setUser(mockUserProfile);
            setLoading(false);
            resolve();
        } else {
            setLoading(false);
            reject(new Error("Invalid mock email or password. Please use 'healthworker@mock.com' and 'password123'."));
        }
      }, 500);
    });
  };

  const handleLogout = () => {
    setUser(null);
    console.log('Mock user logged out.');
  };
  
  const contextValue = {
    user, 
    loading,
    login: handleLogin, 
    logout: handleLogout,
    // eslint-disable-next-line no-undef
    auth: mockAuth, 
    db: mockDb,
    isConfigError, 
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';

// Import Context
import { CartProvider } from './context/CartContext';

// Import Layout
import AppLayout from './layout/Applayout';

// Import Pages
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Favorites from './pages/Favorites';
import Courses from './pages/Courses';

// Import Components - ✅ THÊM USERPROFILE
import ChatBotAI from './components/ChatBotAI';
import Settings from './components/Settings';
import UserProfile from './components/UserProfile'; // ✅ THÊM IMPORT

// Import CSS
import './App.css';

// Ant Design theme configuration
const theme = {
  token: {
    colorPrimary: '#1d4ed8', // ✅ ĐỔI VỀ BLUE THEME
    borderRadius: 12,
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  },
  components: {
    Button: {
      borderRadius: 12,
      controlHeight: 44,
    },
    Input: {
      borderRadius: 12,
      controlHeight: 44,
    },
    Card: {
      borderRadius: 16,
    },
    Modal: {
      borderRadius: 16,
    },
  },
};

function App() {
  useEffect(() => {
    console.log('🚀 EduCommerce AI with UserProfile initialized!');
  }, []);

  return (
    <ConfigProvider locale={viVN} theme={theme}>
      <CartProvider>
        <Router>
          <div className="App">
            <AppLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/profile" element={<UserProfile />} /> {/* ✅ THÊM ROUTE */}
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </AppLayout>
            
            {/* AI ChatBot */}
            <ChatBotAI />
          </div>
        </Router>
      </CartProvider>
    </ConfigProvider>
  );
}

export default App;

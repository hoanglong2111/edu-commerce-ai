export const analyticsService = {
  // Track page view
  async trackPageView(page, userId = null) {
    console.log('📊 Analytics: Tracking page view:', page);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const pageView = {
          id: Date.now(),
          userId,
          page,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          sessionId: sessionStorage.getItem('sessionId') || `session_${Date.now()}`
        };
        
        const pageViews = JSON.parse(localStorage.getItem('pageViews') || '[]');
        pageViews.push(pageView);
        
        if (pageViews.length > 1000) {
          pageViews.splice(0, pageViews.length - 1000);
        }
        
        localStorage.setItem('pageViews', JSON.stringify(pageViews));
        
        resolve({ success: true, data: pageView });
      }, 100);
    });
  },

  // Track product view
  async trackProductView(productId, userId = null, productData = {}) {
    console.log('👁️ Analytics: Tracking product view:', productId);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const productView = {
          id: Date.now(),
          productId,
          userId,
          productData,
          timestamp: new Date().toISOString(),
          sessionId: sessionStorage.getItem('sessionId') || `session_${Date.now()}`
        };
        
        const productViews = JSON.parse(localStorage.getItem('productViews') || '[]');
        productViews.push(productView);
        
        if (productViews.length > 1000) {
          productViews.splice(0, productViews.length - 1000);
        }
        
        localStorage.setItem('productViews', JSON.stringify(productViews));
        
        resolve({ success: true, data: productView });
      }, 100);
    });
  },

  // Track search
  async trackSearch(keyword, resultCount, userId = null, filters = {}) {
    console.log('🔍 Analytics: Tracking search:', keyword);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const searchEvent = {
          id: Date.now(),
          keyword,
          resultCount,
          userId,
          filters,
          timestamp: new Date().toISOString(),
          sessionId: sessionStorage.getItem('sessionId') || `session_${Date.now()}`
        };
        
        const searches = JSON.parse(localStorage.getItem('searches') || '[]');
        searches.push(searchEvent);
        
        if (searches.length > 500) {
          searches.splice(0, searches.length - 500);
        }
        
        localStorage.setItem('searches', JSON.stringify(searches));
        
        resolve({ success: true, data: searchEvent });
      }, 100);
    });
  },

  // Track user action
  async trackUserAction(action, data = {}) {
    console.log('⚡ Analytics: Tracking action:', action);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const actionEvent = {
          id: Date.now(),
          action,
          data,
          timestamp: new Date().toISOString(),
          sessionId: sessionStorage.getItem('sessionId') || `session_${Date.now()}`
        };
        
        const userActions = JSON.parse(localStorage.getItem('userActions') || '[]');
        userActions.push(actionEvent);
        
        if (userActions.length > 1000) {
          userActions.splice(0, userActions.length - 1000);
        }
        
        localStorage.setItem('userActions', JSON.stringify(userActions));
        
        resolve({ success: true, data: actionEvent });
      }, 100);
    });
  }
};
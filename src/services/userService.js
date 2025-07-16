export const userService = {
  // Đăng nhập
  async login(email, password) {
    try {
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Mock login validation
          const mockUsers = [
            { 
              id: 1, 
              email: 'admin@edu.com', 
              password: '123456',
              name: 'Admin User',
              role: 'admin'
            },
            { 
              id: 2, 
              email: 'user@edu.com', 
              password: '123456',
              name: 'Normal User',
              role: 'user'
            }
          ];
          
          const user = mockUsers.find(u => u.email === email && u.password === password);
          
          if (user) {
            const token = `token_${user.id}_${Date.now()}`;
            const userData = {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
              avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3498db&color=fff`,
              joinDate: '2024-01-01',
              totalCourses: Math.floor(Math.random() * 20) + 5,
              completedCourses: Math.floor(Math.random() * 15) + 2
            };
            
            resolve({
              success: true,
              data: {
                user: userData,
                token,
                expiresIn: '24h'
              }
            });
          } else {
            reject(new Error('Email hoặc mật khẩu không đúng'));
          }
        }, 1000);
      });
      
      return response;
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  },

  // Đăng ký
  async register(userData) {
    try {
      const { name, email, password, confirmPassword } = userData;
      
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Validation
          if (password !== confirmPassword) {
            reject(new Error('Mật khẩu xác nhận không khớp'));
            return;
          }
          
          if (password.length < 6) {
            reject(new Error('Mật khẩu phải có ít nhất 6 ký tự'));
            return;
          }
          
          // Mock successful registration
          const newUser = {
            id: Date.now(),
            name,
            email,
            role: 'user',
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=52c41a&color=fff`,
            joinDate: new Date().toISOString().split('T')[0],
            totalCourses: 0,
            completedCourses: 0
          };
          
          const token = `token_${newUser.id}_${Date.now()}`;
          
          resolve({
            success: true,
            data: {
              user: newUser,
              token,
              message: 'Đăng ký thành công!'
            }
          });
        }, 1200);
      });
      
      return response;
    } catch (error) {
      console.error('Register Error:', error);
      throw error;
    }
  },

  // Lấy thông tin profile
  async getProfile() {
    try {
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const token = localStorage.getItem('authToken');
          
          if (!token) {
            reject(new Error('Chưa đăng nhập'));
            return;
          }
          
          // Mock user profile
          const profile = {
            id: 1,
            name: 'Nguyễn Văn A',
            email: 'user@edu.com',
            phone: '0123456789',
            address: 'Hà Nội, Việt Nam',
            bio: 'Sinh viên yêu thích công nghệ và học hỏi',
            avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=3498db&color=fff',
            joinDate: '2024-01-01',
            totalCourses: 15,
            completedCourses: 8,
            certificatesEarned: 5,
            totalStudyTime: '120 giờ',
            currentLevel: 'Trung cấp',
            favoriteCategories: ['Lập trình', 'Data Science', 'Marketing'],
            achievements: [
              { title: 'Học viên tích cực', description: 'Hoàn thành 5 khóa học', icon: '🏆' },
              { title: 'Người học siêng năng', description: 'Học hơn 100 giờ', icon: '📚' },
              { title: 'Chuyên gia JavaScript', description: 'Hoàn thành khóa JS nâng cao', icon: '💻' }
            ]
          };
          
          resolve({
            success: true,
            data: profile
          });
        }, 500);
      });
      
      return response;
    } catch (error) {
      console.error('Profile Error:', error);
      throw error;
    }
  },

  // Cập nhật profile
  async updateProfile(profileData) {
    try {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          // Mock successful update
          const updatedProfile = {
            ...profileData,
            updatedAt: new Date().toISOString()
          };
          
          resolve({
            success: true,
            data: updatedProfile,
            message: 'Cập nhật profile thành công!'
          });
        }, 800);
      });
      
      return response;
    } catch (error) {
      console.error('Update Profile Error:', error);
      throw new Error('Không thể cập nhật profile');
    }
  },

  // Quản lý favorites
  async getFavorites() {
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      
      return {
        success: true,
        data: {
          favoriteIds: favorites,
          total: favorites.length
        }
      };
    } catch (error) {
      console.error('Get Favorites Error:', error);
      throw new Error('Không thể tải danh sách yêu thích');
    }
  },

  async addFavorite(productId) {
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      
      if (!favorites.includes(productId)) {
        favorites.push(productId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }
      
      return {
        success: true,
        data: {
          favoriteIds: favorites,
          message: 'Đã thêm vào danh sách yêu thích'
        }
      };
    } catch (error) {
      console.error('Add Favorite Error:', error);
      throw new Error('Không thể thêm vào yêu thích');
    }
  },

  async removeFavorite(productId) {
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const updated = favorites.filter(id => id !== productId);
      
      localStorage.setItem('favorites', JSON.stringify(updated));
      
      return {
        success: true,
        data: {
          favoriteIds: updated,
          message: 'Đã xóa khỏi danh sách yêu thích'
        }
      };
    } catch (error) {
      console.error('Remove Favorite Error:', error);
      throw new Error('Không thể xóa khỏi yêu thích');
    }
  },

  // Lịch sử xem
  async getViewHistory() {
    try {
      const history = JSON.parse(localStorage.getItem('viewHistory') || '[]');
      
      return {
        success: true,
        data: {
          history,
          total: history.length
        }
      };
    } catch (error) {
      console.error('Get History Error:', error);
      throw new Error('Không thể tải lịch sử xem');
    }
  },

  async addToHistory(product) {
    try {
      const history = JSON.parse(localStorage.getItem('viewHistory') || '[]');
      
      // Remove existing entry if found
      const filtered = history.filter(item => item.id !== product.id);
      
      // Add to beginning
      const updated = [{ ...product, viewedAt: new Date().toISOString() }, ...filtered].slice(0, 50);
      
      localStorage.setItem('viewHistory', JSON.stringify(updated));
      
      return {
        success: true,
        data: {
          history: updated,
          message: 'Đã cập nhật lịch sử xem'
        }
      };
    } catch (error) {
      console.error('Add History Error:', error);
      throw new Error('Không thể cập nhật lịch sử');
    }
  },

  // ✅ GET USER COURSES
  async getUserCourses() {
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Mock delay
      
      // Mock user courses data
      const userCourses = {
        purchased: [
          {
            id: 1,
            name: "React.js Complete Course",
            instructor: "Nguyễn Văn A",
            image: "/api/placeholder/300/200",
            rating: 4.8,
            students: 12500,
            duration: "25 giờ",
            purchasedAt: "2024-01-15"
          },
          {
            id: 2,
            name: "Node.js Backend Development",
            instructor: "Trần Thị B",
            image: "/api/placeholder/300/200",
            rating: 4.7,
            students: 8900,
            duration: "18 giờ",
            purchasedAt: "2024-01-20"
          }
        ],
        inProgress: [
          {
            id: 1,
            name: "React.js Complete Course",
            instructor: "Nguyễn Văn A",
            image: "/api/placeholder/300/200",
            progress: 65,
            currentLesson: 13,
            totalLessons: 20,
            lastAccessed: "2024-01-25"
          }
        ],
        completed: [
          {
            id: 3,
            name: "JavaScript Fundamentals",
            instructor: "Lê Văn C",
            image: "/api/placeholder/300/200",
            rating: 4.9,
            completedAt: "2024-01-10",
            certificateId: "CERT-JS-001"
          }
        ]
      };

      console.log('✅ User courses loaded:', userCourses);
      
      return {
        success: true,
        data: userCourses
      };
      
    } catch (error) {
      console.error('❌ getUserCourses Error:', error);
      return {
        success: false,
        message: error.message
      };
    }
  }
};
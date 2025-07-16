

export const cartService = {
  // Lấy thông tin giỏ hàng
  async getCart() {
    try {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
          
          // Tính toán thông tin giỏ hàng
          const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          const discount = subtotal > 1000000 ? subtotal * 0.1 : 0; // 10% discount for orders > 1M
          const shipping = subtotal > 500000 ? 0 : 50000; // Free shipping for orders > 500K
          const tax = (subtotal - discount) * 0.1; // 10% VAT
          const total = subtotal - discount + shipping + tax;
          
          resolve({
            success: true,
            data: {
              items: cartItems,
              summary: {
                itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
                subtotal,
                discount,
                shipping,
                tax,
                total
              },
              coupons: {
                available: [
                  { code: 'WELCOME10', discount: 0.1, minOrder: 300000, description: 'Giảm 10% cho đơn hàng từ 300K' },
                  { code: 'STUDENT15', discount: 0.15, minOrder: 500000, description: 'Giảm 15% cho sinh viên' },
                  { code: 'NEWUSER20', discount: 0.2, minOrder: 1000000, description: 'Giảm 20% cho người dùng mới' }
                ],
                applied: null
              }
            }
          });
        }, 300);
      });
      
      return response;
    } catch (error) {
      console.error('Get Cart Error:', error);
      throw new Error('Không thể tải giỏ hàng');
    }
  },

  // Thêm sản phẩm vào giỏ hàng
  async addToCart(product, quantity = 1) {
    try {
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
          
          // Kiểm tra sản phẩm đã có trong giỏ chưa
          const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
          
          if (existingItemIndex >= 0) {
            // Cập nhật số lượng
            cartItems[existingItemIndex].quantity += quantity;
            cartItems[existingItemIndex].addedAt = new Date().toISOString();
          } else {
            // Thêm sản phẩm mới
            const cartItem = {
              ...product,
              quantity,
              addedAt: new Date().toISOString(),
              cartItemId: `cart_${product.id}_${Date.now()}`
            };
            cartItems.push(cartItem);
          }
          
          // Kiểm tra giới hạn giỏ hàng (tối đa 10 khóa học)
          if (cartItems.length > 10) {
            reject(new Error('Giỏ hàng chỉ chứa tối đa 10 khóa học'));
            return;
          }
          
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          
          resolve({
            success: true,
            data: {
              items: cartItems,
              addedItem: cartItems.find(item => item.id === product.id),
              message: `Đã thêm "${product.name}" vào giỏ hàng`
            }
          });
        }, 400);
      });
      
      return response;
    } catch (error) {
      console.error('Add to Cart Error:', error);
      throw error;
    }
  },

  // Cập nhật số lượng sản phẩm
  async updateCartItem(cartItemId, quantity) {
    try {
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
          const itemIndex = cartItems.findIndex(item => item.cartItemId === cartItemId);
          
          if (itemIndex < 0) {
            reject(new Error('Không tìm thấy sản phẩm trong giỏ hàng'));
            return;
          }
          
          if (quantity <= 0) {
            reject(new Error('Số lượng phải lớn hơn 0'));
            return;
          }
          
          if (quantity > 5) {
            reject(new Error('Tối đa 5 khóa học cùng loại'));
            return;
          }
          
          cartItems[itemIndex].quantity = quantity;
          cartItems[itemIndex].updatedAt = new Date().toISOString();
          
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          
          resolve({
            success: true,
            data: {
              items: cartItems,
              updatedItem: cartItems[itemIndex],
              message: 'Đã cập nhật số lượng'
            }
          });
        }, 200);
      });
      
      return response;
    } catch (error) {
      console.error('Update Cart Error:', error);
      throw error;
    }
  },

  // Xóa sản phẩm khỏi giỏ hàng
  async removeFromCart(cartItemId) {
    try {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
          const filteredItems = cartItems.filter(item => item.cartItemId !== cartItemId);
          
          localStorage.setItem('cartItems', JSON.stringify(filteredItems));
          
          resolve({
            success: true,
            data: {
              items: filteredItems,
              message: 'Đã xóa sản phẩm khỏi giỏ hàng'
            }
          });
        }, 250);
      });
      
      return response;
    } catch (error) {
      console.error('Remove from Cart Error:', error);
      throw new Error('Không thể xóa sản phẩm');
    }
  },

  // Xóa toàn bộ giỏ hàng
  async clearCart() {
    try {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          localStorage.setItem('cartItems', JSON.stringify([]));
          
          resolve({
            success: true,
            data: {
              items: [],
              message: 'Đã xóa toàn bộ giỏ hàng'
            }
          });
        }, 300);
      });
      
      return response;
    } catch (error) {
      console.error('Clear Cart Error:', error);
      throw new Error('Không thể xóa giỏ hàng');
    }
  },

  // Áp dụng mã giảm giá
  async applyCoupon(couponCode) {
    try {
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
          const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          
          // Danh sách mã giảm giá hợp lệ
          const validCoupons = [
            { 
              code: 'WELCOME10', 
              discount: 0.1, 
              minOrder: 300000, 
              description: 'Giảm 10% cho đơn hàng từ 300K',
              maxDiscount: 100000
            },
            { 
              code: 'STUDENT15', 
              discount: 0.15, 
              minOrder: 500000, 
              description: 'Giảm 15% cho sinh viên',
              maxDiscount: 200000
            },
            { 
              code: 'NEWUSER20', 
              discount: 0.2, 
              minOrder: 1000000, 
              description: 'Giảm 20% cho người dùng mới',
              maxDiscount: 500000
            },
            { 
              code: 'FLASH50', 
              discount: 0.5, 
              minOrder: 2000000, 
              description: 'Flash Sale - Giảm 50%',
              maxDiscount: 1000000,
              expires: '2024-12-31'
            }
          ];
          
          const coupon = validCoupons.find(c => c.code === couponCode.toUpperCase());
          
          if (!coupon) {
            reject(new Error('Mã giảm giá không hợp lệ'));
            return;
          }
          
          if (subtotal < coupon.minOrder) {
            reject(new Error(`Đơn hàng tối thiểu ${coupon.minOrder.toLocaleString('vi-VN')}₫`));
            return;
          }
          
          // Kiểm tra hạn sử dụng
          if (coupon.expires && new Date() > new Date(coupon.expires)) {
            reject(new Error('Mã giảm giá đã hết hạn'));
            return;
          }
          
          const discountAmount = Math.min(subtotal * coupon.discount, coupon.maxDiscount || Infinity);
          
          // Lưu coupon đã áp dụng
          const appliedCoupon = {
            ...coupon,
            appliedAt: new Date().toISOString(),
            discountAmount
          };
          
          localStorage.setItem('appliedCoupon', JSON.stringify(appliedCoupon));
          
          resolve({
            success: true,
            data: {
              coupon: appliedCoupon,
              discountAmount,
              newTotal: subtotal - discountAmount,
              message: `Đã áp dụng mã "${couponCode}" - Giảm ${discountAmount.toLocaleString('vi-VN')}₫`
            }
          });
        }, 600);
      });
      
      return response;
    } catch (error) {
      console.error('Apply Coupon Error:', error);
      throw error;
    }
  },

  // Xóa mã giảm giá
  async removeCoupon() {
    try {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          localStorage.removeItem('appliedCoupon');
          
          resolve({
            success: true,
            data: {
              message: 'Đã xóa mã giảm giá'
            }
          });
        }, 200);
      });
      
      return response;
    } catch (error) {
      console.error('Remove Coupon Error:', error);
      throw new Error('Không thể xóa mã giảm giá');
    }
  },

  // Lấy thông tin mã giảm giá đã áp dụng
  async getAppliedCoupon() {
    try {
      const appliedCoupon = JSON.parse(localStorage.getItem('appliedCoupon') || 'null');
      
      return {
        success: true,
        data: {
          coupon: appliedCoupon
        }
      };
    } catch (error) {
      console.error('Get Applied Coupon Error:', error);
      throw new Error('Không thể lấy thông tin mã giảm giá');
    }
  },

  // Validate giỏ hàng trước khi checkout
  async validateCart() {
    try {
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
          
          if (cartItems.length === 0) {
            reject(new Error('Giỏ hàng trống'));
            return;
          }
          
          // Kiểm tra tính khả dụng của sản phẩm (mock)
          const unavailableItems = cartItems.filter(item => {
            // Giả lập một số sản phẩm không khả dụng
            return Math.random() < 0.05; // 5% chance unavailable
          });
          
          if (unavailableItems.length > 0) {
            reject(new Error(`Một số sản phẩm không còn khả dụng: ${unavailableItems.map(item => item.name).join(', ')}`));
            return;
          }
          
          // Kiểm tra giá cả có thay đổi không (mock)
          const priceChanges = cartItems.filter(item => {
            return Math.random() < 0.02; // 2% chance price changed
          });
          
          resolve({
            success: true,
            data: {
              isValid: true,
              items: cartItems,
              warnings: priceChanges.length > 0 ? [
                `Giá một số sản phẩm đã thay đổi: ${priceChanges.map(item => item.name).join(', ')}`
              ] : [],
              message: 'Giỏ hàng hợp lệ, sẵn sàng thanh toán'
            }
          });
        }, 800);
      });
      
      return response;
    } catch (error) {
      console.error('Validate Cart Error:', error);
      throw error;
    }
  }
};
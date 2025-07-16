export const orderService = {
  // Tạo đơn hàng mới
  async createOrder(orderData) {
    try {
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const { 
            items, 
            shippingInfo, 
            paymentMethod, 
            couponCode,
            specialRequests 
          } = orderData;
          
          // Validation
          if (!items || items.length === 0) {
            reject(new Error('Đơn hàng trống'));
            return;
          }
          
          if (!shippingInfo || !shippingInfo.name || !shippingInfo.email) {
            reject(new Error('Thông tin giao hàng không đầy đủ'));
            return;
          }
          
          if (!paymentMethod) {
            reject(new Error('Chưa chọn phương thức thanh toán'));
            return;
          }
          
          // Tính toán giá
          const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          const appliedCoupon = JSON.parse(localStorage.getItem('appliedCoupon') || 'null');
          const discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
          const shipping = subtotal > 500000 ? 0 : 50000;
          const tax = (subtotal - discount) * 0.1;
          const total = subtotal - discount + shipping + tax;
          
          // Tạo order
          const order = {
            id: `ORD${Date.now()}`,
            orderNumber: `EDU${String(Date.now()).slice(-8)}`,
            status: 'pending',
            items: items.map(item => ({
              ...item,
              orderItemId: `item_${item.id}_${Date.now()}`
            })),
            customer: {
              name: shippingInfo.name,
              email: shippingInfo.email,
              phone: shippingInfo.phone,
              address: shippingInfo.address
            },
            pricing: {
              subtotal,
              discount,
              shipping,
              tax,
              total
            },
            payment: {
              method: paymentMethod,
              status: 'pending',
              transactionId: null
            },
            coupon: appliedCoupon,
            specialRequests,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
            tracking: {
              status: 'processing',
              steps: [
                {
                  status: 'order_placed',
                  title: 'Đơn hàng đã được đặt',
                  timestamp: new Date().toISOString(),
                  completed: true
                },
                {
                  status: 'payment_processing',
                  title: 'Đang xử lý thanh toán',
                  timestamp: null,
                  completed: false
                },
                {
                  status: 'course_access',
                  title: 'Cấp quyền truy cập khóa học',
                  timestamp: null,
                  completed: false
                },
                {
                  status: 'completed',
                  title: 'Hoàn thành',
                  timestamp: null,
                  completed: false
                }
              ]
            }
          };
          
          // Lưu order vào localStorage (mock database)
          const existingOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
          existingOrders.unshift(order);
          localStorage.setItem('userOrders', JSON.stringify(existingOrders));
          
          // Clear cart sau khi tạo order
          localStorage.setItem('cartItems', JSON.stringify([]));
          localStorage.removeItem('appliedCoupon');
          
          resolve({
            success: true,
            data: {
              order,
              message: 'Đơn hàng đã được tạo thành công!',
              nextSteps: [
                'Thanh toán đơn hàng',
                'Nhận email xác nhận',
                'Truy cập khóa học ngay sau khi thanh toán'
              ]
            }
          });
        }, 1200);
      });
      
      return response;
    } catch (error) {
      console.error('Create Order Error:', error);
      throw error;
    }
  },

  // Lấy danh sách đơn hàng
  async getOrders(params = {}) {
    try {
      const { page = 1, limit = 10, status, dateFrom, dateTo } = params;
      
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          let orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
          
          // Filter by status
          if (status && status !== 'all') {
            orders = orders.filter(order => order.status === status);
          }
          
          // Filter by date range
          if (dateFrom) {
            orders = orders.filter(order => new Date(order.createdAt) >= new Date(dateFrom));
          }
          
          if (dateTo) {
            orders = orders.filter(order => new Date(order.createdAt) <= new Date(dateTo));
          }
          
          // Sort by created date (newest first)
          orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          
          // Pagination
          const total = orders.length;
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
          const paginatedOrders = orders.slice(startIndex, endIndex);
          
          resolve({
            success: true,
            data: {
              orders: paginatedOrders,
              pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
              },
              summary: {
                totalOrders: total,
                pendingOrders: orders.filter(o => o.status === 'pending').length,
                completedOrders: orders.filter(o => o.status === 'completed').length,
                totalValue: orders.reduce((sum, o) => sum + o.pricing.total, 0)
              }
            }
          });
        }, 600);
      });
      
      return response;
    } catch (error) {
      console.error('Get Orders Error:', error);
      throw new Error('Không thể tải danh sách đơn hàng');
    }
  },

  // Lấy chi tiết đơn hàng
  async getOrderById(orderId) {
    try {
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
          const order = orders.find(o => o.id === orderId || o.orderNumber === orderId);
          
          if (!order) {
            reject(new Error('Không tìm thấy đơn hàng'));
            return;
          }
          
          // Enrich order với thông tin chi tiết
          const detailedOrder = {
            ...order,
            supportInfo: {
              phone: '1900-1234',
              email: 'support@edu-commerce.com',
              workingHours: '8:00 - 22:00 (T2-CN)'
            },
            refundPolicy: {
              eligible: order.status === 'completed' && 
                       new Date() - new Date(order.createdAt) < 7 * 24 * 60 * 60 * 1000, // 7 days
              deadline: new Date(new Date(order.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()
            }
          };
          
          resolve({
            success: true,
            data: detailedOrder
          });
        }, 400);
      });
      
      return response;
    } catch (error) {
      console.error('Get Order Error:', error);
      throw error;
    }
  },

  // Cập nhật trạng thái đơn hàng
  async updateOrderStatus(orderId, newStatus, note = '') {
    try {
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
          const orderIndex = orders.findIndex(o => o.id === orderId);
          
          if (orderIndex < 0) {
            reject(new Error('Không tìm thấy đơn hàng'));
            return;
          }
          
          const validStatuses = ['pending', 'paid', 'processing', 'completed', 'cancelled', 'refunded'];
          
          if (!validStatuses.includes(newStatus)) {
            reject(new Error('Trạng thái không hợp lệ'));
            return;
          }
          
          // Update order
          orders[orderIndex].status = newStatus;
          orders[orderIndex].updatedAt = new Date().toISOString();
          
          if (note) {
            orders[orderIndex].statusNote = note;
          }
          
          // Update tracking steps
          const tracking = orders[orderIndex].tracking;
          const now = new Date().toISOString();
          
          switch (newStatus) {
            case 'paid':
              const paymentStep = tracking.steps.find(s => s.status === 'payment_processing');
              if (paymentStep) {
                paymentStep.completed = true;
                paymentStep.timestamp = now;
              }
              orders[orderIndex].payment.status = 'completed';
              orders[orderIndex].payment.transactionId = `TXN${Date.now()}`;
              break;
              
            case 'processing':
              const processingStep = tracking.steps.find(s => s.status === 'course_access');
              if (processingStep) {
                processingStep.completed = true;
                processingStep.timestamp = now;
              }
              break;
              
            case 'completed':
              const completedStep = tracking.steps.find(s => s.status === 'completed');
              if (completedStep) {
                completedStep.completed = true;
                completedStep.timestamp = now;
              }
              break;
          }
          
          localStorage.setItem('userOrders', JSON.stringify(orders));
          
          resolve({
            success: true,
            data: {
              order: orders[orderIndex],
              message: `Đơn hàng đã được cập nhật trạng thái: ${newStatus}`
            }
          });
        }, 500);
      });
      
      return response;
    } catch (error) {
      console.error('Update Order Status Error:', error);
      throw error;
    }
  },

  // Xử lý thanh toán
  async processPayment(orderId, paymentData) {
    try {
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const { method, cardNumber, expiryDate, cvv, bankCode } = paymentData;
          
          // Validation
          if (method === 'credit_card') {
            if (!cardNumber || !expiryDate || !cvv) {
              reject(new Error('Thông tin thẻ không đầy đủ'));
              return;
            }
            
            // Mock validation
            if (cardNumber.length < 16) {
              reject(new Error('Số thẻ không hợp lệ'));
              return;
            }
          }
          
          if (method === 'bank_transfer' && !bankCode) {
            reject(new Error('Chưa chọn ngân hàng'));
            return;
          }
          
          // Mock payment processing
          const isSuccess = Math.random() > 0.05; // 95% success rate
          
          if (!isSuccess) {
            reject(new Error('Thanh toán thất bại. Vui lòng thử lại.'));
            return;
          }
          
          // Update order status
          const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
          const orderIndex = orders.findIndex(o => o.id === orderId);
          
          if (orderIndex >= 0) {
            orders[orderIndex].status = 'paid';
            orders[orderIndex].payment.status = 'completed';
            orders[orderIndex].payment.transactionId = `TXN${Date.now()}`;
            orders[orderIndex].payment.paidAt = new Date().toISOString();
            orders[orderIndex].updatedAt = new Date().toISOString();
            
            localStorage.setItem('userOrders', JSON.stringify(orders));
          }
          
          resolve({
            success: true,
            data: {
              transactionId: `TXN${Date.now()}`,
              paidAmount: orders[orderIndex]?.pricing.total || 0,
              paymentMethod: method,
              paidAt: new Date().toISOString(),
              message: 'Thanh toán thành công!',
              courseAccess: {
                available: true,
                accessUrl: `/my-courses?order=${orderId}`,
                validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year
              }
            }
          });
        }, 2000); // Simulate payment processing time
      });
      
      return response;
    } catch (error) {
      console.error('Payment Error:', error);
      throw error;
    }
  },

  // Hủy đơn hàng
  async cancelOrder(orderId, reason = '') {
    try {
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
          const orderIndex = orders.findIndex(o => o.id === orderId);
          
          if (orderIndex < 0) {
            reject(new Error('Không tìm thấy đơn hàng'));
            return;
          }
          
          const order = orders[orderIndex];
          
          // Kiểm tra có thể hủy không
          if (['completed', 'cancelled', 'refunded'].includes(order.status)) {
            reject(new Error('Không thể hủy đơn hàng này'));
            return;
          }
          
          // Update order
          orders[orderIndex].status = 'cancelled';
          orders[orderIndex].cancelledAt = new Date().toISOString();
          orders[orderIndex].cancelReason = reason;
          orders[orderIndex].updatedAt = new Date().toISOString();
          
          localStorage.setItem('userOrders', JSON.stringify(orders));
          
          resolve({
            success: true,
            data: {
              order: orders[orderIndex],
              message: 'Đơn hàng đã được hủy thành công',
              refundInfo: order.payment.status === 'completed' ? {
                eligible: true,
                amount: order.pricing.total,
                processingTime: '3-5 ngày làm việc'
              } : null
            }
          });
        }, 600);
      });
      
      return response;
    } catch (error) {
      console.error('Cancel Order Error:', error);
      throw error;
    }
  }
};
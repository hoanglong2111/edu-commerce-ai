import data from '../Data/mockData';

export const productService = {
  // Lấy danh sách sản phẩm với phân trang và filter
  async getProducts(params = {}) {
    try {
      console.log('🔧 ProductService: Using pure mock mode');
      console.log('🔍 Available mockData:', data?.length);
      
      const { page = 1, limit = 12, category, priceRange, keyword } = params;
      
      if (!data || !Array.isArray(data) || data.length === 0) {
        console.error('❌ MockData is empty or invalid:', data);
        throw new Error('Dữ liệu không khả dụng');
      }
      
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          let filtered = [...data];
          
          console.log('🔍 Original data length:', filtered.length);
          
          // Filter by category
          if (category && category !== 'all') {
            filtered = filtered.filter(p => p.category === category);
            console.log('🔍 After category filter:', filtered.length);
          }
          
          // Filter by price range
          if (priceRange && priceRange !== 'all') {
            switch (priceRange) {
              case '<500':
                filtered = filtered.filter(p => p.price < 500000);
                break;
              case '500-1000':
                filtered = filtered.filter(p => p.price >= 500000 && p.price <= 1000000);
                break;
              case '>1000':
                filtered = filtered.filter(p => p.price > 1000000);
                break;
              default:
                break;
            }
            console.log('🔍 After price filter:', filtered.length);
          }
          
          // Filter by keyword
          if (keyword) {
            filtered = filtered.filter(p => 
              p.name.toLowerCase().includes(keyword.toLowerCase()) ||
              p.category.toLowerCase().includes(keyword.toLowerCase()) ||
              p.instructor.toLowerCase().includes(keyword.toLowerCase()) ||
              p.shortDesc.toLowerCase().includes(keyword.toLowerCase())
            );
            console.log('🔍 After keyword filter:', filtered.length);
          }
          
          // Pagination
          const total = filtered.length;
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
          const products = filtered.slice(startIndex, endIndex);
          
          console.log('🔍 Final products:', products.length);
          
          resolve({
            success: true,
            data: {
              products,
              total,
              page,
              limit,
              totalPages: Math.ceil(total / limit)
            }
          });
        }, 500);
      });
      
      console.log('✅ ProductService response:', response);
      return response;
    } catch (error) {
      console.error('❌ Product Service Error:', error);
      throw new Error('Không thể tải danh sách sản phẩm: ' + error.message);
    }
  },

  // Lấy chi tiết sản phẩm theo ID
  async getProductById(id) {
    try {
      console.log('🔍 Getting product by ID:', id);
      
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const product = data.find(p => p.id === parseInt(id));
          console.log('🔍 Found product:', product);
          
          if (product) {
            resolve({
              success: true,
              data: product
            });
          } else {
            reject(new Error('Sản phẩm không tồn tại'));
          }
        }, 300);
      });
      
      return response;
    } catch (error) {
      console.error('Get Product Error:', error);
      throw new Error('Không thể tải thông tin sản phẩm');
    }
  },

  // Tìm kiếm sản phẩm với suggestions
  async searchProducts(keyword, limit = 6) {
    try {
      console.log('🔍 Searching products:', keyword);
      
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          const filtered = data.filter(product => 
            product.name.toLowerCase().includes(keyword.toLowerCase()) ||
            product.category.toLowerCase().includes(keyword.toLowerCase()) ||
            product.instructor.toLowerCase().includes(keyword.toLowerCase())
          ).slice(0, limit);
          
          console.log('🔍 Search results:', filtered.length);
          
          resolve({
            success: true,
            data: {
              suggestions: filtered,
              total: filtered.length,
              keyword
            }
          });
        }, 200);
      });
      
      return response;
    } catch (error) {
      console.error('Search Error:', error);
      throw new Error('Lỗi tìm kiếm sản phẩm');
    }
  },

  // Lấy sản phẩm trending
  async getTrendingProducts(limit = 8) {
    try {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          const trending = data
            .filter(p => p.rating >= 4.5)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, limit);
          
          resolve({
            success: true,
            data: {
              products: trending,
              total: trending.length
            }
          });
        }, 400);
      });
      
      return response;
    } catch (error) {
      console.error('Trending Products Error:', error);
      throw new Error('Không thể tải sản phẩm trending');
    }
  }
};
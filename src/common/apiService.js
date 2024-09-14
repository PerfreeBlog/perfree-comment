export class ApiService {
    // 通用请求封装
    static async request(endpoint, method = 'GET', data = null, headers = {}) {
      const url = endpoint;
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      };
  
      // 如果是 POST 或 PUT 方法，传递 body 数据
      if (data) {
        options.body = JSON.stringify(data);
      }
  
      try {
        const response = await fetch(url, options);
  
        // 检查响应是否成功
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || '请求失败');
        }
  
        // 返回解析后的 JSON 数据
        return await response.json();
      } catch (error) {
        // 捕获并抛出错误
        console.error('请求失败:', error.message);
        throw error;
      }
    }
  
    // GET 请求封装
    static async get(endpoint, headers = {}) {
      return await this.request(endpoint, 'GET', null, headers);
    }
  
    // POST 请求封装
    static async post(endpoint, data, headers = {}) {
      return await this.request(endpoint, 'POST', data, headers);
    }
  
    // PUT 请求封装
    static async put(endpoint, data, headers = {}) {
      return await this.request(endpoint, 'PUT', data, headers);
    }
  
    // DELETE 请求封装
    static async delete(endpoint, headers = {}) {
      return await this.request(endpoint, 'DELETE', null, headers);
    }
  }
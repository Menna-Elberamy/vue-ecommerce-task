import axios from 'axios';

class ProductService {
  fetchProducts() {
      return axios.get('http://localhost:3000/products')
      .then(response => response.data)
      .catch(error => {
        throw new Error(`Failed to fetch product details: ${error}`);
      });
   
  }
  getProductDetails(id) {
    return axios.get(`http://localhost:3000/products/${id}`)
      .then(response => response.data)
      .catch(error => {
        throw new Error(`Failed to fetch product details: ${error}`);
      });
  }
}

export default new ProductService();

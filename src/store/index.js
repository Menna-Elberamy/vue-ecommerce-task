import { createStore } from 'vuex';

export default createStore({
  state: {
    cartItems: [], 
    totalPrice: 0

  },
  getters: {},
  mutations: {
    addToCart(state, product) {
      if (product.hasweight && product.hasweight.status) {
        for (const weight of product.hasweight.weights) {
          const newItem = {
            ...product,
            weight: weight,
            quantity: 1 ,
            totalPrice: product.price 
          };
          state.cartItems.push(newItem);
          state.totalPrice += newItem.price * newItem.quantity;
        }
      } else {
        const newItem = {
          ...product,
          quantity: 1,
          totalPrice: product.price 
        };
        state.cartItems.push(newItem);
        state.totalPrice += newItem.price * newItem.quantity;
      }
    },
    removeFromCart(state, product) {
      const index = state.cartItems.findIndex(item => item.id === product.id);
      if (index !== -1) {
        state.cartItems.splice(index, 1); 
        state.totalPrice -= product.price;
      }
    },
    
    calculateTotalPrice(state) {
      // Recalculate the total price of the cart
      state.totalPrice = state.cartItems.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
    }
  },
  actions: {
    addToCart({ commit }, product) {
      commit('addToCart', product); 
    },
    removeFromCart({ commit }, product) {
      commit('removeFromCart', product);
    },
  },
  modules: {},
});

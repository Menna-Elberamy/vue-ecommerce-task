<template>
      <aside class="cart-aside" :class="{'sidebar--toggled': isOpen}">
        <div v-if="cartItems && cartItems.length > 0" class="conatiner">
            <div class="col-lg-12 d-flex justify-content-end mt-4">
                <i @click="closeCartAside" :class="['far', 'fa-solid', 'fa-xmark', 'fs-3', 'text-green', {'close-icon': !isOpen}]" style="cursor: pointer;"></i>
            </div>
            <div class="col-lg-12 text-center">
                <div class="border-top py-3 mt-3">
                    <div class="d-flex justify-content-between align-items-center">
                        <span>SubTotal</span>
                        <span>{{ totalPrice.toFixed(2) }} EGP</span>
                    </div>
                </div>
                <button class="checkout my-3 w-75">Checkout</button>
            </div>
            <div class="row border-top py-3" v-for="(item, index) in cartItems" :key="index">
                <div class="col-lg-3">
                    <img class="img-fluid" 
                         :src="item.imageUrl"
                         :alt="item.name">
                </div>
                <div class="col-lg-9">
                    <p class="mb-1">{{ item.name }}</p>
                    <p class="text-green mt-1">
                        {{ item.price.toFixed(2) }} EGP  
                        <span v-if="item.hasweight.status"> / {{item.hasweight.weights}} gm</span>
                    </p>
                <div class="d-flex justify-content-between align-items-center">
                    <button class="btn-container">
                        <div class="quantity-control">
                            <button class="increment" @click="decreaseQuantity(item)">-</button>
                            <span class="quantity">{{ item.quantity }}</span>
                            <button class="decrement" @click="increaseQuantity(item)">+</button>
                        </div>
                    </button>
                    <div class="cart-control">
                        <span class="me-2 text-danger" @click="removeFromCart(item)">Remove</span>
                        <span class="text-green">Move to wishlist</span>
                    </div>
                </div>
                </div>
            </div>
            <div class="row border-top py-3">
                <div class="col-lg-12">
                    <p class="d-flex justify-content-between align-items-center mb-1">
                        <span>SubTotal</span>
                        <span>{{ totalPrice.toFixed(2) }} EGP</span>
                    </p>
                    <p class="d-flex justify-content-between align-items-center mb-1">
                        <span>Tax</span>
                        <span>included</span>
                    </p>
                    <p class="d-flex justify-content-between align-items-center mb-1">
                        <span class="fs-4">Order Total</span>
                        <span>{{ totalPrice.toFixed(2) }} EGP</span>
                    </p>
                </div>
            </div>
        </div>
        <div v-else class="d-flex justify-content-center align-items-center ">
            <div>
                <div class="col-lg-12 d-flex justify-content-end mt-4">
                    <i @click="closeCartAside" :class="['far', 'fa-solid', 'fa-xmark', 'fs-4', 'text-green', {'close-icon': !isOpen}]" style="cursor: pointer;"></i>
                </div>
                <p class="text-green fw-bold mt-5 pt-5">No Products in Cart</p>
            </div>
        </div>
      </aside>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "CartAside",
  props: {
    isOpen: Boolean
  },
  computed: {
    ...mapState(['cartItems','totalPrice']),
  },
  methods: {
    closeCartAside() {
      this.$emit('close');
    },
    removeFromCart(item) {
      // Dispatch the 'removeFromCart' action
      this.$store.dispatch('removeFromCart', item);
    },
    increaseQuantity(item) {
        item.quantity++;
        item.totalPrice = item.price * item.quantity; // Recalculate total price for the item
        this.updateTotalPrice();
    },
    decreaseQuantity(item) {
        if (item.quantity > 1) {
            item.quantity--;
            item.totalPrice = item.price * item.quantity; // Recalculate total price for the item
            this.updateTotalPrice();
        }
    },
    updateTotalPrice() {
    this.$store.commit('calculateTotalPrice');
    }
  },
};
</script>


<style lang="scss">
@import "../../src/assets/css/_variables";
@import "../../src/assets/css/_mixins";


.cart-aside {
    position: fixed;
    background: white;
    height: 100vh;
    right: 0;
    z-index: 9999;
    top: 0;
    bottom: 0;
    box-shadow: 0 0 5px 5px #e4e4df;
    padding: 0px 20px;
    transition: transform 0.6s;
    transform: translateX(100%);
    overflow-y: scroll;
    max-width: 500px;
    .checkout{
        @include border-radius;
        background: linear-gradient(to right,$primary-color,$secondary-color);
        border: 0px;
        color: white;
        padding: 6px 20px;
    }
    .text-green{
        color:$primary-color;
    }
    .cart-control{
        span{
            cursor: pointer;
        }
    }
    .btn-container{
        @include border-radius;
        .increment , .decrement{
            background-color: transparent;
            border: 0px;
        }
        .quantity {
        border-left: 1px solid #a5a4a4;
        border-right: 1px solid #a5a4a4;
        padding: 0px 10px;
        }
    }
}
.cart-aside.open {
  transform: translateX(0%);
}
.sidebar--toggled{
    transform: translateX(0%);

}
.close-icon {
    transform: translateX(100%);
}

</style>
  
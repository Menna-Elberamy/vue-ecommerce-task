<template>
  <div class="container py-5 my-5">
    <div class="row"  v-if="product">
      <div class="col-lg-5 col-sm-12 d-flex align-items-center justify-content-center">
        <img class="img-fluid" :src="product.imageUrl"  :alt="product.name">
      </div>
      <div class="col-lg-7 col-sm-12 product-detail">
        <h5 class="product-name">{{ product.name }}</h5>
        <p class="product-category text-muted ">{{ product.category }}</p>
        <p class="product-price mt-4">{{ product.price }}</p>
        <p class="weight mb-1">Grocery Weight</p>
        <div v-if="product?.hasweight?.status " class="dropdown mb-4" >
          <select >
            <option v-for="weight in product.hasweight.weights" :key="weight" 
                    :value=weight> 
                    {{ weight }} gm 
            </option>
          </select>
        </div>
        <p class="mb-1">Quantity</p>
        <div>
          <button class="btn-container">
              <div class="quantity-control">
                  <button class="increment" @click="decreaseQuantity(product)">-</button>
                  <span class="quantity">{{ product.quantity }}</span>
                  <button class="decrement" @click="increaseQuantity(product)">+</button>
              </div>
            </button>
          <button class="btn add-to-cart mx-2 position-relative"  @click="addToCart">
            Add to cart 
            <span v-if="product?.hasweight?.status " class="has-weight">
              {{ product.hasweight.weights.length }}
            </span>
          </button>
        </div>
        <div class="border-bottom mt-3 py-2">
          <span class="text-black fw-bold">
            <i class="far fa-clock me-2"></i>
            Deliver Within:
          </span>
          <span>The same</span>
          <span class="text-black fw-bold ms-2">Day</span>
        </div>
        <div class="border-bottom py-2">
          <img class="w-5 me-2" src="../../assets/images/logo.png">
          <span>Sold and Delivery by Spinneys</span>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>

</template>

<script>
import ProductService from "@/services/ProductService";

export default {
  name: 'ProductDetail',
  props: ['id'],
  data() {
    return {
      product: {},
    };
  },
  created() {
    this.getProductDetails();

  },
  methods: {
    async getProductDetails() {
      const id = this.$route.params.id;
      this.product= await ProductService.getProductDetails(id);
      console.log(this.product)
      console.log(this.product.hasweight.status)
    },
    addToCart() {
      this.$store.dispatch('addToCart', this.product);
    },
    increaseQuantity(item) {
        item.quantity++;
        item.totalPrice = item.price * item.quantity; 
        this.updateTotalPrice();
    },
    decreaseQuantity(item) {
        if (item.quantity > 1) {
            item.quantity--;
            item.totalPrice = item.price * item.quantity; 
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
@import "../../../src/assets/css/variables";
@import "../../../src/assets/css/mixins";
.product-detail{
  .product-name{
    color:$primary-color;
  }
  .product-category {
    font-weight: bold;
    border-bottom: 1px solid;
    max-width: fit-content;
  }
  .product-price{
    color:$primary-color;
    font-weight: bold;
    font-size: 1.4rem;
    &::before{
      content: 'EGP ';
    }
  }
  .weight{
    font-weight: bold;
    font-size: 1.1rem;
    color: black;
  }
  select{
    max-width: fit-content;
    padding: 5px 8px;
    border: 1px solid $primary-color;
    border-radius: 0.375rem;
    
  }
  .add-to-cart{
    @include border-radius;
    background: linear-gradient(to right,$primary-color,$secondary-color);
    border: 0px;
    color: white;
    padding: 6px 20px;
    &:hover{
      color: #fff;
    }
  }
 
  .w-5{
    width: 8%;
  }
  .has-weight{
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #F9DE00;
    top: -5px;
    right: -2px;
    text-align: center;
    padding: 1px;
    font-size: 0.6rem;
    color: $primary-color;
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

</style>
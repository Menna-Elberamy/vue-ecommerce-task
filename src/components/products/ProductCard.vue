<template>
  <div class="col-lg-3 col-md-4 col-sm-6 mb-2">
    <div class="product-card">
      <img
        :src="product.imageUrl"
        :alt="product.name"
        class="product-image"
      />
      <!-- <h5 class="product-name">{{ product.name }}</h5> -->
      <router-link :to="`/product/${product.id}`" class="product-name">{{ product.name }}</router-link>

      <p class="product-price">{{ product.price }}</p>
      <button 
          @click="addToCart"
          class="add-to-cart position-relative" 
          type="button">Add to cart
          <span v-if="product?.hasweight?.status" class="has-weight">
            {{ product.hasweight.weights.length }}
          </span>
      </button>
      <i class="far fa-heart wishlist"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    }
  },
  methods: {
  addToCart() {
    this.$store.dispatch('addToCart', this.product);
  },
},
};
</script>

<style scoped lang="scss">
@import "../../../src/assets/css/variables";
@import "../../../src/assets/css/mixins";

.product-card {
  position: relative;
  padding: 16px;
  transition: 0.5s;
  border: 1px solid white;
  border-radius: 15px;
  color: $font-color;
  text-align: initial;
  cursor: pointer;
  &:hover {
    border: 1px solid $primary-color;
  }
  // &::after {
  //   border: 1px solid #e7e7e7;
  //   content: "";
  //   position: absolute;
  //   bottom: -6px;
  //   width: 100%;
  //   left: 0;
  // }
  .product-image {
    width: 100%;
    // padding: 40px;
    height: auto;
    object-fit: contain;
    object-position: center;
    height: 171px;
    max-width: 190px;
    margin: auto;
    display: block;
  }

  .product-name {
    margin-top: 8px;
    height: 50px;
    margin: 0;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.1rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 24.47px;
    text-decoration: none;
    color:$primary-color;
  }

  .product-price {
    margin-top: 4px;
    font-weight: bold;
    color: $primary-color;
    &::before {
      content: "EGP ";
    }
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
  button {
    @include border-radius;
  }
  .wishlist {
    position: absolute;
    top: 5%;
    right: 5%;
    width: 15%;
    text-align: center;
    height: 20%;
    color: $primary-color;
    font-size: 1.1rem;
  }
}
</style>

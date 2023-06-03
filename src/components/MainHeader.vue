<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <div class="row d-flex justify-content-between align-items-center">
        <div class="col-lg-6 col-6">
          <a class="navbar-brand d-flex justify-content-start" href="#">
            <img
              class="logo-img"
              src="../assets/images/logo.png"
              alt="spyiness-logo"
            />
          </a>
        </div>
        <div class="col-lg-6 col-6 d-flex justify-content-end align-items-center">
          <ul class="navbar-nav">
              <li class="nav-item mx-3">
                <router-link to="/">Home</router-link>
              </li>
              <!-- <li class="nav-item">
                <router-link to="/product/:id">Product</router-link>
              </li> -->
            </ul>
            <span class="position-relative" @click="toggleSidebar">
              <i class="far fa-solid fa-cart-shopping ms-2"></i>
              <span class="cart-counter">{{ cartItems.length }}</span>
            </span>
         
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "MainHeader",
 
  methods: {
    toggleSidebar() {
      this.$emit("toggle-sidebar", !this.sidebarOpen);
    }
  },
  computed: {
    ...mapState(['cartItems']),
  },
};
</script>

<style scoped lang="scss">
@import "../../src/assets/css/_variables";
@import "../../src/assets/css/_mixins";

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.6s;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-leave-active,
.slide-enter-to {
  transform: translateX(0%);
}
nav {
  padding: 1rem;
  a {
    color: black;
    text-decoration: none;
    font-size: 1.2rem;
    @media (max-width: 768px) { 
      font-size: 0.99rem;

      }
    img {
      width: 20%;
      @media (max-width: 768px) { 
        width: 80%;
      }

    }
    &.router-link-exact-active {
      color: $primary-color;
      font-weight: bold;
    }
  }
  .fa-cart-shopping{
    color: $primary-color;
    font-size: 1.3rem;
    cursor: pointer;
  }
  .cart-counter{
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #E76A43;
    top: -9px;
    right: -5px;
    text-align: center;
    padding: 1px;
    font-size: 0.6rem;
    color: #fff;
  }
  ul{
    flex-direction: row;
  }
}

</style>

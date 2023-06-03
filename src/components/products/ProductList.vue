<template>
  <div class="container">
    <!-- Tabs Filteration-->
    <div class="row">
      <div class="col-lg-12 d-flex justify-content-end py-5">
        <div class="category-tabs">
          <button
            v-for="(category, index) in categories"
            :key="index"
            :class="{ active: activeCategory === category }"
            @click="setActiveCategory(category)"
          >
            {{ category }}
          </button>
        </div>
      </div>
      <div
        class="col-lg-12 d-flex justify-content-between my-4 pb-4 border-bottom"
      >
        <div>
          <span>{{ products.length }} Products</span>
          <span class="ms-3">
            <i class="fas fa-th-large mx-3 active"></i>
            <i class="fa-solid fa-list"></i>
          </span>
        </div>
        <div class="d-flex">
          <span class="me-3">Sort By</span>
          <div class="dropdown">
            <span
              class="dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Newest First
            </span>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Newest First</a></li>
              <li><a class="dropdown-item" href="#">Lastest First</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Display the list of products -->
    <div class="row">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import ProductService from "@/services/ProductService";
import ProductCard from "@/components/products/ProductCard.vue";

export default {
  name: "ProductList",
  components: {
    ProductCard,
  },
  data() {
    return {
      categories: ["All", "Food", "Non-food", "Fashion-Linen"],
      activeCategory: "All",
      products: [],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  computed: {
    filteredProducts() {
      if (this.activeCategory === "All") {
        return this.products;
      } else {
        return this.products.filter(
          (product) => product.category === this.activeCategory
        );
      }
    },
  },
  methods: {
    async fetchProducts() {
      this.products = await ProductService.fetchProducts();
      console.log(this.products);
    },
    setActiveCategory(category) {
      this.activeCategory = category;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../src/assets/css/variables";

.category-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  button {
    background-color: #eef2f4;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    @media (max-width: 768px) { 
      font-size: 0.78rem;
      }
  }
  .active{
    background-color: $orange-color;
    color:white
  }
}

.dropdown {
  color: $primary-color;
  font-weight: bold;
}
i{
  color:$font-color;
  font-size: 1.1rem;
  &:active{
    color: $primary-color;
  }
}
.active{
    color: $primary-color;
  }

</style>

<template>
  <div class="home">
    <ProductList />
  </div>
</template>

<script>
import ProductList from "@/components/products/ProductList.vue";

export default {
  name: "HomeView",
  components: {
    ProductList,
  },
};
</script>

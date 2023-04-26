<script setup>
const route = useRoute();
const { data: cars, refresh } = await useFetchCars(route.params.city, {
  make: route.params.make,
  minPrice: route.query.minPrice,
  maxPrice: route.query.maxPrice,
});

// HACK: use the refresh function when the query change from nuxt3 is not working
watch(
  () => route.query,
  () => {
    window.location.reload(true);
  }
);
</script>

<template>
  <div>
    <CarCards v-if="cars.length" :cars="cars" />
    <h1 v-else>no cars found with filters</h1>
  </div>
</template>

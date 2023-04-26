<script setup>
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const login = () => {};
const logout = () => {
  // 1. create the user.value object
  // 2. remove the JWT token in the browser
  const { error } = supabase.auth.signOut();
  if (error) {
    console.error(error);
  }
  // 3. navigate to home page
  navigateTo("/");
};
</script>
<template>
  <header
    class="sticky top-0 z-50 flex justify-between items-center space-x-1 border-b bg-white p-4 shadow-md"
  >
    <NuxtLink class="text-3xl font-mono" to="/">cartrader</NuxtLink>
    <div v-if="user" class="flex">
      <nuxt-link to="/profile/listings" class="mr-5">profile</nuxt-link>
      <p @click="logout" class="cursor-pointer">Logout</p>
    </div>
    <nuxt-link @click="login" v-else to="/login" class="mr-5">Login</nuxt-link>
  </header>
</template>

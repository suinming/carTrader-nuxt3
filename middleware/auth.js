export default defineNuxtRouteMiddleware((to, from) => {
  console.log(to);
  console.log(from);
  const user = useSupabaseUser();
  // if the user is authenticated then do nothing
  if (user.value) {
    return;
  }
  // if the user is not authenticated then route to the login page
  return navigateTo("/login");
});

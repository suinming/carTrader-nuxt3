<script setup>
const message = ref({
  name: "",
  email: "",
  phone: "",
  message: "",
});
const disabledButton = computed(() => {
  for (let prop in message.value) {
    if (!message.value[prop]) return true;
  }
  return false;
});
const route = useRoute();
const errorMessage = ref("");
const successMessage = ref("");
const onSubmit = async () => {
  try {
    await $fetch(`/api/car/listings/${route.params.id}/message`, {
      method: "post",
      body: message.value,
    });
    successMessage.value = "message send !!!";
    errorMessage.value = "";

    message.value = {
      name: "",
      email: "",
      phone: "",
      message: "",
    };
  } catch (error) {
    errorMessage.value = error.statusMessage;
    successMessage.value = "";
  }
};
</script>
<template>
  <div class="mt-10">
    <div class="flex w-[600px] justify-between">
      <input
        v-model="message.name"
        type="text"
        class="border p-1"
        placeholder="Name"
      />
      <input
        v-model="message.email"
        type="text"
        class="border p-1"
        placeholder="Email"
      />
      <input
        v-model="message.phone"
        type="text"
        class="border p-1"
        placeholder="Phone"
      />
    </div>
    <div class="flex mt-4 w-[600px]">
      <textarea
        v-model="message.message"
        class="border p-1 w-full"
        placeholder="Message"
      ></textarea>
    </div>
    <button
      @click="onSubmit"
      :disabled="disabledButton"
      class="bg-blue-400 text-white px-10 py-3 rounded mt-4"
    >
      Submit
    </button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <p v-if="successMessage">{{ successMessage }}</p>
  </div>
</template>

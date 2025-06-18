<template>
  <div></div>
</template>

<script>
export default {
  name: "App",
  async mounted() {
    const response = await fetch("api/lines");
    const lines = await response.json();

    console.log(lines);
  },
};
</script>

<style scoped></style>

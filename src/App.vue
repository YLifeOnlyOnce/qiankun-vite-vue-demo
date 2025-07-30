<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="container">
    <img src="./assets/vue.svg" class="logo" alt="Vite logo" />
    <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
    <div style="display:flex; gap: 24px;">
      <RouterLink to="/">Go to Home</RouterLink>
      <RouterLink to="/about">Go to About</RouterLink>
    </div>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

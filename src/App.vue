<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloJest />
    <hr />
    <Mocking />
  </div>
</template>

<script>
import HelloJest from './components/HelloJest.vue';
import Mocking from './components/Mocking.vue';

export default {
  name: 'App',
  components: {
    HelloJest,
    Mocking
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

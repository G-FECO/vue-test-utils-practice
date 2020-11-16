<template>
  <div>
    <h3>component 'is' attributes</h3>
    <div v-for="(component, i) in tabComponents" :key="i">
      <component :is="component"></component>
    </div>
  </div>
</template>

<script>
import ItemView from './ItemView.vue';
import UserView from './UserView.vue';
export default {
  components: {
    ItemView,
    UserView
  },
  data() {
    return {
      tabComponents: ['ItemView', 'UserView']
    };
  }
};
</script>

<style></style>

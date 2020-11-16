<template>
  <div>Hello <Children v-bind="{ message }" /></div>
</template>

<script>
import Children from '@/components/Children.vue';
export default {
  components: {
    Children
  },
  data() {
    return {
      message: '123'
    };
  }
};
</script>

<style lang="scss" scoped></style>

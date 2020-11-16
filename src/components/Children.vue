<template>
  <div>
    Children<br />
    {{ propsData }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      propsData: ''
    };
  },
  mounted() {
    // 부모 컴포넌트에서 v-bind="{ message }"와 같이 자식 컴포넌트로 데이터를 내려보내면
    // 자식 컴포넌트에서 this.$attrs를 통해 내려온 데이터를 조회할 수 있다.
    this.propsData = this.$attrs.message;
  }
};
</script>

<style></style>

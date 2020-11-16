<template>
  <div>
    {{ comment.name }}
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      comment: {}
    };
  },
  created() {
    this.fetchComments();
  },
  methods: {
    async fetchComments() {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/comments/1'
      );
      this.comment = data;
    }
  }
};
</script>

<style></style>

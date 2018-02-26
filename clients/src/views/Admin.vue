<template>
  <div id="admin">
    <div class="jumbotron">
    <h1 class="display-3" v-if="!token">Hello, Anda Belum Login</h1>
    <h1 class="display-3" v-else>Hello, Anda Belum Bukan admin</h1>
    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
    <hr class="my-4">
    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    <p class="lead">
        <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
    </p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    token() {
      return this.$store.state.token;
    },
  },
};
</script>

<style>

</style>


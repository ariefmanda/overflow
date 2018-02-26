<template>
<div>
  <header>
    <Header/>
  </header>
  <div class="rows">
    <router-view></router-view>
  </div>
  <footer>
    <Footer/>
  </footer>
</div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'dash',
  components: {
    Footer,
    Header,
  },
};
</script>

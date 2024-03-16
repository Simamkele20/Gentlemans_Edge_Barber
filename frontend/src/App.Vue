<template >
  <navbar />
  <main>
    <router-view />
  </main>

  <Footer />
</template>
 
<script>
import Footer from "./components/Footer.vue"
import navbar from './components/navbar.vue';



export default {
  components: {
    navbar, Footer

  }
}
</script>

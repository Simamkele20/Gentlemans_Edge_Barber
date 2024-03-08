<template>
    <navbar />
    <main>
      <router-view />
    </main>
  
    <Footer />
  </template>
   
  <script>
  import Footer from "./components/FooterView.vue"
  import navbar from './components/navbar.vue';
  
  
  
  export default {
    components: {
      navbar, Footer
  
    }
  }
  </script>
   
  <style ></style>
   
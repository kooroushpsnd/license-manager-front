<template>
  <div id="homeContainer">
    <HeaderPart :showauth="auth"/>
    <div class="main-container">
      <MainPart />
    </div>
    <FooterPart />
  </div>
</template>

<script>
import HeaderPart from '@/components/HeaderPart.vue';
import MainPart from '@/components/MainPart.vue';
import FooterPart from '@/components/FooterPart.vue';


export default {
  name: 'HomeView',
  components: {FooterPart ,MainPart ,HeaderPart},
  data(){
    return{
      auth: true
    }
  },
  async beforeMount(){
    const loggedIn = localStorage.getItem('token')
    if(loggedIn){
      this.auth = false
    }
  }
}
</script>

<style>
  #homeContainer{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .main-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  }
</style>

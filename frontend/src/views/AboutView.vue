<template>
  <div class="about text-center bg-black text-white pb-5">
    <h1 class="hea">About us</h1>
    <h3 class="para w-75 mx-auto">Welcome to Gentleman`s Edge Barber, your go-to destination for exceptional haircuts
      in the heart of Khayelitsha! Established in 2020, we take pride in bringing contemporary and expert grooming
      services to our vibrant community. At Gentleman`s Edge Babrber, we are more than just a barbershop; we are a hub
      for style, community, and top-notch hair care. Our skilled barbers are dedicated to delivering precision haircuts
      that suit your unique style and personality.</h3>

    <h1 class="hea mt-5 pb-5">Meet Our Staff</h1>
    <div class="row d-grid d-md-flex justify-content-center" v-if="staff">
      <Card v-for="employee in staff" :key="employee.staffID" class="text-center" id="cardPro">
        <template #cardHeader>
          <img :src="employee.staffUrl" class="card-img-top mx-auto mt-4 w-75" alt="Pro">
        </template>
        <template #cardBody>
          <h3 class="hea card-text text-white mt-3 ">
            {{ employee.employeeFullname }}
          </h3>
          <router-link :to="{ name: 'employee', params: { id: employee.staffID } }">
            <button class="btn bg-dark text-white" v-show="user">
              View More
            </button>
          </router-link>
        </template>
      </Card>
    </div>
    <div class="spinner mx-auto" v-else>
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '../components/Card.vue';
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default {
  components: {
    Card
  },
  computed: {
    staff() {
      return this.$store.state.staff;
    },
    user() {
      return this.$store.state.user || cookies?.get("VerifiedUser");
    }
  },
  mounted() {
    this.$store.dispatch('fetchStaff');
  }
}
</script>

<style scoped>
/* Universal Selector */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

::-webkit-scrollbar {
  display: none;
}

.about{
  height:170vh;
}
.spinner {
    position: absolute;
    left: 50%;
    bottom: 15%;
}
@media screen and (max-width: 767px) {
  .card-img-top {
    width: 100%;
  }
}

@media screen and (max-width: 575px) {
  .para {
    font-size: 16px;
  }
  .about{
  height:370vh;
}
}

</style>

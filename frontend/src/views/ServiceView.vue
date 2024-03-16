<template>
  <div v-if="service" class="hea  text-center pt-3 bg-black text-white">
    <h1 class=" "> {{ service.servName }}</h1>
    <img :src="service.servUrl" class="card-img-top  mx-auto mt-4 border border-3 border-black p-5  w-25 " alt="Pro">
    <h5 class="w-50 mx-auto m-3">{{ service.servDescription }}</h5>
    <h3>R{{ service.servAmount }}</h3>
    <div class="row">

      <div class="col">
        <router-link to="/services" class="nav-link link-light"> <a class="btn btn-light  bg-white text-black m-3 "
            href="#" role="button">Go back</a></router-link>
      </div>
    </div>
    <!-- Modal-->

  </div>




  <div class="row mx-auto" v-else>
    <Spinner />
  </div>
</template>


<script>
import Spinner from '@/components/Spinner.vue';
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
export default {
  data() {
    return {
      payload:
      {
        "bookDay": null,
        "bookStart": null,
        "bookEnd": null,
        "employeeFullname": null,

        "firstName": cookies.get('VerifiedUser').result.firstName,
        "userID": cookies.get('VerifiedUser').result.userID
      }

    }
  },
  components: {
    Spinner
  },
  computed: {
    service() {
      return this.$store.state.service
    },
    bookings() {
      return this.$store.state.bookings
    },
    services() {
      return this.$store.state.services
    },
    staff() {
      return this.$store.state.staff
    },
    users() {
      return this.$store.state.users
    }

  },
  mounted() {
    this.$store.dispatch('fetchService', this.$route.params),
      this.$store.dispatch("fetchBookings"),
      this.$store.dispatch("fetchServices"),
      this.$store.dispatch("fetchUsers"),
      this.$store.dispatch("fetchStaff")
  },

}
</script>
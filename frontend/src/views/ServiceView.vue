<template>
  <div v-if="service" class="ServCont text-center mt-3">
      <h1 class="text-danger "> {{ service.servName }}</h1>
      <img :src="service.servUrl" class="card-img-top  mx-auto mt-4 border border-3 border-black p-5  w-25 " alt="Pro">
      <h5 class="w-50 mx-auto m-3">{{ service.servDescription }}</h5>
      <h3>R{{ service.servAmount }}</h3>
      <div class="row">
        <div class="col-5">
          <button class=" btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal"> Add Booking</button>
        </div>
        <div class="col">
          <router-link to="/services" class="nav-link link-light"> <a class="btn btn-light  bg-black text-white m-3 " href="#"
              role="button">Go back</a></router-link>
        </div>
      </div>
   <!-- Modal-->
 <!-- Modal-->
 <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Add Booking</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <h5 class="text-start">Book Day: </h5>
              <select v-model="payload.bookDay" type="text" class="form-control ">
                <option value=""></option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>

              </select>
              <h5 class="text-start">Book Time: </h5>
              <select v-model="payload.bookTime" type="text" class="form-control ">
                <option value=""></option>
                <option value="09:00 - 10:00">09:00 - 10:00</option>
                <option value="10:00 - 11:00">10:00 - 11:00</option>
                <option value="11:00 - 12:00">11:00 - 12:00</option>
                <option value="12:00 - 13:00">12:00 - 13:00</option>
                <option value="13:00 - 14:00">13:00 - 14:00</option>
                <option value="14:00 - 15:00">14:00 - 15:00</option>
                <option value="15:00 - 16:00">15:00 - 16:00</option>
                <option value="16:00 - 17:00">16:00 -17:00</option>
              </select>
              <h5 class="text-start mt-2">Service Name: </h5>
              <select v-model="payload.servName" type="text" class="form-control ">
                <option value=""></option>
                <option :value=" service.servName " v-for="service in services" :key="service.servID"> {{
                service.servName }}</option>
              </select>
              <h5 class="text-start mt-2">Employee FullName: </h5>
              <select v-model="payload.employeeFullname" type="text" class="form-control ">
                <option value=""></option>
                <option :value=" employee.employeeFullname " v-for="employee in staff" :key="employee.staffID"> {{
                employee.employeeFullname }}
                </option>
              </select>
            </div>
            <h5 class="text-start mt-2">User FirstName: </h5>
            <select v-model="payload.firstName" type="text" class="form-control ">
              <option value=""></option>
              <option :value=" user.firstName " v-for="user in users" :key="user.firstName"> {{ user.firstName }}
              </option>
            </select>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button @click="addBook()" type="button" class="btn btn-dark">Add Booking</button>
          </div>  
          </div>

         
        </div>
      </div>
    </div>




  <div class="row mx-auto" v-else>
      <Spinner />
  </div>
</template>


<script>
import Spinner from '@/components/Spinner.vue';
export default {
  data() {
    return {
      payload:
      {
        "bookDay": null,
        "bookStart": null,
        "bookEnd": null,
        "servName": null,
        "employeeFullname": null
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
  methods:{
    addBook() {
      this.$store.dispatch('addBooking', this.payload)
    },
  }
}
</script>
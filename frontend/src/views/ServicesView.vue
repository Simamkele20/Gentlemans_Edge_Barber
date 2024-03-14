<template>
  <div class="container mt-3 ">
    <h2 class="ServHead text-center mb-4">Our Services</h2>
    <div class="bg-black text-center">
    </div>
    <div class=" servBtn row text-end">
      <div class="col">
        <input v-model="searchInput" type="text" placeholder="Search Service by name" @input="Search"
          class="form-control w-50">
      </div>
      <div class="col">
        <button @click="sortItems" class=" btn btn-dark"> Sort by Price</button>
      </div>
    </div>
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
              <option></option>
              <option :value="service.servName" v-for="service in services" :key="service.servID"> {{ service.servName
                }}</option>
            </select>
            <h5 class="text-start mt-2">Employee FullName: </h5>
            <select v-model="payload.employeeFullname" type="text" class="form-control ">
              <option value=""></option>
              <option :value="employee.employeeFullname" v-for="employee in staff" :key="employee.staffID"> {{
          employee.employeeFullname }}
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

    <div class="ServCar col mb-5">
      <div class=" row d-grid d-md-flex" v-if="services">
        <Card v-for="service in displayedServices" :key="service.servID" class=" text-center" id="cardPro">
          <template #cardHeader>
            <img :src="service.servUrl" class="card-img-top mx-auto mt-4  w-75" alt="Pro">
          </template>
          <template #cardBody>
            <h4 class="card-text text-dark mt-3 ">
              {{ service.servName }}
            </h4>
            <h5 class="card-text text-dark ">
              R{{ service.servAmount }}
            </h5>

            <div class="">


              <button class=" btn btn-dark mx-4" data-bs-toggle="modal" data-bs-target="#exampleModal"> Book
                Now</button>

              <router-link :to="{ name: 'service', params: { id: service.servID } }"><button
                  class="btn bg-black text-white" v-show="user">
                  View More </button> </router-link>
            </div>


          </template>
        </Card>
      </div>
      <div class="row mx-auto" v-else>
        <div class="spinner d-none d-xxl-flex">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>


<script>

import Card from '../components/Card.vue';
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();



export default {
  data() {
    return {
      searchInput: '',
      sortedItems: false,
      Services: [
        {
          servID: null,
          servName: null,
          servAmount: null,
          servDescription: null,
          servUrl: null,
          userID: null
        }
      ],
      payload:
      {
        "bookDay": null,
        "bookTime": null,
        "servName": null,
        "employeeFullname": null,
        "firstName": cookies.get('VerifiedUser').result.firstName,
        "userID": cookies.get('VerifiedUser').result.userID
      }
    }

  },
  components: {
    Card
  },
  computed: {
    user() {
      return this.$store.state.user || cookies?.get("VerifiedUser")
    },
    staff() {
      return this.$store.state.staff
    },
    services() {
      return this.$store.state.services
    },
    displayedServices() {
      let items = [...this.services];
      if (this.sortedItems) {
        items.sort((a, b) => a.servAmount - b.servAmount);
      } else if (this.searchInput) {
        items = items.filter(service =>
          service.servName.toLowerCase().includes(this.searchInput.toLowerCase())
        );
      }
      return items;
    },

  },
  mounted() {
    this.$store.dispatch('fetchServices'),
      this.$store.dispatch("fetchStaff")
  },

  methods: {
    Search() {
      'Search input:', this.searchInput
    },
    sortItems() {
      this.sortedItems = !this.sortedItems;
    },
    addBook() {
      this.$store.dispatch('addBooking', this.payload)

    }
  }


}

</script>


<style src="../assets/css/style.css"></style>
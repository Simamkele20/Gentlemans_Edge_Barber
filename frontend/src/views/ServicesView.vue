<template>
  <div class="serv pt-3 bg-black ">
    <h2 class="hea text-white text-center mb-4">Our Services</h2>
    <div class="bg-black text-center"></div>
    <div class="servBtn row text-end">
      <div class="col">
        <input v-model="searchInput" type="text" placeholder="Search Service by name" @input="Search"
          class="form-control w-50" />
      </div>
      <div class="col">
        <button @click="sortItems" class="btn bg-white">Sort by Price</button>
      </div>
      <div class="col-2">
        <select v-model="sortByName" class="btn form-class bg-white text-black ">
          <option value="A-Z">Filter by Name (A-Z)</option>
          <option value="Z-A">Filter by Name (Z-A)</option>
        </select>
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
            <h5 class="text-start">Book Day:</h5>
            <select v-model="payload.bookDay" type="text" class="form-control">
              <option value=""></option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
            </select>
            <h5 class="text-start">Book Time:</h5>
            <select v-model="payload.bookTime" type="text" class="form-control">
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
            <h5 class="text-start mt-2">Service Name:</h5>
            <select v-model="payload.servName" type="text" class="form-control">
              <option></option>
              <option :value="service.servName" v-for="service in services" :key="service.servID">
                {{ service.servName }}
              </option>
            </select>
            <h5 class="text-start mt-2">Employee FullName:</h5>
            <select v-model="payload.employeeFullname" type="text" class="form-control">
              <option value=""></option>
              <option :value="employee.employeeFullname" v-for="employee in staff" :key="employee.staffID">
                {{ employee.employeeFullname }}
              </option>
            </select>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <router-link to="/booking"> <button @click="addBook()" type="button" class="btn btn-dark">
                  Add Booking
                </button></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center text-white pb-3 pt-3" v-if="!services && !loading">
      <Spinner />
    </div>
    <div class="text-center text-white mb-3 mt-5 pt-5" v-else-if="filterServices.length === 0">
      <h3 class="pb-3">No Service found.</h3>
      <h2 class="hea text-dark">Feel free to explore our service menu for alternative options.</h2>
    </div>
    <div class="ServCar col pb-5 row d-grid d-md-flex" v-else>

      <Card v-for="service in filterServices" :key="service.servID" class="text-center" id="cardPro">
        <template #cardHeader>
          <img :src="service.servUrl" class="card-img-top mx-auto mt-4 w-75" alt="Pro" />
        </template>
        <template #cardBody>
          <h4 class="hea text-white  mt-3">
            {{ service.servName }}
          </h4>
          <h5 class="hea  text-white">R{{ service.servAmount }}</h5>

          <div class="">
            <button class="btn bg-white mx-4" data-bs-toggle="modal" data-bs-target="#exampleModal" v-show="user">
              Book Now
            </button>
            <router-link :to="{ name: 'service', params: { id: service.servID } }"><button
                class="btn bg-dark text-white" v-show="user">
                View More
              </button>
            </router-link>
          </div>
        </template>
      </Card>
    </div>

  </div>

</template>

<script>
import Card from "../components/Card.vue";
import Spinner from '@/components/Spinner.vue';
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

let firstName = null;
let userID = null;

const verifiedUser = cookies.get("VerifiedUser");
if (verifiedUser) {
  const result = verifiedUser.result;
  if (result) {
    firstName = result.firstName;
    userID = result.userID;
  }
}

export default {
  data() {
    return {
      sortByName: 'A-Z',
      searchInput: "",
      sortedItems: false,
      Services: [
        {
          servID: null,
          servName: null,
          servAmount: null,
          servDescription: null,
          servUrl: null,
          userID: null,
        },
      ],
      payload: {
        bookDay: null,
        bookTime: null,
        servName: null,
        employeeFullname: null,
        firstName: firstName,
        userID: userID,
      },
    };
  },
  components: {
    Card, Spinner
  },
  computed: {
    user() {
      return this.$store.state.user || cookies?.get("VerifiedUser");
    },
    staff() {
      return this.$store.state.staff;
    },
    services() {
      return this.$store.state.services;
    },
    filterServices() {
      let services = [...this.$store.state.services];
      if (this.sortedItems) {
        services.sort((a, b) => a.servAmount - b.servAmount);
      } else {
        if (this.sortByName === 'A-Z') {
          services.sort((a, b) => a.servName.localeCompare(b.servName));
        } else if (this.sortByName === 'Z-A') {
          services.sort((a, b) => b.servName.localeCompare(a.servName));
        }
      }
      if (this.searchInput) {
        services = services.filter(service =>
          service.servName.toLowerCase().includes(this.searchInput.toLowerCase())
        );
      }
      return services;
    }




  },
  mounted() {
    this.$store.dispatch("fetchServices"), this.$store.dispatch("fetchStaff");
  },

  methods: {
    Search() {
      "Search input:", this.searchInput;
    },
    sortItems() {
      this.sortedItems = !this.sortedItems;
    },
    addBook() {
      this.$store.dispatch("addBooking", this.payload)
        .then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 600);
        })

    }
  },
};
</script>

<style src="../assets/css/style.css"></style>

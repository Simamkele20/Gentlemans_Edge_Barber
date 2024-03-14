<template>
  <div class="container ">
    <h2 class="text-center mt-3">My Bookings</h2>


    <div class=" prodBtn d-block d-md-flex row text-end mt-4">
      <div class=" servBtn row text-end">
        <div class="col">
          <input v-model="searchInput" type="text" placeholder="Search Booking by Day" @input="Search"
            class="form-control w-50">
        </div>
        <div class="col-5">
          <button class=" btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal"> Add Booking</button>
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
                <option :value="service.servName" v-for="service in services" :key="service"> {{
            service.servName }}</option>
              </select>
              <h5 class="text-start mt-2">Employee FullName: </h5>
              <select v-model="payload.employeeFullname" type="text" class="form-control ">
                <option value=""></option>
                <option :value="employee.employeeFullname" v-for="employee in staff" :key="employee.staffID"> {{
            employee.employeeFullname }}
                </option>
              </select>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button @click="addBook()" type="button" class="btn btn-dark">Add Booking</button>
            </div>
          </div>


        </div>
      </div>
      <!-- Modal delete-->
      <div class="modal fade" :id="'delete' + book.bookID" tabindex="-1" aria-labelledby="delete" aria-hidden="true"
        v-for="book in booking" :key="book.bookID">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title  fs-5" id="delete">Cancel Booking</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <h5 class="text-start">Are you sure?</h5>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button @click.prevent="deleteBooking(book.bookID)" type="button" class="btn btn-dark">Cancel
                Booking</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <table class="AdiCont table mt-5 text-center mx-auto" v-if="booking">
    <thead>
      <tr>
        <th> Book ID</th>
        <th> Book Day</th>
        <th>Book Time</th>
        <th>Serv Name</th>
        <th>Employee Name</th>
        <th> Action</th>
      </tr>
    </thead>
    <tbody class="text-center mb-5">
      <tr v-for="book in displayedBookings" :key="book.bookID">
        <th scope="row"> {{ book.bookID }}</th>
        <td> {{ book.bookDay }}</td>
        <td> {{ book.bookTime }}</td>
        <td>{{ book.servName }}</td>
        <td>{{ book.employeeFullname }}</td>
        <td><button class="  btn btn-dark" data-bs-toggle="modal" :data-bs-target="'#delete' + book.bookID">
            Cancel</button></td>
      </tr>
    </tbody>
  </table>
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
      searchInput: "",
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
    booking() {
      return this.$store.state.booking
    },
    services() {
      return this.$store.state.services
    },
    staff() {
      return this.$store.state.staff
    },
    users() {
      return this.$store.state.users
    },
    displayedBookings() {
      let items = [...this.booking];
      if (this.sortedItems) {
        items.sort((a, b) => a.servAmount - b.servAmount);
      } else if (this.searchInput) {
        items = items.filter(booking =>
          booking.bookDay.toLowerCase().includes(this.searchInput.toLowerCase())
        );
      }
      return items;
    },

  },
  mounted() {

    this.$store.dispatch("fetchBooking", cookies.get('VerifiedUser').result.userID)
    this.$store.dispatch("fetchServices"),
      this.$store.dispatch("fetchUsers"),
      this.$store.dispatch("fetchStaff")
  },

  methods: {
    deleteBooking(bookID) {
      this.$store.dispatch('deleteBooking', bookID)
    },
    addBook() {
      this.$store.dispatch('addBooking', this.payload)

    },
    Search() {
      'Search input:', this.searchInput
    }
  }

}
</script>




<style src="../assets/css/style.css"></style>
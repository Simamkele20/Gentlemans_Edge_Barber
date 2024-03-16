<template>
  <div class="page container-fluid bg-black pb-5 ">
    <div class="container ">
      <div class="pt-4">
        <nav class="navbar nav-pills nav-underline  w-100 w-md-25 justify-content-center mx-auto" role="tablist">
          <ul class="d-block d-md-flex  mt-2  ">
            <li class="nav-item mx-2">
         <router-link to="/admin">   <a class="hea btn bg-dark text-white" aria-current="page" >Services</a></router-link>  
            </li>
            <li class="nav-item mx-4">
              <router-link to="/users" class="hea btn bg-white text-black">Users</router-link>
            </li>
            <li class="nav-item mx-4">
              <router-link to="/staff" class="hea btn bg-dark text-white">Staff</router-link>
            </li>
            <li class="nav-item mx-4">
              <router-link to="/bookings" class="hea btn bg-white text-black">Bookings</router-link>
            </li>
          </ul>
        </nav>
      </div>

    <div class=" prodBtn d-block d-md-flex row text-end mt-4">
      <div class=" servBtn row text-end">
        <div class="col">
          <input v-model="searchInput" type="text" placeholder="Search Booking by Customer Name" @input="Search"
            class="form-control w-50">
        </div>
        <div class="col-2 mx-3">
          <button class="hea btn bg-white text-black" data-bs-toggle="modal" data-bs-target="#exampleModal"> Add Booking</button>
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
                <option value=""></option>
                <option :value="service.servName" v-for="service in services" :key="service.servID"> {{
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
            <h5 class="text-start mt-2">User FirstName: </h5>
            <select v-model="payload.firstName" type="text" class="form-control ">
              <option value=""></option>
              <option :value="user.firstName" v-for="user in users" :key="user.firstName"> {{ user.firstName }}
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
  </div>
  <!-- Modal edit -->
  <div class="modal fade" :id="'edit' + book.bookID" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true" v-for="book in bookings" :key="book.bookID">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Booking</h1>
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
            <option :value="service.servName" v-for="service in services" :key="service.servID"> {{
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
        <h5 class="text-start mt-2">User FirstName: </h5>
        <select v-model="payload.firstName" type="text" class="form-control ">
          <option value=""></option>
          <option :value="user.firstName" v-for="user in users" :key="user.firstName"> {{ user.firstName }}
          </option>
        </select>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button @click="editBooking(book.bookID)" type="button" class="btn btn-dark">Update Booking</button>
        </div>
      </div>


    </div>
  </div>
  <!-- Modal delete-->
  <div class="modal fade" :id="'delete' + book.bookID" tabindex="-1" aria-labelledby="delete" aria-hidden="true"
    v-for="book in bookings" :key="book.bookID">
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
          <button @click.prevent="deleteBooking(book.bookID)" type="button" class="btn btn-dark">Cancel Booking</button>
        </div>
      </div>
    </div>
  </div>

  <div class="text-center text-white mb-5 pb-5" v-if="!bookings && !loading">
    <Spinner />
  </div>
  <div class="text-center text-white pb-5 mt-5 pt-5 mb-5" v-else-if="displayedBookings.length === 0">
    <h3>No Booking found.</h3>
    <h2 class="hea text-dark">kindly add the booking.</h2>
  </div>
  <table class="AdiCont table mt-5 bg-white text-center mx-auto w-75" v-else>
    <thead  class="hea">
      <tr>
        <th> Book ID</th>
        <th> Book Day</th>
        <th>Book Time </th>
        <th>Serv Name</th>
        <th>Employee Name</th>
        <th>Customer Name</th>
        <th> Action</th>
      </tr>
    </thead>
    <tbody class="text-center mb-5">
      <tr v-for="book in displayedBookings" :key="book.bookID">
        <th scope="row"> {{ book.bookID }}</th>
        <td> {{ book.bookDay }}</td>
        <td> {{ book.bookTime }} </td>
        <td>{{ book.servName }}</td>
        <td>{{ book.employeeFullname }}</td>
        <td>{{ book.firstName }}</td>
        <td><button class="  btn bg-black text-white" data-bs-toggle="modal" :data-bs-target="'#edit' + book.bookID">
            Edit</button></td>
        <td><button class="  btn bg-black text-white" data-bs-toggle="modal" :data-bs-target="'#delete' + book.bookID">
            Cancel</button></td>

      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue';
export default {

  data() {
    return {
      searchInput: null,
      payload:
      {
        "bookDay": null,
        "bookTime": null,
        "servName": null,
        "employeeFullname": null,
        "firstName": null
      }

    }
  },
  components: {
    Spinner
  },
  computed: {
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
    },
    displayedBookings() {
      if (!Array.isArray(this.bookings)) {
        console.error('Bookings data is not an array:', this.bookings);
        return [];
      }

      let items = [...this.bookings];
      if (this.sortedItems) {
        items.sort((a, b) => a.servAmount - b.servAmount);
      } else if (this.searchInput) {
        items = items.filter(booking =>
          booking.firstName.toLowerCase().includes(this.searchInput.toLowerCase())
        );
      }
      return items;
    }
  },
  mounted() {
    this.$store.dispatch("fetchBookings"),
      this.$store.dispatch("fetchServices"),
      this.$store.dispatch("fetchUsers"),
      this.$store.dispatch("fetchStaff")
  },

  methods: {
    deleteBooking(bookID) {
      this.$store.dispatch('deleteBooking', bookID)
        .then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 600);
        })
    },
    addBook() {
      this.$store.dispatch('addBooking', this.payload)
        .then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 600);
        })

    },
    Search() {
      'Search input:', this.searchInput
    },
    editBooking(bookID) {
      const updateData = Object.assign({}, { bookID }, this.payload)
      this.$store.dispatch('updateBooking', updateData)
        .then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 600);
        })
    }



  }

}
</script>




<style src="../assets/css/style.css"></style>
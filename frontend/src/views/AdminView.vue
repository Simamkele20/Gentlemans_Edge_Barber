<template>
  <div class="service container-fluid bg-black pb-5 ">
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
        <div class="col">
          <input v-model="searchInput" type="text" placeholder="Search Service by name" @input="Search"
            class="form-control w-50">
        </div>

        <div class="col-2  mx-3">
          <button class="hea btn bg-white  text-black" data-bs-toggle="modal" data-bs-target="#AddServ"> Add a
            Service</button>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="AddServ" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Add new Service</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <h5 class="text-start">Service Name: </h5>
                <input v-model="payload.servName" type="text" placeholder="Name" class="form-control" required>
                <h5 class="text-start mt-2">Service URL: </h5>
                <input v-model="payload.servUrl" type="text mt-2" placeholder="Image URL" class="form-control" required>
                <h5 class="text-start mt-2">Service Amount: </h5>
                <input v-model="payload.servAmount" type="number" placeholder="Amount" class="form-control" required>
                <h5 class="text-start mt-2">Service Description: </h5>
                <input v-model="payload.servDescription" type="text" placeholder="Description" class="form-control"
                  required>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button @click.prevent="addServ()" type="button" class="btn btn-dark">Add Service</button>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal edit-->
        <div class="modal fade" :id="'edit' + service.servID" tabindex="-1" aria-labelledby="edit" aria-hidden="true"
          v-for="service in services" :key="service.servID">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Service</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <h5 class="text-start">Service Name: </h5>
                <input v-model="payload.servName" type="text" :placeholder="service.servName" class="form-control">

                <h5 class="text-start mt-2">Service URL: </h5>
                <input v-model="payload.servUrl" type="text mt-2" :placeholder="service.servUrl" class="form-control">
                <h5 class="text-start mt-2">Service Amount: </h5>
                <input v-model="payload.servAmount" type="text" :placeholder="service.servAmount" class="form-control">
                <h5 class="text-start mt-2">Service Description: </h5>
                <input v-model="payload.servDescription" type="text" :placeholder="service.servDescription"
                  class="form-control">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button @click.prevent="editServ(service.servID)" type="button" class="btn btn-dark">Update
                  Product</button>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal delete-->
        <div class="modal fade" :id="'delete' + service.servID" tabindex="-1" aria-labelledby="delete"
          aria-hidden="true" v-for="service in services" :key="service.servID">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="delete">Delete Product</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <h5 class="text-start">Are you sure?</h5>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button @click.prevent="deleteServ(service.servID)" type="button" class="btn btn-dark">Delete
                  Product</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class=" text-center text-white pb-5 mb-5" v-if="!services && !loading">
      <Spinner />
    </div>
    <div class=" text-center text-white pb-5 mt-5 pt-5 mb-5" v-else-if="filterServ.length === 0">
      <h3>No Service found.</h3>
      <h2 class="hea text-dark">Kindly add the service.</h2>
    </div>
    <table class="AdiCont bg-white table mt-5 pb-5 w-75 text-center mx-auto" v-else>
      <thead  class="hea">
        <tr>
          <th>ID</th>
          <th> Img</th>
          <th>Name</th>
          <th>Description</th>
          <th>Amount</th>
          <th> Action</th>
        </tr>
      </thead>
      <tbody class="text-center ">
        <tr v-for="service in filterServ" :key="service.servID">
          <th scope="row"> {{ service.servID }}</th>
          <td><img :src="service.servUrl" class="w-25"></td>
          <td>{{ service.servName }} </td>
          <td class="w-25">{{ service.servDescription }} </td>
          <td class="w-25"> R {{ service.servAmount }} </td>
          <td><button class="btn bg-black text-white" data-bs-toggle="modal" :data-bs-target="'#edit' + service.servID">
              Edit</button>
          </td>
          <td><button class=" btn bg-black text-white" data-bs-toggle="modal" :data-bs-target="'#delete' + service.servID">
              Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>






import Spinner from '@/components/Spinner.vue';

export default {
  name: "AdminView",
  data() {
    return {
      searchInput: '',
      payload:
      {
        servName: null,
        servAmount: null,
        servDescription: null,
        servUrl: null,
      }

    }
  },
  components: {
    Spinner
  },

  computed: {
    services() {
      return this.$store.state.services
    },
    filterServ() {
      const services = this.$store.state.services;
      if (!services) {
        return [];
      }
      return services.filter(service =>
        service.servName?.toLowerCase().includes(this.searchInput.toLowerCase())
      );
    }

  },
  mounted() {
    this.$store.dispatch('fetchServices')

  },
  methods: {
    Search() {
      'Search input:', this.searchInput
    },
    deleteServ(servID) {
      this.$store.dispatch('deleteService', servID)
        .then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 600);
        })

    },
    sortItems() {
      this.sortedItems = !this.sortedItems;
    },
    addServ() {
      this.$store.dispatch('addNewService', this.payload)
        .then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 600);
        })
    },
    editServ(servID) {
      const updateData = Object.assign({}, { servID }, this.payload)
      this.$store.dispatch('updateService', updateData)
        .then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 600);
        })
    },
  }
}
  
</script>


<style src="../assets/css/style.css"></style>

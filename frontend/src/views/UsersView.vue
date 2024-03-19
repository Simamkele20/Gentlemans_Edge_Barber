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
      <div class="col">
        <input v-model="searchInput" type="text" placeholder="Search User by firstName" @input="Search"
          class="form-control ">
      </div>
      <div class="col ">
        <select v-model="selectedRole" class="btn form-class bg-dark text-white ">
          <option value="All">Filter by UserRole</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div class="col-2 mx-3">
        <button class="hea btn bg-white text-black" data-bs-toggle="modal" data-bs-target="#exampleModal"> Add a User</button>
      </div>
      <!-- Modal-->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Add User</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <h5 class="text-start">User Name: </h5>
              <input v-model="payload.firstName" type="text" placeholder="Name" class="form-control">
              <h5 class="text-start mt-2">User LastName: </h5>
              <input v-model="payload.lastName" type="text mt-2" placeholder="Surname" class="form-control">
              <h5 class="text-start mt-2">User Gender: </h5>
              <select v-model="payload.userGender" type="text" class="form-control " id="exampleDropdownFormEmail1"
                placeholder="Please Select your Gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <h5 class="text-start mt-2">User Age: </h5>
              <input v-model="payload.userAge" type="number" placeholder="Age" class="form-control">
              <h5 class="text-start mt-2">User Email Address: </h5>
              <input v-model="payload.emailAdd" type="email" placeholder="Email Address" class="form-control">
              <h5 class="text-start mt-2">User Role: </h5>
              <select v-model="payload.userRole" type="text" class="form-control " id="exampleDropdownFormEmail1"
                placeholder="Please Select your Role">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <h5 class="text-start mt-2">User Password: </h5>
              <input v-model="payload.userPwd" type="password" placeholder="Password" class="form-control">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button @click="addUser()" type="button" class="btn btn-dark">Add User</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal edit -->
      <div class="modal fade" :id="'edit' + user.userID" tabindex="-1" aria-labelledby="edit" aria-hidden="true"
        v-for="user in users" :key="user.userID">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="edit">Edit User</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <h5 class="text-start">User Name: </h5>
              <input v-model="payload.firstName" type="text" :placeholder="user.firstName" class="form-control">
              <h5 class="text-start mt-2">User LastName: </h5>
              <input v-model="payload.lastName" type="text" :placeholder="user.lastName" class="form-control">
              <h5 class="text-start mt-2">User Gender: </h5>
              <select v-model="payload.userGender" type="text" class="form-control " id="exampleDropdownFormEmail1"
                placeholder="Please Select your Gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <h5 class="text-start mt-2">User Age: </h5>
              <input v-model="payload.userAge" type="text" :placeholder="user.userAge" class="form-control">
              <h5 class="text-start mt-2">User Email Address: </h5>
              <input v-model="payload.emailAdd" type="text" :placeholder="user.emailAdd" class="form-control">
              <h5 class="text-start mt-2">User Role: </h5>
              <select v-model="payload.userRole" type="text" class="form-control " id="exampleDropdownFormEmail1"
                placeholder="Please Select your Role">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <h5 class="text-start mt-2">User Password: </h5>
              <input v-model="payload.userPwd" type="text" placeholder="Enter your password" class="form-control">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button @click="editUser(user.userID)" type="button" class="btn btn-dark">Update User</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal delete-->
      <div class="modal fade" :id="'delete' + user.userID" tabindex="-1" aria-labelledby="delete" aria-hidden="true"
        v-for="user in users" :key="user.userID">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title  fs-5" id="delete">Delete User</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <h5 class="text-start">Are you sure?</h5>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button @click.prevent="deleteUser(user.userID)" type="button" class="btn btn-dark">Delete User</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="text-center text-white mb-5 pb-5" v-if="!users && !loading">
    <Spinner />
  </div>
  <div class="text-center text-white pb-5 mt-5 pt-5 mb-5" v-else-if="filterUser.length === 0">
    <h3>No User found.</h3>
    <h2 class="hea text-dark">Kindly add the User</h2>
  </div>

  <table class="AdiCont bg-white table w-75 mt-5 text-center mx-auto" v-else>
    <thead  class="hea">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Surname</th>
        <th>Age</th>
        <th>Gender</th>
        <th>Email Address</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody class="text-center mb-5">
      <tr v-for="user in filterUser" :key="user.userID">
        <th scope="row">{{ user.userID }}</th>
        <td>{{ user.firstName }}</td>
        <td>{{ user.lastName }}</td>
        <td>{{ user.userAge }}</td>
        <td>{{ user.userGender }}</td>
        <td>{{ user.emailAdd }}</td>
        <td>{{ user.userRole }}</td>
        <td>
          <button class="btn bg-black text-white" data-bs-toggle="modal" :data-bs-target="'#edit' + user.userID">Edit</button>
        </td>
        <td>
          <button class="btn bg-black text-white" data-bs-toggle="modal" :data-bs-target="'#delete' + user.userID">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>

  </div>

</template>

<script>
import Spinner from '@/components/Spinner.vue';
export default {
  name: "UsersView",
  data() {
    return {
      selectedRole: 'All',
      searchInput: '',
      payload:
      {
        "firstName": null,
        "lastName": null,
        "userAge": null,
        "userGender": null,
        "emailAdd": null,
        "userPwd": null,
        "userRole": null,
      }
        }
  },
  components: {
    Spinner
  },
  computed: {
    users() {
      return this.$store.state.users
    },
    filterUser() {
      const users = this.$store.state.users;
      if (!users) {
        return [];
      }
      return users.filter(user =>
        user.firstName?.toLowerCase().includes(this.searchInput.toLowerCase()) &&
        (this.selectedRole === 'All' || user.userRole === this.selectedRole)
      );
    }

  },
  mounted() {
    this.$store.dispatch("fetchUsers")
  },
  methods: {
    Search() {
      'Search input:', this.searchInput
    },
    deleteUser(userID) {
      this.$store.dispatch('deleteUser', userID)
        .then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 600);
        })
    },
    addUser() {
      this.$store.dispatch('register', this.payload)
        this.$router.push('/users')
        .then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 700);
        })
    },
    editUser(userID) {
      const updateData = Object.assign({}, { userID }, this.payload)
      this.$store.dispatch('updateUser', updateData)
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
<template>
<h2 class="mt-3 mx-4">Register</h2>
  <form class="px-4 py-3">
    <div class="mb-3">
      <label class="form-label">Name</label>
      <input v-model="payload.firstName" type="text" class="form-control w-50" id="exampleDropdownFormEmail1" placeholder=" Enter Your Name">
    </div>
    <div class="mb-3">
      <label class="form-label">Surname</label>
      <input v-model="payload.lastName"  type="text" class="form-control w-50" id="exampleDropdownFormEmail1" placeholder="Enter Your Surname">
    </div>
    <div class="mb-3">
      <label class="form-label">Age</label>
      <input v-model="payload.userAge" type="number" class="form-control w-50" id="exampleDropdownFormEmail1" placeholder="EnterYour Age">
    </div>
    <div class="mb-3">
      <label for="exampleDropdownFormEmail1" class="form-label">Gender</label>
      <select v-model="payload.userGender"  type="text" class="form-control w-50" id="exampleDropdownFormEmail1"  placeholder="Please Select your Gender" >
        <option value="user">Male</option>
        <option value="admin">Female</option>
      </select>
    </div>
   
    <div class="mb-3">
      <label for="exampleDropdownFormEmail1" class="form-label">Email address</label>
      <input v-model="payload.emailAdd" type="email" class="form-control w-50" id="exampleDropdownFormEmail1" placeholder="email@example.com">
    </div>
   
    <div class="mb-3">
      <label for="exampleDropdownFormPassword1" class="form-label">Password</label>
      <input v-model="payload.userPwd" type="password" class="form-control w-50" id="exampleDropdownFormPassword1" placeholder="Password">
    </div>
  
    <button  @click.prevent="Register()" type="submit" class="btn btn-dark">Sign Up</button>
  </form>
 

  </template>

  
  <script>
    
    
  export default {
    data() {
        return{
        payload: {
          "userID": null,
        "firstName": null,
        "lastName": null,
        "userAge": null,
        "userGender": null,
        "emailAdd": null,
        "userPwd": null,
        "userRole": null
    }
        }
    },
  
    components: {
  
    },
    methods: {
        Register() {
        this.$store.dispatch('register', this.payload)
}
}
  }
  </script>
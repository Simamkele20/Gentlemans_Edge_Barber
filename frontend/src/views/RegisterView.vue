<template>
<h2 class="mt-3 mx-4">Register</h2>
  <form class="px-4 py-3">
    <div class="mb-3">
      <label class="form-label">Name</label>
      <input type="text" class="form-control w-50" id="exampleDropdownFormEmail1" placeholder=" Enter Your Name">
    </div>
    <div class="mb-3">
      <label class="form-label">Surname</label>
      <input type="text" class="form-control w-50" id="exampleDropdownFormEmail1" placeholder="Enter Your Surname">
    </div>
    <div class="mb-3">
      <label class="form-label">Age</label>
      <input type="number" class="form-control w-50" id="exampleDropdownFormEmail1" placeholder="EnterYour Age">
    </div>
    <div class="mb-3">
      <label for="exampleDropdownFormEmail1" class="form-label">Gender</label>
      <input type="text" class="form-control w-50" id="exampleDropdownFormEmail1" placeholder="Provide your Gender">
    </div>
    <div class="mb-3">
      <label for="exampleDropdownFormEmail1" class="form-label">UserRole</label>
      <input  class="form-control w-50" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="10,20" placeholder="Enter Your Role">
    <ul class="dropdown-menu">
      <li><a class="dropdown-item"  href="#">User</a></li>
      <li><a class="dropdown-item" href="#">Admin</a></li>
    </ul>

    </div>
    <div class="mb-3">
      <label for="exampleDropdownFormEmail1" class="form-label">Email address</label>
      <input type="email" class="form-control w-50" id="exampleDropdownFormEmail1" placeholder="email@example.com">
    </div>
   
    <div class="mb-3">
      <label for="exampleDropdownFormPassword1" class="form-label">Password</label>
      <input type="password" class="form-control w-50" id="exampleDropdownFormPassword1" placeholder="Password">
    </div>
  
    <button type="submit" class="btn btn-dark">Sign Up</button>
  </form>
 

  </template>

  
  <script>
    
    
  export default {
  
    components: {
  
    }
  }
  </script>
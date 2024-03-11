<template>
    <div class="container">
        <h3 class="mt-5  mx-4">Login</h3>
        <form class="px-4 py-3 mt-2 ">
            <div class="mb-3">
                <label for="exampleDropdownFormEmail1" class="form-label ">Email address</label>
                <input v-model="payload.emailAdd" type="email" class="form-control w-50 " id="exampleDropdownFormEmail1"
                    placeholder="email@example.com">
            </div>
            <div class="mb-3">
                <label for="exampleDropdownFormPassword1" class="form-label">Password</label>
                <input v-model="payload.userPwd" type="password"  class="form-control w-50"
                    id="exampleDropdownFormPassword1" placeholder="Password">
            </div>
            <div class="mb-3">
            </div>
            <button @click.prevent="Login()" type="submit" class="btn btn-dark">Sign in</button>
        </form>
        <router-link to="/register"><a class="dropdown-item link-dark link-underline-light " href="#">New around here?
                Sign up</a></router-link>
    </div>


</template>




<script>
export default {
    data() {
        return{
        payload: {
            emailAdd: null,
                userPwd: null,
    }
        }
    },
    components: {
    
    },
    computed: {
       
          
        },
    

    methods: {
        Login() {
        this.$store.dispatch('Login', this.payload)
}
}
}
</script>
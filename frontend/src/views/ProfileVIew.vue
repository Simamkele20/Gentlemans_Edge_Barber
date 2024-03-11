<template>
    <div class="about" >
        <h1>This is an about PRo</h1>

            <router-link to="/logout" class="btn btn-dark">Log out</router-link>
    </div>

</template>



<script>
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
export default {
    data() {
        return{
        payload: {
            emailAdd: null,
                userPwd: null,
    }
        }
    },
    computed: {
        isUser() {
            return cookies.get("VerifiedUser") || undefined
        }
    },

    methods: {
        Login() {
        this.$store.dispatch('Login', this.payload)
}

      

}
}


</script>
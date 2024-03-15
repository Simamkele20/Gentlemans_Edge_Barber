<template>
    <div class="Login">
        <h1 class="text-white pt-3 pb-4">My Profile</h1>
        <div class="login-form mx-auto ">

            <div class="text">

                <div v-for="user in user" :key="user.userID">
                    <h1>{{ user.firstName }} {{ user.lastName }}</h1>
                    <h5>{{ user.userAge }}</h5>
                    <h5>{{ user.userGender }}</h5>
                    <h5>{{ user.emailAdd }}</h5>
                </div>
                
                
            </div>

        </div>
        <router-link to="/logout" class="btn btn-dark text-center mt-5">Log out</router-link>
    </div>


</template>



<script>
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
// import Spinner from '@/components/Spinner.vue';
export default {
    data() {
        return {
            payload: {
                emailAdd: null,
                userPwd: null,
                "firstName": null,
                "lastName": null,
                "userAge": null,
                "userGender": null,
            }
        }
    },
    components: {
        // Spinner
    },
    computed: {

        user() {
            return this.$store.state.user || cookies?.get("VerifiedUser")
        }
    },
    mounted() {


    },

    methods: {
        Login() {
            this.$store.dispatch('Login', this.payload)
        },
        editUser(userID) {
            const updateData = Object.assign({}, { userID }, this.payload)
            this.$store.dispatch('updateUser', updateData)
        }



    }
}


</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');

* {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
}

.Login {

    height: 83vh;
    text-align: center;
    align-items: center;
    justify-content: center;
    background: #151515;
}

.login-form {
    position: relative;
    width: 320px;
    height: auto;
    background: #1b1b1b;
    padding: 40px 35px 60px;
    box-sizing: border-box;
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: inset 0 0 1px #272727;
}

.text {
    font-size: 30px;
    color: #c7c7c7;
    font-weight: 600;
    letter-spacing: 2px;
}

form {
    margin-top: 40px;
}

form .field {
    margin-top: 20px;
    display: flex;
}

.field .fas {
    height: 50px;
    width: 60px;
    color: #868686;
    font-size: 20px;
    line-height: 50px;
    border: 1px solid #444;
    border-right: none;
    border-radius: 5px 0 0 5px;
    background: linear-gradient(#333, #222);
}

.field input,
form button {
    height: 50px;
    width: 100%;
    outline: none;
    font-size: 19px;
    color: #868686;
    padding: 0 15px;
    border-radius: 0 5px 5px 0;
    border: 1px solid #444;
    caret-color: #000000;
    background: linear-gradient(#333, #222);
}

input:focus {
    color: #f6f6f6;
    box-shadow: 0 0 5px rgba(0, 255, 0, .2),
        inset 0 0 5px rgba(0, 255, 0, .1);
    background: linear-gradient(#333933, #222922);
    animation: glow .8s ease-out infinite alternate;
}

@keyframes glow {
    0% {
        border-color: #000000;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2),
            inset 0 0 5px rgba(0, 0, 0, .1);
    }

    100% {
        border-color: #ffffff;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.6),
            inset 0 0 10px rgba(0, 0, 0, 0.4);
    }
}

button {
    margin-top: 30px;
    border-radius: 5px !important;
    font-weight: 600;
    letter-spacing: 1px;
    cursor: pointer;
}

button:hover {
    color: #ffffff;
    border: 1px solid #000000;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.3),
        0 0 10px rgba(255, 255, 255, 0.2),
        0 0 15px rgba(255, 255, 255, 0.1),
        0 2px 0 black;
}

.link {
    margin-top: 25px;
    color: #868686;
}

.link a {
    color: #000e00;
    text-decoration: none;
}

.link a:hover {
    text-decoration: underline;
}
</style>
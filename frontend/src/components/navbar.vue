<template>
    <nav class="navbar  navbar-expand-lg navbar-dark bg-black bg-gradient sticky-top text-center text-md-start" id="Shift">
        <div class="container-fluid justify-content-center">

            <a href="/">
                <img src="https://i.ibb.co/CzqJpnD/240-F-520388550-EJo-XUs-Frmyig-XTm-U2n-ZLt-D13z45-Oi2lu.jpg" alt="Logo"
                    class="w-25"> </a>
            <button class="navbar-toggler mt-2" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse text-center " id="navbarSupportedContent">
                <ul class="navbar-nav nav-underline  ms-auto text-center mb-lg-0 mx-end">
                    <li class="nav-item">
                        <router-link to="/home" class="nav-link ">Home </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/about" class="nav-link ">About </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/services" class="nav-link">Services </router-link>
                    </li>
                    <li class="nav-item"  v-show="user">
                        <router-link to="/bookings" class="nav-link">Bookings </router-link>
                    </li>
                    <li class="nav-item" v-show="isAdmin">
                        <router-link to="/admin" class="nav-link">Admin </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/contact" class="nav-link">Contact</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/profile" class="nav-link">Profile</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
export default {
    name: 'navBarComp',

    computed:{
        user(){
            return this.$store.state.user || cookies?.get("VerifiedUser")
        },
        isAdmin() {
            return this.user?.result?.userRole == 'admin'
        }
   
        
    }
}
</script>

<style scoped></style>
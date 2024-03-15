<template>
    <div v-if="employee" class="ServCont text-center  bg-black">
        <div v-for="emp in employee" :key="emp.staffID">
            <h1 class="hea text-white pt-4"> {{ emp.employeeFullname }}</h1>
            <img :src="emp.staffUrl" class="card-img-top  mx-auto mt-4 border border-3 border-black p-5  w-25 "
                alt="Pro">
            <h4 class="hea w-50 mx-auto mt-3 text-white">{{ emp.JobTittle }}</h4>
            <h2 class="w-50 mx-auto mt-3 text-white">{{ emp.staffDescription }}</h2>
            <div class="row">
                <div class="col">
                    <router-link to="/about" class="nav-link link-light m-5"> <a class="btn btn-light  bg-dark text-white  "
                            href="#" role="button">Go back</a></router-link>
                </div>
            </div>
        </div>

    </div>
    <div class="row mx-auto" v-else>
        <Spinner />
    </div>



</template>



<script>
import Spinner from '@/components/Spinner.vue';

export default {
    components: {
        Spinner

    },
    computed: {
        employee() {
            return this.$store.state.employee
        }
    },
    mounted() {
        this.$store.dispatch('fetchEmployee', this.$route.params)
    }
}
</script>


<style src="../assets/css/style.css"></style>
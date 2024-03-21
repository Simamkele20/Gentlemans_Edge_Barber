<template>
    <div class="service container-fluid bg-black pb-5 ">
        <div class="container ">
            <div class="pt-4">
                <nav class="navbar nav-pills nav-underline  w-100 w-md-25 justify-content-center mx-auto"
                    role="tablist">
                    <ul class="d-block d-md-flex  mt-2  ">
                        <li class="nav-item mx-2">
                            <router-link to="/admin"> <a class="hea btn bg-dark text-white"
                                    aria-current="page">Services</a></router-link>
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
                    <input v-model="searchInput" type="text" placeholder="Search employee by name" @input="Search"
                        class="form-control w-50">
                </div>

                <div class="col-2 mx-3">
                    <button class="hea btn  bg-white text-black" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Add
                        Employee</button>
                </div>
                <!-- Modal-->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Add Staff</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <h5 class="text-start">Employee Fullname : </h5>
                                <input v-model="payload.employeeFullname" type="text" placeholder="employeeFullname"
                                    class="form-control">
                                <h5 class="text-start mt-2">Job Tittle: </h5>
                                <input v-model="payload.JobTittle" type="text mt-2" placeholder="JobTittle"
                                    class="form-control">
                                <h5 class="text-start mt-2">Employee URl: </h5>
                                <input v-model="payload.staffUrl" type="text" class="form-control "
                                    id="exampleDropdownFormEmail1" placeholder="staffUrl">
                                <h5 class="text-start mt-2">Employee Description: </h5>
                                <input v-model="payload.staffDescription" type="text" placeholder="staffDescription"
                                    class="form-control">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button @click.prevent="addStaff()" type="button" class="btn btn-dark">Add
                                    Employee</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Modal edit -->
                <div class="modal fade" :id="'edit' + employee.staffID" tabindex="-1" aria-labelledby="edit"
                    aria-hidden="true" v-for="employee in Staff" :key="employee.staffID">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="edit">Edit Staff</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <h5 class="text-start">Employee Fullname : </h5>
                                <input v-model="payload.employeeFullname" type="text"
                                    :placeholder="employee.employeeFullname" class="form-control">
                                <h5 class="text-start mt-2">Job Tittle: </h5>
                                <input v-model="payload.JobTittle" type="text mt-2" :placeholder="employee.JobTittle"
                                    class="form-control">
                                <h5 class="text-start mt-2">Employee URl: </h5>
                                <input v-model="payload.staffUrl" type="text" class="form-control "
                                    id="exampleDropdownFormEmail1" :placeholder="employee.staffUrl">
                                <h5 class="text-start mt-2">Employee Description: </h5>
                                <input v-model="payload.staffDescription" type="text"
                                    :placeholder="employee.staffDescription" class="form-control">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button @click.prevent="editStaff(employee.staffID)" type="button"
                                    class="btn btn-dark">Update
                                    Staff</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Modal delete-->
                <div class="modal fade" :id="'delete' + employee.staffID" tabindex="-1" aria-labelledby="delete"
                    aria-hidden="true" v-for="employee in Staff" :key="employee.staffID">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title  fs-5" id="delete">Delete Employee</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <h5 class="text-start">Are you sure?</h5>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button @click.prevent="deleteStaff(employee.staffID)" type="button"
                                    class="btn btn-dark">Delete Employee</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center text-white mb-5 pb-5" v-if="!Staff && !loading">
            <Spinner />
        </div>
        <div class="text-center text-white pb-5 mt-5 pt-5 mb-5" v-else-if="filterStaff.length === 0">
            <h3>No Employee found.</h3>
            <h2 class="hea text-dark">Kindly add the Employee.</h2>
        </div>

        <table class="AdiCont w-75 bg-white table mt-5 text-center mx-auto" v-else>
            <thead class="hea">
                <tr>
                    <th>ID</th>
                    <th>Fullname</th>
                    <th>JobTittle</th>
                    <th>Img</th>
                    <th>Description</th>
                    <th> Action</th>
                </tr>
            </thead>
            <tbody class="text-center mb-5">
                <tr v-for="employee in filterStaff" :key="employee.staffID">
                    <th scope="row"> {{ employee.staffID }}</th>
                    <td> {{ employee.employeeFullname }}</td>
                    <td> {{ employee.JobTittle }}</td>
                    <td><img :src="employee.staffUrl" class="w-50"></td>
                    <td>{{ employee.staffDescription }}</td>
                    <td> <button class=" btn bg-black text-white" data-bs-toggle="modal"
                            :data-bs-target="'#edit' + employee.staffID">
                            Edit</button></td>

                    <td><button class="  btn bg-black text-white" data-bs-toggle="modal"
                            :data-bs-target="'#delete' + employee.staffID">
                            Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue';
export default {
    name: "StaffsView",
    data() {
        return {
            searchInput: '',
            payload:
            {
                "employeeFullname": null,
                "JobTittle": null,
                "staffUrl": null,
                "staffDescription": null,

            },



        }
    },
    components: {
        Spinner
    },
    computed: {
        Staff() {
            return this.$store.state.staff
        },
        filterStaff() {
            const staff = this.$store.state.staff;
            if (!staff) {
                return [];
            }

            return staff.filter(employee =>
                employee.employeeFullname?.toLowerCase().includes(this.searchInput.toLowerCase())
            );
        }
    },
    mounted() {
        this.$store.dispatch("fetchStaff")
    },
    methods: {
        Search() {
            'Search input:', this.searchInput
        },
        deleteStaff(staffID) {
            this.$store.dispatch('deleteEmployee', staffID)
                .then(() => {
                    setTimeout(() => {
                        window.location.reload();
                    }, 600);
                })
        },
        addStaff() {
            this.$store.dispatch('addNewEmployee', this.payload)
                .then(() => {
                    setTimeout(() => {
                        window.location.reload();
                    }, 600);
                })
        },
        editStaff(staffID) {
            const updatedValue = {};
            if (this.payload.employeeFullname) {
                updatedValue.employeeFullname = this.payload.employeeFullname;
            }
            if (this.payload.JobTittle) {
                updatedValue.JobTittle = this.payload.JobTittle;
            }
            if (this.payload.staffUrl) {
                updatedValue.staffUrl = this.payload.staffUrl;
            }
            if (this.payload.staffDescription) {
                updatedValue.staffDescription = this.payload.staffDescription;
            }

            if (Object.keys(updatedValue).length > 0) {
                const updateData = Object.assign({}, { staffID }, updatedValue);
                this.$store.dispatch('updateEmployee', updateData)
                    .then(() => {
                        setTimeout(() => {
                            window.location.reload();
                        }, 600);
                    });
            }
        }


    }

}
</script>




<style src="../assets/css/style.css"></style>
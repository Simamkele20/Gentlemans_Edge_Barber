<template>
    <div class="Login">
        <h1 class="text-white pt-3 pb-4">My Profile</h1>
        <div class="login-form mx-auto ">
            <div class="text">
                <div>
                    <h1>{{ userData.firstName }} {{ userData.lastName }}</h1>
                    <h5>{{ userData.userAge }}</h5>
                    <h5>{{ userData.userGender }}</h5>
                    <h5>{{ userData.emailAdd }}</h5>
                    <button class="btn bg-dark text-white mx-3" data-bs-toggle="modal"
                        :data-bs-target="'#edit' + userData.userID">Edit</button>
                    <button class="btn bg-dark text-white mx-2" data-bs-toggle="modal"
                        :data-bs-target="'#delete' + userData.userID">Delete</button>
                </div>



                <!-- Modal edit -->
                <div class="modal fade text-black" :id="'edit' + userData.userID" tabindex="-1" aria-labelledby="edit"
                    aria-hidden="true" v-for="user in userData" :key="user.userID">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="edit">Edit User</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <h5 class="text-start">User Name: </h5>
                                <input v-model="payload.firstName" type="text" :placeholder="payload.firstName"
                                    class="form-control">
                                <h5 class="text-start mt-2">User LastName: </h5>
                                <input v-model="payload.lastName" type="text" :placeholder="payload.lastName"
                                    class="form-control">
                                <h5 class="text-start mt-2">User Gender: </h5>
                                <select v-model="payload.userGender" type="text" class="form-control "
                                    id="exampleDropdownFormEmail1" placeholder="Please Select your Gender">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                <h5 class="text-start mt-2">User Age: </h5>
                                <input v-model="payload.userAge" type="text" :placeholder="payload.userAge"
                                    class="form-control">
                                <h5 class="text-start mt-2">User Email Address: </h5>
                                <input v-model="payload.emailAdd" type="text" :placeholder="payload.emailAdd"
                                    class="form-control text-black">
                                <h5 class="text-start mt-2">User Password: </h5>
                                <input v-model="payload.userPwd" type="text" :placeholder="payload.userPwd"
                                    class="form-control text-black">

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button @click.prevent="editingUser(user)" type="button" class="btn btn-dark">Update
                                    User</button>
                            </div>
                        </div>
                    </div>
                </div>




                <!-- Modal delete-->
                <div class="modal fade" :id="'delete' + userData.userID" tabindex="-1" aria-labelledby="delete"
                    aria-hidden="true" v-for="user in userData" :key="user.userID">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title  fs-5 text-black" id="delete">Delete Account</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body ">
                                <h5 class="text-start text-black">Are you sure?</h5>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button @click.prevent="deletingUser(user.userID)" type="button"
                                    class="btn btn-dark">Delete Account</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        <router-link to="/logout" class="btn bg-black text-white text-center mt-5">Log out</router-link>
    </div>


</template>



<script>
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default {
    data() {
        return {
            payload:
            {
                "userID": cookies?.get("VerifiedUser").result.userID,
                emailAdd: cookies?.get("VerifiedUser").result.emailAdd,
                userPwd: cookies?.get("VerifiedUser").result.userPwd,
                "firstName": cookies?.get("VerifiedUser").result.firstName,
                "lastName": cookies?.get("VerifiedUser").result.lastName,
                "userAge": cookies?.get("VerifiedUser").result.userAge,
                "userGender": cookies?.get("VerifiedUser").result.userGender,
                "userRole": cookies?.get("VerifiedUser").result.userRole

            }
        }
    },
    components: {

    },
    computed: {

        userData() {
            let { result } = cookies?.get("VerifiedUser")
            return this.$store.state.user || result
        }

    },
    mounted() {


    },

    methods: {
        Login() {
            this.$store.dispatch('Login', this.payload)
        },
        editingUser(userID) {
            const updatedValue = {};
            if (this.payload.firstName) {
                updatedValue.firstName = this.payload.firstName;
            }
            if (this.payload.lastName) {
                updatedValue.lastName = this.payload.lastName;
            }
            if (this.payload.userAge) {
                updatedValue.userAge = this.payload.userAge;
            }
            if (this.payload.userGender) {
                updatedValue.userGender = this.payload.userGender;
            }
            if (this.payload.emailAdd) {
                updatedValue.emailAdd = this.payload.emailAdd;
            }
            if (this.payload.userPwd) {
                updatedValue.userPwd = this.payload.userPwd;
            }
            if (this.payload.userRole) {
                updatedValue.userRole = this.payload.userRole;
            }

            if (Object.keys(updatedValue).length > 0) {
                const updateData = Object.assign({}, { userID }, updatedValue);
                this.$store.dispatch('updateUser', updateData)
                    .then(() => {
                        setTimeout(() => {
                            window.location.reload();
                        }, 600);
                    });
            }
        },
        deletingUser() {
            this.$store.dispatch('deleteUser', this.userData.userID)
                .then(() => {
                    setTimeout(() => {
                        window.location.reload();
                    }, 600);
                })
            cookies.remove("VerifiedUser")
        },



    }
}


</script>

<style style="../assets/css/style.css">
@import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');


.Login {
    height: 83vh;
    text-align: center;
    align-items: center;
    justify-content: center;
    background: #151515;
}

.login-form {
    position: relative;
    width: 300px;
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
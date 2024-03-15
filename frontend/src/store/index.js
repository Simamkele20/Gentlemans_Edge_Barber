import { createStore } from "vuex";
import axios from "axios";
import sweet from "sweetalert";
const URL = "https://gentlemans-edge-barber.onrender.com/";
import router from "../router";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import AuthenticatedUser from "../service/AuthenticatedUser";

export default createStore({
  state: {
    users: null,
    user: null,
    services: null,
    service: null,
    staff: null,
    employee: null,
    bookings: null,
    booking: null,
  },
  getters: {},
  mutations: {
    setUsers(state, value) {
      state.users = value;
    },
    setUser(state, value) {
      state.user = value;
    },
    setServices(state, value) {
      state.services = value;
    },
    setService(state, value) {
      state.service = value;
    },
    setStaff(state, value) {
      state.staff = value;
    },
    setEmployee(state, value) {
      state.employee = value;
    },
    setBookings(state, value) {
      state.bookings = value;
    },
    setBooking(state, value) {
      state.booking = value;
    },
    setLogin(state, value) {
      state.login = value;
    },
  },
  actions: {
    async register(context, payload) {
      try {
        let { msg, token } = (await axios.post(`${URL}users/register`, payload))
          .data;
        if (token) {
          context.dispatch("fetchUsers");
          sweet({
            title: "Register.",
            text: msg,
            icon: "success",
            timer: 2000,
          });
          router.push({ name: "login" });
        } else {
          sweet({
            title: "Register",
            text: msg,
            icon: "error",
            timer: 2000,
          });
        }
      } catch (e) {
        sweet({
          title: "Error",
          text: "Please try again later",
          icon: "error",
          timer: 2000,
        });
      }
    },
    async Login(context, payload) {
      try {
        let { msg, result, token } = (
          await axios.post(`${URL}users/login`, payload)
        ).data;
        if (result) {
          context.commit("setUser", { msg, result });
          cookies.set("VerifiedUser", { token, msg, result });
          // Authorization
          AuthenticatedUser.ApplyingToken(token);
          sweet({
            title: msg,
            text: `Welcome Back,
            ${result?.firstName} ${result?.lastName}`,
            icon: "success",
            timer: 2000,
          });
          router.push({ name: "home" });
        } else {
          sweet({
            title: "Login",
            text: msg,
            icon: "error",
            timer: 2000,
          });
        }
      } catch (e) {
        //'Please contact the administrator'
        sweet({
          title: "Error",
          text: e.message,
          icon: "error",
          timer: 2000,
        });
      }
    },
    async fetchUsers(context) {
      try {
        let { results } = (await axios.get(`${URL}users`)).data;
        if (results) {
          context.commit("setUsers", results);
        }
      } catch (e) {
        sweet({
          title: "Error",
          text: e.message,
          icon: "error",
          timer: 2000,
        });
      }
    },
    async fetchUser(context, payload) {
      try {
        let { result } = (await axios.get(`${URL}users/${payload.id}`)).data;
        if (result) {
          context.commit("setUser", result);
        }
      } catch (e) {
        sweet({
          title: "Error",
          text: e.message,
          icon: "error",
          timer: 2000,
        });
      }
    },
    async updateUser(context, payload) {
      try {
        let { msg } = await (
          await axios.patch(`${URL}users/update/${payload.userID}`, payload)
        ).data;

        context.dispatch("fetchUsers");
        sweet({
          title: "Update user",
          text: msg,
          icon: "success",
          timer: 2000,
        });
      } catch (e) {
        sweet({
          title: "Error",
          text: e.message,
          icon: "error",
          timer: 2000,
        });
      }
    },
    async deleteUser(context, id) {
      try {
        let { msg } = await axios.delete(`${URL}users/delete/${id}`);

        context.dispatch("fetchUsers");
        sweet({
          title: "Delete user",
          text: msg,
          icon: "success",
          timer: 2000,
        });
      } catch (e) {
        sweet({
          title: "Error",
          text: "An error occurred when deleting a user.",
          icon: "error",
          timer: 2000,
        });
      }
    },
    async addNewService(context, add) {
      try {
        let { msg } = await axios.post(`${URL}services/addService`, add);

        context.dispatch("fetchServices");
        sweet({
          title: "New Service has been added",
          text: msg,
          icon: "success",
          timer: 2000,
        });
      } catch (e) {
        sweet({
          title: "Error",
          text: "An error occurred when adding services.",
          icon: "error",
          timer: 2000,
        });
      }
    },
    async fetchServices(context) {
      try {
        let { results } = (await axios.get(`${URL}services`)).data;
        if (results) {
          context.commit("setServices", results);
        }
      } catch (e) {
        sweet({
          title: "Error",
          text: e.message,
          icon: "error",
          timer: 2000,
        });
      }
    },
    async fetchService(context, payload) {
      try {
        let { result } = (await axios.get(`${URL}services/${payload.id}`)).data;
        if (result) {
          context.commit("setService", result);
        } else {
          sweet({
            title: "Retrieving a single service",
            text: "Service was not found",
            icon: "info",
            timer: 2000,
          });
        }
      } catch (e) {
        sweet({
          title: "Error",
          text: "A service was not found.",
          icon: "error",
          timer: 2000,
        });
      }
    },
    async updateService(context, payload) {
      try {
        let { msg } = await (
          await axios.patch(`${URL}services/update/${payload.servID}`, payload)
        ).data;
        context.dispatch("fetchServices");
        sweet({
          title: "Update service",
          text: msg,
          icon: "success",
          timer: 2000,
        });
      } catch (e) {
        sweet({
          title: "Error",
          text: "An error occurred when updating a service.",
          icon: "error",
          timer: 2000,
        });
      }
    },
    async deleteService(context, payload) {
      try {
        let { msg } = await axios.delete(`${URL}services/delete/${payload}`);

        context.dispatch("fetchServices");
        sweet({
          title: "Delete service",
          text: msg,
          icon: "success",
          timer: 2000,
        });
      } catch (e) {
        sweet({
          title: "Error",
          text: "An error occurred when deleting a service.",
          icon: "error",
          timer: 2000,
        });
      }
    },
    async addNewEmployee(context, add) {
      try {
        let { msg } = await axios.post(`${URL}staff/addEmployee`, add);

        context.dispatch("fetchStaff");
        sweet({
          title: "New Employee has been added",
          text: msg,
          icon: "success",
          timer: 2000,
        });
      } catch (e) {
        sweet({
          title: "Error",
          text: e.message,
          icon: "error",
          timer: 2000,
        });
      }
    },
    async fetchStaff(context) {
      try {
        let { results } = (await axios.get(`${URL}staff`)).data;
        if (results) {
          context.commit("setStaff", results);
        }
      } catch (e) {
        sweet({
          title: "Error",
          text: e.message,
          icon: "error",
          timer: 2000,
        });
      }
    },
    async fetchEmployee(context, payload) {
      try {
        let { result } = (await axios.get(`${URL}staff/${payload.id}`)).data;
        if (result) {
          context.commit("setEmployee", result);
        } else {
          sweet({
            title: "Retrieving a single employee",
            text: "Service was not found",
            icon: "info",
            timer: 2000,
          });
        }
      } catch (e) {
        sweet({
          title: "Error",
          text: e.message,
          icon: "error",
          timer: 2000,
        });
      }
    },
    async updateEmployee(context, payload) {
      try {
        let { msg } = await (
          await axios.patch(`${URL}staff/update/${payload.staffID}`, payload)
        ).data;
        context.dispatch("fetchStaff");
        sweet({
          title: "Update employee",
          text: msg,
          icon: "success",
          timer: 2000,
        });
      } catch (e) {
        sweet({
          title: "Error",
          text: "An error occurred when updating a employee.",
          icon: "error",
          timer: 2000,
        });
      }
    },
    async deleteEmployee(context, payload) {
      try {
        let { msg } = await axios.delete(`${URL}staff/delete/${payload}`);

        context.dispatch("fetchStaff");
        sweet({
          title: "Delete employee",
          text: msg,
          icon: "success",
          timer: 2000,
        });
      } catch (e) {
        sweet({
          title: "Error",
          text: "An error occurred when deleting a employee.",
          icon: "error",
          timer: 2000,
        });
      }
    },
    async addBooking(context, add) {
      try {
        let { msg } = await axios.post(`${URL}booking/addBooking`, add);
        context.dispatch("fetchBookings");
        sweet({
          title: "New Booking has been added",
          text: msg,
          icon: "success",
          timer: 2000,
        });
      } catch (e) {
        sweet({
          title: "Error",
          text: e.message,
          icon: "error",
          timer: 2000,
        });
      }
    },
    async fetchBookings(context) {
      try {
        let { results } = (await axios.get(`${URL}booking`)).data;
        if (results) {
          context.commit("setBookings", results);
        }
      } catch (e) {
        sweet({
          title: "Error",
          text: e.message,
          icon: "error",
          timer: 2000,
        });
      }
    },
    async fetchBooking(context, id) {
      try {
        let { results } = (
          await axios.get(`${URL}booking/users/${id}`)
        ).data;
        if (results) {
          context.commit("setBooking", results);
        } else {
          sweet({
            title: "Retrieving a single booking",
            text: "Booking was not found",
            icon: "info",
            timer: 2000,
          });
        }
      } catch (e) {
        sweet({
          title: "Error",
          text: e.message,
          icon: "error",
          timer: 2000,
        });
      }
    },
    async updateBooking(context, payload) {
      try {
        let { msg } = await (
          await axios.patch(`${URL}booking/update/${payload.bookID}`, payload)
        ).data;
        context.dispatch("fetchBookings");
        sweet({
          title: "Update Booking",
          text: msg,
          icon: "success",
          timer: 2000,
        });
      } catch (e) {
        sweet({
          title: "Error",
          text: "An error occurred when updating a booking.",
          icon: "error",
          timer: 2000,
        });
      }
    },
    async deleteBooking(context, payload) {
      try {
        let { msg } = await axios.delete(`${URL}booking/delete/${payload}`);

        context.dispatch("fetchBookings");
        sweet({
          title: "Booking Cancelled",
          text: msg,
          icon: "success",
          timer: 2000,
        });
      } catch (e) {
        sweet({
          title: "Error",
          text: e.message,
          icon: "error",
          timer: 2000,
        });
      }
    },
  },
  modules: {},
});

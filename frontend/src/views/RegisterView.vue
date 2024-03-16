<template>

  <div class="Register">

    <div class="register-form mx-auto ">
      <div class="text">
        Register
      </div>
      <form>
        <div class="field">
          <input v-model="payload.firstName" type="text" placeholder=" Enter Your Name">
        </div>
        <div class="field">

          <input v-model="payload.lastName" type="text" placeholder="Enter Your Surname">
        </div>
        <div class="field">

          <input v-model="payload.userAge" type="number" placeholder="Enter Your Age">
        </div>
        <div class="field">
          <select v-model="payload.userGender" type="text" name="Gneder" required>
            <option value="" disabled selected hidden>Choose a Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div class="field">

          <input v-model="payload.emailAdd" type="email" placeholder="Enter Your Email">
        </div>
        <div class="field">

          <input v-model="payload.userPwd" type="password" placeholder="Password">
        </div>

        <button @click.prevent="Register()" type="submit">Sign Up</button>

      </form>
    </div>
  </div>

</template>


<script>



export default {
  data() {
    return {
      payload: {
        "userID": null,
        "firstName": null,
        "lastName": null,
        "userAge": null,
        "userGender": null,
        "emailAdd": null,
        "userPwd": null,
        "userRole": "user",
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


<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');

* {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
}

.Register {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  background: #151515;
}

.register-form {
  margin-top: 20px;
  margin-bottom: 20px;
  position: relative;
  width: 370px;
  height: auto;
  background: #1b1b1b;
  padding: 20px 35px 40px;
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
form button,
select {
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
  margin-top: 20px;
  ;
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
  margin-top: px;
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
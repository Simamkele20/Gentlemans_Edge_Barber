<template>
  <div class="container mt-3 ">
    <h2 class="ServHead text-center mb-4">Our Services</h2>
    <div class="bg-black text-center">
    </div>
    <div class=" servBtn row text-end">
      <div class="col">
        <input v-model="searchInput" type="text" placeholder="Search Service by name" @input="Search"
          class="form-control">
      </div>
      <div class="col">
        <button @click="sortItems" class=" btn btn-dark"> Sort by Price</button>
      </div>
    </div>

    <div class="ServCar col mb-5">
      <div class=" row d-grid d-md-flex" v-if="services">
        <Card v-for="service in displayedServices" :key="service.servID" class=" text-center" id="cardPro">
          <template #cardHeader>
            <img :src="service.servUrl" class="card-img-top mx-auto mt-4  w-75" alt="Pro">
          </template>
          <template #cardBody>
            <h4 class="card-text text-dark mt-3 ">
              {{ service.servName }}
            </h4>
            <h5 class="card-text text-dark ">
              R{{ service.servAmount }}
            </h5>
            <router-link :to="{ name: 'service', params: { id: service.servID } }"><button
                class="btn bg-black text-white" v-show="user">
                View More </button> </router-link>
          </template>
        </Card>
      </div>
      <div class="row mx-auto" v-else>
        <Spinner />
      </div>
    </div>


  </div>
</template>


<script>
import Spinner from '@/components/Spinner.vue';
import Card from '../components/Card.vue';
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();



export default {
  data() {
    return {
      searchInput: '',
      sortedItems: false,
      Services: [
        {
          servID: null,
          servName: null,
          servAmount: null,
          servDescription: null,
          servUrl: null,
          userID: null
        }
      ]
    }

  },
  components: {
    Card, Spinner
  },
  computed: {
    user(){
            return this.$store.state.user || cookies?.get("VerifiedUser")
        },
    services() {
      return this.$store.state.services
    },
    displayedServices() {
      let items = [...this.services];
      if (this.sortedItems) {
        items.sort((a, b) => a.servAmount - b.servAmount);
      } else if (this.searchInput) {
        items = items.filter(service =>
          service.servName.toLowerCase().includes(this.searchInput.toLowerCase())
        );
      }
      return items;
    },

  },
  mounted() {
    this.$store.dispatch('fetchServices')
  },
  methods: {
    Search() {
      'Search input:', this.searchInput
    },
    sortItems() {
      this.sortedItems = !this.sortedItems;
    },
  }

}

</script>


<style src="../assets/css/style.css"></style>
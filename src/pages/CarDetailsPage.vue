<template>
  <div class="container">
    <section v-if="activeCar" class="row justify-content-center">
      <div class="col-12">
    <img class="img-fluid" :src="activeCar.imgUrl" alt=""></div>
    <div class="col-12 text-center">
      <p>{{ activeCar.make }} {{ activeCar.model }} {{ activeCar.year }}</p>
    </div>
    <div class="col-8">
      <p>{{ activeCar.description }}</p>
    </div>
    <div class="col-6">
      <p>${{ activeCar.price }}</p>
    </div>
    <div class="col-6 text-end">
      <span>{{ activeCar.creator.name }}</span>
      <img class="profile-pic" :src="activeCar.creator.picture" alt="">
    </div>
    <button v-if="activeCar.creatorId == account.id" @click="deleteCar" class="btn btn-danger">Delete Listing <i class="mdi mdi-delete-forever"></i></button>
    </section>
    <section v-else>
      <i class="mdi mdi-loading mdi-spin text-primary fs-2">loading</i>
    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { carsService } from '../services/CarsService.js';
import { useRoute, useRouter } from 'vue-router';
import { logger } from '../utils/Logger.js';

export default {
  // REVIEW PAGES NEVER TAKE IN PROPS
  setup(){
// NOTE pages should handle the getting of data they require to show/use and nothing more
const route = useRoute() //the route is where you are in context of the app your url
const router = useRouter() // the router is how to move between pages
onMounted(()=>{
getCarById()
logger.log(route)
})
async function getCarById(){
try {
  const carId = route.params.carId
  await carsService.getCarById(carId)
} catch (error) {
  Pop.error(error)
}
}
  return {
    // activeCar: computed(()=> AppState.cars.find(c => c.id ==))
    // cars: computed(()=> AppState.cars)
    activeCar: computed(()=> AppState.activeCar),
    account: computed(()=> AppState.account),
    async deleteCar(){
      try {
         if(await Pop.confirm('Are you sure about that?')){
          const carId = AppState.activeCar.id
          await carsService.removeCar(carId)
          router.push({name: 'Cars'})
          Pop.success('car Removed')
        }
      } catch (error) {
        Pop.error(error)
      }
    }
   }
  }
};
</script>


<style lang="scss" scoped>
.profile-pic{
  height: 100px;
  width: 100px;
  object-fit: cover;
  object-position: center;
}
</style>

<template>
  <form class="row" @submit.prevent="createCar">
    <div class="mb-3 col-3">
      <label for="car-make">Make</label>
      <input v-model="carData.make" type="text" id="car-make" class="form-control" placeholder="car make" maxlength="10" required>
    </div>
    <div class="mb-3 col-3">
      <label for="car-model">Model</label>
      <input v-model="carData.model" type="text" id="car-model" class="form-control" placeholder="car model" maxlength="10" required>
    </div>
    <div class="mb-3 col-3">
      <label for="car-year">Year</label>
      <input v-model="carData.year" type="number" id="car-year" class="form-control" placeholder="car year" max="2024" required>
    </div>
    <div class="mb-3 col-3">
      <label for="car-price">Price</label>
      <input v-model="carData.price" type="number" id="car-price" class="form-control" placeholder="car price" min="1" required>
    </div>
    <div class="mb-3 col-12">
      <label for="car-imgUrl">Image Url</label>
      <input v-model="carData.imgUrl" type="url" id="car-imgUrl" class="form-control" placeholder="must be url" min="1" required>
      <img class="img-fluid mt-1 h-100" :src="carData.imgUrl" alt="">
    </div>
    <div class="mb-3 col-12">
      <label for="car-description">Description</label>
      <textarea v-model="carData.description" id="car-description" class="form-control" placeholder="Description" ></textarea>
    </div>
    <div class="mb-3 col-12">
      <button class="btn btn-primary" title="submit car data to database">Submit</button>
    </div>
  </form>
</template>


<script>
import { ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { carsService } from '../services/CarsService.js';
import { useRouter } from 'vue-router';

export default{
  setup(){
    // const make = ref('') // great for single inputs
    const carData = ref({})
    const router = useRouter() // router takes you to other pages (it's the vehicle)
    return{
      carData,
      async createCar(){
        try {
          logger.log('creating car 🚗', carData.value)
          const newCar = await carsService.createCar(carData.value)
          carData.value = {}
          Pop.toast('Car Created', 'success')
          // NOTE the next line actually pushes you to the page for the details of that one car
          router.push({name: 'Car Details', params: {carId: newCar.id}})
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>

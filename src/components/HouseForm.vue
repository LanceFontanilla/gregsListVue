<template>
    <form class="row" @submit.prevent="createHouse">
    <div class="mb-3 col-3">
          <label for="house-price">Price</label>
          <input v-model="houseData.price" type="number" id="house-price" class="form-control" placeholder="house price" min="1" required>
        </div>
        <div class="mb-3 col-3">
          <label for="house-bedrooms">Bedrooms</label>
          <input v-model="houseData.bedrooms" type="number" id="house-bedroom" class="form-control" placeholder="house bedrooms" required>
        </div>
        <div class="mb-3 col-3">
          <label for="house-bath">Bathrooms</label>
          <input v-model="houseData.bathrooms" type="number" id="house-bathroom" class="form-control" placeholder="house bathroom" required>
        </div>
        <div class="mb-3 col-3">
          <label for="house-levels">Levels</label>
          <input v-model="houseData.levels" type="number" id="house-level" class="form-control" placeholder="house level" min="1" required>
        </div>
        <div class="mb-3 col-3">
          <label for="house-year">Year</label>
          <input v-model="houseData.year" type="number" id="house-year" class="form-control" placeholder="house year" min="1900" required>
        </div>
        <div class="mb-3 col-12">
          <label for="house-imgUrl">Image Url</label>
          <input v-model="houseData.imgUrl" type="url" id="house-imgUrl" class="form-control" placeholder="must be url" required>
          <img class="img-fluid mt-1 h-100" :src="houseData.imgUrl" alt="">
        </div>
        <div class="mb-3 col-12">
          <label for="house-description">Description</label>
          <textarea v-model="houseData.description" id="house-description" class="form-control" placeholder="Description" ></textarea>
        </div>
        <div class="mb-3 col-12">
          <button class="btn btn-primary" title="submit house data to database">Submit</button>
        </div>
    </form>
   
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { logger } from '../utils/Logger.js';
import { housesService } from '../services/HousesService.js';
import Pop from '../utils/Pop.js';

export default {
setup() {
  const houseData = ref({})
  const router = useRouter()
  
  return {
    houseData,
    async createHouse(){
        try {
            logger.log('creating House', houseData.value)
            const newHouse = await housesService.createHouse(houseData.value)
            houseData.value = {}
            Pop.toast('House Created', 'success')
            router.push({name: 'House Details', params: {houseId: newHouse.id}})
        } catch (error) {
            Pop.error(error)
        }
    }
  };
},
};
</script>



<style lang="scss" scoped></style>
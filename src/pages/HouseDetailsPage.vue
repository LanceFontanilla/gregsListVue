<template>
    <div class="container">
        <section class="row justify-content-center">
            <div class="col-12">
                <img class="img-fluid" :src="activeHouse.imgUrl" alt="">
            </div>
        <div class="mt-5 p-2">
            ${{ house.price }} || {{ house.bedrooms }} Beds || {{ house.bathrooms }} Bath 
        </div>
        <div class="p-2">
            {{ house.levels }} Levels || Built: {{ house.year }}
        </div>
        </section>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { housesService } from '../services/HousesService';
import { AppState } from '../AppState';


export default {
setup() {
    const route = useRoute()
    const router = useRouter()
    onMounted(()=>{
        getHouseById()
        logger.logger(route)
    })
    async function getHouseById(){
        try {
            const houseId = route.params.houseId
            await housesService.getHouseById(houseId)
        } catch (error) {
            Pop.error(error)
        }
    }
  return {
    activeHouse: computed(()=> AppState.activeHouse)
  };
},
};
</script>


<style>
</style>
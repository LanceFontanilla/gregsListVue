<template>
    <div class="container">
        <section v-if="activeHouse" class="row justify-content-center">
            <div class="col-12">
                <img class="img-fluid" :src="activeHouse.imgUrl" alt="">
            </div>
        <div class="mt-3 p-2">
            ${{ activeHouse.price }} || {{ activeHouse.bedrooms }} Beds || {{ activeHouse.bathrooms }} Bath 
        </div>
        <div class="p-2">
            {{ activeHouse.levels }} Levels || Built: {{ activeHouse.year }}
        </div>
        <div class="p-2">
        {{ activeHouse.description }}
        </div>
        </section>
        <section v-else>
    <i class="mdi mdi-loading mdi-spin text-primary fs-2">loading</i>
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
        logger.log(route)
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
    activeHouse: computed(()=> AppState.activeHouse),
  };
},
};
</script>


<style>
</style>
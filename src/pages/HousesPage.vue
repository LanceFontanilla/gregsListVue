<template>
<div class="container">

    <HouseForm/>

    <section class="row mt-2 g-3">

        <div v-for="house in houses" :key="house.id" class="col-12 col-md-6">
        <!-- {{ house.bedrooms }} {{ house.bathrooms }} -->
        <HouseCard :house = "house"/>
        </div>
    </section>
</div> 
    </template>

<script>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop';
import { housesService } from '../services/HousesService';
import { AppState } from '../AppState';


export default {
setup() {
    onMounted(() =>{
        getHouses();
    })
    async function getHouses(){
        try {
            await housesService.getHouses();
        } catch (error) {
            Pop.error(error);
        }
    }
    return {
        houses: computed(()=> AppState.houses)
    };
    },
};
</script>


<style lang="scss" scoped>
</style>
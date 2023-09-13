<template>
    <router-link :to="{name: 'House Details', params:{houseId: house.id}}">
        <div class="card house-card bg-light elevation-2">
            <section class="row">
                <div class="col-6">
                    <img class="house-image" :src="house.imgUrl" alt="">
                </div>
                <div class="col-6 mt-5">
                    <div>
                        Buy this house for just ${{ house.price}}
                    </div>
                    <div class="mt-5">
                        Click for more information.
                    </div>
                </div>
            </section>
        </div>
    </router-link>
</template>

<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { House } from '../models/House.js';
import { housesService } from '../services/HousesService';
export default {
    props: {house: {type: House, required: true}},
setup() {
  return { };
},
};
</script>


<style lang="scss" scoped>

.house-card{
    height: 35vh;
    transition: all .1s ease;
    cursor: pointer;
    &:hover{
        transition: all .2s ease;
        transform: scale(1.05);
    }    
}
.house-image{
    height: 30vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
}
</style>
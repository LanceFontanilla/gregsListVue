import { AppState } from "../AppState"
import { House } from "../models/House"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class HousesService {
    async getHouses() {
        const res = await api.get('api/houses')
        logger.log('getting houses', res.data)
        AppState.houses = res.data.map(house => new House(house))
    }
    async getHouseById(houseId) {
        AppState.activeHouse = null
        const res = await api.get(`api.houses/${houseId}`)
        logger.log('one house', res.data)
        AppState.activeHouse = new House(res.data)
    }

}

export const housesService = new HousesService()
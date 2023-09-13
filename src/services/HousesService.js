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
        const res = await api.get(`api/houses/${houseId}`)
        logger.log('one house', res.data)
        AppState.activeHouse = new House(res.data)
    }
    async createHouse(houseData) {
        const res = await api.post('api/houses', houseData)
        logger.log('new house', res.data)
        const newHouse = new House(res.data)
        AppState.houses.push(newHouse)
        return newHouse
    }
    async removeHouse(houseId) {
        const res = await api.delete(`api/houses/${houseId}`)
        logger.log('removed house', res.data)
        AppState.activeHouse = null

        let indexToRemove = AppState.houses.findIndex(house => house.id == houseId)
        if (indexToRemove >= 0) {
            AppState.houses.splice(indexToRemove, 1)
        }
    }
}

export const housesService = new HousesService()
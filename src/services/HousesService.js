import { AppState } from "../AppState.js";
import { House } from "../Models/House.js";
import { server } from "./AxiosService.js";



class HousesService {

  setActiveHouse(house) {
    AppState.activeHouse = house
  }

  async getHouseById(houseId) {
    let res = await server.get(`api/houses/${houseId}`)
    AppState.activeHouse = new House(res.data)
  }

  async getHouse() {
    let res = await server.get('api/houses')
    AppState.houses = res.data.map(h => new House(h))
  }

  async createHouse(houseFormData) {
    let res = await server.post('api/houses', houseFormData)
    let house = new House(res.data)
    AppState.houses = [...AppState.houses, house]
    console.log(AppState.houses);
  }

  async updateHouse(houseData) {
    let res = await server.put(`api/houses/${houseData.id}`, houseData)
    // let house = new House(res.data)
    // let houseIndex = AppState.houses.findIndex(h => h.id == houseData.id)
    // AppState.houses.splice(houseIndex, 1, house)
    AppState.activeHouse = res.data

  }

  async deleteHouse(houseId) {
    let url = `api/houses/${houseId}`
    await server.delete(url)
    AppState.houses = AppState.houses.filter(h => h.id != houseId)
  }

}


export const housesService = new HousesService()
import { apiClient } from "./api";

export default{
	getRandomPhotos(){
		return apiClient.get('photos/random?featured&count=30')
	},
	getSearchPhotos(searchParam,page){
		return apiClient.get(`search/photos/?query="${searchParam}"&per_page=30&page=${page}`)
	}
}
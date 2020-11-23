import Vue from "vue";
import Vuex from "vuex";

import getData from "@/services/getData";

Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		photos:[],
		// page:0,
		isLoading:false
	},
	mutations:{
		SET_PHOTOS(state,payload){
			state.photos = payload;
		},
		SET_LOADING(state,payload){
			state.isLoading = payload;
		},
		INCREMENT_PAGE(state){
			state.page+=1;
		}
	},
	actions:{
		async getRandomPhotos({commit}){
			commit("SET_LOADING", true)
			try {
				let {data} = await getData.getRandomPhotos();
				console.log(data);
				commit("SET_PHOTOS",data)
        return data;
      } catch (error) {
        console.log("[error] ->", error);
        throw Error(error);
			} finally{
				commit("SET_LOADING", false)
			}
			
		},
		async getSearchPhotos({commit,state},searchArg,){
		if(state.photos.length == []){
			commit("SET_LOADING", true)
		}
			try {
				commit("INCREMENT_PAGE")
				let {data} = await getData.getSearchPhotos(searchArg.query,searchArg.page);
				console.log(data);
				let photosArr = state.photos;
				if (data.results.length > 1) {
					data.results.forEach((item) => photosArr.push(item))
				}
				commit("SET_PHOTOS",photosArr)
        return data.results;
      } catch (error) {
        console.log("[error] ->", error);
        throw Error(error);
			} finally{
				commit("SET_LOADING", false)
			}
			
		},
		emptyPhotosArr({commit}){
			commit("SET_PHOTOS", [])
		}
	}
})
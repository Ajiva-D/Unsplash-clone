<template>
	<header>
		<div class="container">
			<b-row>
				<transition name="flip-x">
					<b-col class="position-relative" cols="12" v-if="showInput" key="input">
						<font-awesome-icon icon="search" class="search" />
						<input type="text" class="py-3 px-5" v-model="searchValue" placeholder="Search for photo" @keyup="getSearch" />
					</b-col>
					<b-col cols="12 text-left" v-else class="d-flex align-items-center justify-content-between" key="result">
						<h2
							>Search Results for <span>"{{ searchValue }}"</span></h2
						>
						<font-awesome-icon icon="search" class="search-btn ml-2" @click="showInput = true" />
					</b-col>
				</transition>
			</b-row>
		</div>
	</header>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
	data() {
		return {
			showInput: true,
			searchValue: "",
		};
	},
	computed: {
		...mapState(["isLoading", "photos"]),
	},
	methods: {
		getSearch(event) {
			if (event.keyCode === 13) {
				this.$emit('search',this.searchValue)
				this.emptyPhotosArr()
				this.showInput = false;
			}
		},
		...mapActions(["getSearchPhotos","emptyPhotosArr"]),
	},
	mounted() {},
};
</script>

<style lang="scss" scoped>
header {
	background-color: #9aa1af;
	color: #9aa1af;
	padding-top: 100px;
	padding-bottom: 100px;
	input {
		width: 100%;
		border-radius: 6px;
		border: none;
		outline: none;
	}

	.search {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 30px;
		&-btn {
			color: rgb(77, 81, 95);
			font-size: 30px;
		}
	}
	h2 {
		color: rgb(4, 34, 133);
		font-weight: 500;
		span {
			color: rgb(77, 81, 95);
		}
	}
.flip-x-enter,
  .flip-x-leave-to{
    transform: rotateY(-80deg);
    opacity: 0;
  }
  
  .flip-x-enter-active,
  .flip-x-leave-active{
      transition:  transform 0.5s, opacity 0.3s;
  }  
}
</style>

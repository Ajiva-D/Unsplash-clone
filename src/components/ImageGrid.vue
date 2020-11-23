<template>
	<main>
		<b-container>
			<div class="loader-con" v-if="isLoading">
				<div class="loader position-relative d-flex align-items-end flex-wrap pl-4" v-for="i in 3" :key="i">
					<div>
						<div class="loader-title my-2"></div>
						<div class="loader-text mb-3"></div>
					</div>
				</div>
			</div>
			<div class="px-5 img-grid" v-else>
				<div class="img-grid-card position-relative" v-for="(photo, index) in photos" :key="index" @click="$bvModal.show(`modal-${index}`)">
					<img :src="photo.urls.regular" v-if="photo.urls" :alt="photo.alt_description" />
					<div class="d-flex flex-column align-items-start pl-4 justify-content-end overlay">
						<h5>{{ photo.user.first_name }} {{ photo.user.last_name }}</h5>
						<p v-if="photo.location">{{ photo.location.city }}, {{ photo.location.country }}</p>
						<p v-else-if="photo.user.country">{{ photo.user.country }}</p>
						<p v-else>{{ photo.user.location || "" }}</p>
					</div>

					<b-modal :id="`modal-${index}`" size="lg" centered hide-footer hide-header>
						<div>
							<img class="img-cover" :src="photo.urls.full" alt="" />
							<!-- <div class="img-cover" :style="`background-image:url('${photo.urls.full}');`"></div> -->
							<div class="img-body px-5 py-4">
								<h4>{{ photo.user.first_name }} {{ photo.user.last_name }}</h4>
								<p v-if="photo.location">{{ photo.location.city }}, {{ photo.location.country }}</p>
								<p v-else-if="photo.user.country">{{ photo.user.country }}</p>
								<p v-else>{{ photo.user.location || "" }} </p>
							</div>
						</div>
					</b-modal>
				</div>
			</div>
		</b-container>
		<infinite-loading spinner="spiral" @infinite="infiniteScroll" v-if="isSearch"></infinite-loading>
	</main>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
	props:["searchVal"],
	data() {
		return {
			isSearch:false,
			page:1,
			searchValue:''
		};
	},
	computed: {
		...mapState(["isLoading", "photos"]),
	},
	methods: {
		async infiniteScroll($state){
			if(this.isSearch){
					let data = await this.getSearchPhotos({query:this.searchValue,page:this.page});
				if (data.length > 1) {
					console.log("yes");
					$state.loaded();
					this.page++;
				} else {
						console.log("no");
					$state.complete()
				}
			}
		
		},
		...mapActions(["getRandomPhotos","getSearchPhotos"]),
	},
	mounted() {
		this.getRandomPhotos();
	},
	watch:{
		searchVal(value){
		if (	value !== null) {
			this.isSearch = true;
			this.searchValue = value;
			this.infiniteScroll();
		}  else this.isSearch = false
		}
	}
};
</script>

<style lang="scss" scoped>
main {
	position: relative;
	top: -50px;
}
@keyframes placeHolderShimmer {
	0% {
		-webkit-transform: translateZ(0);
		transform: translateZ(0);
		background-position: -468px 0;
	}
	to {
		-webkit-transform: translateZ(0);
		transform: translateZ(0);
		background-position: 468px 0;
	}
}
.loader {
	color: white;
	margin: 0 1rem 1rem 0;
	display: inline-block;
	width: 100%;
	text-align: center;
	font-family: system-ui;
	font-weight: 900;
	font-size: 2rem;
	border-radius: 6px;
	background: #fbfbfb;
	height: 400px;
	box-shadow: 3px 5px 15px -8px rgba(50, 50, 50, 0.18);
	&-title {
		width: 150px;
		height: 10px;
		background-color: rgb(243, 242, 242);
		will-change: transform;
		animation: placeHolderShimmer 1s linear infinite forwards;
		-webkit-backface-visibility: hidden;
		background: #e6e6e6;
		background: linear-gradient(90deg, #eee 8%, #ddd 18%, #eee 33%);
		background-size: 800px 104px;
	}
	&-text {
		width: 80px;
		height: 10px;
		background-color: rgb(243, 242, 242);
		will-change: transform;
		animation: placeHolderShimmer 1s linear infinite forwards;
		-webkit-backface-visibility: hidden;
		background: #e6e6e6;
		background: linear-gradient(90deg, #eee 8%, #ddd 18%, #eee 33%);
		background-size: 800px 104px;
	}
	&-con {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 20px;
	}
}
@for $i from 1 through 3 {
	.loader:nth-child(#{$i}) {
		$h: (random(400) + 100) + px;
		height: $h;
	}
}
.img-grid {
	columns: 3 200px;
	column-gap: 1rem;
	&-card {
		color: white;
		margin: 0 1rem 1rem 0;
		display: inline-block;
		width: 100%;
		text-align: center;
		font-family: system-ui;
		font-weight: 900;
		font-size: 2rem;
		border-radius: 6px;
		img {
			width: 100%;
			height: 100%;
			border-radius: 6px;
			object-fit: cover;
		}
		.overlay {
			position: absolute;
			top: 0;
			left: 0;
			color: #fff;
			background: rgba(0, 0, 0, 0.2);
			height: 100%;
			border-radius: 6px;
			width: 100%;
			h5 {
				font-size: 15px;
				margin: 2px 0;
			}
			p {
				font-size: 11px;
				font-weight: 200;
				margin: 0 0 20px;
			}
		}
	}
	@for $i from 1 through 36 {
		.img-grid-card:nth-child(#{$i}) {
			$h: (random(400) + 100) + px;
			height: $h;
		}
	}
}
.img-cover {
	object-fit: contain;
	width: auto;
	height: 600px;
	border-radius: 0.3rem 0.3rem 0 0;
}
.img-body {
	width: auto;
	background-color: #fff;
	border-radius: 0 0 0.3rem 0.3rem;
}
@media screen and (max-width: 767px) {
	.img-cover {
		height: 400px;
	}
}
</style>

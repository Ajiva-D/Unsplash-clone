<template>
	<div id="app">
		<Header @search="searchVal = $event"/>
		<ImageGrid :searchVal='searchVal' />
	</div>
</template>

<script>
import Header from "./components/Header";
import ImageGrid from "./components/ImageGrid";
export default {
	name: "App",
	components: {
		Header,
		ImageGrid,
	},
	data(){
		return{
			searchVal:null
		}
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
.modal-body {
	padding:0!important;
	display:flex;
	flex-direction: column;
	align-items: center;
}
.modal-content{
	background-color: transparent!important;
	border:none!important;
}
</style>

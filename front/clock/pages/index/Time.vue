<template>
	<view class="Time">
		<navbar :navbarTo="'/menu/1'"></navbar>
		<target-menu></target-menu>
		<time-timer></time-timer>
	</view>

</template>

<script setup>
	import {
		reactive,
		toRefs,
		onMounted
	} from "vue";
	import {
		inject
	} from 'vue';
	const url = inject('url');


	name: "Time"
</script>

<style lang="scss">
	.Time {}
</style>
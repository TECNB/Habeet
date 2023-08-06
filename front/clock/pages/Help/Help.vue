<template>
	<navbar :navbarTo="'/menu/7'"></navbar>
	<div class="Help">
		<text class="HelpP">作者</text>
		<div class="help">
			<text>TEC</text>
		</div>
	</div>
	<div class="Help">
		<text class="HelpP">联系方式</text>
		<div class="help">
			<text>V+TEC20040303</text>
		</div>
	</div>

</template>

<script setup>
	import {
		useRoute,
		useRouter
	} from 'vue-router';
	import {
		reactive,
		toRefs,
		onMounted
	} from "vue";
	import {
		inject
	} from 'vue';



	const route = useRoute();
	const router = useRouter();

	const state = reactive({});
	name: "Help"
</script>

<style lang="scss">
	.Help {
		.HelpP {
			margin-top: 40rpx;
			margin-left: 20rpx;
			width: 112rpx;
			height: 88rpx;
			font-size: 28rpx;
			font-weight: 600;
			letter-spacing: 0rpx;
			line-height: 88rpx;
			color: rgba(128, 129, 145, 1);
			text-align: left;
			vertical-align: top;
		}

		.help {
			margin: 0 auto;
			margin-top: 20rpx;
			width: 654rpx;
			height: 96rpx;
			border-radius: 40rpx;
			background: rgba(128, 129, 145, 0.04);
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-left: 30rpx;
			padding-right: 30rpx;

			text {
				width: 442rpx;
				height: 88rpx;
				font-size: 28rpx;
				font-weight: 600;
				letter-spacing: 0rpx;
				line-height: 88rpx;
				color: rgba(27, 32, 42, 1);
				text-align: left;
				vertical-align: top;

			}
		}
	}
</style>
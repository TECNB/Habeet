<template>
	<navbar :navbarTo="'/menu/6'"></navbar>
	<div class="Setting">
		<text class="SettingModeP">更换模式</text>
		<div class="SettingMode">
			<text>黑夜模式</text>
			<image src="@/static/SettingMode.svg" style="width: 96rpx;height: 48rpx;" />
		</div>
		<div class="SettingModeSystem">
			<text>按照系统设置的模式</text>
			<checkbox color="rgb(108, 93, 211)" class="SettingModeSystemCh" />
		</div>
		<text class="SettingModeP">更换语言</text>
		<div class="SettingMode">
			<text>简体中文</text>
			<image src="@/static/SettingMode1.svg" style="width: 40rpx;height: 40rpx;" />
		</div>
		<text class="SettingModeP">消息</text>
		<div class="SettingMode">
			<text>消息提示</text>
			<image src="@/static/SettingMode1.svg" style="width: 40rpx;height: 40rpx;" />
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
	name: "Setting"
</script>

<style lang="scss">
	.Setting {
		.SettingModeP {
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

		.SettingMode {
			margin: 0 auto;
			margin-top: 20rpx;
			width: 654rpx;
			height: 96rpx;
			border-radius: 40rpx;
			background: rgba(128, 129, 145, 0.04);
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-left: 20rpx;
			padding-right: 20rpx;

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

		.SettingModeSystem {
			padding: 16rpx;
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			text {
				height: 32rpx;
				font-size: 28rpx;
				font-weight: 500;
				letter-spacing: 0rpx;
				line-height: 32rpx;
				color: rgba(94, 98, 114, 1);
				text-align: left;
				vertical-align: top;

			}

			.SettingModeSystemCh {
				padding-right: 20rpx;
			}
		}
	}
</style>
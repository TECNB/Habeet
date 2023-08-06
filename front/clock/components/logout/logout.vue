<template>
	<view class="LogOut" @click="toNav">
		<view class="LogOutImage">
			<image src="@\static\LogOut.svg" style="width: 48rpx;height:48rpx;" />
		</view>
		<view class="LogOutWords">
			<p>登出</p>
		</view>
	</view>

</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import {
		inject
	} from 'vue';
	import {
		useUserStore
	} from "../../store/user";
	import {
		useTimeStore
	} from "../../store/time"
	import {
		useTagStore
	} from "../../store/tag"
	const url = inject('url');
	const user = useUserStore()
	const time = useTimeStore()
	const tag = useTagStore()

	const toNav = () => {
		user.data.ifUpdate = ""
		user.data.userInfo = []

		uni.setStorage({
			key: 'userInfo',
			data: user.data.userInfo,
			success: () => {
				console.log('success');
			}
		});

		uni.redirectTo({
			url: '../../pages/Nav/Nav'
		});
	}
</script>

<style lang="scss">
	.LogOut {
		display: flex;
		margin-top: 250rpx;
	}

	.LogOutImage {
		margin-left: 6rpx;
	}

	.LogOutWords {
		font-size: 28rpx;
		font-weight: 600;
		letter-spacing: 0rpx;
		line-height: 48rpx;
		color: rgba(228, 79, 79, 1);
		text-align: left;
		vertical-align: top;
		margin-left: 32rpx;
	}
</style>
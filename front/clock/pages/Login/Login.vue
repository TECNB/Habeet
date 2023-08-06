<template>
	<navigator url="../../pages/Home/Home" open-type="redirect">
		<view class="LoginImage">
			<image src="@\static\LoginImage.svg" style="width: 60rpx;height: 60rpx;" />
		</view>
	</navigator>
	<view class="Login">
		<view class="LoginP">
			<text>登陆</text>
			<text>将使用</text>
			<text @click="toHome">{{user.data.userEmail}}</text>
			<text>登陆</text>
		</view>

		<view class="LoginInput">
			<text>你的密码</text>
			<view class="LoginInputF">
				<view class="LoginInputIn">
					<input v-model="user.data.userPassword" name="txtPassword" :type="state.password"
						placeholder="请输入密码">
					<uni-icons :type="state.eye" size="25" @click="showEye"></uni-icons>
				</view>

			</view>
			<text class="LoginInputFWord1" @click="toSign">忘记密码？</text>
		</view>
		<view class="LoginInputB">
			<button @click="login">
				<navigator url="../index/Time">
					<text>登陆</text>
				</navigator>
			</button>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		toRef,
		onMounted,
		ref,
		computed,
		onBeforeUnmount
	} from "vue";
	import {
		inject
	} from 'vue';
	name: "time-timer"
	import {
		useTagStore
	} from "../../store/tag";
	import {
		useUserStore
	} from "../../store/user";
	import {
		useTimeStore
	} from "../../store/time";
	const url = inject('url');
	const user = useUserStore()
	const tag = useTagStore()
	const time = useTimeStore()

	const state = reactive({
		password: 'password',
		eye: 'eye'
	})
	const toHome = () => {
		uni.redirectTo({
			url: '../../pages/Home/Home'
		});
	}
	const toSign = () => {
		uni.redirectTo({
			url: '../../pages/Sign/Sign'
		});
		user.data.userPassword = ''
		user.data.ifUpdate = 1
	}

	const showEye = () => {
		if (state.password == "text") {
			state.password = 'password'
		} else if (state.password == "password") {
			state.password = 'text'
		}

		if (state.eye == "eye") {
			state.eye = 'eye-slash'
		} else if (state.eye == "eye-slash") {
			state.eye = 'eye'
		}

	}
	const login = () => {
		uni.request({
			url: url + '/user/login',
			method: "POST",
			data: {
				userEmail: user.data.userEmail,
				userPassword: user.data.userPassword,
			},
			success: (res) => {
				console.log(res)
				user.data.userPassword = ""
				if (res.data.code != null) {
					user.data.point = res.data.data.point
					user.data.completeTarget = res.data.data.completeTarget
					user.data.userName = res.data.data.userName
					user.data.picUrl = res.data.data.picUrl
					uni.redirectTo({
						url: '../../pages/index/Time'
					});
				} else {
					uni.showToast({
						icon: "none",
						title: '密码错误'
					});
				}
			}
		})


	}
	time.data.remainingTime = (tag.data.tagHour * 3600) + (tag.data.tagMinute * 60) + tag.data.tagSecond

	onMounted(() => {

	})



	console.log(user.data.userEmail)
</script>

<style lang="scss">
	.LoginInputFWord1 {
		height: 88rpx;
		font-size: 28rpx;
		font-weight: 500;
		line-height: 88rpx;
		color: rgba(160, 215, 231, 1);
		margin-top: 20rpx;
		margin-left: 550rpx;
	}

	.LoginInputFWord1:hover {
		height: 88rpx;
		font-size: 28rpx;
		font-weight: 500;
		line-height: 88rpx;
		color: rgba(255, 162, 192, 1);
		margin-top: 20rpx;
		margin-left: 550rpx;
	}

	.LoginInputF {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.LoginImage {
		margin: 20rpx;
	}

	.Login {
		margin: 20rpx;

		.LoginP {
			text:nth-child(1) {
				display: block;
				width: 884rpx;
				height: 88rpx;
				font-size: 60rpx;
				font-weight: 600;
				letter-spacing: 0rpx;
				line-height: 88rpx;
				color: rgba(27, 32, 42, 1);
				text-align: left;
				vertical-align: top;
			}

			text:nth-child(2) {
				height: 88rpx;
				font-size: 28rpx;
				font-weight: 500;
				letter-spacing: 0rpx;
				line-height: 88rpx;
				color: rgba(128, 129, 145, 1);
				text-align: left;
				vertical-align: top;
				margin-top: 20rpx;
			}

			text:nth-child(3) {
				height: 88rpx;
				font-size: 28rpx;
				font-weight: 500;
				letter-spacing: 0rpx;
				line-height: 88rpx;
				color: rgba(160, 215, 231, 1);
				text-align: left;
				vertical-align: top;
				margin-top: 20rpx;
				margin-left: 10rpx;
				margin-right: 10rpx;
			}

			text:nth-child(3):hover {
				height: 88rpx;
				font-size: 28rpx;
				font-weight: 500;
				letter-spacing: 0rpx;
				line-height: 88rpx;
				color: rgba(255, 162, 192, 1);
				text-align: left;
				vertical-align: top;
				margin-top: 20rpx;
			}

			text:nth-child(4) {
				height: 88rpx;
				font-size: 28rpx;
				font-weight: 500;
				letter-spacing: 0rpx;
				line-height: 88rpx;
				color: rgba(128, 129, 145, 1);
				text-align: left;
				vertical-align: top;
				margin-top: 20rpx;
			}
		}

		.LoginInput {

			text:nth-child(1) {
				width: 206rpx;
				height: 88rpx;
				font-size: 28rpx;
				font-weight: 600;
				letter-spacing: 0rpx;
				line-height: 88rpx;
				color: rgba(128, 129, 145, 1);
				text-align: left;
				vertical-align: top;
				margin-top: 60rpx;
			}

			.LoginInputIn {
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-style: none;
				width: 750rpx;
				height: 112rpx;
				background: rgba(128, 129, 145, 0.04);
				outline: none;
				border-radius: 40rpx;
				margin-top: 30rpx;
				padding-left: 40rpx;
				padding-right: 40rpx;
			}
		}

		.LoginInputB {
			margin-top: 20rpx;

			button {
				height: 96rpx;
				border-radius: 40rpx;
				background: rgba(108, 93, 211, 1);
				display: flex;
				align-items: center;
				justify-content: center;
				border: none;
				outline: none;
			}

			text {
				width: 200rpx;
				height: 88rpx;
				font-size: 32rpx;
				font-weight: 700;
				letter-spacing: 0rpx;
				line-height: 88rpx;
				color: rgba(255, 255, 255, 1);
				text-align: center;
				vertical-align: top;

			}
		}
	}
</style>
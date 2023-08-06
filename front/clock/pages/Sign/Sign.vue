<template>
	<navigator url="../../pages/Home/Home" open-type="redirect">
		<view class="SignImage" @click="SignImageR">
			<image src="@\static\LoginImage.svg" style="width: 60rpx;height: 60rpx;" />
		</view>
	</navigator>
	<view class="Sign">
		<view class="SignP">
			<text>注册</text>
			<text v-if="!user.data.ifUpdate">将使用</text>
			<text v-if="!user.data.ifUpdate" @click="toHome">{{user.data.userEmail}}</text>
			<text v-if="!user.data.ifUpdate">注册</text>
			<text v-if="user.data.ifUpdate">将为</text>
			<text v-if="user.data.ifUpdate" @click="toHome">{{user.data.userEmail}}</text>
			<text v-if="user.data.ifUpdate">找回密码</text>
		</view>

		<view class="SignInput" v-if="!user.data.ifUpdate">
			<text>名称</text>
			<view class="SignInputIn">
				<input v-model="user.data.userName" maxlength="8" name="txtUName" type="text" id="txtUName"
					placeholder="请输入名称" @input="clearInput1">
				<image src="@\static\targetCreatNameC.svg" style="width: 48rpx;height: 48rpx;"
					v-if="state.showClearIcon1" @click="clearIcon1" />
			</view>

		</view>
		<view class="SignInput2">
			<text>密码</text>
			<view class="SignInputIn">
				<input v-model="user.data.userPassword" maxlength="16" name="txtPassword" :type="state.password"
					id="txtPassword" placeholder="请输入密码">
				<uni-icons :type="state.eye" size="25" @click="showEye"></uni-icons>
			</view>

		</view>
		<view class="SignInput2">
			<text>确认密码</text>
			<view class="SignInputIn">
				<input v-model="state.userConfirm" maxlength="16" name="txtPassword" :type="state.password"
					id="txtPassword" placeholder="请再次输入密码">
				<uni-icons :type="state.eye" size="25" @click="showEye"></uni-icons>
			</view>

		</view>
		<text class="SignInput3P">验证码</text>
		<view class="SignInput3">

			<view class="SignInputIn">
				<input v-model="user.data.userCode" maxlength="6" name="txtPassword" type="text" id="txtPassword"
					placeholder="请输入验证码" @input="clearInput2">
				<image src="@\static\targetCreatNameC.svg" style="width: 48rpx;height: 48rpx;"
					v-if="state.showClearIcon2" @click="clearIcon2" />
			</view>
			<view class="HomeB">
				<button @click="code" :disabled="state.countdown > 0">
					<image src="@\static\HomeI.svg" style="width: 60rpx;height: 60rpx;" />
					<text v-if="state.countdown === 0">发送验证码</text>
					<text v-else>{{ state.countdown }} 秒后重试</text>
				</button>
			</view>
		</view>
		<view class="SignInputB" v-if="!user.data.ifUpdate">
			<button @click="sign">
				<text>注册</text>
			</button>
		</view>
		<view class="SignInputB" v-if="user.data.ifUpdate">
			<button @click="sign">
				<text>确定</text>
			</button>
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
	const state = reactive({
		userConfirm: "",
		flag: false,
		countdown: 0,
		showClearIcon1: false,
		showClearIcon2: false,
		password: 'password',
		eye: 'eye'
	});
	const user = useUserStore()
	const time = useTimeStore()
	const tag = useTagStore()
	const toHome = () => {
		uni.redirectTo({
			url: '../../pages/Home/Home'
		});
	}

	const clearInput1 = (event) => {
		state.inputClearValue1 = event.detail.value;
		if (event.detail.value.length > 0) {
			state.showClearIcon1 = true;
		} else {
			state.showClearIcon1 = false;
		}
	}
	const clearIcon1 = () => {
		user.data.userName = null;
		state.showClearIcon1 = false;
	}
	const clearInput2 = (event) => {
		state.inputClearValue2 = event.detail.value;
		if (event.detail.value.length > 0) {
			state.showClearIcon2 = true;
		} else {
			state.showClearIcon2 = false;
		}
	}
	const clearIcon2 = () => {
		user.data.userCode = null;
		state.showClearIcon2 = false;
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

	const sign = () => {
		if (state.userConfirm != user.data.userPassword) {
			uni.showToast({
				icon: "none",
				title: '密码输入不一致'
			});
		} else if (user.data.userCode == "") {
			uni.showToast({
				icon: "none",
				title: '请输入验证码'
			});
		} else {
			uni.request({
				url: url + '/user/sign',
				method: "POST",
				data: {
					userEmail: user.data.userEmail,
					userName: user.data.userName,
					userPassword: user.data.userPassword,
					userCode: user.data.userCode,
					ifUpdate: user.data.ifUpdate
				},
				success: (res) => {
					console.log(res)
					if (res.data.code != null) {
						if (user.data.ifUpdate == 0) {
							uni.redirectTo({
								url: '../../pages/index/Time'
							});
						} else {
							uni.redirectTo({
								url: '../../pages/Home/Home'
							});
						}

					} else {
						uni.showToast({
							icon: "none",
							title: '验证码错误'
						});
					}
					user.data.ifUpdate = 0
				}
			})
			tag.data.tagHour = 1
			tag.data.tagMinute = 30
			time.data.remainingTime = (tag.data.tagHour * 3600) + (tag.data.tagMinute * 60) + tag.data.tagSecond
		}
	}


	const countdown = ref(0);
	const code = () => {
		if (state.countdown === 0) {
			state.flag = true;
			state.countdown = 60;

			const timer = setInterval(() => {
				state.countdown--;
				if (state.countdown == 0) {
					clearInterval(timer);
				}
			}, 1000);
			uni.request({
				url: url + '/user/code',
				method: "POST",
				data: {
					userEmail: user.data.userEmail,
					ifUpdate: user.data.ifUpdate
				},
				success: (res) => {
					console.log(res)
				}
			})
		}
	}
</script>

<style lang="scss">
	.SignImage {
		margin: 20rpx;
	}

	.Sign {
		margin: 20rpx;

		.SignP {
			text:nth-child(1) {
				width: 884rpx;
				height: 88rpx;
				font-size: 60rpx;
				font-weight: 600;
				letter-spacing: 0rpx;
				line-height: 88rpx;
				color: rgba(27, 32, 42, 1);
				text-align: left;
				vertical-align: top;
				display: block;
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

		.SignInput {

			text {
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

			.SignInputIn {
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-style: none;
				width: 654rpx;
				height: 112rpx;
				background: rgba(128, 129, 145, 0.04);
				outline: none;
				border-radius: 40rpx;
				padding-left: 40rpx;
				padding-right: 40rpx;
				margin-top: 30rpx;
			}
		}

		.SignInput2 {

			text {
				width: 206rpx;
				height: 88rpx;
				font-size: 28rpx;
				font-weight: 600;
				letter-spacing: 0rpx;
				line-height: 88rpx;
				color: rgba(128, 129, 145, 1);
				text-align: left;
				vertical-align: top;
				margin-top: 20rpx;
			}

			.SignInputIn {
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-style: none;
				width: 654rpx;
				height: 112rpx;
				background: rgba(128, 129, 145, 0.04);
				outline: none;
				border-radius: 40rpx;
				padding-left: 40rpx;
				margin-top: 30rpx;
			}
		}

		.SignInput3P {
			width: 206rpx;
			height: 88rpx;
			font-size: 28rpx;
			font-weight: 600;
			letter-spacing: 0rpx;
			line-height: 88rpx;
			color: rgba(128, 129, 145, 1);
			text-align: left;
			vertical-align: top;
			margin-top: 30rpx;
		}

		.SignInput3 {
			display: flex;
			align-items: center;
			justify-content: space-between;



			.SignInputIn {
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-style: none;
				width: 360rpx;
				height: 112rpx;
				background: rgba(128, 129, 145, 0.04);
				outline: none;
				border-radius: 40rpx;
				padding-left: 40rpx;
				padding-right: 40rpx;
				margin-top: 30rpx;
			}

			.HomeB {
				display: inline-block;

				margin-top: 20rpx;

				button {
					width: 280rpx;
					height: 80rpx;
					border-radius: 40rpx;
					background: rgba(108, 93, 211, 1);
					display: flex;
					align-items: center;
					justify-content: center;
					border: none;
					outline: none;

					text {
						width: 200rpx;
						height: 88rpx;
						font-size: 28rpx;
						font-weight: 700;
						letter-spacing: 0rpx;
						line-height: 88rpx;
						color: rgba(255, 255, 255, 1);
						text-align: center;
						vertical-align: top;

					}
				}
			}
		}

		.SignInputB {
			margin-top: 60rpx;

			button {
				width: 100%;
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
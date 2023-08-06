<template>
	<view class="SignImage" @click="toHome">
		<image src="@\static\LoginImage.svg" style="width: 60rpx;height: 60rpx;" />
	</view>
	<view class="Sign">
		<view class="SignP">
			<text v-if="user.data.ifUpdate==2">填写个人信息</text>
			<text v-if="user.data.ifUpdate==2">将使用</text>
			<text v-if="user.data.ifUpdate==2" @click="toHome">微信</text>
			<text v-if="user.data.ifUpdate==2">注册</text>

			<text v-if="user.data.ifUpdate==3">个人信息更改</text>
			<text v-if="user.data.ifUpdate==3">将更改</text>
			<text v-if="user.data.ifUpdate==3" @click="toIndex">{{user.data.userName}}</text>
			<text v-if="user.data.ifUpdate==3">的信息</text>
		</view>

		<view class="SignI">
			<text>头像</text>
			<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
				<image :src="state.avatarUrl" style="width: 100rpx;height: 100rpx;" />
			</button>
		</view>

		<view class="SignInput">
			<text>名称</text>
			<view class="SignInputIn">
				<input v-model="user.data.userName" maxlength="8" name="txtUName" id="txtUName" placeholder="请输入名称"
					@input="clearInput1" type="nickname" @blur="onNickName">
				<image src="@\static\targetCreatNameC.svg" style="width: 48rpx;height: 48rpx;"
					v-if="state.showClearIcon1" @click="clearIcon1" />
			</view>
		</view>
		<view class="SignInputB">
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
	const user = useUserStore()
	const time = useTimeStore()
	const tag = useTagStore()

	if (user.data.ifUpdate != 3) {
		user.data.picUrl =
			"https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0"
	}
	const state = reactive({
		userConfirm: "",
		flag: false,
		countdown: 0,
		showClearIcon1: false,
		showClearIcon2: false,
		password: 'password',
		eye: 'eye',
		avatarUrl: user.data.picUrl
	});


	const onNickName = (e) => {
		state.inputClearValue1 = e.detail.value;
		user.data.userName = state.inputClearValue1
	}
	const onChooseAvatar = (e) => {

		state.avatarUrl = e.detail.avatarUrl;
		console.log(state.avatarUrl)

		uni.uploadFile({
			url: url + '/user/uploadFile', //后台接口
			filePath: state.avatarUrl, // 上传图片 url
			name: 'file',
			// formData: this.formData,
			header: {
				'content-type': 'multipart/form-data'
			}, // header 值
			success: (res) => {
				console.log("成功上传文件")
				const responseData = JSON.parse(res.data); // 解析JSON字符串为对象
				user.data.picData = responseData.data.picData

				state.avatarUrl = `data:image/jpeg;base64,${user.data.picData}`
				user.data.picUrl = state.avatarUrl


			},
			fail: (res) => {
				console.log("文件上传失败")
			}
		});
	}

	const toHome = () => {
		console.log(user.data.ifUpdate)
		if (user.data.ifUpdate == 2) {
			uni.redirectTo({
				url: '../../pages/Nav/Nav'
			});
		} else if (user.data.ifUpdate == 3) {
			uni.redirectTo({
				url: '../../pages/index/Time'
			});
		}

	}
	const toIndex = () => {
		uni.redirectTo({
			url: '../../pages/index/Time'
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
		user.data.userPassword = ""
		user.data.userCode = ""
		uni.showLoading({
			title: '保存中...'
		});
		if (user.data.userName == "") {
			uni.showToast({
				icon: "none",
				title: '请输入名字'
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
					ifUpdate: user.data.ifUpdate,
					picUrl: user.data.picUrl
				},
				success: (res) => {
					console.log(user.data.userInfo)
					user.data.userInfo[1].userdatapicUrl = user.data.picUrl
					user.data.userInfo[1].userdatauserName = user.data.userName


					uni.hideLoading();
					if (res.data.code != null) {
						if (user.data.picUrl ==
							"https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0"
						) {
							user.data.picUrl = "/static/Avatar.png"
						}
						uni.setStorage({
							key: 'userInfo',
							data: user.data.userInfo,
							success: () => {
								console.log('success');
							}
						});
						uni.redirectTo({
							url: '../../pages/index/Time'
						});
					}
				}
			})




			if (user.data.ifUpdate == 2) {
				tag.data.tagHour = 1
				tag.data.tagMinute = 30
				time.data.remainingTime = (tag.data.tagHour * 3600) + (tag.data.tagMinute * 60) + tag.data.tagSecond
			}

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
	.SignI {
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

		.avatar-wrapper {
			width: 100rpx;
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0;
		}
	}



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
<template>
	<view class="LoginImage" @click="Nav">
		<image src="@\static\LoginImage.svg" style="width: 60rpx;height: 60rpx;" />
	</view>
	<view class="Login">
		<view class="LoginP">
			<text>欢迎回来</text>
		</view>

		<view class="LoginInput">
			<text>你的QQ邮箱</text>
			<view class="LoginInputF">
				<view class="LoginInputIn">
					<input v-model="user.data.userEmail" name="txtEmail" type="text" id="txtPassword"
						placeholder="请输入邮箱" @input="clearInput1">
					<image src="@\static\targetCreatNameC.svg" style="width: 48rpx;height: 48rpx;"
						v-if="state.showClearIcon1" @click="clearIcon1" />
				</view>


			</view>

		</view>
		<view class="LoginInputB">
			<button @click="home">
				<text>继续</text>
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
	name: "time-timer"
	import {
		useTargetStore
	} from "../../store/target";
	import {
		useTagStore
	} from "../../store/tag";
	import {
		useUserStore
	} from "../../store/user";
	import {
		useTimeStore
	} from "../../store/time";
	import {
		inject
	} from 'vue';
	const url = inject('url');

	const target = useTargetStore()
	const user = useUserStore()
	const tag = useTagStore()
	const time = useTimeStore()

	const state = reactive({
		showClearIcon1: false,
		showtargetMenuDetail: false,
		showtargetArrowUp: true,
		showtargetArrowDown: false,
		targetWithTime: [],
		targetNoTime: [],
		dayList: []
	})


	const Nav = () => {
		uni.redirectTo({
			url: '../../pages/Nav/Nav'
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
		user.data.userEmail = null;
		state.showClearIcon1 = false;
	}
	const home = () => {
		if (!isValidQQEmail(user.data.userEmail)) {
			// 邮箱格式不正确
			// 做相应的处理，例如提示用户输入正确的QQ邮箱格式
			uni.showToast({
				icon: "none",
				title: 'QQ邮箱格式错误'
			});
			return;
		}
		uni.request({
			url: url + '/user/home',
			method: "POST",
			data: user.data.userEmail,
			success: (res) => {
				if (res.data.code != null) {
					uni.redirectTo({
						url: '../../pages/Login/Login'
					});
					// 提前获得用户tag的值，使得在用户进入时能够直接得到数据
					uni.request({
						url: url + '/tag/get',
						method: "POST",
						data: user.data.userEmail,
						success: (res) => {
							console.log(res)
							tag.data.tagName = res.data.data[0].tagName
							tag.data.tagDescribe = res.data.data[0].tagDescribe
							tag.data.tagPoint = res.data.data[0].tagPoint
							tag.data.tagHour = res.data.data[0].tagHour
							tag.data.tagMinute = res.data.data[0].tagMinute
						}
					})
					// 提前获得用户target的值，使得在用户进入时能够直接得到数据
					uni.request({
						url: url + '/target/get',
						method: "POST",
						data: {
							userEmail: user.data.userEmail,
							ifTargetUpdate: 1
						},
						success: (res) => {
							target.data.deadlineDate = []
							for (let i = 0; i < res.data.data.length; i++) {
								if (res.data.data[i].status == 0) {
									state.targetNoTime.push({
										'targetName': res.data.data[i].targetName,
										'targetDescribe': res.data.data[i]
											.targetDescribe,
										'targetPoint': res.data.data[i].targetPoint,
										'deadline': res.data.data[i].deadline,
										'targetId': res.data.data[i].targetId
									})
								} else if (res.data.data[i].status == 1) {

									//这里使用检查不重复的方式，来防止重复存入数据，但是实际上用户可以存入重复数据，
									//所以应该用缓存的方式来解决，时间不够，先这样写
									//最后采用每次刷新清空数组的方式解决了问题
									let deadline = new Date(res.data.data[i].deadline)
									if (!target.data.deadlineDate.includes(deadline)) {
										target.data.deadlineDate.push(deadline);
									}
									state.targetWithTime.push({
										'targetName': res.data.data[i].targetName,
										'targetDescribe': res.data.data[i]
											.targetDescribe,
										'targetPoint': res.data.data[i].targetPoint,
										'deadline': res.data.data[i].deadline,
										'targetId': res.data.data[i].targetId
									})
								}
							}
						}
					})

				} else {
					uni.redirectTo({
						url: '../../pages/Sign/Sign'
					});
					user.data.ifUpdate = 0
				}
			}
		})
		// 提前获得用户target的值，使得在用户进入时能够直接得到数据
		onMounted(() => {
			//target-day里的重复方法
			//也许可以试着封装一下？
			const selectedDate = new Date(time.getFullYear(), state.dayList[0].month, 1);
			time = new Date(selectedDate); // 创建新的日期对象

			time.setDate(state.dayList[0].day)
			time.setMonth(state.dayList[0].month)
			target.data.currentTime = time.toString()

			target.data.dayDiff = []
			target.data.ifshowDay = []
			target.data.deadlineDate.forEach((item) => {
				let currentTime = new Date(target.data.currentTime)
				let timeDiff = item.getTime() - currentTime.getTime()
				let dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24))

				if (dayDiff > 0) {
					target.data.ifshowDay.push(true)
				} else if (dayDiff < 0) {
					const month = item.getMonth() + 1; // 当前月份
					const date = item.getDate(); // 当前日期
					dayDiff = `${month}.${date}`;
					target.data.ifshowDay.push(false);
				} else {
					const hours = item.getHours();
					const minutes = item.getMinutes();

					const timeString = `${hours}:${minutes.toString().padStart(2, '0')}`;
					dayDiff = timeString;
					target.data.ifshowDay.push(false);
				}
				target.data.dayDiff.push(dayDiff)
			});
		})
		time.data.remainingTime = (tag.data.tagHour * 3600) + (tag.data.tagMinute * 60) + tag.data.tagSecond
	}
	const isValidQQEmail = (email) => {
		const qqEmailRegex = /^[1-9]\d{4,10}@qq\.com$/;
		return qqEmailRegex.test(email);
	}
</script>

<style lang="scss">
	.LoginInputF {
		display: flex;
		justify-content: center;
		align-items: center;
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
		}

		.LoginInput {

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
			margin-top: 60rpx;

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
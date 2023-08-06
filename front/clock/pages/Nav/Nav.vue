<template>
	<view class="Nav">
		<swiper class="swiper" autoplay="true" easing-function="easeInOutCubic" @change="changeswiper"
			:current="state.currentswiper" indicator-dots="true" indicator-color="rgba(207, 200, 255, 1)"
			indicator-active-color="rgba(108, 93, 211, 1)">
			<swiper-item class="swiperItem">
				<view class="NavDetail">
					<view class="NavImage">
						<image style="width: 750rpx;height: 750rpx;" src="@\static\NavImage3.png" />
					</view>
					<view class="NavWord1">
						<text style="display: block;">兑换</text>
						<text>商店积分</text>
					</view>
				</view>
			</swiper-item>
			<swiper-item class="swiperItem">
				<view class="NavDetail">
					<view class="NavImage">
						<image style="width: 680rpx;height: 680rpx;margin-top: 70rpx;" src="@\static\NavImage2.png" />
					</view>
					<view class="NavWord1">
						<text style="display: block;">发现</text>
						<text>自我进步</text>
					</view>
				</view>
			</swiper-item>
			<swiper-item class="swiperItem">
				<view class="NavDetail">
					<view class="NavImage">
						<image style="width: 404rpx;height: 500rpx;margin-top: 150rpx;margin-bottom: 100rpx;"
							src="@\static\NavImage1.png" />
					</view>

					<view class="NavWord1">
						<text style="display: block;">建立</text>
						<text>计时标签</text>
					</view>
				</view>
			</swiper-item>
			<swiper-item class="swiperItem">
				<view class="NavDetail">
					<view class="NavImage">
						<image style="width: 750rpx;height: 750rpx;" src="@\static\NavImage4.png" />
					</view>
					<view class="NavWord1">
						<text style="display: block;">跟踪</text>
						<text>你的目标</text>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="NavWord2">
			<text>通过Habeet你可以通过自定义标签，来规定学习时间，并完成自己设立的目标，并获得分数来兑换商店的物品</text>
		</view>
		<view class="LoginInputB">
			<button @click="home">
				<image src="@\static\HomeI.svg" style="width: 50rpx;height: 50rpx;" />
				<text>邮箱登陆</text>
			</button>
		</view>
		<view class="NavWord3">
			<text>或者使用下面的方式登陆</text>
		</view>
		<view class="NavIcon">
			<view class="NavIcon1" @click="QQLogin">
				<image src="@\static\NavIcon1.png" style="width: 40rpx;height: 40rpx;"></image>
			</view>
			<view class="NavIcon2" @click="WxLogin">
				<image src="@\static\NavIcon2.png" style="width: 52.8rpx;height: 55.74rpx;"></image>
			</view>
		</view>
		<view class="NavWord4">
			<text style="display: block;margin-bottom: 5rpx;margin-top: 10rpx;">登陆后意味着同意小程序Habeet的</text>
			<text @click="UserAgreement"
				style="font-size: 24rpx;font-weight: 700;line-height: 32rpx;color: rgba(255, 162, 192, 1);">
				用户协议
			</text>
			<text>和</text>
			<text @click="PrivacyPolicy"
				style="font-size: 24rpx;font-weight: 700;line-height: 32rpx;color: rgba(255, 162, 192, 1);">
				隐私政策
			</text>
		</view>
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
	import {
		useUserStore
	} from "../../store/user";
	import {
		useTimeStore
	} from "../../store/time"
	import {
		useTagStore
	} from "../../store/tag"
	import {
		useTargetStore
	} from "../../store/target"
	const url = inject('url')
	const user = useUserStore()
	const time = useTimeStore()
	const tag = useTagStore()
	const target = useTargetStore()

	const state = reactive({
		currentswiper: 0,
		targetNoTime: [],
		targetWithTime: [],
		targetCompleted: [],
		targetExpire: [],
		ifshowButton: true,
		ifshowTargetTaskNull0: false,
		ifshowTargetTaskNull1: false,
		ifshowTargetTaskPAT: false,
		ifshowTargetTaskPATDelete: true,
		index: 0
	});

	const WxLogin = () => {
		uni.showLoading({
			title: '微信登录中...'
		});
		uni.login({
			provider: 'weixin', //使用微信登录
			success: (loginRes) => {
				user.data.code = loginRes.code
				uni.request({
					url: url + '/user/wxLogin',
					method: "POST",
					data: user.data.code,
					success: (res) => {
						user.data.userEmail = res.data.data.openId
						user.data.userPassword = "Wx"

						user.data.userInfo.push({
							'ifLogin': true
						})

						uni.request({
							url: url + '/user/home',
							method: "POST",
							data: user.data.userEmail,
							success: (res) => {
								if (res.data.code != null) {
									uni.request({
										url: url + '/user/login',
										method: "POST",
										data: {
											userEmail: user.data.userEmail,
											userPassword: user.data
												.userPassword,
										},
										success: (res) => {

											user.data.userPassword = ""
											if (res.data.code !=
												null) {
												user.data.point = res
													.data.data.point
												user.data
													.completeTarget =
													res.data.data
													.completeTarget
												user.data.userName =
													res.data.data
													.userName
												user.data.picUrl = res
													.data.data.picUrl

												user.data.userInfo
													.push({
														'userdatauserEmail': user
															.data
															.userEmail,
														'userdatapoint': user
															.data
															.point,
														'userdatacompleteTarget': user
															.data
															.completeTarget,
														'userdatauserName': user
															.data
															.userName,
														'userdatapicUrl': user
															.data
															.picUrl,
													})
											}
										}
									})

									// 提前获得用户tag的值，使得在用户进入时能够直接得到数据
									uni.request({
										url: url + '/tag/get',
										method: "POST",
										data: user.data.userEmail,
										success: (res) => {
											console.log(res)
											tag.data.tagName = res.data
												.data[0].tagName
											tag.data.tagDescribe = res
												.data.data[0]
												.tagDescribe
											tag.data.tagPoint = res
												.data.data[0].tagPoint
											tag.data.tagHour = res.data
												.data[0].tagHour
											tag.data.tagMinute = res
												.data.data[0].tagMinute

											user.data.userInfo.push({
												'tagdatatagName': tag
													.data
													.tagName,
												'tagdatatagDescribe': tag
													.data
													.tagDescribe,
												'tagdatatagPoint': tag
													.data
													.tagPoint,
												'tagdatatagHour': tag
													.data
													.tagHour,
												'tagdatatagMinute': tag
													.data
													.tagMinute,
											})

											time.data.remainingTime = (
													tag.data.tagHour *
													3600) + (tag.data
													.tagMinute * 60) +
												tag.data.tagSecond
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
											target.data
												.deadlineDate = []
											for (let i = 0; i < res
												.data.data.length; i++
											) {
												if (res.data.data[i]
													.status == 0) {
													state.targetNoTime
														.push({
															'targetName': res
																.data
																.data[
																	i
																]
																.targetName,
															'targetDescribe': res
																.data
																.data[
																	i
																]
																.targetDescribe,
															'targetPoint': res
																.data
																.data[
																	i
																]
																.targetPoint,
															'deadline': res
																.data
																.data[
																	i
																]
																.deadline,
															'targetId': res
																.data
																.data[
																	i
																]
																.targetId
														})
												} else if (res.data
													.data[i].status ==
													1) {

													//这里使用检查不重复的方式，来防止重复存入数据，但是实际上用户可以存入重复数据，
													//所以应该用缓存的方式来解决，时间不够，先这样写
													//最后采用每次刷新清空数组的方式解决了问题
													let deadline =
														new Date(res
															.data.data[
																i]
															.deadline)
													if (!target.data
														.deadlineDate
														.includes(
															deadline)
													) {
														target.data
															.deadlineDate
															.push(
																deadline
															);
													}
													state
														.targetWithTime
														.push({
															'targetName': res
																.data
																.data[
																	i
																]
																.targetName,
															'targetDescribe': res
																.data
																.data[
																	i
																]
																.targetDescribe,
															'targetPoint': res
																.data
																.data[
																	i
																]
																.targetPoint,
															'deadline': res
																.data
																.data[
																	i
																]
																.deadline,
															'targetId': res
																.data
																.data[
																	i
																]
																.targetId
														})
												}
											}
											user.data.userInfo.push({
												'statetargetNoTime': state
													.targetNoTime,
												'statetargetWithTime': state
													.targetWithTime,
												'targetdatadeadlineDate': target
													.data
													.deadlineDate,
											})
											uni.setStorage({
												key: 'userInfo',
												data: user.data
													.userInfo
											});

											uni.hideLoading();
											uni.redirectTo({
												url: '../../pages/index/Time'
											});
										}
									})


								} else {
									uni.redirectTo({
										url: '../../pages/Wx/Wx'
									});
									user.data.ifUpdate = 2
								}

							}
						})
					}
				})
			}
		});

	}
	const QQLogin = () => {
		//弹出来的提示信息
		uni.showToast({
			icon: "none",
			title: '功能开发中'
		});
	}

	const currentswiper = () => {
		state.currentswiper = this.detail.currentswiper
	}
	const home = () => {
		uni.redirectTo({
			url: '../../pages/Home/Home'
		});
	}
	const UserAgreement = () => {
		uni.redirectTo({
			url: '../../pages/UserAgreement/UserAgreement'
		});
	}

	const PrivacyPolicy = () => {
		uni.redirectTo({
			url: '../../pages/PrivacyPolicy/PrivacyPolicy'
		});
	}
	onMounted(() => {
		user.data.userEmail = ""
		uni.getStorage({
			key: "userInfo",
			success: (res) => {
				user.data.userInfo = res.data
				if (user.data.userInfo[0].ifLogin == true) {


					user.data.completeTarget = res.data[1].userdatacompleteTarget
					user.data.picUrl = res.data[1].userdatapicUrl
					user.data.point = res.data[1].userdatapoint
					user.data.userEmail = res.data[1].userdatauserEmail
					user.data.userName = res.data[1].userdatauserName

					tag.data.tagDescribe = res.data[2].tagdatatagDescribe
					tag.data.tagHour = res.data[2].tagdatatagHour
					tag.data.tagMinute = res.data[2].tagdatatagMinute
					tag.data.tagName = res.data[2].tagdatatagName
					tag.data.tagPoint = res.data[2].tagdatatagPoint

					state.targetNoTime = res.data[3].statetargetNoTime
					state.targetWithTime = res.data[3].statetargetWithTime
					target.data.deadlineDate = res.data[3].targetdatadeadlineDate

					uni.redirectTo({
						url: '../../pages/index/Time'
					});
				}

			}
		});
	})
</script>

<style lang="scss">
	.LoginInputB {
		margin-top: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;

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
			margin-left: 20rpx;
			margin-right: 20rpx;
			font-size: 32rpx;
			font-weight: 700;
			letter-spacing: 0rpx;
			line-height: 88rpx;
			color: rgba(255, 255, 255, 1);
			text-align: center;
			vertical-align: top;

		}
	}

	.NavWord1 {
		font-size: 44rpx;
		font-weight: 600;
		line-height: 60rpx;
		color: rgba(27, 32, 42, 1);
		margin: 20rpx;
	}

	.NavWord2 {
		font-size: 28rpx;
		font-weight: 500;
		line-height: 48rpx;
		color: rgba(128, 129, 145, 1);
		margin-left: 30rpx;
		margin-right: 30rpx;
	}

	.NavWord3 {
		font-size: 24rpx;
		font-weight: 400;
		line-height: 29.04rpx;
		color: rgba(94, 98, 114, 1);
		margin-top: 20rpx;
		text-align: center;
	}

	.NavWord4 {
		font-size: 24rpx;
		font-weight: 500;
		line-height: 32rpx;
		color: rgba(128, 129, 145, 1);
		text-align: center;
		margin-top: 30rpx;
	}

	.NavIcon {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20rpx;

		.NavIcon1 {
			width: 76rpx;
			height: 76rpx;
			background: rgba(207, 200, 255, 1);
			border-radius: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 120rpx;
		}

		.NavIcon1:hover {
			background: rgba(108, 93, 211, 1);
		}

		.NavIcon2 {
			width: 76rpx;
			height: 76rpx;
			background: rgba(207, 200, 255, 1);
			border-radius: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.NavIcon2:hover {
			background: rgba(108, 93, 211, 1);
		}
	}

	.swiper {
		width: 750rpx;
		height: 930rpx;
	}

	.swiperItem {
		width: 750rpx;
		height: 750rpx;
	}

	.NavImage {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
<template>
	<view class="Logo">
		<view class="LogoB1">
			<image src="@/static/LogoB1.png" style="width: 748rpx;height: 568rpx;"></image>
		</view>
		<view class="LogoL">
			<view class="LogoLI">
				<image src="@/static/Logo.png" style="width: 256rpx;height: 256rpx;"></image>
			</view>

			<text>Habeet</text>
		</view>
		<view class="LogoB2">
			<view class="LogoB1">
				<image src="@/static/LogoB2.png" style="width: 748rpx;height: 568rpx;"></image>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		onMounted
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

	onMounted(() => {
		user.data.userEmail = ""
		uni.getStorage({
			key: "userInfo",
			success: (res) => {
				console.log(res.data)

				user.data.userInfo = res.data

				console.log(user.data.userInfo)
				user.data.userEmail = res.data[1].userdatauserEmail

				getUserInfo(user.data.userInfo)
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						user.data.completeTarget = res.data[1].userdatacompleteTarget
						user.data.picUrl = res.data[1].userdatapicUrl
						user.data.point = res.data[1].userdatapoint

						user.data.userName = res.data[1].userdatauserName

						tag.data.tagDescribe = res.data[2].tagdatatagDescribe
						tag.data.tagHour = res.data[2].tagdatatagHour
						tag.data.tagMinute = res.data[2].tagdatatagMinute
						tag.data.tagName = res.data[2].tagdatatagName
						tag.data.tagPoint = res.data[2].tagdatatagPoint

						target.data.deadlineDate = res.data[3].targetdatadeadlineDate

						setTimeout(() => {
							uni.redirectTo({
								url: '../../pages/index/Time'
							});
						}, 500);


					}
				});


			},
			fail: (res) => {
				setTimeout(() => {
					uni.redirectTo({
						url: '../../pages/Nav/Nav'
					});
				}, 500);

			}
		});
	})

	const getUserInfo = (e) => {
		user.data.userPassword = "Wx"
		uni.request({
			url: url + '/user/login',
			method: "POST",
			data: {
				userEmail: user.data.userEmail,
				userPassword: user.data.userPassword,
			},
			success: (res) => {

				user.data.userPassword = ""
				if (res.data.code != null) {
					user.data.point = res.data.data.point
					user.data.completeTarget = res.data.data.completeTarget
					user.data.userName = res.data.data.userName
					user.data.picUrl = res.data.data.picUrl

					e[1].userdatauserEmail = user.data.userEmail
					e[1].userdatapoint = user.data.point
					e[1].userdatacompleteTarget = user.data.completeTarget
					e[1].userdatauserName = user.data.userName
					e[1].userdatapicUrl = user.data.picUrl
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
				tag.data.tagName = res.data.data[0].tagName
				tag.data.tagDescribe = res.data.data[0].tagDescribe
				tag.data.tagPoint = res.data.data[0].tagPoint
				tag.data.tagHour = res.data.data[0].tagHour
				tag.data.tagMinute = res.data.data[0].tagMinute

				e[2].tagdatatagName = tag.data.tagName
				e[2].tagdatatagDescribe = tag.data.tagDescribe
				e[2].tagdatatagPoint = tag.data.tagPoint
				e[2].tagdatatagHour = tag.data.tagHour
				e[2].tagdatatagMinute = tag.data.tagMinute


				time.data.remainingTime = (
						tag.data.tagHour * 3600) + (tag.data.tagMinute * 60) +
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
				target.data.deadlineDate = []
				for (let i = 0; i < res.data.data.length; i++) {
					if (res.data.data[i].status == 0) {
						state.targetNoTime.push({
							'targetName': res.data.data[i].targetName,
							'targetDescribe': res.data.data[i].targetDescribe,
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
							target.data.deadlineDate.push(
								deadline
							);
						}
						state.targetWithTime.push({
							'targetName': res.data.data[i].targetName,
							'targetDescribe': res.data.data[i].targetDescribe,
							'targetPoint': res.data.data[i].targetPoint,
							'deadline': res.data.data[i].deadline,
							'targetId': res.data.data[i].targetId
						})
					}
				}
				e[3].statetargetNoTime = state.targetNoTime
				e[3].statetargetWithTime = state.targetWithTime
				e[3].targetdatadeadlineDate = target.data.deadlineDate

				uni.setStorage({
					key: 'userInfo',
					data: user.data.userInfo
				});
			}
		})
	}
</script>

<style lang="scss">
	.Logo {
		.LogoL {
			.LogoLI {
				display: flex;
				justify-content: center;
				align-items: center;
				padding-bottom: 15rpx;
			}

			text {
				display: block;
				font-size: 80rpx;
				font-weight: 700;
				line-height: 88rpx;
				color: rgba(27, 32, 42, 1);
				text-align: center;
				padding-top: 15rpx;
			}
		}


	}
</style>
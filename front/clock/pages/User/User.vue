<template>
	<navbar :navbarTo="'/menu/5'"></navbar>
	<view class="User">
		<view class="UserTime">
			<view class="UserTimeP">
				<text>{{state.UserTimeP}}</text>
			</view>
			<view class="UserTimeB" @click="targetMenuDetail" v-if="state.showtargetArrowUp">
				<image src="@\static\Circle.png" style="width: 40rpx;height:40rpx;" />
			</view>
			<view class="UserTimeB" @click="targetMenuDetail" v-if="state.showtargetArrowDown">
				<image src="@\static\Circle.svg" style="width: 40rpx;height:40rpx;" />
			</view>
		</view>

		<uni-transition mode-class="fade" :show="state.showtargetMenuDetail" duration=300
			style="position: absolute; zIndex: 0;">
			<view class="targetMenuDetail">
				<view class="targetMenuDetailD" @click="UserTimeP1">
					<text>{{state.UserTimeP1}}</text>
				</view>

				<view class="targetMenuDetailD" @click="UserTimeP2">
					<text>{{state.UserTimeP2}}</text>
				</view>
			</view>
		</uni-transition>

		<view class="UserPoint">
			<view class="UserPointD">
				<text class="UserPointDP">获得分数</text>
				<view class="UserPointDD">
					<text>{{state.pointAll}}</text>
					<image src="@/static/coin.svg" style="width: 34rpx;height:34rpx;" />
				</view>
				<text class="UserPointDE">努力的{{state.UserTimeP.substr(-2)}}！</text>
			</view>
			<view class="UserPointI">
				<image src="@/static/UserPointI.png" style="width: 370rpx;height:370rpx;" />
			</view>
		</view>

		<view class="UserProgress">
			<view class="UserProgressD">
				<text class="UserProgressDP" v-if="state.ifUserProgressDP">进步</text>
				<text class="UserProgressDP" v-if="state.ifUserProgressDPNull">退步</text>
				<text>{{state.progress}}</text>
				<text>Points</text>
				<text class="UserProgressDC">比起上{{state.UserTimeP.substr(-2)}}</text>
			</view>
			<view class="UserProgressI">
				<image src="@/static/UserProgressI.png" style="width: 202rpx;height:152rpx;" />
			</view>
		</view>
		<view class="UserAchieveList">
			<view class="UserAchieveList1">
				<view class="UserAchieve1">
					<view class="UserAchieve1P">
						<text>{{state.pointInsistence}}天</text>
						<text>连续得分</text>
					</view>
					<view class="UserAchieve1PI">
						<image src="@/static/UserAchieve1PI.svg" style="width: 32rpx;height:32rpx;" />
					</view>
					<view class="UserAchieve1I">
						<image src="@/static/UserAchieve1I.png" style="width: 232rpx;height:8rpx;" />
					</view>
				</view>
				<view class="UserAchieve2">
					<view class="UserAchieve2P">
						<text>{{state.completeTargetRate}}</text>
						<text>%</text>
						<text>目标完成率</text>
					</view>
					<view class="UserAchieve2PI">
						<image src="@/static/UserAchieve1PI.svg" style="width: 32rpx;height:32rpx;" />
					</view>
					<view class="UserAchieve2I">
						<image src="@\static\Progress.png" style="width: 142rpx;height:142rpx;" />
					</view>
				</view>
			</view>
			<view class="UserAchieveList2">
				<view class="UserAchieve3">
					<view class="UserAchieve3P">
						<text>{{state.pointAverage}}</text>
						<text>每日平均得分</text>
					</view>
					<view class="UserAchieve3PI">
						<image src="@/static/UserAchieve1PI.svg" style="width: 32rpx;height:32rpx;" />
					</view>
					<view class="UserAchieve3I">
						<image src="@/static/UserAchieve3I.png" style="width: 224rpx;height:152rpx;" />
					</view>
				</view>
				<view class="UserAchieve4">
					<view class="UserAchieve4P">
						<view class="UserAchieve4P">
							<text>{{state.completeTarget}}个目标</text>
							<text>完全完成</text>
						</view>
					</view>
					<view class="UserAchieve4PI">
						<image src="@/static/UserAchieve1PI.svg" style="width: 32rpx;height:32rpx;" />
					</view>
					<view class="UserAchieve4I">
						<image src="@/static/UserAchieve1I.png" style="width: 232rpx;height:8rpx;" />
					</view>
				</view>
			</view>
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
		useTargetStore
	} from "../../store/target";
	import {
		useUserStore
	} from "../../store/user";
	import {
		useTimeStore
	} from "../../store/time";
	import {
		useTagStore
	} from "../../store/tag";
	const url = inject('url');
	const user = useUserStore()
	const target = useTargetStore()
	const time = useTimeStore()
	const tag = useTagStore()


	const state = reactive({
		showtargetMenuDetail: false,
		showtargetArrowUp: true,
		showtargetArrowDown: false,
		UserTimeP: "过去一周",
		UserTimeP1: "过去一天",
		UserTimeP2: "过去一月",
		completeTarget: 0,
		completeTargetRate: 0,
		pointAll: 0,
		pointAverage: 0,
		pointInsistence: 0,
		progress: 0,
		ifUserProgressDP: true,
		ifUserProgressDPNull: false
	});
	uni.request({
		url: url + '/pointRecord/get',
		method: "POST",
		data: {
			userEmail: user.data.userEmail,
			userTimeP: state.UserTimeP,
		},
		success: (res) => {
			console.log(res)
			state.completeTarget = res.data.data.completeTarget
			state.completeTargetRate = res.data.data.completeTargetRate
			state.pointAll = res.data.data.pointAll
			state.pointAverage = res.data.data.pointAverage
			state.pointInsistence = res.data.data.pointInsistence
			state.progress = res.data.data.progress
			if (res.data.data.ifProgress == 0) {
				state.ifUserProgressDPNull = true
				state.ifUserProgressDP = false
			} else {
				state.ifUserProgressDPNull = false
				state.ifUserProgressDP = true
			}

		}
	})
	name: "User"
	let UserTimeP = ""
	const targetMenuDetail = () => {
		state.showtargetMenuDetail = !state.showtargetMenuDetail;
		state.showtargetArrowUp = !state.showtargetArrowUp;
		state.showtargetArrowDown = !state.showtargetArrowDown;
	}
	const UserTimeP1 = () => {
		state.showtargetMenuDetail = !state.showtargetMenuDetail;
		state.showtargetArrowUp = !state.showtargetArrowUp;
		state.showtargetArrowDown = !state.showtargetArrowDown;
		UserTimeP = state.UserTimeP
		state.UserTimeP = state.UserTimeP1
		state.UserTimeP1 = UserTimeP
		uni.request({
			url: url + '/pointRecord/get',
			method: "POST",
			data: {
				userEmail: user.data.userEmail,
				userTimeP: state.UserTimeP,
			},
			success: (res) => {
				console.log(res)
				state.completeTarget = res.data.data.completeTarget
				state.completeTargetRate = res.data.data.completeTargetRate
				state.pointAll = res.data.data.pointAll
				state.pointAverage = res.data.data.pointAverage
				state.pointInsistence = res.data.data.pointInsistence
				state.progress = res.data.data.progress
				if (res.data.data.ifProgress == 0) {
					state.ifUserProgressDPNull = true
					state.ifUserProgressDP = false
				} else {
					state.ifUserProgressDPNull = false
					state.ifUserProgressDP = true
				}
			}
		})
	}
	const UserTimeP2 = () => {
		state.showtargetMenuDetail = !state.showtargetMenuDetail;
		state.showtargetArrowUp = !state.showtargetArrowUp;
		state.showtargetArrowDown = !state.showtargetArrowDown;
		UserTimeP = state.UserTimeP
		state.UserTimeP = state.UserTimeP2
		state.UserTimeP2 = UserTimeP
		uni.request({
			url: url + '/pointRecord/get',
			method: "POST",
			data: {
				userEmail: user.data.userEmail,
				userTimeP: state.UserTimeP,
			},
			success: (res) => {
				console.log(res)
				state.completeTarget = res.data.data.completeTarget
				state.completeTargetRate = res.data.data.completeTargetRate
				state.pointAll = res.data.data.pointAll
				state.pointAverage = res.data.data.pointAverage
				state.pointInsistence = res.data.data.pointInsistence
				state.progress = res.data.data.progress
				if (res.data.data.ifProgress == 0) {
					state.ifUserProgressDPNull = true
					state.ifUserProgressDP = false
				} else {
					state.ifUserProgressDPNull = false
					state.ifUserProgressDP = true
				}
			}
		})
	}
</script>

<style lang="scss">
	.targetMenuDetail {
		overflow: auto;
		margin: 16rpx 55rpx;
		position: absolute;
		width: 640rpx;
		max-height: 600rpx;
		border-radius: 40rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 8rpx 20rpx 40rpx 0rpx rgba(0, 0, 0, 0.06);
		z-index: 1;

		.targetMenuDetailD {
			display: flex;
			align-items: center;
			padding: 20rpx 40rpx 30rpx 40rpx;

			text {
				font-size: 28rpx;
				font-weight: 600;
				letter-spacing: 0rpx;
				line-height: 40rpx;
				color: rgba(128, 129, 145, 1);
				text-align: left;
				vertical-align: top;

			}

		}
	}

	.User {
		margin: 0 auto;

		.UserTime {

			border-radius: 32rpx;
			background: rgba(250, 250, 255, 1);
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 24rpx 32rpx 24rpx 32rpx;
			margin-top: 60rpx;
			margin-left: 40rpx;
			margin-right: 40rpx;

			.UserTimeP {

				font-size: 28rpx;
				font-weight: 600;
				letter-spacing: 0rpx;
				line-height: 40rpx;
				color: rgba(128, 129, 145, 1);
				text-align: left;
				vertical-align: top;
			}
		}

		.UserPoint {
			margin: 0 auto;
			margin-top: 40rpx;
			width: 654rpx;
			height: 240rpx;
			border-radius: 40rpx;
			background: linear-gradient(180deg, rgba(205, 231, 255, 1) 0%, rgba(193, 225, 255, 1) 100%);
			display: flex;

			.UserPointD {
				padding: 40rpx;


				.UserPointDP {
					height: 32rpx;
					display: flex;
					font-size: 24rpx;
					font-weight: 700;
					letter-spacing: 0rpx;
					line-height: 32rpx;
					color: rgba(108, 93, 211, 1);
					text-align: left;
					vertical-align: top;

				}

				.UserPointDD {
					display: flex;
					align-items: center;

					text:nth-child(1) {
						width: 80rpx;
						height: 88rpx;
						font-size: 60rpx;
						font-weight: 700;
						letter-spacing: 0rpx;
						line-height: 88rpx;
						color: rgba(108, 93, 211, 1);
						text-align: left;
						vertical-align: top;

					}

					image {
						margin-left: 10rpx;
					}
				}

				.UserPointDE {
					width: 224rpx;
					height: 48rpx;
					display: flex;
					font-size: 28rpx;
					font-weight: 500;
					letter-spacing: 0rpx;
					line-height: 48rpx;
					color: rgba(27, 32, 42, 1);
					text-align: left;
					vertical-align: top;

				}
			}

			.UserPointI {

				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.UserProgress {
			display: flex;
			margin: 0 auto;
			margin-top: 40rpx;
			width: 654rpx;
			height: 240rpx;
			border-radius: 40rpx;
			background: rgba(233, 233, 255, 1);

			.UserProgressD {
				padding: 40rpx;

				text:nth-child(1) {
					height: 32rpx;
					display: flex;
					font-size: 24rpx;
					font-weight: 700;
					letter-spacing: 0rpx;
					line-height: 32rpx;
					color: rgba(108, 93, 211, 1);
					text-align: left;
					vertical-align: top;

				}

				text:nth-child(2) {
					width: 134rpx;
					height: 88rpx;
					font-size: 60rpx;
					font-weight: 700;
					letter-spacing: 0rpx;
					line-height: 88rpx;
					color: rgba(108, 93, 211, 1);
					text-align: left;
					vertical-align: top;

				}

				text:nth-child(3) {
					width: 134rpx;
					height: 88rpx;
					margin-left: 20rpx;
					font-size: 60rpx;
					font-weight: 700;
					letter-spacing: 0rpx;
					line-height: 88rpx;
					color: rgba(108, 93, 211, 1);
					text-align: left;
					vertical-align: top;

				}

				text:nth-child(4) {
					width: 224rpx;
					height: 48rpx;
					display: flex;
					font-size: 32rpx;
					font-weight: 600;
					letter-spacing: 0rpx;
					line-height: 48rpx;
					color: rgba(27, 32, 42, 1);
					text-align: left;
					vertical-align: top;

				}
			}

			.UserProgressI {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-left: 50rpx;
			}
		}

		.UserAchieveList1 {
			margin-right: 30rpx;
			width: 312rpx;
			height: 668rpx;

			.UserAchieve1 {

				margin-bottom: 20rpx;
				padding: 40rpx;
				display: flex;
				flex-wrap: wrap;
				/*来让元素进行折行排列，使得每行的元素都不超过容器的宽度*/
				justify-content: space-between;

				border-radius: 40rpx;
				background: rgba(128, 129, 145, 0.04);

				.UserAchieve1P {
					text:nth-child(1) {
						font-size: 32rpx;
						font-weight: 700;
						letter-spacing: 0rpx;
						line-height: 48rpx;
						color: rgba(94, 98, 114, 1);
						text-align: left;
						vertical-align: top;
						display: block;
					}

					text:nth-child(2) {
						font-size: 32rpx;
						font-weight: 700;
						letter-spacing: 0rpx;
						line-height: 48rpx;
						color: rgba(94, 98, 114, 1);
						text-align: left;
						vertical-align: top;
						display: block;
					}

					text:nth-child(3) {
						font-size: 28rpx;
						font-weight: 600;
						letter-spacing: 0rpx;
						line-height: 48rpx;
						color: rgba(128, 129, 145, 1);
						text-align: left;
						vertical-align: top;
					}
				}

				.UserAchieve1I {
					padding-top: 40rpx;
				}
			}

			.UserAchieve2 {
				padding: 40rpx;
				display: flex;
				flex-wrap: wrap;
				/*来让元素进行折行排列，使得每行的元素都不超过容器的宽度*/
				justify-content: space-between;

				border-radius: 40rpx;
				background: rgba(128, 129, 145, 0.04);

				.UserAchieve2P {
					text:nth-child(1) {
						display: inline-block;

						font-size: 24rpx;
						font-weight: 700;
						letter-spacing: 0rpx;
						line-height: 32rpx;
						color: rgba(94, 98, 114, 1);
						text-align: center;
						vertical-align: top;
					}

					text:nth-child(2) {
						display: inline-block;
						font-size: 24rpx;
						font-weight: 700;
						letter-spacing: 0rpx;
						line-height: 32rpx;
						color: rgba(94, 98, 114, 1);
						text-align: center;
						vertical-align: top;
					}

					text:nth-child(3) {
						display: block;
						width: 140rpx;
						height: 48rpx;
						font-size: 28rpx;
						font-weight: 600;
						letter-spacing: 0rpx;
						line-height: 48rpx;
						color: rgba(128, 129, 145, 1);
						text-align: left;
						vertical-align: top;
					}
				}

				.UserAchieve2I {
					padding: 40rpx;
				}
			}
		}

		.UserAchieveList2 {
			width: 312rpx;
			height: 668rpx;

			.UserAchieve3 {
				margin-bottom: 20rpx;
				padding: 40rpx;
				display: flex;
				flex-wrap: wrap;
				/*来让元素进行折行排列，使得每行的元素都不超过容器的宽度*/
				justify-content: space-between;

				border-radius: 40rpx;
				background: rgba(128, 129, 145, 0.04);

				.UserAchieve3P {
					text:nth-child(1) {
						font-size: 32rpx;
						font-weight: 700;
						letter-spacing: 0rpx;
						line-height: 48rpx;
						color: rgba(94, 98, 114, 1);
						text-align: left;
						vertical-align: top;
						display: block;
					}

					text:nth-child(2) {
						font-size: 28rpx;
						font-weight: 600;
						letter-spacing: 0rpx;
						line-height: 48rpx;
						color: rgba(128, 129, 145, 1);
						text-align: left;
						vertical-align: top;
					}
				}

				.UserAchieve3I {
					padding-top: 40rpx;
				}
			}

			.UserAchieve4 {
				padding: 40rpx;
				display: flex;
				flex-wrap: wrap;
				/*来让元素进行折行排列，使得每行的元素都不超过容器的宽度*/
				justify-content: space-between;

				border-radius: 40rpx;
				background: rgba(128, 129, 145, 0.04);


				.UserAchieve4P {

					text:nth-child(1) {
						height: 64rpx;
						font-size: 40rpx;
						font-weight: 700;
						letter-spacing: 0rpx;
						line-height: 64rpx;
						color: rgba(94, 98, 114, 1);
						text-align: left;
						vertical-align: top;
						display: block;
					}

					text:nth-child(2) {
						height: 48rpx;
						font-size: 28rpx;
						font-weight: 600;
						letter-spacing: 0rpx;
						line-height: 48rpx;
						color: rgba(128, 129, 145, 1);
						text-align: left;
						vertical-align: top;
					}

				}

				.UserAchieve4PI {
					padding-top: 12rpx;
				}

				.UserAchieve4I {}
			}
		}

		.UserAchieveList {
			display: flex;

			margin-top: 40rpx;
			justify-content: center;
		}
	}
</style>
<template>
	<view class="targetMenu">
		<view class="targetWord">
			<p>目标</p>
		</view>
		<view class="targetArrow" @click="targetMenuDetail" v-if="state.showtargetArrowUp">
			<image src="@\static\Circle.png" style="width: 40rpx;height:40rpx;" />
		</view>
		<view class="targetArrow" @click="targetMenuDetail" v-if="state.showtargetArrowDown">
			<image src="@\static\Circle.svg" style="width: 40rpx;height:40rpx;" />
		</view>
	</view>
	<uni-transition mode-class="fade" :show="state.showtargetMenuDetail" duration=300
		style="position: absolute; zIndex: 0;">
		<view class="targetMenuDetail">
			<view class="targetMenuDetailD" v-for="(item, index) in state.targetNoTime" :key="index"
				@click="targetNoTimeDelete(index)">
				<text>{{item.targetName}}</text>
				<view class="targetMenuDetailDI">
					<image src="@\static\coin.svg" style="width: 34rpx;height:34rpx;" />
					<text>X{{item.targetPoint}}</text>
				</view>
				<text>任意时间</text>
			</view>

			<view class="targetMenuDetailD" v-for="(item, index) in state.targetWithTime" :key="index"
				@click="targetWithTimeDelete(index)">
				<text>{{item.targetName}}</text>
				<view class="targetMenuDetailDI">
					<image src="@\static\coin.svg" style="width: 34rpx;height:34rpx;" />
					<text>X{{item.targetPoint}}</text>
				</view>
				<text v-if="target.data.ifshowDay[index]" class="targetMenuDetailDhaiy">还有</text>
				<text v-if="!target.data.ifshowDay[index]" class="targetMenuDetailDhaiy">今日</text>
				<text>{{target.data.dayDiff[index]}}</text>
				<text v-if="target.data.ifshowDay[index]">天</text>
			</view>
		</view>
	</uni-transition>

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
	const url = inject('url');
	const user = useUserStore()
	const target = useTargetStore()
	name: "targetMenu"

	//这里用了target-day里的方法显示目标
	//今天的时间
	let time = new Date()
	let myDate = time.getDate()
	let dayNum = time.getDay()
	let myMonth = time.getMonth()

	const state = reactive({
		showtargetMenuDetail: false,
		showtargetArrowUp: true,
		showtargetArrowDown: false,
		targetWithTime: [],
		targetNoTime: [],
		dayList: []
	});

	state.dayList.push({
		'day': time.getDate(),
		'month': time.getMonth(),
		'className': 'NumCenter'
	})


	const targetMenuDetail = () => {
		state.showtargetMenuDetail = !state.showtargetMenuDetail;
		state.showtargetArrowUp = !state.showtargetArrowUp;
		state.showtargetArrowDown = !state.showtargetArrowDown;
		if (state.targetNoTime.length == 0 && state.targetWithTime.length == 0) {
			uni.showToast({
				icon: "none",
				title: '没有目标，快去建立吧'
			});
		}
	}

	const targetNoTimeDelete = (index) => {
		uni.request({
			url: url + '/target/delete',
			method: "POST",
			data: {
				targetName: state.targetNoTime[index].targetName,
				ifPoints: 1,
				userEmail: user.data.userEmail,
				targetId: state.targetNoTime[index].targetId
			},
			success: (res) => {
				uni.showToast({
					icon: "none",
					title: '完成目标'
				});
				console.log(res)
				// 从targetNoTime数组中移除已删除的目标数据
				state.targetNoTime.splice(index, 1);
				user.data.point = res.data.data.targetPoint
			}
		})
	}

	const targetWithTimeDelete = (index) => {
		uni.request({
			url: url + '/target/delete',
			method: "POST",
			data: {
				targetName: state.targetWithTime[index].targetName,
				ifPoints: 1,
				userEmail: user.data.userEmail,
				targetId: state.targetWithTime[index].targetId
			},
			success: (res) => {
				uni.showToast({
					icon: "none",
					title: '完成目标'
				});
				console.log(res)
				// 从targetWithTime数组中移除已删除的目标数据
				state.targetWithTime.splice(index, 1);
				user.data.point = res.data.data.targetPoint
			}
		})
	}
	//Target里的get请求方法
	//这里放在外面是为了获得初始值
	//否则在进入这个页面是时候时间差里面没有数据
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
						target.data.deadlineDate.push(deadline);
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
		}
	})
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


		}


	)
</script>

<style lang="scss">
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}

	.targetMenu {
		margin: 0 auto;
		margin-top: 40rpx;
		margin-left: 40rpx;
		margin-right: 40rpx;
		border-radius: 32rpx;
		background: rgba(250, 250, 255, 1);
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 24rpx 32rpx 24rpx 32rpx;
		justify-content: space-between;
		/*两端对齐*/

		.targetWord {
			height: 48rpx;
			font-size: 28rpx;
			font-weight: 600;
			letter-spacing: 0rpx;
			line-height: 48rpx;
			color: rgba(128, 129, 145, 1);
			text-align: left;
			vertical-align: top;

		}

		.targetArrow {
			width: 40rpx;
			height: 40rpx;
			opacity: 1;
			display: flex;
		}
	}

	.targetMenuDetail {
		overflow: auto;
		margin: 16rpx 50rpx;
		position: absolute;
		width: 650rpx;
		max-height: 600rpx;
		border-radius: 40rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 8rpx 20rpx 40rpx 0rpx rgba(0, 0, 0, 0.06);
		z-index: 1;

		.targetMenuDetailD {
			display: flex;
			align-items: center;
			padding: 20rpx 40rpx 30rpx 40rpx;

			text:nth-child(1) {
				width: 350rpx;
				height: 48rpx;
				font-size: 32rpx;
				font-weight: 500;
				letter-spacing: 0rpx;
				line-height: 48rpx;
				color: rgba(128, 129, 145, 1);
				text-align: left;
				vertical-align: top;
			}

			.targetMenuDetailDhaiy {
				display: flex;
				align-items: center;

			}

			.targetMenuDetailDI {
				display: flex;
				align-items: center;
				justify-content: center;

				text {
					margin-right: 40rpx;
					margin-left: 6rpx;
					height: 32rpx;
					font-size: 22rpx;
					font-weight: 700;
					letter-spacing: 0rpx;
					line-height: 32rpx;
					color: rgba(128, 129, 145, 1);
					text-align: left;
					vertical-align: top;
				}
			}

			text {

				height: 32rpx;
				font-size: 22rpx;
				font-weight: 700;
				letter-spacing: 0rpx;
				line-height: 32rpx;
				color: rgba(128, 129, 145, 1);
				text-align: left;
				vertical-align: top;
			}
		}
	}
</style>
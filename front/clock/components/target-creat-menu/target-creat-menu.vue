<template>
	<view class="targetCreatMenuAll">
		<view class="targetCreatMenu">
			<view class="targetCreatMenuC">
				<navigator url="../../pages/Target/Target" open-type="redirect">
					<image src="@\static\targetCreatMenuC.png" style="width: 56rpx;height: 56rpx;" />
				</navigator>
			</view>
			<view class="targetCreatMenuP">
				<text>建立目标</text>
			</view>
			<view class="targetCreatMenuS" @click="saveTarget">
				<text>保存</text>
			</view>
		</view>
		<view class="targetCreatMenuL">
			<image src="@\static\targetCreatMenuL.svg" style="width: 458rpx;height: 232rpx;" />
		</view>
		<view class="targetCreatNamep">
			<text>名称</text>
		</view>
		<view class="targetCreatName">
			<view class="targetCreatNameName">
				<input class="uni-input" maxlength="8" placeholder="请输入名称" :value="state.inputClearValue1"
					@input="clearInput1" />
				<image src="@\static\targetCreatNameC.svg" style="width: 48rpx;height: 48rpx;"
					v-if="state.showClearIcon1" @click="clearIcon1" />

			</view>
		</view>
		<view class="targetCreatNamep">
			<text>备注</text>
		</view>
		<view class="targetCreatName">
			<view class="targetCreatNameName">
				<input class="uni-input" maxlength="8" placeholder="请输入备注" :value="state.inputClearValue2"
					@input="clearInput2" />
				<image src="@\static\targetCreatNameC.svg" style="width: 48rpx;height: 48rpx;"
					v-if="state.showClearIcon2" @click="clearIcon2" />

			</view>
		</view>
		<view class="targetCreatColor">
			<view class="targetCreatColorP">
				<text>代表颜色</text>
			</view>
			<view class="targetCreatColorColor">
			</view>
		</view>
		<view class="targetCreatIfDay">
			<view class="targetCreatIfDayP">
				<text>是否设置截止日期和分数</text>
			</view>
			<view class="targetCreatIfDayI">
				<checkbox value="cb" checked="true" color="rgb(108, 93, 211)" @click="ifshowDayPoints" />
			</view>
		</view>

		<view class="targetCreatDay">
			<uni-datetime-picker type="datetime" v-model="state.single" hide-second="true"
				v-if="state.ifshowtargetCreatDay">
				<view class="targetCreatDayDay" @click="ifshowDayPoints1">
					<view class="targetCreatDayDayI">
						<image src="@\static\targetCreatDayDayI.svg" style="width: 48rpx;height: 48rpx;" />
					</view>
					<view class="targetCreatDayDayP">
						<text>+添加日期</text>
					</view>
				</view>
			</uni-datetime-picker>

			<picker @change="bindPickerChange" :value="state.index" :range="array" v-if="state.ifshowtargetCreatDay">
				<view class="targetCreatDayPoint" @click="state.showPicker=true">
					<view class="targetCreatDayPointI" @click="ifshowDayPoints2">
						<image src="@\static\coin.svg" style="width: 34rpx;height: 34rpx;" />
					</view>
					<view class="targetCreatDayPointP" @click="ifshowDayPoints2">
						<text>+添加分数</text>
					</view>
				</view>
			</picker>

		</view>
		<uni-section v-show="state.ifshowtargetCreatDay1" :title="'截止时间：' + state.single" type="line"></uni-section>
		<uni-section v-show="state.ifshowtargetCreatDay2" :title="'可得分数：' + array[state.index]"
			type="line"></uni-section>
	</view>

</template>

<script setup>
	import {
		reactive,
		toRefs,
		onMounted,
		ref
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
	const array = [' ', '1 Point', '2 Points', '3 Points', '4 Points', '5 Points', '6 Points', '7 Points', '8 Points',
		'9 Points', '10 Points'
	]
	const state = reactive({
		single: '',
		showPicker: false,
		index: 0,
		ifshowtargetCreatDay: true,
		inputClearValue1: '',
		inputClearValue2: '',
		showClearIcon1: false,
		showClearIcon2: false,
		ifshowtargetCreatDay1: true,
		ifshowtargetCreatDay2: true,
		ifTargetUpdate: 0
	});
	name: "targetCreatMenu"
	state.inputClearValue1 = target.data.targetName
	state.inputClearValue2 = target.data.targetDescribe
	state.single = target.data.deadline
	state.index = target.data.targetPoint
	state.ifTargetUpdate = target.data.ifTargetUpdate
	state.targetId = target.data.targetId

	if (state.single != '') {
		state.ifshowtargetCreatDay1 = true
	}
	if (state.index != 0) {
		state.ifshowtargetCreatDay2 = true
	}
	const ifshowDayPoints1 = () => {
		state.ifshowtargetCreatDay1 = true
	}
	const ifshowDayPoints2 = () => {
		state.ifshowtargetCreatDay2 = true
	}


	const bindPickerChange = (e) => {
		state.index = e.detail.value;
	}
	const clearInput1 = (event) => {
		state.inputClearValue1 = event.target.value;
		if (event.target.value.length > 0) {
			state.showClearIcon1 = true;
		} else {
			state.showClearIcon1 = false;
		}
	}
	const clearInput2 = (event) => {
		state.inputClearValue2 = event.target.value;
		if (event.target.value.length > 0) {
			state.showClearIcon2 = true;
		} else {
			state.showClearIcon2 = false;
		}
	}

	const clearIcon1 = () => {
		state.inputClearValue1 = '';
		state.showClearIcon1 = false;
	}

	const clearIcon2 = () => {
		state.inputClearValue2 = '';
		state.showClearIcon2 = false;
	}
	const ifshowDayPoints = () => {
		state.ifshowtargetCreatDay = !state.ifshowtargetCreatDay
		state.ifshowtargetCreatDay1 = !state.ifshowtargetCreatDay1
		state.ifshowtargetCreatDay2 = !state.ifshowtargetCreatDay2
		state.single = ""
		state.index = 0
	}

	const saveTarget = () => {
		if (state.inputClearValue1 == '') {
			uni.showToast({
				icon: "none",
				title: '请输入目标名'
			});
		} else if (state.inputClearValue2 == '') {
			uni.showToast({
				icon: "none",
				title: '请输入目标备注'
			});
		} else if (state.index == 0) {
			uni.showToast({
				icon: "none",
				title: '请添加分数'
			});
		} else {
			uni.request({
				url: url + '/target/save',
				method: "POST",
				data: {
					deadlineString: state.single,
					userEmail: user.data.userEmail,
					targetName: state.inputClearValue1,
					targetDescribe: state.inputClearValue2,
					targetPoint: state.index,
					ifTargetUpdate: state.ifTargetUpdate,
					targetId: state.targetId
				},
				success: (res) => {
					if (res.data.data.status == 4) {
						uni.showToast({
							icon: "none",
							title: '重复输入'
						});
					} else if (res.data.data.status == 0) {
						target.data.ifshowTargetTaskNull0 = false

					} else if (res.data.data.status == 1) {
						console.log(res)
						//下面的是提前得出目标的时间差
						let deadline = new Date(res.data.data.deadlineString)
						if (!target.data.deadlineDate.includes(deadline)) {
							target.data.deadlineDate.push(deadline);
						}
						target.data.ifshowTargetTaskNull1 = false
						uni.redirectTo({
							url: '../../pages/Target/Target'
						});
					}
				}
			})
		}

	}
</script>

<style lang="scss" scoped>
	.targetCreatMenuAll {
		margin-left: 20rpx;
		margin-right: 20rpx;
	}

	.targetCreatMenu {
		display: flex;
		height: 80rpx;

		align-items: center;
		/*居中对齐*/

		.targetCreatMenuC {
			width: 56rpx;
			height: 56rpx;
		}

		.targetCreatMenuP {
			height: 64rpx;
			width: 510rpx;
			font-size: 40rpx;
			font-weight: 700;
			letter-spacing: 0rpx;
			line-height: 64rpx;
			color: rgba(27, 32, 42, 1);
			text-align: left;
			vertical-align: top;
			padding-left: 40rpx;
		}

		.targetCreatMenuS {
			height: 48rpx;
			font-size: 32rpx;
			font-weight: 700;
			letter-spacing: 0rpx;
			line-height: 48rpx;
			color: rgba(108, 93, 211, 1);
			text-align: left;
			vertical-align: top;


			a {
				text-decoration: none;
				/* 去除默认的下划线 */
				outline: none;
				/* 去除旧版浏览器的点击后的外虚线框 */
				color: rgba(108, 93, 211, 1);
				/* 去除默认的颜色和点击后变化的颜色 */
			}

		}
	}

	.targetCreatMenuL {
		margin: 0 auto;
		margin-top: 40rpx;

		image {
			display: block;
			margin: 0 auto;
		}
	}

	.targetCreatNamep {
		width: 56rpx;
		height: 48rpx;
		font-size: 28rpx;
		font-weight: 600;
		letter-spacing: 0rpx;
		line-height: 48rpx;
		color: rgba(128, 129, 145, 1);
		text-align: left;
		vertical-align: top;
		margin-top: 20rpx;
	}

	.targetCreatName {
		border-radius: 4rpx 4rpx, 40rpx, 40rpx;
		background: rgba(128, 129, 145, 0.04);
		border-radius: 40rpx;
		display: flex;
		align-items: center;
		/*居中对齐*/
		/*两端对齐*/
		padding: 30rpx 30rpx 30rpx 30rpx;
		margin-top: 20rpx;

		.targetCreatNameName {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 650rpx;
			height: 48rpx;
			font-size: 32rpx;
			font-weight: 700;
			letter-spacing: 0rpx;
			line-height: 48rpx;
			color: rgba(27, 32, 42, 1);
			vertical-align: top;
		}
	}

	.targetCreatColor {
		margin-top: 40rpx;
		display: flex;
		justify-content: space-between;
		/*两端对齐*/
		align-items: center;

		/*居中对齐*/
		.targetCreatColorP {
			width: 112rpx;
			height: 48rpx;
			font-size: 28rpx;
			font-weight: 600;
			letter-spacing: 0rpx;
			line-height: 48rpx;
			color: rgba(128, 129, 145, 1);
			text-align: left;
			vertical-align: top;
		}

		.targetCreatColorColor {
			width: 32rpx;
			height: 32rpx;
			background: rgba(255, 206, 115, 1);
			border-radius: 100%;
		}
	}

	.targetCreatIfDay {
		margin-top: 40rpx;
		display: flex;
		justify-content: space-between;
		/*两端对齐*/
		align-items: center;

		/*居中对齐*/
		.targetCreatIfDayP {
			width: 308rpx;
			height: 48rpx;
			font-size: 28rpx;
			font-weight: 600;
			letter-spacing: 0rpx;
			line-height: 48rpx;
			color: rgba(128, 129, 145, 1);
			text-align: left;
			vertical-align: top;
		}

		.targetCreatIfDayI {
			width: 40rpx;
			height: 40rpx;
			border-radius: 8rpx;
			background: rgba(108, 93, 211, 1);
			display: flex;
			align-items: center;

			image {
				display: block;
				margin: 0 auto;
				width: 20rpx;
				height: 16rpx;
			}
		}
	}

	.targetCreatDay {
		margin-top: 40rpx;
		display: flex;
		align-items: center;
		/*居中对齐*/
		justify-content: space-between;

		/*两端对齐*/
		.targetCreatDayDay {
			display: flex;
			align-items: center;
			/*居中对齐*/
			justify-content: space-between;
			padding-right: 200rpx;

			/*两端对齐*/
			.targetCreatDayDayI {
				width: 96rpx;
				height: 96rpx;
				background: linear-gradient(180deg, rgba(154, 219, 127, 1) 0%, rgba(110, 169, 92, 1) 100%);
				border-radius: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.targetCreatDayDayP {

				width: 138rpx;
				height: 48rpx;
				font-size: 28rpx;
				font-weight: 600;
				letter-spacing: 0rpx;
				line-height: 48rpx;
				color: rgba(165, 245, 156, 1);
				text-align: left;
				vertical-align: top;
			}
		}

		.targetCreatDayPoint {
			display: flex;
			align-items: center;
			/*居中对齐*/
			justify-content: space-between;

			.targetCreatDayPointI {
				width: 96rpx;
				height: 96rpx;
				background: linear-gradient(270deg, rgba(255, 235, 162, 1) 0%, rgba(255, 134, 105, 1) 100%);
				border-radius: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.targetCreatDayPointP {

				width: 138rpx;
				height: 48rpx;
				font-size: 28rpx;
				font-weight: 600;
				letter-spacing: 0rpx;
				line-height: 48rpx;
				color: rgba(255, 206, 115, 1);
				text-align: left;
				vertical-align: top;
			}
		}
	}

	.uni-section ::v-deep .uni-section-header__decoration {
		background-color: rgba(108, 93, 211, 1);
	}
</style>
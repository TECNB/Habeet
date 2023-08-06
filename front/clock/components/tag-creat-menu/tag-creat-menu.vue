<template>
	<view class="tagCreatMenuAll">
		<view class="tagCreatMenu">
			<view class="tagCreatMenuC">
				<navigator url="../../pages/Tag/Tag" open-type="redirect">
					<image src="@\static\targetCreatMenuC.png" style="width: 56rpx;height: 56rpx;" />
				</navigator>
			</view>
			<view class="tagCreatMenuP">
				<text>建立标签</text>
			</view>
			<view class="tagCreatMenuS" @click="savetag">
				<text>保存</text>
			</view>
		</view>
		<view class="tagCreatMenuL">
			<image src="@\static\targetCreatMenuL.svg" style="width: 458rpx;height: 232rpx;" />
		</view>
		<view class="tagCreatNamep">
			<text>名称</text>
		</view>
		<view class="tagCreatName">
			<view class="tagCreatNameName">
				<input class="uni-input" maxlength="6" placeholder="请输入名称" :value="state.inputClearValue1"
					@input="clearInput1" />
				<image src="@\static\targetCreatNameC.svg" style="width: 48rpx;height: 48rpx;"
					v-if="state.showClearIcon1" @click="clearIcon1" />

			</view>
		</view>
		<view class="tagCreatNamep">
			<text>备注</text>
		</view>
		<view class="tagCreatName">
			<view class="tagCreatNameName">
				<input class="uni-input" maxlength="6" placeholder="请输入备注" :value="state.inputClearValue2"
					@input="clearInput2" />
				<image src="@\static\targetCreatNameC.svg" style="width: 48rpx;height: 48rpx;"
					v-if="state.showClearIcon2" @click="clearIcon2" />

			</view>
		</view>
		<view class="tagCreatColor">
			<view class="tagCreatColorP">
				<text>代表颜色</text>
			</view>
			<view class="tagCreatColorColor">
			</view>
		</view>
		<view class="tagCreatIfDay">
			<view class="tagCreatIfDayP">
				<text>是否设置截止日期和分数</text>
			</view>
			<view class="tagCreatIfDayI">
				<checkbox value="cb" checked="true" color="rgb(108, 93, 211)" @click="ifshowDayPoints" />
			</view>
		</view>

		<view class="tagCreatDay">

			<picker @change="multiPickerChange" mode="multiSelector" :value="state.indexTime" :range="arrayTime"
				v-if="state.ifshowtagCreatDay">
				<view class="tagCreatDayDay" @click="ifshowDayPoints1">
					<view class="tagCreatDayDayI">
						<image src="@\static\targetCreatDayDayI.svg" style="width: 48rpx;height: 48rpx;" />
					</view>
					<view class="tagCreatDayDayP">
						<text>+添加时间</text>
					</view>
				</view>
			</picker>

			<picker @change="bindPickerChange" :range="array" v-if="state.ifshowtagCreatDay">
				<view class="tagCreatDayPoint" @click="ifshowDayPoints2">
					<view class="tagCreatDayPointI">
						<image src="@\static\coin.svg" style="width: 34rpx;height: 34rpx;" />
					</view>
					<view class="tagCreatDayPointP">
						<text>+添加分数</text>
					</view>
				</view>
			</picker>

		</view>
		<uni-section v-show="state.ifshowtagCreatDay1"
			:title="'倒计时时间：' + arrayTime[0][state.indexTime1]+'小时'+arrayTime[1][state.indexTime2]+'分钟'"
			type="line"></uni-section>
		<uni-section v-show="state.ifshowtagCreatDay2" :title="'可得分数：' + array[state.index]" type="line"></uni-section>
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
		useTagStore
	} from "../../store/tag";
	import {
		useUserStore
	} from "../../store/user";
	const url = inject('url');
	const user = useUserStore()
	const tag = useTagStore()
	const array = [' ', '1 Point', '2 Points', '3 Points', '4 Points', '5 Points', '6 Points', '7 Points', '8 Points',
		'9 Points', '10 Points'
	]
	const arrayTime = [
		[0, 1, 2, 3, 4],
		[0, 10, 20, 30, 40, 50]
	]
	const state = reactive({
		single: '',
		showPicker: false,
		index: 0,
		ifshowtagCreatDay: true,
		inputClearValue1: '',
		inputClearValue2: '',
		showClearIcon1: false,
		showClearIcon2: false,
		indexTime1: 0,
		indexTime2: 0,
		ifshowtagCreatDay1: true,
		ifshowtagCreatDay2: true,
		ifTagUpdate: 0,
		tagId: 0
	});
	name: "tagCreatMenu"

	state.inputClearValue1 = tag.data.tagName
	state.inputClearValue2 = tag.data.tagDescribe
	state.indexTime1 = tag.data.tagHour
	state.indexTime2 = tag.data.tagMinute / 10
	state.index = tag.data.tagPoint
	state.ifTagUpdate = tag.data.ifTagUpdate
	state.tagId = tag.data.tagId

	if (state.indexTime1 != 0 || state.indexTime2 != 0) {
		state.ifshowtagCreatDay1 = true
	}
	if (state.index != 0) {
		state.ifshowtagCreatDay2 = true
	}
	onMounted(() => {

	})
	const ifshowDayPoints1 = () => {
		state.ifshowtagCreatDay1 = true
	}
	const ifshowDayPoints2 = () => {
		state.ifshowtagCreatDay2 = true
	}

	const bindPickerChange = (e) => {
		state.index = e.detail.value;
	}
	const multiPickerChange = (e) => {
		state.indexTime1 = e.detail.value[0];
		state.indexTime2 = e.detail.value[1];
	}
	const clearInput1 = (event) => {
		state.inputClearValue1 = event.detail.value;
		if (event.detail.value.length > 0) {
			state.showClearIcon1 = true;
		} else {
			state.showClearIcon1 = false;
		}
	}
	const clearInput2 = (event) => {
		state.inputClearValue2 = event.detail.value;
		if (event.detail.value.length > 0) {
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
		state.ifshowtagCreatDay = !state.ifshowtagCreatDay
		state.ifshowtagCreatDay1 = !state.ifshowtagCreatDay1
		state.ifshowtagCreatDay2 = !state.ifshowtagCreatDay2
		state.single = ""
		state.index = 0
	}

	const savetag = () => {
		if (state.inputClearValue1 == '') {
			uni.showToast({
				icon: "none",
				title: '请输入标签名'
			});
		} else if (state.inputClearValue2 == '') {
			uni.showToast({
				icon: "none",
				title: '请输入标签备注'
			});
		} else if (state.index == 0) {
			uni.showToast({
				icon: "none",
				title: '请添加分数'
			});
		} else if (state.indexTime1 == 0 && state.indexTime2 == 0) {
			uni.showToast({
				icon: "none",
				title: '请添加不为空的时间'
			});
		} else {
			uni.request({
				url: url + '/tag/save',
				method: "POST",
				data: {
					userEmail: user.data.userEmail,
					tagName: state.inputClearValue1,
					tagDescribe: state.inputClearValue2,
					tagPoint: state.index,
					tagHour: arrayTime[0][state.indexTime1],
					tagMinute: arrayTime[1][state.indexTime2],
					ifTagUpdate: state.ifTagUpdate,
					tagId: state.tagId
				},
				success: (res) => {
					if (res.data.data.ifRepeat == 1) {
						uni.showToast({
							icon: "none",
							title: '标签名称重复'
						});
						console.log(res)
					} else {
						uni.redirectTo({
							url: '../../pages/Tag/Tag'
						});
					}

				}
			})
		}

	}
</script>

<style lang="scss" scoped>
	.tagCreatMenuAll {
		margin-left: 20rpx;
		margin-right: 20rpx;
	}

	.tagCreatMenu {
		display: flex;
		height: 80rpx;

		align-items: center;
		/*居中对齐*/

		.tagCreatMenuC {
			width: 56rpx;
			height: 56rpx;
		}

		.tagCreatMenuP {
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

		.tagCreatMenuS {
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

	.tagCreatMenuL {
		margin: 0 auto;
		margin-top: 40rpx;

		image {
			display: block;
			margin: 0 auto;
		}
	}

	.tagCreatNamep {
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

	.tagCreatName {
		border-radius: 4rpx 4rpx, 40rpx, 40rpx;
		background: rgba(128, 129, 145, 0.04);
		border-radius: 40rpx;
		display: flex;
		align-items: center;
		/*居中对齐*/
		/*两端对齐*/
		padding: 30rpx 30rpx 30rpx 30rpx;
		margin-top: 20rpx;

		.tagCreatNameName {
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

	.tagCreatColor {
		margin-top: 40rpx;
		display: flex;
		justify-content: space-between;
		/*两端对齐*/
		align-items: center;

		/*居中对齐*/
		.tagCreatColorP {
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

		.tagCreatColorColor {
			width: 32rpx;
			height: 32rpx;
			background: rgba(255, 206, 115, 1);
			border-radius: 100%;
		}
	}

	.tagCreatIfDay {
		margin-top: 40rpx;
		display: flex;
		justify-content: space-between;
		/*两端对齐*/
		align-items: center;

		/*居中对齐*/
		.tagCreatIfDayP {
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

		.tagCreatIfDayI {
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

	.tagCreatDay {
		margin-top: 40rpx;
		display: flex;
		align-items: center;
		/*居中对齐*/
		justify-content: space-between;

		/*两端对齐*/
		.tagCreatDayDay {
			display: flex;
			align-items: center;
			/*居中对齐*/
			justify-content: space-between;
			padding-right: 200rpx;

			/*两端对齐*/
			.tagCreatDayDayI {
				width: 96rpx;
				height: 96rpx;
				background: linear-gradient(180deg, rgba(154, 219, 127, 1) 0%, rgba(110, 169, 92, 1) 100%);
				border-radius: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.tagCreatDayDayP {

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

		.tagCreatDayPoint {
			display: flex;
			align-items: center;
			/*居中对齐*/
			justify-content: space-between;

			.tagCreatDayPointI {
				width: 96rpx;
				height: 96rpx;
				background: linear-gradient(270deg, rgba(255, 235, 162, 1) 0%, rgba(255, 134, 105, 1) 100%);
				border-radius: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.tagCreatDayPointP {

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
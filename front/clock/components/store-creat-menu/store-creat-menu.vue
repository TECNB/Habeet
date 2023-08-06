<template>
	<view class="storeCreatMenuAll">
		<view class="storeCreatMenu">
			<view class="storeCreatMenuC">
				<navigator url="../../pages/Store/Store" open-type="redirect">
					<image src="@\static\targetCreatMenuC.png" style="width: 56rpx;height: 56rpx;" />
				</navigator>
			</view>
			<view class="storeCreatMenuP">
				<text>建立商品</text>
			</view>
			<view class="storeCreatMenuS" @click="savestore">
				<text>保存</text>
			</view>
		</view>
		<view class="storeCreatMenuL">
			<image src="@\static\targetCreatMenuL.svg" style="width: 458rpx;height: 232rpx;" />
		</view>
		<view class="storeCreatNamep">
			<text>名称</text>
		</view>
		<view class="storeCreatName">
			<view class="storeCreatNameName">
				<input class="uni-input" maxlength="10" placeholder="请输入名称" :value="state.inputClearValue1"
					@input="clearInput1" />
				<image src="@\static\targetCreatNameC.svg" style="width: 48rpx;height: 48rpx;"
					v-if="state.showClearIcon1" @click="clearIcon1" />

			</view>
		</view>
		<view class="storeCreatNamep">
			<text>备注</text>
		</view>
		<view class="storeCreatName">
			<view class="storeCreatNameName">
				<input class="uni-input" maxlength="10" placeholder="请输入备注" :value="state.inputClearValue2"
					@input="clearInput2" />
				<image src="@\static\targetCreatNameC.svg" style="width: 48rpx;height: 48rpx;"
					v-if="state.showClearIcon2" @click="clearIcon2" />

			</view>
		</view>
		<view class="storeCreatColor">
			<view class="storeCreatColorP">
				<text>代表颜色</text>
			</view>
			<view class="storeCreatColorColor">
			</view>
		</view>
		<view class="storeCreatIfDay">
			<view class="storeCreatIfDayP">
				<text>是否设置截止日期和分数</text>
			</view>
			<view class="storeCreatIfDayI">
				<checkbox value="cb" checked="true" color="rgb(108, 93, 211)" @click="ifshowDayPoints" />
			</view>
		</view>

		<view class="storeCreatDay">

			<picker @change="multiPickerChange" mode="multiSelector" :value="state.indexTime" :range="arrayTime"
				v-if="state.ifshowstoreCreatDay">
				<view class="storeCreatDayDay" @click="ifshowDayPoints1">
					<view class="storeCreatDayDayI">
						<image src="@\static\targetCreatDayDayI.svg" style="width: 48rpx;height: 48rpx;" />
					</view>
					<view class="storeCreatDayDayP">
						<text>+添加时间</text>
					</view>
				</view>
			</picker>

			<picker @change="bindPickerChange" :range="array" v-if="state.ifshowstoreCreatDay">
				<view class="storeCreatDayPoint" @click="ifshowDayPoints2">
					<view class="storeCreatDayPointI">
						<image src="@\static\coin.svg" style="width: 34rpx;height: 34rpx;" />
					</view>
					<view class="storeCreatDayPointP">
						<text>+添加分数</text>
					</view>
				</view>
			</picker>

		</view>
		<uni-section v-show="state.ifshowstoreCreatDay1"
			:title="'倒计时时间：' + arrayTime[0][state.indexTime1]+'小时'+arrayTime[1][state.indexTime2]+'分钟'"
			type="line"></uni-section>
		<uni-section v-show="state.ifshowstoreCreatDay2" :title="'可得分数：' + array[state.index]"
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
		useStoreStore
	} from "../../store/store";
	import {
		useUserStore
	} from "../../store/user";
	const url = inject('url');
	const user = useUserStore()
	const store = useStoreStore()
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
		ifshowstoreCreatDay: true,
		inputClearValue1: '',
		inputClearValue2: '',
		showClearIcon1: false,
		showClearIcon2: false,
		indexTime1: 0,
		indexTime2: 0,
		ifshowstoreCreatDay1: true,
		ifshowstoreCreatDay2: true
	});
	name: "storeCreatMenu"
	state.inputClearValue1 = store.data.storeName
	state.inputClearValue2 = store.data.storeDescribe
	state.indexTime1 = store.data.storeHour
	state.indexTime2 = store.data.storeMinute / 10
	state.index = store.data.storePoint
	state.ifStoreUpdate = store.data.ifStoreUpdate
	state.storeId = store.data.storeId

	if (state.indexTime1 != 0 || state.indexTime2 != 0) {
		state.ifshowstoreCreatDay1 = true
	}
	if (state.index != 0) {
		state.ifshowstoreCreatDay2 = true
	}
	const ifshowDayPoints1 = () => {
		state.ifshowstoreCreatDay1 = true
	}
	const ifshowDayPoints2 = () => {
		state.ifshowstoreCreatDay2 = true
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
		state.ifshowstoreCreatDay = !state.ifshowstoreCreatDay
		state.ifshowtagCreatDay1 = !state.ifshowtagCreatDay1
		state.ifshowtagCreatDay2 = !state.ifshowtagCreatDay2
		state.single = ""
		state.index = 0
	}

	const savestore = () => {
		if (state.inputClearValue1 == '') {
			uni.showToast({
				icon: "none",
				title: '请输入商品名'
			});
		} else if (state.inputClearValue2 == '') {
			uni.showToast({
				icon: "none",
				title: '请输入商品备注'
			});
		} else if (state.index == 0) {
			uni.showToast({
				icon: "none",
				title: '请添加分数'
			});
		} else {
			uni.request({
				url: url + '/store/save',
				method: "POST",
				data: {
					userEmail: user.data.userEmail,
					storeName: state.inputClearValue1,
					storeDescribe: state.inputClearValue2,
					storePoint: state.index,
					storeHour: arrayTime[0][state.indexTime1],
					storeMinute: arrayTime[1][state.indexTime2],
					ifStoreUpdate: state.ifStoreUpdate,
					storeId: state.storeId
				},
				success: (res) => {
					if (res.data.data.ifRepeat == 1) {
						uni.showToast({
							icon: "none",
							title: '商品名称重复'
						});
						console.log(res)
					} else {
						uni.redirectTo({
							url: '../../pages/Store/Store'
						});
					}

				}
			})
		}

	}
</script>

<style lang="scss" scoped>
	.storeCreatMenuAll {
		margin-left: 20rpx;
		margin-right: 20rpx;
	}

	.storeCreatMenu {
		display: flex;
		height: 80rpx;

		align-items: center;
		/*居中对齐*/

		.storeCreatMenuC {
			width: 56rpx;
			height: 56rpx;
		}

		.storeCreatMenuP {
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

		.storeCreatMenuS {
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

	.storeCreatMenuL {
		margin: 0 auto;
		margin-top: 40rpx;

		image {
			display: block;
			margin: 0 auto;
		}
	}

	.storeCreatNamep {
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

	.storeCreatName {
		border-radius: 4rpx 4rpx, 40rpx, 40rpx;
		background: rgba(128, 129, 145, 0.04);
		border-radius: 40rpx;
		display: flex;
		align-items: center;
		/*居中对齐*/
		/*两端对齐*/
		padding: 30rpx 30rpx 30rpx 30rpx;
		margin-top: 20rpx;

		.storeCreatNameName {
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

	.storeCreatColor {
		margin-top: 40rpx;
		display: flex;
		justify-content: space-between;
		/*两端对齐*/
		align-items: center;

		/*居中对齐*/
		.storeCreatColorP {
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

		.storeCreatColorColor {
			width: 32rpx;
			height: 32rpx;
			background: rgba(255, 206, 115, 1);
			border-radius: 100%;
		}
	}

	.storeCreatIfDay {
		margin-top: 40rpx;
		display: flex;
		justify-content: space-between;
		/*两端对齐*/
		align-items: center;

		/*居中对齐*/
		.storeCreatIfDayP {
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

		.storeCreatIfDayI {
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

	.storeCreatDay {
		margin-top: 40rpx;
		display: flex;
		align-items: center;
		/*居中对齐*/
		justify-content: space-between;

		/*两端对齐*/
		.storeCreatDayDay {
			display: flex;
			align-items: center;
			/*居中对齐*/
			justify-content: space-between;
			padding-right: 200rpx;

			/*两端对齐*/
			.storeCreatDayDayI {
				width: 96rpx;
				height: 96rpx;
				background: linear-gradient(180deg, rgba(154, 219, 127, 1) 0%, rgba(110, 169, 92, 1) 100%);
				border-radius: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.storeCreatDayDayP {

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

		.storeCreatDayPoint {
			display: flex;
			align-items: center;
			/*居中对齐*/
			justify-content: space-between;

			.storeCreatDayPointI {
				width: 96rpx;
				height: 96rpx;
				background: linear-gradient(270deg, rgba(255, 235, 162, 1) 0%, rgba(255, 134, 105, 1) 100%);
				border-radius: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.storeCreatDayPointP {

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
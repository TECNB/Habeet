<template>
	<navbar :navbarTo="'/menu/4'"></navbar>
	<view class="Store">
		<text class="StoreP">Welcome to Store</text>
		<swiper class="swiper" autoplay="true" easing-function="easeInOutCubic" v-if="state.ifshowswiper"
			@change="changeswiper" :current="state.currentswiper">
			<swiper-item v-for="(item, index) in state.storeWithTime" :key="index">
				<view class="StoreDetail">
					<view class="StoreDetailI" @click="tosaveStore(index)">
						<image src="@\static\StoreDetailI.png"
							style="width: 606rpx;height: 606rpx;position: absolute;" />
					</view>
					<view class="StoreDetailP" @click="tosaveStore(index)">
						<text>{{item.storeName}}</text>
						<text>{{item.storeDescribe}}</text>
						<text>{{item.storeHour}}小时{{item.storeMinute}}分钟</text>
					</view>

					<view class="StoreDetailPrice" @click="storeWithTimeDelete(index)">
						<image src="@/static/coin.svg" style="width: 34rpx;height: 34rpx;" />
						<text>X{{item.storePoint}}</text>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="StoreDetailNull" v-if="state.ifshowStoreDetailNull">
			<view class="StoreDetailI">
				<image src="@\static\StoreDetailI.png" style="width: 606rpx;height: 606rpx;position: absolute;" />
			</view>
			<view class="StoreDetailP">
				<text>还没有建立商品</text>
				<text>快去建立吧</text>
			</view>
		</view>
		<view class="StoreCreatB">
			<navigator url="../StoreCreat/StoreCreat" open-type="redirect">
				<image src="@\static\TargetTaskButton.svg" alt="#" style="width: 120rpx;height: 120rpx;" />
			</navigator>
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
	} from "../../store/time";
	import {
		useStoreStore
	} from "../../store/store";
	const url = inject('url');
	const user = useUserStore()
	const time = useTimeStore()
	const store = useStoreStore()


	const state = reactive({
		storeWithTime: [],
		ifshowswiper: false,
		ifshowStoreDetailNull: false,
		currentswiper: 0
	});
	onMounted(() => {
		store.data.storeName = ""
		store.data.storeDescribe = ""
		store.data.storeHour = 0
		store.data.storeMinute = 30
		store.data.storePoint = 1
		store.data.ifStoreUpdate = 0
		uni.request({
			url: url + '/store/get',
			method: "POST",
			data: user.data.userEmail,
			success: (res) => {
				console.log(res)
				for (let i = 0; i < res.data.data.length; i++) {
					state.storeWithTime.push({
						'storeName': res.data.data[i].storeName,
						'storeDescribe': res.data.data[i].storeDescribe,
						'storeHour': res.data.data[i].storeHour,
						'storeMinute': res.data.data[i].storeMinute,
						'storePoint': res.data.data[i].storePoint,
						'storeId': res.data.data[i].storeId
					})
				}
				if (res.data.data[0].ifStoreNull == 1) {
					state.ifshowStoreDetailNull = true
					state.ifshowswiper = false
				} else {
					state.ifshowStoreDetailNull = false
					state.ifshowswiper = true
				}
			}
		})
	})
	//下面的代码是应对[渲染层错误] [Component] <swiper>: current 属性无效，请修改 current 值的报错（不是很理解）
	const currentswiper = () => {
		state.currentswiper = this.detail.currentswiper
	}
	const tosaveStore = (index) => {
		store.data.storeName = state.storeWithTime[index].storeName
		store.data.storeDescribe = state.storeWithTime[index].storeDescribe
		store.data.storeHour = state.storeWithTime[index].storeHour
		store.data.storeMinute = state.storeWithTime[index].storeMinute
		store.data.storePoint = state.storeWithTime[index].storePoint

		store.data.ifStoreUpdate = 1
		store.data.storeId = state.storeWithTime[index].storeId

		uni.redirectTo({
			url: '../../pages/StoreCreat/StoreCreat'
		});
	}
	const storeWithTimeDelete = (index) => {
		uni.request({
			url: url + '/store/delete',
			method: "POST",
			data: {
				storeName: state.storeWithTime[index].storeName
			},
			success: (res) => {
				console.log(res)
				if (res.data.data.ifEnough == 1) {
					uni.showToast({
						icon: "none",
						title: '兑换成功'
					});
					state.storeWithTime.length--
					if (state.storeWithTime.length == 0) {
						state.ifshowStoreDetailNull = true
						state.ifshowswiper = false
					}
					// 从storeWithTime数组中移除已删除的目标数据
					state.storeWithTime.splice(index, 1);
					user.data.point = res.data.data.storePoint
				} else if (res.data.data.ifEnough == 0) {
					uni.showToast({
						icon: "none",
						title: '分数不足'
					});
				}
			}
		})
	}
	name: "Store"
</script>

<style lang="scss">
	.StoreDetailNull {
		margin: 0 auto;
		width: 510rpx;
		height: 800rpx;
		border-radius: 40rpx;
		background: rgba(128, 129, 145, 0.04);
		box-shadow: 8rpx 20rpx 40rpx 0rpx rgba(0, 0, 0, 0.06);

		.StoreDetailI {
			margin-top: 130rpx;
			width: 510rpx;
			height: 400rpx;
			border-radius: 40rpx;
			background: linear-gradient(180deg, rgba(205, 231, 255, 1) 0%, rgba(193, 225, 255, 1) 100%);
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.StoreDetailP {
			margin-top: 40rpx;

			text:nth-child(1) {
				display: block;
				height: 60rpx;
				font-size: 40rpx;
				font-weight: 700;
				line-height: 60rpx;
				color: rgba(108, 93, 211, 1);
				text-align: center;
				vertical-align: top;
			}

			text:nth-child(2) {
				display: block;

				height: 48rpx;
				font-size: 28rpx;
				font-weight: 600;
				line-height: 48rpx;
				color: rgba(207, 200, 255, 1);
				text-align: center;
				vertical-align: top;
			}

			text:nth-child(3) {
				display: block;
				margin-top: 20rpx;
				height: 32rpx;
				font-size: 22rpx;
				font-weight: 700;
				letter-spacing: 0rpx;
				line-height: 32rpx;
				color: rgba(94, 98, 114, 1);
				text-align: center;
				vertical-align: top;
			}
		}
	}

	.swiper {
		width: 600rpx;
		height: 1000rpx;
		margin: 0 auto;
		display: flex;
		align-items: center;
	}

	.Store {
		margin: 20rpx;

		.StoreP {
			height: 48rpx;
			font-size: 28rpx;
			font-weight: 600;
			letter-spacing: 0rpx;
			line-height: 48rpx;
			color: rgba(128, 129, 145, 1);
			text-align: left;
			vertical-align: top;
		}

		.StoreDetail {
			margin: 0 auto;
			margin-right: 40rpx;
			width: 510rpx;
			height: 800rpx;
			border-radius: 40rpx;
			background: rgba(128, 129, 145, 0.04);
			box-shadow: 8rpx 20rpx 40rpx 0rpx rgba(0, 0, 0, 0.06);

			.StoreDetailI {
				margin-top: 130rpx;
				width: 510rpx;
				height: 400rpx;
				border-radius: 40rpx;
				background: linear-gradient(180deg, rgba(205, 231, 255, 1) 0%, rgba(193, 225, 255, 1) 100%);
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.StoreDetailP {
				margin-top: 40rpx;

				text:nth-child(1) {
					display: block;
					height: 60rpx;
					font-size: 40rpx;
					font-weight: 700;
					line-height: 60rpx;
					color: rgba(108, 93, 211, 1);
					text-align: center;
					vertical-align: top;
				}

				text:nth-child(2) {
					display: block;

					height: 48rpx;
					font-size: 28rpx;
					font-weight: 600;
					line-height: 48rpx;
					color: rgba(207, 200, 255, 1);
					text-align: center;
					vertical-align: top;
				}

				text:nth-child(3) {
					display: block;
					margin-top: 20rpx;
					height: 32rpx;
					font-size: 22rpx;
					font-weight: 700;
					letter-spacing: 0rpx;
					line-height: 32rpx;
					color: rgba(94, 98, 114, 1);
					text-align: center;
					vertical-align: top;
				}
			}

			.StoreDetailPrice {
				margin: 0 auto;
				margin-top: 40rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 180rpx;
				height: 60rpx;
				opacity: 1;
				border-radius: 200rpx;
				background: linear-gradient(225deg, rgba(142, 150, 255, 1) 0%, rgba(108, 93, 211, 1) 100%);

				text {
					height: 48rpx;
					font-size: 32rpx;
					font-weight: 500;
					letter-spacing: 0rpx;
					line-height: 48rpx;
					color: rgba(255, 255, 255, 1);
					text-align: center;
					vertical-align: top;
					padding-left: 10rpx;
				}
			}
		}

		.StoreButton button {
			width: 236rpx;
			height: 96rpx;
			border-radius: 40rpx;
			background: rgba(108, 93, 211, 1);
			display: block;
			margin: 0 auto;
			border: none;
			outline: none; //消除默认点击蓝色边框效果
			margin-top: 150rpx;

			text {
				font-weight: 700;
				letter-spacing: 0rpx;
				line-height: 96rpx;
				color: rgba(255, 255, 255, 1);
				text-align: center;
				vertical-align: top;
				font-size: 30rpx;
			}
		}

		.StoreCreatB {
			position: absolute;
			right: 0;
			bottom: 0;
			width: 120rpx;
			height: 120rpx;
			margin-right: 40rpx;
			margin-bottom: 40rpx;
		}
	}
</style>
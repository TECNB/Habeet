<template>
	<uni-transition mode-class="fade" :show="tag.data.ifshowTagMenu" duration=300
		style="position: absolute; zIndex: 0;">
		<view class="tagMenu">
			<scroll-view class="tagMenuList" scroll-x="true" enable-flex="true">
				<view :class="item.className" v-for="(item, index) in state.tagWithTime" :key="index"
					@click="classChange(index)">
					<view class="tagMenuListDP">
						<text>{{item.tagName}}</text>
					</view>
				</view>
			</scroll-view>
			<view class="tagMenuDetail">
				<view class="tagMenuDetailD">
					<view class="tagMenuDetailD1">
						<view class="tagMenuDetailDI">
							<image src="@\static\CountDown_re.svg" />
						</view>
						<view class="tagMenuDetailDP">
							<text>{{tag.data.tagHour}}小时{{tag.data.tagMinute}}分钟</text>
						</view>
					</view>
					<view class="tagMenuDetailD2">
						<view class="tagMenuDetailDI">
						</view>
						<view class="tagMenuDetailDP">
							<text>{{tag.data.tagDescribe}}</text>
						</view>
					</view>
				</view>
				<view class="tagMenuDetailB">
					<button @click="timeBegin">
						<text>确定</text>
					</button>
				</view>
			</view>
		</view>
	</uni-transition>
</template>

<script setup>
	import {
		reactive,
		toRefs,
		onMounted,
		computed
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

	name: "tag-menu"
	const state = reactive({
		tagWithTime: [],
		hours: 0,
		minutes: 0,
		seconds: 0
	});

	onMounted(
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

				for (let i = 0; i < res.data.data.length; i++) {
					if (i == 0) {
						state.tagWithTime.push({
							'tagName': res.data.data[i].tagName,
							'tagDescribe': res.data.data[i].tagDescribe,
							'tagHour': res.data.data[i].tagHour,
							'tagMinute': res.data.data[i].tagMinute,
							'tagPoint': res.data.data[i].tagPoint,
							'className': "tagMenuListD1"
						})
					} else {
						state.tagWithTime.push({
							'tagName': res.data.data[i].tagName,
							'tagDescribe': res.data.data[i].tagDescribe,
							'tagHour': res.data.data[i].tagHour,
							'tagMinute': res.data.data[i].tagMinute,
							'tagPoint': res.data.data[i].tagPoint,
							'className': "tagMenuListD"
						})
					}
				}
			}
		})
	)

	const formatTime = (time) => {
		return String(time).padStart(2, '0');
	};

	const classChange = (index) => {
		state.tagWithTime.forEach((item) => {
			item.className = "tagMenuListD"; // 先将所有日期的 className 属性设置为 Num
		});
		state.tagWithTime[index].className = "tagMenuListD1"; // 将点击的日期的 className 属性设置为 NumCenter

		time.data.ifstart = false
		tag.data.tagName = state.tagWithTime[index].tagName
		tag.data.tagDescribe = state.tagWithTime[index].tagDescribe
		tag.data.tagPoint = state.tagWithTime[index].tagPoint
		tag.data.tagHour = state.tagWithTime[index].tagHour
		tag.data.tagMinute = state.tagWithTime[index].tagMinute

		// 获取格式化后的时间
		time.data.formattedTime = computed(() => {
			state.hours = Math.floor(time.data.remainingTime / 3600);
			state.minutes = Math.floor((time.data.remainingTime % 3600) / 60);
			state.seconds = Math.floor(time.data.remainingTime % 60);
			return `${formatTime(tag.data.tagHour)}:${formatTime(tag.data.tagMinute)}:${formatTime(0)}`;
		});
	};
	const timeBegin = () => {
		tag.data.ifshowTagMenu = !tag.data.ifshowTagMenu

		time.data.remainingTime = (tag.data.tagHour * 3600) + (tag.data.tagMinute * 60) + tag.data.tagSecond

		time.data.formattedTime = computed(() => {
			state.hours = Math.floor(time.data.remainingTime / 3600);
			state.minutes = Math.floor((time.data.remainingTime % 3600) / 60);
			state.seconds = Math.floor(time.data.remainingTime % 60);
			return `${formatTime(state.hours)}:${formatTime(state.minutes)}:${formatTime(state.seconds)}`;
		});
	}
</script>

<style lang="scss">
	.tagMenu {
		position: absolute;
		bottom: -33rpx;
		z-index: 0;
		width: 750rpx;
		height: 330rpx;

		border-radius: 20rpx;
		background: linear-gradient(225deg, rgba(142, 150, 255, 1) 0%, rgba(108, 93, 211, 1) 100%);

		.tagMenuList {
			width: 654rpx;
			height: 100rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			margin-top: 30rpx;

			.tagMenuListD {
				margin-right: 30rpx;
				display: inline-block;

				.tagMenuListDP {
					width: 150rpx;
					height: 52rpx;
					padding-left: 20rpx;
					padding-right: 20rpx;
					border-radius: 80rpx;
					background: rgba(250, 250, 255, 1);
					text-align: center;

					text {
						display: block;
						font-size: 24rpx;
						font-weight: 550;
						line-height: 52rpx;
						color: rgba(108, 93, 211, 1);
					}
				}
			}

			.tagMenuListD1 {
				margin-right: 30rpx;
				display: inline-block;

				.tagMenuListDP {
					width: 150rpx;
					height: 52rpx;
					padding-left: 20rpx;
					padding-right: 20rpx;
					border-radius: 80rpx;
					background: rgba(207, 200, 255, 1);
					text-align: center;

					text {
						display: block;
						font-size: 24rpx;
						font-weight: 550;
						line-height: 52rpx;
						color: rgba(108, 93, 211, 1);

					}
				}
			}
		}


		.tagMenuDetail {
			position: absolute;
			left: 50rpx;
			bottom: 40rpx;
			width: 654rpx;
			height: 152rpx;
			border-radius: 20rpx;
			background: rgba(250, 250, 255, 1);


			display: flex;
			align-items: center;
			justify-content: center;



			.tagMenuDetailD {
				width: 800rpx;
				padding: 55rpx;

				.tagMenuDetailD1 {
					display: flex;
					align-items: center;


					.tagMenuDetailDI {
						width: 30rpx;
						height: 30rpx;

						image {
							width: 30rpx;
							height: 30rpx;
						}
					}

					.tagMenuDetailDP {
						margin-left: 10rpx;

						text {
							width: 35rpx;
							font-size: 24rpx;
							font-weight: 400;
							line-height: 35rpx;
							color: rgba(108, 93, 211, 1);

						}
					}
				}

				.tagMenuDetailD2 {
					display: flex;
					align-items: center;


					.tagMenuDetailDI {
						width: 30rpx;
						height: 30rpx;
						background: rgba(255, 204, 1, 1);
						border-radius: 50%;
					}

					.tagMenuDetailDP {
						height: 50rpx;
						margin-left: 10rpx;

						text {
							width: 35rpx;
							font-size: 24rpx;
							font-weight: 400;
							line-height: 35rpx;
							color: rgba(108, 93, 211, 1);

						}
					}
				}
			}

			.tagMenuDetailB {
				display: flex;
				justify-content: center;
				align-items: center;
				padding-right: 20rpx;
				width: 654rpx;
				height: 230rpx;

				button {
					display: block;

					width: 160rpx;
					height: 60rpx;
					border-radius: 40rpx;
					border: none;
					outline: none; //消除默认点击蓝色边框效果
					background: rgba(108, 93, 211, 1);

					font-size: 24rpx;
					font-weight: 700;
					letter-spacing: 0rpx;
					line-height: 60rpx;
					color: rgba(255, 255, 255, 1);
					text-align: center;
				}
			}
		}
	}
</style>
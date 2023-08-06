<template>
	<view class="Tag">
		<navbar :navbarTo="'/menu/3'"></navbar>
		<scroll-view class="TagDetailList" scroll-y="true" enable-flex="true" v-if="!state.ifshowTagDetailBNull">
			<view class="TagDetail" v-for="(item, index) in state.tagWithTime" :key="index">
				<view class="TagDetailI">
					<image src="@\static\TagDetailI.svg" style="width: 100rpx;height: 110rpx;" />
				</view>
				<view class="TagDetailP">
					<text>{{item.tagName}}</text>
					<text>{{item.tagDescribe}}</text>
				</view>
				<uni-transition mode-class="fade" :show="tag.data.ifshowTagDetailB"
					style="position: absolute;zIndex: 0;right: 100rpx;">
					<view class="TagDetailB" @click="tosaveTag(index)">
						<image src="@\static\TagDetailB.svg" style="width: 32rpx;height: 32rpx;" />
					</view>
				</uni-transition>
				<uni-transition mode-class="fade" :show="tag.data.ifshowTagDetailBDelete"
					style="position: absolute;zIndex: 0;right: 100rpx;">
					<view class="TagDetailBDelete" @click="TagTaskPATDelete(index)">
						<image src="@/static/Union.png"></image>
					</view>
				</uni-transition>
			</view>
		</scroll-view>

		<view class="TagDetail" v-if="state.ifshowTagDetailBNull">
			<view class="TagDetailI">
				<image src="@\static\TagDetailI.svg" style="width: 100rpx;height: 110rpx;" />
			</view>
			<view class="TagDetailP">
				<text>还没有建立标签</text>
				<text>快去建立吧</text>
			</view>

		</view>

		<view class="TagDetailCreatB">
			<navigator url="../TagCreat/TagCreat" open-type="redirect">
				<image src="@\static\TargetTaskButton.svg" alt="#" style="width: 120rpx;height: 120rpx;" />
			</navigator>
		</view>
		<uni-popup ref="popup" type="dialog">
			<!--mode="base"为对话框加两个按钮的形式-->
			<!--before-close为是否拦截按钮事件，如为true，则不会关闭对话框，关闭需要手动执行 uni-popup 的 close 方法-->
			<uni-popup-dialog type="error" mode="base" title="确定要删除吗?" content="删除后将会从您的标签移除数据" :duration="2000"
				:before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script setup>
	name: "Tag"
	import {
		reactive,
		toRefs,
		onMounted,
		watch,
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
	import {
		useTimeStore
	} from "../../store/time";
	const url = inject('url');
	const user = useUserStore()
	const tag = useTagStore()
	const time = useTimeStore()

	const state = reactive({
		tagWithTime: [],
		ifshowButton: true,
		ifshowTagDetailBNull: false
	});

	onMounted(() => {
			tag.data.tagPoint = 1
			tag.data.ifTagUpdate = 0
			uni.request({
				url: url + '/tag/get',
				method: "POST",
				data: user.data.userEmail,
				success: (res) => {
					console.log(res)
					//如果标签数为0，则将提示的信息放出来
					if (res.data.data[0].ifTagNull == 1) {
						state.ifshowTagDetailBNull = true
						tag.data.tagHour = 0
						tag.data.tagMinute = 30

					} else {
						tag.data.tagName = ""
						tag.data.tagDescribe = ""
						state.ifshowTagDetailBNull = false
						tag.data.tagHour = res.data.data[0].tagHour
						tag.data.tagMinute = res.data.data[0].tagMinute
						for (let i = 0; i < res.data.data.length; i++) {
							state.tagWithTime.push({
								'tagName': res.data.data[i].tagName,
								'tagDescribe': res.data.data[i].tagDescribe,
								'tagHour': res.data.data[i].tagHour,
								'tagMinute': res.data.data[i].tagMinute,
								'tagPoint': res.data.data[i].tagPoint,
								'tagId': res.data.data[i].id
							})
						}
					}
				}
			})

		}

	)

	const tosaveTag = (index) => {
		tag.data.tagName = state.tagWithTime[index].tagName
		tag.data.tagDescribe = state.tagWithTime[index].tagDescribe
		tag.data.tagHour = state.tagWithTime[index].tagHour
		tag.data.tagMinute = state.tagWithTime[index].tagMinute
		tag.data.tagPoint = state.tagWithTime[index].tagPoint

		tag.data.ifTagUpdate = 1
		tag.data.tagId = state.tagWithTime[index].tagId
		uni.redirectTo({
			url: '../../pages/TagCreat/TagCreat'
		});
	}

	let popup = ref(null);
	const TagTaskPATDelete = (index) => {
		popup.value.open() //记得.value然后调用函数
		state.index = index
	}
	const confirm = () => {
		popup.value.close()
		uni.request({
			url: url + '/tag/delete',
			method: "POST",
			data: state.tagWithTime[state.index].tagName,
			success: (res) => {
				uni.showToast({
					icon: "none",
					title: '删除标签'
				});
				state.tagWithTime.length--
				if (state.tagWithTime.length == 0) {
					state.ifshowTagDetailBNull = true
				}
				// 从tagWithTime数组中移除已删除的目标数据
				state.tagWithTime.splice(state.index, 1);
			}
		})
	}

	const close = () => {
		popup.value.close()
	}
</script>

<style lang="scss">
	.TagDetailBDelete {
		width: 60rpx;
		height: 60rpx;
		background: linear-gradient(225deg, rgba(142, 150, 255, 1) 0%, rgba(108, 93, 211, 1) 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			width: 20rpx;
			height: 20rpx;
		}
	}

	.TagDetailList {
		height: 1500rpx;
	}

	.TagDetail {
		display: flex;
		align-items: center;
		margin: 20rpx;
		margin-top: 60rpx;
		padding: 40rpx;
		border-radius: 40rpx;
		background: rgba(250, 250, 255, 1);


		.TagDetailI {
			width: 96rpx;
			height: 96rpx;
			background: linear-gradient(180deg, rgba(226, 189, 255, 1) 0%, rgba(219, 176, 253, 1) 100%);
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.TagDetailP {
			text {
				width: 420rpx;
				padding-left: 40rpx;
			}

			text:nth-child(1) {
				display: block;
				height: 48rpx;
				font-size: 32rpx;
				font-weight: 700;
				letter-spacing: 0rpx;
				line-height: 48rpx;
				color: rgba(94, 98, 114, 1);
				text-align: left;
				vertical-align: top;

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

		.TagDetailB {
			width: 64rpx;
			height: 64rpx;
			background: rgba(160, 215, 231, 1);
			border-radius: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.TagDetailCreatB {
		position: fixed;
		right: 20rpx;
		bottom: 80rpx;
		width: 120rpx;
		height: 120rpx;
		margin-right: 40rpx;
		margin-bottom: 40rpx;
	}
</style>
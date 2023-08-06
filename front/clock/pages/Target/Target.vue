<template>
	<view class="Target">
		<navbar :navbarTo="'/menu/2'"></navbar>
		<target-day></target-day>
		<target-nav></target-nav>

		<text class="TargetWords" v-if="target.data.Doing"> 随时完成</text>
		<view class="TargetTask" v-if="target.data.Doing" v-for="(item, index) in state.targetNoTime" :key="index">
			<view class="TargetTaskDetail">
				<view class="TargetTaskImage" @click="tosaveTargetNoTime(index)">
					<image src="@/static/TargetTaskImage.svg" style="width: 96rpx;height: 96rpx;" />
				</view>
				<view class="TargetTaskName" @click="tosaveTargetNoTime(index)">
					<text>{{item.targetName}}</text>
					<text>{{item.targetDescribe}}</text>
				</view>
				<uni-transition mode-class="fade" :show="target.data.ifshowTargetTaskPAT"
					style="position: absolute;zIndex: 0;right: 100rpx;">
					<view class="TargetTaskPAT" v-if="target.data.ifshowTargetTaskPAT">
						<view class="TargetTaskP" @click="targetNoTimeDelete(index)">
							<view>
								<image src="@/static/coin.svg" style="width: 34rpx;height: 34rpx;align-items:center;" />
							</view>
							<view>
								<text>X{{item.targetPoint}}</text>
							</view>
						</view>

						<view class="TargetTaskT">
							<text>任意时间</text>
						</view>
					</view>
				</uni-transition>
				<uni-transition mode-class="fade" :show="target.data.ifshowTargetTaskPATDelete"
					style="position: absolute;zIndex: 0;right: 125rpx;">
					<view class="TargetTaskPATDelete" @click="TargetTaskPATDelete(index)">
						<image src="@/static/Union.png"></image>
					</view>
				</uni-transition>
			</view>
		</view>

		<view class="TargetTask" v-if="target.data.ifshowTargetTaskNull0">
			<view class="TargetTaskDetail">
				<view class="TargetTaskImage">
					<image src="@/static/TargetTaskImage.svg" style="width: 96rpx;height: 96rpx;" />
				</view>
				<view class="TargetTaskName">
					<text>还没有随时完成的目标</text>
					<text>快来建立吧</text>
				</view>
				<view class="TargetTaskPAT">

				</view>
			</view>
		</view>


		<text class="TargetWords" v-if="target.data.Doing"> 限时完成</text>
		<view class="TargetTask" v-if="target.data.Doing" v-for="(item, index) in state.targetWithTime" :key="index">
			<view class="TargetTaskDetail">
				<view class="TargetTaskImage" @click="tosaveTargetWithTime(index)">
					<image src="@/static/TargetTaskImage.svg" style="width: 96rpx;height: 96rpx;" />
				</view>
				<view class="TargetTaskName" @click="tosaveTargetWithTime(index)">
					<text>{{item.targetName}}</text>
					<text>{{item.targetDescribe}}</text>
				</view>
				<uni-transition mode-class="fade" :show="target.data.ifshowTargetTaskPAT"
					style="position: absolute;zIndex: 0;right: 100rpx;">
					<view class="TargetTaskPAT">
						<view class="TargetTaskP" @click="targetWithTimeDelete(index)">
							<view class="TargetTaskPi1">
								<image src="@/static/coin.svg" style="width: 34rpx;height: 34rpx;align-items:center;" />
							</view>
							<view class="TargetTaskPp1">
								<text>X{{item.targetPoint}}</text>
							</view>
						</view>

						<view class="TargetTaskT">
							<text>{{target.data.dayDiff[index]}}</text>
							<text v-show="target.data.ifshowDay[index]">天</text>
						</view>
					</view>
				</uni-transition>
				<uni-transition mode-class="fade" :show="target.data.ifshowTargetTaskPATDelete"
					style="position: absolute;zIndex: 0;right: 125rpx;">
					<view class="TargetTaskPATDelete" @click="TargetTaskPATDelete2(index)">
						<image src="@/static/Union.png"></image>
					</view>
				</uni-transition>
			</view>
		</view>
		<view class="TargetTask" v-if="target.data.ifshowTargetTaskNull1">
			<view class="TargetTaskDetail">
				<view class="TargetTaskImage">
					<image src="@/static/TargetTaskImage.svg" style="width: 96rpx;height: 96rpx;" />
				</view>
				<view class="TargetTaskName">
					<text>还没有限时完成的目标</text>
					<text>快来建立吧</text>
				</view>
				<view class="TargetTaskPAT">

				</view>
			</view>
		</view>

		<text class="TargetWords" v-if="target.data.Done"> 已经完成</text>
		<view class="TargetTask" v-if="target.data.Done" v-for="(item, index) in state.targetCompleted" :key="index">
			<view class="TargetTaskDetail">
				<view class="TargetTaskImage" @click="tosaveTargetCompleted(index)">
					<image src="@/static/TargetTaskImage.svg" style="width: 96rpx;height: 96rpx;" />
				</view>
				<view class="TargetTaskName" @click="tosaveTargetCompleted(index)">
					<text>{{item.targetName}}</text>
					<text>{{item.targetDescribe}}</text>
				</view>
				<uni-transition mode-class="fade" :show="target.data.ifshowTargetTaskPAT"
					style="position: absolute;zIndex: 0;right: 100rpx;">
					<view class="TargetTaskPAT">
						<view class="TargetTaskP" @click="targetCompletedDelete(index)">
							<view class="TargetTaskPi1">
								<image src="@/static/coin.svg" style="width: 34rpx;height: 34rpx;align-items:center;" />
							</view>
							<view class="TargetTaskPp1">
								<text>X{{item.targetPoint}}</text>
							</view>
						</view>

						<view class="TargetTaskT">
							<text>完成</text>
						</view>
					</view>
				</uni-transition>
				<uni-transition mode-class="fade" :show="target.data.ifshowTargetTaskPATDelete"
					style="position: absolute;zIndex: 0;right: 125rpx;">
					<view class="TargetTaskPATDelete" @click="TargetTaskPATDelete3(index)">
						<image src="@/static/Union.png"></image>
					</view>
				</uni-transition>
			</view>
		</view>
		<view class="TargetTask" v-if="target.data.ifshowTargetTaskNull2">
			<view class="TargetTaskDetail">
				<view class="TargetTaskImage">
					<image src="@/static/TargetTaskImage.svg" style="width: 96rpx;height: 96rpx;" />
				</view>
				<view class="TargetTaskName">
					<text>还没有已经完成的目标</text>
					<text>快去完成吧</text>
				</view>
				<view class="TargetTaskPAT">

				</view>
			</view>
		</view>

		<text class="TargetWords" v-if="target.data.Expire">已经过期</text>
		<view class="TargetTask" v-if="target.data.Expire" v-for="(item, index) in state.targetExpire" :key="index">
			<view class="TargetTaskDetail">
				<view class="TargetTaskImage" @click="tosaveTargetExpire(index)">
					<image src="@/static/TargetTaskImage.svg" style="width: 96rpx;height: 96rpx;" />
				</view>
				<view class="TargetTaskName" @click="tosaveTargetExpire(index)">
					<text>{{item.targetName}}</text>
					<text>{{item.targetDescribe}}</text>
				</view>
				<uni-transition mode-class="fade" :show="target.data.ifshowTargetTaskPAT"
					style="position: absolute;zIndex: 0;right: 100rpx;">
					<view class="TargetTaskPAT">
						<view class="TargetTaskP" @click="targetExpireDelete(index)">
							<view class="TargetTaskPi1">
								<image src="@/static/coin.svg" style="width: 34rpx;height: 34rpx;align-items:center;" />
							</view>
							<view class="TargetTaskPp1">
								<text>X{{item.targetPoint}}</text>
							</view>
						</view>

						<view class="TargetTaskT">
							<text>过期</text>
						</view>
					</view>
				</uni-transition>
				<uni-transition mode-class="fade" :show="target.data.ifshowTargetTaskPATDelete"
					style="position: absolute;zIndex: 0;right: 125rpx;">
					<view class="TargetTaskPATDelete" @click="TargetTaskPATDelete4(index)">
						<image src="@/static/Union.png"></image>
					</view>
				</uni-transition>
			</view>
		</view>
		<view class="TargetTask" v-if="target.data.ifshowTargetTaskNull3">
			<view class="TargetTaskDetail">
				<view class="TargetTaskImage">
					<image src="@/static/TargetTaskImage.svg" style="width: 96rpx;height: 96rpx;" />
				</view>
				<view class="TargetTaskName">
					<text>还没有已经过期的目标</text>
					<text>继续保持吧</text>
				</view>
				<view class="TargetTaskPAT">

				</view>
			</view>
		</view>

		<view class="TargetTaskButton" v-if="state.ifshowButton">
			<navigator url="../TargetCreat/TargetCreat" open-type="redirect">
				<image src="@\static\TargetTaskButton.svg" alt="#" style="width: 120rpx;height: 120rpx;" />
			</navigator>

		</view>
		<uni-popup ref="popup" type="dialog">
			<!--mode="base"为对话框加两个按钮的形式-->
			<!--before-close为是否拦截按钮事件，如为true，则不会关闭对话框，关闭需要手动执行 uni-popup 的 close 方法-->
			<uni-popup-dialog type="error" mode="base" title="确定要删除吗?" content="删除后将会从您的目标移除数据" :duration="2000"
				:before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="popup2" type="dialog">
			<!--mode="base"为对话框加两个按钮的形式-->
			<!--before-close为是否拦截按钮事件，如为true，则不会关闭对话框，关闭需要手动执行 uni-popup 的 close 方法-->
			<uni-popup-dialog type="error" mode="base" title="确定要删除吗?" content="删除后将会从您的目标移除数据" :duration="2000"
				:before-close="true" @close="close" @confirm="confirm2"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="popup3" type="dialog">
			<!--mode="base"为对话框加两个按钮的形式-->
			<!--before-close为是否拦截按钮事件，如为true，则不会关闭对话框，关闭需要手动执行 uni-popup 的 close 方法-->
			<uni-popup-dialog type="error" mode="base" title="确定要删除吗?" content="删除后将会从您的目标移除数据" :duration="2000"
				:before-close="true" @close="close" @confirm="confirm3"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="popup4" type="dialog">
			<!--mode="base"为对话框加两个按钮的形式-->
			<!--before-close为是否拦截按钮事件，如为true，则不会关闭对话框，关闭需要手动执行 uni-popup 的 close 方法-->
			<uni-popup-dialog type="error" mode="base" title="确定要删除吗?" content="删除后将会从您的目标移除数据" :duration="2000"
				:before-close="true" @close="close" @confirm="confirm4"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script setup>
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
		useTargetStore
	} from "../../store/target";
	import {
		useUserStore
	} from "../../store/user";
	const url = inject('url');
	const user = useUserStore()
	const state = reactive({
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
	name: "target"
	const target = useTargetStore()

	if (target.data.Done || target.data.Expire) {
		target.data.ifshowTargetTaskNull0 = false
		target.data.ifshowTargetTaskNull1 = false
	}

	onMounted(() => {
		target.data.targetName = ""
		target.data.targetDescribe = ""
		target.data.targetHour = ""
		target.data.deadline = ""
		target.data.targetPoint = 0

		target.data.ifTargetUpdate = 0
		uni.request({
			url: url + '/target/get',
			method: "POST",
			data: {
				userEmail: user.data.userEmail,
				ifTargetUpdate: 0
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

						//下面的是提前得出目标的时间差
						target.data.dayDiff = []
						target.data.ifshowDay = []
						target.data.deadlineDate.forEach((item) => {
							console.log("在这里")
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

								const timeString =
									`${hours}:${minutes.toString().padStart(2, '0')}`;
								dayDiff = timeString;
								target.data.ifshowDay.push(false);
							}
							target.data.dayDiff.push(dayDiff)
						});

						state.targetWithTime.push({
							'targetName': res.data.data[i].targetName,
							'targetDescribe': res.data.data[i].targetDescribe,
							'targetPoint': res.data.data[i].targetPoint,
							'deadline': res.data.data[i].deadline,
							'targetId': res.data.data[i].targetId
						})
						console.log(state.targetWithTime)

					} else if (res.data.data[i].status == 2) {
						state.targetCompleted.push({
							'targetName': res.data.data[i].targetName,
							'targetDescribe': res.data.data[i].targetDescribe,
							'targetPoint': res.data.data[i].targetPoint,
							'deadline': res.data.data[i].deadline,
							'targetId': res.data.data[i].targetId
						})
					} else if (res.data.data[i].status == 3) {
						state.targetExpire.push({
							'targetName': res.data.data[i].targetName,
							'targetDescribe': res.data.data[i].targetDescribe,
							'targetPoint': res.data.data[i].targetPoint,
							'deadline': res.data.data[i].deadline,
							'targetId': res.data.data[i].targetId
						})
					}
				}
				//下面的变量记录不同数组的长度，并且作为全局的变量使用，方便计算是否为空
				target.data.targetNoTimeLength = state.targetNoTime.length
				target.data.targetWithTimeLength = state.targetWithTime.length
				target.data.targetCompletedLength = state.targetCompleted.length
				target.data.targetExpireLength = state.targetExpire.length

				if (target.data.Doing == true) {
					target.data.ifshowTargetTaskNull2 = false
					target.data.ifshowTargetTaskNull3 = false
					if (target.data.targetNoTimeLength == 0) {
						target.data.ifshowTargetTaskNull0 = true
					}
					if (target.data.targetWithTimeLength == 0) {
						target.data.ifshowTargetTaskNull1 = true
					}
				}
				if (target.data.Done == true) {
					target.data.ifshowTargetTaskNull0 = false
					target.data.ifshowTargetTaskNull1 = false
					target.data.ifshowTargetTaskNull3 = false
					if (target.data.targetCompletedLength == 0) {
						target.data.ifshowTargetTaskNull2 = true
					}
				}
				if (target.data.Expire == true) {
					target.data.ifshowTargetTaskNull0 = false
					target.data.ifshowTargetTaskNull1 = false
					target.data.ifshowTargetTaskNull2 = false
					if (target.data.targetExpireLength == 0) {
						target.data.ifshowTargetTaskNull3 = true
					}
				}
			}

		})
	})



	const tosaveTargetNoTime = (index) => {
		target.data.targetName = state.targetNoTime[index].targetName
		target.data.targetDescribe = state.targetNoTime[index].targetDescribe
		target.data.targetPoint = state.targetNoTime[index].targetPoint
		target.data.deadline = state.targetNoTime[index].deadline

		target.data.ifTargetUpdate = 1
		target.data.targetId = state.targetNoTime[index].targetId
		uni.redirectTo({
			url: '../../pages/TargetCreat/TargetCreat'
		});
	}
	const tosaveTargetWithTime = (index) => {
		target.data.targetName = state.targetWithTime[index].targetName
		target.data.targetDescribe = state.targetWithTime[index].targetDescribe
		target.data.targetPoint = state.targetWithTime[index].targetPoint
		target.data.deadline = state.targetWithTime[index].deadline

		target.data.ifTargetUpdate = 1
		target.data.targetId = state.targetWithTime[index].targetId
		uni.redirectTo({
			url: '../../pages/TargetCreat/TargetCreat'
		});
	}

	const tosaveTargetCompleted = (index) => {
		target.data.targetName = state.targetCompleted[index].targetName
		target.data.targetDescribe = state.targetCompleted[index].targetDescribe
		target.data.targetPoint = state.targetCompleted[index].targetPoint
		target.data.deadline = state.targetCompleted[index].deadline

		target.data.ifTargetUpdate = 1
		target.data.targetId = state.targetCompleted[index].targetId
		uni.redirectTo({
			url: '../../pages/TargetCreat/TargetCreat'
		});
	}
	const tosaveTargetExpire = (index) => {
		target.data.targetName = state.targetExpire[index].targetName
		target.data.targetDescribe = state.targetExpire[index].targetDescribe
		target.data.targetPoint = state.targetExpire[index].targetPoint
		target.data.deadline = state.targetExpire[index].deadline

		target.data.ifTargetUpdate = 1
		target.data.targetId = state.targetExpire[index].targetId
		uni.redirectTo({
			url: '../../pages/TargetCreat/TargetCreat'
		});
	}

	let popup = ref(null);
	let popup2 = ref(null);
	let popup3 = ref(null);
	let popup4 = ref(null);
	const TargetTaskPATDelete = (index) => {
		popup.value.open() //记得.value然后调用函数
		state.index = index
	}
	const TargetTaskPATDelete2 = (index) => {
		popup2.value.open() //记得.value然后调用函数
		state.index = index
	}
	const TargetTaskPATDelete3 = (index) => {
		popup3.value.open() //记得.value然后调用函数
		state.index = index
	}
	const TargetTaskPATDelete4 = (index) => {
		popup4.value.open() //记得.value然后调用函数
		state.index = index
	}
	const confirm = () => {
		popup.value.close()
		uni.request({
			url: url + '/target/delete',
			method: "POST",
			data: {
				targetName: state.targetNoTime[state.index].targetName,
				userEmail: user.data.userEmail,
				ifPoints: 0,
				targetId: state.targetNoTime[state.index].targetId
			},
			success: (res) => {
				uni.showToast({
					icon: "none",
					title: '删除目标'
				});
				target.data.targetNoTimeLength--
				if (target.data.targetNoTimeLength == 0) {
					target.data.ifshowTargetTaskNull0 = true
				}
				// 从targetNoTime数组中移除已删除的目标数据
				state.targetNoTime.splice(state.index, 1);
				user.data.point = res.data.data.targetPoint
			}
		})
	}
	const confirm2 = () => {
		popup2.value.close()
		uni.request({
			url: url + '/target/delete',
			method: "POST",
			data: {
				targetName: state.targetWithTime[state.index].targetName,
				userEmail: user.data.userEmail,
				ifPoints: 0,
				targetId: state.targetWithTime[state.index].targetId
			},
			success: (res) => {
				uni.showToast({
					icon: "none",
					title: '删除目标'
				});
				target.data.targetWithTimeLength--
				if (target.data.targetWithTimeLength == 0) {
					target.data.ifshowTargetTaskNull1 = true
				}
				// 从targetWithTime数组中移除已删除的目标数据
				state.targetWithTime.splice(state.index, 1);
				user.data.point = res.data.data.targetPoint
			}
		})
	}
	const confirm3 = () => {
		popup3.value.close()
		uni.request({
			url: url + '/target/delete',
			method: "POST",
			data: {
				targetName: state.targetCompleted[state.index].targetName,
				userEmail: user.data.userEmail,
				ifPoints: 0,
				targetId: state.targetCompleted[state.index].targetId
			},
			success: (res) => {
				uni.showToast({
					icon: "none",
					title: '删除目标'
				});
				target.data.targetCompletedLength--
				if (target.data.targetCompletedLength == 0) {
					target.data.ifshowTargetTaskNull2 = true
				}
				// 从targetCompleted数组中移除已删除的目标数据
				state.targetCompleted.splice(state.index, 1);
				user.data.point = res.data.data.targetPoint
			}
		})
	}
	const confirm4 = () => {
		popup4.value.close()
		uni.request({
			url: url + '/target/delete',
			method: "POST",
			data: {
				targetName: state.targetExpire[state.index].targetName,
				userEmail: user.data.userEmail,
				ifPoints: 0,
				targetId: state.targetExpire[state.index].targetId
			},
			success: (res) => {
				uni.showToast({
					icon: "none",
					title: '删除目标'
				});
				target.data.targetExpireLength--
				if (target.data.targetExpireLength == 0) {
					target.data.ifshowTargetTaskNull3 = true
				}
				// 从targetExpire数组中移除已删除的目标数据
				state.targetExpire.splice(state.index, 1);
				user.data.point = res.data.data.targetPoint
			}
		})
	}

	const close = () => {
		popup.value.close()
		popup2.value.close()
		popup3.value.close()
		popup4.value.close()
	}
	const targetNoTimeDelete = (index) => {
		uni.request({
			url: url + '/target/delete',
			method: "POST",
			data: {
				userEmail: user.data.userEmail,
				targetName: state.targetNoTime[index].targetName,
				ifPoints: 1,
				targetId: state.targetNoTime[state.index].targetId
			},
			success: (res) => {
				uni.showToast({
					icon: "none",
					title: '完成目标'
				});
				target.data.targetNoTimeLength--
				target.data.targetCompletedLength++
				if (target.data.targetNoTimeLength == 0) {
					target.data.ifshowTargetTaskNull0 = true
				}
				state.targetCompleted.push({
					'targetName': state.targetNoTime[index].targetName,
					'targetDescribe': state.targetNoTime[index].targetDescribe,
					'targetPoint': state.targetNoTime[index].targetPoint,
					'deadline': state.targetNoTime[index].deadline,
					'targetId': state.targetNoTime[index].targetId
				})
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
				userEmail: user.data.userEmail,
				targetName: state.targetWithTime[index].targetName,
				ifPoints: 1,
				targetId: state.targetWithTime[state.index].targetId
			},
			success: (res) => {
				uni.showToast({
					icon: "none",
					title: '完成目标'
				});
				target.data.targetWithTimeLength--
				target.data.targetCompletedLength++
				if (target.data.targetWithTimeLength == 0) {
					target.data.ifshowTargetTaskNull1 = true
				}
				state.targetCompleted.push({
					'targetName': state.targetWithTime[index].targetName,
					'targetDescribe': state.targetWithTime[index].targetDescribe,
					'targetPoint': state.targetWithTime[index].targetPoint,
					'deadline': state.targetWithTime[index].deadline,
					'targetId': state.targetWithTime[index].targetId
				})
				// 从targetWithTime数组中移除已删除的目标数据
				state.targetWithTime.splice(index, 1);
				user.data.point = res.data.data.targetPoint
			}
		})
	}

	const targetCompletedDelete = (index) => {
		uni.showToast({
			icon: "none",
			title: '已经完成啦'
		});
	}
	const targetExpireDelete = (index) => {
		uni.showToast({
			icon: "none",
			title: '已经过期啦'
		});
	}
</script>

<style lang="scss">
	.TargetTaskPATDelete {
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

	.Target {
		margin: 0 20rpx 0 20rpx;
	}

	.TargetWords {
		margin-left: 20rpx;
		margin-top: 40rpx;
		width: 154rpx;
		height: 48rpx;
		font-size: 28rpx;
		font-weight: 600;
		letter-spacing: 0rpx;
		line-height: 48rpx;
		color: rgba(128, 129, 145, 1);
		text-align: left;
		vertical-align: top;
	}

	.TargetTaskButton {
		position: fixed;
		right: 20rpx;
		bottom: 80rpx;
		width: 120rpx;
		height: 120rpx;
		margin-right: 40rpx;
		margin-bottom: 40rpx;
	}

	.TargetTask {
		margin: 20rpx;
		margin-top: 20rpx;
		height: 224rpx;
		border-radius: 40rpx;
		background: rgba(128, 129, 145, 0.04);



		.TargetTaskDetail {
			height: 100%;
			display: flex;
			align-items: center;
			/*居中对齐*/
			margin: 40rpx;

			.TargetTaskName {
				padding-left: 40rpx;
				width: 320rpx;
			}

			.TargetTaskName text:nth-child(1) {
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

			.TargetTaskName text:nth-child(2) {
				height: 48rpx;
				font-size: 28rpx;
				font-weight: 600;
				letter-spacing: 0rpx;
				line-height: 48rpx;
				color: rgba(128, 129, 145, 1);
				text-align: left;
				vertical-align: top;

			}

			.TargetTaskPAT {


				.TargetTaskP {
					display: flex;
					width: 118rpx;
					height: 48rpx;
					opacity: 1;
					border-radius: 200rpx;
					background: rgba(255, 162, 192, 1);
					align-items: center;
					/*居中对齐*/
					justify-content: center;

					/*居中对齐*/
					view:nth-child(1) {
						width: 34rpx;
						height: 34rpx;
					}

					view:nth-child(2) {
						width: 28rpx;
						height: 32rpx;
						font-size: 22rpx;
						font-weight: 700;
						letter-spacing: 0rpx;
						line-height: 32rpx;
						color: rgba(128, 129, 145, 1);
						text-align: left;
						vertical-align: top;
						margin-left: 20rpx;
					}
				}

				.TargetTaskT {
					text-align: center;
					display: flex;
					align-items: center;
					/*居中对齐*/
					justify-content: center;

					text {
						height: 48rpx;
						font-size: 28rpx;
						font-weight: 600;
						letter-spacing: 0rpx;
						line-height: 48rpx;
						color: rgba(128, 129, 145, 1);

						vertical-align: top;
						padding-top: 10rpx;
					}
				}
			}


		}


	}
</style>
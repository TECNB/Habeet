<template>
	<uni-transition mode-class="slide-left" :show="state.showMenu" duration="300" style="position: absolute;zIndex: 2;">
		<time-menu :menuTo="props.navbarTo"></time-menu>
	</uni-transition>
	<view class="Nav">
		<view class="Nav_menu" v-if="time.data.showNav_menu">
			<image src="@\static\Filter.png" @click="ifshowMenu"
				style="width: 56rpx;height:56rpx;align-items:center;" />
			<view class="Nav_menuName">
				<p>{{user.data.userName}}</p>
			</view>
		</view>
		<view class="showPoints_Nav_userPic" v-if="state.showPoints_Nav_userPic">
			<view class="points" @click="toStore()">
				<view class="points_p1">
					<p>Points</p>
				</view>
				<!-- 动态 -->
				<view class="points_p2">
					<p>{{user.data.point}}</p>
				</view>
				<view class="points_coin">
					<image src="@\static\coin.png" style="width: 34rpx;height:34rpx;align-items:center;" />
				</view>
			</view>
			<view class="Nav_userPic">

				<image :src="user.data.picUrl" @click="toWx()" style="width: 80rpx;height:80rpx;border-radius: 100%;" />

			</view>
		</view>

		<view class="tagNavImg" v-if="state.showtagNavImg" @click="showTargetTaskPATDelete">
			<image src="@\static\tagNavImg.svg" style="width: 56rpx;height:56rpx;" />
		</view>
	</view>
	<uni-transition mode-class="fade" :show="state.showCover" duration="100" style="position: absolute;zIndex: 1;">
		<view class="cover" @click="back">

		</view>
	</uni-transition>

</template>

<script setup>
	import {
		reactive,
		toRefs,
		onMounted,
		provide
	} from "vue";


	name: "navbar"
	import {
		useTagStore
	} from "../../store/tag";
	import {
		useUserStore
	} from "../../store/user";
	import {
		useTimeStore
	} from "../../store/time";
	import {
		useTargetStore
	} from "../../store/target";

	const user = useUserStore()
	const tag = useTagStore()
	const time = useTimeStore()
	const target = useTargetStore()

	const props = defineProps({
		navbarTo: {
			type: String,
			required: true
		}
	})

	const state = reactive({
		name: "专注",
		showPoints_Nav_userPic: true,
		showtagNavImg: false,
		showMenu: false,
		showNav_menu: true,
		showCover: false,
	})
	const showTargetTaskPATDelete = () => {
		target.data.ifshowTargetTaskPATDelete = !target.data.ifshowTargetTaskPATDelete
		target.data.ifshowTargetTaskPAT = !target.data.ifshowTargetTaskPAT
		tag.data.ifshowTagDetailBDelete = !tag.data.ifshowTagDetailBDelete
		tag.data.ifshowTagDetailB = !tag.data.ifshowTagDetailB
	}
	const toStore = () => {
		uni.redirectTo({
			url: '../../pages/Store/Store'
		});
	}
	const toWx = () => {
		user.data.ifUpdate = 3
		uni.redirectTo({
			url: '../../pages/Wx/Wx'
		});
	}

	const ifshowMenu = () => {
		state.showtargetMenuDetail = !state.showtargetMenuDetail;
		state.showtargetArrowUp = !state.showtargetArrowUp;
		state.showtargetArrowDown = !state.showtargetArrowDown;
		time.data.showNav_menu = false;
		state.showMenu = true;
		state.showPoints_Nav_userPic = false;
		state.showCover = true;
	}

	const back = () => {
		state.showMenu = false;
		state.showCover = false;
		time.data.showNav_menu = true;
		if (props.navbarTo == "/menu/2" || props.navbarTo == "/menu/3") {
			state.showtagNavImg = true;
			state.showPoints_Nav_userPic = false;
		} else if (props.navbarTo == "/menu/6" || props.navbarTo == "/menu/7") {
			state.showtagNavImg = false;
			state.showPoints_Nav_userPic = false;
		} else {
			state.showPoints_Nav_userPic = true;
		}
	}
	if (props.navbarTo == "/menu/1") {
		state.name = "专注";
		state.showPoints_Nav_userPic = true;
		state.showtagNavImg = false;
		state.showMenu = false;
		time.data.showNav_menu = true;
	} else if (props.navbarTo == "/menu/2") {
		time.data.showNav_menu = true;
		state.name = "目标";
		state.showtagNavImg = true;
		state.showPoints_Nav_userPic = false;
		target.data.ifshowTargetTaskPATDelete = false
		target.data.ifshowTargetTaskPAT = true
	} else if (props.navbarTo == "/menu/3") {
		time.data.showNav_menu = true;
		state.name = "标签";
		state.showtagNavImg = true;
		state.showPoints_Nav_userPic = false;
		tag.data.ifshowTagDetailBDelete = false
		tag.data.ifshowTagDetailB = true
	} else if (props.navbarTo == "/menu/4") {
		time.data.showNav_menu = true;
		state.name = "商店";
	} else if (props.navbarTo == "/menu/5") {
		time.data.showNav_menu = true;
		state.name = "我的";
	} else if (props.navbarTo == "/menu/6") {
		time.data.showNav_menu = true;
		state.name = "设置";
		state.showPoints_Nav_userPic = false;
	} else if (props.navbarTo == "/menu/7") {
		time.data.showNav_menu = true;
		state.name = "关于";
		state.showPoints_Nav_userPic = false;
	}
</script>

<style lang="scss">
	.showPoints_Nav_userPic {
		position: absolute;
		right: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.Nav {
		display: flex;
		justify-content: space-between;
		/*两端对齐*/
		height: 80rpx;
		margin: 0 auto;
		padding-top: 20rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		align-items: center;
		/*居中对齐*/
	}

	.Nav_user {
		position: absolute;
		right: 20rpx;
		display: flex;
		align-items: center;
		/*居中对齐*/
	}

	.Nav_menuName {
		margin-left: 20rpx;
		height: 58rpx;
		font-size: 40rpx;
		font-weight: 700;
		letter-spacing: 0rpx;
		line-height: 58rpx;
		color: rgba(27, 32, 42, 1);
		text-align: left;
		vertical-align: top;

	}

	.Nav_menu {
		display: flex;
	}

	.points {
		width: 180rpx;
		height: 46rpx;
		position: absolute;
		right: 100rpx;
		border-radius: 45rpx;
		background: rgba(246, 247, 251, 1);
		border: 1.8rpx solid rgba(238, 240, 246, 1);
		display: flex;
		justify-content: space-between;
		/*居中对齐*/
		align-items: center;
		/*居中对齐*/
	}

	.points_p1 {
		display: inline-block;
		opacity: 1;
		/** 文本1 */
		font-size: 19.8rpx;
		font-weight: 400;
		letter-spacing: 0rpx;
		line-height: 30rpx;
		color: rgba(108, 93, 211, 1);
		text-align: center;
		vertical-align: top;
		padding-left: 16rpx;
	}

	.points_p2 {
		font-size: 23.4rpx;
		font-weight: 400;
		letter-spacing: 0rpx;
		line-height: 34rpx;
		color: rgba(207, 200, 255, 1);
		text-align: center;
		vertical-align: top;
		display: inline-block;

	}

	.points_coin {
		width: 34rpx;
		height: 34rpx;
		margin-right: 10rpx;
	}

	.cover {
		position: absolute;
		top: 0rpx;
		left: 0px;
		z-index: 1;
		width: 750rpx;
		height: 1500rpx;
		background: rgba(255, 255, 255, 0.7);
		backdrop-filter: saturate(180%) blur(20rpx);
	}
</style>
<template>
	<div class="avatar">
		<div class="avatarImage">
			<image :src="user.data.picUrl" style="width: 80rpx;height:80rpx;border-radius: 50%" />
		</div>
		<div class="avatarName">
			<!-- 动态 -->
			<p>{{user.data.userName}}</p>
		</div>
	</div>
</template>

<script setup>
	import {
		useUserStore
	} from "../../store/user";
	const user = useUserStore()
	name: "Avatar"
</script>

<style lang="scss">
	.avatar {
		margin-top: 20rpx;
	}

	.avatarImage {
		width: 80rpx;
		height: 80rpx;
		opacity: 1;
	}

	.avatarName {
		opacity: 1;
		font-size: 40rpx;
		font-weight: 700;
		letter-spacing: 0rpx;
		color: rgba(27, 32, 42, 1);
		text-align: left;
		vertical-align: top;
		margin-top: 16rpx;
	}
</style>
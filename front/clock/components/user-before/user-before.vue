<template>
	<navigator url="../../pages/User/User" open-type="redirect">
		<div class="userBefore">
			<div class="userBeforeImage">
				<image src="@\static\User.svg" style="width: 48rpx;height:48rpx;" />
			</div>
			<div class="userBeforeWords">
				<p>我的</p>
			</div>
		</div>
	</navigator>

</template>

<script setup>
	import {
		useRoute,
		useRouter
	} from 'vue-router';
	const router = useRouter();

	name: "UserBefore"
</script>

<style lang="scss">
	.userBefore {
		display: flex;
		margin-top: 64rpx;
	}

	.userBeforeImage {
		margin-left: 6rpx;
	}

	.userBeforeWords {
		font-size: 28rpx;
		font-weight: 600;
		letter-spacing: 0rpx;
		line-height: 48rpx;
		color: rgba(27, 32, 42, 1);
		text-align: left;
		vertical-align: top;
		margin-left: 32rpx;
	}
</style>
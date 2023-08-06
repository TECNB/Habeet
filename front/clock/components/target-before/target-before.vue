<template>
	<navigator url="../../pages/Target/Target" open-type="redirect">
		<div class="targetBefore">
			<div class="targetBeforeImage">
				<image src="@\static\Target.svg" style="width: 48rpx;height:48rpx;" />
			</div>
			<div class="targetBeforeWords">
				<p>目标</p>
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
	name: "TargetBefore"
</script>

<style lang="scss">
	.targetBefore {
		display: flex;
		margin-top: 64rpx;
	}

	.targetBeforeImage {
		margin-left: 6rpx;
	}

	.targetBeforeWords {
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
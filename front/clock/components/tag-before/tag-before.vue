<template>
	<navigator url="../../pages/Tag/Tag" open-type="redirect">
		<div class="tagBefore">
			<div class="tagBeforeImage">
				<image src="@\static\Tag.svg" style="width: 48rpx;height:48rpx;" />
			</div>
			<div class="tagBeforeWords">
				<p>标签</p>
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

	name: "TagBefore"
</script>

<style lang="scss">
	.tagBefore {
		display: flex;
		margin-top: 64rpx;
	}

	.tagBeforeImage {
		margin-left: 6rpx;
	}

	.tagBeforeWords {
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
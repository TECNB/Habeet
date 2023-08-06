<template>
	<navigator url="../../pages/Help/Help" open-type="redirect">
		<div class="helpBefore">
			<div class="helpBeforeImage">
				<image src="@\static\Help.svg" style="width: 48rpx;height:48rpx;" />
			</div>
			<div class="helpBeforeWords">
				<p>关于</p>
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
	name: "HelpBefore"
</script>

<style lang="scss">
	.helpBefore {
		display: flex;
		margin-top: 64rpx;
	}

	.helpBeforeImage {
		margin-left: 6rpx;
	}

	.helpBeforeWords {
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
<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="decrease" v-show="good.count > 0" @click.stop.prevent="decreaseGood">
			<span class="inner icon-remove_circle_outline"></span>
		</div>
		</transition>	
		
		<div class="count" v-show="good.count > 0">{{ good.count }}</div>
		<!-- 阻止冒泡 只发生自己的事件 -->
		<div class="add icon-add_circle" @click.stop.prevent="addGood"></div>
	</div>
</template>

<script>
	import Vue from 'vue';
	export default{
		props: {
			good: {
				type: Object
			}
		},
		// created() {
		// 	console.log(this.good)
		// },
		methods: {
			addGood(event) {
				if(!event._constructed){
					return;
				}
				if(!this.good.count){
					Vue.set(this.good,'count',1)
					// this.good.count = 1;
				}else{
					this.good.count++;
				}
				// 开发一个事件，让其把dom元素传递出去
				this.$emit('add', event.target);
			},
			decreaseGood(event) {
				if(this.good.count){
					this.good.count--;
				}
			},
			

		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.cartcontrol
		font-size: 0
		.decrease, .add
			display: inline-block
			padding: 6px
			opacity: 1 
			transform: translate3d(0,0,0)
			.inner
				display: inline-block
				line-height: 24px
				font-size: 24px
				color: rgb(135,142,205)
				transition: all 0.4s linear
				transform: rotate(0)
			&.move-enter-active, &.move-leave-active
				transition: all 0.4s linear
			&.move-enter, &.move-leave-active
				opacity: 0
				transform: translate3d(24px,0,0)
				.inner
					transform: rotate(180deg)
		.count
			display: inline-block
			vertical-align: top
			width: 12px
			padding-top: 6px
			line-height: 24px
			text-align: center
			font-size: 10px
			color: rgb(147, 153, 159)
		.add
			display: inline-block
			padding: 6px
			line-height: 24px
			font-size: 24px
			color: rgb(135,142,205)
</style>
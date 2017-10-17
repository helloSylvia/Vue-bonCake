<template>
	<div>
		<transition name="move">
			<div class="goodDetail" v-show="showFlag" ref="goodDetail">
				<div class="good-content">
					<div class="image-header">
						<img :src="detail.image">
						<div class="back" @click="hide">
							<i class="icon-arrow_lift"></i>
						</div>
						
					</div>
					<div class="content">
						<h1 class="title">{{ detail.name }}</h1>
						<div class="details">
							<span class="sell-count">月售{{ detail.sellCount }}</span>
							<span class="rating">好评率{{ detail.rating }}%</span>
						</div>
						<div class="price">
							<span class="now">¥{{ detail.price }}</span>
							<span class="old" v-show="detail.oldPrice">¥{{ detail.oldPrice }}</span>
						</div>
						<div class="cartcontrol-wrapper">
							<cartcontrol @add="addGood" :good="detail"></cartcontrol>
						</div>
						<!-- 为了让动画能够更流畅 为了让元素不是立马就隐藏 拿到的位置才更准确-->
						<transition name="fade">
							<div @click.stop.prevent="addFirst" class="buy" 
							v-show="!detail.count || detail.count === 0">加入购物车</div>
						</transition>
					</div>
					<split></split>
					<!-- 商品信息 -->
					<div class="info" v-if="detail.info">
						<h1 class="title">商品信息</h1>
						<p class="text">{{ detail.info }}</p>
					</div>
					<split></split>
					<!-- 商品评价 -->
					<div class="rating">
						<h1 class="title">商品评价</h1>
						<ratingselect :selectType="selectType" :onlyContent="onlyContent" 
						:desc="desc" :ratings="detail.ratings" @select="selectRating" @toggle="toggelContent"></ratingselect>
						<div class="rating-wrapper">
							<ul  v-show="detail.ratings && detail.ratings.length">
								<li class="rating-item border-1px" v-for="rating in detail.ratings " 
								v-show="needShow(rating.rateType,rating.text)">
									<div class="user">
										<span class="name">{{ rating.username }}</span>
										<img :src="rating.avatar" class="picture" width="12" height="12">
									</div>
									<div class="time">{{ rating.rateTime | formatDate }}</div>
									<p class="text">
										<span :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></span>
										{{ rating.text }}
									</p>
								</li>
							</ul>
							<div class="no-rating" v-show="!detail.ratings || !detail.ratings.length">暂无评价</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
		
	</div>
	
</template>

<script>
	import Vue from 'vue';
	import BScroll from 'better-scroll';
	import {formatDate} from 'common/js/date.js';
	import cartcontrol from 'components/cartcontrol/cartcontrol'
	import split from 'components/split/split'
	import ratingselect from 'components/ratingselect/ratingselect'

	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;

	export default{
		props: {
			detail:{
				type: Object
			}
		},
		data() {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: true,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			}
		},
		components: {
			cartcontrol,
			split,
			ratingselect
		},
		methods: {
			show() {
				this.showFlag = true;
				this.selectType = ALL;
				this.onlyContent = true;
				this.$nextTick(() => {
					if(!this.scroll){
						this.scroll = new BScroll(this.$refs.goodDetail,{
							click: true
						})
					}else{
						this.scroll.refresh();
					}
				})
				
			},
			hide() {
				this.showFlag = false;
			},
			addFirst(event) {
				// 防止pc多次点击
				if(!event._constructed){
					return;
				}
				this.$emit('add', event.target);
				Vue.set(this.detail,'count',1)
			},
			needShow(type,text) {
				// 只显示有内容的
				if(this.onlyContent && !text){
					return false;
				}
				// 选择的类型
				if(this.selectType === ALL){
					return true;
				}else{
					return type === this.selectType;
				}
			},
			addGood(target) {
				console.log(target)
				this.$emit('add', target);
			},
			// 参数不用写在上面的元素绑定中，其中自带
			selectRating(type) {
				this.selectType = type
				// 内容会变化，高度会变化，dom在更新，下一个时间周期才会改变
				this.$nextTick(() => {
					this.scroll.refresh();
				})
			},
			toggelContent() {
				this.onlyContent = !this.onlyContent
				this.$nextTick(() => {
					this.scroll.refresh();
				})
			}
		},
		filters: {
			formatDate(time) {
				let date = new Date(time);
				return formatDate(date,'yyyy-MM-dd hh:mm');
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
	.goodDetail
		position: fixed
		left: 0
		top: 0
		bottom: 48px
		z-index: 30
		width: 100%
		background: #fff
		transform: translate3d(0,0,0)
		&.move-enter-active, &.move-leave-active
			transition: all 0.2s linear
		&.move-enter, &.move-leave-active
			transform: translate3d(100%,0,0)
		.image-header
			position: relative
			width: 100%
			height: 0
			padding-top: 100%
			img
				position: absolute
				top: 0
				left:0
				width: 100%
				height: 100%
			.back
				position: absolute
				top: 10px
				left: 0
				.icon-arrow_lift
					display: block
					padding: 10px
					font-size: 20px
					color: #111
		.content
			position: relative
			padding: 18px
			.title
				margin-bottom: 8px
				line-height: 14px
				font-size: 14px
				font-weight: 700
				color: rgb(7,17,27)
			.details
				margin-bottom: 18px
				height: 10px
				line-height: 10px
				font-size: 0
				.sell-count, .rating
					font-size: 10px
					color: rgb(147,153,159)
				.sell-count
					margin-right: 12px
			.price
				font-weight: 700
				line-height: 24px
				.now
					margin-right: 8px
					font-size: 14px
					color: rgb(240,20,20)
				.old
					text-decoration: line-through
					font-size: 10px
					color: rgb(147,153,159)	
					
			.cartcontrol-wrapper
				position: absolute
				right: 12px
				bottom: 12px
			.buy
				position: absolute
				right: 18px
				bottom: 18px
				z-index: 10
				height: 24px
				line-height: 24px
				padding: 0 12px
				box-sizing: border-box
				border-radius: 12px
				font-size: 10px
				color: #fff
				background: rgb(135,142,205)
				opacity: 1
				&.fade-enter-active, fade-leave-active
					transition: all 0.2s
				&.fade-enter, &.fade-leave-active
					opacity: 0
					z-index: -1
		.info
			padding: 18px
			.title 
				line-height: 14px
				margin-bottom: 6px
				font-size: 14px
				color: rgb(7,17,27)
			.text
				line-height: 24px
				padding: 0 8px
				font-size: 12px
				color: rgb(77,85,93)
		.rating
			padding-top: 18px
			.title
				line-height: 14px
				margin-left: 18px
				font-size: 14px
				color: rgb(7,17,27)
			.rating-wrapper
				padding: 0 18px
				.rating-item
					position: relative
					padding: 16px 0
					border-1px(rgba(7,17,27,0.1))
					.user
						position: absolute
						right: 0
						top: 16px
						line-height: 12px
						font-size: 0
						.name
							display: inline-block
							vertical-align: top
							margin-right: 6px
							font-size: 10px
							color:rgb(147,153,159)
						.picture
							border-radius: 50%
					.time
						margin-bottom: 6px
						line-height: 12px
						font-size: 10px
						color: rgb(147,153,159)
					.text
						line-height: 16px
						font-size: 12px
						color: rgb(7,17,27)
						.icon-thumb_up, icon-thumb_down
							margin-right: 4px
							line-height: 16px
							font-size: 12px
						.icon-thumb_up
							color: rgb(0,160,220)
						.icon-thumb_down
							color: rgb(147,153,159)
				.no-rating
					padding: 16px 0
					font-size: 12px
					color: rgb(147,153,159)		
						
							
						
							
						
						
					
			

			
			
</style>



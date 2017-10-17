<template>
	<div class="seller" ref="seller">
		<div class="seller-content">
			<div class="overview">
				<h1 class="title">{{ seller.name }}</h1>
				<div class="desc border-1px">
					<star :size="36" :score="seller.score"></star>
					<span class="text">({{ seller.ratingCount }})</span>
					<span class="text">月售{{ seller.sellCount }}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{ seller.minPrice }}</span>元
						</div>

					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stress">{{ seller.deliveryPrice }}</span>元
						</div>

					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="stress">{{ seller.deliveryTime }}</span>分钟
						</div>

					</li>
				</ul>
				<div class="collec" @click="toggleCollect">
					<span class="icon-favorite" :class="{'active': favorite}"></span>
					<span class="text">{{ favoriteText }}</span>
				</div>
			</div>
			<split></split>
			<div class="notice">
				<h1 class="title">公告与活动</h1>
				<div class="content-wrapper">
					<p class="content">{{ seller.bulletin }}</p>
				</div>
				<ul v-if="seller.supports" class="supports">
					<li class="support-item border-1px" v-for="(item,index) in seller.supports">
						<span class="icon" :class="classMap[seller.supports[index].type]"></span>
						<span class="text">{{seller.supports[index].description}}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="sellerPics">
				<h1 class="title">商家实景</h1>
				<div class="pic-wrwpper" ref="picWrapper">
					<ul class="pic-list" ref="picList">
						<li class="pic-item" v-for="pic in seller.pics">
							<img :src="pic" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="sellerInfo">
				<h1 class="title">商家信息</h1>
				<ul>
					<li class="info-item" v-for="info in seller.infos">
						{{ info }}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import star from 'components/star/star'; 
	import split from 'components/split/split'
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				favorite: false
			}
		},
		computed: {
			favoriteText() {
				return this.favorite ? '已收藏' : '收藏';
			}
			
		},
		components: {
			star,
			split
		},
		created() {
	      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
	      
	    },
		watch: {
			'seller'() {
				this.$nextTick(() => {
					this._initScroll();
					this._initPics();
				})
				
			}
		},
		mounted() {
			this.$nextTick(() => {
				this._initScroll();
				this._initPics();
			})
		},
		methods: {
			toggleCollect() {
				if (!event._constructed) {
					return;
				}
				this.favorite = !this.favorite;
			},
			_initScroll() {
				if(!this.scroll){
			      	this.scroll = new BScroll(this.$refs.seller,{
			      		click: true
			      	})
				}else{
					this.scroll.refresh();
				}
			},
			_initPics() {
				if(this.seller.pics){
					let picWidth = 120;
					let margin = 6;
					// 计算ul宽度
					let width = (picWidth + margin) * this.seller.pics.length- margin
					// 给其设置上
					this.$refs.picList.style.width = width + 'px';
					this.$nextTick(() => {
						if(!this.picScroll){
							this.picScroll = new BScroll(this.$refs.picWrapper,{
								// 横向
								scrollX: true,
								// 允许外层竖向 内层横向
								eventPassthrough: 'vertical'
							})
						}else{
							this.picScroll.refresh();
						}
						
					})
				}
			}
		},
		
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" >
@import "../../common/stylus/mixin.styl"
	.seller
		position: absolute
		top: 174px
		bottom: 0
		left: 0
		width: 100%
		overflow: hidden
		.overview
			padding: 18px
			.title
				margin-bottom: 8px
				line-height: 14px
				color: rgb(7,17,27)
				font-size: 14px
			.desc
				padding-bottom: 18px
				border-1px(rgba(7,17,27,0.1))
				font-size: 0
				.star
					display: inline-block
					margin-right: 8px
					line-height: 18px
					vertical-align: top
				.text
					display: inline-block
					margin-right: 12px
					line-height: 18px
					vertical-align: top
					font-size: 10px
					color: rgb(77,89,93)
			.remark
				display: flex
				padding-top: 18px
				.block
					flex: 1
					text-align: center
					border-right: 1px solid rgba(7,17,27,0.1)
					&:last-child
						border: none
					h2
						margin-bottom: 4px
						line-height: 10px
						font-size: 10px
						color: rgb(147,153,159)
					.content
						line-height: 24px
						font-size: 10px
						color: rgb(7,17,27)
						.stress
							font-size: 24px
			.collec
				position: absolute
				width: 50px
				right: 11px
				top: 18px
				text-align: center
				.icon-favorite
					display: block
					margin-bottom: 4px
					line-height: 24px
					color: #d4d6d9
					font-size: 24px
					&.active
						color: rgb(240,20,20)
				.text
					line-height: 10px
					font-size: 10px
					color: rgb(77,85,93)
		.notice
			padding:18px 18px 0 18px
			.title
				margin-bottom: 8px
				line-height: 14px
				color: rgb(7,17,27)
				font-size: 14px
			.content-wrapper
				padding: 0 12px 16px 12px
				border-1px(rgba(7,17,27,0.1))
				.content
					line-height: 24px
					font-size: 12px
					color: rgb(240,20,20)
			.supports
				.support-item
					padding: 16px 12px
					border-1px: (rgba(7,17,247,0.1))
					font-size: 0
					&:last-child
						border-none()
					.icon
						display: inline-block
						width: 16px
						height: 16px
						vertical-align: top
						margin-right: 6px
						background-size: 16px 16px
						background-repeat: no-repeat
						&.decrease
							bg-image('decrease_4')
						&.discount
							bg-image('discount_4')
						&.guarantee
							bg-image('guarantee_4')
						&.invoice
							bg-image('invoice_4')
						&.special
							bg-image('special_4')
					.text
						line-height: 16px
						font-size: 12px
						color: rgb(7,17,27)
		.sellerPics
			padding: 18px
			.title
				margin-bottom: 12px
				line-height: 14px
				color: rgb(7,17,27)
				font-size: 14px
			.pic-wrwpper
				width: 100%
				overview: hidden
				// 横向排列不会折行
				white-space: nowrap
				.pic-list
					font-size: 0
					.pic-item
						display: inline-block
						margin-right: 6px
						width: 120px
						height: 90px
						&:last-child
							margin: none
		.sellerInfo
			padding: 18px 18px 0 18px
			.title
				padding-bottom: 12px
				line-height: 14px
				border-1px(rgba(7,17,27,0.1))
				color: rgb(7,17,27)
				font-size: 14px
			.info-item
				padding: 16px 12px
				line-height: 16px
				border-1px(rgba(7,17,27,0.1))
				color: rgb(7,17,27)
				font-size: 12px
				&:last-child
					border-none()
					
				
</style>








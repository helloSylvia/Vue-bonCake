<template>
	<div class="header">
		<!-- 内容 -->
		<div class="content-wrapper">
			<!-- logo -->
			<div class="shopLogo">
				<img width="64" height="64" :src="seller.avatar">
			</div>
			<!-- 内容 -->
			<div class="content">
				<div class="title">
				 	<span class="brand"></span>
					<span class="name">{{ seller.name}}</span>
				</div>
				<!-- 描述 -->
				<div class="description">
					{{ seller.description}}/{{ seller.deliveryTime}}分钟到达
				</div>
				<!-- 支持 -->
				<div v-if="seller.supports" class="supports" >
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{ seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="spCount">
				<span class="count" @click="showDetail">{{ seller.supports.length }}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<!-- 公告 -->
		<div class="notice-wrapper"  @click="showDetail">
			<span class="notice-title"></span><span class="notice-text">{{ seller.bulletin }}</span>
			<i class="icon-keyboard_arrow_right"></i> 
		</div>
		<!-- 背景图 -->
		<div class="background-img">
			<img :src="seller.bgImage" width="100%" height="100%">
		</div>
		<!-- 弹出层 -->
		<transition name="fade">
		<div v-show="detailShow" class="detail">
			<!-- css sticky footer -->
			<div class="detail-wrapper clearfix">
				<div class="detail-content">
					<h1 class="name">{{ seller.name }}</h1>
					<!-- 为了写组件样式 -->
					<div class="star-wrapper">
						<star :size="48" :score="seller.score"></star>
					</div>
					<div class="title">
						<div class="line"></div>
						<div class="text">优惠信息</div>
						<div class="line"></div>
					</div>
					<ul v-if="seller.supports" class="supports">
						<li class="support-item" v-for="(item,index) in seller.supports">
							qq<span class="icon" :class="classMap[seller.supports[index].type]"></span>
               				<span class="text">{{seller.supports[index].description}}</span>
						</li>
					</ul>
					<div class="title">
						<div class="line"></div>
						<div class="text">商家公告</div>
						<div class="line"></div>
					</div>
					<div class="notice">
						<p class="text">{{ seller.bulletin}}</p>
					</div>
				</div>

			</div>
			<div class="detail-close">
				<i class="icon-close" @click="closeDetail"></i>
			</div>
		</div>
		</transition>
	</div>
	
</template>
<script>
import star from 'components/star/star'
export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
    	return {
    		detailShow: false
    	}
    },
    methods: {
    	showDetail() {
    		this.detailShow = true
    	}, 
    	closeDetail() {
    		this.detailShow = false
    	}

    },
    created() {
    	this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    components: {
    	star
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" >
@import "../../common/stylus/mixin.styl"
	.header
		position: relative
		overflow: hidden
		color: #fff 
		background: rgba(7,17,27,0.2)
		// 内容行
		.content-wrapper
			position: relative
			padding: 24px 12px 18px 24px
			font-size: 0
			.shopLogo
				display: inline-block
				vertical-align: top
				img
					border-radius: 2px
				
			.content
				display: inline-block
				margin-left: 16px
				.title
					margin: 2px 0 8px 0
					.brand
						display: inline-block
						width: 30px
						height: 18px
						bg-image("brand")
						background-size: 30px 18px
						background-repeat: no-repeat
					.name
						margin-left: 6px
						font-size: 16px
						font-weight: bold
						line-height: 18px
						// 让名字和图片顶部对齐
						vertical-align: top
				.description
					margin-bottom: 10px
					line-height: 12px
					font-size:  12px
				.supports
					.icon
						display: inline-block
						vertical-align: top
						width: 12px
						height: 12px
						margin-right: 4px
						background-size: 12px 12px
						background-repeat: no-repeat
						// 不同的class对应不同的图片
						&.decrease
							bg-image('decrease_1')
						&.discount
							bg-image('discount_1')
						&.guarantee
							bg-image('guarantee_1')
						&.invoice
							bg-image('invoice_1')
						&.special
							bg-image('special_1')
					.text
						font-size: 12px
						line-height: 10px
			.spCount
				position:absolute
				right: 12px
				bottom: 14px
				padding: 0 8px
				height: 24px
				line-height: 24px
				border-radius: 14px
				background: rgba(0,0,0,0.2)
				text-align: center
				.count
					vertical-align: top
					font-size: 10px
				.icon-keyboard_arrow_right
					margin-left: 2px
					line-height: 24px
					font-size: 10px		
		// 公告栏
		.notice-wrapper
			position: relative
			height: 28px
			line-height: 28px					
			padding: 0 22px 0 22px
			white-space: nowrap
			overflow: hidden
			text-overflow: ellipsis
			background: rgba(7,17,27,0.2)
			.notice-title
				vertical-align: top
				margin-top: 8px
				display:inline-block
				width: 22px
				height: 12px
				bg-image('bulletin')
				background-size: 22px 12px
				background-repeat: no-repeat
			.notice-text
				vertical-align: top
				margin: 0 4px 
				font-size: 10px
			.icon-keyboard_arrow_right
				position: absolute
				right: 12px
				top: 8px
				font-size: 10px
		// 背景图
		.background-img
			position: absolute
			top: 0
			left: 0
			width: 100%
			height: 100%
			z-index: -1
			filter: blur(10px)
		// 弹出层
		.detail
			position: fixed
			top: 0
			left: 0
			z-index: 100
			width: 100%
			height: 100%
			overflow: auto
			transition: all 0.5s
			opacity: 1 
			background: rgba(7,17,27,0.8)
			backdrop-filter: blur(10px)
			&.fade-enter-active, &.fade-leave-active
				fade-transition
				
			&.fade-enter, &.fade-leave-active
				opacity: 0
				background: rgba(7,17,27,0)
			.detail-wrapper
				min-height: 100%
				width: 100%
				.detail-content
					margin-top: 64px
					padding-bottom: 64px
					.name
						line-height: 16px
						font-size: 16px
						text-align: center
						font-weight: 700
					.star-wrapper
						margin-top: 18px
						padding: 2px 0
						text-align: center
					.title
						display: flex
						width: 80%
						margin: 28px auto 24px auto
						.line
							flex: 1
							position: relative
							top: -6px
							border-bottom: 1px solid rgba(255,255,255,0.2)
						.text
							padding: 0 12px
							font-size: 14px
							font-weight: 700
					.supports
						width: 80%
						margin: 0 auto
						.support-item 
							padding: 0 12px
							margin-bottom: 6px
							font-size: 0
							&:last-child
								margin-bottom: 0 
							.icon
								display: inline-block
								vertical-align: top
								width: 16px
								height: 16px
								margin-right: 6px
								background-size:16px 16px
								background-repeat: no-repeat
								font-size:12px
								&.decrease
									bg-image('decrease_2')
								&.discount
									bg-image('discount_2')
								&.guarantee
									bg-image('guarantee_2')
								&.invoice
									bg-image('invoice_2')
								&.special
									bg-image('special_2')

							.text
								line-height: 16px
								font-size: 12px
					.notice
						width: 80%
						margin: 0 auto
						.text
							padding: 0 12px
							line-height: 24px
							font-size: 12px
			.detail-close
				position: relative
				width: 32px
				height: 32px
				margin: -64px auto 0 auto
				clear: both
				font-size: 32px
					
				
</style>














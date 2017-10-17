<template>
	<!-- 商品 -->
	<div class="goods">
		<!-- 菜单 -->
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
					<span class="text borderBottom-1px" >
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
						{{ item.name }}
					</span>
				</li>
			</ul>
		</div>
		<!-- 商品列表 -->
		<div class="goods-wrapper" ref="goodsWrapper">
			<!-- 商品大类 -->
			<ul>
				<li v-for="item in goods" class="goods-type" ref="goodsType">
					<h1 class="title">{{ item.name }}</h1>
					<!-- 分类下的商品 -->
					<ul>
						<li v-for="good in item.foods" class="good-item borderBottom-1px" @click="selectGood(good,$event)">
							<div class="icon">
								<img width="57" height="57" :src="good.icon">
							</div>
							<div class="content">
								<h2 class="good-name">{{ good.name }}</h2>
								<p class="good-desc">{{ good.description }}</p> 
								<div class="extra">
									<span class="count">月售{{ good.sellCount }}</span>
									<span>好评率{{ good.rating }}%</span>
								</div>
								<div class="price">
									<span class="now">¥{{ good.price }}</span><span v-show="good.oldPrice" class="old">¥{{ good.oldPrice }}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol @add="addGood" :good="good" ></cartcontrol>
								</div>
							</div>

						</li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="foot-wrapper">
			<shopcart ref="shopcart" :selectGoods="selectGoods" :deliveryPrice="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
		</div>
		<!-- 商品详情 -->
		<goodDetail @add="addGood" :detail="selectedGood" ref="toDetail"></goodDetail>
	</div>
	
</template>

<script>
import BScroll from 'better-scroll';
import shopcart from 'components/shopcart/shopcart'
import cartcontrol from 'components/cartcontrol/cartcontrol'
import goodDetail from 'components/goodDetail/goodDetail'

const ERR_OK = 0;

export default {
	props: {
		seller:{
			type: Object
		}
	},
	components: {
		shopcart,
		cartcontrol,
		goodDetail
		
	},
	data() {
		return {
			goods: [],
			heightList: [],
			scrollY: 0,
			selectedGood: {}
		}

	},
	computed: {
		currentIndex() {

			for (let i = 0; i < this.heightList.length; i++) {
	          let heightBf = this.heightList[i];
	          let heightAf = this.heightList[i + 1];
	          if (!heightAf || (this.scrollY >= heightBf && this.scrollY < heightAf)) {
	          
	            return i;
	          }
	        }
	        return 0;
		},
		selectGoods() {
			let foods = [];
			this.goods.forEach((item) => {
			  item.foods.forEach((good) => {
			    // Todo...
			    if(good.count){
			    	foods.push(good)

			    }
			  })
			})
			return foods;		
		}
	},
	created() {
		this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']

	    this.$http.get('/api/goods').then((response) => {
	      response = response.body;
	      if(response.errno === ERR_OK){
	          this.goods = response.data
	          // dom异步更新 所以要把方法放到nextTick中
	          this.$nextTick(() => {

            	this.initScroll();
            	this.cpHeight();
          		});
	          
	      }

	    })
	},
	methods: {
		drop(target) {
			// 优化动画
			this.$nextTick(() => {
				this.$refs.shopcart.drop(target)
			})
			
		},
		addGood(target) {
			this.drop(target);
		},
		selectMenu(index, event){
			if(!event._constructed){
				return;
			}
			let typeList = this.$refs.goodsType;
			let el = typeList[index];
			this.goodsScroll.scrollToElement(el,300);
			
		},
		// 计算区域高度
		cpHeight() {
			let typeList = this.$refs.goodsType ;
			let height = 0;
			this.heightList.push(height)
			for(let i = 0; i < typeList.length; i++){
				let item = typeList[i];
				height += item.clientHeight;
				this.heightList.push(height);
			}
		},
		initScroll() {
			this.menuScroll = new BScroll(this.$refs.menuWrapper,{
				click: true
			});
			this.goodsScroll = new BScroll(this.$refs.goodsWrapper,{
				click: true,
				// 可以取到滚动的位置
				probeType: 3
			});
			// 监听滚动的位置
			this.goodsScroll.on('scroll',(pos) => {
				this.scrollY = Math.abs(Math.round(pos.y));

			})
		},
		selectGood(good,event) {
			if (!event._constructed) {
				return;
			}
			this.selectedGood = good;
			this.$refs.toDetail.show();
		}
	}


		
}
</script>

<style lang="stylus" rel="stylesheet/stylus" >
@import "../../common/stylus/mixin.styl"
	
	.goods
		display: flex
		position: absolute
		top: 174px
		bottom: 46px
		width: 100%
		overflow: hidden
		.menu-wrapper
			flex:0 0 80px
			background: #f3f5f7
			.menu-item
				display: table
				padding: 0 12px
				width: 56px
				height: 54px
				line-height: 14px
				
				.icon
					display: inline-block
					vertical-align: top
					width: 12px
					height: 12px
					margin-right: 2px
					background-size: 12px 12px
					background-repeat: no-repeat
					// 不同的class对应不同的图片
					&.decrease
						bg-image('decrease_3')
					&.discount
						bg-image('discount_3')
					&.guarantee
						bg-image('guarantee_3')
					&.invoice
						bg-image('invoice_3')
					&.special
						bg-image('special_3')
				.text
					display: table-cell
					width: 56px
					vertical-align: middle
					font-size: 12px
					border-1px(rgba(7, 17, 27, 0.1))
				&.current
					position: relative
					z-index: 10
					margin-top: -1px
					background: #fff
					font-weight: 700
					.text
						border-none()
		.goods-wrapper
			flex: 1
			.title
				padding-left: 14px
				height: 26px
				line-height 26px
				border-left: 2px solid #d9dde1
				font-size: 12px
				color: rgb(147,153,159)
				background: #f3f5f7
			.good-item
				display: flex
				margin: 18px
				padding-bottom: 18px
				border-1px(rgba(7, 17, 27, 0.1))
				&:last-child
					border-none()
					margin-bottom: 0
				.icon
					flex: 0 0 57px
					margin-right: 10px
				.content
					flex: 1
					.good-name
						margin: 2px 0 8px 0
						height: 14px
						line-height: 14px
						font-size: 14px
						color: rgb(7,17,27)
					.good-desc, .extra
						line-height: 10px
						font-size: 10px
						color: rgb(147,153,159)
					.good-desc
						margin-bottom: 8px
						line-height: 12px
					.extra
						.count
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
						right: 0
						bottom: 12px
						
						
</style>










<template>
  <div>
    <hao-header :seller="seller"></hao-header>
    <div class="hao-tab borderBottom-1px">
       <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from './components/header/header';

const EER_OK = 0;
export default {

  data() {
    return {
      seller: {}
    }
  },

  created() {
    this.$http.get('/api/seller').then((response) => {
      response = response.body;
      if(response.errno === EER_OK){
          this.seller = response.data

      }

    })
  },

  components: {
    haoHeader: header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import ("./common/stylus/mixin.styl")
    .hao-tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
      & > a 
        display: block
        font-size:14px
        color: rgb(77,85,93)
        &.active
          color: rgb(240, 20, 20)
        
  

</style>

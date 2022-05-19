
<script>
import { h } from 'vue'
export default {
  name: "LBread",
  render(){
    /**
     * h()函数的参数
     *   1.标签名称
     *   2.标签属性对象
     *   3.子节点
     */
    // 获取默认插槽内容
    let items = this.$slots.default()
    // 添加子节点
    let dymanicItems = []
    items.forEach((item,i) => {
      dymanicItems.push(item)
      if(i < items.length-1){
        dymanicItems.push(h('i',{ class:'iconfont icon-angle-right1' }))
      }
    })
    return h('div',{ class:'xtx-bread' }, dymanicItems)
  }
};
</script>

<style lang='less'>
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
    color: rgba(163, 163, 163, 0.548);
  }
}
</style>
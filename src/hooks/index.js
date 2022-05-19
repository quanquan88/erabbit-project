// 提供复用逻辑函数
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export const useLazyData = (apiFn) => {
    // 元素dom
    const target = ref(null);
    // 返回的数据
    let data = ref([])
    // stop 停止观察
    const { stop } =  useIntersectionObserver(
        // 监听的目标元素
        target,
        /**
         * @param isIntersecting 是否进入可视区
         * @param {*} observerElement 
         */
        ([{ isIntersecting }], observerElement) => {
            if (isIntersecting){
                // 停止观察
                stop()
                // 调用api方法
                apiFn().then(res => {
                    let { code,result } = res.data
                    if(code==1){
                        data.value = result
                        // console.log(data);
                    }
                })
            }
        },
        // 配置项
        {
            threshold: 0, //出现视口的高度
        }
    )
    // 返回数据
    return {
        target,
        data
    }
}
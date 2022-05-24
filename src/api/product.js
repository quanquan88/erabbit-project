/*
 * @Author: quan
 * @Date: 2022-05-19 22:46:52
 * @LastEditors: quan
 * @LastEditTime: 2022-05-19 22:49:39
 * @Description: file content
 */

import request from '@/utils/request'

/** 商品详情模块 */

// 获取商品详情
export const findGoods = id => {
    return request('/goods', 'get', { id })
}

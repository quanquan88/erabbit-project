import request from '@/utils/request'

// 获取商品分类列表
export const cateApi = () => {
    return request('/home/category/head','GET')
}

/**
 * 获取单个顶级分类信息
 * @param {String} id - 顶级分类ID
 */
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}

/**
 * 获取二级分类筛选条件数据
 * @param {String} id - 二级分类ID
 */
export const findSubCategoryFilter = (id) => {
  return request('/category/sub/filter', 'get', {
    id
  })
}

/**
 * 获取分类下的商品（带筛选条件）
 * @param {Object} params 参数
 */
export const findSubCategoryGoods = (params) => {
  return request('/category/goods/temporary', 'post', params)
}

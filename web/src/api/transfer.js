import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/transfer/list',
    method: 'get',
    params: query
  })
}

export function fetchDetail(id) {
  return request({
    url: '/transfer/' + id,
    method: 'get'
  })
}

export function createTransfer(data) {
  return request({
    url: '/transfer/create',
    method: 'post',
    data
  })
}

export function updateTransfer(data, id) {
  return request({
    url: '/transfer/' + id,
    method: 'put',
    data
  })
}

export function deleteTransfer(id) {
  return request({
    url: '/transfer/' + id,
    method: 'delete'
  })
}

export function fetchAnalysisTotal() {
  return request({
    url: '/transfer/analysis/total',
    method: 'get'
  })
}

export function fetchAnalysisDetail(query) {
  return request({
    url: '/transfer/analysis/detail/' + query,
    method: 'get'
  })
}

export function fetchMonths(startMonth, endMonth) {
  return request({
    url: '/transfer/analysis/months/' + startMonth + '/' + endMonth,
    method: 'get'
  })
}

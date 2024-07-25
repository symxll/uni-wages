// /utils/http.js

import axios from 'axios';

const BASE_URL = 'http://localhost:8065/renren-admin';

// 创建axios实例
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 走缓存拿token
    config.headers['token'] = uni.getStorageSync('token');
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    const { response } = error;
    if (response) return Promise.reject(response.data);
    else Promise.reject(error);
  }
)

// 封装请求函数
const get = (url, value) => {
  return instance.get(url, { ...value });
}

const post = (url, data, value) => {
  return instance.post(url, data, { ...value });
}

// 导出函数
export {
  get,
  post
}
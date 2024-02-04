// api.js

import axios from 'axios';

const baseURL = 'http://10.21.10.230/Default.aspx';

const instance = axios.create({
  baseURL,
  timeout: 5000, // 设置超时时间
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

const instance2 = axios.create({
  timeout: 5000, // 设置超时时间
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

// 封装具体的接口请求函数
const api = {
  kanban1: () => instance.post('/NewShow1', { responseType: 'json' }),
  temp: () => instance2.get('http://v1.yiketianqi.com/free/day?appid=64793715&appsecret=qiQ2ZvjK&unescape=1', { responseType: 'json' })
  //   getUser: () => instance.get('/user'),
  //   createUser: (userData) => instance.post('/user', userData),
  //   updateUser: (userId, userData) => instance.put(`/user/${userId}`, userData),
  //   deleteUser: (userId) => instance.delete(`/user/${userId}`),
  // 添加其他接口...
};

export default api;
import axios from "axios";
const url = {
  LOGIN: 'login',
  REGISTER: 'register',
  GET_INFO: 'getInfo',
  SET_INFO: 'setInfo',
  ADD_USER: 'addUser',
};

function login(payload, callback) {
  console.log('payload at auth: ', payload);
  axios({
    method: 'POST',
    url: url.LOGIN,
    data: payload
  })
    .then(response => {
      callback(true, response, null);
    })
    .catch(error => {
      callback(false, null, error);
    });
}

function register(payload, callback) {
  console.log('payload at register: ', payload);
  axios({
    method: 'POST',
    url: url.REGISTER,
    data: payload
  })
    .then(response => {
      callback(true, response, null);
    })
    .catch(error => {
      callback(false, null, error);
    });
}

function getInfo(payload, callback) {
  axios({
    method: 'POST',
    url: url.GET_INFO,
    data: payload
  })
    .then(response => {
      callback(true, response, null);
    })
    .catch(error => {
      callback(false, null, error);
    });
}

function setInfo(payload, callback) {
  axios({
    method: 'POST',
    url: url.SET_INFO,
    data: payload
  })
    .then(response => {
      callback(true, response, null);
    })
    .catch(error => {
      callback(false, null, error);
    });
}

function addUser(payload, callback) {
  axios({
    method: 'POST',
    url: url.ADD_USER,
    data: payload
  })
    .then(response => {
      callback(true, response, null);
    })
    .catch(error => {
      callback(false, null, error);
    });
}

const api = {
  login,
  register,
  getInfo,
  setInfo,
  addUser,
}

export default api;

import axios from "axios";
const url = {
  LOGIN: 'login',
  REGISTER: 'register',
  GET_INFO: 'user/filter',
  GET_ONE_INFO: 'user',
  SET_INFO: 'setInfo',
  FEEDBACK: 'feedback',
  SWIPE: 'user',
  LIKED: 'user/liked',
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

function getInfo(callback) {
  axios({
    method: 'GET',
    url: url.GET_INFO,
  })
    .then(response => {
      callback(true, response, null);
    })
    .catch(error => {
      callback(false, null, error);
    });
}

function getOneInfo(payload, callback) {
  axios({
    method: 'GET',
    url: url.GET_ONE_INFO + '/' + payload,
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
    url: url.FEEDBACK,
    data: payload
  })
    .then(response => {
      callback(true, response, null);
    })
    .catch(error => {
      callback(false, null, error);
    });
}

function getFeedback(callback) {
  axios({
    method: 'GET',
    url: url.FEEDBACK,
  })
    .then(response => {
      callback(true, response, null);
    })
    .catch(error => {
      callback(false, null, error);
    });
}

function getOneFeedback(payload, callback) {
  axios({
    method: 'POST',
    url: url.FEEDBACK,
    data: payload,
  })
    .then(response => {
      callback(true, response, null);
    })
    .catch(error => {
      callback(false, null, error);
    });
}

function swipe(payload, callback) {
  const data = {
    status: payload.status
  }
  axios({
    method: 'PUT',
    url: url.SWIPE + '/' + payload.url,
    data: data
  })
  .then(response => {
    callback(true, response, null);
  })
  .catch(error => {
    callback(false, null, error);
  });
}

function getLikedUsers(callback) {
  axios({
    method: 'GET',
    url: url.LIKED,
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
  getFeedback,
  getOneFeedback,
  getOneInfo,
  swipe,
  getLikedUsers,
}

export default api;

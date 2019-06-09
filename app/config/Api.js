import axios from "axios";
const url = {
  LOGIN: "login",
  REGISTER: "register",
  GET_INFO: "user/filter",
  GET_ONE_INFO: "user",
  SET_INFO: "user/update/",
  FEEDBACK: "feedback",
  SWIPE: "user",
  LIKED: "user/liked",
  CHANGE_PASSWORD: "user/changepass/",
  GET_NOTIFICATION: "noti",
  MARK_READ: "noti/seen",
  MATCH: "user/matched",
  UPLOAD_IMAGE: "image/",
  GET_IMAGE: "image/"
};

function login(payload, callback) {
  console.log("payload at auth: ", payload);
  axios({
    method: "POST",
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
  console.log("payload at register: ", payload);
  axios({
    method: "POST",
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
    method: "GET",
    url: url.GET_INFO
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
    method: "GET",
    url: url.GET_ONE_INFO + "/" + payload
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
    method: "PUT",
    url: url.SET_INFO + payload.id,
    data: payload.data
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
    method: "POST",
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
    method: "GET",
    url: url.FEEDBACK
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
    method: "POST",
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

function swipe(payload, callback) {
  const data = {
    status: payload.status
  };
  axios({
    method: "PUT",
    url: url.SWIPE + "/" + payload.url,
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
    method: "GET",
    url: url.LIKED
  })
    .then(response => {
      callback(true, response, null);
    })
    .catch(error => {
      callback(false, null, error);
    });
}

function changePassword(payload, callback) {
  axios({
    method: "PUT",
    url: url.CHANGE_PASSWORD + payload.id,
    data: payload.data
  })
    .then(response => {
      callback(true, response, null);
    })
    .catch(error => {
      callback(false, null, error);
    });
}

function getNotification(callback) {
  axios({
    method: "GET",
    url: url.GET_NOTIFICATION
  })
    .then(response => {
      callback(true, response, null);
    })
    .catch(error => {
      callback(false, null, error);
    });
}

function markAsRead(payload, callback) {
  axios({
    method: "PUT",
    url: url.MARK_READ,
    data: payload
  })
    .then(response => {
      callback(true, response, null);
    })
    .catch(error => {
      callback(false, null, error);
    });
}

function getMatched(callback) {
  axios({
    method: "GET",
    url: url.MATCH
  })
    .then(response => {
      callback(true, response, null);
    })
    .catch(error => {
      callback(false, null, error);
    });
}

function uploadImage(payload, callback) {
  console.log("payload data: ", payload.data);
  console.log("payload token: ", payload.token);
  fetch("https://db-project-backend.herokuapp.com/api/image/", {
    method: "POST",
    //headers: {
    //  Authorization: payload.token
    //},
    body: payload.data
  })
    .then(response => {
      response.json().then(data => {
        console.log("response json: ", data);
      });
    })
    .catch(error => {
      callback(false, null, error);
    });
}

function getImage(payload, callback) {
  axios({
    method: "GET",
    url: url.GET_IMAGE + payload
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
  changePassword,
  getNotification,
  markAsRead,
  getMatched,
  uploadImage,
  getImage
};

export default api;

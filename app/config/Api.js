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
  UPLOAD_IMAGE: "image",
  GET_IMAGE: "image/",
  DELETE_IMAGE: "image/"
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

function getNotification(payload, callback, type) {
  axios({
    method: "GET",
    url: url.GET_NOTIFICATION,
    // for GET http request, we use params to insert data inside.
    // link: https://flaviocopes.com/node-axios/
    params: {
      limit: payload.limit,
      offset: payload.offset,
    }
  })
    .then(response => {
      callback(true, response, null, type);
    })
    .catch(error => {
      callback(false, null, error, type);
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
  axios({
    method: "POST",
    url: url.UPLOAD_IMAGE,
    //headers: {
    //  Authorization: payload.token
    //},
    data: payload.data
  })
    .then(response => {
      callback(true, response, null);
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

function deleteImage(payload) {
  console.log('payload url: ', payload.url)
  axios({
    method: "DELETE",
    url: url.DELETE_IMAGE + payload.url
  })
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
  getImage,
  deleteImage
};

export default api;

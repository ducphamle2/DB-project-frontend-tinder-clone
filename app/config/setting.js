// set path for axios http
const setPath = {
  //ApiHost: 'http://192.168.157.2:3000/', //correct localhost for genymotion
  //ApiHost: 'http://192.168.56.1:3000/', // localhost in SSD
  //ApiHost: 'http://10.0.2.2:8080/',
  ApiHost: 'https://db-project-backend.herokuapp.com/',
  ApiSubPath: 'api',
  slash: '/'
};
// https://bbowden.tumblr.com/post/58650831283/accessing-a-localhost-server-from-the-genymotion

const apiUrl = build(
  setPath.ApiHost,
  setPath.ApiSubPath,
  setPath.slash
);

// this function is used to concat the path string and then return it
function build(...params) {
  let data = '';

  if (params) {
    for (let i = 0, len = params.length; i < len; i += 1) {
      data += params[i];
    }
  }

  return data;
}

const setting = {
  setPath,
  apiUrl
};

export default setting;
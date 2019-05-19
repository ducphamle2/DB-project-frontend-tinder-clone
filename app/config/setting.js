// set path for axios http
const setPath = {
  ApiHost: 'http://192.168.157.2:3000/', //correct localhost for genymotion
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
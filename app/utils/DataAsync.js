import AsyncStorage from '@react-native-community/async-storage';

// this is used to receive data with a given key (which is an object)
const getData = async key => { // inner function that calls getItem function from AsyncStorage
  let data = '';
  try {
    await AsyncStorage.getItem(key, (err, result) => { // we pass two vals, if error then we return error, if not we set our value to data.
      if (err) return err;
      data = result;
    });
  } catch (error) {
    return error;
  }

  return data;
};

// setData when passing a key and its value
const setData = async (key, value) => {
  return AsyncStorage.setItem(key, value);
};

const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
};

// get data without checking error ??
const getDataWithoutAsync = key => {
  return AsyncStorage.getItem(key);
};

const DataAsync = { // data async is used to store data even after shutting down the app
  getData,
  setData,
  removeData,
  getDataWithoutAsync
};

export default DataAsync;
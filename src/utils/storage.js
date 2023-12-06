import AsyncStorage from '@react-native-async-storage/async-storage';
import {enableLoggingToConsole} from './environment';

export default Storage = () => {
  const set = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      if (enableLoggingToConsole) {
        console.log(`Saved to storage. Key: ${key}, Value: ${value}`);
      }
    } catch (error) {
      if (enableLoggingToConsole) {
        console.error(error);
      }
    }
  };

  const get = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null && enableLoggingToConsole) {
        console.log(value);
      }
    } catch (error) {
      if (enableLoggingToConsole) {
        console.error(error);
      }
    }
  };

  const getJson = async key => {
    try {
      const dataStr = get(key);
      const dataJson = JSON.parse(dataStr);
      if (dataJson && enableLoggingToConsole) {
        console.log(dataJson);
      }
    } catch (error) {
      if (enableLoggingToConsole) {
        console.error(error);
      }
    }
  };
};

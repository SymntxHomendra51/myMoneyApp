import AsyncStorage from '@react-native-async-storage/async-storage'

const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
    console.log('store success')
  } catch (e) {
    // saving error
  }
}

const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return value
    }
  } catch (e) {
    // error reading value
  }
}

const storageActions = { storeData, getData }

export default storageActions

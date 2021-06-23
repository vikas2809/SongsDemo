import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            console.log('Value from get data', value)
            return value;
        }
    } catch (e) {
        // error reading value
    }
}

export const storeItem = async (key,value) => {
    console.log('Store Data',value)
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      // saving error
    }
}

export function readabledate(date) {
    let dateString = new Date(date).toUTCString();
    dateString = dateString.split(' ').slice(0, 4).join(' ');
    return dateString;
}

export function currencySymbol(currency) {
    switch (currency) {
        case 'USD': return '\u0024';
    }
}

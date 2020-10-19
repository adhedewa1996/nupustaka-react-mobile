import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
export const ACCESS_TOKEN = 'access_token';

export const onSignIn = (data) => AsyncStorage.setItem(ACCESS_TOKEN, data);
export const onSignOut = () => AsyncStorage.removeItem(ACCESS_TOKEN);
export const onToken = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(ACCESS_TOKEN)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    })
}
export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(ACCESS_TOKEN)
            .then(res => {
                if (res !== null) {
                    const AuthStr = 'Bearer ' + res;
                    axios.get(`http://powerful-headland-43561.herokuapp.com/api/auth/user`, {
                        headers: {
                            Authorization: AuthStr
                        }
                    }).then(response => {
                        resolve(response.data.data);
                    }).catch((error) => {
                        resolve(error.data);
                    });
                } else {
                    resolve(false);
                }
            })
            .catch(err => reject(err));
    });
};
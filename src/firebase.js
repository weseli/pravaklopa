import { initializeApp, getApps, getApp } from 'firebase/app'
import {
    getMessaging,
    getToken,
    onMessage,
    isSupported,
} from 'firebase/messaging'
import { useStoreFcm } from './hooks/react-query/push-notification/usePushNotification'

const firebaseConfig = {
    apiKey: 'AIzaSyBIVSFVofZ2U-kboNBDrSonTBS6pnCqTf4',
    authDomain: 'pravaklopa.firebaseapp.com',
    projectId: 'pravaklopa',
    storageBucket: 'pravaklopa.appspot.com',
    messagingSenderId: '1019323085307',
    appId: '1:1019323085307:web:838b834088b67ef03c9b5e',
    measurementId: 'G-PHM7LLN751',
}
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const messaging = (async () => {
    try {
        const isSupportedBrowser = await isSupported()
        if (isSupportedBrowser) {
            return getMessaging(firebaseApp)
        }

        return null
    } catch (err) {
        return null
    }
})()

export const fetchToken = async (setTokenFound, setFcmToken) => {
    return getToken(await messaging, {
        vapidKey: 'BND7_pma31K8IYO34v-t59fRyFnsfKl0nMcZ0NxpSEKLG75q5TCsU3lVahKEysjqu0hPeJNgJbFWOCZeZVI-KIc',
    })
        .then((currentToken) => {
            if (currentToken) {
                setTokenFound(true)
                setFcmToken(currentToken)

                // Track the token -> client mapping, by sending to backend server
                // show on the UI that permission is secured
            } else {
                setTokenFound(false)
                setFcmToken()
                // shows on the UI that permission is required
            }
        })
        .catch((err) => {
            console.error(err)
            // catch error while creating client token
        })
}

export const onMessageListener = async () =>
    new Promise((resolve) =>
        (async () => {
            const messagingResolve = await messaging
            onMessage(messagingResolve, (payload) => {
                resolve(payload)
            })
        })()
    )

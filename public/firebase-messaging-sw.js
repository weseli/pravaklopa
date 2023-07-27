importScripts(
    'https://www.gstatic.com/firebasejs/9.13.0/firebase-app-compat.js'
)
importScripts(
    'https://www.gstatic.com/firebasejs/9.13.0/firebase-messaging-compat.js'
)
firebase?.initializeApp({
    apiKey: 'AIzaSyBIVSFVofZ2U-kboNBDrSonTBS6pnCqTf4',
    authDomain: 'pravaklopa.firebaseapp.com',
    projectId: 'pravaklopa',
    storageBucket: 'pravaklopa.appspot.com',
    messagingSenderId: '1019323085307',
    appId: '1:1019323085307:web:838b834088b67ef03c9b5e',
    measurementId: 'G-PHM7LLN751',
})

// Retrieve firebase messaging
const messaging = firebase?.messaging()

messaging.onBackgroundMessage(function (payload) {
    const notificationTitle = payload.notification.title
    const notificationOptions = {
        body: payload.notification.body,
    }

    self.registration.showNotification(notificationTitle, notificationOptions)
})

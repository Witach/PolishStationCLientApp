importScripts('https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.20.0/firebase-messaging.js');
const firebaseConfig = {
  apiKey: 'AIzaSyDp8FbqVnJKur-9U4DX1G9tiT68FGCozyg',
  authDomain: 'polishstation-323f6.firebaseapp.com',
  projectId: 'polishstation-323f6',
  storageBucket: 'polishstation-323f6.appspot.com',
  messagingSenderId: '802499182121',
  appId: '1:802499182121:web:81540cc4ad8068d73f2638',
  measurementId: 'G-XLBJYQNV5M'
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

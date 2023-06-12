const mailField = document.getElementById('mail');
const resetPassword = document.getElementById('resetPassword');
const successModal = document.querySelector('.success');
const failureModal = document.querySelector('.failure');

const firebaseConfig = {
    apiKey: "AIzaSyA3DVhUJcjk7EYvWL3a0kIiGN45mVoal7Q",
    authDomain: "login-b59a3.firebaseapp.com",
    databaseURL: "https://login-b59a3-default-rtdb.firebaseio.com",
    projectId: "login-b59a3",
    storageBucket: "login-b59a3.appspot.com",
    messagingSenderId: "98395191270",
    appId: "1:98395191270:web:dc86c8147b02e7d5e40827",
    
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const resetPasswordFunction = () => {
  const email = mailField.value;

  auth.sendPasswordResetEmail(email)
    .then(() => {
      console.log('Password Reset Email Sent Successfully!');
      successModal.style.display = 'block';
      failureModal.style.display = 'none';
    })
    .catch(error => {
      console.error('Failed to send password reset email:', error);
      successModal.style.display = 'none';
      failureModal.style.display = 'block';
    });
}

resetPassword.addEventListener('click', resetPasswordFunction);




document.addEventListener("DOMContentLoaded", function() {
  var successCloseBtn = document.getElementById("success-close-btn");
  var failureCloseBtn = document.getElementById("failure-close-btn");

  successCloseBtn.addEventListener("click", function() {
    var successContainer = this.parentNode;
    successContainer.style.display = "none";
  });

  failureCloseBtn.addEventListener("click", function() {
    var failureContainer = this.parentNode;
    failureContainer.style.display = "none";
  });
});



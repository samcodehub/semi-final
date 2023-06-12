// Your web app's Firebase configuration
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

// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Set up our register function
function register() {
  // Get all our input fields
  var name = document.getElementById("registerName").value;
  var email = document.getElementById("signup-email").value;
  var password = document.getElementById("signup-password").value;

  // Validate input fields
  if (
    validate_field(name) == false ||
    validate_email(email) == false ||
    validate_password(password) == false
  ) {
    alert("One or more fields are invalid!");
    return;
  }

  // Move on with Auth
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function (userCredential) {
      // Declare user variable
      var user = userCredential.user;

      // Set user's display name and photo URL
      user.updateProfile({
        displayName: name,
        photoURL: "", // You can provide a default photo URL or leave it empty
      });

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        name: name,
        email: email,
        last_login: Date.now(),
      };

      // Push to Firebase Database
      database_ref.child("users/" + user.uid).set(user_data);

      // Done
      alert("User Created!");
      hideSignUpForm();
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}

// Set up our login function
function login() {
  // Get all our input fields
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email or Password is invalid!");
    return;
  }

  auth
    .signInWithEmailAndPassword(email, password)
    .then(function (userCredential) {
      // Declare user variable
      var user = auth.currentUser;

      // Get user's display name and photo URL
      var displayName = user.displayName;
      var photoURL = user.photoURL;

      // Update the user display and image in the HTML
      updateLoggedInUser(displayName, photoURL);

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        last_login: Date.now(),
      };

      // Push to Firebase Database
      database_ref.child("users/" + user.uid).update(user_data);

      // Done
      alert("User Logged In!");
      hideSignInForm();
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}

// Hide the sign-up form
function hideSignUpForm() {
  document.getElementById("signup-form").style.display = "none";
}

// Hide the sign-in form
function hideSignInForm() {
  document.getElementById("signin-form").style.display = "none";
}

// Update logged-in user's display name and photo URL
function updateLoggedInUser(displayName, photoURL) {
  var userDisplay = document.querySelector(".nav-link.dropdown-toggle");

  if (displayName) {
    userDisplay.textContent = displayName;
    userDisplay.style.color = "#f7a502";
  }

  if (photoURL) {
    var userImage = document.createElement("img");
    userImage.src = photoURL;
    userImage.classList.add("rounded-circle");
    userImage.height = 25;
    userImage.alt = "Login User Avatar";
    userImage.loading = "lazy";

    userDisplay.appendChild(userImage);
  } else {
    var defaultUserImage = document.createElement("img");
    defaultUserImage.src = "img/loged.png";
    defaultUserImage.classList.add("rounded-circle");
    defaultUserImage.height = 25;
    defaultUserImage.alt = "Login User Avatar";
    defaultUserImage.loading = "lazy";

    userDisplay.appendChild(defaultUserImage);
  }
}

// Validate Functions
function validate_email(email) {
  var expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    // Email is good
    return true;
  }
}

function validate_field(fieldValue) {
  if (fieldValue == null || fieldValue == "") {
    return false;
  } else {
    return true;
  }
}

function validate_password(password) {
  // Example: Check if the password length is at least 6 characters
  if (password.length >= 6) {
    return true;
  } else {
    return false;
  }
}

function resetLoggedInUser() {
  var userDisplay = document.querySelector(".nav-link.dropdown-toggle");
  userDisplay.textContent = "Login";

  // Set the primary image as the default image after signing out
  var defaultUserImage = document.createElement("img");
  defaultUserImage.src = "img/user.png";
  defaultUserImage.classList.add("rounded-circle");
  defaultUserImage.height = 25;
  defaultUserImage.alt = "Login User Avatar";
  defaultUserImage.loading = "lazy";

  userDisplay.innerHTML = ""; // Remove the current user image
  userDisplay.appendChild(defaultUserImage);
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
      console.log("User signed out successfully.");
      alert("User signed out successfully.");

      // Reset the user display
      resetLoggedInUser();
    })
    .catch(function (error) {
      // An error occurred
      console.log("An error occurred while signing out:", error);
    });
}

function openWhatsApp() {
    var phoneNumber = "+3547608535";
    var message = "Hello, I'm interested in your product.";

    var url = "https://api.whatsapp.com/send?phone=" + encodeURIComponent(phoneNumber) + "&text=" + encodeURIComponent(message);

    window.open(url);
}


document.getElementById("cart-icon").addEventListener("click", function() {
    document.getElementById("cart-panel").classList.toggle("open");
  });
  
  document.getElementById("close-btn").addEventListener("click", function() {
    document.getElementById("cart-panel").classList.remove("open");
  });
  



  var signinForm = document.getElementById('signin-form');
  var signupForm = document.getElementById('signup-form');
  
  document.getElementById('signin-button').addEventListener('click', function() {
    // Show the sign-in form
    signinForm.style.display = 'block';
    signupForm.style.display = 'none';
  });
  
  document.getElementById('signup-button').addEventListener('click', function() {
    // Show the sign-up form
    signinForm.style.display = 'none';
    signupForm.style.display = 'block';
  });



const clip = document.querySelectorAll('.clip');
for (let i = 0; i<clip.length; i++){
    clip[i].addEventListener('mouseenter',
    function(e){
        clip[i].play()
    })

    clip[i].addEventListener('mouseout',
    function(e){
        clip[i].pause()
    })
}
function openWhatsApp() {
    var phoneNumber = "+3547608535";
    var message = "Hello, I'm interested in your product.";

    var url = "https://api.whatsapp.com/send?phone=" + encodeURIComponent(phoneNumber) + "&text=" + encodeURIComponent(message);

    window.open(url);
}







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
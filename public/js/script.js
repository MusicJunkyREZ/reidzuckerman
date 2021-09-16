$(document).ready(function(){
    $(window).scroll(function(){
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }
        if(this.scroll > 500){
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // change photo based screen size
    $(window).resize(function(e){
        if($(window).width() < 568) {
        console.log($(window).width());
         $("#about-content-img").each(function() {
           $(this).attr("src", "../images/main.jpg");
                     });
                 } else if ($(window).width() >= 568) {
                     $("#about-content-img").each(function() {
                     $(this).attr("src","../images/RezAnimated.jpg");
                     });                        
         }         
     });

    // slide up script
    $('.scroll-up-btn').on('click', function(){
        $('html, body').animate({scrollTop: 0})
    });
    $('.scroll-up-btn').on('click', function(){
        console.log("here")
    });
    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing animation script
    var typed = new Typed(".typing", {
        strings: ["Guitarist", "Musician", "Developer", "Composer"],
        typeSpeed: 100,
        backSpeed: 60, 
        loop: true
    })
    var typed = new Typed(".typing-2", {
        strings: ["Guitarist", "Musician", "Developer", "Composer"],
        typeSpeed: 100,
        backSpeed: 60, 
        loop: true
    })
    // owl carousel script
    $(`.carousel`).owlCarousel({
        margin: 20,
        loop: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    })
});

// nodemailer script

const contactForm = document.querySelector('.contact-form');
let name = document.getElementById('name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');

contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    let formData = {
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.onload = function(){
        console.log(xhr.responseText);
        if(xhr.responseText == 'success'){
            alert('Email sent');
            name.value = '';
            email.value = '';
            subject.value = '';
            message.value = '';
        } else {
            alert('Something went wrong!')
        }
    }

    xhr.send(JSON.stringify(formData))
});

// free ebook nodemailer script
const ebookContactForm = document.querySelector('.ebook-contact-form');
let ebookName = document.getElementById('ebookName');
let ebookEmail = document.getElementById('ebookEmail');
let ebookSubject = document.getElementById('ebookSubject');
let ebookMessage = document.getElementById('ebookMessage');

ebookContactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    let ebookFormData = {
        name: ebookName.value,
        email: ebookEmail.value,
        subject: `Free eBook for ${ebookName.value}`,
        message: 
        `Name: ${ebookName.value}
        Email: ${ebookEmail.value}`
    }

    let ebookxhr = new XMLHttpRequest();
    ebookxhr.open('POST', '/');
    ebookxhr.setRequestHeader('content-type', 'application/json')
    ebookxhr.onload = function(){
        console.log(ebookxhr.responseText);
        if(ebookxhr.responseText == 'success'){
            alert('Thank you!  Your free eBook will sent to you as soon as it is finished! :)');
            ebookName.value = '';
            ebookEmail.value = '';
        } else {
            alert(`Something went wrong..  But don't fret!  Just email me at reidzuckermanmusic@gmail.com and I will send you over you free eBook (and then fix this issue!)`)
        }
    }

    ebookxhr.send(JSON.stringify(ebookFormData));
    let thing = JSON.stringify(ebookFormData);
    console.log(thing)
});

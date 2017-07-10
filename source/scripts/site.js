/* html-sites */
//var context = require.context('../html', true, /\.(html)$/);
//var htmlfiles={};

//context.keys().forEach((filename)=>{
//  htmlfiles[filename] = context(filename);
//});

/* Styles */
import styles from '../scss/site.scss';

/* ScrolllReveal */
window.sr = ScrollReveal()
window.sr.reveal('.sr-left', {
  duration: 1000,
  distance: '50px',
  easing: 'ease',
  origin: 'left',
  rotate: { x: 0, y: 0, z: 0 },
  scale: 0.8
}, 500);

window.sr.reveal('.sr-flip', {
  duration: 1000,
  distance: '0px',
  easing: 'ease',
  origin: 'left',
  rotate: { x: 0, y: -180, z: 0 },
  scale: 0.8
}, 500);

window.sr.reveal('.timeline-flip', {
  duration: 1000,
  distance: '0px',
  easing: 'ease',
  origin: 'left',
  rotate: { x: 0, y: -180, z: 0 },
  scale: 0.8
}, 500);

window.sr.reveal('.contact-top', {
  duration: 500,
  distance: '50px',
  easing: 'ease',
  origin: 'top',
  rotate: { x: 0, y: 0, z: 0 },
  scale: 0.8
}, 100);

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-80868684-4', 'auto');
ga('send', 'pageview');

(function($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 54)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 54
    });

    // Closes responsive menu when a link is clicked
    $('.navbar-collapse>ul>li>a').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

    // Collapse the navbar when page is scrolled
    $(window).scroll(function() {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    });

})(jQuery); // End of use strict

var myCenter=new google.maps.LatLng(47.370674,8.528620);
function initialize() {
  var mapProp = {
    center:myCenter,
    zoom:14,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
  var marker=new google.maps.Marker({
    position:myCenter,
    title:'Naturapraxis'
  });
  marker.setMap(map);
  google.maps.event.addListener(marker,'click',function() {
    map.setZoom(17);
    map.setCenter(marker.getPosition());
  });
}
google.maps.event.addDomListener(window, 'load', initialize);

webpackJsonp([0],{

/***/ 5:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "index.html";

/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(ScrollReveal, __webpack_provided_window_dot_sr, jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_site_scss__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_site_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scss_site_scss__);
/* html-sites */
__webpack_require__(6);

/* Styles */


/* ScrolllReveal */
__webpack_provided_window_dot_sr = ScrollReveal();
__webpack_provided_window_dot_sr.reveal('.sr-left', {
    duration: 1000,
    distance: '50px',
    easing: 'ease',
    origin: 'left',
    rotate: { x: 0, y: 0, z: 0 },
    scale: 0.8
}, 500);

__webpack_provided_window_dot_sr.reveal('.sr-top', {
    duration: 1000,
    distance: '50px',
    easing: 'ease',
    origin: 'top',
    rotate: { x: 0, y: 0, z: 0 },
    scale: 0.8
}, 500);

__webpack_provided_window_dot_sr.reveal('.sr-flip', {
    duration: 1000,
    distance: '0px',
    easing: 'ease',
    origin: 'left',
    rotate: { x: 0, y: -180, z: 0 },
    scale: 0.8
}, 500);

__webpack_provided_window_dot_sr.reveal('.timeline-flip', {
    duration: 1000,
    distance: '0px',
    easing: 'ease',
    origin: 'left',
    rotate: { x: 0, y: -180, z: 0 },
    scale: 0.8
}, 500);

(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing

    $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 54
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
    $('.navbar-collapse>ul>li>a').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Collapse the navbar when page is scrolled
    $(window).scroll(function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    });
})(jQuery); // End of use strict

var myCenter = new google.maps.LatLng(47.370674, 8.528620);
function initialize() {
    var mapProp = {
        center: myCenter,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    var marker = new google.maps.Marker({
        position: myCenter,
        title: 'Naturapraxis'
    });
    marker.setMap(map);
    google.maps.event.addListener(marker, 'click', function () {
        map.setZoom(17);
        map.setCenter(marker.getPosition());
    });
}
google.maps.event.addDomListener(window, 'load', initialize);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1), __webpack_require__(1), __webpack_require__(0)))

/***/ })

},[8]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvc2l0ZUpTLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy9ob21lL2pvcm90aC9ub2RlanMvZ2l0L3BhbmluaS1za2VsZXRvbi1hZ2VuY3kvc291cmNlL25hdHVyYXByYXhpcy9zY3NzL3NpdGUuc2NzcyIsIndlYnBhY2s6Ly8vL2hvbWUvam9yb3RoL25vZGVqcy9naXQvcGFuaW5pLXNrZWxldG9uLWFnZW5jeS9zb3VyY2UvbmF0dXJhcHJheGlzL2h0bWwvaW5kZXguaHRtbCIsIndlYnBhY2s6Ly8vL2hvbWUvam9yb3RoL25vZGVqcy9naXQvcGFuaW5pLXNrZWxldG9uLWFnZW5jeS9zb3VyY2UvbmF0dXJhcHJheGlzL3NjcmlwdHMvc2l0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC9ob21lL2pvcm90aC9ub2RlanMvZ2l0L3BhbmluaS1za2VsZXRvbi1hZ2VuY3kvc291cmNlL25hdHVyYXByYXhpcy9zY3NzL3NpdGUuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbmRleC5odG1sXCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gL2hvbWUvam9yb3RoL25vZGVqcy9naXQvcGFuaW5pLXNrZWxldG9uLWFnZW5jeS9zb3VyY2UvbmF0dXJhcHJheGlzL2h0bWwvaW5kZXguaHRtbFxuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiBodG1sLXNpdGVzICovXG5yZXF1aXJlKCcuLi9odG1sL2luZGV4Lmh0bWwnKTtcblxuLyogU3R5bGVzICovXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4uL3Njc3Mvc2l0ZS5zY3NzJztcblxuLyogU2Nyb2xsbFJldmVhbCAqL1xud2luZG93LnNyID0gU2Nyb2xsUmV2ZWFsKCk7XG53aW5kb3cuc3IucmV2ZWFsKCcuc3ItbGVmdCcsIHtcbiAgICBkdXJhdGlvbjogMTAwMCxcbiAgICBkaXN0YW5jZTogJzUwcHgnLFxuICAgIGVhc2luZzogJ2Vhc2UnLFxuICAgIG9yaWdpbjogJ2xlZnQnLFxuICAgIHJvdGF0ZTogeyB4OiAwLCB5OiAwLCB6OiAwIH0sXG4gICAgc2NhbGU6IDAuOFxufSwgNTAwKTtcblxud2luZG93LnNyLnJldmVhbCgnLnNyLXRvcCcsIHtcbiAgICBkdXJhdGlvbjogMTAwMCxcbiAgICBkaXN0YW5jZTogJzUwcHgnLFxuICAgIGVhc2luZzogJ2Vhc2UnLFxuICAgIG9yaWdpbjogJ3RvcCcsXG4gICAgcm90YXRlOiB7IHg6IDAsIHk6IDAsIHo6IDAgfSxcbiAgICBzY2FsZTogMC44XG59LCA1MDApO1xuXG53aW5kb3cuc3IucmV2ZWFsKCcuc3ItZmxpcCcsIHtcbiAgICBkdXJhdGlvbjogMTAwMCxcbiAgICBkaXN0YW5jZTogJzBweCcsXG4gICAgZWFzaW5nOiAnZWFzZScsXG4gICAgb3JpZ2luOiAnbGVmdCcsXG4gICAgcm90YXRlOiB7IHg6IDAsIHk6IC0xODAsIHo6IDAgfSxcbiAgICBzY2FsZTogMC44XG59LCA1MDApO1xuXG53aW5kb3cuc3IucmV2ZWFsKCcudGltZWxpbmUtZmxpcCcsIHtcbiAgICBkdXJhdGlvbjogMTAwMCxcbiAgICBkaXN0YW5jZTogJzBweCcsXG4gICAgZWFzaW5nOiAnZWFzZScsXG4gICAgb3JpZ2luOiAnbGVmdCcsXG4gICAgcm90YXRlOiB7IHg6IDAsIHk6IC0xODAsIHo6IDAgfSxcbiAgICBzY2FsZTogMC44XG59LCA1MDApO1xuXG4oZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjsgLy8gU3RhcnQgb2YgdXNlIHN0cmljdFxuXG4gICAgLy8gU21vb3RoIHNjcm9sbGluZyB1c2luZyBqUXVlcnkgZWFzaW5nXG5cbiAgICAkKCdhW2hyZWYqPVwiI1wiXTpub3QoW2hyZWY9XCIjXCJdKScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCAnJykgPT0gdGhpcy5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywgJycpICYmIGxvY2F0aW9uLmhvc3RuYW1lID09IHRoaXMuaG9zdG5hbWUpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMuaGFzaCk7XG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQubGVuZ3RoID8gdGFyZ2V0IDogJCgnW25hbWU9JyArIHRoaXMuaGFzaC5zbGljZSgxKSArICddJyk7XG4gICAgICAgICAgICBpZiAodGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wIC0gNTRcbiAgICAgICAgICAgICAgICB9LCAxMDAwLCBcImVhc2VJbk91dEV4cG9cIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBBY3RpdmF0ZSBzY3JvbGxzcHkgdG8gYWRkIGFjdGl2ZSBjbGFzcyB0byBuYXZiYXIgaXRlbXMgb24gc2Nyb2xsXG4gICAgJCgnYm9keScpLnNjcm9sbHNweSh7XG4gICAgICAgIHRhcmdldDogJyNtYWluTmF2JyxcbiAgICAgICAgb2Zmc2V0OiA1NFxuICAgIH0pO1xuXG4gICAgLy8gQ2xvc2VzIHJlc3BvbnNpdmUgbWVudSB3aGVuIGEgbGluayBpcyBjbGlja2VkXG4gICAgJCgnLm5hdmJhci1jb2xsYXBzZT51bD5saT5hJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcubmF2YmFyLWNvbGxhcHNlJykuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICB9KTtcblxuICAgIC8vIENvbGxhcHNlIHRoZSBuYXZiYXIgd2hlbiBwYWdlIGlzIHNjcm9sbGVkXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgkKFwiI21haW5OYXZcIikub2Zmc2V0KCkudG9wID4gMTAwKSB7XG4gICAgICAgICAgICAkKFwiI21haW5OYXZcIikuYWRkQ2xhc3MoXCJuYXZiYXItc2hyaW5rXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJChcIiNtYWluTmF2XCIpLnJlbW92ZUNsYXNzKFwibmF2YmFyLXNocmlua1wiKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSkoalF1ZXJ5KTsgLy8gRW5kIG9mIHVzZSBzdHJpY3RcblxudmFyIG15Q2VudGVyID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg0Ny4zNzA2NzQsIDguNTI4NjIwKTtcbmZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgdmFyIG1hcFByb3AgPSB7XG4gICAgICAgIGNlbnRlcjogbXlDZW50ZXIsXG4gICAgICAgIHpvb206IDE0LFxuICAgICAgICBtYXBUeXBlSWQ6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQXG4gICAgfTtcbiAgICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdvb2dsZU1hcFwiKSwgbWFwUHJvcCk7XG4gICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICBwb3NpdGlvbjogbXlDZW50ZXIsXG4gICAgICAgIHRpdGxlOiAnTmF0dXJhcHJheGlzJ1xuICAgIH0pO1xuICAgIG1hcmtlci5zZXRNYXAobWFwKTtcbiAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbWFwLnNldFpvb20oMTcpO1xuICAgICAgICBtYXAuc2V0Q2VudGVyKG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbiAgICB9KTtcbn1cbmdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHdpbmRvdywgJ2xvYWQnLCBpbml0aWFsaXplKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAvaG9tZS9qb3JvdGgvbm9kZWpzL2dpdC9wYW5pbmktc2tlbGV0b24tYWdlbmN5L3NvdXJjZS9uYXR1cmFwcmF4aXMvc2NyaXB0cy9zaXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7Ozs7OztBQ0FBOzs7Ozs7OztBQ0FBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==
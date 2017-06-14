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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvc2l0ZUpTLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc291cmNlL3Njc3Mvc2l0ZS5zY3NzIiwid2VicGFjazovLy8uL3NvdXJjZS9odG1sL2luZGV4Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NjcmlwdHMvc2l0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc291cmNlL3Njc3Mvc2l0ZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImluZGV4Lmh0bWxcIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NvdXJjZS9odG1sL2luZGV4Lmh0bWxcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyogaHRtbC1zaXRlcyAqL1xucmVxdWlyZSgnLi4vaHRtbC9pbmRleC5odG1sJyk7XG5cbi8qIFN0eWxlcyAqL1xuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi9zY3NzL3NpdGUuc2Nzcyc7XG5cbi8qIFNjcm9sbGxSZXZlYWwgKi9cbndpbmRvdy5zciA9IFNjcm9sbFJldmVhbCgpO1xud2luZG93LnNyLnJldmVhbCgnLnNyLWxlZnQnLCB7XG4gICAgZHVyYXRpb246IDEwMDAsXG4gICAgZGlzdGFuY2U6ICc1MHB4JyxcbiAgICBlYXNpbmc6ICdlYXNlJyxcbiAgICBvcmlnaW46ICdsZWZ0JyxcbiAgICByb3RhdGU6IHsgeDogMCwgeTogMCwgejogMCB9LFxuICAgIHNjYWxlOiAwLjhcbn0sIDUwMCk7XG5cbndpbmRvdy5zci5yZXZlYWwoJy5zci10b3AnLCB7XG4gICAgZHVyYXRpb246IDEwMDAsXG4gICAgZGlzdGFuY2U6ICc1MHB4JyxcbiAgICBlYXNpbmc6ICdlYXNlJyxcbiAgICBvcmlnaW46ICd0b3AnLFxuICAgIHJvdGF0ZTogeyB4OiAwLCB5OiAwLCB6OiAwIH0sXG4gICAgc2NhbGU6IDAuOFxufSwgNTAwKTtcblxud2luZG93LnNyLnJldmVhbCgnLnNyLWZsaXAnLCB7XG4gICAgZHVyYXRpb246IDEwMDAsXG4gICAgZGlzdGFuY2U6ICcwcHgnLFxuICAgIGVhc2luZzogJ2Vhc2UnLFxuICAgIG9yaWdpbjogJ2xlZnQnLFxuICAgIHJvdGF0ZTogeyB4OiAwLCB5OiAtMTgwLCB6OiAwIH0sXG4gICAgc2NhbGU6IDAuOFxufSwgNTAwKTtcblxud2luZG93LnNyLnJldmVhbCgnLnRpbWVsaW5lLWZsaXAnLCB7XG4gICAgZHVyYXRpb246IDEwMDAsXG4gICAgZGlzdGFuY2U6ICcwcHgnLFxuICAgIGVhc2luZzogJ2Vhc2UnLFxuICAgIG9yaWdpbjogJ2xlZnQnLFxuICAgIHJvdGF0ZTogeyB4OiAwLCB5OiAtMTgwLCB6OiAwIH0sXG4gICAgc2NhbGU6IDAuOFxufSwgNTAwKTtcblxuKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7IC8vIFN0YXJ0IG9mIHVzZSBzdHJpY3RcblxuICAgIC8vIFNtb290aCBzY3JvbGxpbmcgdXNpbmcgalF1ZXJ5IGVhc2luZ1xuXG4gICAgJCgnYVtocmVmKj1cIiNcIl06bm90KFtocmVmPVwiI1wiXSknKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywgJycpID09IHRoaXMucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sICcnKSAmJiBsb2NhdGlvbi5ob3N0bmFtZSA9PSB0aGlzLmhvc3RuYW1lKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpO1xuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lmxlbmd0aCA/IHRhcmdldCA6ICQoJ1tuYW1lPScgKyB0aGlzLmhhc2guc2xpY2UoMSkgKyAnXScpO1xuICAgICAgICAgICAgaWYgKHRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcCAtIDU0XG4gICAgICAgICAgICAgICAgfSwgMTAwMCwgXCJlYXNlSW5PdXRFeHBvXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQWN0aXZhdGUgc2Nyb2xsc3B5IHRvIGFkZCBhY3RpdmUgY2xhc3MgdG8gbmF2YmFyIGl0ZW1zIG9uIHNjcm9sbFxuICAgICQoJ2JvZHknKS5zY3JvbGxzcHkoe1xuICAgICAgICB0YXJnZXQ6ICcjbWFpbk5hdicsXG4gICAgICAgIG9mZnNldDogNTRcbiAgICB9KTtcblxuICAgIC8vIENsb3NlcyByZXNwb25zaXZlIG1lbnUgd2hlbiBhIGxpbmsgaXMgY2xpY2tlZFxuICAgICQoJy5uYXZiYXItY29sbGFwc2U+dWw+bGk+YScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnLm5hdmJhci1jb2xsYXBzZScpLmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgfSk7XG5cbiAgICAvLyBDb2xsYXBzZSB0aGUgbmF2YmFyIHdoZW4gcGFnZSBpcyBzY3JvbGxlZFxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoJChcIiNtYWluTmF2XCIpLm9mZnNldCgpLnRvcCA+IDEwMCkge1xuICAgICAgICAgICAgJChcIiNtYWluTmF2XCIpLmFkZENsYXNzKFwibmF2YmFyLXNocmlua1wiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoXCIjbWFpbk5hdlwiKS5yZW1vdmVDbGFzcyhcIm5hdmJhci1zaHJpbmtcIik7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pKGpRdWVyeSk7IC8vIEVuZCBvZiB1c2Ugc3RyaWN0XG5cbnZhciBteUNlbnRlciA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNDcuMzcwNjc0LCA4LjUyODYyMCk7XG5mdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIHZhciBtYXBQcm9wID0ge1xuICAgICAgICBjZW50ZXI6IG15Q2VudGVyLFxuICAgICAgICB6b29tOiAxNCxcbiAgICAgICAgbWFwVHlwZUlkOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUFxuICAgIH07XG4gICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnb29nbGVNYXBcIiksIG1hcFByb3ApO1xuICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgcG9zaXRpb246IG15Q2VudGVyLFxuICAgICAgICB0aXRsZTogJ05hdHVyYXByYXhpcydcbiAgICB9KTtcbiAgICBtYXJrZXIuc2V0TWFwKG1hcCk7XG4gICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG1hcC5zZXRab29tKDE3KTtcbiAgICAgICAgbWFwLnNldENlbnRlcihtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG4gICAgfSk7XG59XG5nb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcih3aW5kb3csICdsb2FkJywgaW5pdGlhbGl6ZSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zb3VyY2Uvc2NyaXB0cy9zaXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7Ozs7OztBQ0FBOzs7Ozs7OztBQ0FBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==
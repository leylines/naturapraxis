webpackJsonp([2],{

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {$(function () {

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function submitError($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function submitSuccess($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "https://formspree.io/simone@naturapraxis.ch",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
                cache: false,
                success: function success() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
                    $('#success > .alert-success').append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success').append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function error() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
                    $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                }
            });
        },
        filter: function filter() {
            return $(this).is(":visible");
        }
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function () {
    $('#success').html('');
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })

},[9]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvY29udGFjdEpTLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc291cmNlL3NjcmlwdHMvY29udGFjdF9tZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIkKGZ1bmN0aW9uICgpIHtcblxuICAgICQoXCIjY29udGFjdEZvcm0gaW5wdXQsI2NvbnRhY3RGb3JtIHRleHRhcmVhXCIpLmpxQm9vdHN0cmFwVmFsaWRhdGlvbih7XG4gICAgICAgIHByZXZlbnRTdWJtaXQ6IHRydWUsXG4gICAgICAgIHN1Ym1pdEVycm9yOiBmdW5jdGlvbiBzdWJtaXRFcnJvcigkZm9ybSwgZXZlbnQsIGVycm9ycykge1xuICAgICAgICAgICAgLy8gYWRkaXRpb25hbCBlcnJvciBtZXNzYWdlcyBvciBldmVudHNcbiAgICAgICAgfSxcbiAgICAgICAgc3VibWl0U3VjY2VzczogZnVuY3Rpb24gc3VibWl0U3VjY2VzcygkZm9ybSwgZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnQgZGVmYXVsdCBzdWJtaXQgYmVoYXZpb3VyXG4gICAgICAgICAgICAvLyBnZXQgdmFsdWVzIGZyb20gRk9STVxuICAgICAgICAgICAgdmFyIG5hbWUgPSAkKFwiaW5wdXQjbmFtZVwiKS52YWwoKTtcbiAgICAgICAgICAgIHZhciBlbWFpbCA9ICQoXCJpbnB1dCNlbWFpbFwiKS52YWwoKTtcbiAgICAgICAgICAgIHZhciBwaG9uZSA9ICQoXCJpbnB1dCNwaG9uZVwiKS52YWwoKTtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gJChcInRleHRhcmVhI21lc3NhZ2VcIikudmFsKCk7XG4gICAgICAgICAgICB2YXIgZmlyc3ROYW1lID0gbmFtZTsgLy8gRm9yIFN1Y2Nlc3MvRmFpbHVyZSBNZXNzYWdlXG4gICAgICAgICAgICAvLyBDaGVjayBmb3Igd2hpdGUgc3BhY2UgaW4gbmFtZSBmb3IgU3VjY2Vzcy9GYWlsIG1lc3NhZ2VcbiAgICAgICAgICAgIGlmIChmaXJzdE5hbWUuaW5kZXhPZignICcpID49IDApIHtcbiAgICAgICAgICAgICAgICBmaXJzdE5hbWUgPSBuYW1lLnNwbGl0KCcgJykuc2xpY2UoMCwgLTEpLmpvaW4oJyAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vZm9ybXNwcmVlLmlvL3NpbW9uZUBuYXR1cmFwcmF4aXMuY2hcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHBob25lOiBwaG9uZSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU3VjY2VzcyBtZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICQoJyNzdWNjZXNzJykuaHRtbChcIjxkaXYgY2xhc3M9J2FsZXJ0IGFsZXJ0LXN1Y2Nlc3MnPlwiKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnI3N1Y2Nlc3MgPiAuYWxlcnQtc3VjY2VzcycpLmh0bWwoXCI8YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3M9J2Nsb3NlJyBkYXRhLWRpc21pc3M9J2FsZXJ0JyBhcmlhLWhpZGRlbj0ndHJ1ZSc+JnRpbWVzO1wiKS5hcHBlbmQoXCI8L2J1dHRvbj5cIik7XG4gICAgICAgICAgICAgICAgICAgICQoJyNzdWNjZXNzID4gLmFsZXJ0LXN1Y2Nlc3MnKS5hcHBlbmQoXCI8c3Ryb25nPllvdXIgbWVzc2FnZSBoYXMgYmVlbiBzZW50LiA8L3N0cm9uZz5cIik7XG4gICAgICAgICAgICAgICAgICAgICQoJyNzdWNjZXNzID4gLmFsZXJ0LXN1Y2Nlc3MnKS5hcHBlbmQoJzwvZGl2PicpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vY2xlYXIgYWxsIGZpZWxkc1xuICAgICAgICAgICAgICAgICAgICAkKCcjY29udGFjdEZvcm0nKS50cmlnZ2VyKFwicmVzZXRcIik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEZhaWwgbWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAkKCcjc3VjY2VzcycpLmh0bWwoXCI8ZGl2IGNsYXNzPSdhbGVydCBhbGVydC1kYW5nZXInPlwiKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnI3N1Y2Nlc3MgPiAuYWxlcnQtZGFuZ2VyJykuaHRtbChcIjxidXR0b24gdHlwZT0nYnV0dG9uJyBjbGFzcz0nY2xvc2UnIGRhdGEtZGlzbWlzcz0nYWxlcnQnIGFyaWEtaGlkZGVuPSd0cnVlJz4mdGltZXM7XCIpLmFwcGVuZChcIjwvYnV0dG9uPlwiKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnI3N1Y2Nlc3MgPiAuYWxlcnQtZGFuZ2VyJykuYXBwZW5kKCQoXCI8c3Ryb25nPlwiKS50ZXh0KFwiU29ycnkgXCIgKyBmaXJzdE5hbWUgKyBcIiwgaXQgc2VlbXMgdGhhdCBteSBtYWlsIHNlcnZlciBpcyBub3QgcmVzcG9uZGluZy4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlciFcIikpO1xuICAgICAgICAgICAgICAgICAgICAkKCcjc3VjY2VzcyA+IC5hbGVydC1kYW5nZXInKS5hcHBlbmQoJzwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICAvL2NsZWFyIGFsbCBmaWVsZHNcbiAgICAgICAgICAgICAgICAgICAgJCgnI2NvbnRhY3RGb3JtJykudHJpZ2dlcihcInJlc2V0XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIGZpbHRlcigpIHtcbiAgICAgICAgICAgIHJldHVybiAkKHRoaXMpLmlzKFwiOnZpc2libGVcIik7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoXCJhW2RhdGEtdG9nZ2xlPVxcXCJ0YWJcXFwiXVwiKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQodGhpcykudGFiKFwic2hvd1wiKTtcbiAgICB9KTtcbn0pO1xuXG4vKldoZW4gY2xpY2tpbmcgb24gRnVsbCBoaWRlIGZhaWwvc3VjY2VzcyBib3hlcyAqL1xuJCgnI25hbWUnKS5mb2N1cyhmdW5jdGlvbiAoKSB7XG4gICAgJCgnI3N1Y2Nlc3MnKS5odG1sKCcnKTtcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc291cmNlL3NjcmlwdHMvY29udGFjdF9tZS5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDIiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==
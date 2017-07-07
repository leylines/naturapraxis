webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* jqBootstrapValidation
 * A plugin for automating validation on Twitter Bootstrap formatted forms.
 *
 * v1.3.6
 *
 * License: MIT <http://opensource.org/licenses/mit-license.php> - see LICENSE file
 *
 * http://ReactiveRaven.github.com/jqBootstrapValidation/
 */

(function ($) {

  var createdElements = [];

  var defaults = {
    options: {
      prependExistingHelpBlock: false,
      sniffHtml: true, // sniff for 'required', 'maxlength', etc
      preventSubmit: true, // stop the form submit event from firing if validation fails
      submitError: false, // function called if there is an error when trying to submit
      submitSuccess: false, // function called just before a successful submit event is sent to the server
      semanticallyStrict: false, // set to true to tidy up generated HTML output
      autoAdd: {
        helpBlocks: true
      },
      filter: function filter() {
        // return $(this).is(":visible"); // only validate elements you can see
        return true; // validate everything
      }
    },
    methods: {
      init: function init(options) {

        var settings = $.extend(true, {}, defaults);

        settings.options = $.extend(true, settings.options, options);

        var $siblingElements = this;

        var uniqueForms = $.unique($siblingElements.map(function () {
          return $(this).parents("form")[0];
        }).toArray());

        $(uniqueForms).bind("submit", function (e) {
          var $form = $(this);
          var warningsFound = 0;
          var $inputs = $form.find("input,textarea,select").not("[type=submit],[type=image]").filter(settings.options.filter);
          $inputs.trigger("submit.validation").trigger("validationLostFocus.validation");

          $inputs.each(function (i, el) {
            var $this = $(el),
                $controlGroup = $this.parents(".form-group").first();
            if ($controlGroup.hasClass("warning")) {
              $controlGroup.removeClass("warning").addClass("error");
              warningsFound++;
            }
          });

          $inputs.trigger("validationLostFocus.validation");

          if (warningsFound) {
            if (settings.options.preventSubmit) {
              e.preventDefault();
            }
            $form.addClass("error");
            if ($.isFunction(settings.options.submitError)) {
              settings.options.submitError($form, e, $inputs.jqBootstrapValidation("collectErrors", true));
            }
          } else {
            $form.removeClass("error");
            if ($.isFunction(settings.options.submitSuccess)) {
              settings.options.submitSuccess($form, e);
            }
          }
        });

        return this.each(function () {

          // Get references to everything we're interested in
          var $this = $(this),
              $controlGroup = $this.parents(".form-group").first(),
              $helpBlock = $controlGroup.find(".help-block").first(),
              $form = $this.parents("form").first(),
              validatorNames = [];

          // create message container if not exists
          if (!$helpBlock.length && settings.options.autoAdd && settings.options.autoAdd.helpBlocks) {
            $helpBlock = $('<div class="help-block" />');
            $controlGroup.find('.controls').append($helpBlock);
            createdElements.push($helpBlock[0]);
          }

          // =============================================================
          //                                     SNIFF HTML FOR VALIDATORS
          // =============================================================

          // *snort sniff snuffle*

          if (settings.options.sniffHtml) {
            var message = "";
            // ---------------------------------------------------------
            //                                                   PATTERN
            // ---------------------------------------------------------
            if ($this.attr("pattern") !== undefined) {
              message = "Not in the expected format<!-- data-validation-pattern-message to override -->";
              if ($this.data("validationPatternMessage")) {
                message = $this.data("validationPatternMessage");
              }
              $this.data("validationPatternMessage", message);
              $this.data("validationPatternRegex", $this.attr("pattern"));
            }
            // ---------------------------------------------------------
            //                                                       MAX
            // ---------------------------------------------------------
            if ($this.attr("max") !== undefined || $this.attr("aria-valuemax") !== undefined) {
              var max = $this.attr("max") !== undefined ? $this.attr("max") : $this.attr("aria-valuemax");
              message = "Too high: Maximum of '" + max + "'<!-- data-validation-max-message to override -->";
              if ($this.data("validationMaxMessage")) {
                message = $this.data("validationMaxMessage");
              }
              $this.data("validationMaxMessage", message);
              $this.data("validationMaxMax", max);
            }
            // ---------------------------------------------------------
            //                                                       MIN
            // ---------------------------------------------------------
            if ($this.attr("min") !== undefined || $this.attr("aria-valuemin") !== undefined) {
              var min = $this.attr("min") !== undefined ? $this.attr("min") : $this.attr("aria-valuemin");
              message = "Too low: Minimum of '" + min + "'<!-- data-validation-min-message to override -->";
              if ($this.data("validationMinMessage")) {
                message = $this.data("validationMinMessage");
              }
              $this.data("validationMinMessage", message);
              $this.data("validationMinMin", min);
            }
            // ---------------------------------------------------------
            //                                                 MAXLENGTH
            // ---------------------------------------------------------
            if ($this.attr("maxlength") !== undefined) {
              message = "Too long: Maximum of '" + $this.attr("maxlength") + "' characters<!-- data-validation-maxlength-message to override -->";
              if ($this.data("validationMaxlengthMessage")) {
                message = $this.data("validationMaxlengthMessage");
              }
              $this.data("validationMaxlengthMessage", message);
              $this.data("validationMaxlengthMaxlength", $this.attr("maxlength"));
            }
            // ---------------------------------------------------------
            //                                                 MINLENGTH
            // ---------------------------------------------------------
            if ($this.attr("minlength") !== undefined) {
              message = "Too short: Minimum of '" + $this.attr("minlength") + "' characters<!-- data-validation-minlength-message to override -->";
              if ($this.data("validationMinlengthMessage")) {
                message = $this.data("validationMinlengthMessage");
              }
              $this.data("validationMinlengthMessage", message);
              $this.data("validationMinlengthMinlength", $this.attr("minlength"));
            }
            // ---------------------------------------------------------
            //                                                  REQUIRED
            // ---------------------------------------------------------
            if ($this.attr("required") !== undefined || $this.attr("aria-required") !== undefined) {
              message = settings.builtInValidators.required.message;
              if ($this.data("validationRequiredMessage")) {
                message = $this.data("validationRequiredMessage");
              }
              $this.data("validationRequiredMessage", message);
            }
            // ---------------------------------------------------------
            //                                                    NUMBER
            // ---------------------------------------------------------
            if ($this.attr("type") !== undefined && $this.attr("type").toLowerCase() === "number") {
              message = settings.builtInValidators.number.message;
              if ($this.data("validationNumberMessage")) {
                message = $this.data("validationNumberMessage");
              }
              $this.data("validationNumberMessage", message);
            }
            // ---------------------------------------------------------
            //                                                     EMAIL
            // ---------------------------------------------------------
            if ($this.attr("type") !== undefined && $this.attr("type").toLowerCase() === "email") {
              message = "Not a valid email address<!-- data-validator-validemail-message to override -->";
              if ($this.data("validationValidemailMessage")) {
                message = $this.data("validationValidemailMessage");
              } else if ($this.data("validationEmailMessage")) {
                message = $this.data("validationEmailMessage");
              }
              $this.data("validationValidemailMessage", message);
            }
            // ---------------------------------------------------------
            //                                                MINCHECKED
            // ---------------------------------------------------------
            if ($this.attr("minchecked") !== undefined) {
              message = "Not enough options checked; Minimum of '" + $this.attr("minchecked") + "' required<!-- data-validation-minchecked-message to override -->";
              if ($this.data("validationMincheckedMessage")) {
                message = $this.data("validationMincheckedMessage");
              }
              $this.data("validationMincheckedMessage", message);
              $this.data("validationMincheckedMinchecked", $this.attr("minchecked"));
            }
            // ---------------------------------------------------------
            //                                                MAXCHECKED
            // ---------------------------------------------------------
            if ($this.attr("maxchecked") !== undefined) {
              message = "Too many options checked; Maximum of '" + $this.attr("maxchecked") + "' required<!-- data-validation-maxchecked-message to override -->";
              if ($this.data("validationMaxcheckedMessage")) {
                message = $this.data("validationMaxcheckedMessage");
              }
              $this.data("validationMaxcheckedMessage", message);
              $this.data("validationMaxcheckedMaxchecked", $this.attr("maxchecked"));
            }
          }

          // =============================================================
          //                                       COLLECT VALIDATOR NAMES
          // =============================================================

          // Get named validators
          if ($this.data("validation") !== undefined) {
            validatorNames = $this.data("validation").split(",");
          }

          // Get extra ones defined on the element's data attributes
          $.each($this.data(), function (i, el) {
            var parts = i.replace(/([A-Z])/g, ",$1").split(",");
            if (parts[0] === "validation" && parts[1]) {
              validatorNames.push(parts[1]);
            }
          });

          // =============================================================
          //                                     NORMALISE VALIDATOR NAMES
          // =============================================================

          var validatorNamesToInspect = validatorNames;
          var newValidatorNamesToInspect = [];

          do // repeatedly expand 'shortcut' validators into their real validators
          {
            // Uppercase only the first letter of each name
            $.each(validatorNames, function (i, el) {
              validatorNames[i] = formatValidatorName(el);
            });

            // Remove duplicate validator names
            validatorNames = $.unique(validatorNames);

            // Pull out the new validator names from each shortcut
            newValidatorNamesToInspect = [];
            $.each(validatorNamesToInspect, function (i, el) {
              if ($this.data("validation" + el + "Shortcut") !== undefined) {
                // Are these custom validators?
                // Pull them out!
                $.each($this.data("validation" + el + "Shortcut").split(","), function (i2, el2) {
                  newValidatorNamesToInspect.push(el2);
                });
              } else if (settings.builtInValidators[el.toLowerCase()]) {
                // Is this a recognised built-in?
                // Pull it out!
                var validator = settings.builtInValidators[el.toLowerCase()];
                if (validator.type.toLowerCase() === "shortcut") {
                  $.each(validator.shortcut.split(","), function (i, el) {
                    el = formatValidatorName(el);
                    newValidatorNamesToInspect.push(el);
                    validatorNames.push(el);
                  });
                }
              }
            });

            validatorNamesToInspect = newValidatorNamesToInspect;
          } while (validatorNamesToInspect.length > 0);

          // =============================================================
          //                                       SET UP VALIDATOR ARRAYS
          // =============================================================

          var validators = {};

          $.each(validatorNames, function (i, el) {
            // Set up the 'override' message
            var message = $this.data("validation" + el + "Message");
            var hasOverrideMessage = message !== undefined;
            var foundValidator = false;
            message = message ? message : "'" + el + "' validation failed <!-- Add attribute 'data-validation-" + el.toLowerCase() + "-message' to input to change this message -->";

            $.each(settings.validatorTypes, function (validatorType, validatorTemplate) {
              if (validators[validatorType] === undefined) {
                validators[validatorType] = [];
              }
              if (!foundValidator && $this.data("validation" + el + formatValidatorName(validatorTemplate.name)) !== undefined) {
                validators[validatorType].push($.extend(true, {
                  name: formatValidatorName(validatorTemplate.name),
                  message: message
                }, validatorTemplate.init($this, el)));
                foundValidator = true;
              }
            });

            if (!foundValidator && settings.builtInValidators[el.toLowerCase()]) {

              var validator = $.extend(true, {}, settings.builtInValidators[el.toLowerCase()]);
              if (hasOverrideMessage) {
                validator.message = message;
              }
              var validatorType = validator.type.toLowerCase();

              if (validatorType === "shortcut") {
                foundValidator = true;
              } else {
                $.each(settings.validatorTypes, function (validatorTemplateType, validatorTemplate) {
                  if (validators[validatorTemplateType] === undefined) {
                    validators[validatorTemplateType] = [];
                  }
                  if (!foundValidator && validatorType === validatorTemplateType.toLowerCase()) {
                    $this.data("validation" + el + formatValidatorName(validatorTemplate.name), validator[validatorTemplate.name.toLowerCase()]);
                    validators[validatorType].push($.extend(validator, validatorTemplate.init($this, el)));
                    foundValidator = true;
                  }
                });
              }
            }

            if (!foundValidator) {
              $.error("Cannot find validation info for '" + el + "'");
            }
          });

          // =============================================================
          //                                         STORE FALLBACK VALUES
          // =============================================================

          $helpBlock.data("original-contents", $helpBlock.data("original-contents") ? $helpBlock.data("original-contents") : $helpBlock.html());

          $helpBlock.data("original-role", $helpBlock.data("original-role") ? $helpBlock.data("original-role") : $helpBlock.attr("role"));

          $controlGroup.data("original-classes", $controlGroup.data("original-clases") ? $controlGroup.data("original-classes") : $controlGroup.attr("class"));

          $this.data("original-aria-invalid", $this.data("original-aria-invalid") ? $this.data("original-aria-invalid") : $this.attr("aria-invalid"));

          // =============================================================
          //                                                    VALIDATION
          // =============================================================

          $this.bind("validation.validation", function (event, params) {

            var value = getValue($this);

            // Get a list of the errors to apply
            var errorsFound = [];

            $.each(validators, function (validatorType, validatorTypeArray) {
              if (value || value.length || params && params.includeEmpty || !!settings.validatorTypes[validatorType].blockSubmit && params && !!params.submitting) {
                $.each(validatorTypeArray, function (i, validator) {
                  if (settings.validatorTypes[validatorType].validate($this, value, validator)) {
                    errorsFound.push(validator.message);
                  }
                });
              }
            });

            return errorsFound;
          });

          $this.bind("getValidators.validation", function () {
            return validators;
          });

          // =============================================================
          //                                             WATCH FOR CHANGES
          // =============================================================
          $this.bind("submit.validation", function () {
            return $this.triggerHandler("change.validation", { submitting: true });
          });
          $this.bind(["keyup", "focus", "blur", "click", "keydown", "keypress", "change"].join(".validation ") + ".validation", function (e, params) {

            var value = getValue($this);

            var errorsFound = [];

            $controlGroup.find("input,textarea,select").each(function (i, el) {
              var oldCount = errorsFound.length;
              $.each($(el).triggerHandler("validation.validation", params), function (j, message) {
                errorsFound.push(message);
              });
              if (errorsFound.length > oldCount) {
                $(el).attr("aria-invalid", "true");
              } else {
                var original = $this.data("original-aria-invalid");
                $(el).attr("aria-invalid", original !== undefined ? original : false);
              }
            });

            $form.find("input,select,textarea").not($this).not("[name=\"" + $this.attr("name") + "\"]").trigger("validationLostFocus.validation");

            errorsFound = $.unique(errorsFound.sort());

            // Were there any errors?
            if (errorsFound.length) {
              // Better flag it up as a warning.
              $controlGroup.removeClass("success error").addClass("warning");

              // How many errors did we find?
              if (settings.options.semanticallyStrict && errorsFound.length === 1) {
                // Only one? Being strict? Just output it.
                $helpBlock.html(errorsFound[0] + (settings.options.prependExistingHelpBlock ? $helpBlock.data("original-contents") : ""));
              } else {
                // Multiple? Being sloppy? Glue them together into an UL.
                $helpBlock.html("<ul role=\"alert\"><li>" + errorsFound.join("</li><li>") + "</li></ul>" + (settings.options.prependExistingHelpBlock ? $helpBlock.data("original-contents") : ""));
              }
            } else {
              $controlGroup.removeClass("warning error success");
              if (value.length > 0) {
                $controlGroup.addClass("success");
              }
              $helpBlock.html($helpBlock.data("original-contents"));
            }

            if (e.type === "blur") {
              $controlGroup.removeClass("success");
            }
          });
          $this.bind("validationLostFocus.validation", function () {
            $controlGroup.removeClass("success");
          });
        });
      },
      destroy: function destroy() {

        return this.each(function () {

          var $this = $(this),
              $controlGroup = $this.parents(".form-group").first(),
              $helpBlock = $controlGroup.find(".help-block").first();

          // remove our events
          $this.unbind('.validation'); // events are namespaced.
          // reset help text
          $helpBlock.html($helpBlock.data("original-contents"));
          // reset classes
          $controlGroup.attr("class", $controlGroup.data("original-classes"));
          // reset aria
          $this.attr("aria-invalid", $this.data("original-aria-invalid"));
          // reset role
          $helpBlock.attr("role", $this.data("original-role"));
          // remove all elements we created
          if (createdElements.indexOf($helpBlock[0]) > -1) {
            $helpBlock.remove();
          }
        });
      },
      collectErrors: function collectErrors(includeEmpty) {

        var errorMessages = {};
        this.each(function (i, el) {
          var $el = $(el);
          var name = $el.attr("name");
          var errors = $el.triggerHandler("validation.validation", { includeEmpty: true });
          errorMessages[name] = $.extend(true, errors, errorMessages[name]);
        });

        $.each(errorMessages, function (i, el) {
          if (el.length === 0) {
            delete errorMessages[i];
          }
        });

        return errorMessages;
      },
      hasErrors: function hasErrors() {

        var errorMessages = [];

        this.each(function (i, el) {
          errorMessages = errorMessages.concat($(el).triggerHandler("getValidators.validation") ? $(el).triggerHandler("validation.validation", { submitting: true }) : []);
        });

        return errorMessages.length > 0;
      },
      override: function override(newDefaults) {
        defaults = $.extend(true, defaults, newDefaults);
      }
    },
    validatorTypes: {
      callback: {
        name: "callback",
        init: function init($this, name) {
          return {
            validatorName: name,
            callback: $this.data("validation" + name + "Callback"),
            lastValue: $this.val(),
            lastValid: true,
            lastFinished: true
          };
        },
        validate: function validate($this, value, validator) {
          if (validator.lastValue === value && validator.lastFinished) {
            return !validator.lastValid;
          }

          if (validator.lastFinished === true) {
            validator.lastValue = value;
            validator.lastValid = true;
            validator.lastFinished = false;

            var rrjqbvValidator = validator;
            var rrjqbvThis = $this;
            executeFunctionByName(validator.callback, window, $this, value, function (data) {
              if (rrjqbvValidator.lastValue === data.value) {
                rrjqbvValidator.lastValid = data.valid;
                if (data.message) {
                  rrjqbvValidator.message = data.message;
                }
                rrjqbvValidator.lastFinished = true;
                rrjqbvThis.data("validation" + rrjqbvValidator.validatorName + "Message", rrjqbvValidator.message);
                // Timeout is set to avoid problems with the events being considered 'already fired'
                setTimeout(function () {
                  rrjqbvThis.trigger("change.validation");
                }, 1); // doesn't need a long timeout, just long enough for the event bubble to burst
              }
            });
          }

          return false;
        }
      },
      ajax: {
        name: "ajax",
        init: function init($this, name) {
          return {
            validatorName: name,
            url: $this.data("validation" + name + "Ajax"),
            lastValue: $this.val(),
            lastValid: true,
            lastFinished: true
          };
        },
        validate: function validate($this, value, validator) {
          if ("" + validator.lastValue === "" + value && validator.lastFinished === true) {
            return validator.lastValid === false;
          }

          if (validator.lastFinished === true) {
            validator.lastValue = value;
            validator.lastValid = true;
            validator.lastFinished = false;
            $.ajax({
              url: validator.url,
              data: "value=" + value + "&field=" + $this.attr("name"),
              dataType: "json",
              success: function success(data) {
                if ("" + validator.lastValue === "" + data.value) {
                  validator.lastValid = !!data.valid;
                  if (data.message) {
                    validator.message = data.message;
                  }
                  validator.lastFinished = true;
                  $this.data("validation" + validator.validatorName + "Message", validator.message);
                  // Timeout is set to avoid problems with the events being considered 'already fired'
                  setTimeout(function () {
                    $this.trigger("change.validation");
                  }, 1); // doesn't need a long timeout, just long enough for the event bubble to burst
                }
              },
              failure: function failure() {
                validator.lastValid = true;
                validator.message = "ajax call failed";
                validator.lastFinished = true;
                $this.data("validation" + validator.validatorName + "Message", validator.message);
                // Timeout is set to avoid problems with the events being considered 'already fired'
                setTimeout(function () {
                  $this.trigger("change.validation");
                }, 1); // doesn't need a long timeout, just long enough for the event bubble to burst
              }
            });
          }

          return false;
        }
      },
      regex: {
        name: "regex",
        init: function init($this, name) {
          return { regex: regexFromString($this.data("validation" + name + "Regex")) };
        },
        validate: function validate($this, value, validator) {
          return !validator.regex.test(value) && !validator.negative || validator.regex.test(value) && validator.negative;
        }
      },
      required: {
        name: "required",
        init: function init($this, name) {
          return {};
        },
        validate: function validate($this, value, validator) {
          return !!(value.length === 0 && !validator.negative) || !!(value.length > 0 && validator.negative);
        },
        blockSubmit: true
      },
      match: {
        name: "match",
        init: function init($this, name) {
          var element = $this.parents("form").first().find("[name=\"" + $this.data("validation" + name + "Match") + "\"]").first();
          element.bind("validation.validation", function () {
            $this.trigger("change.validation", { submitting: true });
          });
          return { "element": element };
        },
        validate: function validate($this, value, validator) {
          return value !== validator.element.val() && !validator.negative || value === validator.element.val() && validator.negative;
        },
        blockSubmit: true
      },
      max: {
        name: "max",
        init: function init($this, name) {
          return { max: $this.data("validation" + name + "Max") };
        },
        validate: function validate($this, value, validator) {
          return parseFloat(value, 10) > parseFloat(validator.max, 10) && !validator.negative || parseFloat(value, 10) <= parseFloat(validator.max, 10) && validator.negative;
        }
      },
      min: {
        name: "min",
        init: function init($this, name) {
          return { min: $this.data("validation" + name + "Min") };
        },
        validate: function validate($this, value, validator) {
          return parseFloat(value) < parseFloat(validator.min) && !validator.negative || parseFloat(value) >= parseFloat(validator.min) && validator.negative;
        }
      },
      maxlength: {
        name: "maxlength",
        init: function init($this, name) {
          return { maxlength: $this.data("validation" + name + "Maxlength") };
        },
        validate: function validate($this, value, validator) {
          return value.length > validator.maxlength && !validator.negative || value.length <= validator.maxlength && validator.negative;
        }
      },
      minlength: {
        name: "minlength",
        init: function init($this, name) {
          return { minlength: $this.data("validation" + name + "Minlength") };
        },
        validate: function validate($this, value, validator) {
          return value.length < validator.minlength && !validator.negative || value.length >= validator.minlength && validator.negative;
        }
      },
      maxchecked: {
        name: "maxchecked",
        init: function init($this, name) {
          var elements = $this.parents("form").first().find("[name=\"" + $this.attr("name") + "\"]");
          elements.bind("click.validation", function () {
            $this.trigger("change.validation", { includeEmpty: true });
          });
          return { maxchecked: $this.data("validation" + name + "Maxchecked"), elements: elements };
        },
        validate: function validate($this, value, validator) {
          return validator.elements.filter(":checked").length > validator.maxchecked && !validator.negative || validator.elements.filter(":checked").length <= validator.maxchecked && validator.negative;
        },
        blockSubmit: true
      },
      minchecked: {
        name: "minchecked",
        init: function init($this, name) {
          var elements = $this.parents("form").first().find("[name=\"" + $this.attr("name") + "\"]");
          elements.bind("click.validation", function () {
            $this.trigger("change.validation", { includeEmpty: true });
          });
          return { minchecked: $this.data("validation" + name + "Minchecked"), elements: elements };
        },
        validate: function validate($this, value, validator) {
          return validator.elements.filter(":checked").length < validator.minchecked && !validator.negative || validator.elements.filter(":checked").length >= validator.minchecked && validator.negative;
        },
        blockSubmit: true
      }
    },
    builtInValidators: {
      email: {
        name: "Email",
        type: "shortcut",
        shortcut: "validemail"
      },
      validemail: {
        name: "Validemail",
        type: "regex",
        regex: "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\\.[A-Za-z]{2,4}",
        message: "Not a valid email address<!-- data-validator-validemail-message to override -->"
      },
      passwordagain: {
        name: "Passwordagain",
        type: "match",
        match: "password",
        message: "Does not match the given password<!-- data-validator-paswordagain-message to override -->"
      },
      positive: {
        name: "Positive",
        type: "shortcut",
        shortcut: "number,positivenumber"
      },
      negative: {
        name: "Negative",
        type: "shortcut",
        shortcut: "number,negativenumber"
      },
      number: {
        name: "Number",
        type: "regex",
        regex: "([+-]?\\\d+(\\\.\\\d*)?([eE][+-]?[0-9]+)?)?",
        message: "Must be a number<!-- data-validator-number-message to override -->"
      },
      integer: {
        name: "Integer",
        type: "regex",
        regex: "[+-]?\\\d+",
        message: "No decimal places allowed<!-- data-validator-integer-message to override -->"
      },
      positivenumber: {
        name: "Positivenumber",
        type: "min",
        min: 0,
        message: "Must be a positive number<!-- data-validator-positivenumber-message to override -->"
      },
      negativenumber: {
        name: "Negativenumber",
        type: "max",
        max: 0,
        message: "Must be a negative number<!-- data-validator-negativenumber-message to override -->"
      },
      required: {
        name: "Required",
        type: "required",
        message: "This is required<!-- data-validator-required-message to override -->"
      },
      checkone: {
        name: "Checkone",
        type: "minchecked",
        minchecked: 1,
        message: "Check at least one option<!-- data-validation-checkone-message to override -->"
      }
    }
  };

  var formatValidatorName = function formatValidatorName(name) {
    return name.toLowerCase().replace(/(^|\s)([a-z])/g, function (m, p1, p2) {
      return p1 + p2.toUpperCase();
    });
  };

  var getValue = function getValue($this) {
    // Extract the value we're talking about
    var value = $this.val();
    var type = $this.attr("type");
    if (type === "checkbox") {
      value = $this.is(":checked") ? value : "";
    }
    if (type === "radio") {
      value = $('input[name="' + $this.attr("name") + '"]:checked').length > 0 ? value : "";
    }
    return value;
  };

  function regexFromString(inputstring) {
    return new RegExp("^" + inputstring + "$");
  }

  /**
   * Thanks to Jason Bunting via StackOverflow.com
   *
   * http://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string#answer-359910
   * Short link: http://tinyurl.com/executeFunctionByName
  **/
  function executeFunctionByName(functionName, context /*, args*/) {
    var args = Array.prototype.slice.call(arguments).splice(2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
      context = context[namespaces[i]];
    }
    return context[func].apply(this, args);
  }

  $.fn.jqBootstrapValidation = function (method) {

    if (defaults.methods[method]) {
      return defaults.methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if ((typeof method === "undefined" ? "undefined" : _typeof(method)) === 'object' || !method) {
      return defaults.methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.jqBootstrapValidation');
      return null;
    }
  };

  $.jqBootstrapValidation = function (options) {
    $(":input").not("[type=image],[type=submit]").jqBootstrapValidation.apply(this, arguments);
  };
})(jQuery);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(ScrollReveal, __webpack_provided_window_dot_sr, jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_site_scss__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_site_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scss_site_scss__);
/* html-sites */
//var context = require.context('../html', true, /\.(html)$/);
//var htmlfiles={};

//context.keys().forEach((filename)=>{
//  htmlfiles[filename] = context(filename);
//});

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

__webpack_provided_window_dot_sr.reveal('.contact-top', {
    duration: 500,
    distance: '50px',
    easing: 'ease',
    origin: 'top',
    rotate: { x: 0, y: 0, z: 0 },
    scale: 0.8
}, 100);

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

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5);
__webpack_require__(3);
module.exports = __webpack_require__(4);


/***/ })
],[9]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvc2l0ZUpTLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc291cmNlL3NjcmlwdHMvY29udGFjdF9tZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2NyaXB0cy9qcUJvb3RzdHJhcFZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL3NjcmlwdHMvc2l0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2Uvc2Nzcy9zaXRlLnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbiAoKSB7XG5cbiAgICAkKFwiI2NvbnRhY3RGb3JtIGlucHV0LCNjb250YWN0Rm9ybSB0ZXh0YXJlYVwiKS5qcUJvb3RzdHJhcFZhbGlkYXRpb24oe1xuICAgICAgICBwcmV2ZW50U3VibWl0OiB0cnVlLFxuICAgICAgICBzdWJtaXRFcnJvcjogZnVuY3Rpb24gc3VibWl0RXJyb3IoJGZvcm0sIGV2ZW50LCBlcnJvcnMpIHtcbiAgICAgICAgICAgIC8vIGFkZGl0aW9uYWwgZXJyb3IgbWVzc2FnZXMgb3IgZXZlbnRzXG4gICAgICAgIH0sXG4gICAgICAgIHN1Ym1pdFN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Ym1pdFN1Y2Nlc3MoJGZvcm0sIGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50IGRlZmF1bHQgc3VibWl0IGJlaGF2aW91clxuICAgICAgICAgICAgLy8gZ2V0IHZhbHVlcyBmcm9tIEZPUk1cbiAgICAgICAgICAgIHZhciBuYW1lID0gJChcImlucHV0I25hbWVcIikudmFsKCk7XG4gICAgICAgICAgICB2YXIgZW1haWwgPSAkKFwiaW5wdXQjZW1haWxcIikudmFsKCk7XG4gICAgICAgICAgICB2YXIgcGhvbmUgPSAkKFwiaW5wdXQjcGhvbmVcIikudmFsKCk7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9ICQoXCJ0ZXh0YXJlYSNtZXNzYWdlXCIpLnZhbCgpO1xuICAgICAgICAgICAgdmFyIGZpcnN0TmFtZSA9IG5hbWU7IC8vIEZvciBTdWNjZXNzL0ZhaWx1cmUgTWVzc2FnZVxuICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIHdoaXRlIHNwYWNlIGluIG5hbWUgZm9yIFN1Y2Nlc3MvRmFpbCBtZXNzYWdlXG4gICAgICAgICAgICBpZiAoZmlyc3ROYW1lLmluZGV4T2YoJyAnKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgZmlyc3ROYW1lID0gbmFtZS5zcGxpdCgnICcpLnNsaWNlKDAsIC0xKS5qb2luKCcgJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogXCJodHRwczovL2Zvcm1zcHJlZS5pby9zaW1vbmVAbmF0dXJhcHJheGlzLmNoXCIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICAgICAgICBwaG9uZTogcGhvbmUsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3MoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFN1Y2Nlc3MgbWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAkKCcjc3VjY2VzcycpLmh0bWwoXCI8ZGl2IGNsYXNzPSdhbGVydCBhbGVydC1zdWNjZXNzJz5cIik7XG4gICAgICAgICAgICAgICAgICAgICQoJyNzdWNjZXNzID4gLmFsZXJ0LXN1Y2Nlc3MnKS5odG1sKFwiPGJ1dHRvbiB0eXBlPSdidXR0b24nIGNsYXNzPSdjbG9zZScgZGF0YS1kaXNtaXNzPSdhbGVydCcgYXJpYS1oaWRkZW49J3RydWUnPiZ0aW1lcztcIikuYXBwZW5kKFwiPC9idXR0b24+XCIpO1xuICAgICAgICAgICAgICAgICAgICAkKCcjc3VjY2VzcyA+IC5hbGVydC1zdWNjZXNzJykuYXBwZW5kKFwiPHN0cm9uZz5Zb3VyIG1lc3NhZ2UgaGFzIGJlZW4gc2VudC4gPC9zdHJvbmc+XCIpO1xuICAgICAgICAgICAgICAgICAgICAkKCcjc3VjY2VzcyA+IC5hbGVydC1zdWNjZXNzJykuYXBwZW5kKCc8L2Rpdj4nKTtcblxuICAgICAgICAgICAgICAgICAgICAvL2NsZWFyIGFsbCBmaWVsZHNcbiAgICAgICAgICAgICAgICAgICAgJCgnI2NvbnRhY3RGb3JtJykudHJpZ2dlcihcInJlc2V0XCIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBGYWlsIG1lc3NhZ2VcbiAgICAgICAgICAgICAgICAgICAgJCgnI3N1Y2Nlc3MnKS5odG1sKFwiPGRpdiBjbGFzcz0nYWxlcnQgYWxlcnQtZGFuZ2VyJz5cIik7XG4gICAgICAgICAgICAgICAgICAgICQoJyNzdWNjZXNzID4gLmFsZXJ0LWRhbmdlcicpLmh0bWwoXCI8YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3M9J2Nsb3NlJyBkYXRhLWRpc21pc3M9J2FsZXJ0JyBhcmlhLWhpZGRlbj0ndHJ1ZSc+JnRpbWVzO1wiKS5hcHBlbmQoXCI8L2J1dHRvbj5cIik7XG4gICAgICAgICAgICAgICAgICAgICQoJyNzdWNjZXNzID4gLmFsZXJ0LWRhbmdlcicpLmFwcGVuZCgkKFwiPHN0cm9uZz5cIikudGV4dChcIlNvcnJ5IFwiICsgZmlyc3ROYW1lICsgXCIsIGl0IHNlZW1zIHRoYXQgbXkgbWFpbCBzZXJ2ZXIgaXMgbm90IHJlc3BvbmRpbmcuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIhXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnI3N1Y2Nlc3MgPiAuYWxlcnQtZGFuZ2VyJykuYXBwZW5kKCc8L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jbGVhciBhbGwgZmllbGRzXG4gICAgICAgICAgICAgICAgICAgICQoJyNjb250YWN0Rm9ybScpLnRyaWdnZXIoXCJyZXNldFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiBmaWx0ZXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5pcyhcIjp2aXNpYmxlXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKFwiYVtkYXRhLXRvZ2dsZT1cXFwidGFiXFxcIl1cIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKHRoaXMpLnRhYihcInNob3dcIik7XG4gICAgfSk7XG59KTtcblxuLypXaGVuIGNsaWNraW5nIG9uIEZ1bGwgaGlkZSBmYWlsL3N1Y2Nlc3MgYm94ZXMgKi9cbiQoJyNuYW1lJykuZm9jdXMoZnVuY3Rpb24gKCkge1xuICAgICQoJyNzdWNjZXNzJykuaHRtbCgnJyk7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NvdXJjZS9zY3JpcHRzL2NvbnRhY3RfbWUuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG4vKiBqcUJvb3RzdHJhcFZhbGlkYXRpb25cbiAqIEEgcGx1Z2luIGZvciBhdXRvbWF0aW5nIHZhbGlkYXRpb24gb24gVHdpdHRlciBCb290c3RyYXAgZm9ybWF0dGVkIGZvcm1zLlxuICpcbiAqIHYxLjMuNlxuICpcbiAqIExpY2Vuc2U6IE1JVCA8aHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocD4gLSBzZWUgTElDRU5TRSBmaWxlXG4gKlxuICogaHR0cDovL1JlYWN0aXZlUmF2ZW4uZ2l0aHViLmNvbS9qcUJvb3RzdHJhcFZhbGlkYXRpb24vXG4gKi9cblxuKGZ1bmN0aW9uICgkKSB7XG5cbiAgdmFyIGNyZWF0ZWRFbGVtZW50cyA9IFtdO1xuXG4gIHZhciBkZWZhdWx0cyA9IHtcbiAgICBvcHRpb25zOiB7XG4gICAgICBwcmVwZW5kRXhpc3RpbmdIZWxwQmxvY2s6IGZhbHNlLFxuICAgICAgc25pZmZIdG1sOiB0cnVlLCAvLyBzbmlmZiBmb3IgJ3JlcXVpcmVkJywgJ21heGxlbmd0aCcsIGV0Y1xuICAgICAgcHJldmVudFN1Ym1pdDogdHJ1ZSwgLy8gc3RvcCB0aGUgZm9ybSBzdWJtaXQgZXZlbnQgZnJvbSBmaXJpbmcgaWYgdmFsaWRhdGlvbiBmYWlsc1xuICAgICAgc3VibWl0RXJyb3I6IGZhbHNlLCAvLyBmdW5jdGlvbiBjYWxsZWQgaWYgdGhlcmUgaXMgYW4gZXJyb3Igd2hlbiB0cnlpbmcgdG8gc3VibWl0XG4gICAgICBzdWJtaXRTdWNjZXNzOiBmYWxzZSwgLy8gZnVuY3Rpb24gY2FsbGVkIGp1c3QgYmVmb3JlIGEgc3VjY2Vzc2Z1bCBzdWJtaXQgZXZlbnQgaXMgc2VudCB0byB0aGUgc2VydmVyXG4gICAgICBzZW1hbnRpY2FsbHlTdHJpY3Q6IGZhbHNlLCAvLyBzZXQgdG8gdHJ1ZSB0byB0aWR5IHVwIGdlbmVyYXRlZCBIVE1MIG91dHB1dFxuICAgICAgYXV0b0FkZDoge1xuICAgICAgICBoZWxwQmxvY2tzOiB0cnVlXG4gICAgICB9LFxuICAgICAgZmlsdGVyOiBmdW5jdGlvbiBmaWx0ZXIoKSB7XG4gICAgICAgIC8vIHJldHVybiAkKHRoaXMpLmlzKFwiOnZpc2libGVcIik7IC8vIG9ubHkgdmFsaWRhdGUgZWxlbWVudHMgeW91IGNhbiBzZWVcbiAgICAgICAgcmV0dXJuIHRydWU7IC8vIHZhbGlkYXRlIGV2ZXJ5dGhpbmdcbiAgICAgIH1cbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQob3B0aW9ucykge1xuXG4gICAgICAgIHZhciBzZXR0aW5ncyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBkZWZhdWx0cyk7XG5cbiAgICAgICAgc2V0dGluZ3Mub3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHNldHRpbmdzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICAgIHZhciAkc2libGluZ0VsZW1lbnRzID0gdGhpcztcblxuICAgICAgICB2YXIgdW5pcXVlRm9ybXMgPSAkLnVuaXF1ZSgkc2libGluZ0VsZW1lbnRzLm1hcChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuICQodGhpcykucGFyZW50cyhcImZvcm1cIilbMF07XG4gICAgICAgIH0pLnRvQXJyYXkoKSk7XG5cbiAgICAgICAgJCh1bmlxdWVGb3JtcykuYmluZChcInN1Ym1pdFwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHZhciAkZm9ybSA9ICQodGhpcyk7XG4gICAgICAgICAgdmFyIHdhcm5pbmdzRm91bmQgPSAwO1xuICAgICAgICAgIHZhciAkaW5wdXRzID0gJGZvcm0uZmluZChcImlucHV0LHRleHRhcmVhLHNlbGVjdFwiKS5ub3QoXCJbdHlwZT1zdWJtaXRdLFt0eXBlPWltYWdlXVwiKS5maWx0ZXIoc2V0dGluZ3Mub3B0aW9ucy5maWx0ZXIpO1xuICAgICAgICAgICRpbnB1dHMudHJpZ2dlcihcInN1Ym1pdC52YWxpZGF0aW9uXCIpLnRyaWdnZXIoXCJ2YWxpZGF0aW9uTG9zdEZvY3VzLnZhbGlkYXRpb25cIik7XG5cbiAgICAgICAgICAkaW5wdXRzLmVhY2goZnVuY3Rpb24gKGksIGVsKSB7XG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKGVsKSxcbiAgICAgICAgICAgICAgICAkY29udHJvbEdyb3VwID0gJHRoaXMucGFyZW50cyhcIi5mb3JtLWdyb3VwXCIpLmZpcnN0KCk7XG4gICAgICAgICAgICBpZiAoJGNvbnRyb2xHcm91cC5oYXNDbGFzcyhcIndhcm5pbmdcIikpIHtcbiAgICAgICAgICAgICAgJGNvbnRyb2xHcm91cC5yZW1vdmVDbGFzcyhcIndhcm5pbmdcIikuYWRkQ2xhc3MoXCJlcnJvclwiKTtcbiAgICAgICAgICAgICAgd2FybmluZ3NGb3VuZCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJGlucHV0cy50cmlnZ2VyKFwidmFsaWRhdGlvbkxvc3RGb2N1cy52YWxpZGF0aW9uXCIpO1xuXG4gICAgICAgICAgaWYgKHdhcm5pbmdzRm91bmQpIHtcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5vcHRpb25zLnByZXZlbnRTdWJtaXQpIHtcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJGZvcm0uYWRkQ2xhc3MoXCJlcnJvclwiKTtcbiAgICAgICAgICAgIGlmICgkLmlzRnVuY3Rpb24oc2V0dGluZ3Mub3B0aW9ucy5zdWJtaXRFcnJvcikpIHtcbiAgICAgICAgICAgICAgc2V0dGluZ3Mub3B0aW9ucy5zdWJtaXRFcnJvcigkZm9ybSwgZSwgJGlucHV0cy5qcUJvb3RzdHJhcFZhbGlkYXRpb24oXCJjb2xsZWN0RXJyb3JzXCIsIHRydWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGZvcm0ucmVtb3ZlQ2xhc3MoXCJlcnJvclwiKTtcbiAgICAgICAgICAgIGlmICgkLmlzRnVuY3Rpb24oc2V0dGluZ3Mub3B0aW9ucy5zdWJtaXRTdWNjZXNzKSkge1xuICAgICAgICAgICAgICBzZXR0aW5ncy5vcHRpb25zLnN1Ym1pdFN1Y2Nlc3MoJGZvcm0sIGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAvLyBHZXQgcmVmZXJlbmNlcyB0byBldmVyeXRoaW5nIHdlJ3JlIGludGVyZXN0ZWQgaW5cbiAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAkY29udHJvbEdyb3VwID0gJHRoaXMucGFyZW50cyhcIi5mb3JtLWdyb3VwXCIpLmZpcnN0KCksXG4gICAgICAgICAgICAgICRoZWxwQmxvY2sgPSAkY29udHJvbEdyb3VwLmZpbmQoXCIuaGVscC1ibG9ja1wiKS5maXJzdCgpLFxuICAgICAgICAgICAgICAkZm9ybSA9ICR0aGlzLnBhcmVudHMoXCJmb3JtXCIpLmZpcnN0KCksXG4gICAgICAgICAgICAgIHZhbGlkYXRvck5hbWVzID0gW107XG5cbiAgICAgICAgICAvLyBjcmVhdGUgbWVzc2FnZSBjb250YWluZXIgaWYgbm90IGV4aXN0c1xuICAgICAgICAgIGlmICghJGhlbHBCbG9jay5sZW5ndGggJiYgc2V0dGluZ3Mub3B0aW9ucy5hdXRvQWRkICYmIHNldHRpbmdzLm9wdGlvbnMuYXV0b0FkZC5oZWxwQmxvY2tzKSB7XG4gICAgICAgICAgICAkaGVscEJsb2NrID0gJCgnPGRpdiBjbGFzcz1cImhlbHAtYmxvY2tcIiAvPicpO1xuICAgICAgICAgICAgJGNvbnRyb2xHcm91cC5maW5kKCcuY29udHJvbHMnKS5hcHBlbmQoJGhlbHBCbG9jayk7XG4gICAgICAgICAgICBjcmVhdGVkRWxlbWVudHMucHVzaCgkaGVscEJsb2NrWzBdKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU05JRkYgSFRNTCBGT1IgVkFMSURBVE9SU1xuICAgICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgICAgICAgIC8vICpzbm9ydCBzbmlmZiBzbnVmZmxlKlxuXG4gICAgICAgICAgaWYgKHNldHRpbmdzLm9wdGlvbnMuc25pZmZIdG1sKSB7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwiXCI7XG4gICAgICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUEFUVEVSTlxuICAgICAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICBpZiAoJHRoaXMuYXR0cihcInBhdHRlcm5cIikgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBtZXNzYWdlID0gXCJOb3QgaW4gdGhlIGV4cGVjdGVkIGZvcm1hdDwhLS0gZGF0YS12YWxpZGF0aW9uLXBhdHRlcm4tbWVzc2FnZSB0byBvdmVycmlkZSAtLT5cIjtcbiAgICAgICAgICAgICAgaWYgKCR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uUGF0dGVybk1lc3NhZ2VcIikpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJHRoaXMuZGF0YShcInZhbGlkYXRpb25QYXR0ZXJuTWVzc2FnZVwiKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAkdGhpcy5kYXRhKFwidmFsaWRhdGlvblBhdHRlcm5NZXNzYWdlXCIsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAkdGhpcy5kYXRhKFwidmFsaWRhdGlvblBhdHRlcm5SZWdleFwiLCAkdGhpcy5hdHRyKFwicGF0dGVyblwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1BWFxuICAgICAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICBpZiAoJHRoaXMuYXR0cihcIm1heFwiKSAhPT0gdW5kZWZpbmVkIHx8ICR0aGlzLmF0dHIoXCJhcmlhLXZhbHVlbWF4XCIpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgdmFyIG1heCA9ICR0aGlzLmF0dHIoXCJtYXhcIikgIT09IHVuZGVmaW5lZCA/ICR0aGlzLmF0dHIoXCJtYXhcIikgOiAkdGhpcy5hdHRyKFwiYXJpYS12YWx1ZW1heFwiKTtcbiAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiVG9vIGhpZ2g6IE1heGltdW0gb2YgJ1wiICsgbWF4ICsgXCInPCEtLSBkYXRhLXZhbGlkYXRpb24tbWF4LW1lc3NhZ2UgdG8gb3ZlcnJpZGUgLS0+XCI7XG4gICAgICAgICAgICAgIGlmICgkdGhpcy5kYXRhKFwidmFsaWRhdGlvbk1heE1lc3NhZ2VcIikpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJHRoaXMuZGF0YShcInZhbGlkYXRpb25NYXhNZXNzYWdlXCIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uTWF4TWVzc2FnZVwiLCBtZXNzYWdlKTtcbiAgICAgICAgICAgICAgJHRoaXMuZGF0YShcInZhbGlkYXRpb25NYXhNYXhcIiwgbWF4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTUlOXG4gICAgICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIGlmICgkdGhpcy5hdHRyKFwibWluXCIpICE9PSB1bmRlZmluZWQgfHwgJHRoaXMuYXR0cihcImFyaWEtdmFsdWVtaW5cIikgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICB2YXIgbWluID0gJHRoaXMuYXR0cihcIm1pblwiKSAhPT0gdW5kZWZpbmVkID8gJHRoaXMuYXR0cihcIm1pblwiKSA6ICR0aGlzLmF0dHIoXCJhcmlhLXZhbHVlbWluXCIpO1xuICAgICAgICAgICAgICBtZXNzYWdlID0gXCJUb28gbG93OiBNaW5pbXVtIG9mICdcIiArIG1pbiArIFwiJzwhLS0gZGF0YS12YWxpZGF0aW9uLW1pbi1tZXNzYWdlIHRvIG92ZXJyaWRlIC0tPlwiO1xuICAgICAgICAgICAgICBpZiAoJHRoaXMuZGF0YShcInZhbGlkYXRpb25NaW5NZXNzYWdlXCIpKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uTWluTWVzc2FnZVwiKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAkdGhpcy5kYXRhKFwidmFsaWRhdGlvbk1pbk1lc3NhZ2VcIiwgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uTWluTWluXCIsIG1pbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1BWExFTkdUSFxuICAgICAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICBpZiAoJHRoaXMuYXR0cihcIm1heGxlbmd0aFwiKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIG1lc3NhZ2UgPSBcIlRvbyBsb25nOiBNYXhpbXVtIG9mICdcIiArICR0aGlzLmF0dHIoXCJtYXhsZW5ndGhcIikgKyBcIicgY2hhcmFjdGVyczwhLS0gZGF0YS12YWxpZGF0aW9uLW1heGxlbmd0aC1tZXNzYWdlIHRvIG92ZXJyaWRlIC0tPlwiO1xuICAgICAgICAgICAgICBpZiAoJHRoaXMuZGF0YShcInZhbGlkYXRpb25NYXhsZW5ndGhNZXNzYWdlXCIpKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uTWF4bGVuZ3RoTWVzc2FnZVwiKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAkdGhpcy5kYXRhKFwidmFsaWRhdGlvbk1heGxlbmd0aE1lc3NhZ2VcIiwgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uTWF4bGVuZ3RoTWF4bGVuZ3RoXCIsICR0aGlzLmF0dHIoXCJtYXhsZW5ndGhcIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNSU5MRU5HVEhcbiAgICAgICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgaWYgKCR0aGlzLmF0dHIoXCJtaW5sZW5ndGhcIikgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBtZXNzYWdlID0gXCJUb28gc2hvcnQ6IE1pbmltdW0gb2YgJ1wiICsgJHRoaXMuYXR0cihcIm1pbmxlbmd0aFwiKSArIFwiJyBjaGFyYWN0ZXJzPCEtLSBkYXRhLXZhbGlkYXRpb24tbWlubGVuZ3RoLW1lc3NhZ2UgdG8gb3ZlcnJpZGUgLS0+XCI7XG4gICAgICAgICAgICAgIGlmICgkdGhpcy5kYXRhKFwidmFsaWRhdGlvbk1pbmxlbmd0aE1lc3NhZ2VcIikpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJHRoaXMuZGF0YShcInZhbGlkYXRpb25NaW5sZW5ndGhNZXNzYWdlXCIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uTWlubGVuZ3RoTWVzc2FnZVwiLCBtZXNzYWdlKTtcbiAgICAgICAgICAgICAgJHRoaXMuZGF0YShcInZhbGlkYXRpb25NaW5sZW5ndGhNaW5sZW5ndGhcIiwgJHRoaXMuYXR0cihcIm1pbmxlbmd0aFwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSRVFVSVJFRFxuICAgICAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICBpZiAoJHRoaXMuYXR0cihcInJlcXVpcmVkXCIpICE9PSB1bmRlZmluZWQgfHwgJHRoaXMuYXR0cihcImFyaWEtcmVxdWlyZWRcIikgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBtZXNzYWdlID0gc2V0dGluZ3MuYnVpbHRJblZhbGlkYXRvcnMucmVxdWlyZWQubWVzc2FnZTtcbiAgICAgICAgICAgICAgaWYgKCR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uUmVxdWlyZWRNZXNzYWdlXCIpKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uUmVxdWlyZWRNZXNzYWdlXCIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uUmVxdWlyZWRNZXNzYWdlXCIsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOVU1CRVJcbiAgICAgICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgaWYgKCR0aGlzLmF0dHIoXCJ0eXBlXCIpICE9PSB1bmRlZmluZWQgJiYgJHRoaXMuYXR0cihcInR5cGVcIikudG9Mb3dlckNhc2UoKSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgICBtZXNzYWdlID0gc2V0dGluZ3MuYnVpbHRJblZhbGlkYXRvcnMubnVtYmVyLm1lc3NhZ2U7XG4gICAgICAgICAgICAgIGlmICgkdGhpcy5kYXRhKFwidmFsaWRhdGlvbk51bWJlck1lc3NhZ2VcIikpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJHRoaXMuZGF0YShcInZhbGlkYXRpb25OdW1iZXJNZXNzYWdlXCIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uTnVtYmVyTWVzc2FnZVwiLCBtZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVNQUlMXG4gICAgICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIGlmICgkdGhpcy5hdHRyKFwidHlwZVwiKSAhPT0gdW5kZWZpbmVkICYmICR0aGlzLmF0dHIoXCJ0eXBlXCIpLnRvTG93ZXJDYXNlKCkgPT09IFwiZW1haWxcIikge1xuICAgICAgICAgICAgICBtZXNzYWdlID0gXCJOb3QgYSB2YWxpZCBlbWFpbCBhZGRyZXNzPCEtLSBkYXRhLXZhbGlkYXRvci12YWxpZGVtYWlsLW1lc3NhZ2UgdG8gb3ZlcnJpZGUgLS0+XCI7XG4gICAgICAgICAgICAgIGlmICgkdGhpcy5kYXRhKFwidmFsaWRhdGlvblZhbGlkZW1haWxNZXNzYWdlXCIpKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uVmFsaWRlbWFpbE1lc3NhZ2VcIik7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoJHRoaXMuZGF0YShcInZhbGlkYXRpb25FbWFpbE1lc3NhZ2VcIikpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJHRoaXMuZGF0YShcInZhbGlkYXRpb25FbWFpbE1lc3NhZ2VcIik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgJHRoaXMuZGF0YShcInZhbGlkYXRpb25WYWxpZGVtYWlsTWVzc2FnZVwiLCBtZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNSU5DSEVDS0VEXG4gICAgICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIGlmICgkdGhpcy5hdHRyKFwibWluY2hlY2tlZFwiKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIG1lc3NhZ2UgPSBcIk5vdCBlbm91Z2ggb3B0aW9ucyBjaGVja2VkOyBNaW5pbXVtIG9mICdcIiArICR0aGlzLmF0dHIoXCJtaW5jaGVja2VkXCIpICsgXCInIHJlcXVpcmVkPCEtLSBkYXRhLXZhbGlkYXRpb24tbWluY2hlY2tlZC1tZXNzYWdlIHRvIG92ZXJyaWRlIC0tPlwiO1xuICAgICAgICAgICAgICBpZiAoJHRoaXMuZGF0YShcInZhbGlkYXRpb25NaW5jaGVja2VkTWVzc2FnZVwiKSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAkdGhpcy5kYXRhKFwidmFsaWRhdGlvbk1pbmNoZWNrZWRNZXNzYWdlXCIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uTWluY2hlY2tlZE1lc3NhZ2VcIiwgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uTWluY2hlY2tlZE1pbmNoZWNrZWRcIiwgJHRoaXMuYXR0cihcIm1pbmNoZWNrZWRcIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1BWENIRUNLRURcbiAgICAgICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgaWYgKCR0aGlzLmF0dHIoXCJtYXhjaGVja2VkXCIpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiVG9vIG1hbnkgb3B0aW9ucyBjaGVja2VkOyBNYXhpbXVtIG9mICdcIiArICR0aGlzLmF0dHIoXCJtYXhjaGVja2VkXCIpICsgXCInIHJlcXVpcmVkPCEtLSBkYXRhLXZhbGlkYXRpb24tbWF4Y2hlY2tlZC1tZXNzYWdlIHRvIG92ZXJyaWRlIC0tPlwiO1xuICAgICAgICAgICAgICBpZiAoJHRoaXMuZGF0YShcInZhbGlkYXRpb25NYXhjaGVja2VkTWVzc2FnZVwiKSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAkdGhpcy5kYXRhKFwidmFsaWRhdGlvbk1heGNoZWNrZWRNZXNzYWdlXCIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uTWF4Y2hlY2tlZE1lc3NhZ2VcIiwgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uTWF4Y2hlY2tlZE1heGNoZWNrZWRcIiwgJHRoaXMuYXR0cihcIm1heGNoZWNrZWRcIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENPTExFQ1QgVkFMSURBVE9SIE5BTUVTXG4gICAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgICAgICAgLy8gR2V0IG5hbWVkIHZhbGlkYXRvcnNcbiAgICAgICAgICBpZiAoJHRoaXMuZGF0YShcInZhbGlkYXRpb25cIikgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFsaWRhdG9yTmFtZXMgPSAkdGhpcy5kYXRhKFwidmFsaWRhdGlvblwiKS5zcGxpdChcIixcIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gR2V0IGV4dHJhIG9uZXMgZGVmaW5lZCBvbiB0aGUgZWxlbWVudCdzIGRhdGEgYXR0cmlidXRlc1xuICAgICAgICAgICQuZWFjaCgkdGhpcy5kYXRhKCksIGZ1bmN0aW9uIChpLCBlbCkge1xuICAgICAgICAgICAgdmFyIHBhcnRzID0gaS5yZXBsYWNlKC8oW0EtWl0pL2csIFwiLCQxXCIpLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgIGlmIChwYXJ0c1swXSA9PT0gXCJ2YWxpZGF0aW9uXCIgJiYgcGFydHNbMV0pIHtcbiAgICAgICAgICAgICAgdmFsaWRhdG9yTmFtZXMucHVzaChwYXJ0c1sxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTk9STUFMSVNFIFZBTElEQVRPUiBOQU1FU1xuICAgICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgICAgICAgIHZhciB2YWxpZGF0b3JOYW1lc1RvSW5zcGVjdCA9IHZhbGlkYXRvck5hbWVzO1xuICAgICAgICAgIHZhciBuZXdWYWxpZGF0b3JOYW1lc1RvSW5zcGVjdCA9IFtdO1xuXG4gICAgICAgICAgZG8gLy8gcmVwZWF0ZWRseSBleHBhbmQgJ3Nob3J0Y3V0JyB2YWxpZGF0b3JzIGludG8gdGhlaXIgcmVhbCB2YWxpZGF0b3JzXG4gICAgICAgICAge1xuICAgICAgICAgICAgLy8gVXBwZXJjYXNlIG9ubHkgdGhlIGZpcnN0IGxldHRlciBvZiBlYWNoIG5hbWVcbiAgICAgICAgICAgICQuZWFjaCh2YWxpZGF0b3JOYW1lcywgZnVuY3Rpb24gKGksIGVsKSB7XG4gICAgICAgICAgICAgIHZhbGlkYXRvck5hbWVzW2ldID0gZm9ybWF0VmFsaWRhdG9yTmFtZShlbCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gUmVtb3ZlIGR1cGxpY2F0ZSB2YWxpZGF0b3IgbmFtZXNcbiAgICAgICAgICAgIHZhbGlkYXRvck5hbWVzID0gJC51bmlxdWUodmFsaWRhdG9yTmFtZXMpO1xuXG4gICAgICAgICAgICAvLyBQdWxsIG91dCB0aGUgbmV3IHZhbGlkYXRvciBuYW1lcyBmcm9tIGVhY2ggc2hvcnRjdXRcbiAgICAgICAgICAgIG5ld1ZhbGlkYXRvck5hbWVzVG9JbnNwZWN0ID0gW107XG4gICAgICAgICAgICAkLmVhY2godmFsaWRhdG9yTmFtZXNUb0luc3BlY3QsIGZ1bmN0aW9uIChpLCBlbCkge1xuICAgICAgICAgICAgICBpZiAoJHRoaXMuZGF0YShcInZhbGlkYXRpb25cIiArIGVsICsgXCJTaG9ydGN1dFwiKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgLy8gQXJlIHRoZXNlIGN1c3RvbSB2YWxpZGF0b3JzP1xuICAgICAgICAgICAgICAgIC8vIFB1bGwgdGhlbSBvdXQhXG4gICAgICAgICAgICAgICAgJC5lYWNoKCR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uXCIgKyBlbCArIFwiU2hvcnRjdXRcIikuc3BsaXQoXCIsXCIpLCBmdW5jdGlvbiAoaTIsIGVsMikge1xuICAgICAgICAgICAgICAgICAgbmV3VmFsaWRhdG9yTmFtZXNUb0luc3BlY3QucHVzaChlbDIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNldHRpbmdzLmJ1aWx0SW5WYWxpZGF0b3JzW2VsLnRvTG93ZXJDYXNlKCldKSB7XG4gICAgICAgICAgICAgICAgLy8gSXMgdGhpcyBhIHJlY29nbmlzZWQgYnVpbHQtaW4/XG4gICAgICAgICAgICAgICAgLy8gUHVsbCBpdCBvdXQhXG4gICAgICAgICAgICAgICAgdmFyIHZhbGlkYXRvciA9IHNldHRpbmdzLmJ1aWx0SW5WYWxpZGF0b3JzW2VsLnRvTG93ZXJDYXNlKCldO1xuICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0b3IudHlwZS50b0xvd2VyQ2FzZSgpID09PSBcInNob3J0Y3V0XCIpIHtcbiAgICAgICAgICAgICAgICAgICQuZWFjaCh2YWxpZGF0b3Iuc2hvcnRjdXQuc3BsaXQoXCIsXCIpLCBmdW5jdGlvbiAoaSwgZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgZWwgPSBmb3JtYXRWYWxpZGF0b3JOYW1lKGVsKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsaWRhdG9yTmFtZXNUb0luc3BlY3QucHVzaChlbCk7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvck5hbWVzLnB1c2goZWwpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFsaWRhdG9yTmFtZXNUb0luc3BlY3QgPSBuZXdWYWxpZGF0b3JOYW1lc1RvSW5zcGVjdDtcbiAgICAgICAgICB9IHdoaWxlICh2YWxpZGF0b3JOYW1lc1RvSW5zcGVjdC5sZW5ndGggPiAwKTtcblxuICAgICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNFVCBVUCBWQUxJREFUT1IgQVJSQVlTXG4gICAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgICAgICAgdmFyIHZhbGlkYXRvcnMgPSB7fTtcblxuICAgICAgICAgICQuZWFjaCh2YWxpZGF0b3JOYW1lcywgZnVuY3Rpb24gKGksIGVsKSB7XG4gICAgICAgICAgICAvLyBTZXQgdXAgdGhlICdvdmVycmlkZScgbWVzc2FnZVxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSAkdGhpcy5kYXRhKFwidmFsaWRhdGlvblwiICsgZWwgKyBcIk1lc3NhZ2VcIik7XG4gICAgICAgICAgICB2YXIgaGFzT3ZlcnJpZGVNZXNzYWdlID0gbWVzc2FnZSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdmFyIGZvdW5kVmFsaWRhdG9yID0gZmFsc2U7XG4gICAgICAgICAgICBtZXNzYWdlID0gbWVzc2FnZSA/IG1lc3NhZ2UgOiBcIidcIiArIGVsICsgXCInIHZhbGlkYXRpb24gZmFpbGVkIDwhLS0gQWRkIGF0dHJpYnV0ZSAnZGF0YS12YWxpZGF0aW9uLVwiICsgZWwudG9Mb3dlckNhc2UoKSArIFwiLW1lc3NhZ2UnIHRvIGlucHV0IHRvIGNoYW5nZSB0aGlzIG1lc3NhZ2UgLS0+XCI7XG5cbiAgICAgICAgICAgICQuZWFjaChzZXR0aW5ncy52YWxpZGF0b3JUeXBlcywgZnVuY3Rpb24gKHZhbGlkYXRvclR5cGUsIHZhbGlkYXRvclRlbXBsYXRlKSB7XG4gICAgICAgICAgICAgIGlmICh2YWxpZGF0b3JzW3ZhbGlkYXRvclR5cGVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3JzW3ZhbGlkYXRvclR5cGVdID0gW107XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFmb3VuZFZhbGlkYXRvciAmJiAkdGhpcy5kYXRhKFwidmFsaWRhdGlvblwiICsgZWwgKyBmb3JtYXRWYWxpZGF0b3JOYW1lKHZhbGlkYXRvclRlbXBsYXRlLm5hbWUpKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yc1t2YWxpZGF0b3JUeXBlXS5wdXNoKCQuZXh0ZW5kKHRydWUsIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IGZvcm1hdFZhbGlkYXRvck5hbWUodmFsaWRhdG9yVGVtcGxhdGUubmFtZSksXG4gICAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXG4gICAgICAgICAgICAgICAgfSwgdmFsaWRhdG9yVGVtcGxhdGUuaW5pdCgkdGhpcywgZWwpKSk7XG4gICAgICAgICAgICAgICAgZm91bmRWYWxpZGF0b3IgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKCFmb3VuZFZhbGlkYXRvciAmJiBzZXR0aW5ncy5idWlsdEluVmFsaWRhdG9yc1tlbC50b0xvd2VyQ2FzZSgpXSkge1xuXG4gICAgICAgICAgICAgIHZhciB2YWxpZGF0b3IgPSAkLmV4dGVuZCh0cnVlLCB7fSwgc2V0dGluZ3MuYnVpbHRJblZhbGlkYXRvcnNbZWwudG9Mb3dlckNhc2UoKV0pO1xuICAgICAgICAgICAgICBpZiAoaGFzT3ZlcnJpZGVNZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciB2YWxpZGF0b3JUeXBlID0gdmFsaWRhdG9yLnR5cGUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgICBpZiAodmFsaWRhdG9yVHlwZSA9PT0gXCJzaG9ydGN1dFwiKSB7XG4gICAgICAgICAgICAgICAgZm91bmRWYWxpZGF0b3IgPSB0cnVlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQuZWFjaChzZXR0aW5ncy52YWxpZGF0b3JUeXBlcywgZnVuY3Rpb24gKHZhbGlkYXRvclRlbXBsYXRlVHlwZSwgdmFsaWRhdG9yVGVtcGxhdGUpIHtcbiAgICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0b3JzW3ZhbGlkYXRvclRlbXBsYXRlVHlwZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzW3ZhbGlkYXRvclRlbXBsYXRlVHlwZV0gPSBbXTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGlmICghZm91bmRWYWxpZGF0b3IgJiYgdmFsaWRhdG9yVHlwZSA9PT0gdmFsaWRhdG9yVGVtcGxhdGVUeXBlLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMuZGF0YShcInZhbGlkYXRpb25cIiArIGVsICsgZm9ybWF0VmFsaWRhdG9yTmFtZSh2YWxpZGF0b3JUZW1wbGF0ZS5uYW1lKSwgdmFsaWRhdG9yW3ZhbGlkYXRvclRlbXBsYXRlLm5hbWUudG9Mb3dlckNhc2UoKV0pO1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzW3ZhbGlkYXRvclR5cGVdLnB1c2goJC5leHRlbmQodmFsaWRhdG9yLCB2YWxpZGF0b3JUZW1wbGF0ZS5pbml0KCR0aGlzLCBlbCkpKTtcbiAgICAgICAgICAgICAgICAgICAgZm91bmRWYWxpZGF0b3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZm91bmRWYWxpZGF0b3IpIHtcbiAgICAgICAgICAgICAgJC5lcnJvcihcIkNhbm5vdCBmaW5kIHZhbGlkYXRpb24gaW5mbyBmb3IgJ1wiICsgZWwgKyBcIidcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNUT1JFIEZBTExCQUNLIFZBTFVFU1xuICAgICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgICAgICAgICRoZWxwQmxvY2suZGF0YShcIm9yaWdpbmFsLWNvbnRlbnRzXCIsICRoZWxwQmxvY2suZGF0YShcIm9yaWdpbmFsLWNvbnRlbnRzXCIpID8gJGhlbHBCbG9jay5kYXRhKFwib3JpZ2luYWwtY29udGVudHNcIikgOiAkaGVscEJsb2NrLmh0bWwoKSk7XG5cbiAgICAgICAgICAkaGVscEJsb2NrLmRhdGEoXCJvcmlnaW5hbC1yb2xlXCIsICRoZWxwQmxvY2suZGF0YShcIm9yaWdpbmFsLXJvbGVcIikgPyAkaGVscEJsb2NrLmRhdGEoXCJvcmlnaW5hbC1yb2xlXCIpIDogJGhlbHBCbG9jay5hdHRyKFwicm9sZVwiKSk7XG5cbiAgICAgICAgICAkY29udHJvbEdyb3VwLmRhdGEoXCJvcmlnaW5hbC1jbGFzc2VzXCIsICRjb250cm9sR3JvdXAuZGF0YShcIm9yaWdpbmFsLWNsYXNlc1wiKSA/ICRjb250cm9sR3JvdXAuZGF0YShcIm9yaWdpbmFsLWNsYXNzZXNcIikgOiAkY29udHJvbEdyb3VwLmF0dHIoXCJjbGFzc1wiKSk7XG5cbiAgICAgICAgICAkdGhpcy5kYXRhKFwib3JpZ2luYWwtYXJpYS1pbnZhbGlkXCIsICR0aGlzLmRhdGEoXCJvcmlnaW5hbC1hcmlhLWludmFsaWRcIikgPyAkdGhpcy5kYXRhKFwib3JpZ2luYWwtYXJpYS1pbnZhbGlkXCIpIDogJHRoaXMuYXR0cihcImFyaWEtaW52YWxpZFwiKSk7XG5cbiAgICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVkFMSURBVElPTlxuICAgICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgICAgICAgICR0aGlzLmJpbmQoXCJ2YWxpZGF0aW9uLnZhbGlkYXRpb25cIiwgZnVuY3Rpb24gKGV2ZW50LCBwYXJhbXMpIHtcblxuICAgICAgICAgICAgdmFyIHZhbHVlID0gZ2V0VmFsdWUoJHRoaXMpO1xuXG4gICAgICAgICAgICAvLyBHZXQgYSBsaXN0IG9mIHRoZSBlcnJvcnMgdG8gYXBwbHlcbiAgICAgICAgICAgIHZhciBlcnJvcnNGb3VuZCA9IFtdO1xuXG4gICAgICAgICAgICAkLmVhY2godmFsaWRhdG9ycywgZnVuY3Rpb24gKHZhbGlkYXRvclR5cGUsIHZhbGlkYXRvclR5cGVBcnJheSkge1xuICAgICAgICAgICAgICBpZiAodmFsdWUgfHwgdmFsdWUubGVuZ3RoIHx8IHBhcmFtcyAmJiBwYXJhbXMuaW5jbHVkZUVtcHR5IHx8ICEhc2V0dGluZ3MudmFsaWRhdG9yVHlwZXNbdmFsaWRhdG9yVHlwZV0uYmxvY2tTdWJtaXQgJiYgcGFyYW1zICYmICEhcGFyYW1zLnN1Ym1pdHRpbmcpIHtcbiAgICAgICAgICAgICAgICAkLmVhY2godmFsaWRhdG9yVHlwZUFycmF5LCBmdW5jdGlvbiAoaSwgdmFsaWRhdG9yKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MudmFsaWRhdG9yVHlwZXNbdmFsaWRhdG9yVHlwZV0udmFsaWRhdGUoJHRoaXMsIHZhbHVlLCB2YWxpZGF0b3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yc0ZvdW5kLnB1c2godmFsaWRhdG9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGVycm9yc0ZvdW5kO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJHRoaXMuYmluZChcImdldFZhbGlkYXRvcnMudmFsaWRhdGlvblwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsaWRhdG9ycztcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdBVENIIEZPUiBDSEFOR0VTXG4gICAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgICR0aGlzLmJpbmQoXCJzdWJtaXQudmFsaWRhdGlvblwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJHRoaXMudHJpZ2dlckhhbmRsZXIoXCJjaGFuZ2UudmFsaWRhdGlvblwiLCB7IHN1Ym1pdHRpbmc6IHRydWUgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgJHRoaXMuYmluZChbXCJrZXl1cFwiLCBcImZvY3VzXCIsIFwiYmx1clwiLCBcImNsaWNrXCIsIFwia2V5ZG93blwiLCBcImtleXByZXNzXCIsIFwiY2hhbmdlXCJdLmpvaW4oXCIudmFsaWRhdGlvbiBcIikgKyBcIi52YWxpZGF0aW9uXCIsIGZ1bmN0aW9uIChlLCBwYXJhbXMpIHtcblxuICAgICAgICAgICAgdmFyIHZhbHVlID0gZ2V0VmFsdWUoJHRoaXMpO1xuXG4gICAgICAgICAgICB2YXIgZXJyb3JzRm91bmQgPSBbXTtcblxuICAgICAgICAgICAgJGNvbnRyb2xHcm91cC5maW5kKFwiaW5wdXQsdGV4dGFyZWEsc2VsZWN0XCIpLmVhY2goZnVuY3Rpb24gKGksIGVsKSB7XG4gICAgICAgICAgICAgIHZhciBvbGRDb3VudCA9IGVycm9yc0ZvdW5kLmxlbmd0aDtcbiAgICAgICAgICAgICAgJC5lYWNoKCQoZWwpLnRyaWdnZXJIYW5kbGVyKFwidmFsaWRhdGlvbi52YWxpZGF0aW9uXCIsIHBhcmFtcyksIGZ1bmN0aW9uIChqLCBtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JzRm91bmQucHVzaChtZXNzYWdlKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGlmIChlcnJvcnNGb3VuZC5sZW5ndGggPiBvbGRDb3VudCkge1xuICAgICAgICAgICAgICAgICQoZWwpLmF0dHIoXCJhcmlhLWludmFsaWRcIiwgXCJ0cnVlXCIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbCA9ICR0aGlzLmRhdGEoXCJvcmlnaW5hbC1hcmlhLWludmFsaWRcIik7XG4gICAgICAgICAgICAgICAgJChlbCkuYXR0cihcImFyaWEtaW52YWxpZFwiLCBvcmlnaW5hbCAhPT0gdW5kZWZpbmVkID8gb3JpZ2luYWwgOiBmYWxzZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkZm9ybS5maW5kKFwiaW5wdXQsc2VsZWN0LHRleHRhcmVhXCIpLm5vdCgkdGhpcykubm90KFwiW25hbWU9XFxcIlwiICsgJHRoaXMuYXR0cihcIm5hbWVcIikgKyBcIlxcXCJdXCIpLnRyaWdnZXIoXCJ2YWxpZGF0aW9uTG9zdEZvY3VzLnZhbGlkYXRpb25cIik7XG5cbiAgICAgICAgICAgIGVycm9yc0ZvdW5kID0gJC51bmlxdWUoZXJyb3JzRm91bmQuc29ydCgpKTtcblxuICAgICAgICAgICAgLy8gV2VyZSB0aGVyZSBhbnkgZXJyb3JzP1xuICAgICAgICAgICAgaWYgKGVycm9yc0ZvdW5kLmxlbmd0aCkge1xuICAgICAgICAgICAgICAvLyBCZXR0ZXIgZmxhZyBpdCB1cCBhcyBhIHdhcm5pbmcuXG4gICAgICAgICAgICAgICRjb250cm9sR3JvdXAucmVtb3ZlQ2xhc3MoXCJzdWNjZXNzIGVycm9yXCIpLmFkZENsYXNzKFwid2FybmluZ1wiKTtcblxuICAgICAgICAgICAgICAvLyBIb3cgbWFueSBlcnJvcnMgZGlkIHdlIGZpbmQ/XG4gICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5vcHRpb25zLnNlbWFudGljYWxseVN0cmljdCAmJiBlcnJvcnNGb3VuZC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAvLyBPbmx5IG9uZT8gQmVpbmcgc3RyaWN0PyBKdXN0IG91dHB1dCBpdC5cbiAgICAgICAgICAgICAgICAkaGVscEJsb2NrLmh0bWwoZXJyb3JzRm91bmRbMF0gKyAoc2V0dGluZ3Mub3B0aW9ucy5wcmVwZW5kRXhpc3RpbmdIZWxwQmxvY2sgPyAkaGVscEJsb2NrLmRhdGEoXCJvcmlnaW5hbC1jb250ZW50c1wiKSA6IFwiXCIpKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBNdWx0aXBsZT8gQmVpbmcgc2xvcHB5PyBHbHVlIHRoZW0gdG9nZXRoZXIgaW50byBhbiBVTC5cbiAgICAgICAgICAgICAgICAkaGVscEJsb2NrLmh0bWwoXCI8dWwgcm9sZT1cXFwiYWxlcnRcXFwiPjxsaT5cIiArIGVycm9yc0ZvdW5kLmpvaW4oXCI8L2xpPjxsaT5cIikgKyBcIjwvbGk+PC91bD5cIiArIChzZXR0aW5ncy5vcHRpb25zLnByZXBlbmRFeGlzdGluZ0hlbHBCbG9jayA/ICRoZWxwQmxvY2suZGF0YShcIm9yaWdpbmFsLWNvbnRlbnRzXCIpIDogXCJcIikpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkY29udHJvbEdyb3VwLnJlbW92ZUNsYXNzKFwid2FybmluZyBlcnJvciBzdWNjZXNzXCIpO1xuICAgICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICRjb250cm9sR3JvdXAuYWRkQ2xhc3MoXCJzdWNjZXNzXCIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICRoZWxwQmxvY2suaHRtbCgkaGVscEJsb2NrLmRhdGEoXCJvcmlnaW5hbC1jb250ZW50c1wiKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlLnR5cGUgPT09IFwiYmx1clwiKSB7XG4gICAgICAgICAgICAgICRjb250cm9sR3JvdXAucmVtb3ZlQ2xhc3MoXCJzdWNjZXNzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgICR0aGlzLmJpbmQoXCJ2YWxpZGF0aW9uTG9zdEZvY3VzLnZhbGlkYXRpb25cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJGNvbnRyb2xHcm91cC5yZW1vdmVDbGFzcyhcInN1Y2Nlc3NcIik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAkY29udHJvbEdyb3VwID0gJHRoaXMucGFyZW50cyhcIi5mb3JtLWdyb3VwXCIpLmZpcnN0KCksXG4gICAgICAgICAgICAgICRoZWxwQmxvY2sgPSAkY29udHJvbEdyb3VwLmZpbmQoXCIuaGVscC1ibG9ja1wiKS5maXJzdCgpO1xuXG4gICAgICAgICAgLy8gcmVtb3ZlIG91ciBldmVudHNcbiAgICAgICAgICAkdGhpcy51bmJpbmQoJy52YWxpZGF0aW9uJyk7IC8vIGV2ZW50cyBhcmUgbmFtZXNwYWNlZC5cbiAgICAgICAgICAvLyByZXNldCBoZWxwIHRleHRcbiAgICAgICAgICAkaGVscEJsb2NrLmh0bWwoJGhlbHBCbG9jay5kYXRhKFwib3JpZ2luYWwtY29udGVudHNcIikpO1xuICAgICAgICAgIC8vIHJlc2V0IGNsYXNzZXNcbiAgICAgICAgICAkY29udHJvbEdyb3VwLmF0dHIoXCJjbGFzc1wiLCAkY29udHJvbEdyb3VwLmRhdGEoXCJvcmlnaW5hbC1jbGFzc2VzXCIpKTtcbiAgICAgICAgICAvLyByZXNldCBhcmlhXG4gICAgICAgICAgJHRoaXMuYXR0cihcImFyaWEtaW52YWxpZFwiLCAkdGhpcy5kYXRhKFwib3JpZ2luYWwtYXJpYS1pbnZhbGlkXCIpKTtcbiAgICAgICAgICAvLyByZXNldCByb2xlXG4gICAgICAgICAgJGhlbHBCbG9jay5hdHRyKFwicm9sZVwiLCAkdGhpcy5kYXRhKFwib3JpZ2luYWwtcm9sZVwiKSk7XG4gICAgICAgICAgLy8gcmVtb3ZlIGFsbCBlbGVtZW50cyB3ZSBjcmVhdGVkXG4gICAgICAgICAgaWYgKGNyZWF0ZWRFbGVtZW50cy5pbmRleE9mKCRoZWxwQmxvY2tbMF0pID4gLTEpIHtcbiAgICAgICAgICAgICRoZWxwQmxvY2sucmVtb3ZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBjb2xsZWN0RXJyb3JzOiBmdW5jdGlvbiBjb2xsZWN0RXJyb3JzKGluY2x1ZGVFbXB0eSkge1xuXG4gICAgICAgIHZhciBlcnJvck1lc3NhZ2VzID0ge307XG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWwpIHtcbiAgICAgICAgICB2YXIgJGVsID0gJChlbCk7XG4gICAgICAgICAgdmFyIG5hbWUgPSAkZWwuYXR0cihcIm5hbWVcIik7XG4gICAgICAgICAgdmFyIGVycm9ycyA9ICRlbC50cmlnZ2VySGFuZGxlcihcInZhbGlkYXRpb24udmFsaWRhdGlvblwiLCB7IGluY2x1ZGVFbXB0eTogdHJ1ZSB9KTtcbiAgICAgICAgICBlcnJvck1lc3NhZ2VzW25hbWVdID0gJC5leHRlbmQodHJ1ZSwgZXJyb3JzLCBlcnJvck1lc3NhZ2VzW25hbWVdKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJC5lYWNoKGVycm9yTWVzc2FnZXMsIGZ1bmN0aW9uIChpLCBlbCkge1xuICAgICAgICAgIGlmIChlbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGRlbGV0ZSBlcnJvck1lc3NhZ2VzW2ldO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGVycm9yTWVzc2FnZXM7XG4gICAgICB9LFxuICAgICAgaGFzRXJyb3JzOiBmdW5jdGlvbiBoYXNFcnJvcnMoKSB7XG5cbiAgICAgICAgdmFyIGVycm9yTWVzc2FnZXMgPSBbXTtcblxuICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsKSB7XG4gICAgICAgICAgZXJyb3JNZXNzYWdlcyA9IGVycm9yTWVzc2FnZXMuY29uY2F0KCQoZWwpLnRyaWdnZXJIYW5kbGVyKFwiZ2V0VmFsaWRhdG9ycy52YWxpZGF0aW9uXCIpID8gJChlbCkudHJpZ2dlckhhbmRsZXIoXCJ2YWxpZGF0aW9uLnZhbGlkYXRpb25cIiwgeyBzdWJtaXR0aW5nOiB0cnVlIH0pIDogW10pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZXJyb3JNZXNzYWdlcy5sZW5ndGggPiAwO1xuICAgICAgfSxcbiAgICAgIG92ZXJyaWRlOiBmdW5jdGlvbiBvdmVycmlkZShuZXdEZWZhdWx0cykge1xuICAgICAgICBkZWZhdWx0cyA9ICQuZXh0ZW5kKHRydWUsIGRlZmF1bHRzLCBuZXdEZWZhdWx0cyk7XG4gICAgICB9XG4gICAgfSxcbiAgICB2YWxpZGF0b3JUeXBlczoge1xuICAgICAgY2FsbGJhY2s6IHtcbiAgICAgICAgbmFtZTogXCJjYWxsYmFja1wiLFxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCR0aGlzLCBuYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbGlkYXRvck5hbWU6IG5hbWUsXG4gICAgICAgICAgICBjYWxsYmFjazogJHRoaXMuZGF0YShcInZhbGlkYXRpb25cIiArIG5hbWUgKyBcIkNhbGxiYWNrXCIpLFxuICAgICAgICAgICAgbGFzdFZhbHVlOiAkdGhpcy52YWwoKSxcbiAgICAgICAgICAgIGxhc3RWYWxpZDogdHJ1ZSxcbiAgICAgICAgICAgIGxhc3RGaW5pc2hlZDogdHJ1ZVxuICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIHZhbGlkYXRlOiBmdW5jdGlvbiB2YWxpZGF0ZSgkdGhpcywgdmFsdWUsIHZhbGlkYXRvcikge1xuICAgICAgICAgIGlmICh2YWxpZGF0b3IubGFzdFZhbHVlID09PSB2YWx1ZSAmJiB2YWxpZGF0b3IubGFzdEZpbmlzaGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gIXZhbGlkYXRvci5sYXN0VmFsaWQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHZhbGlkYXRvci5sYXN0RmluaXNoZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHZhbGlkYXRvci5sYXN0VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHZhbGlkYXRvci5sYXN0VmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgdmFsaWRhdG9yLmxhc3RGaW5pc2hlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICB2YXIgcnJqcWJ2VmFsaWRhdG9yID0gdmFsaWRhdG9yO1xuICAgICAgICAgICAgdmFyIHJyanFidlRoaXMgPSAkdGhpcztcbiAgICAgICAgICAgIGV4ZWN1dGVGdW5jdGlvbkJ5TmFtZSh2YWxpZGF0b3IuY2FsbGJhY2ssIHdpbmRvdywgJHRoaXMsIHZhbHVlLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICBpZiAocnJqcWJ2VmFsaWRhdG9yLmxhc3RWYWx1ZSA9PT0gZGF0YS52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJyanFidlZhbGlkYXRvci5sYXN0VmFsaWQgPSBkYXRhLnZhbGlkO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgIHJyanFidlZhbGlkYXRvci5tZXNzYWdlID0gZGF0YS5tZXNzYWdlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBycmpxYnZWYWxpZGF0b3IubGFzdEZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBycmpxYnZUaGlzLmRhdGEoXCJ2YWxpZGF0aW9uXCIgKyBycmpxYnZWYWxpZGF0b3IudmFsaWRhdG9yTmFtZSArIFwiTWVzc2FnZVwiLCBycmpxYnZWYWxpZGF0b3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgLy8gVGltZW91dCBpcyBzZXQgdG8gYXZvaWQgcHJvYmxlbXMgd2l0aCB0aGUgZXZlbnRzIGJlaW5nIGNvbnNpZGVyZWQgJ2FscmVhZHkgZmlyZWQnXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICBycmpxYnZUaGlzLnRyaWdnZXIoXCJjaGFuZ2UudmFsaWRhdGlvblwiKTtcbiAgICAgICAgICAgICAgICB9LCAxKTsgLy8gZG9lc24ndCBuZWVkIGEgbG9uZyB0aW1lb3V0LCBqdXN0IGxvbmcgZW5vdWdoIGZvciB0aGUgZXZlbnQgYnViYmxlIHRvIGJ1cnN0XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGFqYXg6IHtcbiAgICAgICAgbmFtZTogXCJhamF4XCIsXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoJHRoaXMsIG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsaWRhdG9yTmFtZTogbmFtZSxcbiAgICAgICAgICAgIHVybDogJHRoaXMuZGF0YShcInZhbGlkYXRpb25cIiArIG5hbWUgKyBcIkFqYXhcIiksXG4gICAgICAgICAgICBsYXN0VmFsdWU6ICR0aGlzLnZhbCgpLFxuICAgICAgICAgICAgbGFzdFZhbGlkOiB0cnVlLFxuICAgICAgICAgICAgbGFzdEZpbmlzaGVkOiB0cnVlXG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uIHZhbGlkYXRlKCR0aGlzLCB2YWx1ZSwgdmFsaWRhdG9yKSB7XG4gICAgICAgICAgaWYgKFwiXCIgKyB2YWxpZGF0b3IubGFzdFZhbHVlID09PSBcIlwiICsgdmFsdWUgJiYgdmFsaWRhdG9yLmxhc3RGaW5pc2hlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRvci5sYXN0VmFsaWQgPT09IGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh2YWxpZGF0b3IubGFzdEZpbmlzaGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICB2YWxpZGF0b3IubGFzdFZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB2YWxpZGF0b3IubGFzdFZhbGlkID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhbGlkYXRvci5sYXN0RmluaXNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgIHVybDogdmFsaWRhdG9yLnVybCxcbiAgICAgICAgICAgICAgZGF0YTogXCJ2YWx1ZT1cIiArIHZhbHVlICsgXCImZmllbGQ9XCIgKyAkdGhpcy5hdHRyKFwibmFtZVwiKSxcbiAgICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoXCJcIiArIHZhbGlkYXRvci5sYXN0VmFsdWUgPT09IFwiXCIgKyBkYXRhLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICB2YWxpZGF0b3IubGFzdFZhbGlkID0gISFkYXRhLnZhbGlkO1xuICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3IubWVzc2FnZSA9IGRhdGEubWVzc2FnZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRvci5sYXN0RmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgJHRoaXMuZGF0YShcInZhbGlkYXRpb25cIiArIHZhbGlkYXRvci52YWxpZGF0b3JOYW1lICsgXCJNZXNzYWdlXCIsIHZhbGlkYXRvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgIC8vIFRpbWVvdXQgaXMgc2V0IHRvIGF2b2lkIHByb2JsZW1zIHdpdGggdGhlIGV2ZW50cyBiZWluZyBjb25zaWRlcmVkICdhbHJlYWR5IGZpcmVkJ1xuICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICR0aGlzLnRyaWdnZXIoXCJjaGFuZ2UudmFsaWRhdGlvblwiKTtcbiAgICAgICAgICAgICAgICAgIH0sIDEpOyAvLyBkb2Vzbid0IG5lZWQgYSBsb25nIHRpbWVvdXQsIGp1c3QgbG9uZyBlbm91Z2ggZm9yIHRoZSBldmVudCBidWJibGUgdG8gYnVyc3RcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGZhaWx1cmU6IGZ1bmN0aW9uIGZhaWx1cmUoKSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yLmxhc3RWYWxpZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yLm1lc3NhZ2UgPSBcImFqYXggY2FsbCBmYWlsZWRcIjtcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3IubGFzdEZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAkdGhpcy5kYXRhKFwidmFsaWRhdGlvblwiICsgdmFsaWRhdG9yLnZhbGlkYXRvck5hbWUgKyBcIk1lc3NhZ2VcIiwgdmFsaWRhdG9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIC8vIFRpbWVvdXQgaXMgc2V0IHRvIGF2b2lkIHByb2JsZW1zIHdpdGggdGhlIGV2ZW50cyBiZWluZyBjb25zaWRlcmVkICdhbHJlYWR5IGZpcmVkJ1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgJHRoaXMudHJpZ2dlcihcImNoYW5nZS52YWxpZGF0aW9uXCIpO1xuICAgICAgICAgICAgICAgIH0sIDEpOyAvLyBkb2Vzbid0IG5lZWQgYSBsb25nIHRpbWVvdXQsIGp1c3QgbG9uZyBlbm91Z2ggZm9yIHRoZSBldmVudCBidWJibGUgdG8gYnVyc3RcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVnZXg6IHtcbiAgICAgICAgbmFtZTogXCJyZWdleFwiLFxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCR0aGlzLCBuYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIHsgcmVnZXg6IHJlZ2V4RnJvbVN0cmluZygkdGhpcy5kYXRhKFwidmFsaWRhdGlvblwiICsgbmFtZSArIFwiUmVnZXhcIikpIH07XG4gICAgICAgIH0sXG4gICAgICAgIHZhbGlkYXRlOiBmdW5jdGlvbiB2YWxpZGF0ZSgkdGhpcywgdmFsdWUsIHZhbGlkYXRvcikge1xuICAgICAgICAgIHJldHVybiAhdmFsaWRhdG9yLnJlZ2V4LnRlc3QodmFsdWUpICYmICF2YWxpZGF0b3IubmVnYXRpdmUgfHwgdmFsaWRhdG9yLnJlZ2V4LnRlc3QodmFsdWUpICYmIHZhbGlkYXRvci5uZWdhdGl2ZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiB7XG4gICAgICAgIG5hbWU6IFwicmVxdWlyZWRcIixcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgkdGhpcywgbmFtZSkge1xuICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfSxcbiAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uIHZhbGlkYXRlKCR0aGlzLCB2YWx1ZSwgdmFsaWRhdG9yKSB7XG4gICAgICAgICAgcmV0dXJuICEhKHZhbHVlLmxlbmd0aCA9PT0gMCAmJiAhdmFsaWRhdG9yLm5lZ2F0aXZlKSB8fCAhISh2YWx1ZS5sZW5ndGggPiAwICYmIHZhbGlkYXRvci5uZWdhdGl2ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGJsb2NrU3VibWl0OiB0cnVlXG4gICAgICB9LFxuICAgICAgbWF0Y2g6IHtcbiAgICAgICAgbmFtZTogXCJtYXRjaFwiLFxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCR0aGlzLCBuYW1lKSB7XG4gICAgICAgICAgdmFyIGVsZW1lbnQgPSAkdGhpcy5wYXJlbnRzKFwiZm9ybVwiKS5maXJzdCgpLmZpbmQoXCJbbmFtZT1cXFwiXCIgKyAkdGhpcy5kYXRhKFwidmFsaWRhdGlvblwiICsgbmFtZSArIFwiTWF0Y2hcIikgKyBcIlxcXCJdXCIpLmZpcnN0KCk7XG4gICAgICAgICAgZWxlbWVudC5iaW5kKFwidmFsaWRhdGlvbi52YWxpZGF0aW9uXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICR0aGlzLnRyaWdnZXIoXCJjaGFuZ2UudmFsaWRhdGlvblwiLCB7IHN1Ym1pdHRpbmc6IHRydWUgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHsgXCJlbGVtZW50XCI6IGVsZW1lbnQgfTtcbiAgICAgICAgfSxcbiAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uIHZhbGlkYXRlKCR0aGlzLCB2YWx1ZSwgdmFsaWRhdG9yKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlICE9PSB2YWxpZGF0b3IuZWxlbWVudC52YWwoKSAmJiAhdmFsaWRhdG9yLm5lZ2F0aXZlIHx8IHZhbHVlID09PSB2YWxpZGF0b3IuZWxlbWVudC52YWwoKSAmJiB2YWxpZGF0b3IubmVnYXRpdmU7XG4gICAgICAgIH0sXG4gICAgICAgIGJsb2NrU3VibWl0OiB0cnVlXG4gICAgICB9LFxuICAgICAgbWF4OiB7XG4gICAgICAgIG5hbWU6IFwibWF4XCIsXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoJHRoaXMsIG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4geyBtYXg6ICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uXCIgKyBuYW1lICsgXCJNYXhcIikgfTtcbiAgICAgICAgfSxcbiAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uIHZhbGlkYXRlKCR0aGlzLCB2YWx1ZSwgdmFsaWRhdG9yKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUsIDEwKSA+IHBhcnNlRmxvYXQodmFsaWRhdG9yLm1heCwgMTApICYmICF2YWxpZGF0b3IubmVnYXRpdmUgfHwgcGFyc2VGbG9hdCh2YWx1ZSwgMTApIDw9IHBhcnNlRmxvYXQodmFsaWRhdG9yLm1heCwgMTApICYmIHZhbGlkYXRvci5uZWdhdGl2ZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1pbjoge1xuICAgICAgICBuYW1lOiBcIm1pblwiLFxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCR0aGlzLCBuYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIHsgbWluOiAkdGhpcy5kYXRhKFwidmFsaWRhdGlvblwiICsgbmFtZSArIFwiTWluXCIpIH07XG4gICAgICAgIH0sXG4gICAgICAgIHZhbGlkYXRlOiBmdW5jdGlvbiB2YWxpZGF0ZSgkdGhpcywgdmFsdWUsIHZhbGlkYXRvcikge1xuICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKSA8IHBhcnNlRmxvYXQodmFsaWRhdG9yLm1pbikgJiYgIXZhbGlkYXRvci5uZWdhdGl2ZSB8fCBwYXJzZUZsb2F0KHZhbHVlKSA+PSBwYXJzZUZsb2F0KHZhbGlkYXRvci5taW4pICYmIHZhbGlkYXRvci5uZWdhdGl2ZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1heGxlbmd0aDoge1xuICAgICAgICBuYW1lOiBcIm1heGxlbmd0aFwiLFxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCR0aGlzLCBuYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIHsgbWF4bGVuZ3RoOiAkdGhpcy5kYXRhKFwidmFsaWRhdGlvblwiICsgbmFtZSArIFwiTWF4bGVuZ3RoXCIpIH07XG4gICAgICAgIH0sXG4gICAgICAgIHZhbGlkYXRlOiBmdW5jdGlvbiB2YWxpZGF0ZSgkdGhpcywgdmFsdWUsIHZhbGlkYXRvcikge1xuICAgICAgICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPiB2YWxpZGF0b3IubWF4bGVuZ3RoICYmICF2YWxpZGF0b3IubmVnYXRpdmUgfHwgdmFsdWUubGVuZ3RoIDw9IHZhbGlkYXRvci5tYXhsZW5ndGggJiYgdmFsaWRhdG9yLm5lZ2F0aXZlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWlubGVuZ3RoOiB7XG4gICAgICAgIG5hbWU6IFwibWlubGVuZ3RoXCIsXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoJHRoaXMsIG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4geyBtaW5sZW5ndGg6ICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uXCIgKyBuYW1lICsgXCJNaW5sZW5ndGhcIikgfTtcbiAgICAgICAgfSxcbiAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uIHZhbGlkYXRlKCR0aGlzLCB2YWx1ZSwgdmFsaWRhdG9yKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA8IHZhbGlkYXRvci5taW5sZW5ndGggJiYgIXZhbGlkYXRvci5uZWdhdGl2ZSB8fCB2YWx1ZS5sZW5ndGggPj0gdmFsaWRhdG9yLm1pbmxlbmd0aCAmJiB2YWxpZGF0b3IubmVnYXRpdmU7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtYXhjaGVja2VkOiB7XG4gICAgICAgIG5hbWU6IFwibWF4Y2hlY2tlZFwiLFxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCR0aGlzLCBuYW1lKSB7XG4gICAgICAgICAgdmFyIGVsZW1lbnRzID0gJHRoaXMucGFyZW50cyhcImZvcm1cIikuZmlyc3QoKS5maW5kKFwiW25hbWU9XFxcIlwiICsgJHRoaXMuYXR0cihcIm5hbWVcIikgKyBcIlxcXCJdXCIpO1xuICAgICAgICAgIGVsZW1lbnRzLmJpbmQoXCJjbGljay52YWxpZGF0aW9uXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICR0aGlzLnRyaWdnZXIoXCJjaGFuZ2UudmFsaWRhdGlvblwiLCB7IGluY2x1ZGVFbXB0eTogdHJ1ZSB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4geyBtYXhjaGVja2VkOiAkdGhpcy5kYXRhKFwidmFsaWRhdGlvblwiICsgbmFtZSArIFwiTWF4Y2hlY2tlZFwiKSwgZWxlbWVudHM6IGVsZW1lbnRzIH07XG4gICAgICAgIH0sXG4gICAgICAgIHZhbGlkYXRlOiBmdW5jdGlvbiB2YWxpZGF0ZSgkdGhpcywgdmFsdWUsIHZhbGlkYXRvcikge1xuICAgICAgICAgIHJldHVybiB2YWxpZGF0b3IuZWxlbWVudHMuZmlsdGVyKFwiOmNoZWNrZWRcIikubGVuZ3RoID4gdmFsaWRhdG9yLm1heGNoZWNrZWQgJiYgIXZhbGlkYXRvci5uZWdhdGl2ZSB8fCB2YWxpZGF0b3IuZWxlbWVudHMuZmlsdGVyKFwiOmNoZWNrZWRcIikubGVuZ3RoIDw9IHZhbGlkYXRvci5tYXhjaGVja2VkICYmIHZhbGlkYXRvci5uZWdhdGl2ZTtcbiAgICAgICAgfSxcbiAgICAgICAgYmxvY2tTdWJtaXQ6IHRydWVcbiAgICAgIH0sXG4gICAgICBtaW5jaGVja2VkOiB7XG4gICAgICAgIG5hbWU6IFwibWluY2hlY2tlZFwiLFxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCR0aGlzLCBuYW1lKSB7XG4gICAgICAgICAgdmFyIGVsZW1lbnRzID0gJHRoaXMucGFyZW50cyhcImZvcm1cIikuZmlyc3QoKS5maW5kKFwiW25hbWU9XFxcIlwiICsgJHRoaXMuYXR0cihcIm5hbWVcIikgKyBcIlxcXCJdXCIpO1xuICAgICAgICAgIGVsZW1lbnRzLmJpbmQoXCJjbGljay52YWxpZGF0aW9uXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICR0aGlzLnRyaWdnZXIoXCJjaGFuZ2UudmFsaWRhdGlvblwiLCB7IGluY2x1ZGVFbXB0eTogdHJ1ZSB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4geyBtaW5jaGVja2VkOiAkdGhpcy5kYXRhKFwidmFsaWRhdGlvblwiICsgbmFtZSArIFwiTWluY2hlY2tlZFwiKSwgZWxlbWVudHM6IGVsZW1lbnRzIH07XG4gICAgICAgIH0sXG4gICAgICAgIHZhbGlkYXRlOiBmdW5jdGlvbiB2YWxpZGF0ZSgkdGhpcywgdmFsdWUsIHZhbGlkYXRvcikge1xuICAgICAgICAgIHJldHVybiB2YWxpZGF0b3IuZWxlbWVudHMuZmlsdGVyKFwiOmNoZWNrZWRcIikubGVuZ3RoIDwgdmFsaWRhdG9yLm1pbmNoZWNrZWQgJiYgIXZhbGlkYXRvci5uZWdhdGl2ZSB8fCB2YWxpZGF0b3IuZWxlbWVudHMuZmlsdGVyKFwiOmNoZWNrZWRcIikubGVuZ3RoID49IHZhbGlkYXRvci5taW5jaGVja2VkICYmIHZhbGlkYXRvci5uZWdhdGl2ZTtcbiAgICAgICAgfSxcbiAgICAgICAgYmxvY2tTdWJtaXQ6IHRydWVcbiAgICAgIH1cbiAgICB9LFxuICAgIGJ1aWx0SW5WYWxpZGF0b3JzOiB7XG4gICAgICBlbWFpbDoge1xuICAgICAgICBuYW1lOiBcIkVtYWlsXCIsXG4gICAgICAgIHR5cGU6IFwic2hvcnRjdXRcIixcbiAgICAgICAgc2hvcnRjdXQ6IFwidmFsaWRlbWFpbFwiXG4gICAgICB9LFxuICAgICAgdmFsaWRlbWFpbDoge1xuICAgICAgICBuYW1lOiBcIlZhbGlkZW1haWxcIixcbiAgICAgICAgdHlwZTogXCJyZWdleFwiLFxuICAgICAgICByZWdleDogXCJbQS1aYS16MC05Ll8lKy1dK0BbQS1aYS16MC05Li1dK1xcXFxcXC5bQS1aYS16XXsyLDR9XCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiTm90IGEgdmFsaWQgZW1haWwgYWRkcmVzczwhLS0gZGF0YS12YWxpZGF0b3ItdmFsaWRlbWFpbC1tZXNzYWdlIHRvIG92ZXJyaWRlIC0tPlwiXG4gICAgICB9LFxuICAgICAgcGFzc3dvcmRhZ2Fpbjoge1xuICAgICAgICBuYW1lOiBcIlBhc3N3b3JkYWdhaW5cIixcbiAgICAgICAgdHlwZTogXCJtYXRjaFwiLFxuICAgICAgICBtYXRjaDogXCJwYXNzd29yZFwiLFxuICAgICAgICBtZXNzYWdlOiBcIkRvZXMgbm90IG1hdGNoIHRoZSBnaXZlbiBwYXNzd29yZDwhLS0gZGF0YS12YWxpZGF0b3ItcGFzd29yZGFnYWluLW1lc3NhZ2UgdG8gb3ZlcnJpZGUgLS0+XCJcbiAgICAgIH0sXG4gICAgICBwb3NpdGl2ZToge1xuICAgICAgICBuYW1lOiBcIlBvc2l0aXZlXCIsXG4gICAgICAgIHR5cGU6IFwic2hvcnRjdXRcIixcbiAgICAgICAgc2hvcnRjdXQ6IFwibnVtYmVyLHBvc2l0aXZlbnVtYmVyXCJcbiAgICAgIH0sXG4gICAgICBuZWdhdGl2ZToge1xuICAgICAgICBuYW1lOiBcIk5lZ2F0aXZlXCIsXG4gICAgICAgIHR5cGU6IFwic2hvcnRjdXRcIixcbiAgICAgICAgc2hvcnRjdXQ6IFwibnVtYmVyLG5lZ2F0aXZlbnVtYmVyXCJcbiAgICAgIH0sXG4gICAgICBudW1iZXI6IHtcbiAgICAgICAgbmFtZTogXCJOdW1iZXJcIixcbiAgICAgICAgdHlwZTogXCJyZWdleFwiLFxuICAgICAgICByZWdleDogXCIoWystXT9cXFxcXFxkKyhcXFxcXFwuXFxcXFxcZCopPyhbZUVdWystXT9bMC05XSspPyk/XCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiTXVzdCBiZSBhIG51bWJlcjwhLS0gZGF0YS12YWxpZGF0b3ItbnVtYmVyLW1lc3NhZ2UgdG8gb3ZlcnJpZGUgLS0+XCJcbiAgICAgIH0sXG4gICAgICBpbnRlZ2VyOiB7XG4gICAgICAgIG5hbWU6IFwiSW50ZWdlclwiLFxuICAgICAgICB0eXBlOiBcInJlZ2V4XCIsXG4gICAgICAgIHJlZ2V4OiBcIlsrLV0/XFxcXFxcZCtcIixcbiAgICAgICAgbWVzc2FnZTogXCJObyBkZWNpbWFsIHBsYWNlcyBhbGxvd2VkPCEtLSBkYXRhLXZhbGlkYXRvci1pbnRlZ2VyLW1lc3NhZ2UgdG8gb3ZlcnJpZGUgLS0+XCJcbiAgICAgIH0sXG4gICAgICBwb3NpdGl2ZW51bWJlcjoge1xuICAgICAgICBuYW1lOiBcIlBvc2l0aXZlbnVtYmVyXCIsXG4gICAgICAgIHR5cGU6IFwibWluXCIsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgbWVzc2FnZTogXCJNdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyPCEtLSBkYXRhLXZhbGlkYXRvci1wb3NpdGl2ZW51bWJlci1tZXNzYWdlIHRvIG92ZXJyaWRlIC0tPlwiXG4gICAgICB9LFxuICAgICAgbmVnYXRpdmVudW1iZXI6IHtcbiAgICAgICAgbmFtZTogXCJOZWdhdGl2ZW51bWJlclwiLFxuICAgICAgICB0eXBlOiBcIm1heFwiLFxuICAgICAgICBtYXg6IDAsXG4gICAgICAgIG1lc3NhZ2U6IFwiTXVzdCBiZSBhIG5lZ2F0aXZlIG51bWJlcjwhLS0gZGF0YS12YWxpZGF0b3ItbmVnYXRpdmVudW1iZXItbWVzc2FnZSB0byBvdmVycmlkZSAtLT5cIlxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiB7XG4gICAgICAgIG5hbWU6IFwiUmVxdWlyZWRcIixcbiAgICAgICAgdHlwZTogXCJyZXF1aXJlZFwiLFxuICAgICAgICBtZXNzYWdlOiBcIlRoaXMgaXMgcmVxdWlyZWQ8IS0tIGRhdGEtdmFsaWRhdG9yLXJlcXVpcmVkLW1lc3NhZ2UgdG8gb3ZlcnJpZGUgLS0+XCJcbiAgICAgIH0sXG4gICAgICBjaGVja29uZToge1xuICAgICAgICBuYW1lOiBcIkNoZWNrb25lXCIsXG4gICAgICAgIHR5cGU6IFwibWluY2hlY2tlZFwiLFxuICAgICAgICBtaW5jaGVja2VkOiAxLFxuICAgICAgICBtZXNzYWdlOiBcIkNoZWNrIGF0IGxlYXN0IG9uZSBvcHRpb248IS0tIGRhdGEtdmFsaWRhdGlvbi1jaGVja29uZS1tZXNzYWdlIHRvIG92ZXJyaWRlIC0tPlwiXG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciBmb3JtYXRWYWxpZGF0b3JOYW1lID0gZnVuY3Rpb24gZm9ybWF0VmFsaWRhdG9yTmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8oXnxcXHMpKFthLXpdKS9nLCBmdW5jdGlvbiAobSwgcDEsIHAyKSB7XG4gICAgICByZXR1cm4gcDEgKyBwMi50b1VwcGVyQ2FzZSgpO1xuICAgIH0pO1xuICB9O1xuXG4gIHZhciBnZXRWYWx1ZSA9IGZ1bmN0aW9uIGdldFZhbHVlKCR0aGlzKSB7XG4gICAgLy8gRXh0cmFjdCB0aGUgdmFsdWUgd2UncmUgdGFsa2luZyBhYm91dFxuICAgIHZhciB2YWx1ZSA9ICR0aGlzLnZhbCgpO1xuICAgIHZhciB0eXBlID0gJHRoaXMuYXR0cihcInR5cGVcIik7XG4gICAgaWYgKHR5cGUgPT09IFwiY2hlY2tib3hcIikge1xuICAgICAgdmFsdWUgPSAkdGhpcy5pcyhcIjpjaGVja2VkXCIpID8gdmFsdWUgOiBcIlwiO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gXCJyYWRpb1wiKSB7XG4gICAgICB2YWx1ZSA9ICQoJ2lucHV0W25hbWU9XCInICsgJHRoaXMuYXR0cihcIm5hbWVcIikgKyAnXCJdOmNoZWNrZWQnKS5sZW5ndGggPiAwID8gdmFsdWUgOiBcIlwiO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgZnVuY3Rpb24gcmVnZXhGcm9tU3RyaW5nKGlucHV0c3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoXCJeXCIgKyBpbnB1dHN0cmluZyArIFwiJFwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGFua3MgdG8gSmFzb24gQnVudGluZyB2aWEgU3RhY2tPdmVyZmxvdy5jb21cbiAgICpcbiAgICogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNTk3ODgvaG93LXRvLWV4ZWN1dGUtYS1qYXZhc2NyaXB0LWZ1bmN0aW9uLXdoZW4taS1oYXZlLWl0cy1uYW1lLWFzLWEtc3RyaW5nI2Fuc3dlci0zNTk5MTBcbiAgICogU2hvcnQgbGluazogaHR0cDovL3Rpbnl1cmwuY29tL2V4ZWN1dGVGdW5jdGlvbkJ5TmFtZVxuICAqKi9cbiAgZnVuY3Rpb24gZXhlY3V0ZUZ1bmN0aW9uQnlOYW1lKGZ1bmN0aW9uTmFtZSwgY29udGV4dCAvKiwgYXJncyovKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpLnNwbGljZSgyKTtcbiAgICB2YXIgbmFtZXNwYWNlcyA9IGZ1bmN0aW9uTmFtZS5zcGxpdChcIi5cIik7XG4gICAgdmFyIGZ1bmMgPSBuYW1lc3BhY2VzLnBvcCgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmFtZXNwYWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29udGV4dCA9IGNvbnRleHRbbmFtZXNwYWNlc1tpXV07XG4gICAgfVxuICAgIHJldHVybiBjb250ZXh0W2Z1bmNdLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgJC5mbi5qcUJvb3RzdHJhcFZhbGlkYXRpb24gPSBmdW5jdGlvbiAobWV0aG9kKSB7XG5cbiAgICBpZiAoZGVmYXVsdHMubWV0aG9kc1ttZXRob2RdKSB7XG4gICAgICByZXR1cm4gZGVmYXVsdHMubWV0aG9kc1ttZXRob2RdLmFwcGx5KHRoaXMsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgIH0gZWxzZSBpZiAoKHR5cGVvZiBtZXRob2QgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihtZXRob2QpKSA9PT0gJ29iamVjdCcgfHwgIW1ldGhvZCkge1xuICAgICAgcmV0dXJuIGRlZmF1bHRzLm1ldGhvZHMuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkLmVycm9yKCdNZXRob2QgJyArIG1ldGhvZCArICcgZG9lcyBub3QgZXhpc3Qgb24galF1ZXJ5LmpxQm9vdHN0cmFwVmFsaWRhdGlvbicpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9O1xuXG4gICQuanFCb290c3RyYXBWYWxpZGF0aW9uID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAkKFwiOmlucHV0XCIpLm5vdChcIlt0eXBlPWltYWdlXSxbdHlwZT1zdWJtaXRdXCIpLmpxQm9vdHN0cmFwVmFsaWRhdGlvbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufSkoalF1ZXJ5KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NvdXJjZS9zY3JpcHRzL2pxQm9vdHN0cmFwVmFsaWRhdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiBodG1sLXNpdGVzICovXG4vL3ZhciBjb250ZXh0ID0gcmVxdWlyZS5jb250ZXh0KCcuLi9odG1sJywgdHJ1ZSwgL1xcLihodG1sKSQvKTtcbi8vdmFyIGh0bWxmaWxlcz17fTtcblxuLy9jb250ZXh0LmtleXMoKS5mb3JFYWNoKChmaWxlbmFtZSk9Pntcbi8vICBodG1sZmlsZXNbZmlsZW5hbWVdID0gY29udGV4dChmaWxlbmFtZSk7XG4vL30pO1xuXG4vKiBTdHlsZXMgKi9cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi4vc2Nzcy9zaXRlLnNjc3MnO1xuXG4vKiBTY3JvbGxsUmV2ZWFsICovXG53aW5kb3cuc3IgPSBTY3JvbGxSZXZlYWwoKTtcbndpbmRvdy5zci5yZXZlYWwoJy5zci1sZWZ0Jywge1xuICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgIGRpc3RhbmNlOiAnNTBweCcsXG4gICAgZWFzaW5nOiAnZWFzZScsXG4gICAgb3JpZ2luOiAnbGVmdCcsXG4gICAgcm90YXRlOiB7IHg6IDAsIHk6IDAsIHo6IDAgfSxcbiAgICBzY2FsZTogMC44XG59LCA1MDApO1xuXG53aW5kb3cuc3IucmV2ZWFsKCcuc3ItZmxpcCcsIHtcbiAgICBkdXJhdGlvbjogMTAwMCxcbiAgICBkaXN0YW5jZTogJzBweCcsXG4gICAgZWFzaW5nOiAnZWFzZScsXG4gICAgb3JpZ2luOiAnbGVmdCcsXG4gICAgcm90YXRlOiB7IHg6IDAsIHk6IC0xODAsIHo6IDAgfSxcbiAgICBzY2FsZTogMC44XG59LCA1MDApO1xuXG53aW5kb3cuc3IucmV2ZWFsKCcudGltZWxpbmUtZmxpcCcsIHtcbiAgICBkdXJhdGlvbjogMTAwMCxcbiAgICBkaXN0YW5jZTogJzBweCcsXG4gICAgZWFzaW5nOiAnZWFzZScsXG4gICAgb3JpZ2luOiAnbGVmdCcsXG4gICAgcm90YXRlOiB7IHg6IDAsIHk6IC0xODAsIHo6IDAgfSxcbiAgICBzY2FsZTogMC44XG59LCA1MDApO1xuXG53aW5kb3cuc3IucmV2ZWFsKCcuY29udGFjdC10b3AnLCB7XG4gICAgZHVyYXRpb246IDUwMCxcbiAgICBkaXN0YW5jZTogJzUwcHgnLFxuICAgIGVhc2luZzogJ2Vhc2UnLFxuICAgIG9yaWdpbjogJ3RvcCcsXG4gICAgcm90YXRlOiB7IHg6IDAsIHk6IDAsIHo6IDAgfSxcbiAgICBzY2FsZTogMC44XG59LCAxMDApO1xuXG4oZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjsgLy8gU3RhcnQgb2YgdXNlIHN0cmljdFxuXG4gICAgLy8gU21vb3RoIHNjcm9sbGluZyB1c2luZyBqUXVlcnkgZWFzaW5nXG5cbiAgICAkKCdhW2hyZWYqPVwiI1wiXTpub3QoW2hyZWY9XCIjXCJdKScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCAnJykgPT0gdGhpcy5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywgJycpICYmIGxvY2F0aW9uLmhvc3RuYW1lID09IHRoaXMuaG9zdG5hbWUpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMuaGFzaCk7XG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQubGVuZ3RoID8gdGFyZ2V0IDogJCgnW25hbWU9JyArIHRoaXMuaGFzaC5zbGljZSgxKSArICddJyk7XG4gICAgICAgICAgICBpZiAodGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wIC0gNTRcbiAgICAgICAgICAgICAgICB9LCAxMDAwLCBcImVhc2VJbk91dEV4cG9cIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBBY3RpdmF0ZSBzY3JvbGxzcHkgdG8gYWRkIGFjdGl2ZSBjbGFzcyB0byBuYXZiYXIgaXRlbXMgb24gc2Nyb2xsXG4gICAgJCgnYm9keScpLnNjcm9sbHNweSh7XG4gICAgICAgIHRhcmdldDogJyNtYWluTmF2JyxcbiAgICAgICAgb2Zmc2V0OiA1NFxuICAgIH0pO1xuXG4gICAgLy8gQ2xvc2VzIHJlc3BvbnNpdmUgbWVudSB3aGVuIGEgbGluayBpcyBjbGlja2VkXG4gICAgJCgnLm5hdmJhci1jb2xsYXBzZT51bD5saT5hJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcubmF2YmFyLWNvbGxhcHNlJykuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICB9KTtcblxuICAgIC8vIENvbGxhcHNlIHRoZSBuYXZiYXIgd2hlbiBwYWdlIGlzIHNjcm9sbGVkXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgkKFwiI21haW5OYXZcIikub2Zmc2V0KCkudG9wID4gMTAwKSB7XG4gICAgICAgICAgICAkKFwiI21haW5OYXZcIikuYWRkQ2xhc3MoXCJuYXZiYXItc2hyaW5rXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJChcIiNtYWluTmF2XCIpLnJlbW92ZUNsYXNzKFwibmF2YmFyLXNocmlua1wiKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSkoalF1ZXJ5KTsgLy8gRW5kIG9mIHVzZSBzdHJpY3RcblxudmFyIG15Q2VudGVyID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg0Ny4zNzA2NzQsIDguNTI4NjIwKTtcbmZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgdmFyIG1hcFByb3AgPSB7XG4gICAgICAgIGNlbnRlcjogbXlDZW50ZXIsXG4gICAgICAgIHpvb206IDE0LFxuICAgICAgICBtYXBUeXBlSWQ6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQXG4gICAgfTtcbiAgICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdvb2dsZU1hcFwiKSwgbWFwUHJvcCk7XG4gICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICBwb3NpdGlvbjogbXlDZW50ZXIsXG4gICAgICAgIHRpdGxlOiAnTmF0dXJhcHJheGlzJ1xuICAgIH0pO1xuICAgIG1hcmtlci5zZXRNYXAobWFwKTtcbiAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbWFwLnNldFpvb20oMTcpO1xuICAgICAgICBtYXAuc2V0Q2VudGVyKG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbiAgICB9KTtcbn1cbmdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHdpbmRvdywgJ2xvYWQnLCBpbml0aWFsaXplKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NvdXJjZS9zY3JpcHRzL3NpdGUuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NvdXJjZS9zY3NzL3NpdGUuc2Nzc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNoeUJBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzFHQTs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=
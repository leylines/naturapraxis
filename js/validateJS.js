webpackJsonp([1],{

/***/ 10:
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

/***/ })

},[10]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvdmFsaWRhdGVKUy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NvdXJjZS9zY3JpcHRzL2pxQm9vdHN0cmFwVmFsaWRhdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbi8qIGpxQm9vdHN0cmFwVmFsaWRhdGlvblxuICogQSBwbHVnaW4gZm9yIGF1dG9tYXRpbmcgdmFsaWRhdGlvbiBvbiBUd2l0dGVyIEJvb3RzdHJhcCBmb3JtYXR0ZWQgZm9ybXMuXG4gKlxuICogdjEuMy42XG4gKlxuICogTGljZW5zZTogTUlUIDxodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwPiAtIHNlZSBMSUNFTlNFIGZpbGVcbiAqXG4gKiBodHRwOi8vUmVhY3RpdmVSYXZlbi5naXRodWIuY29tL2pxQm9vdHN0cmFwVmFsaWRhdGlvbi9cbiAqL1xuXG4oZnVuY3Rpb24gKCQpIHtcblxuICB2YXIgY3JlYXRlZEVsZW1lbnRzID0gW107XG5cbiAgdmFyIGRlZmF1bHRzID0ge1xuICAgIG9wdGlvbnM6IHtcbiAgICAgIHByZXBlbmRFeGlzdGluZ0hlbHBCbG9jazogZmFsc2UsXG4gICAgICBzbmlmZkh0bWw6IHRydWUsIC8vIHNuaWZmIGZvciAncmVxdWlyZWQnLCAnbWF4bGVuZ3RoJywgZXRjXG4gICAgICBwcmV2ZW50U3VibWl0OiB0cnVlLCAvLyBzdG9wIHRoZSBmb3JtIHN1Ym1pdCBldmVudCBmcm9tIGZpcmluZyBpZiB2YWxpZGF0aW9uIGZhaWxzXG4gICAgICBzdWJtaXRFcnJvcjogZmFsc2UsIC8vIGZ1bmN0aW9uIGNhbGxlZCBpZiB0aGVyZSBpcyBhbiBlcnJvciB3aGVuIHRyeWluZyB0byBzdWJtaXRcbiAgICAgIHN1Ym1pdFN1Y2Nlc3M6IGZhbHNlLCAvLyBmdW5jdGlvbiBjYWxsZWQganVzdCBiZWZvcmUgYSBzdWNjZXNzZnVsIHN1Ym1pdCBldmVudCBpcyBzZW50IHRvIHRoZSBzZXJ2ZXJcbiAgICAgIHNlbWFudGljYWxseVN0cmljdDogZmFsc2UsIC8vIHNldCB0byB0cnVlIHRvIHRpZHkgdXAgZ2VuZXJhdGVkIEhUTUwgb3V0cHV0XG4gICAgICBhdXRvQWRkOiB7XG4gICAgICAgIGhlbHBCbG9ja3M6IHRydWVcbiAgICAgIH0sXG4gICAgICBmaWx0ZXI6IGZ1bmN0aW9uIGZpbHRlcigpIHtcbiAgICAgICAgLy8gcmV0dXJuICQodGhpcykuaXMoXCI6dmlzaWJsZVwiKTsgLy8gb25seSB2YWxpZGF0ZSBlbGVtZW50cyB5b3UgY2FuIHNlZVxuICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gdmFsaWRhdGUgZXZlcnl0aGluZ1xuICAgICAgfVxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdChvcHRpb25zKSB7XG5cbiAgICAgICAgdmFyIHNldHRpbmdzID0gJC5leHRlbmQodHJ1ZSwge30sIGRlZmF1bHRzKTtcblxuICAgICAgICBzZXR0aW5ncy5vcHRpb25zID0gJC5leHRlbmQodHJ1ZSwgc2V0dGluZ3Mub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAgICAgdmFyICRzaWJsaW5nRWxlbWVudHMgPSB0aGlzO1xuXG4gICAgICAgIHZhciB1bmlxdWVGb3JtcyA9ICQudW5pcXVlKCRzaWJsaW5nRWxlbWVudHMubWFwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gJCh0aGlzKS5wYXJlbnRzKFwiZm9ybVwiKVswXTtcbiAgICAgICAgfSkudG9BcnJheSgpKTtcblxuICAgICAgICAkKHVuaXF1ZUZvcm1zKS5iaW5kKFwic3VibWl0XCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgdmFyICRmb3JtID0gJCh0aGlzKTtcbiAgICAgICAgICB2YXIgd2FybmluZ3NGb3VuZCA9IDA7XG4gICAgICAgICAgdmFyICRpbnB1dHMgPSAkZm9ybS5maW5kKFwiaW5wdXQsdGV4dGFyZWEsc2VsZWN0XCIpLm5vdChcIlt0eXBlPXN1Ym1pdF0sW3R5cGU9aW1hZ2VdXCIpLmZpbHRlcihzZXR0aW5ncy5vcHRpb25zLmZpbHRlcik7XG4gICAgICAgICAgJGlucHV0cy50cmlnZ2VyKFwic3VibWl0LnZhbGlkYXRpb25cIikudHJpZ2dlcihcInZhbGlkYXRpb25Mb3N0Rm9jdXMudmFsaWRhdGlvblwiKTtcblxuICAgICAgICAgICRpbnB1dHMuZWFjaChmdW5jdGlvbiAoaSwgZWwpIHtcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQoZWwpLFxuICAgICAgICAgICAgICAgICRjb250cm9sR3JvdXAgPSAkdGhpcy5wYXJlbnRzKFwiLmZvcm0tZ3JvdXBcIikuZmlyc3QoKTtcbiAgICAgICAgICAgIGlmICgkY29udHJvbEdyb3VwLmhhc0NsYXNzKFwid2FybmluZ1wiKSkge1xuICAgICAgICAgICAgICAkY29udHJvbEdyb3VwLnJlbW92ZUNsYXNzKFwid2FybmluZ1wiKS5hZGRDbGFzcyhcImVycm9yXCIpO1xuICAgICAgICAgICAgICB3YXJuaW5nc0ZvdW5kKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkaW5wdXRzLnRyaWdnZXIoXCJ2YWxpZGF0aW9uTG9zdEZvY3VzLnZhbGlkYXRpb25cIik7XG5cbiAgICAgICAgICBpZiAod2FybmluZ3NGb3VuZCkge1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzLm9wdGlvbnMucHJldmVudFN1Ym1pdCkge1xuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkZm9ybS5hZGRDbGFzcyhcImVycm9yXCIpO1xuICAgICAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihzZXR0aW5ncy5vcHRpb25zLnN1Ym1pdEVycm9yKSkge1xuICAgICAgICAgICAgICBzZXR0aW5ncy5vcHRpb25zLnN1Ym1pdEVycm9yKCRmb3JtLCBlLCAkaW5wdXRzLmpxQm9vdHN0cmFwVmFsaWRhdGlvbihcImNvbGxlY3RFcnJvcnNcIiwgdHJ1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkZm9ybS5yZW1vdmVDbGFzcyhcImVycm9yXCIpO1xuICAgICAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihzZXR0aW5ncy5vcHRpb25zLnN1Ym1pdFN1Y2Nlc3MpKSB7XG4gICAgICAgICAgICAgIHNldHRpbmdzLm9wdGlvbnMuc3VibWl0U3VjY2VzcygkZm9ybSwgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgIC8vIEdldCByZWZlcmVuY2VzIHRvIGV2ZXJ5dGhpbmcgd2UncmUgaW50ZXJlc3RlZCBpblxuICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgICAgICAgICRjb250cm9sR3JvdXAgPSAkdGhpcy5wYXJlbnRzKFwiLmZvcm0tZ3JvdXBcIikuZmlyc3QoKSxcbiAgICAgICAgICAgICAgJGhlbHBCbG9jayA9ICRjb250cm9sR3JvdXAuZmluZChcIi5oZWxwLWJsb2NrXCIpLmZpcnN0KCksXG4gICAgICAgICAgICAgICRmb3JtID0gJHRoaXMucGFyZW50cyhcImZvcm1cIikuZmlyc3QoKSxcbiAgICAgICAgICAgICAgdmFsaWRhdG9yTmFtZXMgPSBbXTtcblxuICAgICAgICAgIC8vIGNyZWF0ZSBtZXNzYWdlIGNvbnRhaW5lciBpZiBub3QgZXhpc3RzXG4gICAgICAgICAgaWYgKCEkaGVscEJsb2NrLmxlbmd0aCAmJiBzZXR0aW5ncy5vcHRpb25zLmF1dG9BZGQgJiYgc2V0dGluZ3Mub3B0aW9ucy5hdXRvQWRkLmhlbHBCbG9ja3MpIHtcbiAgICAgICAgICAgICRoZWxwQmxvY2sgPSAkKCc8ZGl2IGNsYXNzPVwiaGVscC1ibG9ja1wiIC8+Jyk7XG4gICAgICAgICAgICAkY29udHJvbEdyb3VwLmZpbmQoJy5jb250cm9scycpLmFwcGVuZCgkaGVscEJsb2NrKTtcbiAgICAgICAgICAgIGNyZWF0ZWRFbGVtZW50cy5wdXNoKCRoZWxwQmxvY2tbMF0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTTklGRiBIVE1MIEZPUiBWQUxJREFUT1JTXG4gICAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgICAgICAgLy8gKnNub3J0IHNuaWZmIHNudWZmbGUqXG5cbiAgICAgICAgICBpZiAoc2V0dGluZ3Mub3B0aW9ucy5zbmlmZkh0bWwpIHtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCJcIjtcbiAgICAgICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQQVRURVJOXG4gICAgICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIGlmICgkdGhpcy5hdHRyKFwicGF0dGVyblwiKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIG1lc3NhZ2UgPSBcIk5vdCBpbiB0aGUgZXhwZWN0ZWQgZm9ybWF0PCEtLSBkYXRhLXZhbGlkYXRpb24tcGF0dGVybi1tZXNzYWdlIHRvIG92ZXJyaWRlIC0tPlwiO1xuICAgICAgICAgICAgICBpZiAoJHRoaXMuZGF0YShcInZhbGlkYXRpb25QYXR0ZXJuTWVzc2FnZVwiKSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAkdGhpcy5kYXRhKFwidmFsaWRhdGlvblBhdHRlcm5NZXNzYWdlXCIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uUGF0dGVybk1lc3NhZ2VcIiwgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uUGF0dGVyblJlZ2V4XCIsICR0aGlzLmF0dHIoXCJwYXR0ZXJuXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTUFYXG4gICAgICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIGlmICgkdGhpcy5hdHRyKFwibWF4XCIpICE9PSB1bmRlZmluZWQgfHwgJHRoaXMuYXR0cihcImFyaWEtdmFsdWVtYXhcIikgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICB2YXIgbWF4ID0gJHRoaXMuYXR0cihcIm1heFwiKSAhPT0gdW5kZWZpbmVkID8gJHRoaXMuYXR0cihcIm1heFwiKSA6ICR0aGlzLmF0dHIoXCJhcmlhLXZhbHVlbWF4XCIpO1xuICAgICAgICAgICAgICBtZXNzYWdlID0gXCJUb28gaGlnaDogTWF4aW11bSBvZiAnXCIgKyBtYXggKyBcIic8IS0tIGRhdGEtdmFsaWRhdGlvbi1tYXgtbWVzc2FnZSB0byBvdmVycmlkZSAtLT5cIjtcbiAgICAgICAgICAgICAgaWYgKCR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uTWF4TWVzc2FnZVwiKSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAkdGhpcy5kYXRhKFwidmFsaWRhdGlvbk1heE1lc3NhZ2VcIik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgJHRoaXMuZGF0YShcInZhbGlkYXRpb25NYXhNZXNzYWdlXCIsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAkdGhpcy5kYXRhKFwidmFsaWRhdGlvbk1heE1heFwiLCBtYXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNSU5cbiAgICAgICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgaWYgKCR0aGlzLmF0dHIoXCJtaW5cIikgIT09IHVuZGVmaW5lZCB8fCAkdGhpcy5hdHRyKFwiYXJpYS12YWx1ZW1pblwiKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHZhciBtaW4gPSAkdGhpcy5hdHRyKFwibWluXCIpICE9PSB1bmRlZmluZWQgPyAkdGhpcy5hdHRyKFwibWluXCIpIDogJHRoaXMuYXR0cihcImFyaWEtdmFsdWVtaW5cIik7XG4gICAgICAgICAgICAgIG1lc3NhZ2UgPSBcIlRvbyBsb3c6IE1pbmltdW0gb2YgJ1wiICsgbWluICsgXCInPCEtLSBkYXRhLXZhbGlkYXRpb24tbWluLW1lc3NhZ2UgdG8gb3ZlcnJpZGUgLS0+XCI7XG4gICAgICAgICAgICAgIGlmICgkdGhpcy5kYXRhKFwidmFsaWRhdGlvbk1pbk1lc3NhZ2VcIikpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJHRoaXMuZGF0YShcInZhbGlkYXRpb25NaW5NZXNzYWdlXCIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uTWluTWVzc2FnZVwiLCBtZXNzYWdlKTtcbiAgICAgICAgICAgICAgJHRoaXMuZGF0YShcInZhbGlkYXRpb25NaW5NaW5cIiwgbWluKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTUFYTEVOR1RIXG4gICAgICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIGlmICgkdGhpcy5hdHRyKFwibWF4bGVuZ3RoXCIpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiVG9vIGxvbmc6IE1heGltdW0gb2YgJ1wiICsgJHRoaXMuYXR0cihcIm1heGxlbmd0aFwiKSArIFwiJyBjaGFyYWN0ZXJzPCEtLSBkYXRhLXZhbGlkYXRpb24tbWF4bGVuZ3RoLW1lc3NhZ2UgdG8gb3ZlcnJpZGUgLS0+XCI7XG4gICAgICAgICAgICAgIGlmICgkdGhpcy5kYXRhKFwidmFsaWRhdGlvbk1heGxlbmd0aE1lc3NhZ2VcIikpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJHRoaXMuZGF0YShcInZhbGlkYXRpb25NYXhsZW5ndGhNZXNzYWdlXCIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uTWF4bGVuZ3RoTWVzc2FnZVwiLCBtZXNzYWdlKTtcbiAgICAgICAgICAgICAgJHRoaXMuZGF0YShcInZhbGlkYXRpb25NYXhsZW5ndGhNYXhsZW5ndGhcIiwgJHRoaXMuYXR0cihcIm1heGxlbmd0aFwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1JTkxFTkdUSFxuICAgICAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICBpZiAoJHRoaXMuYXR0cihcIm1pbmxlbmd0aFwiKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIG1lc3NhZ2UgPSBcIlRvbyBzaG9ydDogTWluaW11bSBvZiAnXCIgKyAkdGhpcy5hdHRyKFwibWlubGVuZ3RoXCIpICsgXCInIGNoYXJhY3RlcnM8IS0tIGRhdGEtdmFsaWRhdGlvbi1taW5sZW5ndGgtbWVzc2FnZSB0byBvdmVycmlkZSAtLT5cIjtcbiAgICAgICAgICAgICAgaWYgKCR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uTWlubGVuZ3RoTWVzc2FnZVwiKSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAkdGhpcy5kYXRhKFwidmFsaWRhdGlvbk1pbmxlbmd0aE1lc3NhZ2VcIik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgJHRoaXMuZGF0YShcInZhbGlkYXRpb25NaW5sZW5ndGhNZXNzYWdlXCIsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAkdGhpcy5kYXRhKFwidmFsaWRhdGlvbk1pbmxlbmd0aE1pbmxlbmd0aFwiLCAkdGhpcy5hdHRyKFwibWlubGVuZ3RoXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJFUVVJUkVEXG4gICAgICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIGlmICgkdGhpcy5hdHRyKFwicmVxdWlyZWRcIikgIT09IHVuZGVmaW5lZCB8fCAkdGhpcy5hdHRyKFwiYXJpYS1yZXF1aXJlZFwiKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIG1lc3NhZ2UgPSBzZXR0aW5ncy5idWlsdEluVmFsaWRhdG9ycy5yZXF1aXJlZC5tZXNzYWdlO1xuICAgICAgICAgICAgICBpZiAoJHRoaXMuZGF0YShcInZhbGlkYXRpb25SZXF1aXJlZE1lc3NhZ2VcIikpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJHRoaXMuZGF0YShcInZhbGlkYXRpb25SZXF1aXJlZE1lc3NhZ2VcIik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgJHRoaXMuZGF0YShcInZhbGlkYXRpb25SZXF1aXJlZE1lc3NhZ2VcIiwgbWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5VTUJFUlxuICAgICAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICBpZiAoJHRoaXMuYXR0cihcInR5cGVcIikgIT09IHVuZGVmaW5lZCAmJiAkdGhpcy5hdHRyKFwidHlwZVwiKS50b0xvd2VyQ2FzZSgpID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICAgIG1lc3NhZ2UgPSBzZXR0aW5ncy5idWlsdEluVmFsaWRhdG9ycy5udW1iZXIubWVzc2FnZTtcbiAgICAgICAgICAgICAgaWYgKCR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uTnVtYmVyTWVzc2FnZVwiKSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAkdGhpcy5kYXRhKFwidmFsaWRhdGlvbk51bWJlck1lc3NhZ2VcIik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgJHRoaXMuZGF0YShcInZhbGlkYXRpb25OdW1iZXJNZXNzYWdlXCIsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRU1BSUxcbiAgICAgICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgaWYgKCR0aGlzLmF0dHIoXCJ0eXBlXCIpICE9PSB1bmRlZmluZWQgJiYgJHRoaXMuYXR0cihcInR5cGVcIikudG9Mb3dlckNhc2UoKSA9PT0gXCJlbWFpbFwiKSB7XG4gICAgICAgICAgICAgIG1lc3NhZ2UgPSBcIk5vdCBhIHZhbGlkIGVtYWlsIGFkZHJlc3M8IS0tIGRhdGEtdmFsaWRhdG9yLXZhbGlkZW1haWwtbWVzc2FnZSB0byBvdmVycmlkZSAtLT5cIjtcbiAgICAgICAgICAgICAgaWYgKCR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uVmFsaWRlbWFpbE1lc3NhZ2VcIikpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJHRoaXMuZGF0YShcInZhbGlkYXRpb25WYWxpZGVtYWlsTWVzc2FnZVwiKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICgkdGhpcy5kYXRhKFwidmFsaWRhdGlvbkVtYWlsTWVzc2FnZVwiKSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAkdGhpcy5kYXRhKFwidmFsaWRhdGlvbkVtYWlsTWVzc2FnZVwiKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAkdGhpcy5kYXRhKFwidmFsaWRhdGlvblZhbGlkZW1haWxNZXNzYWdlXCIsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1JTkNIRUNLRURcbiAgICAgICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgaWYgKCR0aGlzLmF0dHIoXCJtaW5jaGVja2VkXCIpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiTm90IGVub3VnaCBvcHRpb25zIGNoZWNrZWQ7IE1pbmltdW0gb2YgJ1wiICsgJHRoaXMuYXR0cihcIm1pbmNoZWNrZWRcIikgKyBcIicgcmVxdWlyZWQ8IS0tIGRhdGEtdmFsaWRhdGlvbi1taW5jaGVja2VkLW1lc3NhZ2UgdG8gb3ZlcnJpZGUgLS0+XCI7XG4gICAgICAgICAgICAgIGlmICgkdGhpcy5kYXRhKFwidmFsaWRhdGlvbk1pbmNoZWNrZWRNZXNzYWdlXCIpKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uTWluY2hlY2tlZE1lc3NhZ2VcIik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgJHRoaXMuZGF0YShcInZhbGlkYXRpb25NaW5jaGVja2VkTWVzc2FnZVwiLCBtZXNzYWdlKTtcbiAgICAgICAgICAgICAgJHRoaXMuZGF0YShcInZhbGlkYXRpb25NaW5jaGVja2VkTWluY2hlY2tlZFwiLCAkdGhpcy5hdHRyKFwibWluY2hlY2tlZFwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTUFYQ0hFQ0tFRFxuICAgICAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICBpZiAoJHRoaXMuYXR0cihcIm1heGNoZWNrZWRcIikgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBtZXNzYWdlID0gXCJUb28gbWFueSBvcHRpb25zIGNoZWNrZWQ7IE1heGltdW0gb2YgJ1wiICsgJHRoaXMuYXR0cihcIm1heGNoZWNrZWRcIikgKyBcIicgcmVxdWlyZWQ8IS0tIGRhdGEtdmFsaWRhdGlvbi1tYXhjaGVja2VkLW1lc3NhZ2UgdG8gb3ZlcnJpZGUgLS0+XCI7XG4gICAgICAgICAgICAgIGlmICgkdGhpcy5kYXRhKFwidmFsaWRhdGlvbk1heGNoZWNrZWRNZXNzYWdlXCIpKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uTWF4Y2hlY2tlZE1lc3NhZ2VcIik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgJHRoaXMuZGF0YShcInZhbGlkYXRpb25NYXhjaGVja2VkTWVzc2FnZVwiLCBtZXNzYWdlKTtcbiAgICAgICAgICAgICAgJHRoaXMuZGF0YShcInZhbGlkYXRpb25NYXhjaGVja2VkTWF4Y2hlY2tlZFwiLCAkdGhpcy5hdHRyKFwibWF4Y2hlY2tlZFwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ09MTEVDVCBWQUxJREFUT1IgTkFNRVNcbiAgICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAgICAgICAvLyBHZXQgbmFtZWQgdmFsaWRhdG9yc1xuICAgICAgICAgIGlmICgkdGhpcy5kYXRhKFwidmFsaWRhdGlvblwiKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YWxpZGF0b3JOYW1lcyA9ICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uXCIpLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBHZXQgZXh0cmEgb25lcyBkZWZpbmVkIG9uIHRoZSBlbGVtZW50J3MgZGF0YSBhdHRyaWJ1dGVzXG4gICAgICAgICAgJC5lYWNoKCR0aGlzLmRhdGEoKSwgZnVuY3Rpb24gKGksIGVsKSB7XG4gICAgICAgICAgICB2YXIgcGFydHMgPSBpLnJlcGxhY2UoLyhbQS1aXSkvZywgXCIsJDFcIikuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgaWYgKHBhcnRzWzBdID09PSBcInZhbGlkYXRpb25cIiAmJiBwYXJ0c1sxXSkge1xuICAgICAgICAgICAgICB2YWxpZGF0b3JOYW1lcy5wdXNoKHBhcnRzWzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOT1JNQUxJU0UgVkFMSURBVE9SIE5BTUVTXG4gICAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgICAgICAgdmFyIHZhbGlkYXRvck5hbWVzVG9JbnNwZWN0ID0gdmFsaWRhdG9yTmFtZXM7XG4gICAgICAgICAgdmFyIG5ld1ZhbGlkYXRvck5hbWVzVG9JbnNwZWN0ID0gW107XG5cbiAgICAgICAgICBkbyAvLyByZXBlYXRlZGx5IGV4cGFuZCAnc2hvcnRjdXQnIHZhbGlkYXRvcnMgaW50byB0aGVpciByZWFsIHZhbGlkYXRvcnNcbiAgICAgICAgICB7XG4gICAgICAgICAgICAvLyBVcHBlcmNhc2Ugb25seSB0aGUgZmlyc3QgbGV0dGVyIG9mIGVhY2ggbmFtZVxuICAgICAgICAgICAgJC5lYWNoKHZhbGlkYXRvck5hbWVzLCBmdW5jdGlvbiAoaSwgZWwpIHtcbiAgICAgICAgICAgICAgdmFsaWRhdG9yTmFtZXNbaV0gPSBmb3JtYXRWYWxpZGF0b3JOYW1lKGVsKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBSZW1vdmUgZHVwbGljYXRlIHZhbGlkYXRvciBuYW1lc1xuICAgICAgICAgICAgdmFsaWRhdG9yTmFtZXMgPSAkLnVuaXF1ZSh2YWxpZGF0b3JOYW1lcyk7XG5cbiAgICAgICAgICAgIC8vIFB1bGwgb3V0IHRoZSBuZXcgdmFsaWRhdG9yIG5hbWVzIGZyb20gZWFjaCBzaG9ydGN1dFxuICAgICAgICAgICAgbmV3VmFsaWRhdG9yTmFtZXNUb0luc3BlY3QgPSBbXTtcbiAgICAgICAgICAgICQuZWFjaCh2YWxpZGF0b3JOYW1lc1RvSW5zcGVjdCwgZnVuY3Rpb24gKGksIGVsKSB7XG4gICAgICAgICAgICAgIGlmICgkdGhpcy5kYXRhKFwidmFsaWRhdGlvblwiICsgZWwgKyBcIlNob3J0Y3V0XCIpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBBcmUgdGhlc2UgY3VzdG9tIHZhbGlkYXRvcnM/XG4gICAgICAgICAgICAgICAgLy8gUHVsbCB0aGVtIG91dCFcbiAgICAgICAgICAgICAgICAkLmVhY2goJHRoaXMuZGF0YShcInZhbGlkYXRpb25cIiArIGVsICsgXCJTaG9ydGN1dFwiKS5zcGxpdChcIixcIiksIGZ1bmN0aW9uIChpMiwgZWwyKSB7XG4gICAgICAgICAgICAgICAgICBuZXdWYWxpZGF0b3JOYW1lc1RvSW5zcGVjdC5wdXNoKGVsMik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2V0dGluZ3MuYnVpbHRJblZhbGlkYXRvcnNbZWwudG9Mb3dlckNhc2UoKV0pIHtcbiAgICAgICAgICAgICAgICAvLyBJcyB0aGlzIGEgcmVjb2duaXNlZCBidWlsdC1pbj9cbiAgICAgICAgICAgICAgICAvLyBQdWxsIGl0IG91dCFcbiAgICAgICAgICAgICAgICB2YXIgdmFsaWRhdG9yID0gc2V0dGluZ3MuYnVpbHRJblZhbGlkYXRvcnNbZWwudG9Mb3dlckNhc2UoKV07XG4gICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRvci50eXBlLnRvTG93ZXJDYXNlKCkgPT09IFwic2hvcnRjdXRcIikge1xuICAgICAgICAgICAgICAgICAgJC5lYWNoKHZhbGlkYXRvci5zaG9ydGN1dC5zcGxpdChcIixcIiksIGZ1bmN0aW9uIChpLCBlbCkge1xuICAgICAgICAgICAgICAgICAgICBlbCA9IGZvcm1hdFZhbGlkYXRvck5hbWUoZWwpO1xuICAgICAgICAgICAgICAgICAgICBuZXdWYWxpZGF0b3JOYW1lc1RvSW5zcGVjdC5wdXNoKGVsKTtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yTmFtZXMucHVzaChlbCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YWxpZGF0b3JOYW1lc1RvSW5zcGVjdCA9IG5ld1ZhbGlkYXRvck5hbWVzVG9JbnNwZWN0O1xuICAgICAgICAgIH0gd2hpbGUgKHZhbGlkYXRvck5hbWVzVG9JbnNwZWN0Lmxlbmd0aCA+IDApO1xuXG4gICAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU0VUIFVQIFZBTElEQVRPUiBBUlJBWVNcbiAgICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAgICAgICB2YXIgdmFsaWRhdG9ycyA9IHt9O1xuXG4gICAgICAgICAgJC5lYWNoKHZhbGlkYXRvck5hbWVzLCBmdW5jdGlvbiAoaSwgZWwpIHtcbiAgICAgICAgICAgIC8vIFNldCB1cCB0aGUgJ292ZXJyaWRlJyBtZXNzYWdlXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9ICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uXCIgKyBlbCArIFwiTWVzc2FnZVwiKTtcbiAgICAgICAgICAgIHZhciBoYXNPdmVycmlkZU1lc3NhZ2UgPSBtZXNzYWdlICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB2YXIgZm91bmRWYWxpZGF0b3IgPSBmYWxzZTtcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBtZXNzYWdlID8gbWVzc2FnZSA6IFwiJ1wiICsgZWwgKyBcIicgdmFsaWRhdGlvbiBmYWlsZWQgPCEtLSBBZGQgYXR0cmlidXRlICdkYXRhLXZhbGlkYXRpb24tXCIgKyBlbC50b0xvd2VyQ2FzZSgpICsgXCItbWVzc2FnZScgdG8gaW5wdXQgdG8gY2hhbmdlIHRoaXMgbWVzc2FnZSAtLT5cIjtcblxuICAgICAgICAgICAgJC5lYWNoKHNldHRpbmdzLnZhbGlkYXRvclR5cGVzLCBmdW5jdGlvbiAodmFsaWRhdG9yVHlwZSwgdmFsaWRhdG9yVGVtcGxhdGUpIHtcbiAgICAgICAgICAgICAgaWYgKHZhbGlkYXRvcnNbdmFsaWRhdG9yVHlwZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRvcnNbdmFsaWRhdG9yVHlwZV0gPSBbXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIWZvdW5kVmFsaWRhdG9yICYmICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uXCIgKyBlbCArIGZvcm1hdFZhbGlkYXRvck5hbWUodmFsaWRhdG9yVGVtcGxhdGUubmFtZSkpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3JzW3ZhbGlkYXRvclR5cGVdLnB1c2goJC5leHRlbmQodHJ1ZSwge1xuICAgICAgICAgICAgICAgICAgbmFtZTogZm9ybWF0VmFsaWRhdG9yTmFtZSh2YWxpZGF0b3JUZW1wbGF0ZS5uYW1lKSxcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgICAgICAgICAgICB9LCB2YWxpZGF0b3JUZW1wbGF0ZS5pbml0KCR0aGlzLCBlbCkpKTtcbiAgICAgICAgICAgICAgICBmb3VuZFZhbGlkYXRvciA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIWZvdW5kVmFsaWRhdG9yICYmIHNldHRpbmdzLmJ1aWx0SW5WYWxpZGF0b3JzW2VsLnRvTG93ZXJDYXNlKCldKSB7XG5cbiAgICAgICAgICAgICAgdmFyIHZhbGlkYXRvciA9ICQuZXh0ZW5kKHRydWUsIHt9LCBzZXR0aW5ncy5idWlsdEluVmFsaWRhdG9yc1tlbC50b0xvd2VyQ2FzZSgpXSk7XG4gICAgICAgICAgICAgIGlmIChoYXNPdmVycmlkZU1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3IubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyIHZhbGlkYXRvclR5cGUgPSB2YWxpZGF0b3IudHlwZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICAgIGlmICh2YWxpZGF0b3JUeXBlID09PSBcInNob3J0Y3V0XCIpIHtcbiAgICAgICAgICAgICAgICBmb3VuZFZhbGlkYXRvciA9IHRydWU7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJC5lYWNoKHNldHRpbmdzLnZhbGlkYXRvclR5cGVzLCBmdW5jdGlvbiAodmFsaWRhdG9yVGVtcGxhdGVUeXBlLCB2YWxpZGF0b3JUZW1wbGF0ZSkge1xuICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRvcnNbdmFsaWRhdG9yVGVtcGxhdGVUeXBlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnNbdmFsaWRhdG9yVGVtcGxhdGVUeXBlXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWYgKCFmb3VuZFZhbGlkYXRvciAmJiB2YWxpZGF0b3JUeXBlID09PSB2YWxpZGF0b3JUZW1wbGF0ZVR5cGUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgICAgICAkdGhpcy5kYXRhKFwidmFsaWRhdGlvblwiICsgZWwgKyBmb3JtYXRWYWxpZGF0b3JOYW1lKHZhbGlkYXRvclRlbXBsYXRlLm5hbWUpLCB2YWxpZGF0b3JbdmFsaWRhdG9yVGVtcGxhdGUubmFtZS50b0xvd2VyQ2FzZSgpXSk7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnNbdmFsaWRhdG9yVHlwZV0ucHVzaCgkLmV4dGVuZCh2YWxpZGF0b3IsIHZhbGlkYXRvclRlbXBsYXRlLmluaXQoJHRoaXMsIGVsKSkpO1xuICAgICAgICAgICAgICAgICAgICBmb3VuZFZhbGlkYXRvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFmb3VuZFZhbGlkYXRvcikge1xuICAgICAgICAgICAgICAkLmVycm9yKFwiQ2Fubm90IGZpbmQgdmFsaWRhdGlvbiBpbmZvIGZvciAnXCIgKyBlbCArIFwiJ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU1RPUkUgRkFMTEJBQ0sgVkFMVUVTXG4gICAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgICAgICAgJGhlbHBCbG9jay5kYXRhKFwib3JpZ2luYWwtY29udGVudHNcIiwgJGhlbHBCbG9jay5kYXRhKFwib3JpZ2luYWwtY29udGVudHNcIikgPyAkaGVscEJsb2NrLmRhdGEoXCJvcmlnaW5hbC1jb250ZW50c1wiKSA6ICRoZWxwQmxvY2suaHRtbCgpKTtcblxuICAgICAgICAgICRoZWxwQmxvY2suZGF0YShcIm9yaWdpbmFsLXJvbGVcIiwgJGhlbHBCbG9jay5kYXRhKFwib3JpZ2luYWwtcm9sZVwiKSA/ICRoZWxwQmxvY2suZGF0YShcIm9yaWdpbmFsLXJvbGVcIikgOiAkaGVscEJsb2NrLmF0dHIoXCJyb2xlXCIpKTtcblxuICAgICAgICAgICRjb250cm9sR3JvdXAuZGF0YShcIm9yaWdpbmFsLWNsYXNzZXNcIiwgJGNvbnRyb2xHcm91cC5kYXRhKFwib3JpZ2luYWwtY2xhc2VzXCIpID8gJGNvbnRyb2xHcm91cC5kYXRhKFwib3JpZ2luYWwtY2xhc3Nlc1wiKSA6ICRjb250cm9sR3JvdXAuYXR0cihcImNsYXNzXCIpKTtcblxuICAgICAgICAgICR0aGlzLmRhdGEoXCJvcmlnaW5hbC1hcmlhLWludmFsaWRcIiwgJHRoaXMuZGF0YShcIm9yaWdpbmFsLWFyaWEtaW52YWxpZFwiKSA/ICR0aGlzLmRhdGEoXCJvcmlnaW5hbC1hcmlhLWludmFsaWRcIikgOiAkdGhpcy5hdHRyKFwiYXJpYS1pbnZhbGlkXCIpKTtcblxuICAgICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWQUxJREFUSU9OXG4gICAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgICAgICAgJHRoaXMuYmluZChcInZhbGlkYXRpb24udmFsaWRhdGlvblwiLCBmdW5jdGlvbiAoZXZlbnQsIHBhcmFtcykge1xuXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBnZXRWYWx1ZSgkdGhpcyk7XG5cbiAgICAgICAgICAgIC8vIEdldCBhIGxpc3Qgb2YgdGhlIGVycm9ycyB0byBhcHBseVxuICAgICAgICAgICAgdmFyIGVycm9yc0ZvdW5kID0gW107XG5cbiAgICAgICAgICAgICQuZWFjaCh2YWxpZGF0b3JzLCBmdW5jdGlvbiAodmFsaWRhdG9yVHlwZSwgdmFsaWRhdG9yVHlwZUFycmF5KSB7XG4gICAgICAgICAgICAgIGlmICh2YWx1ZSB8fCB2YWx1ZS5sZW5ndGggfHwgcGFyYW1zICYmIHBhcmFtcy5pbmNsdWRlRW1wdHkgfHwgISFzZXR0aW5ncy52YWxpZGF0b3JUeXBlc1t2YWxpZGF0b3JUeXBlXS5ibG9ja1N1Ym1pdCAmJiBwYXJhbXMgJiYgISFwYXJhbXMuc3VibWl0dGluZykge1xuICAgICAgICAgICAgICAgICQuZWFjaCh2YWxpZGF0b3JUeXBlQXJyYXksIGZ1bmN0aW9uIChpLCB2YWxpZGF0b3IpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy52YWxpZGF0b3JUeXBlc1t2YWxpZGF0b3JUeXBlXS52YWxpZGF0ZSgkdGhpcywgdmFsdWUsIHZhbGlkYXRvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JzRm91bmQucHVzaCh2YWxpZGF0b3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZXJyb3JzRm91bmQ7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkdGhpcy5iaW5kKFwiZ2V0VmFsaWRhdG9ycy52YWxpZGF0aW9uXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWxpZGF0b3JzO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgV0FUQ0ggRk9SIENIQU5HRVNcbiAgICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgJHRoaXMuYmluZChcInN1Ym1pdC52YWxpZGF0aW9uXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAkdGhpcy50cmlnZ2VySGFuZGxlcihcImNoYW5nZS52YWxpZGF0aW9uXCIsIHsgc3VibWl0dGluZzogdHJ1ZSB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAkdGhpcy5iaW5kKFtcImtleXVwXCIsIFwiZm9jdXNcIiwgXCJibHVyXCIsIFwiY2xpY2tcIiwgXCJrZXlkb3duXCIsIFwia2V5cHJlc3NcIiwgXCJjaGFuZ2VcIl0uam9pbihcIi52YWxpZGF0aW9uIFwiKSArIFwiLnZhbGlkYXRpb25cIiwgZnVuY3Rpb24gKGUsIHBhcmFtcykge1xuXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBnZXRWYWx1ZSgkdGhpcyk7XG5cbiAgICAgICAgICAgIHZhciBlcnJvcnNGb3VuZCA9IFtdO1xuXG4gICAgICAgICAgICAkY29udHJvbEdyb3VwLmZpbmQoXCJpbnB1dCx0ZXh0YXJlYSxzZWxlY3RcIikuZWFjaChmdW5jdGlvbiAoaSwgZWwpIHtcbiAgICAgICAgICAgICAgdmFyIG9sZENvdW50ID0gZXJyb3JzRm91bmQubGVuZ3RoO1xuICAgICAgICAgICAgICAkLmVhY2goJChlbCkudHJpZ2dlckhhbmRsZXIoXCJ2YWxpZGF0aW9uLnZhbGlkYXRpb25cIiwgcGFyYW1zKSwgZnVuY3Rpb24gKGosIG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICBlcnJvcnNGb3VuZC5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgaWYgKGVycm9yc0ZvdW5kLmxlbmd0aCA+IG9sZENvdW50KSB7XG4gICAgICAgICAgICAgICAgJChlbCkuYXR0cihcImFyaWEtaW52YWxpZFwiLCBcInRydWVcIik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsID0gJHRoaXMuZGF0YShcIm9yaWdpbmFsLWFyaWEtaW52YWxpZFwiKTtcbiAgICAgICAgICAgICAgICAkKGVsKS5hdHRyKFwiYXJpYS1pbnZhbGlkXCIsIG9yaWdpbmFsICE9PSB1bmRlZmluZWQgPyBvcmlnaW5hbCA6IGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRmb3JtLmZpbmQoXCJpbnB1dCxzZWxlY3QsdGV4dGFyZWFcIikubm90KCR0aGlzKS5ub3QoXCJbbmFtZT1cXFwiXCIgKyAkdGhpcy5hdHRyKFwibmFtZVwiKSArIFwiXFxcIl1cIikudHJpZ2dlcihcInZhbGlkYXRpb25Mb3N0Rm9jdXMudmFsaWRhdGlvblwiKTtcblxuICAgICAgICAgICAgZXJyb3JzRm91bmQgPSAkLnVuaXF1ZShlcnJvcnNGb3VuZC5zb3J0KCkpO1xuXG4gICAgICAgICAgICAvLyBXZXJlIHRoZXJlIGFueSBlcnJvcnM/XG4gICAgICAgICAgICBpZiAoZXJyb3JzRm91bmQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIC8vIEJldHRlciBmbGFnIGl0IHVwIGFzIGEgd2FybmluZy5cbiAgICAgICAgICAgICAgJGNvbnRyb2xHcm91cC5yZW1vdmVDbGFzcyhcInN1Y2Nlc3MgZXJyb3JcIikuYWRkQ2xhc3MoXCJ3YXJuaW5nXCIpO1xuXG4gICAgICAgICAgICAgIC8vIEhvdyBtYW55IGVycm9ycyBkaWQgd2UgZmluZD9cbiAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLm9wdGlvbnMuc2VtYW50aWNhbGx5U3RyaWN0ICYmIGVycm9yc0ZvdW5kLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIC8vIE9ubHkgb25lPyBCZWluZyBzdHJpY3Q/IEp1c3Qgb3V0cHV0IGl0LlxuICAgICAgICAgICAgICAgICRoZWxwQmxvY2suaHRtbChlcnJvcnNGb3VuZFswXSArIChzZXR0aW5ncy5vcHRpb25zLnByZXBlbmRFeGlzdGluZ0hlbHBCbG9jayA/ICRoZWxwQmxvY2suZGF0YShcIm9yaWdpbmFsLWNvbnRlbnRzXCIpIDogXCJcIikpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE11bHRpcGxlPyBCZWluZyBzbG9wcHk/IEdsdWUgdGhlbSB0b2dldGhlciBpbnRvIGFuIFVMLlxuICAgICAgICAgICAgICAgICRoZWxwQmxvY2suaHRtbChcIjx1bCByb2xlPVxcXCJhbGVydFxcXCI+PGxpPlwiICsgZXJyb3JzRm91bmQuam9pbihcIjwvbGk+PGxpPlwiKSArIFwiPC9saT48L3VsPlwiICsgKHNldHRpbmdzLm9wdGlvbnMucHJlcGVuZEV4aXN0aW5nSGVscEJsb2NrID8gJGhlbHBCbG9jay5kYXRhKFwib3JpZ2luYWwtY29udGVudHNcIikgOiBcIlwiKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICRjb250cm9sR3JvdXAucmVtb3ZlQ2xhc3MoXCJ3YXJuaW5nIGVycm9yIHN1Y2Nlc3NcIik7XG4gICAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgJGNvbnRyb2xHcm91cC5hZGRDbGFzcyhcInN1Y2Nlc3NcIik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgJGhlbHBCbG9jay5odG1sKCRoZWxwQmxvY2suZGF0YShcIm9yaWdpbmFsLWNvbnRlbnRzXCIpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGUudHlwZSA9PT0gXCJibHVyXCIpIHtcbiAgICAgICAgICAgICAgJGNvbnRyb2xHcm91cC5yZW1vdmVDbGFzcyhcInN1Y2Nlc3NcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgJHRoaXMuYmluZChcInZhbGlkYXRpb25Mb3N0Rm9jdXMudmFsaWRhdGlvblwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkY29udHJvbEdyb3VwLnJlbW92ZUNsYXNzKFwic3VjY2Vzc1wiKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgICAgICAgICRjb250cm9sR3JvdXAgPSAkdGhpcy5wYXJlbnRzKFwiLmZvcm0tZ3JvdXBcIikuZmlyc3QoKSxcbiAgICAgICAgICAgICAgJGhlbHBCbG9jayA9ICRjb250cm9sR3JvdXAuZmluZChcIi5oZWxwLWJsb2NrXCIpLmZpcnN0KCk7XG5cbiAgICAgICAgICAvLyByZW1vdmUgb3VyIGV2ZW50c1xuICAgICAgICAgICR0aGlzLnVuYmluZCgnLnZhbGlkYXRpb24nKTsgLy8gZXZlbnRzIGFyZSBuYW1lc3BhY2VkLlxuICAgICAgICAgIC8vIHJlc2V0IGhlbHAgdGV4dFxuICAgICAgICAgICRoZWxwQmxvY2suaHRtbCgkaGVscEJsb2NrLmRhdGEoXCJvcmlnaW5hbC1jb250ZW50c1wiKSk7XG4gICAgICAgICAgLy8gcmVzZXQgY2xhc3Nlc1xuICAgICAgICAgICRjb250cm9sR3JvdXAuYXR0cihcImNsYXNzXCIsICRjb250cm9sR3JvdXAuZGF0YShcIm9yaWdpbmFsLWNsYXNzZXNcIikpO1xuICAgICAgICAgIC8vIHJlc2V0IGFyaWFcbiAgICAgICAgICAkdGhpcy5hdHRyKFwiYXJpYS1pbnZhbGlkXCIsICR0aGlzLmRhdGEoXCJvcmlnaW5hbC1hcmlhLWludmFsaWRcIikpO1xuICAgICAgICAgIC8vIHJlc2V0IHJvbGVcbiAgICAgICAgICAkaGVscEJsb2NrLmF0dHIoXCJyb2xlXCIsICR0aGlzLmRhdGEoXCJvcmlnaW5hbC1yb2xlXCIpKTtcbiAgICAgICAgICAvLyByZW1vdmUgYWxsIGVsZW1lbnRzIHdlIGNyZWF0ZWRcbiAgICAgICAgICBpZiAoY3JlYXRlZEVsZW1lbnRzLmluZGV4T2YoJGhlbHBCbG9ja1swXSkgPiAtMSkge1xuICAgICAgICAgICAgJGhlbHBCbG9jay5yZW1vdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGNvbGxlY3RFcnJvcnM6IGZ1bmN0aW9uIGNvbGxlY3RFcnJvcnMoaW5jbHVkZUVtcHR5KSB7XG5cbiAgICAgICAgdmFyIGVycm9yTWVzc2FnZXMgPSB7fTtcbiAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbCkge1xuICAgICAgICAgIHZhciAkZWwgPSAkKGVsKTtcbiAgICAgICAgICB2YXIgbmFtZSA9ICRlbC5hdHRyKFwibmFtZVwiKTtcbiAgICAgICAgICB2YXIgZXJyb3JzID0gJGVsLnRyaWdnZXJIYW5kbGVyKFwidmFsaWRhdGlvbi52YWxpZGF0aW9uXCIsIHsgaW5jbHVkZUVtcHR5OiB0cnVlIH0pO1xuICAgICAgICAgIGVycm9yTWVzc2FnZXNbbmFtZV0gPSAkLmV4dGVuZCh0cnVlLCBlcnJvcnMsIGVycm9yTWVzc2FnZXNbbmFtZV0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkLmVhY2goZXJyb3JNZXNzYWdlcywgZnVuY3Rpb24gKGksIGVsKSB7XG4gICAgICAgICAgaWYgKGVsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZGVsZXRlIGVycm9yTWVzc2FnZXNbaV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZXJyb3JNZXNzYWdlcztcbiAgICAgIH0sXG4gICAgICBoYXNFcnJvcnM6IGZ1bmN0aW9uIGhhc0Vycm9ycygpIHtcblxuICAgICAgICB2YXIgZXJyb3JNZXNzYWdlcyA9IFtdO1xuXG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWwpIHtcbiAgICAgICAgICBlcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcy5jb25jYXQoJChlbCkudHJpZ2dlckhhbmRsZXIoXCJnZXRWYWxpZGF0b3JzLnZhbGlkYXRpb25cIikgPyAkKGVsKS50cmlnZ2VySGFuZGxlcihcInZhbGlkYXRpb24udmFsaWRhdGlvblwiLCB7IHN1Ym1pdHRpbmc6IHRydWUgfSkgOiBbXSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBlcnJvck1lc3NhZ2VzLmxlbmd0aCA+IDA7XG4gICAgICB9LFxuICAgICAgb3ZlcnJpZGU6IGZ1bmN0aW9uIG92ZXJyaWRlKG5ld0RlZmF1bHRzKSB7XG4gICAgICAgIGRlZmF1bHRzID0gJC5leHRlbmQodHJ1ZSwgZGVmYXVsdHMsIG5ld0RlZmF1bHRzKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHZhbGlkYXRvclR5cGVzOiB7XG4gICAgICBjYWxsYmFjazoge1xuICAgICAgICBuYW1lOiBcImNhbGxiYWNrXCIsXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoJHRoaXMsIG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsaWRhdG9yTmFtZTogbmFtZSxcbiAgICAgICAgICAgIGNhbGxiYWNrOiAkdGhpcy5kYXRhKFwidmFsaWRhdGlvblwiICsgbmFtZSArIFwiQ2FsbGJhY2tcIiksXG4gICAgICAgICAgICBsYXN0VmFsdWU6ICR0aGlzLnZhbCgpLFxuICAgICAgICAgICAgbGFzdFZhbGlkOiB0cnVlLFxuICAgICAgICAgICAgbGFzdEZpbmlzaGVkOiB0cnVlXG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uIHZhbGlkYXRlKCR0aGlzLCB2YWx1ZSwgdmFsaWRhdG9yKSB7XG4gICAgICAgICAgaWYgKHZhbGlkYXRvci5sYXN0VmFsdWUgPT09IHZhbHVlICYmIHZhbGlkYXRvci5sYXN0RmluaXNoZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAhdmFsaWRhdG9yLmxhc3RWYWxpZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodmFsaWRhdG9yLmxhc3RGaW5pc2hlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdmFsaWRhdG9yLmxhc3RWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgdmFsaWRhdG9yLmxhc3RWYWxpZCA9IHRydWU7XG4gICAgICAgICAgICB2YWxpZGF0b3IubGFzdEZpbmlzaGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHZhciBycmpxYnZWYWxpZGF0b3IgPSB2YWxpZGF0b3I7XG4gICAgICAgICAgICB2YXIgcnJqcWJ2VGhpcyA9ICR0aGlzO1xuICAgICAgICAgICAgZXhlY3V0ZUZ1bmN0aW9uQnlOYW1lKHZhbGlkYXRvci5jYWxsYmFjaywgd2luZG93LCAkdGhpcywgdmFsdWUsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgIGlmIChycmpxYnZWYWxpZGF0b3IubGFzdFZhbHVlID09PSBkYXRhLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcnJqcWJ2VmFsaWRhdG9yLmxhc3RWYWxpZCA9IGRhdGEudmFsaWQ7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgcnJqcWJ2VmFsaWRhdG9yLm1lc3NhZ2UgPSBkYXRhLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJyanFidlZhbGlkYXRvci5sYXN0RmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJyanFidlRoaXMuZGF0YShcInZhbGlkYXRpb25cIiArIHJyanFidlZhbGlkYXRvci52YWxpZGF0b3JOYW1lICsgXCJNZXNzYWdlXCIsIHJyanFidlZhbGlkYXRvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAvLyBUaW1lb3V0IGlzIHNldCB0byBhdm9pZCBwcm9ibGVtcyB3aXRoIHRoZSBldmVudHMgYmVpbmcgY29uc2lkZXJlZCAnYWxyZWFkeSBmaXJlZCdcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHJyanFidlRoaXMudHJpZ2dlcihcImNoYW5nZS52YWxpZGF0aW9uXCIpO1xuICAgICAgICAgICAgICAgIH0sIDEpOyAvLyBkb2Vzbid0IG5lZWQgYSBsb25nIHRpbWVvdXQsIGp1c3QgbG9uZyBlbm91Z2ggZm9yIHRoZSBldmVudCBidWJibGUgdG8gYnVyc3RcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYWpheDoge1xuICAgICAgICBuYW1lOiBcImFqYXhcIixcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgkdGhpcywgbmFtZSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWxpZGF0b3JOYW1lOiBuYW1lLFxuICAgICAgICAgICAgdXJsOiAkdGhpcy5kYXRhKFwidmFsaWRhdGlvblwiICsgbmFtZSArIFwiQWpheFwiKSxcbiAgICAgICAgICAgIGxhc3RWYWx1ZTogJHRoaXMudmFsKCksXG4gICAgICAgICAgICBsYXN0VmFsaWQ6IHRydWUsXG4gICAgICAgICAgICBsYXN0RmluaXNoZWQ6IHRydWVcbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICB2YWxpZGF0ZTogZnVuY3Rpb24gdmFsaWRhdGUoJHRoaXMsIHZhbHVlLCB2YWxpZGF0b3IpIHtcbiAgICAgICAgICBpZiAoXCJcIiArIHZhbGlkYXRvci5sYXN0VmFsdWUgPT09IFwiXCIgKyB2YWx1ZSAmJiB2YWxpZGF0b3IubGFzdEZpbmlzaGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsaWRhdG9yLmxhc3RWYWxpZCA9PT0gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHZhbGlkYXRvci5sYXN0RmluaXNoZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHZhbGlkYXRvci5sYXN0VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHZhbGlkYXRvci5sYXN0VmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgdmFsaWRhdG9yLmxhc3RGaW5pc2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgdXJsOiB2YWxpZGF0b3IudXJsLFxuICAgICAgICAgICAgICBkYXRhOiBcInZhbHVlPVwiICsgdmFsdWUgKyBcIiZmaWVsZD1cIiArICR0aGlzLmF0dHIoXCJuYW1lXCIpLFxuICAgICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3MoZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChcIlwiICsgdmFsaWRhdG9yLmxhc3RWYWx1ZSA9PT0gXCJcIiArIGRhdGEudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRvci5sYXN0VmFsaWQgPSAhIWRhdGEudmFsaWQ7XG4gICAgICAgICAgICAgICAgICBpZiAoZGF0YS5tZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvci5tZXNzYWdlID0gZGF0YS5tZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yLmxhc3RGaW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAkdGhpcy5kYXRhKFwidmFsaWRhdGlvblwiICsgdmFsaWRhdG9yLnZhbGlkYXRvck5hbWUgKyBcIk1lc3NhZ2VcIiwgdmFsaWRhdG9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgLy8gVGltZW91dCBpcyBzZXQgdG8gYXZvaWQgcHJvYmxlbXMgd2l0aCB0aGUgZXZlbnRzIGJlaW5nIGNvbnNpZGVyZWQgJ2FscmVhZHkgZmlyZWQnXG4gICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMudHJpZ2dlcihcImNoYW5nZS52YWxpZGF0aW9uXCIpO1xuICAgICAgICAgICAgICAgICAgfSwgMSk7IC8vIGRvZXNuJ3QgbmVlZCBhIGxvbmcgdGltZW91dCwganVzdCBsb25nIGVub3VnaCBmb3IgdGhlIGV2ZW50IGJ1YmJsZSB0byBidXJzdFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZmFpbHVyZTogZnVuY3Rpb24gZmFpbHVyZSgpIHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3IubGFzdFZhbGlkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3IubWVzc2FnZSA9IFwiYWpheCBjYWxsIGZhaWxlZFwiO1xuICAgICAgICAgICAgICAgIHZhbGlkYXRvci5sYXN0RmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uXCIgKyB2YWxpZGF0b3IudmFsaWRhdG9yTmFtZSArIFwiTWVzc2FnZVwiLCB2YWxpZGF0b3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgLy8gVGltZW91dCBpcyBzZXQgdG8gYXZvaWQgcHJvYmxlbXMgd2l0aCB0aGUgZXZlbnRzIGJlaW5nIGNvbnNpZGVyZWQgJ2FscmVhZHkgZmlyZWQnXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAkdGhpcy50cmlnZ2VyKFwiY2hhbmdlLnZhbGlkYXRpb25cIik7XG4gICAgICAgICAgICAgICAgfSwgMSk7IC8vIGRvZXNuJ3QgbmVlZCBhIGxvbmcgdGltZW91dCwganVzdCBsb25nIGVub3VnaCBmb3IgdGhlIGV2ZW50IGJ1YmJsZSB0byBidXJzdFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICByZWdleDoge1xuICAgICAgICBuYW1lOiBcInJlZ2V4XCIsXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoJHRoaXMsIG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4geyByZWdleDogcmVnZXhGcm9tU3RyaW5nKCR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uXCIgKyBuYW1lICsgXCJSZWdleFwiKSkgfTtcbiAgICAgICAgfSxcbiAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uIHZhbGlkYXRlKCR0aGlzLCB2YWx1ZSwgdmFsaWRhdG9yKSB7XG4gICAgICAgICAgcmV0dXJuICF2YWxpZGF0b3IucmVnZXgudGVzdCh2YWx1ZSkgJiYgIXZhbGlkYXRvci5uZWdhdGl2ZSB8fCB2YWxpZGF0b3IucmVnZXgudGVzdCh2YWx1ZSkgJiYgdmFsaWRhdG9yLm5lZ2F0aXZlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IHtcbiAgICAgICAgbmFtZTogXCJyZXF1aXJlZFwiLFxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCR0aGlzLCBuYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9LFxuICAgICAgICB2YWxpZGF0ZTogZnVuY3Rpb24gdmFsaWRhdGUoJHRoaXMsIHZhbHVlLCB2YWxpZGF0b3IpIHtcbiAgICAgICAgICByZXR1cm4gISEodmFsdWUubGVuZ3RoID09PSAwICYmICF2YWxpZGF0b3IubmVnYXRpdmUpIHx8ICEhKHZhbHVlLmxlbmd0aCA+IDAgJiYgdmFsaWRhdG9yLm5lZ2F0aXZlKTtcbiAgICAgICAgfSxcbiAgICAgICAgYmxvY2tTdWJtaXQ6IHRydWVcbiAgICAgIH0sXG4gICAgICBtYXRjaDoge1xuICAgICAgICBuYW1lOiBcIm1hdGNoXCIsXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoJHRoaXMsIG5hbWUpIHtcbiAgICAgICAgICB2YXIgZWxlbWVudCA9ICR0aGlzLnBhcmVudHMoXCJmb3JtXCIpLmZpcnN0KCkuZmluZChcIltuYW1lPVxcXCJcIiArICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uXCIgKyBuYW1lICsgXCJNYXRjaFwiKSArIFwiXFxcIl1cIikuZmlyc3QoKTtcbiAgICAgICAgICBlbGVtZW50LmJpbmQoXCJ2YWxpZGF0aW9uLnZhbGlkYXRpb25cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJHRoaXMudHJpZ2dlcihcImNoYW5nZS52YWxpZGF0aW9uXCIsIHsgc3VibWl0dGluZzogdHJ1ZSB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4geyBcImVsZW1lbnRcIjogZWxlbWVudCB9O1xuICAgICAgICB9LFxuICAgICAgICB2YWxpZGF0ZTogZnVuY3Rpb24gdmFsaWRhdGUoJHRoaXMsIHZhbHVlLCB2YWxpZGF0b3IpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWUgIT09IHZhbGlkYXRvci5lbGVtZW50LnZhbCgpICYmICF2YWxpZGF0b3IubmVnYXRpdmUgfHwgdmFsdWUgPT09IHZhbGlkYXRvci5lbGVtZW50LnZhbCgpICYmIHZhbGlkYXRvci5uZWdhdGl2ZTtcbiAgICAgICAgfSxcbiAgICAgICAgYmxvY2tTdWJtaXQ6IHRydWVcbiAgICAgIH0sXG4gICAgICBtYXg6IHtcbiAgICAgICAgbmFtZTogXCJtYXhcIixcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgkdGhpcywgbmFtZSkge1xuICAgICAgICAgIHJldHVybiB7IG1heDogJHRoaXMuZGF0YShcInZhbGlkYXRpb25cIiArIG5hbWUgKyBcIk1heFwiKSB9O1xuICAgICAgICB9LFxuICAgICAgICB2YWxpZGF0ZTogZnVuY3Rpb24gdmFsaWRhdGUoJHRoaXMsIHZhbHVlLCB2YWxpZGF0b3IpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSwgMTApID4gcGFyc2VGbG9hdCh2YWxpZGF0b3IubWF4LCAxMCkgJiYgIXZhbGlkYXRvci5uZWdhdGl2ZSB8fCBwYXJzZUZsb2F0KHZhbHVlLCAxMCkgPD0gcGFyc2VGbG9hdCh2YWxpZGF0b3IubWF4LCAxMCkgJiYgdmFsaWRhdG9yLm5lZ2F0aXZlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWluOiB7XG4gICAgICAgIG5hbWU6IFwibWluXCIsXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoJHRoaXMsIG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4geyBtaW46ICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uXCIgKyBuYW1lICsgXCJNaW5cIikgfTtcbiAgICAgICAgfSxcbiAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uIHZhbGlkYXRlKCR0aGlzLCB2YWx1ZSwgdmFsaWRhdG9yKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpIDwgcGFyc2VGbG9hdCh2YWxpZGF0b3IubWluKSAmJiAhdmFsaWRhdG9yLm5lZ2F0aXZlIHx8IHBhcnNlRmxvYXQodmFsdWUpID49IHBhcnNlRmxvYXQodmFsaWRhdG9yLm1pbikgJiYgdmFsaWRhdG9yLm5lZ2F0aXZlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWF4bGVuZ3RoOiB7XG4gICAgICAgIG5hbWU6IFwibWF4bGVuZ3RoXCIsXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoJHRoaXMsIG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4geyBtYXhsZW5ndGg6ICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uXCIgKyBuYW1lICsgXCJNYXhsZW5ndGhcIikgfTtcbiAgICAgICAgfSxcbiAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uIHZhbGlkYXRlKCR0aGlzLCB2YWx1ZSwgdmFsaWRhdG9yKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA+IHZhbGlkYXRvci5tYXhsZW5ndGggJiYgIXZhbGlkYXRvci5uZWdhdGl2ZSB8fCB2YWx1ZS5sZW5ndGggPD0gdmFsaWRhdG9yLm1heGxlbmd0aCAmJiB2YWxpZGF0b3IubmVnYXRpdmU7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtaW5sZW5ndGg6IHtcbiAgICAgICAgbmFtZTogXCJtaW5sZW5ndGhcIixcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgkdGhpcywgbmFtZSkge1xuICAgICAgICAgIHJldHVybiB7IG1pbmxlbmd0aDogJHRoaXMuZGF0YShcInZhbGlkYXRpb25cIiArIG5hbWUgKyBcIk1pbmxlbmd0aFwiKSB9O1xuICAgICAgICB9LFxuICAgICAgICB2YWxpZGF0ZTogZnVuY3Rpb24gdmFsaWRhdGUoJHRoaXMsIHZhbHVlLCB2YWxpZGF0b3IpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoIDwgdmFsaWRhdG9yLm1pbmxlbmd0aCAmJiAhdmFsaWRhdG9yLm5lZ2F0aXZlIHx8IHZhbHVlLmxlbmd0aCA+PSB2YWxpZGF0b3IubWlubGVuZ3RoICYmIHZhbGlkYXRvci5uZWdhdGl2ZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1heGNoZWNrZWQ6IHtcbiAgICAgICAgbmFtZTogXCJtYXhjaGVja2VkXCIsXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoJHRoaXMsIG5hbWUpIHtcbiAgICAgICAgICB2YXIgZWxlbWVudHMgPSAkdGhpcy5wYXJlbnRzKFwiZm9ybVwiKS5maXJzdCgpLmZpbmQoXCJbbmFtZT1cXFwiXCIgKyAkdGhpcy5hdHRyKFwibmFtZVwiKSArIFwiXFxcIl1cIik7XG4gICAgICAgICAgZWxlbWVudHMuYmluZChcImNsaWNrLnZhbGlkYXRpb25cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJHRoaXMudHJpZ2dlcihcImNoYW5nZS52YWxpZGF0aW9uXCIsIHsgaW5jbHVkZUVtcHR5OiB0cnVlIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiB7IG1heGNoZWNrZWQ6ICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uXCIgKyBuYW1lICsgXCJNYXhjaGVja2VkXCIpLCBlbGVtZW50czogZWxlbWVudHMgfTtcbiAgICAgICAgfSxcbiAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uIHZhbGlkYXRlKCR0aGlzLCB2YWx1ZSwgdmFsaWRhdG9yKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbGlkYXRvci5lbGVtZW50cy5maWx0ZXIoXCI6Y2hlY2tlZFwiKS5sZW5ndGggPiB2YWxpZGF0b3IubWF4Y2hlY2tlZCAmJiAhdmFsaWRhdG9yLm5lZ2F0aXZlIHx8IHZhbGlkYXRvci5lbGVtZW50cy5maWx0ZXIoXCI6Y2hlY2tlZFwiKS5sZW5ndGggPD0gdmFsaWRhdG9yLm1heGNoZWNrZWQgJiYgdmFsaWRhdG9yLm5lZ2F0aXZlO1xuICAgICAgICB9LFxuICAgICAgICBibG9ja1N1Ym1pdDogdHJ1ZVxuICAgICAgfSxcbiAgICAgIG1pbmNoZWNrZWQ6IHtcbiAgICAgICAgbmFtZTogXCJtaW5jaGVja2VkXCIsXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoJHRoaXMsIG5hbWUpIHtcbiAgICAgICAgICB2YXIgZWxlbWVudHMgPSAkdGhpcy5wYXJlbnRzKFwiZm9ybVwiKS5maXJzdCgpLmZpbmQoXCJbbmFtZT1cXFwiXCIgKyAkdGhpcy5hdHRyKFwibmFtZVwiKSArIFwiXFxcIl1cIik7XG4gICAgICAgICAgZWxlbWVudHMuYmluZChcImNsaWNrLnZhbGlkYXRpb25cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJHRoaXMudHJpZ2dlcihcImNoYW5nZS52YWxpZGF0aW9uXCIsIHsgaW5jbHVkZUVtcHR5OiB0cnVlIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiB7IG1pbmNoZWNrZWQ6ICR0aGlzLmRhdGEoXCJ2YWxpZGF0aW9uXCIgKyBuYW1lICsgXCJNaW5jaGVja2VkXCIpLCBlbGVtZW50czogZWxlbWVudHMgfTtcbiAgICAgICAgfSxcbiAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uIHZhbGlkYXRlKCR0aGlzLCB2YWx1ZSwgdmFsaWRhdG9yKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbGlkYXRvci5lbGVtZW50cy5maWx0ZXIoXCI6Y2hlY2tlZFwiKS5sZW5ndGggPCB2YWxpZGF0b3IubWluY2hlY2tlZCAmJiAhdmFsaWRhdG9yLm5lZ2F0aXZlIHx8IHZhbGlkYXRvci5lbGVtZW50cy5maWx0ZXIoXCI6Y2hlY2tlZFwiKS5sZW5ndGggPj0gdmFsaWRhdG9yLm1pbmNoZWNrZWQgJiYgdmFsaWRhdG9yLm5lZ2F0aXZlO1xuICAgICAgICB9LFxuICAgICAgICBibG9ja1N1Ym1pdDogdHJ1ZVxuICAgICAgfVxuICAgIH0sXG4gICAgYnVpbHRJblZhbGlkYXRvcnM6IHtcbiAgICAgIGVtYWlsOiB7XG4gICAgICAgIG5hbWU6IFwiRW1haWxcIixcbiAgICAgICAgdHlwZTogXCJzaG9ydGN1dFwiLFxuICAgICAgICBzaG9ydGN1dDogXCJ2YWxpZGVtYWlsXCJcbiAgICAgIH0sXG4gICAgICB2YWxpZGVtYWlsOiB7XG4gICAgICAgIG5hbWU6IFwiVmFsaWRlbWFpbFwiLFxuICAgICAgICB0eXBlOiBcInJlZ2V4XCIsXG4gICAgICAgIHJlZ2V4OiBcIltBLVphLXowLTkuXyUrLV0rQFtBLVphLXowLTkuLV0rXFxcXFxcLltBLVphLXpdezIsNH1cIixcbiAgICAgICAgbWVzc2FnZTogXCJOb3QgYSB2YWxpZCBlbWFpbCBhZGRyZXNzPCEtLSBkYXRhLXZhbGlkYXRvci12YWxpZGVtYWlsLW1lc3NhZ2UgdG8gb3ZlcnJpZGUgLS0+XCJcbiAgICAgIH0sXG4gICAgICBwYXNzd29yZGFnYWluOiB7XG4gICAgICAgIG5hbWU6IFwiUGFzc3dvcmRhZ2FpblwiLFxuICAgICAgICB0eXBlOiBcIm1hdGNoXCIsXG4gICAgICAgIG1hdGNoOiBcInBhc3N3b3JkXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiRG9lcyBub3QgbWF0Y2ggdGhlIGdpdmVuIHBhc3N3b3JkPCEtLSBkYXRhLXZhbGlkYXRvci1wYXN3b3JkYWdhaW4tbWVzc2FnZSB0byBvdmVycmlkZSAtLT5cIlxuICAgICAgfSxcbiAgICAgIHBvc2l0aXZlOiB7XG4gICAgICAgIG5hbWU6IFwiUG9zaXRpdmVcIixcbiAgICAgICAgdHlwZTogXCJzaG9ydGN1dFwiLFxuICAgICAgICBzaG9ydGN1dDogXCJudW1iZXIscG9zaXRpdmVudW1iZXJcIlxuICAgICAgfSxcbiAgICAgIG5lZ2F0aXZlOiB7XG4gICAgICAgIG5hbWU6IFwiTmVnYXRpdmVcIixcbiAgICAgICAgdHlwZTogXCJzaG9ydGN1dFwiLFxuICAgICAgICBzaG9ydGN1dDogXCJudW1iZXIsbmVnYXRpdmVudW1iZXJcIlxuICAgICAgfSxcbiAgICAgIG51bWJlcjoge1xuICAgICAgICBuYW1lOiBcIk51bWJlclwiLFxuICAgICAgICB0eXBlOiBcInJlZ2V4XCIsXG4gICAgICAgIHJlZ2V4OiBcIihbKy1dP1xcXFxcXGQrKFxcXFxcXC5cXFxcXFxkKik/KFtlRV1bKy1dP1swLTldKyk/KT9cIixcbiAgICAgICAgbWVzc2FnZTogXCJNdXN0IGJlIGEgbnVtYmVyPCEtLSBkYXRhLXZhbGlkYXRvci1udW1iZXItbWVzc2FnZSB0byBvdmVycmlkZSAtLT5cIlxuICAgICAgfSxcbiAgICAgIGludGVnZXI6IHtcbiAgICAgICAgbmFtZTogXCJJbnRlZ2VyXCIsXG4gICAgICAgIHR5cGU6IFwicmVnZXhcIixcbiAgICAgICAgcmVnZXg6IFwiWystXT9cXFxcXFxkK1wiLFxuICAgICAgICBtZXNzYWdlOiBcIk5vIGRlY2ltYWwgcGxhY2VzIGFsbG93ZWQ8IS0tIGRhdGEtdmFsaWRhdG9yLWludGVnZXItbWVzc2FnZSB0byBvdmVycmlkZSAtLT5cIlxuICAgICAgfSxcbiAgICAgIHBvc2l0aXZlbnVtYmVyOiB7XG4gICAgICAgIG5hbWU6IFwiUG9zaXRpdmVudW1iZXJcIixcbiAgICAgICAgdHlwZTogXCJtaW5cIixcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBtZXNzYWdlOiBcIk11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXI8IS0tIGRhdGEtdmFsaWRhdG9yLXBvc2l0aXZlbnVtYmVyLW1lc3NhZ2UgdG8gb3ZlcnJpZGUgLS0+XCJcbiAgICAgIH0sXG4gICAgICBuZWdhdGl2ZW51bWJlcjoge1xuICAgICAgICBuYW1lOiBcIk5lZ2F0aXZlbnVtYmVyXCIsXG4gICAgICAgIHR5cGU6IFwibWF4XCIsXG4gICAgICAgIG1heDogMCxcbiAgICAgICAgbWVzc2FnZTogXCJNdXN0IGJlIGEgbmVnYXRpdmUgbnVtYmVyPCEtLSBkYXRhLXZhbGlkYXRvci1uZWdhdGl2ZW51bWJlci1tZXNzYWdlIHRvIG92ZXJyaWRlIC0tPlwiXG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IHtcbiAgICAgICAgbmFtZTogXCJSZXF1aXJlZFwiLFxuICAgICAgICB0eXBlOiBcInJlcXVpcmVkXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiVGhpcyBpcyByZXF1aXJlZDwhLS0gZGF0YS12YWxpZGF0b3ItcmVxdWlyZWQtbWVzc2FnZSB0byBvdmVycmlkZSAtLT5cIlxuICAgICAgfSxcbiAgICAgIGNoZWNrb25lOiB7XG4gICAgICAgIG5hbWU6IFwiQ2hlY2tvbmVcIixcbiAgICAgICAgdHlwZTogXCJtaW5jaGVja2VkXCIsXG4gICAgICAgIG1pbmNoZWNrZWQ6IDEsXG4gICAgICAgIG1lc3NhZ2U6IFwiQ2hlY2sgYXQgbGVhc3Qgb25lIG9wdGlvbjwhLS0gZGF0YS12YWxpZGF0aW9uLWNoZWNrb25lLW1lc3NhZ2UgdG8gb3ZlcnJpZGUgLS0+XCJcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIGZvcm1hdFZhbGlkYXRvck5hbWUgPSBmdW5jdGlvbiBmb3JtYXRWYWxpZGF0b3JOYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyhefFxccykoW2Etel0pL2csIGZ1bmN0aW9uIChtLCBwMSwgcDIpIHtcbiAgICAgIHJldHVybiBwMSArIHAyLnRvVXBwZXJDYXNlKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgdmFyIGdldFZhbHVlID0gZnVuY3Rpb24gZ2V0VmFsdWUoJHRoaXMpIHtcbiAgICAvLyBFeHRyYWN0IHRoZSB2YWx1ZSB3ZSdyZSB0YWxraW5nIGFib3V0XG4gICAgdmFyIHZhbHVlID0gJHRoaXMudmFsKCk7XG4gICAgdmFyIHR5cGUgPSAkdGhpcy5hdHRyKFwidHlwZVwiKTtcbiAgICBpZiAodHlwZSA9PT0gXCJjaGVja2JveFwiKSB7XG4gICAgICB2YWx1ZSA9ICR0aGlzLmlzKFwiOmNoZWNrZWRcIikgPyB2YWx1ZSA6IFwiXCI7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSBcInJhZGlvXCIpIHtcbiAgICAgIHZhbHVlID0gJCgnaW5wdXRbbmFtZT1cIicgKyAkdGhpcy5hdHRyKFwibmFtZVwiKSArICdcIl06Y2hlY2tlZCcpLmxlbmd0aCA+IDAgPyB2YWx1ZSA6IFwiXCI7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICBmdW5jdGlvbiByZWdleEZyb21TdHJpbmcoaW5wdXRzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChcIl5cIiArIGlucHV0c3RyaW5nICsgXCIkXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoYW5rcyB0byBKYXNvbiBCdW50aW5nIHZpYSBTdGFja092ZXJmbG93LmNvbVxuICAgKlxuICAgKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM1OTc4OC9ob3ctdG8tZXhlY3V0ZS1hLWphdmFzY3JpcHQtZnVuY3Rpb24td2hlbi1pLWhhdmUtaXRzLW5hbWUtYXMtYS1zdHJpbmcjYW5zd2VyLTM1OTkxMFxuICAgKiBTaG9ydCBsaW5rOiBodHRwOi8vdGlueXVybC5jb20vZXhlY3V0ZUZ1bmN0aW9uQnlOYW1lXG4gICoqL1xuICBmdW5jdGlvbiBleGVjdXRlRnVuY3Rpb25CeU5hbWUoZnVuY3Rpb25OYW1lLCBjb250ZXh0IC8qLCBhcmdzKi8pIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykuc3BsaWNlKDIpO1xuICAgIHZhciBuYW1lc3BhY2VzID0gZnVuY3Rpb25OYW1lLnNwbGl0KFwiLlwiKTtcbiAgICB2YXIgZnVuYyA9IG5hbWVzcGFjZXMucG9wKCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lc3BhY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb250ZXh0ID0gY29udGV4dFtuYW1lc3BhY2VzW2ldXTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRleHRbZnVuY10uYXBwbHkodGhpcywgYXJncyk7XG4gIH1cblxuICAkLmZuLmpxQm9vdHN0cmFwVmFsaWRhdGlvbiA9IGZ1bmN0aW9uIChtZXRob2QpIHtcblxuICAgIGlmIChkZWZhdWx0cy5tZXRob2RzW21ldGhvZF0pIHtcbiAgICAgIHJldHVybiBkZWZhdWx0cy5tZXRob2RzW21ldGhvZF0uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgfSBlbHNlIGlmICgodHlwZW9mIG1ldGhvZCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG1ldGhvZCkpID09PSAnb2JqZWN0JyB8fCAhbWV0aG9kKSB7XG4gICAgICByZXR1cm4gZGVmYXVsdHMubWV0aG9kcy5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQuZXJyb3IoJ01ldGhvZCAnICsgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBvbiBqUXVlcnkuanFCb290c3RyYXBWYWxpZGF0aW9uJyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgJC5qcUJvb3RzdHJhcFZhbGlkYXRpb24gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICQoXCI6aW5wdXRcIikubm90KFwiW3R5cGU9aW1hZ2VdLFt0eXBlPXN1Ym1pdF1cIikuanFCb290c3RyYXBWYWxpZGF0aW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59KShqUXVlcnkpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc291cmNlL3NjcmlwdHMvanFCb290c3RyYXBWYWxpZGF0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBIiwic291cmNlUm9vdCI6IiJ9
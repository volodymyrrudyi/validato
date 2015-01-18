(function ( $ ) {

    var validatorFunctions = {
        minLength : function (length)
        {
            return function (value) {
                return value && value.length >= length;
            };
        },

        maxLength : function (length) {
            return function (value) {
                return value && value.length <= length;
            };
        },

        notEmpty : function () {
            return function (value) {
                return value && value.length !== 0;
            };
        },


        regex : function (expression) {
            return function (value) {
                var re = new RegExp(expression, 'g');
                return value && re.test(value);
            };
        },

        email : function (length) {
            return validatorFunctions.regex("\\S+@\\S+\\.\\S+");
        },

        alpha : function () {
            return validatorFunctions.regex('^[a-zA-Z]+$');
        },

        digits : function () {
            return function (value) {
                return !jQuery.isArray(value) && (value - parseFloat(value) + 1) >= 0;
            };
        },

        sameAs : function(input) {
            return function(value) {
                var inputValue = $(input).val();

                return value && inputValue === value;
            };
        }
    };
    $.fn.validato = function(options) {

        var settings = $.extend({
            validate : [],
            onValid: function(){},
            onInvalid: function(){},
            reset: function(){}
        }, options);

        return this.each(function(){
            var element = this;
            var issues = [];
            $(settings.validate).each(function(){
                var validatorInstance = this.length == 1?  validatorFunctions[this[0]]() : validatorFunctions[this[0]](this[1]);
                if (!validatorInstance($(element).val())){
                    issues.push(this[0]);
                }
            });

            settings.reset(element);
            if (issues.length){
                settings.onInvalid(element, issues);
            } else {
                settings.onValid(element);
            }
        });
    };

}( jQuery ));
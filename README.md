# validato
Ultra-minimalistic, high-configurable jQuery input validation plugin


Usage example
===============


```javascript
        // common.highlight and common.unhighlight are some sample functions that can add/remove 
        // error message to/from field
        $("#loginForm").submit(function(event){
            $("#loginForm\\.email").validato({
                validate: [["email"], ["notEmpty"]],
                onInvalid : function(failed, issues) { common.highlight(failed); event.preventDefault();},
                reset: function(item){common.unhighlight(item);}
            });

            $("#loginForm\\.password").validato({
                validate: [["notEmpty"]],
                onInvalid : function(failed, issues) { common.highlight(failed); event.preventDefault();},
                reset: function(item){common.unhighlight(item);}
            });
        });
        
```

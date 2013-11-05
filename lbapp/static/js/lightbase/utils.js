
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype

(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
 
  // The base Class implementation (does nothing)
  this.Class = function(){};
 
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
   
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
           
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
           
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
           
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    // Populate our constructed prototype object
    Class.prototype = prototype;
   
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;
 
    // And make this class extendable
    Class.extend = arguments.callee;
   
    return Class;
  };
})();

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

var Utils = new Object();

Utils.error = function(text){
    // Requires Gritter
    $.gritter.add({
        title: 'Erro!',
        text: text,
        sticky: false,
        time: 5000,
        class_name: 'gritter-error gritter-light'
    });
}

Utils.success = function(text){
    // Requires Gritter
    $.gritter.add({
        title: 'Sucesso!',
        text: text,
        sticky: false,
        time: 2000,
        class_name: 'gritter-success gritter-light'
    });
    // gritter-center gritter-warning gritter-info
}

Utils.type_of = function(value){
    var base_type = typeof value;
    var result = "unsupported"
    switch (base_type) {
        case "number": result = base_type; break;
        case "string": result = base_type; break;
        case "boolean": result = base_type; break;
        case "object":
            if (Number.prototype.isPrototypeOf(value)) { result = "number"; break; }
            if (String.prototype.isPrototypeOf(value)) { result = "string"; break; }
            if (Date.prototype.isPrototypeOf(value)) { result = "date"; break; }
            if (Array.prototype.isPrototypeOf(value)) { result = "array"; break; }
            if (Object.prototype.isPrototypeOf(value)) { result = "object"; break; }
    }
    return result;
};

jQuery.fn.center = function (parent) {
    if (parent) {
        parent = this.parent();
    } else {
        parent = window;
    }
    this.css({
        "position": "absolute",
        "top": ((($(parent).height() - this.outerHeight()) / 2) + $(parent).scrollTop() + "px"),
        "left": ((($(parent).width() - this.outerWidth()) / 2) + $(parent).scrollLeft() + "px")
    });
    return this;
};

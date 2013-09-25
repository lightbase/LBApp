
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

var Utils = new Object();

Utils.alert = function(text){
     var template = 
    '<div class="alert alert-danger" style="display: none; ">' +
        '<button type="button" class="close" data-dismiss="alert">' +
            '<i class="icon-remove"></i>' +
        '</button>' +
        '<span></span>' +
    '</div>', 
        dom = $(template);
    dom.css('position', 'fixed');
    dom.css('bottom', '25%');
    dom.css('right', '2%');
    dom.find('span').text(text);
    $('body').append(dom);
    dom.delay(200).fadeIn().delay(4000).fadeOut();
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


window.DTTREE = (function(window, document) {

  // Create element
  var _create = function(name, attr) {
      var el = document.createElement(name);

      if(typeof attr != 'undefined') {
          $.each( attr, function( key, value ) {
              $(el).attr(key, value);
          });
      }

      return $(el);
  };

  // We return private if its test
  if(typeof window.DTTREE_TEST != 'undefined') {
      return {
        create: _create
      }
  }

})(window, document);

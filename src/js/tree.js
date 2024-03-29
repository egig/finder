window.DTTREE = (function(window, document) {

    var EXPANDED_TOGGLER_CLASS = "fa fa-minus-square-o";
    var COLLAPSED_TOGGLER_CLASS = "fa fa-plus-square-o";
    var NODE_TOGGLER_CLASS = 'dttree-node-toggler';
    var NODES_ELEMENT = 'UL';
    var NODE_ELEMENT = 'LI';
    var NODE_CLASS = 'dttree-node';

    // render single node to node element
    // if node contains nodes, then it will
    // recursively rendered as well
    var _renderNode = function(node, parent) {

          var text = node.text;

          // @todo replace special char
          node.id = '_'+node.text.replace(" ", "_");

          if(typeof(parent) !== 'undefined') {
            node.id = parent.id+node.id;
          }

          var path = node.path;

          var a = _create('A', {href: path})
              .addClass(NODE_CLASS)
              .append('&nbsp;'+text);

          $(a).data('node', node);

          var li = _create(NODE_ELEMENT, {id: node.id});

          if($.isArray(node.nodes)) {
            var toggler = _createNodeToggler(node, node.expanded);
            toggler.data('node', node);
            li.append(toggler);
          }

          li.append(a);

          if($.isArray(node.nodes)) {
              var ul = _renderNodes(node.nodes, node);
              li.append(ul);

              if(!node.expanded) {
                $(ul).hide();
              }
          }

          node.HTMLNode = li;

          return li;
    };


    // data prototype: // var nodes = [{path: '/', text: '/'}]
    // path and text is mandatory
    var _renderNodes = function (nodes, parent){

          if(nodes.length > 0) {
              var ul =  _create(NODES_ELEMENT);
              $(ul).css('padding-left', "15px");
              $(ul).css('list-style', "none");

              for(i=0; i<nodes.length; i++) {

                if(DTTREE.options.filterNode(nodes[i])) {
                  var li = _renderNode(nodes[i], parent);
                  $(ul).append(li);
                }
              }

              return ul;
          }

          return null;
    };

    var _createNodeToggler = function(node, expanded) {
        var togglerClass = expanded ? EXPANDED_TOGGLER_CLASS
            : COLLAPSED_TOGGLER_CLASS;

        var togglerIcon = _create('I').addClass(togglerClass);

        var toggler = _create('A', {href: 'javascript:;'})
            .addClass(NODE_TOGGLER_CLASS)
            .append(togglerIcon)
            .data('node', node);

        return toggler;
    }

    var _validateNode= function(node) {
        if (typeof node.text == "undefined" ||
            typeof node.path == "undefined"
            ) {

            throw new TypeError("Node is not contain required properties");
        }

        return true;
    };

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

    // Default Options
    var _OPTIONS = {
        nodes: [{path: "/", text: "/"}],
        filterNode: function(node) {
          return true;
        },
        onBeforeExpand: false
    }

    var ret = {
        el: null,
        $el: null,
        options: _OPTIONS,

        init: function(el, options) {
            this.el = el;
            this.$el = $(el);
            this.options = $.extend(true, _OPTIONS, options);

            var root = _renderNodes(this.options.nodes);
            $(this.el).append(root);

            this.listen();
        },

        expand: function(node) {

            if($.isFunction(this.options.onBeforeExpand)) {
                this.options.onBeforeExpand(node, this);
            }

            var path = node.path

            var li =  node.HTMLNode;

            var i = $(li).children('.'+NODE_TOGGLER_CLASS).children('i');

            i.removeClass(COLLAPSED_TOGGLER_CLASS);
            i.addClass(EXPANDED_TOGGLER_CLASS);

            $(li).children(NODES_ELEMENT).slideDown('fast');

            node.collapsed = false;
        },

        collapse: function(node) {

            var li =  node.HTMLNode;
            var i = $(li).children('.'+NODE_TOGGLER_CLASS).children('i');

            i.removeClass(EXPANDED_TOGGLER_CLASS);
            i.addClass(COLLAPSED_TOGGLER_CLASS);

            $(li).children(NODES_ELEMENT).slideUp('fast');

            node.collapsed = true;
        },

        listen: function() {

            var _this = this;

            $(this.el).on('click', 'a.'+NODE_TOGGLER_CLASS, function(e){
                e.preventDefault();

                var toggler = $(this);

                var node = toggler.data('node');

                if(typeof node.collapsed === 'undefined') {
                    _this.expand(node);
                } else {
                    if(node.collapsed) {
                        _this.expand(node);
                    } else {
                        _this.collapse(node);
                    }
                }
            });
        },

        redraw: function(node) {
          
          var li = node.HTMLNode;
          var html = _renderNodes(node.nodes, node);

          $(html).hide();
          li.append(html);
        },
    }

    // We return private if its test
    if(typeof window.DTTREE_TEST != 'undefined') {
        ret = $.extend(ret, {
            create: _create,
            validateNode: _validateNode,
            createNodeToggler: _createNodeToggler,
            renderNode: _renderNode,
        });
    }

    return ret;

})(window, document);

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["context-menu.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div id=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "id"), env.opts.autoescape);
output += "\">\n\t<ul role=\"menu\" class=\"dropdown-menu\">\n\t\t";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "menus");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("menu", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n\t\t<li data-action=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"action"), env.opts.autoescape);
output += "\"><a href=\"#\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"text"), env.opts.autoescape);
output += "</a></li>\n\t\t";
;
}
}
frame = frame.pop();
output += "\n\t</ul>\n</div>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["file-item.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<li class=\"dtf-file-item dtf-context-holder\" data-context-target='#item-context-menu' data-file-type=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "file")),"type"), env.opts.autoescape);
output += "\">\n    <a tabindex=\"-1\" class=\"\" href=\"";
output += runtime.suppressValue("#/" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "file")),"path"), env.opts.autoescape);
output += "\">\n        <div class=\"dtf-file-img\">\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "file")),"type") == "image") {
output += "\n                <img src=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "file")),"base64"), env.opts.autoescape);
output += "\" class=\"ui-li-thumb\" data-path=\"";
output += runtime.suppressValue("#/" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "file")),"path"), env.opts.autoescape);
output += "\">\n            ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "file")),"type") == "file") {
output += "\n                    <i class=\"fa fa-file-o\"></i></div>\n            ";
;
}
else {
output += "\n                    <i class=\"fa fa-folder-o\"></i></div>\n            ";
;
}
;
}
output += "\n        </div>\n        <!-- @todo thumb -->\n        <!--<img src=\"\" class=\"ui-li-thumb\">-->\n        <div class=\"dtf-file-desc\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "file")),"label"), env.opts.autoescape);
output += "</div>\n    </a>\n    <div class=\"dtf-item-context\">\n        <a href=\"#\" class=\"dtf-mobile-item-context\"><i class=\"fa fa-angle-down\"></i></a>\n    </div>\n</li>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["mobile-context-menu.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<span class=\"mobile-context-menu dropdown pull-right\"><a data-toggle=\"dropdown\" href=\"#\" style=\"font-size:1.4em\"><i class=\"fa fa-angle-down\"></i></a>\n    <ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu1\">\n        <li><a data-path=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "path"), env.opts.autoescape);
output += "\" data-op=\"rename\" class=\"dtf-mobile-context-action\" href=\"#\">";
output += runtime.suppressValue((lineno = 2, colno = 96, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", context, ["Rename"])), env.opts.autoescape);
output += "</a></li>\n        <li><a data-path=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "path"), env.opts.autoescape);
output += "\" data-op=\"move\" class=\"dtf-mobile-context-action\" href=\"#\">";
output += runtime.suppressValue((lineno = 3, colno = 94, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", context, ["Move"])), env.opts.autoescape);
output += "</a></li>\n        <li><a data-path=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "path"), env.opts.autoescape);
output += "\" data-op=\"delete\" class=\"dtf-mobile-context-action\" href=\"#\">";
output += runtime.suppressValue((lineno = 4, colno = 96, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", context, ["Delete"])), env.opts.autoescape);
output += "</a></li>\n        <li><a data-path=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "path"), env.opts.autoescape);
output += "\" data-op=\"properties\" class=\"dtf-mobile-context-action\" href=\"#\">";
output += runtime.suppressValue((lineno = 5, colno = 100, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", context, ["Properties"])), env.opts.autoescape);
output += "</a></li>\n    </ul>\n</span>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["modal.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div id=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "id"), env.opts.autoescape);
output += "\" class=\"modal in\">\n    <div class=\"modal-dialog ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "size"), env.opts.autoescape);
output += "\">\n        <div class=\"modal-content\">\n            <div class=\"clearfix\">\n                <button style=\"margin:5px 15px;\" aria-label=\"Close\" data-dismiss=\"modal\" class=\"close\" type=\"button\"><span aria-hidden=\"true\">×</span></button>\n            </div>\n            <div class=\"modal-body\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "content"), env.opts.autoescape);
output += " </div>\n        </div>\n    </div>\n</div\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["new-folder-form.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<form method=\"GET\" class=\"form clearfix\" id=\"dtf-new-folder-form\" action=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "createFolderUrl"), env.opts.autoescape);
output += "\">\n    <div class=\"form-group\">\n        <label class=\"control-label\">";
output += runtime.suppressValue((lineno = 2, colno = 39, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", context, ["New Folder"])), env.opts.autoescape);
output += "</label>\n        <input type=\"text\" name=\"folder-name\" value=\"New Folder\" class=\"form-control new-folder-input\"/>\n    </div>\n    <div class=\"form-group\">\n        <input type=\"submit\" class=\"btn btn-sm btn-primary pull-right\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "Submit"), env.opts.autoescape);
output += "\"/>\n        <a href=\"javascript:;\" class=\"btn btn-default btn-sm pull-right\" data-dismiss=\"modal\" style=\"margin-right:5px\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "Cancel"), env.opts.autoescape);
output += "</a>\n    </div>\n</form>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["properties.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<table>\n    <tr><td class=\"property-label\" valign=\"top\" width=\"70px;\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "nameLabel"), env.opts.autoescape);
output += "</td><td>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "Name"), env.opts.autoescape);
output += "</td></tr>\n    <tr><td class=\"property-label\" valign=\"top\" width=\"70px;\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "typeLabel"), env.opts.autoescape);
output += "</td><td>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "Type"), env.opts.autoescape);
output += "</td></tr>\n    <tr><td class=\"property-label\" valign=\"top\" width=\"70px;\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "sizeLabel"), env.opts.autoescape);
output += "</td><td>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "Size"), env.opts.autoescape);
output += "</td></tr>\n    <tr><td class=\"property-label\" valign=\"top\" width=\"70px;\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "locationLabel"), env.opts.autoescape);
output += "</td><td>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "Location"), env.opts.autoescape);
output += "</td></tr>\n</table>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["sub-browser.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div><button class=\"btn btn-xs pull-right btn-primary folder-selector\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "selectLabel"), env.opts.autoescape);
output += "</button></div>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["template.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div id=\"dtf\">\n    <div class=\"container\">\n        <div class=\"row dtf-row\">\n            <div class=\"dt-col col-md-6\">\n                <a href=\"#\" data-toggle=\"modal\" data-target=\"#dtf-upload-dialog\" class=\"btn btn-success\">\n                    <i class=\"fa fa-upload\" style=\"\"></i> Upload\n                </a>\n\n                <a href=\"#\" data-toggle=\"modal\" data-target=\"#dtf-new-folder-dialog\" class=\"btn btn-default\">\n                    <i class=\"fa fa-folder-o\"></i> New Folder\n                </a>\n            </div>\n            <div class=\"dt-col col-md-6\">\n                <div class=\"row\">\n                    <div class=\"col-md-5 col-md-offset-7\">\n                        <input class=\"form-control dtf-search-input\" placeholder=\"Search\" type=\"search\"/>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <div id=\"dtf-breadcrumb-container\">\n                    <a id=\"dtf-parent-folder\" href=\"#\">\n                        <i class=\"fa fa-reply\"></i>\n                    </a>\n                    <span id=\"dtf-breadcrumb\"> </span>\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <div class=\"dtf-desktop-area\">\n                    <div id=\"dtf-tree\"></div>\n                    <div id=\"dtf-area\" class=\"dtf-context-holder\" data-context-target='#bro-context-menu'></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["upload-form.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<form method=\"POST\" enctype=\"multipart/form-data\" class=\"form clearfix\" id=\"dtf-upload-form\" action=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "uploadUrl"), env.opts.autoescape);
output += "\">\n    <input multiple type=\"file\" name=\"files[]\">\n    <div class=\"uploaded\"></div>\n    <input type=\"submit\" class=\"btn btn-primary btn-sm pull-right\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "Submit"), env.opts.autoescape);
output += "\">\n</form>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();


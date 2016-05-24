describe("DTTREE", function(){

	it("should be able to create element", function(){

     	var el = DTTREE.create("UL");

     	expect(typeof el).not.toBe("string");
     	expect(el.jquery).toBeDefined();
	});

	it("should be able to validate a node", function() {

		expect(function(){
			DTTREE.validateNode({});
		}).toThrow();

		var aNode = {path: "/foo", text: "/foo"}

     	expect(DTTREE.validateNode(aNode)).toBe(true);
  	});

	it("should be able to create node toggler",  function() {

		var aNode = {path: "/foo", text: "/foo"}
		var aNodeToggler = DTTREE.createNodeToggler(aNode);

		expect(aNodeToggler[0].tagName).toBe("A");
		expect(aNodeToggler[0].outerHTML).toBe('<a class="dttree-node-toggler" href="#"><i class="fa fa-plus-square-o"></i></a>');

		var anExpandedToggler = DTTREE.createNodeToggler(aNode, true);
		expect(anExpandedToggler[0].outerHTML).toBe('<a class="dttree-node-toggler" href="#"><i class="fa fa-minus-square-o"></i></a>');

	});

	it("should be able to render a node",  function() {

		var aNode = {path: "/foo", text: "/foo"}
		var li = DTTREE.renderNode(aNode);

		expect(li[0].tagName).toBe("LI");
		expect(li[0].outerHTML.indexOf("dttree-node-toggler")).toEqual(-1);

	});

	it("should be able to render nodes",  function() {

		var aNode = {
			path: "/foo",
			text: "/foo",
			nodes: [
				{path: "/bar", text: "/bar"}
			]
		}

		var li = DTTREE.renderNode(aNode);

		expect(li[0].tagName).toBe("LI");
		expect(li[0].outerHTML.indexOf("dttree-node-toggler")).not.toEqual(-1);
	});

	it("should throw error on render invalid node",  function() {

			expect(function(){
				DTTREE.renderNode({});
			}).toThrow();
	});

});


describe("DTTREE initilization", function(){
	it("should override default options after init",  function() {

		var defaultLength = Object.keys(DTTREE.options).length;

		expect(Object.keys(DTTREE.options).length).toBe(defaultLength);

		// @todo instance separation	
		DTTREE.init("#nob-exist-el", { otherOptions: true });
		expect(Object.keys(DTTREE.options).length).toBe(defaultLength+1);
	});

	it("should just works", function() {

		DTTREE.init("#dt-tree", {
			nodes: [{
				path: "#/foo",
				text: "Foo",
				nodes: [
					{path: "#/foo/bar", text: "Bar"}
				]
			}]
		});

		expect(1).toBe(1);
	});
});

describe("DTTREE node", function(){

	it("able to be expanded",  function() {

		var node = {path: "/foo", text: "Foo", nodes: [{path: "/bar", text: "Bar" }] };

		var li = DTTREE.renderNode(node);

		DTTREE.expand(node);
		expect(node.collapsed).toBe(false);

		var togglerIcon = node.HTMLNode.children("a.dttree-node-toggler").children("i");
		expect(togglerIcon.hasClass("fa-minus-square-o")).toBe(true);
	});

	it("able to be collapsed",  function() {

		var node = {path: "/foo", text: "Foo", nodes: [{path: "/bar", text: "Bar" }] };

		var li = DTTREE.renderNode(node);

		DTTREE.collapse(node);

		expect(node.collapsed).toBe(true);

		var togglerIcon = node.HTMLNode.children("a.dttree-node-toggler").children("i");

		expect(togglerIcon.hasClass("fa-plus-square-o")).toBe(true);
	});

});

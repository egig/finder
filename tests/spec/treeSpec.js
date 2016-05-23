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

	it("should be able to render a nodes",  function() {

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

});
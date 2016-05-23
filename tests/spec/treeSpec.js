describe("DTTREE element creator", function(){

  it("should be able to create element", function(){

      var el = DTTREE.create("UL");

      expect(typeof el).not.toBe("string");
      expect(typeof el.jquery).not.toBe("undefined");
  });
});

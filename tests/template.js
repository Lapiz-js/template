Lapiz.Test("Template/Basic", function(t){
  var out = Lapiz.Template.Std.templator("Hi my name is, $name", {name: "Bar"});
  out === "Hi my name is, Bar" || t.error("Templator did not generate correct string");
});

Lapiz.Test("Template/Multi", function(t){
  var out = Lapiz.Template.Std.templator("start $a $b end", {a:"apple", b:"bannana"});
  out === "start apple bannana end" || t.error("Templator did not generate correct string");
});

Lapiz.Test("Template/Deep", function(t){
  var out = Lapiz.Template.Std.templator("start $a $b.name end", {a:"apple", b:{name:"bannana"}});
  out === "start apple bannana end" || t.error("Templator did not generate correct string");
});

Lapiz.Test("Template/Undefined", function(t){
  var out = Lapiz.Template.Std.templator("start $foo.bar end", {a:"apple", b:{name:"bannana"}});
  out === "start  end" || t.error("Templator did not generate correct string");
});

Lapiz.Test("Template/Self", function(t){
  var out = Lapiz.Template.Std.templator("start $$ end", "testing");
  out === "start testing end" || t.error("Templator did not generate correct string");
});

Lapiz.Test("Template/NonStringResolve", function(t){
  var fooFlag = false;
  var obj = {
    name: "Adam",
    foo: {
      bar: function(){
        fooFlag = true
      }
    }
  }
  var fn = Lapiz.Template.Std.resolver("foo.bar", obj);
  fn();

  fooFlag || t.error("Resolver did not correctly resolve function");
});

Lapiz.Test("Template/singleToken", function(t){
  var out = Lapiz.Template.Std.templator("$b.name", {a:"apple", b:{name:"bannana"}});
  out === "bannana" || t.error("Templator did not generate correct string");
});
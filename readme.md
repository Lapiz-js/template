## Lapiz Template
With in the template module, the term context is used to refer to anything object like that has properties. It is used instead of object because an object can have properties and methods and in a context, we are only concerned with properties.

### Templator Interface
A templator take a template and a context and uses the context to populate the template.

Most often, the template is a string containing special tokens.
```js
var foo = templator("My name is $name", {name:"Bob"}); // My name is Bob
var bar = templator("Can access $nested.values", {nested:{values: "anything"}}); // Can access anything
```

However, it is possible for the template to be a more complex structure.

### Resolver Interface
A resolver takes a token and a context and, according to some logic, looks up a value in the context using the token.

The standard resolver (Lapiz.Template.Std.resolver) takes a period delimited string and successively looks up values.

```js
var foo = Lapiz.Template.Std.resolver("$nested.values", {nested:{values: "anything"}}); //anything
```

The resolver interface provides a great deal of flexibility. The most obvious flexibility is that the delimiter could be changed. But the string can also have a different interpretation, such as a regular expression. The resolver can also modify the value returned. So a stringResolver may cast everything to a string. The token is not limited to being a string.

### Tokenizer Interface
A tokenizer takes a template, a context and a resolver. It extracts the tokens from the template, resolves them using the context and resolver, and replaces the values in the template.

The standard tokenizer takes a template string. It finds tokens that begin with $ and continue until a whitespace character or end of string is found. If the template string exactly matches a single token, the resolution of that token is return (and it may not be a string). If the template string contains more than a single token, it will replace the token with the string representation of the value returned by the resolver.

Just like the resolver interface, there is a great deal of flexibility here. The template does not need to be a string. It is important that whatever resolver is used matches the type and style of token provided by the tokenizer.

### Templator Factory
A templator can be created with the templator factory:
```js
var templator = Lapiz.Template.Templator(myTokenizer, myResolver);
```

An example case of where this would be useful would defining tokens as surrounded by double curly braces rather than starting with $. A custom tokenizer could be provided, but the standard resolver could still be used.
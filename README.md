# Dummy static middleware for expressjs

which prevents annoying 'not found' errors at development environment.

## Installation 

```bash

npm install dummy-static-middleware

```

## Usage

```js

app.use(express.static('static/'));
app.use(require('dummy-static-middleware')([
	{url: /\.(jpeg|jpg|JPG|png|gif)$/, reply: 'static/images/dummy404.png'},
	{url: '/some.txt', reply: 'static/dummy.txt'}
]));

```

`url` could be regular expression or string for exact matching, `reply` is 
path to file which content will be sent in the response.

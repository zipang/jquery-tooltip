jquery-tooltip
==============

The Last Tooltip Before the End of the World..

Usage Examples
--------------

```html
	<h1 data-tooltip="the End of the World"><img src="eotw.png" /></h1>
```

```js
	// the most simple call with default options :
	// delay (before appearance) : 500 ms
	// apparition : fadeIn (1 s)
	// disparition : fadeOut (500 ms)
	$("h1").tooltip();

	// this call is equivalent to :
	$("h1").tooltip(500, 1000, 500);

	// or
	$("h1").tooltip({delay: 500, {fadeIn: 1000}, {fadeOut: 500});		
```

Licence
-------


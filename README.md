jquery-tooltip
==============

The Last Tooltip Before the End of the World..

## Usage Examples

```html
	<h1 data-tooltip="the End of the World"><img src="eotw.png" /></h1>
```

```js
	/** the most simple call with default options :
	 * @delay (before appearance) : 500 ms
	 * @apparition : fadeIn (1 s)
	 * @disparition : fadeOut (500 ms)
	 */
	$("h1").tooltip();

	// this call is equivalent to :
	$("h1").tooltip(500, 1000, 500);

	// or
	$("h1").tooltip({delay: 500, fadeIn: 1000, fadeOut: 500});
```

## Passing the content

Simple text content an be automatically extracted from the title` attribute of target elements or from the custom `data-tooltip` attribute.

```html
	// Both elements here will have the same tooltip receive
	<h1 data-tooltip="the End of the World"><img src="eotw.png" /></h1>
	<a title="the End of the World"><img src="eotw.png" /></a>
```


Full HTML content can be embedded ìnside a child block of the target with the `tooltip` class.

```html
	// This article will receive an HTML tooltip with rich HTML content
	<article>
		<h1>The End of the World</h1>
		<p></p>

		<aside class="tooltip">
			<img src="eotw.png" />
			<legend>Illustration by XVIIth century flamish painter Van Eyck</legend>
		</aside>
	</article>
```

## Controlling the apparition

The tooltip will by default appear and hide itself when the target elements are hovered.

Some parameters control the delay before the tooltip begins to show, the time of the apparition and disparition (fade in and fade out).

## Pin and unpin the tooltip

```js
	// Pin and unpin the
	$("a.icons")
		.tooltip()
		.on("click", function() {
			$(this).toggleClass("selected", "");
			$(this).data("tooltip").pin();
		});

```

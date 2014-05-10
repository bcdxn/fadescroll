fadescroll
==========

### jQuery plugin that fades between two elements on scroll.

##### Use fadescroll to create neat effects when the user scrolls the page.

This implementation was inspired from the folks over at [Medium](https://medium.com/)
who clearly have a great eye for design.
I also have to give credit to [Matt Duval](http://mattduvall.com/blog/medium-ux-blurry-scroll/),
who's blog details how the effect works. This is simply a jquery plugin that
neatly packages a generic implementation.

![Animated Example](https://github.com/bcdxn/fadescroll/blob/develop/example/img/fadescroll-example.gif?raw=true)

Fadescroll allows you to smoothly fade between two background styles for a
container.

#### For Example
##### HTML
```html
<div id="myContent">
  <h1 class='big-title'>Fadescroll</h1>
</div>

```
##### JavaScript
```javascript
/* Initialize fadescroll  with a config object*/
$('#myContent').fadescroll({
  fromClass: 'my-from',
  toClass: 'my-to',
});
```
##### CSS
```css
/* Color transition */
.my-from { background: #fb2b69; }
.my-to { background: #ff5b37; }
/* Image blur transition */
.my-from-img {
  background: url("img/bg_clear.jpg");
  background-attachment: fixed;
  background-position: center bottom;
  background-size: cover;
}

.my-to-img {
  background: url("img/bg_blur.jpg");
  background-attachment: fixed;
  background-position: center bottom;
  background-size: cover;
}
```

_Note: If you want to achieve the image blur effect you have to use two different
images--a clear image and a blurred image (you can blur/darken the image with
[Gimp](http://www.gimp.org/) for example). More details on that on Matt's [blog](http://mattduvall.com/blog/medium-ux-blurry-scroll/)_

======

### Using the fadescroll config object

All properties are optional. The defaults are shown below.

#### For Example

```javascript
var config = {
  fromClass: 'my-from',         // The class that is show when there is 0 scroll
  toClass: 'my-to',             // The class that is shown when 100% of the
                                // fadeScrollDelta has been scrolled
  fadeScrollDelta: 200,         // The distance in pixels that the user must
                                // scroll to transition from your 'my-from'
                                // styling to your 'my-to' styling
  $scrollContainer: $(window),  // The element to attach the scroll event listener to
  blurLocExpr: 'top'            // See below
}
```

The `blurLocExpr` defines where on the screen the user must scroll the container
to before the transition begins. The config value accepts a simple expression.

##### For Example

```javascript
// The transition will begin once the top of the container element has been
// scrolled 100 pixels past the bottom.
var config = {
  blurLocExpr = 'bottom+100'
}
```

_Valid expressions are of the form:_

```
"<position> | <operand> | <distance>"

where
  position = 'top' or 'bottom'
  operand = '+' or '-'
  distance in pixels

i.e.
  'top'
  'top-50'
  'bottom+200'
```

**Checkout the example page for more details**

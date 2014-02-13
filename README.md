Image Fit Window
================

A small jQuery plugin to automatically resize important artwork images to fit within the browser window. You can also have it fit images to any other container besides the window, but the uses for this are few.

It was inspired by the behaviour of the artwork images on Artsy.net (e.g http://artsy.net/artwork/shepard-fairey-power-and-glory-iv) and is intended to fulfil a very similar role. 

On art-focused websites it's often important that a large image be visible in its entirety to be properly appreciated. As websites are often fluid-width and browser dimensions up to the user, this can be tricky to ensure. 

This plugin helps by reducing the image to fit within the window and gives the user a toggle with which to toggle between the "fit" size and the actual size image.


Example
===============
http://jsfiddle.net/davecranwell/M5q7C/

As you reduce your window size, Bill's handsome face will remain fully visible. A toggle button (coloured red for the sake of prominence) will overlay the image and can be clicked to toggle between fit/actual size.

The image will reduce in width as you narrow your browser, but this is due to the `max-width` property in the CSS. The plugin's effect can be best experienced by making your browser wide, but short.

Options
==============

option | description | default | value(s)
------------- | ------------- | ------------- | -------------
auto  | Whether to fit the image automatically upon initialisation of the plugin (you can execute the fitting function manually) | true | boolean
container | What element to fit the image within. As this plugins is primarily for fitting images to the window, this option defaults to window. There are few scenarios to set it to anything else | window | jQuery element or window
offsetY | A manual pixel value by which to offset the image from the top of the window. Can be used to accommodate the height of a menu, or other surrounding livery which should also remain visible in the first scroll. | 0 | numeric value in pixels
wrapperClass | The classname of a div that gets wrapped around the image for utility purposes | "fit-wrapper" | string
toggleClass | The classname of the toggle which gets added to the wrapper | "fit-toggle" | string
allowUpscaling | Whether to allow the fitting method to scale an image beyond it's initial size. Generally undesirable | false | boolean
onFit | Callback function run once the image fitting function has run | undefined | function
onUnfit | Callback as above, except for when the image has been enlarge to it's full size | undefined | function
onMaxed | Requires `allowUpscaling:false`. Callback run when the plugin detects the image can be enlarged no further without upscaling | undefined | function

Methods
============

You can also manually fit or unfit the image within the container. 

```javascript

// set up the fitting plugin without automatically fitting the image during setup
$('#my-image').imageFitWindow({auto:false});

// manually fit the image
$('#my-image').imageFitWindow('fit');

// manually unfit the image
$('#my-image').imageFitWindow('unfit');

```

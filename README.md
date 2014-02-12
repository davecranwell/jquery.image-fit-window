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

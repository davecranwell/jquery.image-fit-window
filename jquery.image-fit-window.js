;(function ( $, window, document, undefined ) {
	"use strict";

	var pluginName = "imageFitWindow";
	
	var defaults = {
		auto: 1,
		container: window,
		offsetY: 0,
		wrapperClass: "fit-wrapper",
		toggleClass: "fit-toggle",
		allowUpscaling: false,
		onFit: undefined,
		onUnfit: undefined,
		onMaxed: undefined,
	};

	function Plugin ( element, options ) {
		this.element = element;
		this.settings = $.extend({}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;

		this.wrapper = $('<div></div>').addClass(this.settings.wrapperClass);
		this.toggle = $('<div title="Toggle enlargement"></div>').addClass(this.settings.toggleClass)

		this.init();
	}

	Plugin.prototype = {
		init: function () {
			var $this = this;

			this.element.wrap(this.wrapper).after(this.toggle);
			this.wrapper = this.element.parent();	

			if(!($this.element.attr('width') && !$this.element.attr('height'))){
				// get image dimensions the hard way of width/heigh attr aren't on tag
				$('<img />').load(function(){
					$this.imageWidth = $this.element.data('owidth', $this.element.width());
					$this.imageHeight = $this.element.data('oheight', $this.element.height());

					if($this.settings.auto){
						$this.fit();
					}
				}).attr('src', this.element.attr('src'));
			} else {
				// blindly trust image dimensions from height/width attrs, 
				$this.imageWidth = $this.element.data('owidth', $this.element.attr('width'));
				$this.imageHeight = $this.element.data('oheight', $this.element.attr('height'));

				if($this.settings.auto){
					$this.fit();
				}
			}

			this.toggle.click(function(){
				if($this.wrapper.hasClass('fit-image')){
					$this.unfit();
				}else{
					$this.fit();
				}
				return false;
			});
			
			$(window).resize(debounce(function(){
				$this.fit();
			}));

		},

		fit: function(){
			var container, containerWidth, containerHeight, newWidth, newHeight, fit = true;

			// the container in which the image should be made completely visible
			if(typeof this.settings.container != "undefined"){
				container = $(this.settings.container);
			}else{
				container = this.element.parent();
			}

			containerWidth = container.width();
			containerHeight = container.height() - this.settings.offsetY;

			// if container is immeasurable, give up
			if (!(containerWidth > 0) || !(containerHeight > 0)){
				return $(this);
			}

			if (containerHeight/containerWidth >= this.imageHeight/this.imageWidth){
				// portrait
				newHeight = Math.floor(containerWidth * (this.element.data('oheight') / this.element.data('owidth')));

				if(!this.settings.allowUpscaling && newHeight > this.element.data('oheight')){
					newHeight = this.element.data('oheight');
					fit = false;
				}

				this.element.css({"width":"auto", "height":newHeight});
			}else{
				// landscape
				newWidth = Math.floor(containerHeight * (this.element.data('owidth') / this.element.data('oheight')));
				
				if(!this.settings.allowUpscaling && newWidth > this.element.data('owidth')){
					newWidth = this.element.data('owidth');
					fit = false;
				}

				this.element.css({"width":newWidth, "height":"auto"});
			}

			if(fit){
				this.wrapper.removeClass('maxed-image unfit-image').addClass('fit-image');
				
				if (typeof this.settings.onFit == 'function') {
					this.settings.onFit.call(this);
				}
			} else {
				this.wrapper.removeClass('fit-image unfit-image').addClass('maxed-image');
				
				if (typeof this.settings.onMaxed == 'function') {
					this.settings.onMaxed.call(this);
				}
			}
			
		},

		unfit: function(){
			this.element.removeAttr('style');
			this.wrapper.removeClass('maxed-image fit-image').addClass('unfit-image');
			
			if (typeof this.settings.onUnfit == 'function') {
				this.settings.onUnfit.call(this);
			}
		},

		destroy: function(){
			this.unfit();
			this.element.unwrap(this.wrapper);
		}
	};

	$.fn[ pluginName ] = function ( methodOrOptions ) {
		if (!$(this).length) {
			return $(this);
		}

		var instance = $(this).data(pluginName);

		// CASE: action method (public method on PLUGIN class)
		if ( instance
			&& methodOrOptions.indexOf('_') != 0
			&& instance[ methodOrOptions ]
			&& typeof( instance[ methodOrOptions ] ) == 'function' ) {

			return instance[ methodOrOptions ]( Array.prototype.slice.call( arguments, 1 ) ); 

		// CASE: argument is options object or empty = initialise
		} else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {

			return this.each(function () {
				if (!$(this).data(pluginName)) {
					instance = new Plugin($(this), methodOrOptions );    // ok to overwrite if this is a re-init
					$(this).data(pluginName, instance);
				}
			});

		// CASE: method called before init
		} else if ( !instance ) {
		    $.error( 'Plugin must be initialised before using method: ' + methodOrOptions );

		// CASE: invalid method
		} else if ( methodOrOptions.indexOf('_') == 0 ) {
		    $.error( 'Method ' +  methodOrOptions + ' is private!' );
		} else {
		    $.error( 'Method ' +  methodOrOptions + ' does not exist.' );
		}
	};

	function debounce(fn, delay) {
		var timer = null;
		return function () {
			var context = this, args = arguments;
			clearTimeout(timer);
			timer = setTimeout(function () {
				fn.apply(context, args);
			}, delay);
		};
	}
}( jQuery, window, document ));

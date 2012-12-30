/**
 * jquery.blockdisable.js - jQuery plugin.
 *
 * Copyright (c) 2012 froop http://github.com/froop/jquery-async-disabler
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
/*global jQuery */
(function ($) {
	"use strict";
	var SAVE_KEY = "blockdisable.overlay",
		DISABLE_CLASS = "block-disabled";

	$.fn.blockDisableSet = function () {
		var $elements = this;

		$elements.addClass(DISABLE_CLASS);
		$elements.each(function () {
			var $self = $(this),
				$overlay = $("<div>")
					.css({
						position : "absolute",
						zIndex : 999,
						top : $self.offset().top,
						left : $self.offset().left,
						height : $self.outerHeight(),
						width : $self.outerWidth(),
						backgroundColor : "gray",
						opacity: 0.3
					});
			$self.data(SAVE_KEY, $overlay);
			$("body").append($overlay);
		});

		return this;
	};

	$.fn.blockDisableUnset = function () {
		var $elements = this;

		$elements.removeClass(DISABLE_CLASS);
		$elements.each(function () {
			var $overlay = $(this).data(SAVE_KEY);
			if ($overlay) {
				$overlay.remove();
			}
		});

		return this;
	};

	$.fn.blockDisabled = function () {
		var $elements = this;
		return $elements.closest("." + DISABLE_CLASS).length > 0;
	};
})(jQuery);

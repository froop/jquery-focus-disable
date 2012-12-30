/**
 * jquery.blockdisable.js - jQuery plugin.
 *
 * Copyright (c) 2012 froop http://github.com/froop/jquery-async-disabler
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
/*global jQuery */
(function ($) {
	"use strict";
	var SAVE_OVERLAY = "blockdisable.overlay",
		DISABLE_CLASS = "block-disabled";

	function removeOverlay($target) {
		var $overlay = $target.data(SAVE_OVERLAY);
		if ($overlay) {
			$overlay.remove();
		}
	}

	function addOverlay($target) {
		var $overlay = $("<div>")
			.css({
				position : "absolute",
				zIndex : 999,
				top : $target.offset().top,
				left : $target.offset().left,
				height : $target.outerHeight(),
				width : $target.outerWidth(),
				backgroundColor : "gray",
				opacity: 0.3
			});

		removeOverlay($target);
		$target.data(SAVE_OVERLAY, $overlay);
		$("body").append($overlay);
	}

	$.fn.blockDisableSet = function () {
		var $elements = this;

		$elements.addClass(DISABLE_CLASS);
		$elements.each(function () {
			addOverlay($(this));
		});

		return this;
	};

	$.fn.blockDisableUnset = function () {
		var $elements = this;

		$elements.removeClass(DISABLE_CLASS);
		$elements.each(function () {
			removeOverlay($(this));
		});

		return this;
	};

	$.fn.blockDisabled = function () {
		var $elements = this;
		return $elements.closest("." + DISABLE_CLASS).length > 0;
	};
})(jQuery);

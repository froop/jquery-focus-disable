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
		SAVE_TABINDEX = "blockdisable.tabindex",
		DISABLE_CLASS = "block-disabled",
		TABINDEX_AUTO = "auto";

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
				backgroundColor : "lightgrey",
				opacity: 0.5
			});

		removeOverlay($target);
		$target.data(SAVE_OVERLAY, $overlay);
		$("body").append($overlay);
	}

	function enableFocus($target) {
		$target.find("input").each(function () {
			var $input = $(this),
				savedTabindex = $input.data(SAVE_TABINDEX);
			if (savedTabindex) {
				if (savedTabindex === TABINDEX_AUTO) {
					$input.removeAttr("tabindex");
				} else {
					$input.attr("tabindex", savedTabindex);
				}
				$input.removeData(SAVE_TABINDEX);
			}
		});
	}

	function disableFocus($target) {
		$target.find("input").each(function () {
			var $input = $(this),
				tabIndex = $input.attr("tabindex");
			if ($input.data(SAVE_TABINDEX)) {
				return;
			}
			$input.data(SAVE_TABINDEX, tabIndex ? tabIndex : TABINDEX_AUTO);
			$input.attr("tabindex", "-1");
		});
	}

	$.fn.blockDisableSet = function () {
		var $elements = this;

		$elements.addClass(DISABLE_CLASS);
		$elements.each(function () {
			var $element = $(this);
			addOverlay($element);
			disableFocus($element);
		});

		return this;
	};

	$.fn.blockDisableUnset = function () {
		var $elements = this;

		$elements.removeClass(DISABLE_CLASS);
		$elements.each(function () {
			var $element = $(this);
			removeOverlay($element);
			enableFocus($element);
		});

		return this;
	};

	$.fn.blockDisabled = function () {
		var $elements = this;
		return $elements.closest("." + DISABLE_CLASS).length > 0;
	};
})(jQuery);

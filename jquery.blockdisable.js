/**
 * jquery.blockdisable.js - jQuery plugin.
 *
 * Copyright (c) 2013 froop http://github.com/froop/jquery-block-disabl
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
/*global jQuery */
(function ($) {
	"use strict";
	var SAVE_PREFIX = "blockdisable.",
		SAVE_OVERLAY = SAVE_PREFIX + "overlay",
		DISABLE_CLASS = "block-disabled";

	function removeOverlay($target) {
		var $overlay = $target.data(SAVE_OVERLAY);
		if ($overlay) {
			$overlay.remove();
		}
	}

	function addOverlay($target) {
		var $overlay = $("<span>").text($target.text());
		removeOverlay($target);
		$target.data(SAVE_OVERLAY, $overlay);
		$target.after($overlay);
	}

	function eachLink($target, func) {
		$target.find("a").each(function () {
			func($(this));
		});
	}

	function eachInput($target, func) {
		$target.find("input").each(function () {
			func($(this));
		});
	}

	function enableFocus($target) {
		function resetAttribute($item, attrName) {
			var saved = $item.data(SAVE_PREFIX + attrName);
			if (saved !== undefined) {
				if (saved) {
					$item.attr(attrName, saved);
				} else {
					$item.removeAttr(attrName);
				}
				$item.removeData(SAVE_PREFIX + attrName);
			}
		}

		eachLink($target, function ($item) {
			removeOverlay($item);
			$item.css("display", ""); //TODO
		});

		eachInput($target, function ($item) {
			resetAttribute($item, "disabled");
		});
	}

	function disableFocus($target) {
		function setAttribute($item, attrName, disableValue) {
			var attr = $item.attr(attrName);
			if ($item.data(SAVE_PREFIX + attrName) !== undefined) {
				return;
			}
			$item.data(SAVE_PREFIX + attrName, attr ? attr : "");
			$item.attr(attrName, disableValue);
		}

		eachLink($target, function ($item) {
			addOverlay($item);
			$item.css("display", "none");
		});

		eachInput($target, function ($item) {
			setAttribute($item, "disabled", "disabled");
		});
	}

	$.fn.blockDisableSet = function () {
		var $elements = this;

		$elements.addClass(DISABLE_CLASS);
		$elements.each(function () {
			var $element = $(this);
			disableFocus($element);
		});

		return this;
	};

	$.fn.blockDisableUnset = function () {
		var $elements = this;

		$elements.removeClass(DISABLE_CLASS);
		$elements.each(function () {
			var $element = $(this);
			enableFocus($element);
		});

		return this;
	};

	$.fn.blockDisabled = function () {
		var $elements = this;
		return $elements.closest("." + DISABLE_CLASS).length > 0;
	};
})(jQuery);

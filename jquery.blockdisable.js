/**
 * jquery.blockdisable.js - jQuery plugin.
 *
 * Copyright (c) 2013 froop http://github.com/froop/jquery-block-disable
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
		function loadProperty($item, propName) {
			var saved = $item.data(SAVE_PREFIX + propName);
			if (saved !== undefined) {
				$item.removeData(SAVE_PREFIX + propName);
			}
			return saved;
		}

		function resetAttribute($item, attrName) {
			var value = loadProperty($item, attrName);
			if (value) {
				$item.attr(attrName, value);
			} else {
				$item.removeAttr(attrName);
			}
		}

		function resetStyle($item, attrName) {
			var value = loadProperty($item, attrName);
			$item.css(attrName, value);
		}

		eachLink($target, function ($item) {
			removeOverlay($item);
			resetStyle($item, "display");
		});

		eachInput($target, function ($item) {
			resetAttribute($item, "disabled");
		});
	}

	function disableFocus($target) {
		function saveProperty($item, attrName, attr) {
			if ($item.data(SAVE_PREFIX + attrName) !== undefined) {
				return;
			}
			$item.data(SAVE_PREFIX + attrName, attr ? attr : "");
		}

		function setAttribute($item, attrName, disableValue) {
			var attr = $item.attr(attrName);
			saveProperty($item, attrName, attr);
			$item.attr(attrName, disableValue);
		}

		function setStyle($item, attrName, disableValue) {
			var attr = $item.css(attrName);
			saveProperty($item, attrName, attr);
			$item.css(attrName, disableValue);
		}

		eachLink($target, function ($item) {
			if (!$item.is(":visible")) {
				return;
			}
			addOverlay($item);
			setStyle($item, "display", "none");
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

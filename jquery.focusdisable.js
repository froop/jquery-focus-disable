/**
 * jquery.focusdisable.js - jQuery plugin.
 *
 * Copyright (c) 2013 froop http://github.com/froop/jquery-focus-disable
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
/*global jQuery */
(function ($) {
	"use strict";
	var SAVE_PREFIX = "focusdisable.",
		SAVE_OVERLAY = SAVE_PREFIX + "overlay",
		DISABLE_CLASS = "focus-disabled";

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
		$target.find(":input").each(function () {
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

		function resetAttribute($item, name) {
			var value = loadProperty($item, name);
			if (value) {
				$item.attr(name, value);
			} else {
				$item.removeAttr(name);
			}
		}

		function resetStyle($item, name) {
			var value = loadProperty($item, name);
			$item.css(name, value);
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
		function saveProperty($item, name, value) {
			if ($item.data(SAVE_PREFIX + name) !== undefined) {
				return;
			}
			$item.data(SAVE_PREFIX + name, value ? value : "");
		}

		function setAttribute($item, name, disableValue) {
			var value = $item.attr(name);
			saveProperty($item, name, value);
			$item.attr(name, disableValue);
		}

		function setStyle($item, name, disableValue) {
			var value = $item.css(name);
			saveProperty($item, name, value);
			$item.css(name, disableValue);
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

	$.fn.focusDisableSet = function () {
		var $elements = this;

		$elements.addClass(DISABLE_CLASS);
		$elements.each(function () {
			var $element = $(this);
			disableFocus($element);
		});

		return this;
	};

	$.fn.focusDisableUnset = function () {
		var $elements = this;

		$elements.removeClass(DISABLE_CLASS);
		$elements.each(function () {
			var $element = $(this);
			enableFocus($element);
		});

		return this;
	};

	$.fn.focusDisabled = function () {
		var $elements = this;
		return $elements.closest("." + DISABLE_CLASS).length > 0;
	};
})(jQuery);

/**
 * jquery.blockdisable.js - jQuery plugin.
 *
 * Copyright (c) 2012 froop http://github.com/froop/jquery-async-disabler
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
/*global jQuery */
(function ($) {
	"use strict";
	var SAVE_TABINDEX = "blockdisable.tabindex",
		SAVE_DISABLED = "blockdisable.disabled",
		DISABLE_CLASS = "block-disabled";

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
		function resetAttribute($item, attrName, dataKey) {
			var saved = $item.data(dataKey);
			if (saved !== undefined) {
				if (saved) {
					$item.attr(attrName, saved);
				} else {
					$item.removeAttr(attrName);
				}
				$item.removeData(dataKey);
			}
		}

		eachLink($target, function ($item) {
			resetAttribute($item, "tabindex", SAVE_TABINDEX);
		});

		eachInput($target, function ($item) {
			resetAttribute($item, "disabled", SAVE_DISABLED);
		});
	}

	function disableFocus($target) {
		eachLink($target, function ($item) {
			var tabIndex = $item.attr("tabindex");
			if ($item.data(SAVE_TABINDEX) !== undefined) {
				return;
			}
			$item.data(SAVE_TABINDEX, tabIndex ? tabIndex : "");
			$item.attr("tabindex", "-1");
		});

		eachInput($target, function ($item) {
			var disabled = $item.attr("disabled");
			if ($item.data(SAVE_DISABLED) !== undefined) {
				return;
			}
			$item.data(SAVE_DISABLED, disabled ? disabled : "");
			$item.attr("disabled", "disabled");
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

/**
 * jquery.blockdisable.js - jQuery plugin.
 *
 * Copyright (c) 2012 froop http://github.com/froop/jquery-async-disabler
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
/*global jQuery */
(function ($) {
	"use strict";

	$.fn.blockDisableSet = function () {
		var $elements = this;

		$elements.addClass("block-disabled");
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
						backgroundColor : "black",
						opacity: 0.2
					});
			$self.data("blockdisable.overlay", $overlay);
			$("body").append($overlay);
		});

		return this;
	};

	$.fn.blockDisableUnset = function () {
		var $elements = this;

		$elements.removeClass("block-disabled");
		$elements.each(function () {
			var $self = $(this);
			$self.data("blockdisable.overlay").remove();
		});

		return this;
	};

	$.fn.blockDisabled = function () {
		var $elements = this;
		return $elements.closest(".block-disabled").length > 0;
	};
})(jQuery);

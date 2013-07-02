(function($) {
	var _DEFAULTS = {
		delay: 500, // 500ms
		fadeIn: 1000,
		fadeOut: 500,
		position: "bottom",
		extract: _extractTooltip
	};

	// UTILITY METHODS
	function _positionTooltip($tooltip, $target, method) {
		var targetPosition = $target.offset();
		if (method == "top") {
			$tooltip.addClass("top").css({
				position: "absolute",
				top: (targetPosition.top - $tooltip.height() - 5) + "px",
				left: (targetPosition.left + ($target.width() / 2) - ($tooltip.width() / 2)) + "px"
			});
		} else if (method == "bottom") {
			$tooltip.addClass("bottom").css({
				position: "absolute",
				top: (targetPosition.top + $target.height() + $tooltip.height() + 5) + "px",
				left: (targetPosition.left + ($target.width() / 2) - ($tooltip.width() / 2)) + "px"
			});
		}
	}

	function _extractTooltip($target) {
		var txt = $target.attr("title") || $target.data("tooltip");
		$target.removeAttr('title'); // prevent conflict with js tooltip
		return txt;
	}


	/**
	 * Prepare tooltips for target elements
	 *
	 * Passing explicit parameters like that
	 * @param {Number|String} delay in ms before appearance or jquery delay value ("fast", "slow", ..) : default 500ms
	 * @param {Number|String} apparition : (fadeIn, default 1s)
	 * @param {Number|String} disparition : (fadeOut, default 500ms)
	 *
	 * Or all in ones :
	 * @param {Object} options
 	 */
	$.fn.tooltip = function(delay, fadeIn, fadeOut) {

		var options = $.extend(
			{}, _DEFAULTS,
			(typeof delay == "object")
				? delay
				: {delay: delay, fadeIn: fadeIn, fadeOut: fadeOut}
		);

		return $(this).each(function(i, target) {
			var $target = $(target),
			    title = _extractTooltip($target);

			if (!title) return true; // continue to the next target element

			var $tooltip = $("<div>").addClass("tooltip")
			    	.html(title).data("state", "hidden")
			    	.hide().insertAfter($target),
			    appear = function() {
					if (typeof options.position == "function") {
						options.position($tooltip, $target);
					} else {
						_positionTooltip($tooltip, $target, options.position);
					}
			    	$tooltip.fadeIn(options.fadeIn, function() {
			    		$tooltip.data("state", "visible");
			    	});
			    },
			    disappear = function() {
			    	$tooltip.fadeOut(options.fadeOut, function() {
			    		$tooltip.data("state", "hidden");
			    	});
			    };

			$target.hover(
				function () {
					if ($tooltip.data("state") == "hidden") {
						$tooltip.data("state", "wait")
						setTimeout(appear, options.delay);
					}

				}, function () {
					var state = $tooltip.data("state");
					if (state == "wait") {
						$tooltip.data("state", "hidden");
					} else {
						disappear();
					}
				}
			);
		});
	};
})(jQuery);

(function() {
	var defaults = {
		delay: 500, // 500ms
		fadeIn: 1000,
		fadeOut: 500,
		position: "bottom",
		extract: extractTooltip
	};

	// UTILITY METHODS
	function positionTooltip($tooltip, $target, method) {
		var targetPosition = $target.offset();
		if (method == "top") {
			$tooltip.css({
				position: "absolute",
				top: (targetPosition.top - $tooltip.height() - 5) + "px",
				left: (targetPosition.left + ($target.width() / 2) - ($tooltip.width() / 2)) + "px"
			});
		} else if (method == "bottom") {
			$tooltip.css({
				position: "absolute",
				top: (targetPosition.top + $target.height() + $tooltip.height() + 5) + "px",
				left: (targetPosition.left + ($target.width() / 2) - ($tooltip.width() / 2)) + "px"
			});
		}
	}

	function extractTooltip($target) {
		return $target.attr("title") || $target.data("tooltip");
	}


	// MAIN PLUGIN DEFINITION
	$.fn.tooltip = function(delay, fadeIn, fadeOut) {

		var options = $.extend(
			{}, defaults, 
			(typeof delay == "object")
				? delay
				: {delay: delay, fadeIn: fadeIn, fadeOut: fadeOut}
		);
		
		$(this).each(function(i, target) {
			var $target = $(target), 
			    title = extractTooltip($target);

			if (!title) return true; // continue to the next target element

			var $tooltip = $("<div>").addClass("tooltip")
			    	.html(title).data("state", "hidden")
			    	.hide().insertAfter($target),
			    appear = function() {
			    	positionTooltip($tooltip, $target, options.position);
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
})();

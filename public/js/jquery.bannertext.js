/*
 * BannerText jQuery plugin
 * author: idris, swider
 *
 * called on block-level element with background image and child node to be positioned
 */

(function ($){

	var defaults = {

	};

	function BannerText($el, opts){
		this.$el = $el;
		this.opts = $.extend( {}, defaults, opts);
		this._defaults = defaults;
		this.init();
	}

	BannerText.prototype.init = function(){
		var $dragables = this.$el.children();
		$dragables.draggable().on('draggable-drop', $.proxy(this.onDrop, this));
		$dragables.each(function(i, el){ $(el).data('id', i); });
		this.$el.data('numDragables', $dragables.length);
	};

	BannerText.prototype.onDrop = function(e, dropData){
		console.log(dropData.$el, 'dropped', dropData.x, dropData.y);
		this.$el.data('bannerTextData'+dropData.$el.data('id'), '"x": '+dropData.x+', "y": '+dropData.y);
	};

	$.fn['bannertext'] = function (opts){
		var $els = this;
		return $els.each(function(i){
			var $el = $els.eq(i);
			$el.data('bannertext', new BannerText($el, opts));
		});
	}

})(jQuery);

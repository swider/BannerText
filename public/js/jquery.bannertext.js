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
		this.$el.children().draggable().on('draggable-drop', $.proxy(this.onDrop, this));
	};

	BannerText.prototype.onDrop = function(e, dropData){
		console.log(this.$el, 'dropped', dropData.x, dropData.y);
	};

	$.fn['bannertext'] = function (opts){
		var $els = this;
		return $els.each(function(i){
			var $el = $els.eq(i);
			$el.data('bannertext', new BannerText($el, opts));
		});
	}

})(jQuery);

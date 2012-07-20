/*
 * BannerText jQuery plugin
 * author: idris, swider
 *
 * called on block-level element with background image and child node to be positioned
 */

(function ($){

	var defaults = {

	};

	function Draggable($el, opts){
		this.$el = $el;
		this.opts = $.extend( {}, defaults, opts);
		this._defaults = defaults;
		this.init();
	}

	Draggable.prototype.init = function(){
		this.$el.on('mousedown.draggable', $.proxy(this.dragstart, this));
		this.$el.addClass('draggable');
		this.$el.css('position', 'absolute');
	};

	Draggable.prototype.dragstart = function(e){
		$(window).on('mouseup.draggable', $.proxy(this.dragend, this));
		$(window).on('mousemove.draggable', $.proxy(this.dragmove, this));
		this.$el.addClass('dragging');

		// Offset is where your mouse was, relative to the element
		this.offsetX = e.offsetX;
		this.offsetY = e.offsetY;

		// Start is where 
		this.startX = e.clientX;
		this.startY = e.clientY;

		this.offsetParent = this.$el.offsetParent();
		var offsetParentPosition = this.offsetParent.position();
		this.offsetParentX = offsetParentPosition.left;
		this.offsetParentY = offsetParentPosition.top;
	};

	Draggable.prototype.dragend = function(e){
		$(window).off('mousemove.draggable');
		$(window).off('mouseup.draggable');
		this.$el.removeClass('dragging');
		this.$el.trigger('draggable-drop', {$el:this.$el, x:this.x, y:this.y});

		this.dragmove(e);
	};

	Draggable.prototype.dragmove = function(e){
		this.y = e.clientY - this.offsetY - this.offsetParentY;
		this.x = e.clientX - this.offsetX - this.offsetParentX;
		this.$el.css('top', this.y).css('left', this.x);
	};

	$.fn['draggable'] = function (opts){
		var $els = this;
		return $els.each(function(i){
			var $el = $els.eq(i);
			$el.data('draggable', new Draggable($el, opts));
		});
	}

})(jQuery);

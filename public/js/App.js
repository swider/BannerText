$(function(){

	var $banner = $('#example1');

	$banner.bannertext();

	var numDragables = $banner.data('numDragables');
	$('form').submit(function(e){
		var data = new Array();
		for(var i=0; i<numDragables; i++){
			data.push('{ "name": "item'+i+'", '+$banner.data('bannerTextData'+i)+'}');
		}
		$(this).find('input[name=data]').val(data);

		console.log(data);
		//e.preventDefault();
	});

});

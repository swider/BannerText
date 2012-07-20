$(function(){

	var $banner = $('#example1');

	$banner.bannertext();

	$('form').submit(function(){
		$(this).find('input[name=data]').val($banner.data('bannerTextData'));
	});

});

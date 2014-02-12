$(function(){
	$('#my-image-1').imageFitWindow();

	//$('#my-image-2').imageFitWindow({container: $('.my-container')});

	$(window).resize(function(){
		$('.my-image').imageFitWindow('fit');
	});
})
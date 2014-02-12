$(function(){
	$('#my-image-1').imageFitWindow({
		onFit:function(){
			console.log('fit')
		},
		onMaxed: function(){
			console.log('maxed')
		},
		onUnfit: function(){
			console.log('unfit')
		}
	});

	$('#my-image-2').imageFitWindow({
		container: $('.my-container')
	});	
})
// Main JavaScript
requirejs.config({
	paths: {
		"util": "utility",
		"lib": "vendor"
	}
});

requirejs(["util/logoCanvas"],function(logoCanvas){
	// var canvas = document.createElement("canvas");
	// canvas.width = "1024";
	// canvas.height = "768";
	// canvas.style.zIndex = "10000";
	// canvas.style.position = "fixed";
	// canvas.style.top = "0";
	// document.body.appendChild(canvas);
	// var logoAni = logoCanvas(canvas);
	// setTimeout(function(){
	// 	logoAni.play();
	// }, 2000);
});
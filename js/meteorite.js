var canvas;
var context;
var screenWidth;
var screenHeight;
var doublePI = Math.PI * 2;
var step = 0;
// a collection of meteorites
var points = [];
//controls the frequency of the lightening
var focalLength = 500;
//bgGradient is used to define fillstyle, which sets the color and gradient of the canvas
var bgGradient;

window.onload = function()
{
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    //window.onresize - An event handler for the resize event on the window.
    window.onresize = function()
	{	
		screenWidth = window.innerWidth;
		screenHeight = window.innerHeight;
		// define the height, width of the canvas
		canvas.width = screenWidth;
		canvas.height = screenHeight;
		//createRadialGradient() method creates a radial/circular gradient object in canvas
		bgGradient=context.createRadialGradient(screenWidth /2, screenHeight / 2, screenWidth, screenWidth / 2, screenHeight / 2, 0);
		//create a mixture of black and red radial gradient, outer shell is red, innershell is black
		bgGradient.addColorStop(0.8, '#000');
		//bgGradient.addColorStop(0.2, '#ae7aea');
		bgGradient.addColorStop(0.7, '#d6bcf4');
		//bgGradient.addColorStop(1, '#ae7aea');
	};
	//generates an array of points
	generatePoints();
	//set up the background
	window.onresize();
	//creates animation and graphics
    loop();
};

// generates an array of points as meteorites
function generatePoints()
{
	var i = 1000;

	for(i; i > -1; --i)
	{	
		//generate random points and store them in points[]
		var point3D = {x:(1 - Math.random() * 2) * 600, y:(1 - Math.random() * 2) * 600, z:(1 - Math.random() * 2) * 600, vx:0, vy:0, vz:0};

		points.push(point3D);
	}
}
// used for loop() to update the animation frames
//allows modern browsers to stop drawing graphics when a tab or window is not visible.
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function( callback ){
				window.setTimeout(callback, 1000 / 60);
			};
})();

// set a time loop to update the animation frame every few seconds
function loop()
{
	context.globalAlpha = 0.4;
	//renders the radial gradient of the background
	context.fillStyle = bgGradient;
	//set the background to cover the whole screen window
	context.fillRect(0, 0, screenWidth, screenHeight);
	//set the transparency to 100%
	context.globalAlpha = 1;

	//draw the shooting meteorites animation
	updatePoints();
	//render the shooting meteroriets
	renderPoints();
	//draw lightenings of meteorites in the back ground
	renderLightening();

	step += 0.02;
	//call the requestionAnimFrame to update the animatino frames
	requestAnimFrame(loop);

	//draw flashing text in the canvas
	context.font = "30px Arial";
	if(Math.random() > 0.4) {
		//context.fillText("The Universe.........is Infinite, so is Alex's power !!",10,50);
		//context.fill();
		}

}

//creates and renders the meteorites
function renderPoints()
{
	var i = points.length - 1;

	for(i; i > -1; --i)
	{
		var point = points[i];
		var scale = focalLength / (point.z + focalLength);

		var px = (point.x * scale + (screenWidth / 2));
		var py = point.y * scale + (screenHeight / 2);

		//load the body of meteorites
		drawPoint({x: px, y: py}, scale);
	}
}

//creates and renders the lightening in the background
function renderLightening()
{	//set the transpancy of the lightening
	context.globalAlpha = 0.07;
	//set the line width of the lightening in the back
	context.lineWidth = 0.3;
	//set the color of the lightening
	//context.strokeStyle = '#FFF';
	context.strokeStyle = '#91ebbb';
	context.beginPath();

	var i = points.length - 1;

	for(i; i > -1; --i)
	{
		var point = points[i];
		var scale = focalLength / (point.z + focalLength);

		if(i === points.length - 1) 
			context.moveTo(point.x * scale + (screenWidth / 2), point.y * scale + (screenHeight / 2));
		else 
			context.lineTo(point.x * scale + (screenWidth / 2 ), point.y * scale + (screenHeight / 2));
	}

	//render the lightening in certain time interval
	if(Math.random() > 0.4) {
		context.stroke();
        }


	context.closePath();
	context.globalAlpha = 1;
}

// creates the animation and motion of shooting meteorites
function updatePoints()
{
	var i = points.length - 1;

	for(i; i > -1; --i)
	{
		var point = points[i];
		point.x += Math.cos(step * 0.4) * 2;
		point.y += Math.sin(step * 0.8) * 2;
		point.z -= 2;

		//check to make sure if the meterorites are within in the screen view.
		checkBounds(point);
	}
}

// contain the meteorites within the screen view.
function checkBounds(point)
{
	if(point.x < -2000)
		point.x = Math.random() * 2000;
	else if
		(point.x > 2000) point.x = Math.random() * -2000;

	if(point.y < -2000) 
		point.y = Math.random() * 2000;
	else if
		(point.y > 2000) point.y = Math.random() * -2000;

	if(point.z < -500) 
		point.z = Math.random() * 2400 + 200;
}

//creates and renders the body of meteorites
function drawPoint(point, scale)
{
	context.globalAlpha = scale;
	//changing the color of the meteorites based on the distance it travels
	if(point.x>screenWidth/4 && point.x<screenWidth*3/4&& point.y>screenHeight/6 && point.y<screenHeight*5/6){
	//render meteorites as white - #FFF
	context.fillStyle = '#91ebbb';
	}else{
	//render meteorites as black
	context.fillStyle = '#000000';
	}
	context.beginPath();
	//draw square instead of arc, less CPU used also updates faster
	context.rect(point.x, point.y, scale*1.7, scale*1.7);
	//context.arc(point.x,point.y,scale,0,2*Math.PI);
	context.fill();
	context.closePath();
	context.globalAlpha = 1;

}

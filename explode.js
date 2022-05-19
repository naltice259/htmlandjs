//
//CSE 470 HW 1 Explode!  
//
/*
Written by: HW470:Nicholas Altice
Date: Jan 26 2019

Description: 
This program HW470: Makes some shapes then makes them explode
*/

var canvas;
var gl;

//store the vertices
//Each triplet represents one triangle
var vertices = [];

//store a color for each vertex
var colors = [];

//HW470: control the explosion
//(Your variables here)
var explode = 1.0;
var exLoc; 

//HW470: control the redraw rate
var delay = 20;

// =============== function init ======================
 
// When the page is loaded into the browser, start webgl stuff
window.onload = function init()
{
	// notice that gl-canvas is specified in the html code
    canvas = document.getElementById( "gl-canvas" );
    
	// gl is a canvas object
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

	// Track progress of the program with print statement
    console.log("Opened canvas");
        
    //HW470:
    // Define  data for object 
	// See HW specs for number of vertices and parts required
	// Recommendation: each set of three points corresponds to a triangle.
	// DCH: I have used sval for scaling the object size if I am not
	// happy with my initial design. (Just an idea for you; no need to use.)
	//(During the explosion all geometry must remain in the window.)
    //
	var sval = 0.25;
    vertices = [
        vec2( sval, 0 ),// core
        vec2( 0.0, sval ),
        vec2( -sval, 0 ),
		vec2( -sval, 0 ),
        vec2( 0, -sval ),
		vec2( sval, 0 ),
        vec2( 0, -sval ),//outer part 1
		vec2( sval, 0 ),
		vec2( 2*sval, -sval ),
		vec2( 0, -sval ),
		vec2( 2*sval, -sval ),
		vec2( sval, -2*sval ),
		vec2( sval, 0 ),//outer part 2
		vec2( 0, sval ),
		vec2( 2*sval, sval ),
		vec2( 0, sval ),
		vec2( 2*sval, sval ),
		vec2( sval, 2*sval ),
		vec2( 0, sval ),//outer part 3
		vec2( -sval, 0 ),
		vec2( -2*sval, sval ),
		vec2( 0, sval ),
		vec2( -2*sval, sval ),
		vec2( -sval, 2*sval ),
		vec2( 0, -sval ),//outer part 4
		vec2( -sval, 0 ),
		vec2( -2*sval, -sval ),
		vec2( 0, -sval ),
		vec2( -2*sval, -sval ),
		vec2( -sval, -2*sval )
    ];
	 
	
	//HW470: Create colors for the core and outer parts
	// See HW specs for the number of colors needed
	for(var i=0; i < 6; i++) {
		colors.push(vec3(1.0, 0.0, 0.0));
	};
	for(var i=6; i < 12; i++) {
		colors.push(vec3(0.0, 1.0, 0.0));
	};
	for(var i=12; i < 18; i++) {
		colors.push(vec3(0.0, 0.0, 1.0));
	};
	for(var i=18; i < 24; i++) {
		colors.push(vec3(1.0, 1.0, 0.0));
	};
	for(var i=24; i < vertices.length; i++) {
		colors.push(vec3(1.0, 0.0, 1.0));
	};
	 
	 
	
	
	// HW470: Print the input vertices and colors to the console
	console.log("Input vertices and colors:");
	 
	 

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
	// Background color to white
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Define shaders to use  
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU
	//
	// color buffer: create, bind, and load
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
	
	// Associate shader variable for  r,g,b color
	var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );
    
    // vertex buffer: create, bind, load
    var vbuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vbuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate shader variables for x,y vertices	
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	//HW470: associate shader explode variable ("Loc" variables defined here) 
    exLoc = gl.getUniformLocation( program, "explode" );

    console.log("Data loaded to GPU -- Now call render");

    render();
};


// =============== function render ======================

function render()
{
    // clear the screen 
    gl.clear( gl.COLOR_BUFFER_BIT );
	
	//HW470: send uniform(s) to vertex shader
	
	//gl.uniform1f(exLoc, 0.0);
	//gl.drawArrays( gl.TRIANGLES, 0, 3 );//core part
	//gl.drawArrays( gl.TRIANGLES, 3, 3 );
	if(explode > 2.0){
		explode = 1.0;
	}else{
		explode += .01;
	}
	//explode += .01;
	gl.uniform1f(exLoc, explode);
	
	//HW470: draw the object
	// You will need to change this to create the exploding outer parts effect
	// Hint: you will need more than one draw function call
    //gl.drawArrays( gl.TRIANGLES, 0, 3 );//core part
	//gl.drawArrays( gl.TRIANGLES, 3, 3 );
	gl.drawArrays( gl.TRIANGLES, 6, 3 );//outer part 1
	gl.drawArrays( gl.TRIANGLES, 9, 3 );
	gl.drawArrays( gl.TRIANGLES, 12, 3 );//outer part 2
	gl.drawArrays( gl.TRIANGLES, 15, 3 );
	gl.drawArrays( gl.TRIANGLES, 18, 3 );//outer part 3
	gl.drawArrays( gl.TRIANGLES, 21, 3 );
	gl.drawArrays( gl.TRIANGLES, 24, 3 );//outer part 4
	gl.drawArrays( gl.TRIANGLES, 27, 3 );
	
	gl.uniform1f(exLoc, 1.0);
	gl.drawArrays( gl.TRIANGLES, 0, 3 );//core part
	gl.drawArrays( gl.TRIANGLES, 3, 3 );
	
	//re-render after delay
	setTimeout(function (){requestAnimFrame(render);}, delay);
}


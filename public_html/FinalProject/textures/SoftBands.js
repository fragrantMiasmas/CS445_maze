/* 
 * Ariel Todoki
 * 
 * Create a soft bands pattern
 */

function SoftBands()
{
    this.width = 64;    // width (# of pixels) of the texture
    this.height = 64;   // height (# of pixels) of the texture
    this.numCols = 16;   // number of colored columns
    this.makeSoftBands();
    this.init();
}

/**
 * Create an array of uInts. Load the array with the texture pattern. 
 * Note, the 2D texture is stored in a 1D array.
 * @return {undefined}
 */
SoftBands.prototype.makeSoftBands = function () {
    this.texels = new Uint8Array(4 * this.width * this.height);

    for (var i = 0; i < this.width; i++)
    {
        for (var j = 0; j < this.height; j++)
        {

            var deg = 1000/this.height;
             var c = ((1+Math.sin(j*deg*(2*Math.PI/360)))/2)*255;
            
            var k = 4 * (i * this.width + j);
            this.texels[k] = 255;
            this.texels[k + 1] = c;
            this.texels[k + 2] = 255-c;
            this.texels[k + 3] = 255;
        }
    }
};

/**
 *  Call this to create the texture buffer and set texture parameters.
 * @return {undefined}
 */
SoftBands.prototype.init = function () {
    // Generate texture ID and bind to this ID
    this.texID = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texID);

    // loads the texture onto the GPU
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0,
            gl.RGBA, gl.UNSIGNED_BYTE, this.texels);

    // Set parameters
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
};

/**
 * Call this when you are ready to use the texture
 * @return {undefined}
 */
SoftBands.prototype.activate = function () {
    // GL provides 32 texture registers; the first of these is gl.TEXTURE0.
    gl.activeTexture(gl.TEXTURE0); // activate texture unit 0
    gl.bindTexture(gl.TEXTURE_2D, this.texID);
    gl.uniform1i(uTexture, 0);     // associate uTexture in shader with texture unit 0
};






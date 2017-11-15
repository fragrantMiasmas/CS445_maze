/* 
 * Ariel Todoki
 * 
 * Create a vertical bands pattern
 */

function VerticalBands()
{
    this.width = 64;    // width (# of pixels) of the texture
    this.height = 64;   // height (# of pixels) of the texture
    this.numCols = 16;   // number of colored columns
    this.makeVerticalBands();
    this.init();
}

/**
 * Create an array of uInts. Load the array with the texture pattern. 
 * Note, the 2D texture is stored in a 1D array.
 * @return {undefined}
 */
VerticalBands.prototype.makeVerticalBands = function () {
    this.texels = new Uint8Array(4 * this.width * this.height);

    for (var i = 0; i < this.width; i++)
    {
        for (var j = 0; j < this.height; j++)
        {
            var patchy = Math.floor(j / (this.height / this.numCols));
            
            //color is white or pink
            var rc = (patchy % 2 === 1 ? 255 : 255); 
            var gc = (patchy % 2 === 1 ? 255 : 150); 
            var bc = (patchy % 2 === 1 ? 255 : 200); 
            
            var k = 4 * (i * this.width + j);
            this.texels[k] = rc;
            this.texels[k + 1] = gc;
            this.texels[k + 2] = bc;
            this.texels[k + 3] = 255;
        }
    }
};

/**
 *  Call this to create the texture buffer and set texture parameters.
 * @return {undefined}
 */
VerticalBands.prototype.init = function () {
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
VerticalBands.prototype.activate = function () {
    // GL provides 32 texture registers; the first of these is gl.TEXTURE0.
    gl.activeTexture(gl.TEXTURE0); // activate texture unit 0
    gl.bindTexture(gl.TEXTURE_2D, this.texID);
    gl.uniform1i(uTexture, 0);     // associate uTexture in shader with texture unit 0
};



/*
 * settings = {
 *  tile_width=32
 *  tile_height=32
 *  start_x=0
 *  start_y=0
 *  num_tiles_x=10
 *  interval=1000
 * }
 */
function TextureAnimator(settings) {
    var self = this;
    self.settings = settings;

    settings.texture.wrapS = settings.texture.wrapT = THREE.RepeatWrapping;
    settings.texture.repeat.set(1 / settings.num_tiles_x, 1 / settings.num_tiles_y);

    self.current_display_time = 0;
    self.current_tile = settings.start;

    self.update = function (delta) {
        this.current_display_time += delta;
        while (this.current_display_time > settings.interval)
        {
            this.current_display_time -= settings.interval;
            this.current_tile++;
            if (this.current_tile == settings.end) {
                this.current_tile = settings.start;
            }
            var current_column = this.current_tile % settings.num_tiles_x;
            settings.texture.offset.x = current_column / settings.num_tiles_x;
//            var currentRow = Math.floor(this.currentTile / this.tilesHorizontal);
//            texture.offset.y = currentRow / this.tilesVertical;
        }
    }
}
function TextureAnimatorOld(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration)
{
    // note: texture passed by reference, will be updated by the update function.

    this.tilesHorizontal = tilesHoriz;
    this.tilesVertical = tilesVert;
    // how many images does this spritesheet contain?
    //  usually equals tilesHoriz * tilesVert, but not necessarily,
    //  if there at blank tiles at the bottom of the spritesheet. 
    this.numberOfTiles = numTiles;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical);

    // how long should each image be displayed?
    this.tileDisplayDuration = tileDispDuration;

    // how long has the current image been displayed?
    this.currentDisplayTime = 0;

    // which image is currently being displayed?
    this.currentTile = 0;

    this.update = function (milliSec)
    {
        this.currentDisplayTime += milliSec;
        while (this.currentDisplayTime > this.tileDisplayDuration)
        {
            this.currentDisplayTime -= this.tileDisplayDuration;
            this.currentTile++;
            if (this.currentTile == this.numberOfTiles)
                this.currentTile = 0;
            var currentColumn = this.currentTile % this.tilesHorizontal;
            texture.offset.x = currentColumn / this.tilesHorizontal;
            var currentRow = Math.floor(this.currentTile / this.tilesHorizontal);
            texture.offset.y = currentRow / this.tilesVertical;
        }
    };
}		
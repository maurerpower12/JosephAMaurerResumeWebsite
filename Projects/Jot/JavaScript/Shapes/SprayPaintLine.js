var lastUpdate = 0;
var delay = 15;

//SPRAY-PAINT LINE CLASS
class SprayPaintLine {
    constructor(color, density = 40) {
        this.name = 'Spray Paint';
        this.fillColor = color;
        this.density = density;
        this.spots = [];
    }
    //Adds point to free form line
    AddPoints(pointx, pointy) {
        var now = Date.now();
        if (lastUpdate <= (now - delay)){
            lastUpdate = now;
            this.Spray(pointx, pointy);
        }
    }
    //Draws free form line on canvas
    Draw(context) {
        context.save();
        context.lineJoin = context.lineCap = 'round';
        context.fillStyle = this.fillColor;
        // loop through all of the spots.
        for (var pointIndex = 0; pointIndex < this.spots.length; pointIndex++) {
            var spot = this.spots[pointIndex];
            context.globalAlpha = spot['alpha'];
            context.fillRect(spot['xPos'], spot['yPos'], spot['width'], spot['height']);
        }
        // Restore the context so that any global alpha calls get reset.
        context.restore();
    }
    /**
     * Returns true if the x,y is within the shape.
     * @Contains
     */
    Contains(x, y) {return false;}
    /**
     * Draws the selection box aroud the shape.
     * @DrawBox
     */
    DrawBox(context) {}
    /**
     * Moves the object around the canvas.
     * @Move
     */
    Move(x, y) {}
    /**
     * Called everytime the mouse moves over the canvas.
     * @MouseMove
     */
    MouseMove(x, y) {}
    /**
     * Adds random spray points to the list.
     * @Spray
     */
    Spray(x, y) {
        for (var i = this.density; i--;) {
            var angle = getRandomFloat(0, Math.PI * 2);
            var radius = getRandomFloat(0, 30);
            var xPos = (x + radius * Math.cos(angle)).toFixed(3);
            var yPos = (y + radius * Math.sin(angle)).toFixed(3);
            var width = getRandomFloat(1, 2).toFixed(5);
            var height = getRandomFloat(1, 2).toFixed(5);
            var alpha = Math.random().toFixed(3);

            this.spots.push({xPos, yPos, width, height, alpha});
        }
    }
}

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

export { SprayPaintLine };
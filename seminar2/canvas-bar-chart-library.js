class BarChart {
    
    /**
     * The canvas on which the bar chart will be displayed
    */
    #canvas;

    /**
     * Construts a new instance
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas){
        this.#canvas = canvas;
    }

    /**
     * Draws the bar chart
     * @param {Array<number>} values 
     */
    draw(values){
        //gives the API so we can make our graph 
        const context = this.#canvas.getContext('2d');

        //defines what color the canvas will be fullfilled with
        context.fillStyle = '#DEDEDE';

        //fullfills the entire canvas with the pre-defined color  
        context.fillRect(0, 0, this.#canvas.width, this.#canvas.height);

        //get the max value of the array values, so we can use later to create bars on the graph
        const maxValue = Math.max(...values);

        //calculates the scalar vector so we can have a unity of height
        const f = this.#canvas.height / maxValue;

        //the same as before but with width
        const barWidth = this.#canvas.width / values.length;   

        //defines the width of the line that countors the bars 
        context.lineWidth = 2;
        //defines the color of the above contors
        context.strokeStyle = 'darkred';

        //context.textAlign = 'center';

        //a loop to iterate through all the Array's value
        for(let i = 0; i < values.length; i++){

            //defines the bar colors to red
            context.fillStyle = 'red'; // #FF0000

            // calculates the x position of the actual bar 
            const barX = i * barWidth;

            //calculates the height of each bar since f is the height unity and 0.9 is to reduce to 10% so we never go beyond the graph
            const barHeight = values[i] * f * 0.9;

            //calculates the space between the bar height and the canvas height so we can use the remaining space, using this as the height, we are inverting the graph to look like the leftover is actually the bar height
            const barY = this.#canvas.height - barHeight;

            //x coordanates + some space to not be "glued" to the left side of the screen, y coordanates, width of the bar, barwidth, barheight
            context.fillRect(barX + barWidth / 4, barY, barWidth / 2, barHeight);

            //draws a contor around the bar, uses the same coordenates
            context.strokeRect(barX + barWidth / 4, barY, barWidth / 2, barHeight)

            //defined the text color to black
            context.fillStyle = 'black';

            //context.fillText(values[i], barX + barWidth /2 , this.#canvas.height - 20);

            //drwas the text
            context.fillText(
                //the value that will be drew
                values[i], 
                //position the text in the center of the bar and adjustes with that - to actually be there aways indenpendently of the bar
                barX + barWidth /2 - context.measureText(values[i]).width / 2 ,

                //positions the text a little bit above the inferior part of the graph
                this.#canvas.height - 20
            );
        }
    }
}
export class BarChart {
    
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
     * @param {Object} options
     */
    draw(values, options){
        const context = this.#canvas.getContext('2d');
        context.fillStyle = '#DEDEDE';
        context.fillRect(0, 0, this.#canvas.width, this.#canvas.height);

        const maxValue = Math.max(...values);
        const f = this.#canvas.height / maxValue;

        const barWidth = this.#canvas.width / values.length;   
        context.lineWidth = 2;
        context.strokeStyle = 'darkred';
        //context.textAlign = 'center';

        for(let i = 0; i < values.length; i++){
            context.fillStyle = 'red'; // #FF0000
            const barX = i * barWidth;

            const barHeight = values[i] * f * 0.9;

            const barY = this.#canvas.height - barHeight;

            context.fillRect(barX + barWidth / 4, barY, barWidth / 2, barHeight);

            if(options.drawOutline)
                context.strokeRect(barX + barWidth / 4, barY, barWidth / 2, barHeight)

            context.fillStyle = 'black';
            
            if(options.drawLabels)
                context.fillText(
                    values[i], 
                    barX + barWidth /2 - context.measureText(values[i]).width / 2 ,
                    this.#canvas.height - 20);
            //context.fillText(values[i], barX + barWidth /2 , this.#canvas.height - 20);
           
        }
    }
}
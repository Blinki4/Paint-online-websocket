import Tool from "./Tool";

export default class Rect extends Tool {
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.listen()
    }


    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(event) {
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'rect',
                x: this.startX,
                y: this.startY,
                width: this.width,
                height: this.height,
                color: this.context.fillStyle
            }
        }))
    }

    mouseDownHandler(event) {
        this.mouseDown = true
        this.context.beginPath()
        this.startX = event.pageX - event.target.offsetLeft
        this.startY = event.pageY - event.target.offsetTop
        this.saved = this.canvas.toDataURL()
    }

    mouseMoveHandler(event) {
        if (this.mouseDown) {
            let currentX = event.pageX - event.target.offsetLeft;
            let currentY = event.pageY - event.target.offsetTop;
            this.height = currentY - this.startY;
            this.width = currentX - this.startX;
            this.draw(this.startX, this.startY, this.width, this.height)
        }
    }


    draw(x, y, width, height) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.context.beginPath()
            this.context.rect(x, y, width, height)
            this.context.fill()
            this.context.stroke()
        }
    }

    static staticDraw(context, x, y, width, height, color) {
        context.fillStyle = color
        context.beginPath()
        context.rect(x, y, width, height)
        context.fill()
        context.stroke()
    }

}


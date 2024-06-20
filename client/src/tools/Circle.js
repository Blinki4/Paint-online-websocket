import Tool from "./Tool";

export default class Circle extends Tool {
    constructor(canvas) {
        super(canvas);
        this.listen()
    }


    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(event) {
        this.mouseDown = false
    }

    mouseDownHandler(event) {
        this.mouseDown = true
        this.context.beginPath()
        this.startX = event.pageX - event.target.offsetLeft
        this.startY = event.pageY - event.target.offsetTop
        this.saved = this.canvas.toDataURL()
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let currentX = e.pageX - e.target.offsetLeft
            let currentY = e.pageY - e.target.offsetTop
            let width = currentX - this.startX
            let height = currentY - this.startY
            let r = Math.sqrt(width ** 2 + height ** 2)
            this.draw(this.startX, this.startY, r)
        }
    }

    draw(x, y, r) {
        const img = new Image()
        img.src = this.saved
        img.onload = async function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.context.beginPath()
            this.context.arc(x, y, r, 0, 2 * Math.PI)
            this.context.stroke()
        }.bind(this)
    }
}
import {makeAutoObservable} from "mobx";

class CanvasState {

    canvas = null
    socket = null
    sessionId = null
    undoList = []
    redoList = []
    username = ''

    constructor() {
        makeAutoObservable(this)
    }

    setCanvas(canvas) {
        this.canvas = canvas
    }

    setSocket(socket) {
        this.socket = socket
    }

    setSessionId(sessionId) {
        this.sessionId = sessionId
    }

    setUsername(username) {
        this.username = username
    }

    pushToUndo(data) {
        this.undoList.push(data)
    }

    pushToRedo(data) {
        this.redoList.push(data)
    }

    undo() {
        let context = this.canvas.getContext('2d')
        if (this.undoList.length > 0) {
            let dataUrl = this.undoList.pop()
            this.redoList.push(this.canvas.toDataURL())
            let image = new Image()
            image.src = dataUrl
            image.onload = () => {
                context.clearRect(0, 0, this.canvas.width, this.canvas.height)
                context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height)
            }
        } else {
            context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }


    redo() {
        let context = this.canvas.getContext('2d')
        if (this.redoList.length > 0) {
            let dataUrl = this.redoList.pop()
            this.undoList.push(this.canvas.toDataURL())
            let image = new Image()
            image.src = dataUrl
            image.onload = () => {
                context.clearRect(0, 0, this.canvas.width, this.canvas.height)
                context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height)
            }
        }
    }
}


export default new CanvasState()
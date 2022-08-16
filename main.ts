class DrawingApp {
    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D
    private paint: boolean

    private clickX: number[] = []
    private clickY: number[] = []
    private clickDrag: boolean[] = []

    constructor() {
        let canvas = document.getElementById('canvas') as HTMLCanvasElement
        let context = canvas.getContext('2d') as CanvasRenderingContext2D

        context.lineCap = 'round'
        context.lineJoin = 'round'
        context.strokeStyle = 'black'
        context.lineWidth = 1

        this.canvas = canvas
        this.context = context
        
        this.redraw()
        this.createUserEvents()
    }

    private createUserEvents() {
        let canvas = this.canvas

        canvas.addEventListener('mousedown', this.pressEventHandler)
        canvas.addEventListener('mousemove', this.dragEventHandler)
        canvas.addEventListener('mouseup', this.releaseEventHandler)
        canvas.addEventListener('mouseout', this.cancelEventHandler)

        document.getElementById('clear')
                ?.addEventListener('click', this.clearEventHandler)
    }

    private redraw() {
        let clickX = this.clickX
        let context = this.context
        let clickDrag = this.clickDrag
        let clickY = this.clickY
        for (let i = 0; i < clickX.length; i++) {
            context.beginPath()
            if (clickDrag[i] && i) {
                context.moveTo(clickX[i - 1], clickY[i - 1])
            } else {
                context.moveTo(clickX[i] - 1, clickY[i])
            }

            context.lineTo(clickX[i], clickY[i])
            context.stroke()
        }

        context.closePath()
    }

    private addClick(x: number, y: number, dragging: boolean) {
        this.clickX.push(x)
        this.clickY.push(y)
        this.clickDrag.push(dragging)
    }

    private clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.clickX = []
        this.clickY = []
        this.clickDrag = []
    }

    private clearEventHandler = () => { this.clearCanvas() }

    private releaseEventHandler = () => { this.paint = false; this.redraw(); }

    private cancelEventHandler = () => { this.paint = false }

    private pressEventHandler = (e: MouseEvent) => {
        let mouseX = e.pageX
        let mouseY = e.pageY

        mouseX -= this.canvas.offsetLeft
        mouseY -= this.canvas.offsetTop

        this.paint = true
        this.addClick(mouseX, mouseY, false)
        this.redraw()
    }

    private dragEventHandler = (e: MouseEvent) => {
        let mouseX = e.pageX
        let mouseY = e.pageY

        mouseX -= this.canvas.offsetLeft
        mouseY -= this.canvas.offsetTop

        if (this.paint) {
            this.addClick(mouseX, mouseY, true)
            this.redraw()
        }

        e.preventDefault()
    }
}

new DrawingApp()


let domtoimage: any;

let tableNode = document.getElementById("test") as HTMLElement;
let pusheenNode = document.getElementById("pusheen") as HTMLElement;
let canvasNode = document.getElementById('canvas') as HTMLCanvasElement

let tableOutput = document.getElementById("png-table");
let pusheenOutput = document.getElementById("png-pusheen");
let canvasOutput = document.getElementById('canvas-output')

domtoimage.toPng(tableNode).then((dataUrl) => {
  let img = new Image();
  img.src = dataUrl;
  if (tableOutput) {
    tableOutput.appendChild(img);
  }
});

domtoimage.toPng(pusheenNode).then((dataUrl) => {
  let img = new Image();
  img.src = dataUrl;
  if (pusheenOutput) {
    pusheenOutput.append(img);
  }
});

let canvasToPngButton = document.getElementById('canvas-to-png') as HTMLButtonElement
canvasToPngButton.onclick = (e: MouseEvent) => {
    domtoimage.toPng(canvasNode).then((dataUrl) => {
        let img = new Image()
        img.src = dataUrl
        if (canvasOutput) {
            canvasOutput.append(img)
        }
    })
}
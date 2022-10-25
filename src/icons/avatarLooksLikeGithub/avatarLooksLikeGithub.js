const md5 = require("md5");

class pixel {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = 32;
    }

    fill(color) {
        this.color = color;
    }
}

class binaryColorPixelMatrix {
    constructor(width, height, backgroundColor) {
        this.width = width*32;
        this.height = height*32;
        this.backgroundColor = backgroundColor || "#f2f1f2"
        this.matrix = new Array(height);
        for(let i = 0; i < height; i++) {
            let arr = new Array(width);
            for(let j = 0; j < width; j++)
                arr[j] = new pixel(i*32, j*32, backgroundColor);
            this.matrix[i] = arr;
        }
    }

    fill(x, y, color) {
        this.matrix[x][y].fill(color);
    }

    getRect(x, y, width, height, color, id) {
        let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        if(id !== undefined)
            rect.setAttribute("id", id);
        rect.setAttribute("x", x);
        rect.setAttribute("y", y);
        rect.setAttribute("width", width);
        rect.setAttribute("height", height);
        rect.setAttribute("fill", color);
        rect.setAttribute("stroke", color);
        rect.setAttribute("stroke-width", 2);
        return rect;
    }

    useRect(x, y, id) {
        let useRect = document.createElementNS("http://www.w3.org/2000/svg", "use");
        useRect.setAttribute("href", id);
        useRect.setAttribute("x", x);
        useRect.setAttribute("y", y);
        return useRect;
    }

    getShapesArray() {
        let shapesArray = [];
        shapesArray.push(
            this.getRect(0, 0, this.width, this.height, this.backgroundColor));
        let firstPixel = true;
        let startX = 0;
        let startY = 0;
        this.matrix.forEach(line => {
            line.forEach(item => {
                if(item.color === this.backgroundColor)
                    return;
                if(firstPixel) {
                    shapesArray.push(
                        this.getRect(item.x, item.y, item.size, item.size, item.color, "frs"));
                    firstPixel = false;
                    startX = item.x;
                    startY = item.y;
                }
                shapesArray.push(
                    this.useRect(item.x - startX, item.y - startY, "#frs"));
            })
        })

        return shapesArray;
    }

    getSvg() {
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("viewBox", `0 0 ${this.width} ${this.height}`);
        this.getShapesArray().forEach(pixel => {
            svg.appendChild(pixel);
        })
        return svg;
    }

    getSvgBase64() {
        let xml = new XMLSerializer().serializeToString(this.getSvg())
        return btoa(xml)
    }
}

export class avatarLooksLikeGithub {
    constructor (login, backgroundColor) {
        this.backgroundColor = backgroundColor || "#f2f1f2";
        this.newMatrix = new binaryColorPixelMatrix(12, 12, this.backgroundColor);
        let loginMD5 = md5(login);
        let binBytesArray = [];
        for(let i = 0; i < loginMD5.length; i+=2)
            binBytesArray.push(parseInt(loginMD5.slice(i, i+2), 16))

        let mainColor = "#"
        binBytesArray.slice(0,3).forEach((item) => {
            mainColor += (Math.floor(item / 2) + 128).toString(16);
        })

        let needColor = binBytesArray.slice(3, 12);
        let binString = "";
        needColor.forEach(item => {
            let binaryItem = item.toString(2);
            binString += "00000000".slice(binaryItem.length) + binaryItem;
        })

        for(let i = 0; i < binString.length; i++)
            if(binString[i] === "1")
            {
                let x = Math.floor(i/12)
                let y = i%12
                if(x === 0 || y === 0 || y === 11)
                    continue;
                this.newMatrix.fill(x, y, mainColor)
                this.newMatrix.fill(11 - x, y, mainColor)
            }
    }

    getMatrix() {
        return this.newMatrix
    }
}
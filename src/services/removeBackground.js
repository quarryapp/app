// @flow

const TOLERANCE = 64;

export default (image: HTMLImageElement) => {
    let canvas: HTMLCanvasElement = (document.querySelector('#backgroundProcessor'): any);
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'backgroundProcessor';
        canvas.style.display = 'none';
        if(document.body) {
            document.body.appendChild(canvas);
        } else {
            throw new DOMError();
        }
    }

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    
    const context: CanvasRenderingContext2D = (canvas.getContext('2d'): any);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const { data } = imageData;
    const bgColor = data.slice(0, 4);
    const fillColor = [0, 0, 0, 0];

    for (let i = 0; i < data.length; i += 4) {
        let currentColor = [data[i], data[i + 1], data[i + 2], data[i + 3]];
        const range = [0, 1, 2, 3];
        const doesntMatchBackground = !range.every(index =>
            currentColor[index] >= (bgColor[index] - TOLERANCE) &&
            currentColor[index] <= (bgColor[index] + TOLERANCE)
        );
        if (doesntMatchBackground) {
            continue;
        }
        
        for (let index of range) {
            data[i + index] = fillColor[index];
        }
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
};

// @flow

const TOLERANCE = 64;
const enableDebugging = false;

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
    const bgFillColor = [0, 0, 0, 0];
    const fgFillColor = [255, 255, 255, 255];
    const bgIsAlpha = bgColor[3] === 0;
    
    enableDebugging && console.groupCollapsed(image.alt);
    enableDebugging && console.log('bgColor', bgColor, 'bgIsAlpha', bgIsAlpha, 'bgFillColor', bgFillColor, 'fgFillColor', fgFillColor);

    for (let i = 0; i < data.length; i += 4) {
        let currentColor = [data[i], data[i + 1], data[i + 2], data[i + 3]];
        const range = [0, 1, 2, 3];
        const doesntMatchBackground = !range.every(index =>
            currentColor[index] >= (bgColor[index] - TOLERANCE) &&
            currentColor[index] <= (bgColor[index] + TOLERANCE)
        );
        if (doesntMatchBackground) {
            const destColor = data[i] + data[i + 1] + data[i + 2];
            const targetColor = bgColor[0] + bgColor[1] + bgColor[2];
            
            for (let index of range) {
                if(index === 3) {
                    const debug = enableDebugging && i % 10000 === 0;
                    debug && console.log('random sampler!', i, 'bgIsAlpha', bgIsAlpha);
                    if(bgIsAlpha) {
                        debug && console.log('ALPHA untouched');
                        // leave alpha channel untouched
                        continue;
                    } else {
                        let diff = targetColor - destColor;
                        debug && console.log('diff', diff);
                        if(diff > 0) {
                            diff = Math.round(175 + (diff / (255 * 4) * 80));
                            debug && console.log('ALPHA SET TO ', diff);
                            data[i + index] = diff; 
                            continue;
                        }
                    }
                }
                data[i + index] = fgFillColor[index];
            }
        } else {
            for (let index of range) {
                data[i + index] = bgFillColor[index];
            }
        }
    }
    
    enableDebugging && console.groupEnd();
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
};

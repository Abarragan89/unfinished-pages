export const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues
        image.src = url;
    });

export interface PixelCrop {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface FlipOptions {
    horizontal: boolean;
    vertical: boolean;
}

export default async function getCroppedImg(
    imageSrc: string,
    pixelCrop: PixelCrop,
): Promise<string | null> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        return null;
    }

    // Set canvas dimensions to match the crop area
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // Draw the cropped area of the image onto the canvas
    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    // Convert the canvas to a Blob or Data URL
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(URL.createObjectURL(blob));
            } else {
                reject(new Error('Failed to create blob from cropped canvas'));
            }
        }, 'image/jpeg');
    });
}


const Jimp = require('jimp');

async function processImage() {
    try {
        const bgWhite = new Jimp(256, 256, 0xffffffff);
        const image = await Jimp.read('assets/favicon.png');
        
        // Autocrop trims transparent borders
        image.autocrop();
        
        // After trimming, let's make it a square or resize if needed, but autocrop is usually enough.
        // Or we can scale it to fit precisely at 256x256
        image.contain(256, 256, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
        
        await image.writeAsync('assets/favicon.png');
        console.log("Success: Cropped and resized favicon.png");
    } catch (err) {
        console.error("Error processing image:", err);
    }
}

processImage();

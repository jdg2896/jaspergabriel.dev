---
title: "How to Reliably Read QR Codes in Node.js"
description: "Implement a production-ready QR code decoder in Node.js using jsQR and Jimp instead of unmaintained alternatives."
pubDate: 2023-11-04
tags: ["tech", "nodejs"]
originalUrl: "https://dev.to/jdg2896/how-to-reliably-read-qr-codes-in-nodejs-502i"
---


## Introduction

In today's digital landscape, QR codes are widely used. Thanks to the QR code's efficiency in storing and reading data, you can see QR codes being used in restaurants, public transportation, app downloads, survey forms, and a whole lot of other applications. 

Reading QR codes is usually handled by frontend applications via scanners or image uploads, but if you need a way to read QR codes in the backend, then you've come to the right place!

## Why I made this blog post

I was figuring out how to read QR codes in Node.js, so I've tried following existing guides from [LogRocket](https://blog.logrocket.com/create-read-qr-codes-node-js/) and [GeeksforGeeks](https://www.geeksforgeeks.org/reading-qr-codes-using-node-js/). They both had similar solutions using [qrcode-reader](https://www.npmjs.com/package/qrcode-reader). 

Upon testing the solution multiple times, I've encountered [occasional bugs](https://github.com/edi9999/jsqrcode/issues/65) with `qrcode-reader`, which made it unsuitable for production workloads. 

The `qrcode-reader` package is [no longer maintained](https://github.com/edi9999/jsqrcode/issues/32#issuecomment-575042561) and the owner recommended [jsqr](https://www.npmjs.com/package/jsqr) as an alternative, which is what we're going to use.

## QR Code Reader Solution

Now let's walk through the solution for reading QR codes in Node.js. You can follow along or check the sample repository [here](https://github.com/jdg2896/qrcode-decoder-nodejs).

### Installing Jimp and jsQR

For the npm packages, we'll be using [jimp](https://www.npmjs.com/package/jimp) for the image loader and [jsqr](https://www.npmjs.com/package/jsqr) for the QR code reader.

`npm install jimp jsqr`

### TypeScript Code (src/app.ts)

The sample QR code `src/qr.png` is in the [sample repository](https://github.com/jdg2896/qrcode-decoder-nodejs). You can also replace `src/qr.png` and use any QR code image if you want. 
```ts
import Jimp from 'jimp';
import jsQR from 'jsqr';

const decodeQR = async (): Promise<string> => {
    try {
        // Load the image with Jimp
        const image = await Jimp.read('src/qr.png');

        // Get the image data
        const imageData = {
            data: new Uint8ClampedArray(image.bitmap.data),
            width: image.bitmap.width,
            height: image.bitmap.height,
        };

        // Use jsQR to decode the QR code
        const decodedQR = jsQR(imageData.data, imageData.width, imageData.height);

        if (!decodedQR) {
            throw new Error('QR code not found in the image.');
        }

        return decodedQR.data;
    } catch (error) {
        console.error('Error decoding QR code:', error);
    }
}

// Test the decodeQR() function
const run = async () => {
    console.log(await decodeQR());
}

run();

```

> **Optional:** If you need to read base64 string QR codes, replace the `Jimp.read()` function with this.
> ```ts
> const base64 = 'data:image/png;base64,iVBORw0KGgo...' // replace with your base64 string
> const qrBuffer = Buffer.from(base64.replace(/^data:image\/[a-z]+;base64,/, ''), 'base64');
> const image = await Jimp.read(qrBuffer);
> ```

### Testing the Code

To test the solution, you can build and start the function, which will retrieve the data from the `src/qr.png` image file.
```zsh
npm build (or tsc)
npm start (or node src/app.ts)

> qrcode-decoder-nodejs@1.0.0 start
> node src/app.js

Sample QR code data for testing.
```
As you can see, we decoded the data and received `"Sample QR code data for testing."`.

## Conclusion

To recap, we implemented a QR code reader in Node.js using [jimp](https://www.npmjs.com/package/jimp) and [jsqr](https://www.npmjs.com/package/jsqr). We also tested the `decodeQR()` function, which decoded the sample QR image. Also, here's the [sample repository](https://github.com/jdg2896/qrcode-decoder-nodejs) with the code shown in this guide if you've missed it.

I hope this helped you with implementing a QR code reader in Node.js. Thank you for reading, and feel free to connect with me on [X](https://x.com/jdg2896) and [LinkedIn](https://www.linkedin.com/in/jaspergabriel/).




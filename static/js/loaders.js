//圖片載入函數
function loadImage(url) {
    return new Promise(resolve =>{
        const image = new Image();
        image.addEventListener('load', () =>{
            //setTimeout(resolve, 2000, image);
            resolve(image);
        });
        image.src = url;
    });
}

function loadJSON(url) {
    return fetch(url)
    .then(r => r.json());
}

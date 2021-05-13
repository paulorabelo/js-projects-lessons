console.log('[PauloRabeloDev] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 23,
    x: 10,
    y: 50,
    desenha(){
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY, // Posição do Sprite x, y
            flappyBird.largura, flappyBird.altura, // Tamanho do recorte na Sprite
            flappyBird.x, flappyBird.y, // Posição no Canvas
            flappyBird.largura, flappyBird.altura, // Tamanho no Canvas
            );

    }
}


function loop() {
        flappyBird.desenha();    
    
        requestAnimationFrame(loop);
    }
    
    loop();
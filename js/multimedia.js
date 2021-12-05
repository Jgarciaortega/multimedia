
function init() {

    bannerActivo = false;
    contadorSeg = 5;

    video = document.querySelector('video');
    document.getElementById('play').addEventListener('click', runVideo);
    document.getElementById('reiniciar').addEventListener('click', reiniciar);
    document.getElementById('mute').addEventListener('click', mutear);
    document.getElementById('volUp').addEventListener('click', modificarVolumen);
    document.getElementById('volDown').addEventListener('click', modificarVolumen);
    document.getElementById('rew').addEventListener('click', modificarTiempo);
    document.getElementById('for').addEventListener('click', modificarTiempo);

    let videos = document.querySelectorAll('video');

    videos.forEach(video => {
        //Se anyade evento de click a todos los videos excepto el que este en reproduccion
        if (video.id != 'enReproduccion') video.addEventListener('click', changeVideo);
        actualizarFrame(video);
    });

    document.getElementById('display').addEventListener('mouseover', mostrarBotonera);
    document.getElementById('display').addEventListener('mouseout', quitarBotonera);

    crearBanner();
}


/* CODIGO BOTONERA DESPLEGABLE */

function quitarBotonera() {

    if (!bannerActivo) this.lastElementChild.classList.remove('controlVisible');

}

function mostrarBotonera() {

    if (!bannerActivo) this.lastElementChild.classList.add('controlVisible');

}

/****************************/

function cuentaAtras() {

    let banner = document.getElementById('banner');
    let cuentaAtras;

    if (contadorSeg == 5) {

        cuentaAtras = document.createElement('div');
        cuentaAtras.setAttribute('id', 'cuentaAtras');

    } else {

        cuentaAtras = document.getElementById('cuentaAtras');
    }

    cuentaAtras.innerHTML = contadorSeg;
    banner.appendChild(cuentaAtras);

    //Mientras no lleguen a -1 descuenta segundos...
    if (contadorSeg > -1) {

        contadorSeg -= 1;
        setTimeout("cuentaAtras(" + contadorSeg + ")", 1000);

        //...al acabar cuenta atras borra cuenta atras y muestra cierre ventana        
    } else {

        banner.removeChild(cuentaAtras);
        muestraCierreBanner();
    }

}

function crearBanner() {

    let banner = document.createElement('div');
    banner.setAttribute('id', 'banner');
    let p = document.createElement('p');
    let textBanner = document.createTextNode('Ponga aquí su publicidad');

    banner.setAttribute('id', 'banner');
    p.setAttribute('id', 'textBanner');
    p.appendChild(textBanner);
    banner.appendChild(p);
    document.getElementById('display').appendChild(banner);

    if (!bannerActivo) {

        bannerActivo = true;
        cuentaAtras();
    }

}

function muestraCierreBanner() {

    let banner = document.getElementById('banner');
    let botonCierre = document.createElement('button');

    botonCierre.setAttribute('id', 'cerrarBanner');
    botonCierre.innerHTML = "X";
    botonCierre.addEventListener('click', quitarBanner);
    banner.appendChild(botonCierre);

}

function quitarBanner() {

    let nodoDisplay = document.getElementById('display');
    let nodoBanner = nodoDisplay.lastChild;

    nodoDisplay.removeChild(nodoBanner);
    bannerActivo = false;

    runVideo();
    contadorSeg = 5;

}

//Para mostrar algo de imagen adelanto un poco el tiempo de los videos
function actualizarFrame(video) {

    video.currentTime += 2;
}

//Funcion que intercambia el video por otro del navegador de la derecha
function changeVideo() {
   
    if (!bannerActivo) {

        //Si previamente el video esta play lo detengo
        if(videoRunning){
            video.pause();
            videoRunning = false;
            document.getElementById('pause').setAttribute('id', 'play');
        }
      
        //Tengo los dos videos (en reproduccion y seleccionado)
        let videoPpal = document.getElementById('enReproduccion');
        let videoSec = this;

        //Localizo sus url
        let urlPpal = videoPpal.childNodes[1].src;
        let urlSec = videoSec.childNodes[1].src;

        //Intercambio entre ellos las url
        videoPpal.childNodes[1].setAttribute('src', urlSec);
        videoSec.childNodes[1].setAttribute('src', urlPpal);

        //Cargo los video 
        videoPpal.load();
        videoSec.load();

        //Los adelanto un poco para visualizar algo de imagen
        actualizarFrame(videoPpal);
        actualizarFrame(videoSec);

        crearBanner();
    }
}



function modificarTiempo() {

    if (!bannerActivo) {

        if (this.id == 'rew') video.currentTime -= 10;
        if (this.id == 'for') video.currentTime += 10;
    }
}
//PLAY / PAUSE
function runVideo() {

     console.log(video.duration);
    if (!bannerActivo) {

        if (!videoRunning) {

            videoRunning = true;
            video.play();
            document.getElementById('play').setAttribute('id', 'pause');

        } else {

            videoRunning = false;
            video.pause();
            document.getElementById('pause').setAttribute('id', 'play');
        }

       
    }
}
function mutear() {

    if (!bannerActivo) {

        if (video.muted) video.muted = false;
        else video.muted = true;

    }
}
function reiniciar() {

    if (!bannerActivo) {

        videoRunning = false;
        video.load();
        play();
    }

}
function modificarVolumen() {

    if (!bannerActivo) {

        //TODO Tratar la excepcion de index size volume
        if (this.id == 'volUp' && video.volume < 1) video.volume += 0.1;

        if (this.id == 'volDown' && video.volume > 0) video.volume -= 0.1;
    }

}

//VARIABLES GLOBALES
let videoRunning = false;
let video;
let bannerActivo;
let contadorSeg;

window.onload = init;
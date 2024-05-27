/**
* Code to change img dimensions to fit better to page
* 
* Date:   27 April 2018
* Author: Bradley Aiken
*/

//Crop banner when the width of the page is too small
var img = document.getElementById('pejzagxo');
function resizeBanner() {
	if (window.innerWidth > 600) {
		img.src = "pejzagxo.png"
	}
	else {
		img.src = "pejzagxoMalgranda.png";
	}
}
setInterval(resizeBanner, 1);

//Make every image exactly square
var galleryImgs = document.getElementsByClassName("galleryImg");
function makeSquare() {
	for (i=0; i < galleryImgs.length; i++) {
		galleryImgs[i].style.height = galleryImgs[i].width + "px";
	}
}
setInterval(makeSquare, 1);
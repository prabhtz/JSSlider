(function() {

var slider = document.getElementsByClassName("slider-container")[0];
var image = document.getElementsByTagName("img");
var images = document.getElementsByClassName("images")[0];
var interval;
var maxWidth = 0;
var pause;
var imgCount = 0;
var left = true;
var margin = 0;
var offset = 0;
var preserveImgCount = 0;
var activeBullets = 'url("images/bullet-active.png")';
var passiveBullets = 'url("images/bullet-passive.png")';
var bulletsArray = [];


for (var i = 0; i < image.length; i++) {
    image[i].style = "margin-left: " + (i * 640) + "px;";
}

var leftDiv = document.createElement("div");
var rightDiv = document.createElement("div");
var spanDiv = document.createElement("div");

leftDiv.className = "left-arrow";
rightDiv.className = "right-arrow";

for (var i = 0; i < image.length; i++) {
    var bullets = document.createElement("span");
    bullets.onclick = (function(pos) {
        return function() {
            clearInterval(interval);
            images.style = "margin-left: -" + (pos * 640) + "px;";
            imgCount = pos;
            // updateBullets(pos);
          	clearInterval(interval);
          	hold();
        }
    })(i);
    spanDiv.appendChild(bullets);
    bulletsArray.push(bullets);
}

spanDiv.setAttribute("class", "bullet-nav");
slider.appendChild(spanDiv);
slider.appendChild(leftDiv);
slider.appendChild(rightDiv);
console.log(leftDiv);


slider.onmouseover = function() {
    leftDiv.style.display = "block";
    rightDiv.style.display = "block";
}

slider.onmouseout = function() {
    leftDiv.style.display = "none";
    rightDiv.style.display = "none";
}

leftDiv.addEventListener("click", function() {
    clearInterval(interval);
    leftShift();
});

rightDiv.addEventListener("click", function() {
    clearInterval(interval);
    rightShift();
});

document.onkeydown = checkKey;

function checkKey(event) {
	if (event.keyCode == 37) {
		clearInterval(interval);
		leftShift();
	}
	if (event.keyCode == 39) {
		clearInterval(interval);
		rightShift();
	}
}
	
function leftShift() {

    offset = 0;
    imgCount -= 1;
    margin = getComputedStyle(images).getPropertyValue("margin-left").split('px')[0];

    offset = parseInt(margin) + imgCount * 640;
    margin -= offset;
    images.style = "margin-left: " + margin + "px;";
    updateBullets(imgCount);

    if (imgCount < 0) {
        margin = -(((image.length) * getComputedStyle(image[0]).getPropertyValue("width").split('px')[0]) - 640);
        images.style = "margin-left: " + margin + "px;";
        maxWidth = 0;
        imgCount = image.length - 1;
        console.log(imgCount);
        setTimeout(function() {
            left = false;
            hold();
        }, 1000);
    }
}

function rightShift() {

    offset = 0;
    imgCount += 1;

    margin = getComputedStyle(images).getPropertyValue("margin-left").split('px')[0];
    offset = parseInt(margin) + imgCount * (640);
    margin -= offset;
    images.style = "margin-left: " + margin + "px;";

    updateBullets(imgCount);

    if (imgCount > image.length - 1) {
        maxWidth = margin;
        images.style = "margin-left: 0px";
        imgCount = 0;
        setTimeout(function() {
            left = true;
            hold();
        }, 1000);

    }

}

function leftSlide() {
    left = true;
    margin = getComputedStyle(images).getPropertyValue("margin-left").split('px')[0];
    margin = parseInt(margin);
    margin -= 8;
    images.style = "margin-left: " + margin + "px;";
    if (margin % 640 == 0) {
        imgCount += 1;
        hold();
    }

    if (imgCount == image.length - 1) {
        maxWidth = margin;
        rightSlide();
    }
}

function rightSlide() {
    left = false;
    margin += 8;
    images.style = "margin-left: " + margin + "px;"
    if (margin % 640 == 0) {
        imgCount -= 1;
        hold();
    }

    if (imgCount == 0) {
        maxWidth = 0;
        leftSlide();
    }
}

function slide() {
    clearInterval(interval);
    if (left) {
        interval = setInterval(leftSlide, 20);
    } else {
        interval = setInterval(rightSlide, 20);
    }
}

function hold() {
    clearInterval(interval);
    updateBullets(imgCount);
    setTimeout(slide, 1000);
}

var updateBullets = function(pos) {
    clearBullets();
    if (pos < bulletsArray.length && pos >= 0) {
        bulletsArray[pos].style.backgroundImage = activeBullets;
    }
}

var clearBullets = function() {
    for (i = 0; i < bulletsArray.length; i++) {
        bulletsArray[i].style.backgroundImage = passiveBullets;
    }
}


hold();


})();
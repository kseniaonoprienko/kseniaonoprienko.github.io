const images = [
    "images/showreel_still_1.jpg",
    "images/showreel_still_2.jpg",
    "images/showreel_still_3.jpg",
    "images/showreel_still_4.jpg",
    "images/showreel_still_5.jpg",
    "images/showreel_still_6.jpg",
    "images/showreel_still_7.jpg",
    "images/showreel_still_8.jpg",
    "images/showreel_still_9.jpg",
    "images/showreel_still_10.jpg",
    "images/showreel_still_11.jpg",
    "images/showreel_still_12.jpg",
    "images/showreel_still_13.jpg",
    "images/showreel_still_14.jpg",
    "images/showreel_still_15.jpg",
    "images/showreel_still_16.jpg",
    "images/showreel_still_17.jpg",
    "images/showreel_still_18.jpg",
    "images/showreel_still_19.jpg",
    "images/showreel_still_20.jpg",
    "images/showreel_still_21.jpg",
    "images/showreel_still_22.jpg",
    "images/showreel_still_23.jpg",
    "images/showreel_still_24.jpg",
    "images/showreel_still_25.jpg",
    "images/showreel_still_26.jpg",
    "images/showreel_still_27.jpg",
    "images/showreel_still_28.jpg"
];

images.forEach(function(image) {
    const preload = new Image();
    preload.src = image;
});

const home = document.querySelector(".home");

if (home) {

    let currentImage = Math.floor(Math.random() * images.length);

    home.style.backgroundImage =
        `url("${images[currentImage]}")`;

    let imageHistory = [currentImage];

    let lastMouseX = 0;
    let lastMouseY = 0;

    const movementThreshold = 250;
    const cooldown = 4;

    document.addEventListener("mousemove", function(event) {

        const distanceX = Math.abs(event.clientX - lastMouseX);
        const distanceY = Math.abs(event.clientY - lastMouseY);

        if (
            distanceX > movementThreshold ||
            distanceY > movementThreshold
        ) {

            let availableImages = [];

            for (let i = 0; i < images.length; i++) {

                if (!imageHistory.includes(i)) {
                    availableImages.push(i);
                }

            }

            let newImage =
                availableImages[
                    Math.floor(Math.random() * availableImages.length)
                ];

            currentImage = newImage;

            home.style.backgroundImage =
                `url("${images[currentImage]}")`;

            imageHistory.push(currentImage);

            if (imageHistory.length > cooldown) {
                imageHistory.shift();
            }

            lastMouseX = event.clientX;
            lastMouseY = event.clientY;
        }
    });
}

const graphicDesign = document.querySelector(".graphicdesign");

if (graphicDesign) {

    const slides = document.querySelectorAll(".graphic-slide");

    let currentSlide = 0;
    let isChanging = false;

    function changeSlide(direction) {

        if (isChanging) {
            return;
        }

        let nextSlide = currentSlide + direction;

        // Loop from last image to first
        if (nextSlide >= slides.length) {
            nextSlide = 0;
        }

        // Loop from first image to last
        if (nextSlide < 0) {
            nextSlide = slides.length - 1;
        }

        isChanging = true;

        slides[currentSlide].classList.remove("active");
        slides[nextSlide].classList.add("active");

        currentSlide = nextSlide;

        setTimeout(function() {
            isChanging = false;
        }, 800);
    }

    graphicDesign.addEventListener("wheel", function(event) {

        if (event.deltaY > 0) {
            changeSlide(1);
        }

        if (event.deltaY < 0) {
            changeSlide(-1);
        }

    }, { passive: true });

}

const photography = document.querySelector(".photography");

if (photography) {

    const images = [
        "images/photography/photography_01.jpg",
        "images/photography/photography_02.jpg",
        "images/photography/photography_03.jpg",
        "images/photography/photography_04.jpg",
        "images/photography/photography_05.jpg",
        "images/photography/photography_06.jpg",
        "images/photography/photography_07.jpg",
        "images/photography/photography_08.jpg",
        "images/photography/photography_09.jpg",
        "images/photography/photography_10.jpg",
        "images/photography/photography_11.jpg",
        "images/photography/photography_12.jpg",
        "images/photography/photography_13.jpg",
        "images/photography/photography_14.jpg",
        "images/photography/photography_15.jpg",
        "images/photography/photography_16.jpg",
        "images/photography/photography_17.jpg",
        "images/photography/photography_18.jpg",
        "images/photography/photography_19.jpg",
        "images/photography/photography_20.jpg",
        "images/photography/photography_21.jpg",
        "images/photography/photography_22.jpg",
        "images/photography/photography_23.jpg",
        "images/photography/photography_24.jpg",
        "images/photography/photography_25.jpg",
        "images/photography/photography_26.jpg",
        "images/photography/photography_27.jpg",
        "images/photography/photography_28.jpg",
        "images/photography/photography_29.jpg",
        "images/photography/photography_30.jpg",
        "images/photography/photography_31.jpg",
        "images/photography/photography_32.jpg",
        "images/photography/photography_33.jpg",
        "images/photography/photography_34.jpg",
        "images/photography/photography_35.jpg",
        "images/photography/photography_36.jpg",
        "images/photography/photography_37.jpg",
        "images/photography/photography_38.jpg",
        "images/photography/photography_39.jpg",
        "images/photography/photography_40.jpg",
        "images/photography/photography_41.jpg",
        "images/photography/photography_42.jpg",
        "images/photography/photography_43.jpg",
        "images/photography/photography_44.jpg",
        "images/photography/photography_45.jpg"
    ];

    const layers = document.querySelectorAll(".photo-layer");

    let currentIndex = 0;
    let isChanging = false;

    function randomPosition() {

        const x = 15 + Math.random() * 70;
        const y = 20 + Math.random() * 60;

        return {
            left: x + "%",
            top: y + "%"
        };
    }

    function showPhoto(layer, imageIndex) {

        layer.innerHTML = "";

        const image = document.createElement("img");

        image.src = images[imageIndex];

        layer.appendChild(image);

        const position = randomPosition();

        layer.style.left = position.left;
        layer.style.top = position.top;

        layer.classList.add("active");
    }

    function changePhoto(direction) {

        if (isChanging) {
            return;
        }

        isChanging = true;

        currentIndex += direction;

        if (currentIndex >= images.length) {
            currentIndex = 0;
        }

        if (currentIndex < 0) {
            currentIndex = images.length - 1;
        }

        const layer = layers[currentIndex % 3];

        layer.classList.remove("active");

        setTimeout(function() {

            showPhoto(layer, currentIndex);

        }, 100);

        setTimeout(function() {

            isChanging = false;

        }, 800);
    }

    showPhoto(layers[0], 0);

    if (images.length > 1) {
        showPhoto(layers[1], 1);
    }

    if (images.length > 2) {
        showPhoto(layers[2], 2);
    }

    currentIndex = 2;

    window.addEventListener("wheel", function(event) {

        if (event.deltaY > 0) {
            changePhoto(1);
        }

        if (event.deltaY < 0) {
            changePhoto(-1);
        }

    }, { passive: true });

}
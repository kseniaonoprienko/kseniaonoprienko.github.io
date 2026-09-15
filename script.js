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


// --------------------
// PRELOAD IMAGES
// --------------------

images.forEach(function(image) {
    const preload = new Image();
    preload.src = image;
});


// --------------------
// HOMEPAGE
// --------------------

const home = document.querySelector(".home");

if (home) {

    // Start with a random image
    let currentImage = Math.floor(Math.random() * images.length);

    home.style.backgroundImage =
        `url("${images[currentImage]}")`;


    // --------------------
    // MOUSE MOVEMENT
    // --------------------

    let lastMouseX = 0;
    let lastMouseY = 0;

    const movementThreshold = 150;


    document.addEventListener("mousemove", function(event) {

        const distanceX = Math.abs(event.clientX - lastMouseX);
        const distanceY = Math.abs(event.clientY - lastMouseY);


        if (
            distanceX > movementThreshold ||
            distanceY > movementThreshold
        ) {

            // Pick a random image
            let newImage;

            do {
                newImage = Math.floor(Math.random() * images.length);
            }
            while (newImage === currentImage && images.length > 1);


            currentImage = newImage;


            // Change image
            home.style.backgroundImage =
                `url("${images[currentImage]}")`;


            // Remember this mouse position
            lastMouseX = event.clientX;
            lastMouseY = event.clientY;
        }

    });

}
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
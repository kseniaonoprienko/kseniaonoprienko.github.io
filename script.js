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

const photography = document.querySelector(".photography");

if (photography) {

    const photoPaths = [];

    for (let i = 1; i <= 45; i++) {

        const number =
            String(i).padStart(2, "0");

        photoPaths.push(
            `images/photography/photography_${number}.jpg`
        );
    }

    const threshold = 80;
    const visiblePhotos = 5;
    const maxMovement = threshold * 3;

    let currentIndex = 0;

    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;

    let distanceSinceLastPhoto = 0;

    const photoStage =
        photography.querySelector(".photo-stage");


    /*
     * Create a photo.
     */
    function showNextPhoto(x, y) {

        const photo = document.createElement("img");

        photo.src = photoPaths[currentIndex];

        photo.style.position = "absolute";
        photo.style.left = `${x}px`;
        photo.style.top = `${y}px`;

        photo.style.width = "700px";
        photo.style.height = "auto";

        photo.style.transform =
            "translate(-50%, -50%) scale(0.6)";

        photo.style.pointerEvents = "none";
        photo.style.userSelect = "none";

        photo.style.opacity = "1";

        photoStage.appendChild(photo);


        /*
         * Remove the oldest photo only AFTER
         * the new photo has been added.
         */
        if (photoStage.children.length > visiblePhotos) {

            photoStage.removeChild(
                photoStage.firstElementChild
            );
        }


        /*
         * Next image.
         */
        currentIndex++;

        if (currentIndex >= photoPaths.length) {
            currentIndex = 0;
        }
    }


    /*
     * FIRST PHOTO
     */
    showNextPhoto(
        window.innerWidth / 2,
        window.innerHeight / 2
    );


    /*
     * MOUSE MOVEMENT
     */
    window.addEventListener("mousemove", function(event) {

        const currentX = event.clientX;
        const currentY = event.clientY;

        const dx = currentX - lastX;
        const dy = currentY - lastY;

        const segmentLength =
            Math.sqrt(dx * dx + dy * dy);


        if (segmentLength === 0) {
            return;
        }


        /*
         * Very large cursor jumps are ignored.
         * The existing trail stays visible.
         */
        if (segmentLength > maxMovement) {

            lastX = currentX;
            lastY = currentY;

            return;
        }


        let remainingDistance = segmentLength;

        let startX = lastX;
        let startY = lastY;


        /*
         * Create a photo every 80px.
         */
        while (
            distanceSinceLastPhoto + remainingDistance >= threshold
        ) {

            const distanceToPhoto =
                threshold - distanceSinceLastPhoto;

            const ratio =
                distanceToPhoto / remainingDistance;


            const photoX =
                startX +
                (currentX - startX) * ratio;

            const photoY =
                startY +
                (currentY - startY) * ratio;


            showNextPhoto(photoX, photoY);


            startX = photoX;
            startY = photoY;

            remainingDistance -= distanceToPhoto;

            distanceSinceLastPhoto = 0;
        }


        distanceSinceLastPhoto += remainingDistance;

        lastX = currentX;
        lastY = currentY;

    });

}
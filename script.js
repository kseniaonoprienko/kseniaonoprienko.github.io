/* =========================
   CLOUDINARY
   ========================= */

const CLOUDINARY_BASE =
    "https://res.cloudinary.com/hhucbfrh/image/upload/";


/* =========================
   HOMEPAGE
   ========================= */

const images = Array.from(
    { length: 28 },
    (_, i) => {
        const number = i + 1;

        return `${CLOUDINARY_BASE}f_auto,q_auto,w_2000/showreel_still_${number}.jpg`;
    }
);


/*
 * Preload homepage images.
 */

images.forEach(function(image) {

    const preload = new Image();

    preload.src = image;

});


const home = document.querySelector(".home");


if (home) {

    let currentImage =
        Math.floor(Math.random() * images.length);


    home.style.backgroundImage =
        `url("${images[currentImage]}")`;


    let imageHistory = [currentImage];


    let lastMouseX =
        window.innerWidth / 2;

    let lastMouseY =
        window.innerHeight / 2;


    const movementThreshold = 250;

    const cooldown = 4;


    document.addEventListener(
        "mousemove",
        function(event) {

            const distanceX =
                Math.abs(
                    event.clientX -
                    lastMouseX
                );


            const distanceY =
                Math.abs(
                    event.clientY -
                    lastMouseY
                );


            if (
                distanceX > movementThreshold ||
                distanceY > movementThreshold
            ) {

                let availableImages = [];


                for (
                    let i = 0;
                    i < images.length;
                    i++
                ) {

                    if (
                        !imageHistory.includes(i)
                    ) {

                        availableImages.push(i);

                    }

                }


                /*
                 * Safety check.
                 */

                if (
                    availableImages.length === 0
                ) {

                    availableImages =
                        images.map(
                            function(_, index) {
                                return index;
                            }
                        );

                }


                const randomPosition =
                    Math.floor(
                        Math.random() *
                        availableImages.length
                    );


                const newImage =
                    availableImages[
                        randomPosition
                    ];


                currentImage =
                    newImage;


                home.style.backgroundImage =
                    `url("${images[currentImage]}")`;


                imageHistory.push(
                    currentImage
                );


                if (
                    imageHistory.length >
                    cooldown
                ) {

                    imageHistory.shift();

                }


                lastMouseX =
                    event.clientX;

                lastMouseY =
                    event.clientY;

            }

        }
    );

}


/* =========================
   FILM PROJECT OVERLAYS
   ========================= */

const projectTriggers =
    document.querySelectorAll(
        ".project-trigger"
    );


const projectOverlays = {

    "nakilla":
        document.querySelector(
            "#nakilla-overlay"
        ),

    "mun-makuun":
        document.querySelector(
            "#mun-makuun-overlay"
        ),

    "limbo":
        document.querySelector(
            "#limbo-overlay"
        ),

    "out-of-memory":
        document.querySelector(
            "#out-of-memory-overlay"
        )

};


const projectOrder = [
    "nakilla",
    "mun-makuun",
    "limbo",
    "out-of-memory"
];


let currentProject = null;


/*
 * Open project from dropdown.
 */

projectTriggers.forEach(
    function(trigger) {

        trigger.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                event.stopPropagation();

                openProject(
                    trigger.dataset.project
                );

            }
        );

    }
);


/*
 * Open a specific project.
 */

function openProject(project) {

    Object.values(
        projectOverlays
    ).forEach(
        function(overlay) {

            if (overlay) {

                overlay.classList.remove(
                    "active"
                );

            }

        }
    );


    const overlay =
        projectOverlays[project];


    if (overlay) {

        overlay.classList.add(
            "active"
        );

        currentProject =
            project;

    }

}


/*
 * Close the current project.
 */

function closeProject() {

    Object.values(
        projectOverlays
    ).forEach(
        function(overlay) {

            if (overlay) {

                overlay.classList.remove(
                    "active"
                );

            }

        }
    );


    currentProject = null;

}


/*
 * Click empty area = close project.
 */

Object.values(
    projectOverlays
).forEach(
    function(overlay) {

        if (!overlay) return;


        overlay.addEventListener(
            "click",
            function(event) {

                if (
                    event.target === overlay
                ) {

                    closeProject();

                }

            }
        );

    }
);


/*
 * Click project composition = next project.
 */

Object.values(
    projectOverlays
).forEach(
    function(overlay) {

        if (!overlay) return;


        const content =
            overlay.querySelector(
                ".project-content"
            );


        if (!content) return;


        content.addEventListener(
            "click",
            function(event) {

                event.stopPropagation();


                if (!currentProject) {

                    return;

                }


                const currentIndex =
                    projectOrder.indexOf(
                        currentProject
                    );


                const nextIndex =
                    (
                        currentIndex + 1
                    ) %
                    projectOrder.length;


                openProject(
                    projectOrder[nextIndex]
                );

            }
        );

    }
);


/* =========================
   GRAPHIC DESIGN
   ========================= */

const graphicDesign =
    document.querySelector(
        ".graphicdesign"
    );


if (graphicDesign) {

    /*
     * Create paths for all
     * 13 graphic design images.
     */

    const graphicPaths = [];

    for (
        let i = 1;
        i <= 14;
        i++
    ) {

        graphicPaths.push(
            `${CLOUDINARY_BASE}f_auto,q_auto,w_2000/graphic_design_${i}.jpg`
        );

    }


    /*
     * Preload graphic design images.
     */

    graphicPaths.forEach(
        function(path) {

            const preload =
                new Image();

            preload.src = path;

        }
    );


    /*
     * Create the slides.
     */

    graphicPaths.forEach(
        function(path, index) {

            const slide =
                document.createElement(
                    "div"
                );


            slide.className =
                "graphic-slide";


            if (index === 0) {

                slide.classList.add(
                    "active"
                );

            }


            const image =
                document.createElement(
                    "img"
                );


            image.src =
                path;


            image.alt =
                `Graphic design project ${index + 1}`;


            slide.appendChild(
                image
            );


            graphicDesign.appendChild(
                slide
            );

        }
    );


    /*
     * Get the slides after
     * creating them.
     */

    const slides =
        graphicDesign.querySelectorAll(
            ".graphic-slide"
        );


    let currentSlide = 0;

    let isChanging = false;


    /*
     * Change graphic design image.
     */

    function changeSlide(direction) {

        if (isChanging) return;


        let nextSlide =
            currentSlide + direction;


        if (
            nextSlide >=
            slides.length
        ) {

            nextSlide = 0;

        }


        if (
            nextSlide < 0
        ) {

            nextSlide =
                slides.length - 1;

        }


        isChanging = true;


        slides[currentSlide]
            .classList.remove(
                "active"
            );


        slides[nextSlide]
            .classList.add(
                "active"
            );


        currentSlide =
            nextSlide;


        setTimeout(
            function() {

                isChanging = false;

            },
            800
        );

    }


    /*
     * Mouse wheel navigation.
     */

    window.addEventListener(
        "wheel",
        function(event) {

            if (
                event.deltaY > 0
            ) {

                changeSlide(1);

            }


            if (
                event.deltaY < 0
            ) {

                changeSlide(-1);

            }

        },
        {
            passive: true
        }
    );

}

/* =========================
   COMMERCIAL IMAGE CONVEYOR
========================= */

const commercialProjects =
    document.querySelectorAll(
        ".commercial-project:not(.ami-project)"
    );

commercialProjects.forEach(function(project) {

    const container =
        project.querySelector(".commercial-images");

    if (!container) {
        return;
    }

    const originalImages =
        Array.from(
            container.querySelectorAll("img")
        );

    if (originalImages.length === 0) {
        return;
    }

    const speed = 100;
    const spacing = 50;


    /* =========================
       PRELOAD IMAGES
    ========================= */

    const imagePromises =
        originalImages.map(function(image) {

            return new Promise(function(resolve) {

                const src =
                    image.currentSrc ||
                    image.src;

                const preload =
                    new Image();

                preload.onload = async function() {

                    try {
                        await preload.decode();
                    } catch (error) {}

                    resolve({
                        src: src,
                        width: preload.naturalWidth,
                        height: preload.naturalHeight
                    });

                };

                preload.onerror = function() {

                    resolve({
                        src: src,
                        width: 1,
                        height: 1
                    });

                };

                preload.src = src;

            });

        });


    Promise.all(imagePromises).then(function(data) {

        startConveyor(data);

    });


    /* =========================
       START CONVEYOR
    ========================= */

    function startConveyor(data) {

        container.innerHTML = "";


        const track =
            document.createElement("div");

        track.className =
            "commercial-conveyor-track";

        container.appendChild(track);


        /*
         * Create THREE identical sequences.
         *
         * This guarantees that there is
         * always another image coming in
         * from the left edge.
         */

        const sequenceCount = 3;


        for (
            let sequence = 0;
            sequence < sequenceCount;
            sequence++
        ) {

            data.forEach(function(item) {

                const image =
                    document.createElement("img");

                image.className =
                    "commercial-loop-image";

                image.src =
                    item.src;

                image.alt = "";

                image.draggable = false;


                /*
                 * Calculate image width.
                 */

                let width =
                    Math.min(
                        window.innerWidth * 0.44,
                        700
                    );


                /*
                 * Raja is narrower.
                 */

                if (
                    project.classList.contains(
                        "raja-project"
                    )
                ) {

                    width =
                        Math.min(
                            window.innerWidth * 0.28,
                            330
                        );

                }


                const aspectRatio =
                    item.width /
                    item.height;

                const height =
                    width /
                    aspectRatio;


                image.style.width =
                    width + "px";

                image.style.height =
                    height + "px";


                track.appendChild(image);

            });

        }


        /*
         * Add spacing.
         */

        Array.from(
            track.children
        ).forEach(function(image, index) {

            if (
                index <
                track.children.length - 1
            ) {

                image.style.marginRight =
                    spacing + "px";

            }

        });


        /*
         * Measure the FIRST sequence.
         */

        let sequenceWidth = 0;


        data.forEach(function(item) {

            let width =
                Math.min(
                    window.innerWidth * 0.44,
                    700
                );


            if (
                project.classList.contains(
                    "raja-project"
                )
            ) {

                width =
                    Math.min(
                        window.innerWidth * 0.28,
                        330
                    );

            }


            sequenceWidth +=
                width +
                spacing;

        });


        sequenceWidth -= spacing;


        /*
         * Center the FIRST sequence
         * initially.
         */

        const containerWidth =
            container.clientWidth;


        let position =
            (
                containerWidth -
                sequenceWidth
            ) / 2;


        /*
         * Move the entire track.
         */

        track.style.transform =
            `translate3d(${position}px, -50%, 0)`;


        /* =========================
           ANIMATION
        ========================= */

        let lastTime =
            performance.now();


        function animate(time) {

            const delta =
                (time - lastTime) /
                1000;

            lastTime =
                time;


            /*
             * Move LEFT.
             */

            position +=
                speed * delta;


            /*
             * When the first sequence
             * has moved completely away,
             * jump exactly one sequence
             * width forward.
             *
             * Because the next copy is
             * identical and directly behind
             * it, this is invisible.
             */

            if (
                position >=
                -sequenceWidth
            ) {

                position -=
                    sequenceWidth;

            }


            track.style.transform =
                `translate3d(${position}px, -50%, 0)`;


            requestAnimationFrame(
                animate
            );

        }


        requestAnimationFrame(
            animate
        );

    }

});

/* =========================
   PHOTOGRAPHY
   ========================= */

const photography =
    document.querySelector(
        ".photography"
    );


if (photography) {

    const photoPaths = [];


    /*
     * Create Cloudinary URLs
     * for all 45 photographs.
     */

    for (
        let i = 1;
        i <= 45;
        i++
    ) {

        const number =
            String(i).padStart(
                2,
                "0"
            );


        photoPaths.push(
            `${CLOUDINARY_BASE}f_auto,q_auto,w_1200/photography_${number}.jpg`
        );

    }


    /*
     * Preload photography images.
     */

    photoPaths.forEach(
        function(path) {

            const preload =
                new Image();

            preload.src = path;

        }
    );


    const threshold = 80;

    const visiblePhotos = 5;

    const maxMovement =
        threshold * 3;


    let currentIndex = 0;


    let lastX =
        window.innerWidth / 2;

    let lastY =
        window.innerHeight / 2;


    let distanceSinceLastPhoto = 0;


    const photoStage =
        photography.querySelector(
            ".photo-stage"
        );


    const photoCounter =
        photography.querySelector(
            ".photo-counter"
        );


    /*
     * Create a photo.
     */

    function showNextPhoto(x, y) {

        const photo =
            document.createElement(
                "img"
            );


        photo.src =
            photoPaths[currentIndex];


        photo.style.position =
            "absolute";


        photo.style.left =
            `${x}px`;


        photo.style.top =
            `${y}px`;


        photo.style.width =
            "700px";


        photo.style.height =
            "auto";


        photo.style.transform =
            "translate(-50%, -50%) scale(0.6)";


        photo.style.pointerEvents =
            "none";


        photo.style.userSelect =
            "none";


        photo.style.opacity =
            "1";


        photoStage.appendChild(
            photo
        );


        /*
         * Keep only five photos.
         */

        if (
            photoStage.children.length >
            visiblePhotos
        ) {

            photoStage.removeChild(
                photoStage.firstElementChild
            );

        }


        /*
         * Update photograph counter.
         */

        if (photoCounter) {

            const displayNumber =
                String(
                    currentIndex + 1
                ).padStart(
                    2,
                    "0"
                );


            const totalNumber =
                String(
                    photoPaths.length
                ).padStart(
                    2,
                    "0"
                );


            photoCounter.textContent =
                `${displayNumber}/${totalNumber}`;

        }


        /*
         * Move to next photograph.
         */

        currentIndex++;


        if (
            currentIndex >=
            photoPaths.length
        ) {

            currentIndex = 0;

        }

    }


    /*
     * First photo.
     */

    showNextPhoto(
        window.innerWidth / 2,
        window.innerHeight / 2
    );


    /*
     * Mouse movement.
     */

    window.addEventListener(
        "mousemove",
        function(event) {

            const currentX =
                event.clientX;

            const currentY =
                event.clientY;


            const dx =
                currentX - lastX;

            const dy =
                currentY - lastY;


            const segmentLength =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                segmentLength === 0
            ) {

                return;

            }


            /*
             * Ignore very large jumps.
             */

            if (
                segmentLength >
                maxMovement
            ) {

                lastX =
                    currentX;

                lastY =
                    currentY;

                return;

            }


            let remainingDistance =
                segmentLength;


            let startX =
                lastX;

            let startY =
                lastY;


            /*
             * Create a new photograph
             * every 80px of movement.
             */

            while (
                distanceSinceLastPhoto +
                remainingDistance >=
                threshold
            ) {

                const distanceToPhoto =
                    threshold -
                    distanceSinceLastPhoto;


                const ratio =
                    distanceToPhoto /
                    remainingDistance;


                const photoX =
                    startX +
                    (
                        currentX -
                        startX
                    ) *
                    ratio;


                const photoY =
                    startY +
                    (
                        currentY -
                        startY
                    ) *
                    ratio;


                showNextPhoto(
                    photoX,
                    photoY
                );


                startX =
                    photoX;

                startY =
                    photoY;


                remainingDistance -=
                    distanceToPhoto;


                distanceSinceLastPhoto =
                    0;

            }


            distanceSinceLastPhoto +=
                remainingDistance;


            lastX =
                currentX;

            lastY =
                currentY;

        }
    );

}
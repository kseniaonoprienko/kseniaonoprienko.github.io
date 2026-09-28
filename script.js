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
    COMMERCIAL GALLERIES
 ========================= */

const commercialGalleries =
    document.querySelectorAll(
        ".commercial-gallery"
    );


if (commercialGalleries.length) {

    const galleryVideos = {

        tribedo: [
            "commercial_video_1.mp4",
            "commercial_video_2.mp4",
            "commercial_video_3.mp4"
        ],

        raja: [
            "commercial_video_4.mp4",
            "commercial_video_5.mp4",
            "commercial_video_6.mp4"
        ],

        espoo: [
            "commercial_video_7.mp4",
            "commercial_video_8.mp4"
        ],

        ami: [
            "commercial_video_9.mov"
        ]

    };


    const galleryIndexes = {};


    Object.keys(
        galleryVideos
    ).forEach(function(project) {

        galleryIndexes[project] = 0;

    });


    commercialGalleries.forEach(
        function(gallery) {

            const project =
                gallery.dataset.project;


            const videos =
                galleryVideos[project];


            if (!videos) return;


            const video =
                gallery.querySelector(
                    ".commercial-gallery-image video"
                );


            const counter =
                gallery.querySelector(
                    ".gallery-counter"
                );


            const previous =
                gallery.querySelector(
                    ".gallery-prev"
                );


            const next =
                gallery.querySelector(
                    ".gallery-next"
                );


            if (!video) return;


            function videoURL(filename) {

                return `${CLOUDINARY_BASE.replace(
                    "/image/upload/",
                    "/video/upload/"
                )}f_auto,q_auto,w_1800/${filename}`;

            }


            function showVideo(index) {

                galleryIndexes[project] =
                    index;


                video.pause();


                video.src =
                    videoURL(
                        videos[index]
                    );


                video.load();


                const number =
                    String(index + 1)
                        .padStart(2, "0");


                const total =
                    String(videos.length)
                        .padStart(2, "0");


                if (counter) {

                    counter.textContent =
                        `${number}/${total}`;

                }


                /*
                 * Play immediately if the
                 * project is currently visible.
                 */

                const rect =
                    gallery.getBoundingClientRect();


                const viewportHeight =
                    window.innerHeight;


                const visible =
                    rect.top <
                    viewportHeight * 0.75 &&
                    rect.bottom >
                    viewportHeight * 0.25;


                if (visible) {

                    video.play()
                        .catch(
                            function() {}
                        );

                }

            }


            /*
             * Initial video.
             */

            showVideo(0);


            /*
             * Previous video.
             */

            if (previous) {

                previous.addEventListener(
                    "click",
                    function(event) {

                        event.stopPropagation();


                        let index =
                            galleryIndexes[project] - 1;


                        if (index < 0) {

                            index =
                                videos.length - 1;

                        }


                        showVideo(index);

                    }
                );

            }


            /*
             * Next video.
             */

            if (next) {

                next.addEventListener(
                    "click",
                    function(event) {

                        event.stopPropagation();


                        let index =
                            galleryIndexes[project] + 1;


                        if (
                            index >=
                            videos.length
                        ) {

                            index = 0;

                        }


                        showVideo(index);

                    }
                );

            }

        }
    );


    /*
     * =========================
     * PLAY VIDEOS ON SCROLL
     * =========================
     */

    const videoObserver =
        new IntersectionObserver(
            function(entries) {

                entries.forEach(
                    function(entry) {

                        const video =
                            entry.target;


                        if (
                            entry.isIntersecting
                        ) {

                            video.muted =
                                true;


                            video.play()
                                .catch(
                                    function() {}
                                );

                        } else {

                            video.pause();

                        }

                    }
                );

            },
            {
                threshold: 0.35
            }
        );


    document
        .querySelectorAll(
            ".commercial-gallery-image video"
        )
        .forEach(
            function(video) {

                videoObserver.observe(
                    video
                );

            }
        );

}


 /* =========================
    COMMERCIAL SMOOTH SCROLL
 ========================= */

const commercialPage =
    document.querySelector(
        ".commercial"
    );


if (
    commercialPage &&
    window.gsap &&
    window.ScrollTrigger &&
    window.ScrollSmoother
) {

    gsap.registerPlugin(
        ScrollTrigger,
        ScrollSmoother
    );


    ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,
        smoothTouch: 0.1,
        effects: false
    });

}

/* =========================
   GRAPHIC DESIGN
   ========================= */

const graphicdesign =
    document.querySelector(".graphicdesign");

if (graphicdesign) {

    const images = Array.from(
        { length: 13 },
        (_, i) => {
            const number = i + 1;

            return `https://res.cloudinary.com/hhucbfrh/image/upload/f_auto,q_auto,w_1800/graphic_design_${number}.jpg`;
        }
    );

    const counter =
        document.querySelector(".graphic-counter");

    let currentIndex = 0;
    let canScroll = true;

    const scrollDelay = 500;


    function updateCounter() {

        const number =
            String(currentIndex + 1)
                .padStart(2, "0");

        counter.textContent =
            `${number}/13`;
    }


    images.forEach(function(src) {

        const slide =
            document.createElement("div");

        slide.className =
            "graphic-slide";

        const image =
            document.createElement("img");

        image.src = src;
        image.alt = "";

        slide.appendChild(image);
        graphicdesign.appendChild(slide);

    });


    const slides =
        graphicdesign.querySelectorAll(
            ".graphic-slide"
        );


    slides[0].classList.add("active");

    updateCounter();


    window.addEventListener(
        "wheel",
        function(event) {

            if (!canScroll) {
                return;
            }

            if (
                Math.abs(event.deltaY) < 10
            ) {
                return;
            }


            canScroll = false;


            if (event.deltaY > 0) {

                currentIndex =
                    (currentIndex + 1) %
                    images.length;

            } else {

                currentIndex =
                    (
                        currentIndex -
                        1 +
                        images.length
                    ) %
                    images.length;
            }


            slides.forEach(function(slide) {

                slide.classList.remove(
                    "active"
                );

            });


            slides[currentIndex].classList.add(
                "active"
            );


            updateCounter();


            setTimeout(function() {

                canScroll = true;

            }, scrollDelay);

        },
        { passive: true }
    );
}


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
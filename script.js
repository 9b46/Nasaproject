document.addEventListener("DOMContentLoaded", function () {

    /* ===================================================== */
    /* ELEMENTS */
    /* ===================================================== */

    const launchScreen =
        document.getElementById("launchScreen");

    const solarScreen =
        document.getElementById("solarScreen");

    const planetScreen =
        document.getElementById("planetScreen");


    const rocket =
        document.getElementById("rocket");

    const message =
        document.getElementById("message");


    const planets =
        document.querySelectorAll(".planet");

    const planetName =
        document.getElementById("planetName");

    const planetDescription =
        document.getElementById("planetDescription");

    const exploreButton =
        document.getElementById("exploreButton");


    const marsViewport =
        document.getElementById("marsViewport");

    const marsWorld =
        document.getElementById("marsWorld");

    const player =
        document.getElementById("player");


    const resources =
        document.querySelectorAll(".resource");


    const interactionPrompt =
        document.getElementById("interactionPrompt");

    const interactionName =
        document.getElementById("interactionName");


    const progressText =
        document.getElementById("progressText");

    const progressFill =
        document.getElementById("progressFill");


    const collectionNotification =
        document.getElementById(
            "collectionNotification"
        );


    const packageComplete =
        document.getElementById(
            "packageComplete"
        );


    const returnButton =
        document.getElementById("returnButton");

    const continueButton =
        document.getElementById("continueButton");


    /* Modal */

    const sampleModal =
        document.getElementById("sampleModal");

    const samplePhoto =
        document.getElementById("samplePhoto");

    const sampleCredit =
        document.getElementById("sampleCredit");

    const sampleCode =
        document.getElementById("sampleCode");

    const sampleTitle =
        document.getElementById("sampleTitle");

    const sampleSubtitle =
        document.getElementById("sampleSubtitle");

    const sampleFacts =
        document.getElementById("sampleFacts");

    const sampleNote =
        document.getElementById("sampleNote");

    const collectSampleButton =
        document.getElementById(
            "collectSampleButton"
        );

    const cancelSampleButton =
        document.getElementById(
            "cancelSampleButton"
        );


    /* ===================================================== */
    /* STATE */
    /* ===================================================== */

    let launched = false;

    let selectedPlanet = null;

    let marsActive = false;

    let modalOpen = false;

    let nearbyResource = null;

    let selectedResource = null;

    let collectedCount = 0;


    const keys = {};


    const WORLD_WIDTH = 2600;
    const WORLD_HEIGHT = 1600;

    let playerX = 1300;
    let playerY = 800;

    const playerSpeed = 260;

    const interactionDistance = 115;


    /* ===================================================== */
    /* NASA SAMPLE INFORMATION */
    /* ===================================================== */

    const samples = {

        "Iron Sample": {

            code:
                "NASA SCIENCE RECORD / IRON-RICH MATERIAL",

            title:
                "Iron-Rich Martian Material",

            subtitle:
                "Opportunity Rover — Meridiani Planum",

            image:
                "https://images-assets.nasa.gov/image/PIA05564/PIA05564~large.jpg",

            credit:
                "NASA/JPL / Mars Exploration Rover Opportunity",

            facts: [

                [
                    "MATERIAL",
                    "Iron-rich hematite formations"
                ],

                [
                    "MISSION",
                    "Mars Exploration Rover Opportunity"
                ],

                [
                    "IMPORTANCE",
                    "Hematite helped scientists investigate environments influenced by liquid water."
                ]

            ],

            note:
                "This NASA observation is used as the scientific reference for the game's Iron Sample."

        },


        "Regolith Sample": {

            code:
                "NASA SCIENCE RECORD / MARTIAN REGOLITH",

            title:
                "Martian Regolith",

            subtitle:
                "Curiosity Rover — Rocknest",

            image:
                "https://images-assets.nasa.gov/image/PIA16173/PIA16173~large.jpg",

            credit:
                "NASA/JPL-Caltech/MSSS / Curiosity",

            facts: [

                [
                    "MATERIAL",
                    "Loose Martian soil, dust and sand"
                ],

                [
                    "MISSION",
                    "Mars Science Laboratory — Curiosity"
                ],

                [
                    "SCIENCE",
                    "Curiosity collected loose soil for analysis by instruments inside the rover."
                ]

            ],

            note:
                "The in-game Regolith Sample represents loose Martian surface material investigated by Mars missions."

        },


        "Ice Core": {

            code:
                "NASA SCIENCE RECORD / WATER ICE",

            title:
                "Water-Ice Evidence",

            subtitle:
                "Mars Surface Observation",

            image:
                "https://images-assets.nasa.gov/image/PIA00533/PIA00533~large.jpg",

            credit:
                "NASA/JPL / Viking Mission",

            facts: [

                [
                    "MATERIAL",
                    "Water ice or frost"
                ],

                [
                    "MISSION",
                    "Viking Mars exploration"
                ],

                [
                    "IMPORTANT",
                    "The game calls this an Ice Core, but the NASA imagery represents evidence of surface ice rather than a drilled core."
                ]

            ],

            note:
                "The game uses this NASA observation to represent the discovery of water-ice material on Mars."

        },


        "Mineral Fragment": {

            code:
                "NASA SCIENCE RECORD / MINERAL VEINS",

            title:
                "Mineral-Rich Martian Rock",

            subtitle:
                "Curiosity — Mount Sharp",

            image:
                "https://images-assets.nasa.gov/image/PIA19161/PIA19161~large.jpg",

            credit:
                "NASA/JPL-Caltech/MSSS / Curiosity",

            facts: [

                [
                    "FEATURE",
                    "Mineral veins inside Martian rock"
                ],

                [
                    "MISSION",
                    "Curiosity Rover"
                ],

                [
                    "SCIENCE",
                    "Minerals can be deposited when fluids move through fractures in rock."
                ]

            ],

            note:
                "The in-game Mineral Fragment represents mineral-bearing Martian rocks observed by rover missions."

        }

    };


    /* ===================================================== */
    /* IMAGE FALLBACK */
    /* ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(function (image) {

            image.addEventListener(
                "error",
                function () {

                    image.style.display =
                        "none";

                }
            );

        });


    /* ===================================================== */
    /* ROCKET LAUNCH */
    /* ===================================================== */

    rocket.addEventListener(
        "click",
        function () {

            if (launched) {
                return;
            }


            launched = true;


            message.innerHTML =
                '<span class="pulse-dot"></span> LAUNCH SEQUENCE INITIATED';


            rocket.classList.add(
                "launch"
            );


            setTimeout(
                function () {

                    message.innerHTML =
                        '<span class="pulse-dot"></span> LEAVING EARTH';

                },
                1300
            );


            setTimeout(
                function () {

                    launchScreen.classList.add(
                        "fade-out"
                    );

                },
                2400
            );


            setTimeout(
                function () {

                    launchScreen.classList.add(
                        "hidden"
                    );


                    launchScreen.classList.remove(
                        "fade-out"
                    );


                    solarScreen.classList.remove(
                        "hidden"
                    );


                    solarScreen.classList.add(
                        "fade-in"
                    );

                },
                3100
            );

        }
    );


    /* ===================================================== */
    /* PLANET SELECTION */
    /* ===================================================== */

    planets.forEach(
        function (planet) {

            planet.addEventListener(
                "click",
                function () {

                    planets.forEach(
                        function (item) {

                            item.classList.remove(
                                "selected"
                            );

                        }
                    );


                    planet.classList.add(
                        "selected"
                    );


                    selectedPlanet =
                        planet.dataset.planet;


                    planetName.textContent =
                        selectedPlanet;


                    planetDescription.textContent =
                        planet.dataset.description;


                    if (
                        selectedPlanet === "Mars"
                    ) {

                        exploreButton.disabled =
                            false;


                        exploreButton.textContent =
                            "EXPLORE MARS";

                    }

                    else {

                        exploreButton.disabled =
                            true;


                        exploreButton.textContent =
                            "MISSION NOT AVAILABLE";

                    }

                }
            );

        }
    );


    /* ===================================================== */
    /* ENTER MARS */
    /* ===================================================== */

    exploreButton.addEventListener(
        "click",
        function () {

            if (
                selectedPlanet !== "Mars"
            ) {

                return;

            }


            solarScreen.classList.add(
                "fade-out"
            );


            setTimeout(
                function () {

                    solarScreen.classList.add(
                        "hidden"
                    );


                    solarScreen.classList.remove(
                        "fade-out"
                    );


                    planetScreen.classList.remove(
                        "hidden"
                    );


                    planetScreen.classList.add(
                        "fade-in"
                    );


                    marsActive = true;


                    updateCamera();

                },
                700
            );

        }
    );


    /* ===================================================== */
    /* KEYBOARD */
    /* ===================================================== */

    window.addEventListener(
        "keydown",
        function (event) {

            const key =
                event.key.toLowerCase();


            if (
                [
                    "arrowup",
                    "arrowdown",
                    "arrowleft",
                    "arrowright"
                ].includes(key)
            ) {

                event.preventDefault();

            }


            keys[key] =
                true;


            if (
                key === "e" &&
                marsActive &&
                !modalOpen
            ) {

                analyzeNearbyResource();

            }


            if (
                key === "escape" &&
                modalOpen
            ) {

                closeSampleModal();

            }

        }
    );


    window.addEventListener(
        "keyup",
        function (event) {

            keys[
                event.key.toLowerCase()
            ] = false;

        }
    );


    /* ===================================================== */
    /* MOVEMENT */
    /* ===================================================== */

    function movePlayer(delta) {

        if (
            !marsActive ||
            modalOpen
        ) {

            player.classList.remove(
                "walking"
            );

            return;

        }


        let moveX = 0;
        let moveY = 0;


        if (
            keys["w"] ||
            keys["arrowup"]
        ) {

            moveY -= 1;

        }


        if (
            keys["s"] ||
            keys["arrowdown"]
        ) {

            moveY += 1;

        }


        if (
            keys["a"] ||
            keys["arrowleft"]
        ) {

            moveX -= 1;

        }


        if (
            keys["d"] ||
            keys["arrowright"]
        ) {

            moveX += 1;

        }


        if (
            moveX !== 0 &&
            moveY !== 0
        ) {

            moveX *= 0.707;

            moveY *= 0.707;

        }


        const moving =
            moveX !== 0 ||
            moveY !== 0;


        player.classList.toggle(
            "walking",
            moving
        );


        playerX +=
            moveX *
            playerSpeed *
            delta;


        playerY +=
            moveY *
            playerSpeed *
            delta;


        playerX =
            Math.max(
                60,
                Math.min(
                    WORLD_WIDTH - 60,
                    playerX
                )
            );


        playerY =
            Math.max(
                60,
                Math.min(
                    WORLD_HEIGHT - 60,
                    playerY
                )
            );


        player.style.left =
            playerX + "px";


        player.style.top =
            playerY + "px";

    }


    /* ===================================================== */
    /* CAMERA */
    /* ===================================================== */

    function updateCamera() {

        const viewportWidth =
            marsViewport.clientWidth;


        const viewportHeight =
            marsViewport.clientHeight;


        let cameraX =
            playerX -
            viewportWidth / 2;


        let cameraY =
            playerY -
            viewportHeight / 2;


        cameraX =
            Math.max(
                0,
                Math.min(
                    WORLD_WIDTH -
                    viewportWidth,
                    cameraX
                )
            );


        cameraY =
            Math.max(
                0,
                Math.min(
                    WORLD_HEIGHT -
                    viewportHeight,
                    cameraY
                )
            );


        marsWorld.style.transform =
            `translate(${-cameraX}px, ${-cameraY}px)`;

    }


    /* ===================================================== */
    /* RESOURCE DETECTION */
    /* ===================================================== */

    function detectResources() {

        if (
            !marsActive ||
            modalOpen
        ) {

            return;

        }


        nearbyResource = null;


        let closest =
            Infinity;


        resources.forEach(
            function (resource) {

                resource.classList.remove(
                    "nearby"
                );


                if (
                    resource.classList.contains(
                        "collected"
                    )
                ) {

                    return;

                }


                const dx =
                    playerX -
                    resource.offsetLeft;


                const dy =
                    playerY -
                    resource.offsetTop;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance <
                    interactionDistance &&
                    distance < closest
                ) {

                    closest =
                        distance;


                    nearbyResource =
                        resource;

                }

            }
        );


        if (nearbyResource) {

            nearbyResource.classList.add(
                "nearby"
            );


            interactionName.textContent =
                nearbyResource
                .dataset
                .name
                .toUpperCase();


            interactionPrompt.classList.add(
                "visible"
            );

        }

        else {

            interactionPrompt.classList.remove(
                "visible"
            );

        }

    }


    /* ===================================================== */
    /* OPEN NASA ANALYSIS */
    /* ===================================================== */

    function analyzeNearbyResource() {

        if (!nearbyResource) {
            return;
        }


        const resourceName =
            nearbyResource.dataset.name;


        const data =
            samples[resourceName];


        if (!data) {
            return;
        }


        selectedResource =
            nearbyResource;


        modalOpen =
            true;


        interactionPrompt.classList.remove(
            "visible"
        );


        sampleCode.textContent =
            data.code;


        sampleTitle.textContent =
            data.title;


        sampleSubtitle.textContent =
            data.subtitle;


        samplePhoto.style.display =
            "block";


        samplePhoto.src =
            data.image;


        samplePhoto.alt =
            data.title;


        sampleCredit.textContent =
            "IMAGE CREDIT: " +
            data.credit;


        sampleNote.textContent =
            data.note;


        sampleFacts.innerHTML =
            "";


        data.facts.forEach(
            function (fact) {

                const box =
                    document.createElement(
                        "div"
                    );


                box.className =
                    "sample-fact";


                box.innerHTML = `

                    <span>
                        ${fact[0]}
                    </span>

                    <strong>
                        ${fact[1]}
                    </strong>

                `;


                sampleFacts.appendChild(
                    box
                );

            }
        );


        sampleModal.classList.remove(
            "hidden"
        );

    }


    /* ===================================================== */
    /* CLOSE MODAL */
    /* ===================================================== */

    function closeSampleModal() {

        modalOpen =
            false;


        selectedResource =
            null;


        sampleModal.classList.add(
            "hidden"
        );

    }


    cancelSampleButton.addEventListener(
        "click",
        closeSampleModal
    );


    /* ===================================================== */
    /* COLLECT SAMPLE */
    /* ===================================================== */

    collectSampleButton.addEventListener(
        "click",
        function () {

            if (!selectedResource) {
                return;
            }


            const resource =
                selectedResource;


            const name =
                resource.dataset.name;


            if (
                resource.classList.contains(
                    "collected"
                )
            ) {

                closeSampleModal();

                return;

            }


            resource.classList.add(
                "collected"
            );


            resource.classList.remove(
                "nearby"
            );


            collectedCount++;


            const row =
                document.querySelector(
                    `.component-row[data-component="${name}"]`
                );


            if (row) {

                row.classList.add(
                    "collected"
                );

            }


            progressText.textContent =
                `${collectedCount} / 4 COMPONENTS`;


            progressFill.style.width =
                `${collectedCount * 25}%`;


            modalOpen =
                false;


            selectedResource =
                null;


            nearbyResource =
                null;


            sampleModal.classList.add(
                "hidden"
            );


            interactionPrompt.classList.remove(
                "visible"
            );


            collectionNotification.textContent =
                name.toUpperCase() +
                " SECURED";


            collectionNotification.classList.add(
                "show"
            );


            setTimeout(
                function () {

                    collectionNotification.classList.remove(
                        "show"
                    );

                },
                1500
            );


            if (
                collectedCount === 4
            ) {

                setTimeout(
                    function () {

                        marsActive =
                            false;


                        packageComplete.classList.remove(
                            "hidden"
                        );

                    },
                    850
                );

            }

        }
    );


    /* ===================================================== */
    /* RETURN TO SOLAR SYSTEM */
    /* ===================================================== */

    function returnToSolar() {

        marsActive =
            false;


        modalOpen =
            false;


        sampleModal.classList.add(
            "hidden"
        );


        packageComplete.classList.add(
            "hidden"
        );


        interactionPrompt.classList.remove(
            "visible"
        );


        planetScreen.classList.add(
            "hidden"
        );


        solarScreen.classList.remove(
            "hidden"
        );


        solarScreen.classList.remove(
            "fade-out"
        );

    }


    returnButton.addEventListener(
        "click",
        returnToSolar
    );


    continueButton.addEventListener(
        "click",
        returnToSolar
    );


    /* ===================================================== */
    /* GAME LOOP */
    /* ===================================================== */

    let previousTime =
        performance.now();


    function gameLoop(time) {

        const delta =
            Math.min(
                (
                    time -
                    previousTime
                ) /
                1000,
                0.035
            );


        previousTime =
            time;


        if (marsActive) {

            movePlayer(delta);

            updateCamera();

            detectResources();

        }


        requestAnimationFrame(
            gameLoop
        );

    }


    requestAnimationFrame(
        gameLoop
    );


    /* ===================================================== */
    /* RESIZE */
    /* ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (marsActive) {

                updateCamera();

            }

        }
    );

});
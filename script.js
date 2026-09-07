/* =====================================================
   TRENDORA V2
   Main JavaScript
===================================================== */


/* ================= LOADER ================= */

window.addEventListener("load", () => {

    const loader =
        document.getElementById("loaderScreen");

    setTimeout(() => {

        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 500);

    }, 700);

});


/* ================= MOBILE MENU ================= */

const menuButton =
    document.getElementById("menuButton");

const mainNav =
    document.getElementById("mainNav");

menuButton.addEventListener("click", () => {

    mainNav.classList.toggle("show");

});


document.querySelectorAll("#mainNav a")
.forEach(link => {

    link.addEventListener("click", () => {

        mainNav.classList.remove("show");

    });

});


/* ================= YEAR ================= */

document.getElementById("year")
.textContent =
new Date().getFullYear();


/* ================= TOAST ================= */

function showToast(message, icon = "✓") {

    const toast =
        document.getElementById("toast");

    const text =
        document.getElementById("toastText");

    const toastIcon =
        document.getElementById("toastIcon");

    toastIcon.textContent = icon;

    text.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =====================================================
   VISITOR COUNTER
===================================================== */

/*
   DEMO ONLY

   This counter is stored in the visitor's browser.

   It is NOT a global website visitor counter.

   A real global counter requires a database.
*/

let visitors =
    Number(
        localStorage.getItem(
            "trendoraVisitorCount"
        )
    ) || 0;

visitors++;

localStorage.setItem(
    "trendoraVisitorCount",
    visitors
);

document.getElementById("visitorCount")
.textContent =
formatNumber(visitors);


/* ================= NUMBER FORMAT ================= */

function formatNumber(number) {

    if (number >= 1000000) {

        return (
            (number / 1000000)
            .toFixed(1) + "M"
        );

    }

    if (number >= 1000) {

        return (
            (number / 1000)
            .toFixed(1) + "K"
        );

    }

    return number;

}


/* =====================================================
   LIVE USERS
===================================================== */

let liveUsers =
    Math.floor(
        Math.random() * 80
    ) + 100;


const liveCount =
    document.getElementById("liveCount");

const heroLiveUsers =
    document.getElementById(
        "heroLiveUsers"
    );


function updateLiveUsers() {

    const change =
        Math.floor(
            Math.random() * 9
        ) - 4;

    liveUsers += change;

    if (liveUsers < 70) {
        liveUsers = 70;
    }

    liveCount.textContent =
        liveUsers;

    heroLiveUsers.textContent =
        liveUsers;

}


updateLiveUsers();

setInterval(
    updateLiveUsers,
    5000
);


/* =====================================================
   DATABASE-LIKE LOCAL STORAGE
===================================================== */

let musicFiles =
    JSON.parse(
        localStorage.getItem(
            "trendoraMusicFiles"
        )
    ) || [];


let movieFiles =
    JSON.parse(
        localStorage.getItem(
            "trendoraMovieFiles"
        )
    ) || [];


/* =====================================================
   HTML SECURITY
===================================================== */

function escapeHTML(value) {

    const element =
        document.createElement("div");

    element.textContent =
        value;

    return element.innerHTML;

}


/* =====================================================
   MUSIC RENDER
===================================================== */

function renderMusic(list = musicFiles) {

    const container =
        document.getElementById(
            "musicList"
        );

    container.innerHTML = "";


    if (list.length === 0) {

        container.innerHTML = `
            <div class="emptyMessage">
                🎵 No music uploaded yet.
                <br><br>
                Be the first person to upload!
            </div>
        `;

        return;
    }


    list.forEach((music) => {

        const card =
            document.createElement("article");

        card.className =
            "musicCard";


        card.innerHTML = `

            <div class="musicIcon">
                🎵
            </div>

            <div class="musicDetails">

                <h3>
                    ${escapeHTML(music.title)}
                </h3>

                <p>
                    Uploaded by
                    ${escapeHTML(music.uploader)}
                </p>

            </div>

        `;


        if (music.file) {

            const audio =
                document.createElement(
                    "audio"
                );

            audio.controls = true;

            audio.preload =
                "metadata";

            const source =
                document.createElement(
                    "source"
                );

            source.src =
                music.file;

            source.type =
                music.fileType ||
                "audio/mpeg";

            audio.appendChild(
                source
            );

            card.appendChild(
                audio
            );

        }


        container.appendChild(
            card
        );

    });

}


/* =====================================================
   MOVIE RENDER
===================================================== */

function renderMovies(list = movieFiles) {

    const container =
        document.getElementById(
            "movieList"
        );

    container.innerHTML = "";


    if (list.length === 0) {

        container.innerHTML = `
            <div class="emptyMessage">
                🎬 No videos uploaded yet.
                <br><br>
                Upload the first video!
            </div>
        `;

        return;
    }


    list.forEach((movie) => {

        const card =
            document.createElement(
                "article"
            );

        card.className =
            "movieCard";


        if (movie.file) {

            const video =
                document.createElement(
                    "video"
                );

            video.className =
                "movieVideo";

            video.controls = true;

            video.preload =
                "metadata";

            const source =
                document.createElement(
                    "source"
                );

            source.src =
                movie.file;

            source.type =
                movie.fileType ||
                "video/mp4";

            video.appendChild(
                source
            );

            card.appendChild(
                video
            );

        } else {

            const placeholder =
                document.createElement(
                    "div"
                );

            placeholder.className =
                "moviePlaceholder";

            placeholder.textContent =
                "🎬";

            card.appendChild(
                placeholder
            );

        }


        const details =
            document.createElement(
                "div"
            );

        details.className =
            "movieDetails";


        details.innerHTML = `

            <h3>
                ${escapeHTML(movie.title)}
            </h3>

            <p>
                Uploaded by
                ${escapeHTML(movie.uploader)}
            </p>

        `;


        card.appendChild(
            details
        );

        container.appendChild(
            card
        );

    });

}


/* =====================================================
   COUNTERS
===================================================== */

function updateMediaCounters() {

    document.getElementById(
        "musicCount"
    ).textContent =
        musicFiles.length;


    document.getElementById(
        "movieCount"
    ).textContent =
        movieFiles.length;

}


updateMediaCounters();


/* =====================================================
   UPLOAD TYPE
===================================================== */

let uploadType =
    "music";


const uploadTabs =
    document.querySelectorAll(
        ".uploadTab"
    );


const mediaFile =
    document.getElementById(
        "mediaFile"
    );


const uploadIcon =
    document.getElementById(
        "uploadIcon"
    );


const uploadTitle =
    document.getElementById(
        "uploadTitle"
    );


const uploadDescription =
    document.getElementById(
        "uploadDescription"
    );


uploadTabs.forEach(tab => {

    tab.addEventListener(
        "click",
        () => {

            uploadTabs.forEach(
                item =>
                item.classList.remove(
                    "active"
                )
            );

            tab.classList.add(
                "active"
            );


            uploadType =
                tab.dataset.type;


            if (
                uploadType ===
                "music"
            ) {

                uploadIcon.textContent =
                    "🎵";

                uploadTitle.textContent =
                    "Upload Your Music";

                uploadDescription.textContent =
                    "Select an audio file from your device.";

                mediaFile.accept =
                    "audio/*";

            } else {

                uploadIcon.textContent =
                    "🎬";

                uploadTitle.textContent =
                    "Upload Your Video";

                uploadDescription.textContent =
                    "Select a video file from your device.";

                mediaFile.accept =
                    "video/*";

            }


            mediaFile.value = "";

            document.getElementById(
                "selectedFile"
            ).textContent =
                "No file selected";

        }
    );

});


/* =====================================================
   FILE SELECT
===================================================== */

mediaFile.addEventListener(
    "change",
    () => {

        const file =
            mediaFile.files[0];

        if (!file) {

            document.getElementById(
                "selectedFile"
            ).textContent =
                "No file selected";

            return;
        }


        document.getElementById(
            "selectedFile"
        ).textContent =
            `${file.name} • ${formatBytes(file.size)}`;

    }
);


/* =====================================================
   DRAG & DROP
===================================================== */

const dropZone =
    document.getElementById(
        "dropZone"
    );


dropZone.addEventListener(
    "dragover",
    event => {

        event.preventDefault();

        dropZone.classList.add(
            "dragover"
        );

    }
);


dropZone.addEventListener(
    "dragleave",
    () => {

        dropZone.classList.remove(
            "dragover"
        );

    }
);


dropZone.addEventListener(
    "drop",
    event => {

        event.preventDefault();

        dropZone.classList.remove(
            "dragover"
        );


        const files =
            event.dataTransfer.files;


        if (files.length > 0) {

            mediaFile.files =
                files;

            mediaFile.dispatchEvent(
                new Event("change")
            );

        }

    }
);


/* =====================================================
   FILE SIZE
===================================================== */

function formatBytes(bytes) {

    if (bytes === 0) {
        return "0 Bytes";
    }


    const units = [
        "Bytes",
        "KB",
        "MB",
        "GB"
    ];


    const index =
        Math.floor(
            Math.log(bytes) /
            Math.log(1024)
        );


    return (
        parseFloat(
            (
                bytes /
                Math.pow(
                    1024,
                    index
                )
            ).toFixed(2)
        ) +
        " " +
        units[index]
    );

}


/* =====================================================
   UPLOAD
===================================================== */

document.getElementById(
    "uploadForm"
).addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const file =
            mediaFile.files[0];


        const title =
            document.getElementById(
                "mediaTitle"
            ).value.trim();


        const uploader =
            document.getElementById(
                "uploaderName"
            ).value.trim();


        if (!file) {

            showToast(
                "Please select a file.",
                "⚠️"
            );

            return;
        }


        if (!title) {

            showToast(
                "Enter a title.",
                "⚠️"
            );

            return;
        }


        if (!uploader) {

            showToast(
                "Enter your name.",
                "⚠️"
            );

            return;
        }


        /* ================= LIMIT ================= */

        const maxSize =
            100 * 1024 * 1024;


        if (file.size > maxSize) {

            showToast(
                "Maximum file size is 100 MB.",
                "⚠️"
            );

            return;
        }


        /* ================= TYPE ================= */

        if (
            uploadType === "music" &&
            !file.type.startsWith(
                "audio/"
            )
        ) {

            showToast(
                "Please select an audio file.",
                "⚠️"
            );

            return;
        }


        if (
            uploadType === "video" &&
            !file.type.startsWith(
                "video/"
            )
        ) {

            showToast(
                "Please select a video file.",
                "⚠️"
            );

            return;
        }


        /*
            DEMO LOCAL FILE URL

            This works during the current
            browser session.

            For REAL PUBLIC UPLOADS,
            replace this section with
            Firebase/Supabase Storage.
        */

        const fileURL =
            URL.createObjectURL(
                file
            );


        const item = {

            id:
                Date.now().toString(),

            title:
                title,

            uploader:
                uploader,

            file:
                fileURL,

            fileName:
                file.name,

            fileType:
                file.type,

            size:
                file.size,

            uploadedAt:
                new Date().toISOString()

        };


        if (
            uploadType ===
            "music"
        ) {

            musicFiles.unshift(
                item
            );


            /*
                Store metadata.

                NOTE:
                Blob URL itself is temporary.
            */

            try {

                localStorage.setItem(
                    "trendoraMusicFiles",
                    JSON.stringify(
                        musicFiles
                    )
                );

            } catch(error) {

                console.log(
                    "Browser storage limit reached."
                );

            }


            renderMusic();


        } else {

            movieFiles.unshift(
                item
            );


            try {

                localStorage.setItem(
                    "trendoraMovieFiles",
                    JSON.stringify(
                        movieFiles
                    )
                );

            } catch(error) {

                console.log(
                    "Browser storage limit reached."
                );

            }


            renderMovies();

        }


        updateMediaCounters();


        this.reset();


        document.getElementById(
            "selectedFile"
        ).textContent =
            "No file selected";


        showToast(
            "Published successfully!",
            "🚀"
        );


        setTimeout(() => {

            if (
                uploadType ===
                "music"
            ) {

                document.getElementById(
                    "music"
                ).scrollIntoView({
                    behavior: "smooth"
                });

            } else {

                document.getElementById(
                    "movies"
                ).scrollIntoView({
                    behavior: "smooth"
                });

            }

        }, 400);

    }
);


/* =====================================================
   MUSIC SEARCH
===================================================== */

document.getElementById(
    "musicSearch"
).addEventListener(
    "input",
    function() {

        const query =
            this.value
            .toLowerCase()
            .trim();


        const filtered =
            musicFiles.filter(
                item =>

                item.title
                    .toLowerCase()
                    .includes(query)

                ||

                item.uploader
                    .toLowerCase()
                    .includes(query)
            );


        renderMusic(
            filtered
        );

    }
);


/* =====================================================
   MOVIE SEARCH
===================================================== */

document.getElementById(
    "movieSearch"
).addEventListener(
    "input",
    function() {

        const query =
            this.value
            .toLowerCase()
            .trim();


        const filtered =
            movieFiles.filter(
                item =>

                item.title
                    .toLowerCase()
                    .includes(query)

                ||

                item.uploader
                    .toLowerCase()
                    .includes(query)
            );


        renderMovies(
            filtered
        );

    }
);


/* =====================================================
   CATEGORY BUTTONS
===================================================== */

document.querySelectorAll(
    ".categoryCard"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const text =
                button
                .querySelector("span")
                .textContent;

            showToast(
                `${text} category selected`,
                "✨"
            );

        }
    );

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";


        sections.forEach(
            section => {

                const top =
                    section.offsetTop
                    - 150;


                if (
                    window.scrollY >=
                    top
                ) {

                    current =
                        section.id;

                }

            }
        );


        document.querySelectorAll(
            "#mainNav a"
        ).forEach(
            link => {

                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute(
                        "href"
                    ) ===
                    "#" + current
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

renderMusic();

renderMovies();

updateMediaCounters();

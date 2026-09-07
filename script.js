/* =====================================================
   TRENDORA JAVASCRIPT
===================================================== */


/* =====================================================
   PRELOADER
===================================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader =
            document.getElementById("preloader");

        if (loader) {
            loader.classList.add("hide");
        }

    }, 1000);

});


/* =====================================================
   MOBILE MENU
===================================================== */

function toggleMenu() {

    const nav =
        document.getElementById("navMenu");

    nav.classList.toggle("active");

}


/* Close mobile menu after clicking */

document.querySelectorAll("#navMenu a")
.forEach(link => {

    link.addEventListener("click", () => {

        document
            .getElementById("navMenu")
            .classList.remove("active");

    });

});


/* =====================================================
   SMOOTH SCROLL
===================================================== */

function scrollToSection(id) {

    const element =
        document.getElementById(id);

    if (element) {

        element.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* =====================================================
   MESSAGE
===================================================== */

let messageTimer;

function showMessage(text) {

    const box =
        document.getElementById("messageBox");

    clearTimeout(messageTimer);

    box.textContent = text;

    box.classList.add("show");

    messageTimer = setTimeout(() => {

        box.classList.remove("show");

    }, 2800);

}


/* =====================================================
   YEAR
===================================================== */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =====================================================
   VISITOR COUNTER
===================================================== */

/*
   DEMO VERSION

   localStorage counts visits on the current
   browser/device.

   It is NOT a global website counter.

   For a real global counter, connect a database
   such as Firebase or Supabase.
*/

let visitors =
    Number(
        localStorage.getItem("trendoraVisitors")
    ) || 0;

visitors++;

localStorage.setItem(
    "trendoraVisitors",
    visitors
);


function updateVisitorDisplays() {

    document.getElementById("visitorCount")
        .textContent = formatNumber(visitors);

    document.getElementById("heroVisitors")
        .textContent = formatNumber(visitors);

}


function formatNumber(number) {

    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + "M";
    }

    if (number >= 1000) {
        return (number / 1000).toFixed(1) + "K";
    }

    return number;
}


updateVisitorDisplays();


/* =====================================================
   LIVE VIEWERS
===================================================== */

/*
   This is a visual demo.

   It does not represent the actual number
   of people on the website.

   A real live viewer count requires a server.
*/

let onlineUsers =
    Math.floor(Math.random() * 8) + 3;


function updateOnlineDisplays() {

    document.getElementById("liveCount")
        .textContent = onlineUsers;

    document.getElementById("headerOnline")
        .textContent = onlineUsers;

    document.getElementById("heroOnline")
        .textContent = onlineUsers + " watching";

    document.getElementById("heroOnline")
        .textContent = onlineUsers + " watching";

}


updateOnlineDisplays();


setInterval(() => {

    const change =
        Math.floor(Math.random() * 3) - 1;

    onlineUsers += change;

    if (onlineUsers < 1) {
        onlineUsers = 1;
    }

    if (onlineUsers > 99) {
        onlineUsers = 99;
    }

    updateOnlineDisplays();

}, 5000);


/* =====================================================
   MUSIC DATABASE
===================================================== */

let musicLibrary =
    JSON.parse(
        localStorage.getItem("trendoraMusic")
    ) || [];


/* =====================================================
   DISPLAY MUSIC
===================================================== */

function displayMusic(list = musicLibrary) {

    const musicList =
        document.getElementById("musicList");

    musicList.innerHTML = "";


    if (list.length === 0) {

        musicList.innerHTML = `

            <div class="music-item">

                <div class="music-icon">
                    🎵
                </div>

                <div class="music-details">

                    <h3>
                        No music available yet
                    </h3>

                    <p>
                        The Trendora creator can upload
                        music from the admin panel below.
                    </p>

                </div>

            </div>

        `;

        updateSongCount();

        return;
    }


    list.forEach(song => {

        const item =
            document.createElement("div");

        item.className = "music-item";


        const icon =
            document.createElement("div");

        icon.className = "music-icon";

        icon.textContent = "🎵";


        const details =
            document.createElement("div");

        details.className = "music-details";


        const title =
            document.createElement("h3");

        title.textContent = song.title;


        const artist =
            document.createElement("p");

        artist.textContent =
            song.artist;


        details.appendChild(title);
        details.appendChild(artist);


        const audio =
            document.createElement("audio");

        audio.controls = true;

        audio.src = song.url;


        item.appendChild(icon);
        item.appendChild(details);
        item.appendChild(audio);


        musicList.appendChild(item);

    });


    updateSongCount();

}


/* =====================================================
   SONG COUNT
===================================================== */

function updateSongCount() {

    const count =
        musicLibrary.length;

    document.getElementById("songCount")
        .textContent = count;

    document.getElementById("heroSongs")
        .textContent = count;

}


/* =====================================================
   MUSIC SEARCH
===================================================== */

function searchMusic() {

    const input =
        document.getElementById("musicSearch");

    const search =
        input.value
            .toLowerCase()
            .trim();


    const filtered =
        musicLibrary.filter(song => {

            const title =
                song.title.toLowerCase();

            const artist =
                song.artist.toLowerCase();

            return (
                title.includes(search) ||
                artist.includes(search)
            );

        });


    displayMusic(filtered);

}


/* =====================================================
   ADMIN LOGIN
===================================================== */

/*
   IMPORTANT SECURITY NOTE:

   This password is visible in browser JavaScript.

   It is ONLY suitable for a demo.

   Do NOT use this method for a real private
   administrator account.

   For a real Trendora admin system,
   use Firebase/Supabase authentication.
*/

const ADMIN_PASSWORD =
    "Trendora123";


function unlockAdmin() {

    const password =
        document.getElementById(
            "adminPassword"
        ).value;


    if (password === ADMIN_PASSWORD) {

        document
            .getElementById("uploadArea")
            .classList.remove("hidden");


        showMessage(
            "👑 Creator access unlocked!"
        );


    } else {

        showMessage(
            "❌ Incorrect admin password"
        );

    }

}


/* =====================================================
   MUSIC UPLOAD
===================================================== */

function uploadMusic() {

    const title =
        document
            .getElementById("songTitle")
            .value
            .trim();


    const artist =
        document
            .getElementById("artistName")
            .value
            .trim();


    const file =
        document
            .getElementById("musicFile")
            .files[0];


    if (!title) {

        showMessage(
            "Please enter the song or movie name."
        );

        return;
    }


    if (!artist) {

        showMessage(
            "Please enter the artist name."
        );

        return;
    }


    if (!file) {

        showMessage(
            "Please choose an audio file."
        );

        return;
    }


    if (!file.type.startsWith("audio/")) {

        showMessage(
            "Please select a valid audio file."
        );

        return;
    }


    /*
       Temporary browser URL.

       This lets the current browser play
       the selected audio file.
    */

    const audioURL =
        URL.createObjectURL(file);


    const newSong = {

        title: title,

        artist: artist,

        url: audioURL

    };


    musicLibrary.push(newSong);


    /*
       Save metadata.

       Browser-created Blob URLs are temporary,
       so this is a demo/local system only.
    */

    try {

        localStorage.setItem(
            "trendoraMusic",
            JSON.stringify(musicLibrary)
        );

    } catch (error) {

        console.log(
            "Could not save music metadata:",
            error
        );

    }


    displayMusic();


    document
        .getElementById("songTitle")
        .value = "";


    document
        .getElementById("artistName")
        .value = "";


    document
        .getElementById("musicFile")
        .value = "";


    showMessage(
        "🎵 Music added to Trendora!"
    );

}


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const navLinks =
    document.querySelectorAll(
        "#navMenu a"
    );


window.addEventListener("scroll", () => {

    let current = "home";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 120;

        if (
            window.scrollY >= sectionTop
        ) {
            current =
                section.getAttribute("id");
        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");


        const href =
            link.getAttribute("href");


        if (href === "#" + current) {

            link.classList.add("active");

        }

    });

});


/* =====================================================
   INITIALIZE
===================================================== */

displayMusic();

updateSongCount();

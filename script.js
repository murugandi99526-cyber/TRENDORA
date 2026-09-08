/* =====================================================
   TRENDORA - SUPABASE PUBLIC UPLOAD SYSTEM
   ===================================================== */

// -----------------------------------------------------
// 1. SUPABASE CONNECTION
// -----------------------------------------------------

const SUPABASE_URL =
    "https://sazjxdkhiewqeakzvgma.supabase.co";

const SUPABASE_KEY = "YOUR_COPIED_PUBLIC_KEY";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const STORAGE_BUCKET = "uploads";

// -----------------------------------------------------
// 2. GLOBAL VARIABLES
// -----------------------------------------------------

let allMusic = [];
let allMovies = [];
let selectedFile = null;

// -----------------------------------------------------
// 3. PAGE LOADER
// -----------------------------------------------------

window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.getElementById("loader");

        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 500);

    }, 700);
});

// -----------------------------------------------------
// 4. CURRENT YEAR
// -----------------------------------------------------

document.getElementById("currentYear").textContent =
    new Date().getFullYear();

// -----------------------------------------------------
// 5. MOBILE MENU
// -----------------------------------------------------

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("show");
});

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        navigation.classList.remove("show");
    });
});

// -----------------------------------------------------
// 6. TOAST MESSAGE
// -----------------------------------------------------

function showToast(message, type = "normal") {

    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    if (type === "error") {
        toast.style.borderColor = "#ef4444";
    } else if (type === "success") {
        toast.style.borderColor = "#22c55e";
    } else {
        toast.style.borderColor = "rgba(255,255,255,0.12)";
    }

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);
}

// -----------------------------------------------------
// 7. VISITOR COUNTER
// -----------------------------------------------------

function updateVisitorCounter() {

    let visitors =
        Number(localStorage.getItem("trendoraVisitors")) || 0;

    visitors++;

    localStorage.setItem("trendoraVisitors", visitors);

    document.getElementById("totalVisitors").textContent =
        visitors;

    document.getElementById("heroVisitorCount").textContent =
        visitors;
}

function updateLiveVisitors() {

    /*
       This is a demo online counter.
       A real online-user counter needs a realtime backend.
    */

    const live = Math.floor(Math.random() * 20) + 10;

    document.getElementById("liveVisitors").textContent =
        live;
}

updateVisitorCounter();
updateLiveVisitors();

setInterval(updateLiveVisitors, 15000);

// -----------------------------------------------------
// 8. FILE INPUT
// -----------------------------------------------------

const fileInput = document.getElementById("fileInput");
const selectedFileText = document.getElementById("selectedFile");
const dropArea = document.getElementById("dropArea");

fileInput.addEventListener("change", () => {

    if (!fileInput.files.length) {
        return;
    }

    selectedFile = fileInput.files[0];

    selectedFileText.textContent =
        "Selected: " + selectedFile.name;

});

// Drag and drop

dropArea.addEventListener("dragover", event => {
    event.preventDefault();
    dropArea.classList.add("dragging");
});

dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("dragging");
});

dropArea.addEventListener("drop", event => {

    event.preventDefault();

    dropArea.classList.remove("dragging");

    const files = event.dataTransfer.files;

    if (!files.length) {
        return;
    }

    selectedFile = files[0];

    selectedFileText.textContent =
        "Selected: " + selectedFile.name;

});

// -----------------------------------------------------
// 9. LOAD ALL CONTENT FROM SUPABASE
// -----------------------------------------------------

async function loadContent() {

    await loadMusic();
    await loadMovies();

}

// -----------------------------------------------------
// 10. LOAD MUSIC
// -----------------------------------------------------

async function loadMusic() {

    const loading = document.getElementById("musicLoading");
    const empty = document.getElementById("musicEmpty");
    const list = document.getElementById("musicList");

    loading.classList.remove("hidden");
    empty.classList.add("hidden");

    const { data, error } = await supabaseClient
        .from("uploads")
        .select("*")
        .eq("type", "music")
        .order("created_at", {
            ascending: false
        });

    loading.classList.add("hidden");

    if (error) {
        console.error(error);
        showToast("Unable to load music.", "error");
        return;
    }

    allMusic = data || [];

    renderMusic(allMusic);

}

// -----------------------------------------------------
// 11. LOAD MOVIES
// -----------------------------------------------------

async function loadMovies() {

    const loading = document.getElementById("movieLoading");
    const empty = document.getElementById("movieEmpty");
    const list = document.getElementById("movieList");

    loading.classList.remove("hidden");
    empty.classList.add("hidden");

    const { data, error } = await supabaseClient
        .from("uploads")
        .select("*")
        .eq("type", "movie")
        .order("created_at", {
            ascending: false
        });

    loading.classList.add("hidden");

    if (error) {
        console.error(error);
        showToast("Unable to load videos.", "error");
        return;
    }

    allMovies = data || [];

    renderMovies(allMovies);

}

// -----------------------------------------------------
// 12. RENDER MUSIC
// -----------------------------------------------------

function renderMusic(items) {

    const list = document.getElementById("musicList");
    const empty = document.getElementById("musicEmpty");

    list.innerHTML = "";

    if (!items.length) {
        empty.classList.remove("hidden");
        return;
    }

    empty.classList.add("hidden");

    items.forEach(item => {

        const card = document.createElement("div");

        card.className = "content-card";

        card.innerHTML = `
            <div class="content-card-header">
                🎵
            </div>

            <div class="content-card-body">

                <h3 title="${escapeHTML(item.title)}">
                    ${escapeHTML(item.title)}
                </h3>

                <p>
                    Uploaded by ${escapeHTML(
                        item.uploader_name || "Trendora User"
                    )}
                </p>

                <audio controls preload="metadata">
                    <source src="${item.file_url}">
                    Your browser does not support audio.
                </audio>

                <div class="content-date">
                    ${formatDate(item.created_at)}
                </div>

            </div>
        `;

        list.appendChild(card);

    });

}

// -----------------------------------------------------
// 13. RENDER MOVIES
// -----------------------------------------------------

function renderMovies(items) {

    const list = document.getElementById("movieList");
    const empty = document.getElementById("movieEmpty");

    list.innerHTML = "";

    if (!items.length) {
        empty.classList.remove("hidden");
        return;
    }

    empty.classList.add("hidden");

    items.forEach(item => {

        const card = document.createElement("div");

        card.className = "content-card video";

        card.innerHTML = `
            <div class="content-card-header">
                🎬
            </div>

            <video controls preload="metadata">
                <source src="${item.file_url}">
                Your browser does not support video.
            </video>

            <div class="content-card-body">

                <h3 title="${escapeHTML(item.title)}">
                    ${escapeHTML(item.title)}
                </h3>

                <p>
                    Uploaded by ${escapeHTML(
                        item.uploader_name || "Trendora User"
                    )}
                </p>

                <div class="content-date">
                    ${formatDate(item.created_at)}
                </div>

            </div>
        `;

        list.appendChild(card);

    });

}

// -----------------------------------------------------
// 14. UPLOAD FORM
// -----------------------------------------------------

const uploadForm = document.getElementById("uploadForm");

uploadForm.addEventListener("submit", async event => {

    event.preventDefault();

    const title =
        document.getElementById("contentTitle").value.trim();

    const uploaderName =
        document.getElementById("uploaderName").value.trim()
        || "Trendora User";

    const type =
        document.getElementById("contentType").value;

    const uploadButton =
        document.getElementById("uploadButton");

    const uploadButtonText =
        document.getElementById("uploadButtonText");

    const progressContainer =
        document.getElementById("progressContainer");

    const progressBar =
        document.getElementById("progressBar");

    const progressText =
        document.getElementById("progressText");

    if (!selectedFile) {
        showToast("Please choose a file first.", "error");
        return;
    }

    if (!title) {
        showToast("Please enter a title.", "error");
        return;
    }

    // Maximum file size: 100 MB
    const maxSize = 100 * 1024 * 1024;

    if (selectedFile.size > maxSize) {
        showToast("File must be smaller than 100 MB.", "error");
        return;
    }

    const isAudio =
        selectedFile.type.startsWith("audio/");

    const isVideo =
        selectedFile.type.startsWith("video/");

    if (type === "music" && !isAudio) {
        showToast("Please select an audio file.", "error");
        return;
    }

    if (type === "movie" && !isVideo) {
        showToast("Please select a video file.", "error");
        return;
    }

    uploadButton.disabled = true;
    uploadButtonText.textContent = "Uploading...";
    progressContainer.classList.remove("hidden");

    progressBar.style.width = "20%";
    progressText.textContent = "Preparing file...";

    try {

        // Create a unique filename
        const fileExtension =
            selectedFile.name.split(".").pop();

        const uniqueName =
            Date.now() +
            "-" +
            Math.random().toString(36).substring(2, 10) +
            "." +
            fileExtension;

        const filePath =
            type + "/" + uniqueName;

        progressBar.style.width = "45%";
        progressText.textContent = "Uploading file to storage...";

        // Upload file to Supabase Storage
        const { error: storageError } =
            await supabaseClient.storage
                .from(STORAGE_BUCKET)
                .upload(filePath, selectedFile, {
                    cacheControl: "3600",
                    upsert: false,
                    contentType: selectedFile.type
                });

        if (storageError) {
            throw storageError;
        }

        progressBar.style.width = "75%";
        progressText.textContent = "Saving file information...";

        // Get public URL
        const { data: publicURLData } =
            supabaseClient.storage
                .from(STORAGE_BUCKET)
                .getPublicUrl(filePath);

        const publicURL =
            publicURLData.publicUrl;

        // Save information in database
        const { error: databaseError } =
            await supabaseClient
                .from("uploads")
                .insert({
                    title: title,
                    type: type,
                    file_url: publicURL,
                    file_name: selectedFile.name,
                    uploader_name: uploaderName
                });

        if (databaseError) {
            throw databaseError;
        }

        progressBar.style.width = "100%";
        progressText.textContent = "Upload completed!";

        showToast(
            "Your content is now publicly available!",
            "success"
        );

        uploadForm.reset();
        selectedFile = null;
        selectedFileText.textContent = "";

        setTimeout(() => {
            progressContainer.classList.add("hidden");
            progressBar.style.width = "0%";
        }, 1500);

        await loadContent();

        document.getElementById("music").scrollIntoView({
            behavior: "smooth"
        });

    } catch (error) {

        console.error("Upload error:", error);

        showToast(
            "Upload failed: " + (error.message || "Unknown error"),
            "error"
        );

        progressContainer.classList.add("hidden");

    } finally {

        uploadButton.disabled = false;
        uploadButtonText.textContent = "Upload Publicly ↑";

    }

});

// -----------------------------------------------------
// 15. SEARCH MUSIC
// -----------------------------------------------------

document.getElementById("musicSearch")
    .addEventListener("input", event => {

        const search =
            event.target.value.toLowerCase();

        const filtered =
            allMusic.filter(item =>
                item.title.toLowerCase().includes(search)
            );

        renderMusic(filtered);

    });

// -----------------------------------------------------
// 16. SEARCH MOVIES
// -----------------------------------------------------

document.getElementById("movieSearch")
    .addEventListener("input", event => {

        const search =
            event.target.value.toLowerCase();

        const filtered =
            allMovies.filter(item =>
                item.title.toLowerCase().includes(search)
            );

        renderMovies(filtered);

    });

// -----------------------------------------------------
// 17. UPDATE STATISTICS
// -----------------------------------------------------

function updateStatistics() {

    const musicTotal = allMusic.length;
    const movieTotal = allMovies.length;

    document.getElementById("musicCount").textContent =
        musicTotal;

    document.getElementById("movieCount").textContent =
        movieTotal;

    document.getElementById("heroMusicCount").textContent =
        musicTotal;

    document.getElementById("heroMovieCount").textContent =
        movieTotal;

}

// Replace load functions with statistics update
const originalLoadMusic = loadMusic;
const originalLoadMovies = loadMovies;

// -----------------------------------------------------
// 18. DATE FORMAT
// -----------------------------------------------------

function formatDate(date) {

    if (!date) {
        return "Recently uploaded";
    }

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}

// -----------------------------------------------------
// 19. HTML SECURITY
// -----------------------------------------------------

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}

// -----------------------------------------------------
// 20. LOAD CONTENT AND UPDATE STATS
// -----------------------------------------------------

async function startApplication() {

    await loadContent();
    updateStatistics();

}

startApplication();

// Refresh content every 30 seconds
setInterval(async () => {

    await loadContent();
    updateStatistics();

}, 30000);

// -----------------------------------------------------
// 21. ACTIVE NAVIGATION
// -----------------------------------------------------

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});

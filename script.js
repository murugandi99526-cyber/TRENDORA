/* =========================
   TREND DATA
========================= */

const trends = [
    {
        id: 1,
        title: "Aasa Kooda",
        description: "A popular music trend taking over everyone's playlist.",
        category: "music",
        emoji: "🎵",
        growth: "+92%"
    },
    {
        id: 2,
        title: "Latest Movie",
        description: "The movie everyone is discussing and recommending.",
        category: "movies",
        emoji: "🎬",
        growth: "+84%"
    },
    {
        id: 3,
        title: "Gaming Updates",
        description: "New gaming moments, updates and exciting releases.",
        category: "gaming",
        emoji: "🎮",
        growth: "+76%"
    },
    {
        id: 4,
        title: "AI Robotics",
        description: "The future of artificial intelligence and robotics.",
        category: "technology",
        emoji: "🤖",
        growth: "+88%"
    },
    {
        id: 5,
        title: "Streetwear Style",
        description: "Fresh fashion ideas and creative outfit inspiration.",
        category: "style",
        emoji: "👟",
        growth: "+67%"
    },
    {
        id: 6,
        title: "Viral Challenge",
        description: "A new internet moment that everyone is sharing.",
        category: "viral",
        emoji: "🚀",
        growth: "+95%"
    },
    {
        id: 7,
        title: "Future Gadgets",
        description: "Cool gadgets and inventions changing everyday life.",
        category: "technology",
        emoji: "📱",
        growth: "+72%"
    },
    {
        id: 8,
        title: "New Music Drop",
        description: "Fresh songs and artists gaining attention online.",
        category: "music",
        emoji: "🎧",
        growth: "+81%"
    },
    {
        id: 9,
        title: "Anime World",
        description: "Popular anime characters, stories and fan moments.",
        category: "movies",
        emoji: "🌸",
        growth: "+79%"
    }
];

const liveTrends = [
    {
        title: "Music Buzz",
        description: "The latest songs people are playing repeatedly.",
        emoji: "🎧"
    },
    {
        title: "Movie Talk",
        description: "New releases and fan discussions are rising.",
        emoji: "🍿"
    },
    {
        title: "Gaming Zone",
        description: "Gamers are sharing new clips and updates.",
        emoji: "🕹️"
    },
    {
        title: "Tech Future",
        description: "AI and futuristic inventions are going viral.",
        emoji: "⚡"
    }
];


/* =========================
   DOM ELEMENTS
========================= */

const trendGrid = document.getElementById("trendGrid");
const liveTrendingGrid = document.getElementById("liveTrendingGrid");
const searchInput = document.getElementById("searchInput");
const emptyMessage = document.getElementById("emptyMessage");
const topicCount = document.getElementById("topicCount");
const visitorCount = document.getElementById("visitorCount");

let currentCategory = "all";


/* =========================
   DISPLAY TRENDING CARDS
========================= */

function displayTrends(data) {

    trendGrid.innerHTML = "";

    if (data.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    data.forEach((trend, index) => {

        const liked =
            localStorage.getItem(`liked-${trend.id}`) === "true";

        const card = document.createElement("article");

        card.className = "trend-card";

        card.innerHTML = `
            <div class="trend-card-top">
                <span class="trend-emoji">${trend.emoji}</span>
                <span class="trend-rank">#${index + 1} TREND</span>
            </div>

            <h3>${trend.title}</h3>

            <p>${trend.description}</p>

            <span class="trend-category">${trend.category}</span>

            <div class="trend-growth">
                ↗ ${trend.growth} this week
            </div>

            <div class="trend-actions">

                <button
                    class="like-button ${liked ? "liked" : ""}"
                    onclick="likeTrend(${trend.id}, this)"
                >
                    ${liked ? "♥ Liked" : "♡ Like"}
                </button>

                <button
                    class="share-button"
                    onclick="shareTrend('${trend.title.replace(/'/g, "\\'")}')"
                >
                    ↗ Share
                </button>

            </div>
        `;

        trendGrid.appendChild(card);

    });

}


/* =========================
   DISPLAY LIVE CARDS
========================= */

function displayLiveTrends() {

    liveTrendingGrid.innerHTML = "";

    liveTrends.forEach((trend) => {

        const card = document.createElement("article");

        card.className = "live-card";

        card.innerHTML = `
            <div class="trend-emoji">${trend.emoji}</div>

            <h3>${trend.title}</h3>

            <p>${trend.description}</p>

            <span class="live-tag">
                <span class="live-dot"></span>
                LIVE TRENDING
            </span>
        `;

        liveTrendingGrid.appendChild(card);

    });

}


/* =========================
   FILTER TRENDS
========================= */

function filterTrends(category, clickedButton) {

    currentCategory = category;

    document.querySelectorAll(".category-button").forEach((button) => {
        button.classList.remove("active");
    });

    clickedButton.classList.add("active");

    searchTrends();

}


/* =========================
   SEARCH
========================= */

function searchTrends() {

    const searchText = searchInput.value.toLowerCase().trim();

    const filteredTrends = trends.filter((trend) => {

        const matchesCategory =
            currentCategory === "all" ||
            trend.category === currentCategory;

        const matchesSearch =
            trend.title.toLowerCase().includes(searchText) ||
            trend.description.toLowerCase().includes(searchText) ||
            trend.category.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;

    });

    displayTrends(filteredTrends);

}


/* =========================
   LIKE BUTTON
========================= */

function likeTrend(id, button) {

    const isLiked =
        localStorage.getItem(`liked-${id}`) === "true";

    if (isLiked) {

        localStorage.setItem(`liked-${id}`, "false");

        button.classList.remove("liked");
        button.innerHTML = "♡ Like";

        showToast("Like removed", "♡");

    } else {

        localStorage.setItem(`liked-${id}`, "true");

        button.classList.add("liked");
        button.innerHTML = "♥ Liked";

        showToast("Added to your favourites", "♥");

    }

}


/* =========================
   SHARE BUTTON
========================= */

async function shareTrend(title) {

    const shareText = `Check out "${title}" on Trendora!`;

    if (navigator.share) {

        try {

            await navigator.share({
                title: "Trendora",
                text: shareText,
                url: window.location.href
            });

            showToast("Shared successfully", "↗");

        } catch (error) {

            console.log("Share cancelled");

        }

    } else {

        try {

            await navigator.clipboard.writeText(
                `${shareText} ${window.location.href}`
            );

            showToast("Link copied to clipboard", "✓");

        } catch (error) {

            showToast("Copy failed", "!");

        }

    }

}


/* =========================
   TREND BATTLE
========================= */

let voteOne =
    Number(localStorage.getItem("voteOne")) || 50;

let voteTwo =
    Number(localStorage.getItem("voteTwo")) || 50;

function updateVotes() {

    const total = voteOne + voteTwo;

    const firstPercentage =
        Math.round((voteOne / total) * 100);

    const secondPercentage =
        100 - firstPercentage;

    document.getElementById("voteOneBar").style.width =
        `${firstPercentage}%`;

    document.getElementById("voteTwoBar").style.width =
        `${secondPercentage}%`;

    document.getElementById("voteOneText").textContent =
        `${firstPercentage}%`;

    document.getElementById("voteTwoText").textContent =
        `${secondPercentage}%`;

}

function voteTrend(number) {

    if (number === 1) {

        voteOne++;

        localStorage.setItem("voteOne", voteOne);

        showToast("You voted for Aasa Kooda", "🎵");

    }

    if (number === 2) {

        voteTwo++;

        localStorage.setItem("voteTwo", voteTwo);

        showToast("You voted for Latest Movie", "🎬");

    }

    updateVotes();

}


/* =========================
   NAVIGATION
========================= */

function scrollToTrending() {

    const trendingSection =
        document.getElementById("trending");

    if (trendingSection) {

        trendingSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}

function scrollToBattle() {

    const battleSection =
        document.getElementById("battle");

    if (battleSection) {

        battleSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {

    const mobileMenu =
        document.getElementById("mobileMenu");

    mobileMenu.classList.toggle("show");

}

function closeMenu() {

    const mobileMenu =
        document.getElementById("mobileMenu");

    mobileMenu.classList.remove("show");

}


/* =========================
   TOAST MESSAGE
========================= */

let toastTimeout;

function showToast(message, icon = "✓") {

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");
    const toastIcon = document.getElementById("toastIcon");

    toastMessage.textContent = message;
    toastIcon.textContent = icon;

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);

}


/* =========================
   ANIMATED TOPIC COUNTER
========================= */

function animateTopicCount() {

    let current = 0;
    const target = trends.length;

    const interval = setInterval(() => {

        current++;

        topicCount.textContent = current;

        if (current >= target) {
            clearInterval(interval);
        }

    }, 100);

}


/* =========================
   TOTAL VISITOR COUNTER
========================= */

/*
    This counter increases whenever someone opens
    your website.

    The counter is shared by all visitors.
*/

async function loadVisitorCount() {

    if (!visitorCount) {
        return;
    }

    const counterURL =
        "https://abacus.jasoncameron.dev/hit/trendora/total-visitors";

    try {

        const response = await fetch(counterURL);

        if (!response.ok) {
            throw new Error("Visitor counter request failed");
        }

        const data = await response.json();

        if (data.value !== undefined) {

            visitorCount.textContent =
                Number(data.value).toLocaleString();

        } else {

            visitorCount.textContent = "0";

        }

    } catch (error) {

        console.log("Visitor counter unavailable:", error);

        visitorCount.textContent = "—";

    }

}


/* =========================
   INITIALIZE WEBSITE
========================= */

displayTrends(trends);

displayLiveTrends();

updateVotes();

animateTopicCount();

loadVisitorCount();

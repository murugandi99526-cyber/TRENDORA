/* =========================
   TRENDORA MAIN JAVASCRIPT
========================= */


/* Trending Topics */

const trends = [
    {
        title: "Latest Movie Music",
        description: "Discover the songs everyone is listening to.",
        category: "music",
        icon: "🎵"
    },
    {
        title: "New Movie Releases",
        description: "Explore the latest movies and upcoming releases.",
        category: "movies",
        icon: "🎬"
    },
    {
        title: "AI and Technology",
        description: "The latest developments in technology and AI.",
        category: "technology",
        icon: "💻"
    },
    {
        title: "Popular Sports Updates",
        description: "Catch up on exciting sports discussions.",
        category: "sports",
        icon: "⚽"
    },
    {
        title: "Viral Internet Trends",
        description: "See what is spreading across the internet.",
        category: "viral",
        icon: "🚀"
    },
    {
        title: "Trending Entertainment",
        description: "Popular entertainment news and discussions.",
        category: "movies",
        icon: "✨"
    }
];

let selectedCategory = "all";
let searchText = "";


/* Elements */

const trendingGrid = document.getElementById("trendingGrid");
const liveTrendingList = document.getElementById("liveTrendingList");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const topicCount = document.getElementById("topicCount");
const visitorCount = document.getElementById("visitorCount");


/* Display Trending Cards */

function displayTrends() {
    if (!trendingGrid) return;

    const filteredTrends = trends.filter(function (trend) {

        const matchesCategory =
            selectedCategory === "all" ||
            trend.category === selectedCategory;

        const matchesSearch =
            trend.title.toLowerCase().includes(searchText) ||
            trend.description.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;
    });

    trendingGrid.innerHTML = "";

    filteredTrends.forEach(function (trend, index) {

        const savedLikes =
            Number(localStorage.getItem("like-" + trend.title)) || 0;

        const card = document.createElement("article");
        card.className = "trend-card";

        card.innerHTML = `
            <div class="trend-top">
                <span class="trend-icon">${trend.icon}</span>
                <span class="trend-rank">#${index + 1}</span>
            </div>

            <h3>${trend.title}</h3>

            <p>${trend.description}</p>

            <div class="trend-bottom">
                <span class="trend-category">${trend.category}</span>

                <div class="trend-actions">
                    <button class="action-button"
                        onclick="likeTrend('${trend.title.replace(/'/g, "\\'")}')">
                        ❤️ ${savedLikes}
                    </button>

                    <button class="action-button"
                        onclick="shareTrend('${trend.title.replace(/'/g, "\\'")}')">
                        📤 Share
                    </button>
                </div>
            </div>
        `;

        trendingGrid.appendChild(card);
    });

    if (emptyState) {
        emptyState.style.display =
            filteredTrends.length === 0 ? "block" : "none";
    }
}


/* Live Trending List */

function displayLiveTrends() {
    if (!liveTrendingList) return;

    liveTrendingList.innerHTML = "";

    trends.slice(0, 5).forEach(function (trend, index) {

        const item = document.createElement("div");
        item.className = "live-topic";

        item.innerHTML = `
            ${index + 1}. ${trend.icon} ${trend.title}
        `;

        liveTrendingList.appendChild(item);
    });
}


/* Search */

if (searchInput) {
    searchInput.addEventListener("input", function () {
        searchText = this.value.toLowerCase().trim();
        displayTrends();
    });
}


/* Category Filters */

document.querySelectorAll(".filter-button").forEach(function (button) {

    button.addEventListener("click", function () {

        document.querySelectorAll(".filter-button").forEach(function (item) {
            item.classList.remove("active");
        });

        this.classList.add("active");

        selectedCategory =
            this.getAttribute("data-category");

        displayTrends();
    });

});


/* Like Trend */

function likeTrend(title) {

    const key = "like-" + title;
    const currentLikes = Number(localStorage.getItem(key)) || 0;

    localStorage.setItem(key, currentLikes + 1);

    displayTrends();
}


/* Share Trend */

function shareTrend(title) {

    const shareData = {
        title: "Trendora",
        text: "Check out this trending topic: " + title,
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData).catch(function () {});
    } else {
        navigator.clipboard.writeText(window.location.href);

        alert("Trend link copied!");
    }
}


/* Trend Battle */

function getVotes() {
    return {
        A: Number(localStorage.getItem("battleA")) || 0,
        B: Number(localStorage.getItem("battleB")) || 0
    };
}

function updateVotes() {

    const votes = getVotes();

    const voteCountA = document.getElementById("voteCountA");
    const voteCountB = document.getElementById("voteCountB");

    if (voteCountA) {
        voteCountA.textContent = votes.A + " votes";
    }

    if (voteCountB) {
        voteCountB.textContent = votes.B + " votes";
    }
}

function voteBattle(option) {

    const key = option === "A" ? "battleA" : "battleB";
    const currentVotes = Number(localStorage.getItem(key)) || 0;

    localStorage.setItem(key, currentVotes + 1);

    updateVotes();

    alert("Your vote has been counted! ⚡");
}


/* Visitor Counter */

async function loadVisitorCount() {

    if (!visitorCount) return;

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


/* Topic Count Animation */

function animateTopicCount() {

    if (!topicCount) return;

    let current = 0;
    const target = trends.length;

    const timer = setInterval(function () {

        current++;

        topicCount.textContent = current;

        if (current >= target) {
            clearInterval(timer);
        }

    }, 100);
}


/* Navigation */

function scrollToTrending() {

    const section = document.getElementById("trending");

    if (section) {
        section.scrollIntoView({
            behavior: "smooth"
        });
    }
}

function scrollToMusic() {

    const section = document.getElementById("movieMusic");

    if (section) {
        section.scrollIntoView({
            behavior: "smooth"
        });
    }
}


/* Mobile Menu */

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

if (menuButton && navLinks) {

    menuButton.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(function (link) {

        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
        });

    });
}


/* Movie Music Search */

const musicSearchInput =
    document.getElementById("musicSearchInput");

const musicCards =
    document.querySelectorAll(".music-card");

if (musicSearchInput) {

    musicSearchInput.addEventListener("input", function () {

        const text = this.value.toLowerCase().trim();

        musicCards.forEach(function (card) {

            const cardText =
                card.textContent.toLowerCase();

            card.style.display =
                cardText.includes(text) ? "flex" : "none";
        });

    });
}


/* Movie Music Filters */

document.querySelectorAll(".music-filter").forEach(function (button) {

    button.addEventListener("click", function () {

        document.querySelectorAll(".music-filter").forEach(function (item) {
            item.classList.remove("active");
        });

        this.classList.add("active");

        const category =
            this.getAttribute("data-music-category");

        musicCards.forEach(function (card) {

            const cardCategory =
                card.getAttribute("data-music-category");

            card.style.display =
                category === "all" || category === cardCategory
                    ? "flex"
                    : "none";
        });

    });

});


/* Back to Top */

const backToTop =
    document.getElementById("backToTop");

window.addEventListener("scroll", function () {

    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});

if (backToTop) {

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* Initialize */

displayTrends();
displayLiveTrends();
updateVotes();
animateTopicCount();
loadVisitorCount();

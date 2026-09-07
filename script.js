/* =========================
   TREND DATA
========================= */

const trends = [

    {
        title: "Aasa Kooda",
        description: "A popular Tamil music trend making waves online.",
        category: "music",
        emoji: "🎵",
        growth: "+92%"
    },

    {
        title: "Latest Movie Releases",
        description: "Discover movies people are talking about.",
        category: "movies",
        emoji: "🎬",
        growth: "+84%"
    },

    {
        title: "Gaming Highlights",
        description: "New games, updates and gaming moments.",
        category: "gaming",
        emoji: "🎮",
        growth: "+78%"
    },

    {
        title: "AI Discoveries",
        description: "Explore interesting artificial intelligence tools.",
        category: "ai",
        emoji: "🤖",
        growth: "+96%"
    },

    {
        title: "Internet Memes",
        description: "The latest funny moments across the internet.",
        category: "internet",
        emoji: "🌐",
        growth: "+88%"
    },

    {
        title: "Music Challenges",
        description: "Songs and challenges gaining popularity.",
        category: "music",
        emoji: "🎧",
        growth: "+75%"
    },

    {
        title: "Future Technology",
        description: "Amazing technology changing the future.",
        category: "ai",
        emoji: "⚡",
        growth: "+81%"
    },

    {
        title: "Movie Trailers",
        description: "Upcoming movies and exciting trailers.",
        category: "movies",
        emoji: "🍿",
        growth: "+69%"
    },

    {
        title: "Gaming Updates",
        description: "Fresh updates from the gaming world.",
        category: "gaming",
        emoji: "🕹️",
        growth: "+73%"
    }

];


/* =========================
   LIVE TRENDING DATA
========================= */

const liveTrends = [

    {
        number: "01",
        title: "Music Trends",
        description: "Songs people are discovering",
        growth: "+92%"
    },

    {
        number: "02",
        title: "AI & Technology",
        description: "New tools and inventions",
        growth: "+86%"
    },

    {
        number: "03",
        title: "Gaming World",
        description: "Popular games and updates",
        growth: "+79%"
    },

    {
        number: "04",
        title: "Internet Buzz",
        description: "Topics everyone is discussing",
        growth: "+74%"
    }

];


/* =========================
   DOM ELEMENTS
========================= */

const trendGrid = document.getElementById("trendGrid");
const liveTrendingGrid = document.getElementById("liveTrendingGrid");
const searchInput = document.getElementById("searchInput");
const toast = document.getElementById("toast");


/* =========================
   DISPLAY TREND CARDS
========================= */

function displayTrends(data) {

    if (!trendGrid) return;

    trendGrid.innerHTML = "";

    if (data.length === 0) {

        trendGrid.innerHTML = `
            <div class="no-trends">
                <h3>No trends found 😕</h3>
                <p>Try searching for another topic.</p>
            </div>
        `;

        return;
    }


    data.forEach((trend, index) => {

        const card = document.createElement("div");

        card.className = "trend-card";

        card.innerHTML = `

            <div class="trend-card-top">

                <span class="trend-emoji">
                    ${trend.emoji}
                </span>

                <span class="trend-rank">
                    #${index + 1}
                </span>

            </div>


            <h3>${trend.title}</h3>

            <p>${trend.description}</p>


            <span class="trend-category">
                ${trend.category}
            </span>


            <div class="trend-growth">
                📈 ${trend.growth} popularity
            </div>


            <div class="trend-card-bottom">

                <button
                    class="like-btn"
                    onclick="likeTrend(this)"
                    aria-label="Like this trend">

                    ❤️ <span>0</span>

                </button>


                <button
                    class="share-btn"
                    onclick="shareTrend('${trend.title.replace(/'/g, "\\'")}')"
                    aria-label="Share this trend">

                    🔗 Share

                </button>

            </div>

        `;

        trendGrid.appendChild(card);

    });

}


/* =========================
   DISPLAY LIVE TRENDS
========================= */

function displayLiveTrends() {

    if (!liveTrendingGrid) return;

    liveTrendingGrid.innerHTML = "";


    liveTrends.forEach(trend => {

        const card = document.createElement("div");

        card.className = "live-trend-card";

        card.innerHTML = `

            <div class="live-trend-number">
                ${trend.number}
            </div>

            <div class="live-trend-info">

                <h3>${trend.title}</h3>

                <p>${trend.description}</p>

            </div>

            <div class="live-trend-growth">
                ${trend.growth}
            </div>

        `;

        liveTrendingGrid.appendChild(card);

    });

}


/* =========================
   LIKE FUNCTION
========================= */

function likeTrend(button) {

    const likeCount = button.querySelector("span");

    let count = Number(likeCount.textContent);


    if (button.classList.contains("liked")) {

        count--;

        button.classList.remove("liked");

        showToast("Like removed");

    } else {

        count++;

        button.classList.add("liked");

        showToast("❤️ You liked this trend!");

    }


    likeCount.textContent = count;

}


/* =========================
   SHARE FUNCTION
========================= */

function shareTrend(title) {

    const shareText =
        `Check out "${title}" on Trendora!`;

    const shareUrl = window.location.href;


    if (navigator.share) {

        navigator.share({

            title: "Trendora",

            text: shareText,

            url: shareUrl

        }).catch(() => {});

    } else {

        if (navigator.clipboard) {

            navigator.clipboard.writeText(
                `${shareText} ${shareUrl}`
            );

            showToast("🔗 Link copied!");

        } else {

            showToast("Copy the website link to share!");

        }

    }

}


/* =========================
   CATEGORY FILTER
========================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        const category = button.dataset.category;


        if (category === "all") {

            displayTrends(trends);

        } else {

            displayTrends(
                trends.filter(
                    trend => trend.category === category
                )
            );

        }

    });

});


/* =========================
   SEARCH
========================= */

function searchTrends() {

    if (!searchInput) return;

    const searchTerm =
        searchInput.value.toLowerCase().trim();


    if (searchTerm === "") {

        displayTrends(trends);

        showToast("Showing all trends");

        return;

    }


    const results = trends.filter(trend =>

        trend.title.toLowerCase().includes(searchTerm) ||

        trend.description.toLowerCase().includes(searchTerm) ||

        trend.category.toLowerCase().includes(searchTerm)

    );


    displayTrends(results);

    showToast(`${results.length} trend(s) found`);


    const trendingSection =
        document.getElementById("trending");

    if (trendingSection) {

        trendingSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* Search using Enter key */

if (searchInput) {

    searchInput.addEventListener("keydown", event => {

        if (event.key === "Enter") {
            searchTrends();
        }

    });

}


/* =========================
   SHOW ALL TRENDS
========================= */

function showAllTrends() {

    displayTrends(trends);


    filterButtons.forEach(button => {
        button.classList.remove("active");
    });


    if (filterButtons.length > 0) {
        filterButtons[0].classList.add("active");
    }


    showToast("Showing all trends");

}


/* =========================
   SCROLL FUNCTIONS
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

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");


if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", () => {

        if (mobileMenu.style.display === "flex") {

            mobileMenu.style.display = "none";

        } else {

            mobileMenu.style.display = "flex";

        }

    });

}


/* Close menu after clicking */

document.querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            if (mobileMenu) {
                mobileMenu.style.display = "none";
            }

        });

    });


/* =========================
   TREND BATTLE
========================= */

let votes = {

    "Aasa Kooda": 0,

    "Latest Movie": 0

};


function vote(option, button) {

    votes[option]++;


    button.textContent = "Voted ✓";

    button.disabled = true;

    button.style.background = "#22c55e";


    const totalVotes =
        votes["Aasa Kooda"] +
        votes["Latest Movie"];


    const winner =

        votes["Aasa Kooda"] >= votes["Latest Movie"]

            ? "Aasa Kooda"

            : "Latest Movie";


    const battleResult =
        document.getElementById("battleResult");


    if (battleResult) {

        battleResult.textContent =
            `${winner} is leading! Total votes: ${totalVotes}`;

    }


    showToast(`You voted for ${option}`);

}


/* =========================
   TOAST NOTIFICATION
========================= */

function showToast(message) {

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* =========================
   INITIAL LOAD
========================= */

displayTrends(trends);

displayLiveTrends();

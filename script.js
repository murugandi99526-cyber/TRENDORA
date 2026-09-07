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
const trendCount = document.getElementById("trendCount");
const searchInput = document.getElementById("searchInput");
const toast = document.getElementById("toast");


/* =========================
   DISPLAY TREND CARDS
========================= */

function displayTrends(data) {

    trendGrid.innerHTML = "";

    if (data.length === 0) {

        trendGrid.innerHTML = `
            <div class="trend-card">
                <h3>No trends found</h3>
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
                <span class="trend-emoji">${trend.emoji}</span>
                <span class="trend-rank">#${index + 1}</span>
            </div>

            <h3>${trend.title}</h3>

            <p>${trend.description}</p>

            <span class="trend-category">${trend.category}</span>

            <div class="trend-growth">
                📈 ${trend.growth} popularity
            </div>
        `;

        trendGrid.appendChild(card);

    });

}


/* =========================
   DISPLAY LIVE TRENDS
========================= */

function displayTrends(trends) {
    const trendGrid = document.getElementById("trendGrid");

    if (!trendGrid) return;

    trendGrid.innerHTML = "";

    trends.forEach((trend, index) => {
        const card = document.createElement("div");
        card.className = "trend-card";

        card.innerHTML = `
            <div class="trend-image">
                <img src="${trend.image}" alt="${trend.title}">
                <span class="trend-category">${trend.category}</span>
            </div>

            <div class="trend-content">
                <h3>${trend.title}</h3>
                <p>${trend.description}</p>

                <div class="trend-card-bottom">
                    <span class="trend-views">
                        👁️ ${trend.views || "1K"} views
                    </span>

                    <div class="trend-actions">
                        <button 
                            class="like-btn"
                            onclick="likeTrend(${index}, this)"
                            aria-label="Like this trend">
                            ❤️ <span>${trend.likes || 0}</span>
                        </button>

                        <button 
                            class="share-btn"
                            onclick="shareTrend('${trend.title.replace(/'/g, "\\'")}')"
                            aria-label="Share this trend">
                            🔗 Share
                        </button>
                    </div>
                </div>
            </div>
        `;

        trendGrid.appendChild(card);
    });
                               }

/* =========================
   CATEGORY FILTER
========================= */

const filterButtons = document.querySelectorAll(".filter-btn");

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
                trends.filter(trend => trend.category === category)
            );
        }

    });

});


/* =========================
   SEARCH
========================= */

function searchTrends() {

    const searchTerm = searchInput.value.toLowerCase().trim();

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

    document.getElementById("trending").scrollIntoView({
        behavior: "smooth"
    });

}


/* Search when pressing Enter */

searchInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        searchTrends();
    }

});


/* =========================
   VIEW ALL TRENDS
========================= */

function showAllTrends() {

    displayTrends(trends);

    filterButtons.forEach(button => {
        button.classList.remove("active");
    });

    filterButtons[0].classList.add("active");

    showToast("Showing all trends");

}


/* =========================
   SCROLL FUNCTIONS
========================= */

function scrollToTrending() {
    const trendingSection = document.getElementById("trending");

    if (trendingSection) {
        trendingSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}

function scrollToBattle() {

    document.getElementById("battle").scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {

    if (mobileMenu.style.display === "flex") {

        mobileMenu.style.display = "none";

    } else {

        mobileMenu.style.display = "flex";

    }

});


/* Close mobile menu after clicking a link */

document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {
        mobileMenu.style.display = "none";
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

    const totalVotes = votes["Aasa Kooda"] + votes["Latest Movie"];

    const winner =

        votes["Aasa Kooda"] >= votes["Latest Movie"]
            ? "Aasa Kooda"
            : "Latest Movie";

    document.getElementById("battleResult").textContent =

        `${winner} is leading! Total votes: ${totalVotes}`;

    showToast(`You voted for ${option}`);

}


/* =========================
   TOAST NOTIFICATION
========================= */

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);

}


/* =========================
   ANIMATED COUNTER
========================= */

function animateCounter() {

    let current = 0;

    const target = trends.length;

    const interval = setInterval(() => {

        current++;

        trendCount.textContent = current;

        if (current >= target) {
            clearInterval(interval);
        }

    }, 100);

}


/* =========================
   INITIAL LOAD
========================= */

displayTrends(trends);

displayLiveTrends();

animateCounter();
/* Trend card bottom section */
.trend-card-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-top: 18px;
    flex-wrap: wrap;
}

.trend-views {
    color: #aaa;
    font-size: 13px;
}

/* Like and share buttons */
.trend-actions {
    display: flex;
    gap: 8px;
}

.like-btn,
.share-btn {
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(255, 255, 255, 0.06);
    color: white;
    padding: 8px 11px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 12px;
    transition: 0.3s ease;
}

.like-btn:hover,
.share-btn:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
}

.like-btn.liked {
    background: rgba(255, 60, 100, 0.2);
    border-color: #ff4f81;
    color: #ff6b91;
}

.share-btn {
    color: #8ab4ff;
}

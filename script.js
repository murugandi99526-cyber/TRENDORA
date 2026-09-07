/* =========================================
   TRENDORA - MAIN JAVASCRIPT
========================================= */


/* TRENDING DATA */

const trends = [

    {
        title: "Aasa Kooda",
        category: "music",
        categoryName: "MUSIC",
        description: "The song that keeps appearing on everyone's playlist.",
        icon: "🎵",
        bg: "music-bg",
        growth: "+92%",
        rank: 1
    },

    {
        title: "AI Revolution",
        category: "ai",
        categoryName: "AI & TECH",
        description: "Discover the latest AI tools changing the internet.",
        icon: "🤖",
        bg: "ai-bg",
        growth: "+88%",
        rank: 2
    },

    {
        title: "Gaming Universe",
        category: "gaming",
        categoryName: "GAMING",
        description: "The latest gaming moments everyone is talking about.",
        icon: "🎮",
        bg: "gaming-bg",
        growth: "+76%",
        rank: 3
    },

    {
        title: "Movie Spotlight",
        category: "movies",
        categoryName: "MOVIES",
        description: "Popular movies and the stories behind them.",
        icon: "🎬",
        bg: "movie-bg",
        growth: "+71%",
        rank: 4
    },

    {
        title: "Internet Buzz",
        category: "internet",
        categoryName: "INTERNET",
        description: "Interesting viral topics spreading across the web.",
        icon: "🌐",
        bg: "internet-bg",
        growth: "+65%",
        rank: 5
    },

    {
        title: "Future Tech",
        category: "ai",
        categoryName: "AI & TECH",
        description: "Amazing technology that could change the future.",
        icon: "⚡",
        bg: "ai-bg",
        growth: "+59%",
        rank: 6
    }

];


/* DOM ELEMENTS */

const trendGrid = document.getElementById("trendGrid");
const searchInput = document.getElementById("searchInput");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const toast = document.getElementById("toast");
const trendCount = document.getElementById("trendCount");


/* DISPLAY TRENDS */

function displayTrends(data) {

    trendGrid.innerHTML = "";

    if (data.length === 0) {

        trendGrid.innerHTML = `
            <div class="no-results">
                <h3>😕 No trends found</h3>
                <p>Try searching for something else.</p>
            </div>
        `;

        return;
    }

    data.forEach((trend, index) => {

        const card = document.createElement("div");

        card.className = "trend-card";

        card.innerHTML = `

            <div class="trend-image ${trend.bg}">

                <span class="trend-rank">#${trend.rank}</span>

                <span>${trend.icon}</span>

            </div>

            <div class="trend-content">

                <span class="trend-category">
                    ${trend.categoryName}
                </span>

                <h3>${trend.title}</h3>

                <p>${trend.description}</p>

                <div class="trend-footer">

                    <span class="trend-growth">
                        ↗ ${trend.growth} this week
                    </span>

                    <button onclick="showTrend('${trend.title}')">
                        Explore →
                    </button>

                </div>

            </div>

        `;

        trendGrid.appendChild(card);

    });

}


/* INITIAL LOAD */

displayTrends(trends);


/* ANIMATED TREND COUNT */

let count = 0;

const targetCount = trends.length;

const countInterval = setInterval(() => {

    count++;

    trendCount.textContent = count;

    if (count >= targetCount) {
        clearInterval(countInterval);
    }

}, 150);


/* CATEGORY FILTER */

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

            const filtered = trends.filter(
                trend => trend.category === category
            );

            displayTrends(filtered);

        }

    });

});


/* SEARCH */

function searchTrends() {

    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === "") {

        displayTrends(trends);

        showToast("Showing all trending topics 🔥");

        return;

    }

    const results = trends.filter(trend =>

        trend.title.toLowerCase().includes(searchTerm) ||

        trend.categoryName.toLowerCase().includes(searchTerm) ||

        trend.description.toLowerCase().includes(searchTerm)

    );

    displayTrends(results);

    showToast(`${results.length} trend(s) found 🔍`);

}


/* LIVE SEARCH */

searchInput.addEventListener("input", () => {

    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === "") {

        displayTrends(trends);

        return;

    }

    const results = trends.filter(trend =>

        trend.title.toLowerCase().includes(searchTerm) ||

        trend.categoryName.toLowerCase().includes(searchTerm) ||

        trend.description.toLowerCase().includes(searchTerm)

    );

    displayTrends(results);

});


/* ENTER KEY SEARCH */

searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        searchTrends();
    }

});


/* VIEW ALL */

function showAllTrends() {

    displayTrends(trends);

    searchInput.value = "";

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    document.querySelector('[data-category="all"]').classList.add("active");

    showToast("All trends are now displayed ✨");

}


/* TREND DETAILS */

function showTrend(title) {

    showToast(`Exploring ${title} ✨`);

}


/* TREND BATTLE */

let votes = {
    "Aasa Kooda": 0,
    "Latest Movie": 0
};

function vote(option, button) {

    votes[option]++;

    document.querySelectorAll(".vote-btn").forEach(btn => {
        btn.classList.remove("voted");
    });

    button.classList.add("voted");

    const totalVotes = votes["Aasa Kooda"] + votes["Latest Movie"];

    const percentage = Math.round(
        (votes[option] / totalVotes) * 100
    );

    document.getElementById("battleResult").textContent =
        `You voted for ${option}! ${percentage}% of votes are currently for this trend. ⚡`;

    showToast("Your vote has been counted! 🗳️");

}


/* MOBILE MENU */

menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");

    menuBtn.textContent =
        mobileMenu.classList.contains("open") ? "✕" : "☰";

});


/* CLOSE MOBILE MENU */

document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");

        menuBtn.textContent = "☰";

    });

});


/* SCROLL FUNCTIONS */

function scrollToTrending() {

    document.getElementById("trending").scrollIntoView({
        behavior: "smooth"
    });

}

function scrollToBattle() {

    document.getElementById("battle").scrollIntoView({
        behavior: "smooth"
    });

}


/* TOAST NOTIFICATION */

let toastTimeout;

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

      }

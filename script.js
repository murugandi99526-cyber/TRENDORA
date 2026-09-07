// TREND DATA

const trends = [
    {
        id: 1,
        title: "Aasa Kooda",
        description: "A popular music trend loved by listeners.",
        category: "music",
        emoji: "🎵",
        growth: "+92%"
    },
    {
        id: 2,
        title: "Latest Movie",
        description: "The newest movie creating excitement.",
        category: "movies",
        emoji: "🎬",
        growth: "+85%"
    },
    {
        id: 3,
        title: "Artificial Intelligence",
        description: "AI is changing the future of technology.",
        category: "technology",
        emoji: "🤖",
        growth: "+96%"
    },
    {
        id: 4,
        title: "New Gaming Updates",
        description: "Discover the latest gaming news and updates.",
        category: "gaming",
        emoji: "🎮",
        growth: "+78%"
    },
    {
        id: 5,
        title: "Street Fashion",
        description: "Modern fashion styles becoming popular.",
        category: "fashion",
        emoji: "👕",
        growth: "+74%"
    },
    {
        id: 6,
        title: "Future Gadgets",
        description: "Interesting gadgets and smart devices.",
        category: "technology",
        emoji: "📱",
        growth: "+88%"
    }
];

const liveTrends = [
    {
        id: 101,
        title: "Trending Music",
        description: "People are listening to new music today.",
        category: "music",
        emoji: "🔥",
        growth: "+99%"
    },
    {
        id: 102,
        title: "Viral Technology",
        description: "A new technology topic is getting attention.",
        category: "technology",
        emoji: "⚡",
        growth: "+94%"
    },
    {
        id: 103,
        title: "Popular Gaming",
        description: "Gamers are discussing this topic everywhere.",
        category: "gaming",
        emoji: "🎮",
        growth: "+91%"
    }
];


// HTML ELEMENTS

const trendGrid = document.getElementById("trendGrid");
const liveTrendingGrid = document.getElementById("liveTrendingGrid");
const searchInput = document.getElementById("searchInput");


// DISPLAY TREND CARDS

function createTrendCard(trend) {
    const savedLikes =
        Number(localStorage.getItem("likes-" + trend.id)) || 0;

    return `
        <div class="trend-card">
            <div class="trend-icon">${trend.emoji}</div>

            <p class="trend-category">${trend.category}</p>

            <h3>${trend.title}</h3>

            <p>${trend.description}</p>

            <p class="trend-growth">
                📈 Growing ${trend.growth}
            </p>

            <div class="card-buttons">
                <button
                    class="like-button"
                    id="like-${trend.id}"
                    onclick="likeTrend(${trend.id})"
                >
                    ❤️ <span id="like-count-${trend.id}">${savedLikes}</span>
                </button>

                <button
                    class="share-button"
                    onclick="shareTrend('${trend.title.replace(/'/g, "\\'")}')"
                >
                    🔗 Share
                </button>
            </div>
        </div>
    `;
}


function displayTrends(data) {
    if (!trendGrid) return;

    if (data.length === 0) {
        trendGrid.innerHTML = `
            <p style="text-align:center; color:#94a3b8;">
                No trends found.
            </p>
        `;
        return;
    }

    trendGrid.innerHTML = data.map(createTrendCard).join("");
}


function displayLiveTrends() {
    if (!liveTrendingGrid) return;

    liveTrendingGrid.innerHTML =
        liveTrends.map(createTrendCard).join("");
}


// SEARCH

function searchTrends() {
    const searchText = searchInput.value.toLowerCase().trim();

    const filteredTrends = trends.filter(trend =>
        trend.title.toLowerCase().includes(searchText) ||
        trend.description.toLowerCase().includes(searchText) ||
        trend.category.toLowerCase().includes(searchText)
    );

    displayTrends(filteredTrends);
}


// CATEGORY FILTER

function filterTrends(category, selectedButton) {
    const buttons = document.querySelectorAll(".category-button");

    buttons.forEach(button => {
        button.classList.remove("active");
    });

    selectedButton.classList.add("active");

    if (category === "all") {
        displayTrends(trends);
    } else {
        const filteredTrends = trends.filter(
            trend => trend.category === category
        );

        displayTrends(filteredTrends);
    }
}


// EXPLORE BUTTON

function scrollToTrending() {
    const trendingSection = document.getElementById("trending");

    if (trendingSection) {
        trendingSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}


// LIKE BUTTON

function likeTrend(id) {
    let likes = Number(localStorage.getItem("likes-" + id)) || 0;

    likes++;

    localStorage.setItem("likes-" + id, likes);

    const countElement = document.getElementById("like-count-" + id);
    const buttonElement = document.getElementById("like-" + id);

    if (countElement) {
        countElement.textContent = likes;
    }

    if (buttonElement) {
        buttonElement.classList.add("liked");
    }

    showMessage("Thanks for liking this trend ❤️");
}


// SHARE BUTTON

function shareTrend(title) {
    const shareText = `Check out "${title}" on Trendora!`;

    if (navigator.share) {
        navigator.share({
            title: "Trendora",
            text: shareText,
            url: window.location.href
        }).catch(() => {});
    } else {
        navigator.clipboard.writeText(
            shareText + " " + window.location.href
        );

        showMessage("Trend link copied 🔗");
    }
}


// TREND BATTLE

let aasaVotes =
    Number(localStorage.getItem("aasaVotes")) || 0;

let movieVotes =
    Number(localStorage.getItem("movieVotes")) || 0;


function updateVotes() {
    document.getElementById("aasaVotes").textContent =
        "Votes: " + aasaVotes;

    document.getElementById("movieVotes").textContent =
        "Votes: " + movieVotes;
}


function voteBattle(option) {
    if (option === "aasa") {
        aasaVotes++;
        localStorage.setItem("aasaVotes", aasaVotes);
    }

    if (option === "movie") {
        movieVotes++;
        localStorage.setItem("movieVotes", movieVotes);
    }

    updateVotes();

    showMessage("Your vote has been counted ❤️");
}


// MOBILE MENU

function toggleMenu() {
    const nav = document.querySelector(".navbar nav");

    if (nav) {
        nav.classList.toggle("show");
    }
}


// MESSAGE

function showMessage(message) {
    const oldMessage = document.querySelector(".toast");

    if (oldMessage) {
        oldMessage.remove();
    }

    const toast = document.createElement("div");

    toast.className = "toast";
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2500);
}


// ADD TOAST CSS USING JAVASCRIPT

const toastStyle = document.createElement("style");

toastStyle.textContent = `
    .toast {
        position: fixed;
        bottom: 25px;
        left: 50%;
        transform: translateX(-50%);
        background: #7c3aed;
        color: white;
        padding: 14px 25px;
        border-radius: 30px;
        z-index: 9999;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        animation: toastIn 0.3s ease;
    }

    @keyframes toastIn {
        from {
            opacity: 0;
            transform: translate(-50%, 20px);
        }

        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
`;

document.head.appendChild(toastStyle);


// INITIAL LOAD

displayTrends(trends);
displayLiveTrends();
updateVotes();

const apiKey = 'AIzaSyBdR7bZSxxgP83p-Udae5YzZTM7MELh7_0'; 
const searchInputEl = document.getElementById("searchInput");
const searchButtonEl = document.getElementById("searchBtn");
const profileContainerEl = document.getElementById("profileContainer");
const loadingEl = document.getElementById("loading");

const generateProfile = (profile) => {
    return `
        <div class="profile-box">
            <div class="top-section">
                <div class="left">
                    <div class="avatar">
                        <img alt="avatar of ${profile.snippet.title}" src="${profile.snippet.thumbnails.default.url}" />
                    </div>
                    <div class="self">
                        <h1>${profile.snippet.title}</h1>
                        <h2>@${profile.snippet.customUrl || 'No custom URL'}</h2>
                    </div>
                </div>
                <a href="https://www.youtube.com/channel/${profile.id}" target="_blank">
                    <button class="primary-btn">Check Channel</button>
                </a>
            </div>
            <div class="about">
                <h2>About</h2>
                <p>${profile.snippet.description || "No description available"}</p>
            </div>
            <div class="status">
                <div class="status-item">
                    <h3>Subscribers</h3>
                    <p>${profile.statistics.subscriberCount}</p>
                </div>
                <div class="status-item">
                    <h3>Views</h3>
                    <p>${profile.statistics.viewCount}</p>
                </div>
                <div class="status-item">
                    <h3>Videos</h3>
                    <p>${profile.statistics.videoCount}</p>
                </div>
            </div>
        </div>
    `;
};

const fetchProfile = async () => {
    const username = searchInputEl.value.trim();
    if (!username) {
        profileContainerEl.innerText = "Please enter a username.";
        loadingEl.innerText = "";
        return;
    }

    loadingEl.innerText = "Loading...";
    loadingEl.style.color = "black";

    try {
        const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&forUsername=${username}&key=${apiKey}`;
        const res = await fetch(url);
        const data = await res.json();

        if (res.ok) {
            loadingEl.innerText = "";
            profileContainerEl.innerHTML = generateProfile(data.items[0]);
        } else {
            loadingEl.innerHTML = data.error.message || "Channel not found";
            loadingEl.style.color = "red";
            profileContainerEl.innerText = "";
        }
    } catch (error) {
        console.log({ error });
        loadingEl.innerText = "An error occurred. Please try again.";
        loadingEl.style.color = "red";
        profileContainerEl.innerText = "";
    }
};

searchButtonEl.addEventListener("click", fetchProfile);

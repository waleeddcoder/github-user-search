const APIURL = "https://api.github.com/users/";
const main = document.querySelector("#main");
const searchBox = document.querySelector("#search");
const loading = document.querySelector("#loading");
const gear = document.querySelector(".gearforgithub");
const showGear = () => {
    gear.style.display = "block";
};

const hideGear = () => {
    gear.style.display = "none";
};
const getUser = async (username) => {
    loading.style.display = "block";
    try {
        const response = await fetch(APIURL + username);
        if (response.status === 404) {
            showUserNotFound();
            hideGear();
        } else {
            const data = await response.json();
            const card = `
                <div class="card">
                    <div>
                        <img class="avatar" src="${data.avatar_url}" alt="Florin Pop">
                    </div>
                    <div class="user-info">
                        <h2>${data.name}</h2>
                        <p>${data.bio}</p>
        
                        <ul class="info">
                            <li><strong>Followers</strong>-${data.followers}</li>
                            <li><strong>Following</strong>-${data.following}</li>
                            <li><strong>Repos</strong>-${data.public_repos}</li>
                        </ul>
        
                        <div id="repos">
                          
                        </div>
                    </div>
                </div>
            `;
            main.innerHTML = card;
            getRepos(username);
            showGear();
        }
    } catch (error) {
        showUserNotFound();
        hideGear();
    }
    loading.style.display = "none";
};

loading.style.display = "block";
getUser("waleeddcoder");

const showUserNotFound = () => {
    const oopsImage = document.createElement("img");
    oopsImage.src = "assets/404.png";
    oopsImage.alt = "User not found";
    oopsImage.style.maxWidth = "100%"; // Limit the image width to the container's width
    oopsImage.style.height = "auto"; // Maintain aspect ratio
    oopsImage.style.margin = "0 auto"; // Center the image horizontally
    oopsImage.style.display = "block"; // Ensure it's a block element
    main.innerHTML = "";
    main.appendChild(oopsImage);
};

const getRepos = async (username) => {
    const repos = document.querySelector("#repos");
    const response = await fetch(APIURL + username + "/repos");
    const data = await response.json();
    data.forEach((item) => {
        const elem = document.createElement("a");
        elem.classList.add("repo");
        elem.href = item.html_url;
        elem.innerText = item.name;
        elem.target = "_blank";
        repos.appendChild(elem);
    });
};

const formSubmit = () => {
    if (searchBox.value != "") {
        getUser(searchBox.value);
        searchBox.value = "";
    }
    return false;
};

searchBox.addEventListener("focusout", function () {
    formSubmit();
});
/**
     *   <a class="repo" href="#" target="_blank">Repo 1</a>
                        <a class="repo" href="#" target="_blank">Repo 2</a>
                        <a class="repo" href="#" target="_blank">Repo 3</a>
     */

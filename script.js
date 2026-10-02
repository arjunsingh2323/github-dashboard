const userInput = document.getElementById("usernameInput");
const searchBtn = document.getElementById("searchBtn");


searchBtn.addEventListener("click", async function () {
    const username = usernameInput.value;

    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    console.log(data);

    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
    const reposData = await reposResponse.json();

    console.log(reposData);

    const jsRepos = reposData.filter(function (repo) {
        return repo.language === "JavaScript";
    });

    console.log(jsRepos);

    const languages = reposData.map(function (repo) {
        return repo.language;
    });

    const uniqueLanguages = [...new Set(languages)];

    const cleanedLanguages = uniqueLanguages.filter(function (lang) {
        return lang !== null;
    });

    console.log("cleaned languages:", cleanedLanguages);

    const languageFilter = document.getElementById("languageFilter");

    cleanedLanguages.forEach(function (lang) {
        const option = document.createElement("option");
        option.value = lang;
        option.textContent = lang;
        languageFilter.appendChild(option);
    });

    languageFilter.addEventListener("change", function () {
    const selectedLanguage = languageFilter.value;

    const filteredRepos = reposData.filter(function (repo) {
        if (selectedLanguage === "all") {
            return true;
        }
        return repo.language === selectedLanguage;
    });

    
    const filteredCards = filteredRepos.map(function (repo) {
        return `
      <div class="repo-card">
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description"}</p>
        <p>⭐ ${repo.stargazers_count} | ${repo.language || "Unknown language"}</p>
        <a href="${repo.html_url}" target="_blank">View Repo</a>
      </div>
        `;
    });

        reposDiv.innerHTML = filteredCards.join("");
    });

    


    const repoCards = reposData.map(function (repo) {
        return `
    <div class="repo-card">
      <h3>${repo.name}</h3>
      <p>${repo.description || "No description"}</p>
      <p>⭐ ${repo.stargazers_count} | ${repo.language || "Unknown language"}</p>
      <a href="${repo.html_url}" target="_blank">View Repo</a>
    </div>
    `;
    });

    console.log(repoCards);

    const reposDiv = document.getElementById("repos");
    reposDiv.innerHTML = repoCards.join("");


    const profileDiv = document.getElementById("profile");

    profileDiv.innerHTML = `
        <img src = "${data.avatar_url}" alt ="${data.login}" width ="100">
        <h2>${data.name || data.login}</h2>
        <p>${data.bio || "No bio available"}</p>
        <p>Followers: ${data.followers} | Public Repos: ${data.public_repos}</p>
        <a href = "${data.html_url}" target ="_blank"> View on GitHub</a>
    `;
});


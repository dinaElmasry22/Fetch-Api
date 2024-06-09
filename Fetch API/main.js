let input = document.querySelector("input");
let button = document.querySelector("button");
let showData = document.querySelector(".show-data");

button.onclick=function() {
    getRepos();
};

function getRepos(){
    if(input.value == ""){
        showData.innerHTML = `<span>Please write Github username.</span>`;

    } else {
        fetch(`https://api.github.com/users/${input.value}/repos`)
        .then((response) => response.json())
        .then((repos) => {
            showData.innerHTML="";
            repos.forEach(repo => {
                console.log(repo.name)

                let mainDiv = document.createElement("div")
                let repoName = document.createTextNode(repo.name);
                mainDiv.className="result"
                mainDiv.appendChild(repoName);

                let url = document.createElement("a");
                let urlText = document.createTextNode("Visit");
                url.appendChild(urlText);
                url.href=`https://api.github.com/users/${input.value}/${repo.name}`;
                url.setAttribute('target','_blank');
                url.className="visit-url"
                mainDiv.appendChild(url);

                let starSpan = document.createElement("span")
                let stars = document.createTextNode(`stars ${repo.stargazers_count}`);
                starSpan.appendChild(stars);
                mainDiv.appendChild(starSpan);
                starSpan.className="star-span"
                showData.appendChild(mainDiv);
                
            });
        })
    }
}
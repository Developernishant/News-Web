const API_KEY="f3ca017fce0f4d4e9e151ba78cae643b";
const url ="https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("india"));

function reload (){
    window.location.reload();
}

async function fetchNews (query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardscontainer = document.getElementById('cards-container');
    const newscardtemplate = document.getElementById('template-news-card');

    cardscontainer.innerHTML ='';

    articles.forEach(article=> { 
        if (!article.urlToImage) return;
        const cardClone = newscardtemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardscontainer.appendChild(cardClone);
    });
}



function fillDataInCard(cardClone,article){
    const newsimg = cardClone.querySelector('#news-image');
    const newstitle = cardClone.querySelector('#news-title');
    const newsource= cardClone.querySelector('#news-source');
    const newsdesc = cardClone.querySelector('#news-desc');
    
    newsimg.src = article.urlToImage;
    newstitle.innerHTML = article.title;
    newsdesc.innerHTML = article.description;


    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });

    newsource.innerHTML = `${article.source.name} . ${date}`;
 
    cardClone.firstElementChild.addEventListener('click',() => {
        window.open(article.url, "_blank");
    })

}
    let curSelectedNav = null;
    function onNavItemClick(id){
        fetchNews(id);
        const navItem = document.getElementById(id);
        curSelectedNav?.classList.remove("article");
        curSelectedNav = navItem;
        curSelectedNav.classList.add("active");
    }

    const searchButton = document.getElementById("search-button");
    const searchText = document.getElementById("search-text");


    searchButton.addEventListener("click",() => {
        const query =searchText.value;
        if (!query) return;
        fetchNews(query);
        curSelectedNav?.classList.remove("active");
        curSelectedNav = null;
    });
  
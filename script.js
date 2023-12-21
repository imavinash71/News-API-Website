const API_KEY = "16b989fd47b74d7bb24ac18df94afaae";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', ()=> fetchNews('India'))

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res= await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data= await res.json();
    console.log(data)
    bindData(data.articles)
}
function bindData( articles){
    const cardDisplayContainer=document.getElementById('mainContainer')
    const cardTemplateContainer=document.getElementById('templateContainer')

    cardDisplayContainer.innerHTML='';

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone=cardTemplateContainer.content.cloneNode(true);
        fillDataInCard(cardClone, article)
        cardDisplayContainer.appendChild(cardClone)
    });

    function fillDataInCard(cardClone, article){
        const newsCardImage=cardClone.querySelector('#cardImage')
        const newsTitle=cardClone.querySelector('#title')
        const newsSource=cardClone.querySelector('#source')
        const newsDesc=cardClone.querySelector('#description')

        newsCardImage.src=article.urlToImage;
        newsTitle.innerHTML=article.title;
        newsDesc.innerHTML=article.description;

        const date=new Date(article.publishedAt).toLocaleString('en-US', {
            timeZone: 'Asia/Jakarta',
        })

        newsSource.innerHTML=`${article.source.name}. ${date}`;

        cardClone.firstElementChild.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });
        
    }

}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("searchBtn");
const searchText = document.getElementById("searchInput");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

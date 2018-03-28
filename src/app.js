// colocar um link na aplicação escrito Powered by https://newsapi.org/
const apikey = 'd86278570fe14791bc424e9ea624a019';

const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'the-washington-post';

window.addEventListener('load', async e => {
    updateNews();
    await updateSources();
    sourceSelector.value = defaultSource;

    sourceSelector.addEventListener('change', e => {
        updateNews(e.target.value);
    });

    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('sw.js');
            console.log(`Service Worker registrado`);
        } catch (error) {
            console.log(`Falhou ao registrar Service Worker ${error.stack}`);
        }
    }
});


async function updateNews(source = defaultSource) {
    const res = await fetch(`https://newsapi.org/v1/articles?source=${source}&apiKey=${apikey}`);
    const json = await res.json();

    main.innerHTML = json.articles.map(createArticle).join('\n');
}

async function updateSources() {
    const res = await fetch(`https://newsapi.org/v1/sources?apiKey=${apikey}`);
    const json = await res.json();

    sourceSelector.innerHTML = json.sources.map(src => {
        return `<option value="${src.id}">${src.name}</option>`;
    }).join('\n');
}



function createArticle(article) {
    return `
        <div class="article">
            <a href="${article.url}">
                <h2>${article.title}</h2>
                <img src="${article.urlToImage}">
                <p>${article.description}</p>
            </a>
        </div>
    `;
}
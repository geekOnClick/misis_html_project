let data = null;

const renderNews = (catId) => {
    fetch('https://frontend.karpovcourses.net/api/v2/ru/news/' + (catId ? catId : ''))
        .then((res) => res.json())
        .then((resData) => {
            data = resData;
            const mainNews = data.items.slice(0, 3);
            const smallNews = data.items.slice(3, 12);

            const mainNewsTemplate = document.getElementById('main-news-item');
            const smallNewsTemplate = document.getElementById('small-article-item');

            const mainNewsContainer = document.querySelector('.articles__big-column');
            const smallNewsContainer = document.querySelector('.articles__small-column');

            const escapeString = (string) => {
                const symbols = {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;'
                };

                return string.replace(/[&<>]/g, (tag) => {
                    return symbols[tag] || tag;
                });
            };

            // Опасность взлома - необходимо экранировать теги.
            mainNews.forEach((item) => {
                const template = document.createElement('template');
                const categoryData = data.categories.find(
                    (categoryItem) => categoryItem.id === item.category_id
                );
                const sourceData = data.sources.find(
                    (sourceItem) => sourceItem.id === item.source_id
                );
                template.innerHTML = `
    <article class="main-article">
    <div class="main-article__image-container">
        <img class="main-article__image" src=${encodeURI(item.image)} alt="image" />
    </div>
    <div class="main-article__content">
        <span class="article-category main-article__category">${escapeString(
            categoryData.name
        )}</span>
        <h2 class="main-article__title">
        ${escapeString(item.title)}        
        </h2>
        <p class="main-article__text">
        ${escapeString(item.description)}
        </p>
        <span class="article-source main-article__source">${escapeString(sourceData.name)}</span>
    </div>
        </article>
    `;
                mainNewsContainer.appendChild(template.content);
            });
            smallNews.forEach((item) => {
                const template = document.createElement('template');
                const date = new Date(item.date).toLocaleDateString('ru-RU', {
                    month: 'long',
                    day: 'numeric'
                });

                const sourceData = data.sources.find(
                    (sourceItem) => sourceItem.id === item.source_id
                );
                template.innerHTML = `
    <article class="small-article">
    <h2 class="small-article__title">
       ${escapeString(item.description)}
    </h2>
    <p class="small-article__caption">
        <span class="article-date small-article__date">${escapeString(date)}</span>
        <span class="article-source small-article__source">${escapeString(sourceData.name)}</span>
    </p>
    </article>
    `;
                smallNewsContainer.appendChild(template.content);
            });
        });
};
// const createMainNewsItem = (item) => {
//     const categoryData = document.createElement('span');
//     const sourceData = document.createElement('span');

//     const article = document.createElement('article');
//     const imageContainer = document.createElement('div');
//     const image = document.createElement('img');
//     const content = document.createElement('div');
//     const category = document.createElement('span');
//     const title = document.createElement('h2');
//     const text = document.createElement('h2');
//     const source = document.createElement('span');

//     article.classList.add('main-article');
//     imageContainer.classList.add('main-article__image-container');
//     image.classList.add('main-article__image');
//     content.classList.add('main-article__content');
//     category.classList.add('article-category', 'main-article__category');
//     title.classList.add('main-article__title');
//     text.classList.add('main-article__text');
//     source.classList.add('article-source', 'main-article__source');

//     title.textContent = item.title;
//     image.src = item.image;
//     category.textContent = categoryData.name;
//     text.textContent = item.description;
//     source.textContent = 'ИСТОЧНИК';

//     imageContainer.appendChild(image);
//     article.appendChild(imageContainer);
//     content.appendChild(category);
//     content.appendChild(title);
//     content.appendChild(text);
//     content.appendChild(source);
//     article.appendChild(content);

//     return article;
// };

// const createSideNewsItem = (item) => {
//     const dateData = new Date(item.date).toLocaleDateString('ru-RU', {
//         month: 'long',
//         day: 'numeric'
//     });
//     const sourceData = document.createElement('span');

//     const article = document.createElement('article');
//     const title = document.createElement('h2');
//     const caption = document.createElement('p');
//     const date = document.createElement('span');
//     const source = document.createElement('span');

//     article.classList.add('small-article');
//     title.classList.add('small-article__title');
//     caption.classList.add('small-article__caption');
//     date.classList.add('article-date', 'small-article__date');
//     source.classList.add('article-source', 'small-article__source');

//     title.textContent = item.title;
//     date.textContent = dateData;
//     source.textContent = 'ИСТОЧНИК';
//     // source.textContent = sourceData.name;

//     article.appendChild(title);
//     article.appendChild(caption);
//     caption.appendChild(date);
//     caption.append(source);

//     return article;
// };

// Старый вариант №2 через createElement
// mainNews.forEach((item) => {
//     mainNewsContainer.appendChild(createMainNewsItem(item));
// });

// smallNews.forEach((item) => {
//     smallNewsContainer.appendChild(createSideNewsItem(item));
// });

// Старый вариант №1 через template
// smallNews.forEach((item) => {
//     const elem = smallNewsTemplate.content.cloneNode(true);

//     const date = new Date(item.date).toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' });

//     elem.querySelector('.small-article__title').textContent = item.title;
//     elem.querySelector('.small-article__date').textContent = date;

//     smallNewsContainer.appendChild(elem);
// });

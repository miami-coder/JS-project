// Отримуємо елементи
const userInfo = document.getElementById('user-info');
const postsContainer = document.getElementById('posts-container');
const showPostsBtn = document.getElementById('show-posts-btn');

// Робота з даними що передалися саме на цю сторінку
const params = new URLSearchParams(location.search);
const userId = params.get('id');

// Функція для виведення всієї без виключення інфи + рекурсивний виклик якщо якісь значення є об'єктами
function renderObject(obj, parent) {
    for (let key in obj) {
        const value = obj[key];

        if (typeof value !== 'object' || value === null) {
            const p = document.createElement('p');
            const strong = document.createElement('strong');
            strong.textContent = `${key}: `;
            p.appendChild(strong);
            p.append(value);
            parent.appendChild(p);
        }

        else {
            const block = document.createElement('div');
            block.style.marginLeft = '20px';
            block.style.padding = '10px 0';

            const title = document.createElement('p');
            title.style.fontWeight = 'bold';
            title.textContent = key + ':';
            block.appendChild(title);

            renderObject(value, block);
            parent.appendChild(block);
        }
    }
}

// Функція для завантажень даних користувача
async function loadUser() {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await response.json();

        const wrap = document.createElement('div');
        renderObject(user, wrap);
        userInfo.appendChild(wrap);
}

// Функція для завантаження постів
async function loadPosts() {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        const posts = await response.json();

        posts.forEach(post => {
            const block = document.createElement('div');
            block.classList.add('post-block');

            const title = document.createElement('p');
            const tS = document.createElement('strong');
            tS.textContent = "Title: ";
            title.appendChild(tS);
            title.append(post.title);

            const link = document.createElement('a');
            link.href = `post-details.html?postId=${post.id}`;
            link.textContent = 'Деталі поста';

            block.appendChild(title);
            block.appendChild(link);

            postsContainer.appendChild(block);
        });
}

showPostsBtn.onclick = loadPosts;

loadUser();

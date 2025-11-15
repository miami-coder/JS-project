// Отримуємо елементи
const postInfo = document.getElementById('post-info');
const commentsContainer = document.getElementById('comments-container');

// Робота з даними що передалися саме на цю сторінку
const params = new URLSearchParams(location.search);
const postId = params.get('postId');

//  Функція для виводу всієї інфи про пост
async function loadPost() {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        const post = await response.json();

        for (let key in post) {
            const p = document.createElement('p');
            const strong = document.createElement('strong');
            strong.textContent = `${key}: `;
            p.appendChild(strong);
            p.append(post[key]);
            postInfo.appendChild(p);
        }
    } catch (err) {
        postInfo.textContent = `Не завантажились деталі. ${err.message}`;
    }
}

// Функція для виводу коментів
async function loadComments() {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        const comments = await response.json();

        comments.forEach(c => {
            const block = document.createElement('div');
            block.classList.add('comment-block');

            for (let key in c) {
                const p = document.createElement('p');
                const s = document.createElement('strong');
                s.textContent = `${key}: `;
                p.appendChild(s);
                p.append(c[key]);
                block.appendChild(p);
            }

            commentsContainer.appendChild(block);
        });
    } catch (err) {
        commentsContainer.textContent = `Не завантажились коментарі. ${err.message}`;
    }
}

loadPost();
loadComments();

const uContainer = document.getElementById('users-container');
async function displayUsers() {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users`)
        const users = await response.json();
        users.forEach(user => {
            const userBlock = document.createElement('div');
            userBlock.classList.add('user-block');

            // Виводимо айдішнік
            const userId = document.createElement('p');
            const userIdS = document.createElement('strong');
            userIdS.textContent = 'ID: ';
            userId.appendChild(userIdS);
            userId.append(user.id);

            // Виводимо нейми
            const userName = document.createElement('p');
            const userNameS = document.createElement('strong');
            userNameS.textContent = 'Name: ';
            userName.appendChild(userNameS);
            userName.append(user.name);

            // Кнопка для переходу на сторінку з деталями
            const detailLink = document.createElement('a');
            detailLink.classList.add('detail-link');
            detailLink.textContent = 'Деталі користувача';
            detailLink.href = `user-details.html?id=${user.id}`;

            userBlock.appendChild(userId);
            userBlock.appendChild(userName);
            userBlock.appendChild(detailLink);
            uContainer.appendChild(userBlock);
        });
    } catch (err) {
        const errP = document.createElement('p');
        errP.textContent = 'Не вдалося завантажити дані користувачів.';
        uContainer.appendChild(errP);
    }
}
displayUsers();
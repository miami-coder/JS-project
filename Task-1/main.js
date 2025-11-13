// масив збереження даних
let dataStore = [];

// ініціалізація елементів через айдішку
const inputPair = document.getElementById('inputPair');
const addButton = document.getElementById('addButton');
const pairList = document.getElementById('pairList');
const sortByNameButton = document.getElementById('sortByNameButton');
const sortByValueButton = document.getElementById('sortByValueButton');
const deleteButton = document.getElementById('deleteButton');

// функція на перевірку букви-цифри англ-укр
function isValidation(str) {
    return /^[a-zA-Z0-9а-яА-ЯґҐєЄіІїЇ]+$/.test(str);
}

// Add button and validation
function addPair() {
    const rowInput = inputPair.value.trim();
    // перевірки на заповненість полів і синтаксису
    if (rowInput === '') {
        alert('Заповніть поле!');
        return;
    }

    if (rowInput.indexOf('=') === -1) {
        alert('Неправильний синтаксис!');
        return;
    }

    const parts = rowInput.split('=');

    const name = parts[0].trim();
    const value = parts.slice(1).join('=').trim();

    // валідації
    if (name === '' || value === '') {
        alert('Заповніть всі значення!')
        return;
    }

    if (!isValidation(name) || !isValidation(value)) {
        alert('Вводьте тільки буквенно-цифрові символи!')
        return;
    }

    // пушимо в масив інфу
    const newPair = {name: name, value: value};
    dataStore.push(newPair);

    // створюємо і додаємо елемент шо буде відображатись в селекті
    const newOption = document.createElement('option');
    newOption.textContent = `${name}=${value}`;
    newOption.dataset.name = name;
    newOption.dataset.value = value;

    pairList.appendChild(newOption);

    // очищення форми і фокус на неї (для зручності)
    inputPair.value = '';
    inputPair.focus();
}

// подія щоб працював ентер а не тільки кнопка
inputPair.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addPair();
    }
});

// Sort by Name func ідентично і в Sort by Value func
function sortByName() {
    dataStore.sort((a, b) => {
        // if (a.name > b.name) {
        //     return 1;
        // }
        // if (a.name < b.name) {
        //     return -1;
        // }
        // if (a.name === b.name) {
        //     return 0;
        // }

        // використовуємо для сортування кирилиці і латиниці
        return a.name.localeCompare(b.name, 'uk', { sensitivity: 'base' });
    });

    // очищення DOM
    pairList.options.length = 0;

    // перероблюєм DOM на основі відсортованого dataStore
    dataStore.forEach(pair => {
        const newOption = document.createElement('option');
        newOption.textContent = `${pair.name}=${pair.value}`;
        newOption.dataset.name = pair.name;
        newOption.dataset.value = pair.value;

        pairList.appendChild(newOption);
    })
}

// Sort by Value func
function sortByValue() {
    dataStore.sort((a, b) => {
        // if (a.value > b.value) {
        //     return 1;
        // }
        // if (a.value < b.value) {
        //     return -1;
        // }
        // if (a.value === b.value) {
        //     return 0;
        // }
        return a.value.localeCompare(b.value, 'uk', { sensitivity: 'base' });
    })

    pairList.options.length = 0;

    dataStore.forEach(pair => {
        const newOption = document.createElement('option');
        newOption.textContent = `${pair.name}=${pair.value}`;
        newOption.dataset.name = pair.name;
        newOption.dataset.value = pair.value;

        pairList.appendChild(newOption);
    })
}

// Deleted func
function deleteSelected() {

    // отримуємо вибрані елементи
    const selected = Array.from(pairList.selectedOptions);

    if (selected.length === 0) {
        alert('Виберіть елементи для видалення');
        return;
    }

    // масив для видалених елементів
    const deletedPair = [];

    // проходим по масиву і збираєм ключі видалених елементів
    selected.forEach(option => {
        const deleteName = option.dataset.name;
        const deleteValue = option.dataset.value;

        // пушимо дані з видаленої пари
        deletedPair.push({name: deleteName, value: deleteValue});

        // мінусуєм елемент зі списку
        option.remove();
    });

    // фільтруєм масив і лишаєм елементи які не удаляли
    dataStore = dataStore.filter(pair => {
        const isRemoved = deletedPair.some(deletedPair => {
            // перевіряєм за ім'ям і значенням
            return deletedPair.name === pair.name && deletedPair.value === pair.value;
        });
        // вертаєм елементи які не удалялись
        return !isRemoved;
    });
}


// накидаєм івенти на кнопки
addButton.addEventListener('click', addPair);
sortByNameButton.addEventListener('click', sortByName);
sortByValueButton.addEventListener('click', sortByValue);
deleteButton.addEventListener('click', deleteSelected);
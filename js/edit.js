class Editor
{
    constructor()
    {

        if (!document.body.querySelector('#editor'))
        {
            let temp = document.createElement("div");
            temp.id = 'editor';
            document.body.appendChild(temp);
        }

        let type, author, character, characterTwo , background, text, newAct, gameData;

        let editor = document.querySelector('#editor');

        let xhr = new XMLHttpRequest();

        xhr.open('GET', './resources/data/game.json', true);
        xhr.send();
        xhr.onload = () => 
        {
            let text, act, input, temp, up, down, remove, move, element, wrapper, newElem, tempTwo, tempThree;
        
            this.gameData = JSON.parse(xhr.response);

            this.oldGameData = this.gameData;

            this.gameData.forEach(element => 
            {    
                if (element['type'] == 'dialog')
                {
                    dialog(element['type'], element['author'], element['character'], element['background'], element['text']);
                    createAct();
                }
                if (element['type'] == 'groupDialog')
                {
                    groupDialog(element['type'], element['author'], element['character'], element['characterTwo'], element['background'], element['text']);
                    createAct();
                }
                if (element['type'] == 'mind')
                {                    
                    mind(element['type'], element['background'], element['text']);
                    createAct();
                }
            });

            function dialog(type, author, character, background, message)
            {
                act = document.createElement("div");
                act.classList.add('act');
    
                temp = document.createElement("p");
                temp.classList.add('type');
                temp.setAttribute('type', type);
                temp.textContent = 'Диалоговое окно с одним персонажем';
                act.appendChild(temp);
    
                temp = document.createElement("div");
                temp.classList.add('input');
                temp.classList.add('author');
                text = document.createElement("p");
                text.textContent = 'Имя перснонажа: ';
                temp.appendChild(text);
                input = document.createElement("input");
                input.type = 'text';
                input.placeholder = 'Имя персонажа';
                input.value = author;
                temp.appendChild(input);
                act.appendChild(temp);
    
                temp = document.createElement("div");
                temp.classList.add('input');
                temp.classList.add('character');
                text = document.createElement("p");
                text.textContent = 'Персонаж: ';
                temp.appendChild(text);
                input = document.createElement("input");
                input.type = 'text';
                input.placeholder = 'Изображение персонажа';
                input.value = character;
                temp.appendChild(input);
                act.appendChild(temp);
    
                
                temp = document.createElement("div");
                temp.classList.add('input');
                temp.classList.add('background');
                text = document.createElement("p");
                text.textContent = 'Фон: ';
                temp.appendChild(text);
                input = document.createElement("input");
                input.type = 'text';
                input.placeholder = 'Изображение фона';
                input.value = background;
                temp.appendChild(input);
                act.appendChild(temp);
    
                temp = document.createElement("div");
                temp.classList.add('input');
                temp.classList.add('text');
                text = document.createElement("p");
                text.textContent = 'Слова: ';
                temp.appendChild(text);
                input = document.createElement("textarea");
                input.value = message;
                temp.appendChild(input);
                act.appendChild(temp);
    
                remove = document.createElement("p");
                remove.classList.add('delete');
                remove.textContent = 'УДАЛИТЬ';
                remove.addEventListener('click', (e) => 
                {
                    e.target.parentElement.parentElement.nextElementSibling.remove(); 
                    e.target.parentElement.parentElement.remove();
                });
    
                move = document.createElement("div");
                move.classList.add('move');
                up = document.createElement("p");
                down = document.createElement("p");
                up.textContent = 'выше';
                down.textContent = 'ниже';
    
                function swap(elem1, elem2) 
                {
                    const tempOne = elem2.nextElementSibling;
                    const tempTwo = elem2.parentNode;
                    elem1.replaceWith(elem2);
                    tempTwo.insertBefore(elem1, tempOne);
                }
    
                up.addEventListener('click', (e) => 
                {
                    element = e.target.parentElement.parentElement.parentElement;
                    swap(element.previousElementSibling.previousElementSibling, element);
                });
                down.addEventListener('click', (e) => 
                {
                    element = e.target.parentElement.parentElement.parentElement;
                    swap(element, element.nextElementSibling.nextElementSibling);
                });
                move.appendChild(up);
                move.appendChild(down);
                
                temp = document.createElement('div');
                temp.classList.add('controls');
                temp.appendChild(remove);
                temp.appendChild(move);
                act.appendChild(temp);
    
                editor.appendChild(act);

                return act;
            }

            function groupDialog(type, author, character, characterTwo, background, message)
            {
                act = document.createElement("div");
                act.classList.add('act');
    
                temp = document.createElement("p");
                temp.classList.add('type');
                temp.setAttribute('type', type);
                temp.textContent = 'Диалоговое окно с двумя персонажами';
                act.appendChild(temp);
    
                temp = document.createElement("div");
                temp.classList.add('input');
                temp.classList.add('author');
                text = document.createElement("p");
                text.textContent = 'Имя перснонажа: ';
                temp.appendChild(text);
                input = document.createElement("input");
                input.type = 'text';
                input.placeholder = 'Имя персонажа';
                input.value = author;
                temp.appendChild(input);
                act.appendChild(temp);
    
                temp = document.createElement("div");
                temp.classList.add('input');
                temp.classList.add('character');
                text = document.createElement("p");
                text.textContent = 'Персонаж 1: ';
                temp.appendChild(text);
                input = document.createElement("input");
                input.type = 'text';
                input.placeholder = 'Изображение персонажа 1';
                input.value = characterTwo;
                temp.appendChild(input);
                act.appendChild(temp);

                temp = document.createElement("div");
                temp.classList.add('input');
                temp.classList.add('characterTwo');
                text = document.createElement("p");
                text.textContent = 'Персонаж 2: ';
                temp.appendChild(text);
                input = document.createElement("input");
                input.type = 'text';
                input.placeholder = 'Изображение персонажа 2';
                input.value = character;
                temp.appendChild(input);
                act.appendChild(temp);
    
                
                temp = document.createElement("div");
                temp.classList.add('input');
                temp.classList.add('background');
                text = document.createElement("p");
                text.textContent = 'Фон: ';
                temp.appendChild(text);
                input = document.createElement("input");
                input.type = 'text';
                input.placeholder = 'Изображение фона';
                input.value = background;
                temp.appendChild(input);
                act.appendChild(temp);
    
                temp = document.createElement("div");
                temp.classList.add('input');
                temp.classList.add('text');
                text = document.createElement("p");
                text.textContent = 'Слова: ';
                temp.appendChild(text);
                input = document.createElement("textarea");
                input.value = message;
                temp.appendChild(input);
                act.appendChild(temp);
    
                remove = document.createElement("p");
                remove.classList.add('delete');
                remove.textContent = 'УДАЛИТЬ';
                remove.addEventListener('click', (e) => 
                {
                    e.target.parentElement.parentElement.nextElementSibling.remove(); 
                    e.target.parentElement.parentElement.remove();
                });
    
                move = document.createElement("div");
                move.classList.add('move');
                up = document.createElement("p");
                down = document.createElement("p");
                up.textContent = 'выше';
                down.textContent = 'ниже';
    
                function swap(elem1, elem2) 
                {
                    const tempOne = elem2.nextElementSibling;
                    const tempTwo = elem2.parentNode;
                    elem1.replaceWith(elem2);
                    tempTwo.insertBefore(elem1, tempOne);
                }
    
                up.addEventListener('click', (e) => 
                {
                    element = e.target.parentElement.parentElement.parentElement;
                    swap(element.previousElementSibling.previousElementSibling, element);
                });
                down.addEventListener('click', (e) => 
                {
                    element = e.target.parentElement.parentElement.parentElement;
                    swap(element, element.nextElementSibling.nextElementSibling);
                });
                move.appendChild(up);
                move.appendChild(down);
                
                temp = document.createElement('div');
                temp.classList.add('controls');
                temp.appendChild(remove);
                temp.appendChild(move);
                act.appendChild(temp);
    
                editor.appendChild(act);

                return act;
            }

            function mind(type, background, message)
            {
                act = document.createElement("div");
                act.classList.add('act');
    
                temp = document.createElement("p");
                temp.classList.add('type');
                temp.setAttribute('type', type);
                temp.textContent = 'Мысли главного героя';
                act.appendChild(temp)
    
                
                temp = document.createElement("div");
                temp.classList.add('input');
                temp.classList.add('background');
                text = document.createElement("p");
                text.textContent = 'Фон: ';
                temp.appendChild(text);
                input = document.createElement("input");
                input.type = 'text';
                input.placeholder = 'Изображение фона';
                input.value = background;
                temp.appendChild(input);
                act.appendChild(temp);
    
                temp = document.createElement("div");
                temp.classList.add('input');
                temp.classList.add('text');
                text = document.createElement("p");
                text.textContent = 'Слова: ';
                temp.appendChild(text);
                input = document.createElement("textarea");
                input.value = message;
                temp.appendChild(input);
                act.appendChild(temp);
    
                remove = document.createElement("p");
                remove.classList.add('delete');
                remove.textContent = 'УДАЛИТЬ';
                remove.addEventListener('click', (e) => 
                {
                    e.target.parentElement.parentElement.nextElementSibling.remove(); 
                    e.target.parentElement.parentElement.remove();
                });
    
                move = document.createElement("div");
                move.classList.add('move');
                up = document.createElement("p");
                down = document.createElement("p");
                up.textContent = 'выше';
                down.textContent = 'ниже';
    
                function swap(elem1, elem2) 
                {
                    const tempOne = elem2.nextElementSibling;
                    const tempTwo = elem2.parentNode;
                    elem1.replaceWith(elem2);
                    tempTwo.insertBefore(elem1, tempOne);
                }
    
                up.addEventListener('click', (e) => 
                {
                    element = e.target.parentElement.parentElement.parentElement;
                    swap(element.previousElementSibling.previousElementSibling, element);
                });
                down.addEventListener('click', (e) => 
                {
                    element = e.target.parentElement.parentElement.parentElement;
                    swap(element, element.nextElementSibling.nextElementSibling);
                });
                move.appendChild(up);
                move.appendChild(down);
                
                temp = document.createElement('div');
                temp.classList.add('controls');
                temp.appendChild(remove);
                temp.appendChild(move);
                act.appendChild(temp);
    
                editor.appendChild(act);

                return act;
            }


            function createAct()
            {
                //dialog
                wrapper = document.createElement('div');
                wrapper.classList.add('actAddWrapper');
                temp = document.createElement('p');
                temp.textContent = 'добавить диалог';
                temp.classList.add('createAct');
                temp.addEventListener('click', (e) =>
                {
                    newElem = dialog('dialog', '', '', '', '', '');   
                    tempTwo = e.target.parentElement.insertAdjacentElement('beforeBegin', newElem);
                    tempThree = createAct();
                    
                    tempTwo.insertAdjacentElement('beforeBegin', tempThree);
                });
                wrapper = document.createElement('div');
                wrapper.appendChild(temp);

                //groupDialog
                temp = document.createElement('p');
                temp.textContent = 'добавить групповой диалог';
                temp.classList.add('createAct');
                temp.addEventListener('click', (e) =>
                {
                    newElem = groupDialog('groupDialog', '', '', '', '', '', '');   
                    tempTwo = e.target.parentElement.insertAdjacentElement('beforeBegin', newElem);
                    tempThree = createAct();
                    
                    tempTwo.insertAdjacentElement('beforeBegin', tempThree);
                });
                wrapper.appendChild(temp);

                //mind
                wrapper.classList.add('actAddWrapper');
                temp = document.createElement('p');
                temp.textContent = 'мысли гг';
                temp.classList.add('createAct');
                temp.addEventListener('click', (e) =>
                {
                    newElem = mind('mind', '', '', '', '', '', '');   
                    tempTwo = e.target.parentElement.insertAdjacentElement('beforeBegin', newElem);
                    tempThree = createAct();
                    
                    tempTwo.insertAdjacentElement('beforeBegin', tempThree);
                });
                wrapper.appendChild(temp);

                editor.appendChild(wrapper);
                
                return wrapper;
            }
        }

        let back = document.createElement("p");
        back.classList.add('back');
        back.textContent = 'вернуть изменения';
        back.addEventListener('click', () => 
        {
            this.newGameData = this.oldGameData;
            let gameData = new FormData();   
            gameData.append('json', JSON.stringify(this.newGameData));
            
            let updateJSON = fetch('./php/updateJSON.php', 
            {
                method: 'POST',
                body: gameData
            });
            updateJSON.then((result) =>
            {
                result.json().then((result) => 
                {
                    if (result == 'save')
                    {
                        window.location.href = 'index.html';
                    } 
                });
            });
        });
        editor.appendChild(back);

        let save = document.createElement("p");
        save.classList.add('save');
        save.textContent = 'сохранить изменения';
        save.addEventListener('click', () => 
        {
            this.newGameData = [];
            newAct = editor.querySelectorAll('.act');
            newAct.forEach(element =>
            {
                type = element.querySelector('p[type]').getAttribute('type');
                if (type == 'dialog')
                {
                    author = element.querySelector('.author input').value;
                    character = element.querySelector('.character input').value;
                    background = element.querySelector('.background input').value;
                    text = element.querySelector('.text > textarea').value;
                    this.newGameData.push({type, author, character, background, text});
                }
                if (type == 'groupDialog')
                {
                    author = element.querySelector('.author input').value;
                    character = element.querySelector('.character input').value;
                    characterTwo = element.querySelector('.characterTwo input').value;
                    background = element.querySelector('.background input').value;
                    text = element.querySelector('.text > textarea').value;
                    this.newGameData.push({type, author, character, characterTwo, background, text});
                }
                if (type == 'mind')
                {
                    background = element.querySelector('.background input').value;
                    text = element.querySelector('.text > textarea').value;
                    this.newGameData.push({type, author, character, characterTwo, background, text});
                }
            });

            gameData = new FormData();   
            gameData.append('json', JSON.stringify(this.newGameData));
            
            let updateJSON = fetch('./php/updateJSON.php', 
            {
                method: 'POST',
                body: gameData
            });
            updateJSON.then((result) =>
            {
                result.json().then((result) => 
                {
                    if (result == 'save')
                    {
                        //window.location.href = 'index.html';
                    } 
                });
            });
        });

        editor.appendChild(save);
    }
}

let editor = new Editor();

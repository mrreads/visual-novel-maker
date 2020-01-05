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

        let editor = document.querySelector('#editor');

        let xhr = new XMLHttpRequest();

        xhr.open('GET', './resources/data/game.json', true);
        xhr.send();
        xhr.onload = () => 
        {
            let text, act, input, temp;
        
            this.gameData = JSON.parse(xhr.response);

            this.gameData.forEach(element => 
            {    
                if (element['type'] == 'dialog')
                {
                    act = document.createElement("div");
                    act.classList.add('act');

                    temp = document.createElement("p");
                    temp.classList.add('type');
                    temp.setAttribute('type', element['type']);
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
                    input.value = element['author'];
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
                    input.value = element['character'];
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
                    input.value = element['background'];
                    temp.appendChild(input);
                    act.appendChild(temp);

                    temp = document.createElement("div");
                    temp.classList.add('input');
                    temp.classList.add('text');
                    text = document.createElement("p");
                    text.textContent = 'Слова: ';
                    temp.appendChild(text);
                    input = document.createElement("textarea");
                    input.textContent = element['text'];
                    temp.appendChild(input);
                    act.appendChild(temp);

                    editor.appendChild(act);
                }
            });
        }

        let save = document.createElement("p");
        save.classList.add('save');
        save.textContent = 'сохранить изменения';
        save.addEventListener('click', () => 
        {
            this.newGameData = [];
            let type, author, character, background, text;
            let newAct = editor.querySelectorAll('.act');
            newAct.forEach(element =>
            {
                type = element.querySelector('p[type]').getAttribute('type');
                if (type == 'dialog')
                {
                    author = element.querySelector('.author > input').value;
                    character = element.querySelector('.character > input').value;
                    background = element.querySelector('.background > input').value;
                    text = element.querySelector('.text > textarea').textContent;
                }
                
                this.newGameData.push({type, author, character, background, text});
            });

            let gameData = new FormData();   
            gameData.append('json', JSON.stringify(this.newGameData));
            
            let updateJSON = fetch('./php/updateJSON.php', 
            {
                method: 'POST',
                body: gameData
            });
            updateJSON.then((result) =>
            {
                result.json().then(() => 
                {
                    if (result == 'save')
                    {
                        
                    } 
                });
            });

        });
        editor.appendChild(save);
    }
}

let editor = new Editor();

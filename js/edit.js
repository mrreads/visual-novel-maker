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
            let type;
            let author;
            let character;
            let background;
            let text;
            let act;
            let input
            let temp;
        
            this.gameData = JSON.parse(xhr.response);
            
            this.gameData.forEach(element => 
            {    
                if (element['type'] == 'dialog')
                {
                    act = document.createElement("div");
                    act.classList.add('act');

                    temp = document.createElement("p");
                    temp.classList.add('type');
                    temp.textContent = 'Диалоговое окно с одним персонажем';
                    act.appendChild(temp);

                    temp = document.createElement("div");
                    temp.classList.add('input');

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
                    text = document.createElement("p");
                    text.textContent = 'Персонаж: ';
                    input.placeholder = 'Изображение персонажа';
                    temp.appendChild(text);
                    input = document.createElement("input");
                    input.type = 'text';
                    input.value = element['character'];
                    temp.appendChild(input);
                    act.appendChild(temp);

                    
                    temp = document.createElement("div");
                    temp.classList.add('input');
                    text = document.createElement("p");
                    text.textContent = 'Фон: ';
                    input.placeholder = 'Изображение фона';
                    temp.appendChild(text);
                    input = document.createElement("input");
                    input.type = 'text';
                    input.value = element['background'];
                    temp.appendChild(input);
                    act.appendChild(temp);

                    temp = document.createElement("div");
                    temp.classList.add('input');
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
    }
}

let editor = new Editor();

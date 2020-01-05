class Game
{
    constructor(title, background)
    {
        let screen = document.querySelector('#screen');
        screen.innerHTML = '';
        screen.style.backgroundImage = 'url("'+background+'")';

        let menu = document.createElement("div");
        menu.classList.add('menu');
        screen.appendChild(menu);

        let meniTitle = document.createElement("h1");
        meniTitle.classList.add('title');
        meniTitle.textContent = title;
        menu.appendChild(meniTitle);

        let startButton = document.createElement("p");
        startButton.classList.add('button');
        startButton.textContent = 'начать игру';
        menu.appendChild(startButton);
        startButton.addEventListener('click', () => { this.start(); } );
    }

    start() 
    {
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
            let temp;

            this.gameData = JSON.parse(xhr.response);

            temp = this.gameData.shift();
            type = temp['type'];
            author = temp['author'];
            character = temp['character'];
            background = temp['background'];
            text = temp['text'];
            
            game.screen(type, author, character, text, background);

            this.click = (arg) => 
            { 
                if (arg == true)
                {
                    if (this.gameData.length != 0)
                    {
                        temp = this.gameData.shift();
                        type = temp['type'];
                        author = temp['author'];
                        character = temp['character'];
                        background = temp['background'];
                        text = temp['text'];
                        
                        this.screen(type, author, character, text, background)
                    }
                }
            };

        };
    };

    screen(type, author, character, text, background)
    {
        if (type == 'dialog')
        {
            let screen = document.querySelector('#screen');
            screen.innerHTML = '';
            screen.style.backgroundImage = 'url("'+background+'")';

            let messageElement = document.createElement("div");
            messageElement.classList.add('message');
            screen.appendChild(messageElement);

            let authorElement = document.createElement("p");
            authorElement.classList.add('author');
            authorElement.textContent = author;
            messageElement.appendChild(authorElement);

            let characterElement = document.createElement("img");
            characterElement.classList.add('character');
            characterElement.src = character;
            messageElement.appendChild(characterElement);

            let textElement = document.createElement("p");
            textElement.classList.add('text');
            textElement.textContent = text;
            messageElement.appendChild(textElement);

            textElement.addEventListener('click', () => { this.click(true); } );
        }
    }
}

var game = new Game('Название новеллы', './resources/img/bg1.jpg');
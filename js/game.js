class Game
{
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
        }
    }
}

var game = new Game();

let xhr = new XMLHttpRequest();
xhr.open('GET', './../resources/data/game.json', true);
xhr.send();
xhr.onload = () => 
{
    let type;
    let author;
    let character;
    let background;
    let text;

    let gameData = JSON.parse(xhr.response);
    gameData.forEach((act) => 
    {
        type = act['type'];
        author = act['author'];
        character = act['character'];
        background = act['background'];
        text = act['text'];

        game.screen(type, author, character, text, background);
    });
}
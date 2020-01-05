class Game
{
    dialog(author, character, text, background)
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

var game = new Game();
var username = null;
var messageTypes = ['CONNECT', 'CHAT', 'DISCONNECT'];
var stompClient = null;

document.getElementById('usernameForm-form').addEventListener('submit', connect, true)
document.getElementById('sendForm').addEventListener('submit', sendMessage, true)

function connect(event) {
    username = document.getElementById('usernameForm-input').value.trim();
    if(username) {
        var usernameForm = document.getElementById('usernameForm');
        usernameForm.classList.add('hidden');
        var chatForm = document.getElementById('chatForm');
        chatForm.classList.remove('hidden');
        var socket = new SockJS('/chat-room-websocket');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onSuccess, onError);
    }
    event.preventDefault();
}

function onSuccess() {
    stompClient.subscribe('/topic/public', onMessageReceived);
    stompClient.send("/chat/connect", {}, JSON.stringify({sender: username, messageType: messageTypes[0]}) );
}

function onError() {
    //TODO
}

function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);
    var newMessage = document.createElement('div');
    if (message.messageType === messageTypes[0]) {
        newMessage.classList.add('user-connect');
        message.content = message.sender + ' joined!';
        // var newUser = document.createElement('div');
        // newUser.setAttribute("id", message.sender);
        // newUser.appendChild(document.createTextNode(message.sender.toUpperCase()));
        // document.getElementById('chat-user-area').appendChild(newMessage);
    } else if (message.messageType === messageTypes[2]) {
        newMessage.classList.add('user-disconnect');
        message.content = message.sender + ' left!';
        // document.getElementById(message.sender).remove();
    } else {
        newMessage.classList.add('user-chat');
        var element = document.createElement('i');
        var text = document.createTextNode(message.sender.toUpperCase() + ": ");
        element.appendChild(text);
        newMessage.appendChild(element);
    }
    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);
    newMessage.appendChild(textElement);
    document.getElementById('messages').appendChild(newMessage);
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
}

function sendMessage(event) {
    var message = document.getElementById('sendForm-input').value.trim();
    if(message && stompClient) {
        var messageToSend = {
            sender: username,
            content: message,
            messageType: messageTypes[1]
        };
        stompClient.send("/chat/sendMessage", {}, JSON.stringify(messageToSend));
    }
    document.getElementById('sendForm-input').value = '';
    event.preventDefault();
}
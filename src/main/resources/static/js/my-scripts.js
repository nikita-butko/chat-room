var username = null;
var messageTypes = ['CONNECT', 'CHAT', 'DISCONNECT'];
var stompClient = null

function connect() {
    username = document.getElementById('usernameForm-input').value.trim();
    if(username) {
        var usernameForm = document.getElementById('usernameForm');
        usernameForm.classList.add('hidden');
        var chatForm = document.getElementById('chatForm');
        chatForm.classList.remove('hidden');
        var socket = new SockJS('/chat-room-websocket');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
    }
}

function onConnected() {
    stompClient.subscribe('/topic/public', onMessageReceived);
    stompClient.send("/chat/connect", {}, JSON.stringify({sender: username, type: messageTypes[0]}) );
    connectingElement.classList.add('hidden');
}

function onError() {
    //TODO
}

function onMessageReceived(payload) {
    //TODO
}
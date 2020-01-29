var username = null;
var messageTypes = ['CONNECT', 'CHAT', 'DISCONNECT'];
var stompClient = null;
var currentUser = null;

document.getElementById('usernameForm-form').addEventListener('submit', connect, true)
document.getElementById('sendForm').addEventListener('submit', sendMessage, true)

function connect(event) {
    username = document.getElementById('usernameForm-input').value.trim();
    currentUser = document.getElementById('usernameForm-input').value.trim();
    if(username) {
        var usernameForm = document.getElementById('usernameForm');
        usernameForm.classList.add('hidden');
        var chatForm = document.getElementById('chat');
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
    var sender = message.sender;
    if (message.messageType === messageTypes[0]) {
        for( ; ; ) {
            var newContact = document.createElement('li');
            newContact.classList.add('active');
            newContact.id = 'contactId-' + sender;

            var divWithImageAndName = document.createElement('div');
            divWithImageAndName.classList.add('d-flex');
            divWithImageAndName.classList.add('bd-highlight');

            var divWithImage = document.createElement('div');
            divWithImage.classList.add('img_cont');

            var image = document.createElement('img');
            image.classList.add('rounded-circle');
            image.classList.add('user_img');
            image.src = 'https://api.adorable.io/avatars/70/' + sender + '.png';

            var divWithName = document.createElement('div');
            divWithName.classList.add('user_info');

            var spanWithName = document.createElement('span');

            spanWithName.appendChild(document.createTextNode(sender));
            divWithName.appendChild(spanWithName);
            divWithImage.appendChild(image);
            divWithImageAndName.appendChild(divWithImage);
            divWithImageAndName.appendChild(divWithName);
            newContact.appendChild(divWithImageAndName);

            document.getElementById('contacts').appendChild(newContact);
        }
    } else if(message.messageType === messageTypes[2]) {
        var contact = document.getElementById('contactId-' + sender);
        contact.parentNode.removeChild(contact);
    } else {
        var newMessage = document.createElement('div');
        var newMessageClass = 'justify-content-start';
        var divWithMessageAndTimeClass = 'msg_container';
        var spanWithTimeClass = 'msg_time';

        if(currentUser === sender) {
            newMessageClass = 'justify-content-end';
            divWithMessageAndTimeClass = 'msg_container_send';
            spanWithTimeClass = 'msg_time_send';
        }

        newMessage.classList.add('d-flex');
        newMessage.classList.add(newMessageClass);
        newMessage.classList.add('mb-4');

        divWithImage = document.createElement('div');
        divWithImage.classList.add('img_cont_msg');

        image = document.createElement('img');
        image.classList.add('rounded-circle');
        image.classList.add('user_img_msg');
        image.src = 'https://api.adorable.io/avatars/20/' + sender + '.png';

        var divWithMessageAndTime = document.createElement('div');
        divWithMessageAndTime.classList.add(divWithMessageAndTimeClass);

        var spanWithTime = document.createElement('span');
        spanWithTime.classList.add(spanWithTimeClass);

        var date = new Date();
        spanWithTime.appendChild(document.createTextNode(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()));
        divWithMessageAndTime.appendChild(document.createTextNode(message.content));
        divWithMessageAndTime.appendChild(spanWithTime);
        divWithImage.appendChild(image);

        if(currentUser === sender) {
            newMessage.appendChild(divWithMessageAndTime);
            newMessage.appendChild(divWithImage)
        } else {
            newMessage.appendChild(divWithImage);
            newMessage.appendChild(divWithMessageAndTime);
        }

        document.getElementById('messages').appendChild(newMessage);

    }
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
var username = null;
var messageTypes = ['CONNECT', 'CHAT', 'DISCONNECT'];
var stompClient = null;

document.getElementById('usernameForm-form').addEventListener('submit', connect, true)
document.getElementById('sendForm').addEventListener('submit', sendMessage, true)

function connect(event) {
    username = document.getElementById('usernameForm-input').value.trim();
    if(username) {
        var boolean = $.ajax({
            url : '/users/add',
            type: 'POST',
            dataType: 'json',
            data : {username: username},
            success: function(data) {
                var usernameForm = document.getElementById('usernameForm');
                usernameForm.classList.add('hidden');
                var chatForm = document.getElementById('chat');
                chatForm.classList.remove('hidden');
                var socket = new SockJS('/chat-room-websocket');
                stompClient = Stomp.over(socket);
                stompClient.connect({}, onSuccess, onError);
            },
            error: function(data) {
                document.getElementById('errorMessage').removeChild(document.getElementById('errorText'));

                var newErrorText = document.createElement('span');
                newErrorText.id = 'errorText';
                newErrorText.appendChild(document.createTextNode('The user name is already exist, please, choose another one'));
                document.getElementById('errorMessage').appendChild(newErrorText);
            }
        });
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
        $.ajax({
            url : '/users',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                for(var i = 0; i < data.length; i++) {
                    if(!document.getElementById('contactId-' + data[i])) {
                        var newContact = document.createElement('li');
                        newContact.classList.add('active');
                        newContact.id = 'contactId-' + data[i];

                        var divWithImageAndName = document.createElement('div');
                        divWithImageAndName.classList.add('d-flex');
                        divWithImageAndName.classList.add('bd-highlight');

                        var divWithImage = document.createElement('div');
                        divWithImage.classList.add('img_cont');

                        var image = document.createElement('img');
                        image.classList.add('rounded-circle');
                        image.classList.add('user_img');
                        image.src = 'https://api.adorable.io/avatars/70/' + data[i] + '.png';

                        var divWithName = document.createElement('div');
                        divWithName.classList.add('user_info');

                        var spanWithName = document.createElement('span');

                        spanWithName.appendChild(document.createTextNode(data[i]));
                        divWithName.appendChild(spanWithName);
                        divWithImage.appendChild(image);
                        divWithImageAndName.appendChild(divWithImage);
                        divWithImageAndName.appendChild(divWithName);
                        newContact.appendChild(divWithImageAndName);

                        document.getElementById('contacts').appendChild(newContact);
                    }
                }
                document.getElementById('contacts').scrollTop = document.getElementById('contacts').scrollHeight;
            }
        });

        var helloMessage = document.createElement('div');
        helloMessage.classList.add('greeting-message');
        helloMessage.appendChild(document.createTextNode(sender + ' joined!'));

        var infoMessage = document.createElement('div');
        infoMessage.classList.add('info-message');
        infoMessage.appendChild(helloMessage);
        document.getElementById('messages').appendChild(infoMessage);

    } else if(message.messageType === messageTypes[2]) {
        var contact = document.getElementById('contactId-' + sender);
        contact.parentNode.removeChild(contact);

        $.ajax({
            url : '/users/delete',
            type: 'POST',
            dataType: 'json',
            data : {username: sender}
        });

        var goodbyeMessage = document.createElement('div');
        goodbyeMessage.classList.add('goodbye-message');
        goodbyeMessage.appendChild(document.createTextNode(sender + ' left!'));

        var infoMessage = document.createElement('div');
        infoMessage.classList.add('info-message');
        infoMessage.appendChild(goodbyeMessage);
        document.getElementById('messages').appendChild(infoMessage);
    } else {
        var newMessage = document.createElement('div');
        var newMessageClass = 'justify-content-start';
        var divWithMessageAndTimeClass = 'msg_container';
        var spanWithTimeClass = 'msg_time';

        if(username === sender) {
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

        if(username === sender) {
            newMessage.appendChild(divWithMessageAndTime);
            newMessage.appendChild(divWithImage)
        } else {
            newMessage.appendChild(divWithImage);
            newMessage.appendChild(divWithMessageAndTime);
        }

        document.getElementById('messages').appendChild(newMessage);

    }
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
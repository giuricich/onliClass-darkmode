window.onload = () => {

    console.log("Initializing chat variables");

    // dev flag, need to switch when in production
    const dev = false;

    const TYPING_TIMER_LENGTH = 400; // ms

    const typeCounter = 0;
    const typeText = "our name i'm guessing";
    const typeSpeed = 75;

    // form fileds
    const $nameInput = $('#name-input');
    const $numberInput = $('#number-input');

    const $messages = $('#chatRoom'); // Messages area
    const $chatContainer = document.getElementById('chat-container')
    const $inputMessage = document.getElementById('message-input'); // Input message input box

    const $sendButton = $("#sendButton");

    // Prompt for setting a username
    let username;
    let room_num;
    let connected = false;
    let typing = false;
    let lastTypingTime;

    // Sends a chat message -- locally from client
    function sendMessage() {
        let message = $inputMessage.value;
        // Prevent markup from being injected into the message
        message = cleanInput(message);
        // if there is a non-empty message and a socket connection
        if (message && connected) {
            addChatMessage({ username, message }, { kind: "sent" });
            // tell server to execute 'new message' and send along one parameter

            let payload = {
                username: username,
                message: message
            }
            if (!dev) {
                socket.emit('new message', payload);
            }
        }
    }

    const setConnectionInfo = () => {
        username = $nameInput.val().trim()
        room_num = cleanInput($numberInput.val().trim())
        connected = true
        if (!dev) {
            socket.emit('add user', username)
            joinRoom(room_num, username);
        }
    }

    // Adds the visual chat message to the message list
    const addChatMessage = (data, meta) => {


        console.log('about to dispatch event');
        window.dispatchEvent(new CustomEvent('message', { detail: { data, meta } }))

        $chatContainer.scrollTop = $chatContainer.scrollHeight

        // Don't fade the message in if there is an 'X was typing'
        // var $typingMessages = getTypingMessages(data);
        // options = options || {};
        // if ($typingMessages.length !== 0) {
        //     options.fade = false;
        //     $typingMessages.remove();
        // }

        // var $usernameDiv = $('<span class="username"/>')
        //     .text(data.username)
        //     .css('color', getUsernameColor(data.username));
        // var $messageBodyDiv = $('<span class="messageBody">')
        //     .text(data.message);

        // var typingClass = data.typing ? 'typing' : '';
        // var $messageDiv = $('<li class="message"/>')
        //     .data('username', data.username)
        //     .addClass(typingClass)
        //     .append($usernameDiv, $messageBodyDiv);

        // addMessageElement($messageDiv, options);
    }

    // Adds the visual chat typing message
    const addChatTyping = (data) => {
        data.typing = true;
        data.message = 'is typing';
        addChatMessage(data, { kind: "user-typing" });
    }

    // Removes the visual chat typing message
    const removeChatTyping = (data) => {
        getTypingMessages(data).fadeOut(function () {
            $(this).remove();
        });
    }

    // Prevents input from having injected markup - very cool
    const cleanInput = (input) => {
        return $('<div/>').text(input).html();
    }

    // Updates the typing event
    const updateTyping = () => {
        if (connected) {
            if (!typing) {
                if (!dev) {
                    typing = true;
                    socket.emit('typing');
                }
            }
            lastTypingTime = (new Date()).getTime();

            setTimeout(() => {
                var typingTimer = (new Date()).getTime();
                var timeDiff = typingTimer - lastTypingTime;
                if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
                    if (!dev) {
                        socket.emit('stop typing');
                        typing = false;
                    }
                }
            }, TYPING_TIMER_LENGTH);
        }
    }

    // Gets the 'X is typing' messages of a user
    const getTypingMessages = (data) => {
        return $('.typing.message').filter(function (i) {
            return $(this).data('username') === data.username;
        });
    }

    // Keyboard events
    window.onkeydown = ev => {
        if (ev.key === "Enter") {
            if (username && room_num) {
                sendMessage();
                if (!dev) {
                    socket.emit('stop typing');
                }
                typing = false;
            }
        }
    }

    window.onsubmit = () => {
        setConnectionInfo()
    }

    $inputMessage.oninput = () => {
        console.log('message input trigger!');
        updateTyping();
    }

    // $sendButton.click(() => {
    //     sendMessage();
    // });

    if (!dev) {
        // Socket events

        // Whenever the server emits 'entrance', add the login message
        socket.on('entrance', (data) => {
            // Display the welcome message
            let message = `Welcome to the Chat ${data.username}!`
            addChatMessage({ message }, { kind: "welcome" })
        });

        // Whenever the server emits 'new message', update the chat body
        socket.on('new message', (data) => {
            addChatMessage(data, { kind: "received" });
        });

        // Whenever the server emits 'user joined', add it in the chat body
        socket.on('user joined', (data) => {
            let message = `${data.username} has joined the class`
            addChatMessage({ message }, { kind: 'user-join' })
            console.log('this should have been added', message);
        });

        // Whenever the server emits 'user left', log it in the chat body
        socket.on('user left', (data) => {
            let message = `${data.username} has left the class`
            addChatMessage({ message }, { kind: 'user-leave' })

        });

        // Whenever the server emits 'typing', show the typing message
        socket.on('typing', (data) => {
            addChatTyping(data);
        });

        // Whenever the server emits 'stop typing', kill the typing message
        socket.on('stop typing', (data) => {
            removeChatTyping(data);
        });

    }

    const typeWriter = () => {
        if (typeCounter < typeText.length) {
            document.getElementById("header").innerHTML += typeText.charAt(typeCounter);
            typeCounter++;
            setTimeout(typeWriter, typeSpeed);
        }
    }
}

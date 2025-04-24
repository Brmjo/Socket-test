const socket = io("/lobby");
const sendMessageButton = document.getElementById("send-button");

socket.on('connect', () => {
    console.log("Socket namespace:" + socket.nsp);
})

socket.on('someoneConnected', (data) => {
    console.log(data);
    document.getElementById("online-count-display").innerHTML = data.onlineCount;
});

socket.on('someoneDisconnected', (data) => {
    console.log(data);
    document.getElementById("online-count-display").innerHTML = data.onlineCount;
});

socket.on("globalMessage", (data) => {
    alert(data.message);
})

sendMessageButton.addEventListener('click', () => {
    const message = document.getElementById("message-input").value;
    console.log("Test");
    if(!message || message == "") {
        alert("Message cannot be empty.");
        return;
    }
    
    socket.emit("message", {message: message});
})
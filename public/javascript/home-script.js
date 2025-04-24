const usernameInput = document.getElementById("username-input");
const enterButton = document.getElementById("enter-button");

enterButton.addEventListener('click', () => {
    if(!usernameInput || usernameInput.value == "") {
        alert("Bro enter something dumbass");
        return;
    }
    
    window.location.href = `/lobby/${usernameInput.value}`;
})
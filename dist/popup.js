document.getElementById("myButton").onclick = function () {
    console.log("myButton clicked");
    const roomCode = document.getElementById('code').value;
    if (roomCode) {
        window.location.href = `popup2.html?roomCode=${roomCode}`;
    } else {
        alert("Please enter a room code.");
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log("dist/popup.js loaded");
    const joinButton = document.querySelector('.joinbutton');
    if (joinButton) {
        joinButton.addEventListener('click', () => {
            console.log("Join button clicked");
            const roomCode = document.getElementById('code').value;
            if (roomCode) {
                window.location.href = `popup2.html?roomCode=${roomCode}`;
            } else {
                alert("Please enter a room code.");
            }
        });
    } else {
        console.error("Join button not found");
    }
});
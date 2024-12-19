document.getElementById("myButton").onclick = function () {
    console.log("myButton clicked");
    location.href = "popup2.html";
};
document.addEventListener('DOMContentLoaded', () => {
    console.log("popup.js loaded");
    const joinButton = document.querySelector('.joinbutton');
    if (joinButton) {
        joinButton.addEventListener('click', () => {
            console.log("Join button clicked");
            window.location.href = 'popup2.html';
        });
    } else {
        console.error("Join button not found");
    }
});
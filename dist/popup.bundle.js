/******/ (() => { // webpackBootstrap
/*!***********************!*\
  !*** ./dist/popup.js ***!
  \***********************/
document.getElementById("myButton").onclick = function () {
  console.log("myButton clicked");
  var roomCode = document.getElementById('code').value;
  if (roomCode) {
    window.location.href = "popup2.html?roomCode=".concat(roomCode);
  } else {
    alert("Please enter a room code.");
  }
};
document.addEventListener('DOMContentLoaded', function () {
  console.log("dist/popup.js loaded");
  var joinButton = document.querySelector('.joinbutton');
  if (joinButton) {
    joinButton.addEventListener('click', function () {
      console.log("Join button clicked");
      var roomCode = document.getElementById('code').value;
      if (roomCode) {
        window.location.href = "popup2.html?roomCode=".concat(roomCode);
      } else {
        alert("Please enter a room code.");
      }
    });
  } else {
    console.error("Join button not found");
  }
});
/******/ })()
;
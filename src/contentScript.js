import { getDatabase, ref, set, onValue, push } from "firebase/database";
import { app } from './index.js';

(() => {
    let menulistcontainer;

    const challengeBtn = document.createElement("img");

    challengeBtn.src = chrome.runtime.getURL("assets/challenge.png");
    challengeBtn.className = "challenge-icon";
    challengeBtn.title = "Click to challenge others";

    menulistcontainer = document.getElementsByClassName("menu-list main-menu-list")[0];

    menulistcontainer.appendChild(challengeBtn);

    const addNewProblemEventHandler = () => {
        chrome.runtime.sendMessage({ action: "getCurrentTabUrl" }, (response) => {
            if (response && response.currentTabUrl) {
                const roomCode = prompt("Enter the room code to share this problem:");
                if (roomCode) {
                    chrome.runtime.sendMessage({ action: "shareProblem", roomCode, url: response.currentTabUrl });
                    startCountdown(roomCode);
                    notifyParticipants(roomCode, response.currentTabUrl);
                }
            } else {
                console.error('Failed to get current tab URL');
            }
        });
    };

    challengeBtn.addEventListener("click", addNewProblemEventHandler);

    const startCountdown = (roomCode) => {
        const countdownContainer = document.createElement("div");
        countdownContainer.id = "countdown-timer";
        countdownContainer.style.position = "fixed";
        countdownContainer.style.top = "10px";
        countdownContainer.style.right = "10px";
        countdownContainer.style.backgroundColor = "#fff";
        countdownContainer.style.padding = "10px";
        countdownContainer.style.border = "1px solid #ccc";
        countdownContainer.style.borderRadius = "5px";
        countdownContainer.style.zIndex = "1000";
        document.body.appendChild(countdownContainer);

        const updateCountdown = (endTime) => {
            const now = new Date().getTime();
            const distance = endTime - now;

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownContainer.innerHTML = `Time left: ${minutes}m ${seconds}s`;

            if (distance < 0) {
                clearInterval(countdownInterval);
                countdownContainer.innerHTML = "Time's up!";
            }
        };

        const database = getDatabase(app);
        const timerRef = ref(database, 'rooms/' + roomCode + '/timer');
        const endTime = new Date().getTime() + 20 * 60 * 1000; // 20 minutes from now

        set(timerRef, { endTime }).then(() => {
            console.log('Timer set successfully');
        }).catch((error) => {
            console.error('Error setting timer:', error);
        });

        onValue(timerRef, (snapshot) => {
            const timerData = snapshot.val();
            if (timerData && timerData.endTime) {
                const endTime = timerData.endTime;
                updateCountdown(endTime);
                const countdownInterval = setInterval(() => updateCountdown(endTime), 1000);
            }
        });
    };

    const notifyParticipants = (roomCode, problemUrl) => {
        const database = getDatabase(app);
        const participantsRef = ref(database, 'rooms/' + roomCode + '/participants');
        onValue(participantsRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const participant = childSnapshot.val();
                // Logic to notify participants about the new problem
                console.log(`Notifying participant ${participant.username} about the new problem: ${problemUrl}`);
            });
        });
    };
})();
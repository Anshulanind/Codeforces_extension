import { getDatabase, ref, push, set } from "firebase/database";
import { app } from './index.js';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Received message:", message);
    if (message.action === "getCurrentTabUrl") {
        if (chrome.tabs) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const currentTabUrl = tabs[0].url;
                console.log("Current Tab URL:", currentTabUrl);
                sendResponse({ currentTabUrl });
            });
        } else {
            console.error('chrome.tabs is undefined');
        }
        return true; // Indicates that the response will be sent asynchronously
    } else if (message.action === "shareProblem") {
        const database = getDatabase(app);
        const roomRef = ref(database, 'rooms/' + message.roomCode + '/problems');
        push(roomRef, { url: message.url }).then(() => {
            console.log('Problem shared successfully');
        }).catch((error) => {
            console.error('Error sharing problem:', error);
        });
    }
});



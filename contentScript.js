(() => {
    let menulistcontainer;

    const challengeBtn = document.createElement("img");

    challengeBtn.src = chrome.runtime.getURL("assets/challenge.png");
    challengeBtn.className = "challenge-icon";
    challengeBtn.title = "Click to challenge others";

    menulistcontainer = document.getElementsByClassName("menu-list main-menu-list")[0];

    menulistcontainer.appendChild(challengeBtn);

    const addNewProblemEventHandler = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTabUrl = tabs[0].url;
            console.log("Current Tab URL:", currentTabUrl);
        });
    };

    challengeBtn.addEventListener("click", addNewProblemEventHandler);
})();
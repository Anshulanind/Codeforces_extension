import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { app } from '../src/index.js';

document.addEventListener('DOMContentLoaded', () => {
    const createUserForm = document.getElementById('createUserForm');
    createUserForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const roomCode = document.getElementById('roomCode').value;
        console.log('Form submitted:', { name, roomCode });
        createUser(name, roomCode);
    });

    const urlsContainer = document.getElementById('urls');
    const roomCode = new URLSearchParams(window.location.search).get('roomCode');
    if (roomCode) {
        const database = getDatabase(app);
        const urlsRef = ref(database, 'rooms/' + roomCode + '/problems');
        onValue(urlsRef, (snapshot) => {
            urlsContainer.innerHTML = '';
            snapshot.forEach((childSnapshot) => {
                const urlData = childSnapshot.val();
                const urlElement = document.createElement('div');
                urlElement.textContent = urlData.url;
                urlsContainer.appendChild(urlElement);
            });
        });
    }
});

function createUser(name, roomCode) {
    const database = getDatabase(app);
    const userId = Date.now().toString();
    console.log('Creating user:', { userId, name, roomCode });
    set(ref(database, 'rooms/' + roomCode + '/users/' + userId), {
        username: name
    }).then(() => {
        console.log('User created successfully');
        addParticipant(name, roomCode);
        window.location.href = 'popup2.html?roomCode=' + roomCode;
    }).catch((error) => {
        console.error('Error creating user:', error);
    });
}

function addParticipant(name, roomCode) {
    const database = getDatabase(app);
    const participantsRef = ref(database, 'rooms/' + roomCode + '/participants');
    push(participantsRef, {
        username: name
    }).then(() => {
        console.log('Participant added successfully');
    }).catch((error) => {
        console.error('Error adding participant:', error);
    });
}

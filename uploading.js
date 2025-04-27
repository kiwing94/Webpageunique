// Handle sending a message or media
document.getElementById('send-message').addEventListener('click', function() {
    const message = document.getElementById('message-input').value;
    const fileInput = document.getElementById('file-input');
    const user = auth.currentUser;

    if (message.trim() !== '' || fileInput.files.length > 0) {
        // Prepare data for the message
        let messageData = {
            user: user.displayName,
            message: message.trim(),
            timestamp: firebase.database.ServerValue.TIMESTAMP
        };

        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(`chats/${user.uid}/${file.name}`);
            
            // Upload the file
            fileRef.put(file).then(snapshot => {
                // Get the file's URL
                return snapshot.ref.getDownloadURL();
            }).then(url => {
                // Add the URL to the message data
                messageData.mediaUrl = url;
                // Save the message to Firebase Realtime Database
                firebase.database().ref('chats').push(messageData);
                // Clear file input
                fileInput.value = '';
            }).catch(error => {
                console.error("Error uploading file: ", error);
            });
        } else {
            // If there's no file, just save the text message
            firebase.database().ref('chats').push(messageData);
        }

        // Clear the text input
        document.getElementById('message-input').value = '';
    }
});

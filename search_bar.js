const db = firebase.firestore();

function searchDikt() {
  const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();

  if (searchTerm) {
    db.collection('dikter')  // Ersätt med din samling
      .where('text', '>=', searchTerm)
      .where('text', '<=', searchTerm + '\uf8ff')
      .get()
      .then((querySnapshot) => {
        const results = querySnapshot.docs.map(doc => doc.data());
        displayResults(results);
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  } else {
    // Visa inget eller alla om ingen sökning
    displayResults([]);
  }
}

function displayResults(results) {
  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = '';
  
  results.forEach(result => {
    const resultDiv = document.createElement('div');
    resultDiv.textContent = result.text;  // Anpassa beroende på hur dina dikter är strukturerade
    resultsContainer.appendChild(resultDiv);
  });
}

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-TIy3u7uDZ2upqLOG2b769hQ--RpfaNw",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "Webpage",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "Webpage"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Language Translations for Dynamic Content Updates
const translations = {
  en: {
    welcome: "Welcome",
    createLesson: "Create a New Lesson",
    lessonTitle: "Lesson Title",
    description: "Description",
    join: "Join",
    selectLesson: "Select a Lesson to Join:",
    lessonListTitle: "Lesson List"
  },
  sv: {
    welcome: "Välkommen",
    createLesson: "Skapa en ny lektion",
    lessonTitle: "Lektionstitel",
    description: "Beskrivning",
    join: "Deltag",
    selectLesson: "Välj en lektion att delta i:",
    lessonListTitle: "Lektionslista"
  },
  es: {
    welcome: "Bienvenido",
    createLesson: "Crear una nueva lección",
    lessonTitle: "Título de la lección",
    description: "Descripción",
    join: "Unirse",
    selectLesson: "Seleccione una lección para unirse:",
    lessonListTitle: "Lista de lecciones"
  },
  it: {
    welcome: "Benvenuto",
    createLesson: "Crea una nuova lezione",
    lessonTitle: "Titolo della lezione",
    description: "Descrizione",
    join: "Unisciti",
    selectLesson: "Seleziona una lezione a cui partecipare:",
    lessonListTitle: "Elenco delle lezioni"
  },
  pt: {
    welcome: "Bem-vindo",
    createLesson: "Criar uma nova lição",
    lessonTitle: "Título da lição",
    description: "Descrição",
    join: "Junte-se",
    selectLesson: "Selecione uma lição para participar:",
    lessonListTitle: "Lista de lições"
  },
  fr: {
    welcome: "Bienvenue",
    createLesson: "Créer une nouvelle leçon",
    lessonTitle: "Titre de la leçon",
    description: "Description",
    join: "Rejoindre",
    selectLesson: "Sélectionnez une leçon à rejoindre:",
    lessonListTitle: "Liste des leçons"
  }
};

// Function to change the language dynamically
function changeLanguage() {
  const language = document.getElementById('languageSwitcher').value;
  const elements = document.querySelectorAll('[data-translate]');
  
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    element.textContent = translations[language][key];
  });

  saveLanguagePreference(language); // Save language to local storage
}

// Save language preference in localStorage
function saveLanguagePreference(language) {
  localStorage.setItem('language', language);
}

// Load language preference on page load
function loadLanguagePreference() {
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage) {
    document.getElementById('languageSwitcher').value = savedLanguage;
    changeLanguage();
  } else {
    document.getElementById('languageSwitcher').value = 'en'; // Default to English
    changeLanguage();
  }
}

window.onload = loadLanguagePreference;

// User Authentication Functions (Sign-Up, Log-In, Log-Out)
function signUp() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      console.log('User signed up:', userCredential.user);
      redirectToDashboard();
    })
    .catch(error => {
      console.error('Error signing up:', error);
    });
}

function logIn() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      console.log('User logged in:', userCredential.user);
      redirectToDashboard();
    })
    .catch(error => {
      console.error('Error logging in:', error);
    });
}

function logOut() {
  auth.signOut()
    .then(() => {
      console.log('User logged out');
      redirectToLoginPage();
    })
    .catch(error => {
      console.error('Error logging out:', error);
    });
}

function redirectToDashboard() {
  window.location.href = 'dashboard.html';
}

function redirectToLoginPage() {
  window.location.href = 'login.html';
}

// Lesson Management: Create and Join Lessons

// Create a new lesson
function createLesson() {
  const lessonTitle = document.getElementById('lessonTitle').value;
  const lessonDescription = document.getElementById('lessonDescription').value;
  const user = firebase.auth().currentUser;

  const lessonData = {
    title: lessonTitle,
    description: lessonDescription,
    teacherId: user.uid,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };

  db.collection('lessons').add(lessonData)
    .then(() => {
      console.log('Lesson created successfully!');
      redirectToDashboard();
    })
    .catch(error => {
      console.error('Error creating lesson:', error);
    });
}

// Join a lesson
function joinLesson(lessonId) {
  db.collection('lessons').doc(lessonId).get()
    .then(doc => {
      if (doc.exists) {
        const lesson = doc.data();
        console.log('Joined lesson:', lesson.title);
        // Optionally redirect user to the lesson details or content
      } else {
        console.log('No such lesson!');
      }
    })
    .catch(error => {
      console.error('Error joining lesson:', error);
    });
}

// Load Available Lessons
function loadAvailableLessons() {
  db.collection('lessons').get()
    .then(querySnapshot => {
      const lessonsList = document.getElementById('availableLessons');
      querySnapshot.forEach(doc => {
        const lesson = doc.data();
        const listItem = document.createElement('li');
        listItem.textContent = `${lesson.title} - ${lesson.description}`;
        lessonsList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error loading lessons:', error);
    });
}

// Event Listeners for Authentication
document.getElementById('signUpButton').addEventListener('click', signUp);
document.getElementById('logInButton').addEventListener('click', logIn);
document.getElementById('logOutButton').addEventListener('click', logOut);
document.getElementById('createLessonButton').addEventListener('click', createLesson);

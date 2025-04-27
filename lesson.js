const translations = {
  en: { welcome: "Welcome", createLesson: "Create a New Lesson", lessonTitle: "Lesson Title", description: "Description", join: "Join" },
  sv: { welcome: "Välkommen", createLesson: "Skapa en ny lektion", lessonTitle: "Lektionstitel", description: "Beskrivning", join: "Deltag" },
  es: { welcome: "Bienvenido", createLesson: "Crear una nueva lección", lessonTitle: "Título de la lección", description: "Descripción", join: "Unirse" },
  it: { welcome: "Benvenuto", createLesson: "Crea una nuova lezione", lessonTitle: "Titolo della lezione", description: "Descrizione", join: "Unisciti" },
  pt: { welcome: "Bem-vindo", createLesson: "Criar uma nova lição", lessonTitle: "Título da lição", description: "Descrição", join: "Junte-se" },
  fr: { welcome: "Bienvenue", createLesson: "Créer une nouvelle leçon", lessonTitle: "Titre de la leçon", description: "Description", join: "Rejoindre" }
};

function changeLanguage() {
  const language = document.getElementById('languageSwitcher').value;
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    element.textContent = translations[language][key];
  });
  saveLanguagePreference(language);
}

function saveLanguagePreference(language) {
  localStorage.setItem('language', language);
}

function loadLanguagePreference() {
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage) {
    document.getElementById('languageSwitcher').value = savedLanguage;
    changeLanguage();
  } else {
    document.getElementById('languageSwitcher').value = 'en';
    changeLanguage();
  }
}

window.onload = loadLanguagePreference;

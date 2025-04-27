// Function to change language dynamically
function changeLanguage() {
  const language = document.getElementById('languageSwitcher').value;
  const elements = document.querySelectorAll('[data-translate]');
  
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    element.textContent = translations[language][key];
  });
  
  saveLanguagePreference(language); // Save the selected language preference
}

// Save language in localStorage
function saveLanguagePreference(language) {
  localStorage.setItem('language', language);
}

// Load language preference on page load
function loadLanguagePreference() {
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage) {
    document.getElementById('languageSwitcher').value = savedLanguage;
    changeLanguage(); // Apply the saved language
  } else {
    document.getElementById('languageSwitcher').value = 'en';
    changeLanguage();
  }
}

// Function to load available lessons
function loadAvailableLessons() {
  const lessons = [
    { title: "Lesson 1: Introduction to Sumerian", description: "Learn the basics of the Sumerian language." },
    { title: "Lesson 2: Ancient Greek for Beginners", description: "Introduction to Ancient Greek grammar." },
    { title: "Lesson 3: Latin Phrases", description: "Learn common Latin phrases used in daily life." },
  ];

  const lessonsList = document.getElementById('availableLessons');
  lessons.forEach(lesson => {
    const listItem = document.createElement('li');
    listItem.textContent = `${lesson.title} - ${lesson.description}`;
    lessonsList.appendChild(listItem);
  });
}

// Load lessons and language preference when page loads
window.onload = function() {
  loadLanguagePreference();
  loadAvailableLessons();
};

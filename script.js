function showTab(tabIndex) {
  // Hide all tab contents
  const allContents = document.querySelectorAll('.tab-content');
  allContents.forEach(content => content.classList.remove('active-tab'));

  // Show the selected tab content
  const selectedContent = document.getElementById(`content${tabIndex + 1}`);
  selectedContent.classList.add('active-tab');
}

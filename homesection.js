// Select the input field and display span
const nameInput = document.getElementById('name-input');
const displayName = document.getElementById('display-name');

// Listen for input changes
nameInput.addEventListener('input', function() {
  const inputName = nameInput.value.trim();
  
  // Update the display text in real-time
  if (inputName) {
    displayName.textContent = inputName;
  } else {
    displayName.textContent = 'Your Name'; // Default text if input is empty
  }
});

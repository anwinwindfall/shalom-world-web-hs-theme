document.addEventListener("DOMContentLoaded", () => {
  const countElement = document.querySelector('.count');
  const decrementButton = document.querySelector('.decrement');
  const incrementButton = document.querySelector('.increment');

  let count = 0;

  function updateDisplay() {
    countElement.textContent = count < 10 ? '0' + count : count;
    decrementButton.disabled = count === 0;
  }

  incrementButton.addEventListener('click', () => {
    count++;
    updateDisplay();
  });

  decrementButton.addEventListener('click', () => {
    if (count > 0) {
      count--;
      updateDisplay();
    }
  });

  // Initialize
  updateDisplay();
});


// Get the modal element and buttons
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeBtn');

// Open the modal when the button is clicked
openModalBtn.addEventListener('click', function () {
  modal.style.display = 'flex';
});

// Close the modal when the close button is clicked
closeModalBtn.addEventListener('click', function () {
  modal.style.display = 'none';
});

// Optional: Close the modal when clicking outside the modal content
window.addEventListener('click', function (e) {
  if (e.target === modal) {
      modal.style.display = 'none';
  }
});


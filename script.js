// Resume Modal Functions
function openResumeModal() {
    const modal = document.getElementById('resumeModal');
    modal.style.display = 'block';
}

function closeResumeModal() {
    const modal = document.getElementById('resumeModal');
    modal.style.display = 'none';
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('resumeModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
// Dark mode functionality
let darkMode = localStorage.getItem('darkMode') === 'enabled';

// Function to enable dark mode
function enableDarkMode() {
    document.body.classList.add('dark-theme');
    localStorage.setItem('darkMode', 'enabled');
    darkMode = true;
    document.getElementById('darkModeToggle').innerHTML = '<i class="fas fa-sun"></i>';
}

// Function to disable dark mode
function disableDarkMode() {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('darkMode', 'disabled');
    darkMode = false;
    document.getElementById('darkModeToggle').innerHTML = '<i class="fas fa-moon"></i>';
}

// Toggle dark mode
function toggleDarkMode() {
    if (darkMode) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

// Add event listener when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create the dark mode toggle button
    const darkModeButton = document.createElement('button');
    darkModeButton.id = 'darkModeToggle';
    darkModeButton.className = 'dark-mode-toggle';
    darkModeButton.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeButton.addEventListener('click', toggleDarkMode);
    
    // Append to body
    document.body.appendChild(darkModeButton);
    
    // Check if dark mode was previously enabled
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    }
    
    // Smooth scrolling navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70, // Adjust for header height
                behavior: 'smooth'
            });
        });
    });
});

// Form submission handler
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation (optional)
    if (!name || !email || !subject || !message) {
        alert('Please fill out all fields before submitting.');
        return;
    }

    // In a real application, you would send this data to a server
    // For now, we'll just show an alert
    alert('Message sent successfully!');

    // Reset the form
    document.querySelector('.contact-form').reset();
}
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

// Enhanced Form submission handler with multiple email options
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        alert('Please fill out all fields before submitting.');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Show loading state
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Using EmailJS (Recommended for client-side)
    sendEmailWithEmailJS(name, email, subject, message, submitButton, originalText);
    
}

     // EmailJS Integration (You need to set up EmailJS account)
function sendEmailWithEmailJS(name, email, subject, message, submitButton, originalText) {
    // EmailJS configuration - Replace with your actual values
    const serviceID = 'service_bpftjd7'; // Replace with your EmailJS service ID
    const templateID = 'template_rluv2bn'; // Replace with your EmailJS template ID
    const userID = 't5NSUDaKsaKPLR-fW'; // Replace with your EmailJS user ID

    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS not loaded. Falling back to mailto.');
        sendEmailWithMailto(name, email, subject, message, submitButton, originalText);
        return;
    }

    const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_email: 'Piyushjha9001@gmail.com' // Your email
    };

    emailjs.send(serviceID, templateID, templateParams, userID)
        .then(function(response) {
            console.log('Email sent successfully:', response);
            alert('Message sent successfully! I will get back to you soon.');
            document.querySelector('.contact-form').reset();
        })
        .catch(function(error) {
            console.error('EmailJS error:', error);
            alert('Failed to send message. Please try again or contact me directly.');
        })
        .finally(function() {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
}
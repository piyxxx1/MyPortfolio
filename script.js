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

// Razorpay Integration for Buy Me a Coffee
function initiatePayment(amount) {
    // Production Razorpay key
    const razorpayKey = 'rzp_live_IyiMAf4oQTSFO8'; // Production key from env file
    
    const options = {
        key: razorpayKey,
        amount: amount * 100, // Razorpay expects amount in paise
        currency: 'INR',
        name: 'Piyush Jha',
        description: 'Buy Me a Coffee',
        image: 'https://www.qikkspace.living/assets/qikksapceiconlogo.png', // Optional: Add your logo
        handler: function(response) {
            // Handle successful payment
            console.log('Payment successful:', response);
            alert('Thank you for your support! Your coffee has been received! ☕');
            
            // You can send this data to your backend for verification
            verifyPayment(response);
        },
        prefill: {
            name: '',
            email: '',
            contact: ''
        },
        theme: {
            color: '#0566d4'
        },
        modal: {
            ondismiss: function() {
                console.log('Payment modal closed');
            }
        }
    };
    
    const rzp = new Razorpay(options);
    rzp.open();
}

// Function to verify payment (you can implement this with your backend)
function verifyPayment(response) {
    // This is where you would typically send the payment details to your backend
    // for verification and processing
    console.log('Payment verification data:', response);
    
    // Example: Send to your backend for verification
    // fetch('/api/verify-payment', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         razorpay_payment_id: response.razorpay_payment_id,
    //         razorpay_order_id: response.razorpay_order_id,
    //         razorpay_signature: response.razorpay_signature,
    //         amount: response.amount,
    //         currency: response.currency
    //     })
    // })
    // .then(response => response.json())
    // .then(data => {
    //     if (data.verified) {
    //         console.log('Payment verified successfully');
    //     } else {
    //         console.error('Payment verification failed');
    //     }
    // })
    // .catch(error => console.error('Verification error:', error));
    
    // For now, we'll just log the response
    // In production, you should implement proper server-side verification
    console.log('Payment completed. Verification should be done on server-side.');
}

// Load Razorpay script dynamically
function loadRazorpayScript() {
    return new Promise((resolve, reject) => {
        if (window.Razorpay) {
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Razorpay'));
        document.head.appendChild(script);
    });
}

// Initialize Razorpay when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load Razorpay script
    loadRazorpayScript().catch(error => {
        console.error('Error loading Razorpay:', error);
    });
    
    // Initialize custom amount input
    initializeCustomAmountInput();
});

// Custom amount input functionality
function initializeCustomAmountInput() {
    const input = document.getElementById('customAmount');
    const payBtn = document.querySelector('.custom-pay-btn');
    
    if (input && payBtn) {
        // Update button state based on amount
        input.addEventListener('input', function() {
            const amount = parseInt(this.value) || 0;
            
            // Enable/disable button based on amount
            if (amount > 0 && amount <= 10000) {
                payBtn.disabled = false;
                payBtn.style.opacity = '1';
            } else {
                payBtn.disabled = true;
                payBtn.style.opacity = '0.6';
            }
        });
        
        // Handle Enter key
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const amount = parseInt(this.value) || 0;
                if (amount > 0 && amount <= 10000) {
                    initiateCustomPayment();
                }
            }
        });
    }
}

// Function to handle custom payment
function initiateCustomPayment() {
    const input = document.getElementById('customAmount');
    const amount = parseInt(input.value) || 0;
    
    if (amount <= 0) {
        alert('Please enter a valid amount greater than ₹0');
        return;
    }
    
    if (amount > 10000) {
        alert('Maximum amount allowed is ₹10,000');
        return;
    }
    
    initiatePayment(amount);
}
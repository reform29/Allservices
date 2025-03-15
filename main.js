  //slideshow
// Get all slides
const slides = document.querySelectorAll('.slide');

// Set the current slide index
let currentSlideIndex = 0;

function showNextSlide() {
  slides[currentSlideIndex].classList.remove('active');
  currentSlideIndex = (currentSlideIndex + 1) % slides.length;
  slides[currentSlideIndex].classList.add('active');
}

function showPreviousSlide() {
slides[currentSlideIndex].classList.remove('active');
currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
slides[currentSlideIndex].classList.add('active');
}


function startSlideshow() {
  slides[0].classList.add('active');
  setInterval(showNextSlide, 3000);
}

startSlideshow();

// Get DOM elements
const serviceButtons = document.querySelectorAll('.service-item');
const modal = document.getElementById('serviceModal');
const closeModal = document.querySelector('.close-modal');
const modalTitle = document.getElementById('modalTitle');

// Form elements
const forms = {
    'AC': document.getElementById('acForm'),
    'Washing Machine': document.getElementById('washingForm'),
    'Water purifier': document.getElementById('waterPurifierForm'),
    'refrigerator': document.getElementById('refrigeratorForm'),
    'Microwave': document.getElementById('microwaveForm')
};

// Hide all forms
function hideAllForms() {
    Object.values(forms).forEach(form => {
        if (form) form.style.display = 'none';
    });
}

// Show specific service form
function showServiceFields(service) {
    hideAllForms();
    const form = forms[service];
    if (form) {
        form.style.display = 'block';
        modalTitle.textContent = `${service} Service Request`;
    }
}

// Handle WhatsApp message creation
function createWhatsAppMessage(formData) {
    return Object.entries(formData)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
}
// Set up event listeners
serviceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const service = button.getAttribute('data-service');
        showServiceFields(service);
        modal.classList.add('active');
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    hideAllForms();
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.classList.remove('no-scroll');
        hideAllForms();
    }
});

// Setup form submissions for all services
setupFormSubmission('AC', 'acServiceForm', 'acSubmitBtn');
setupFormSubmission('Washing Machine', 'washingServiceForm', 'washingSubmitBtn');
setupFormSubmission('Water Purifier', 'waterPurifierServiceForm', 'waterPurifierSubmitBtn');
setupFormSubmission('Refrigerator', 'refrigeratorServiceForm', 'refrigeratorSubmitBtn');
setupFormSubmission('Microwave', 'microwaveServiceForm', 'microwaveSubmitBtn');

// Initialize forms to be hidden
hideAllForms();

// Add event listener to the call us now button
const callUsNowBtn = document.getElementById('callUsNowBtn');
callUsNowBtn.addEventListener('click', () => {
    const phoneNumber = '+919886106311';
    const callLink = `tel:${phoneNumber}`;
    window.open(callLink, '_blank');
});
// Add event listener to service buttons
serviceButtons.forEach(button => {
  button.addEventListener('click', () => {
    const service = button.getAttribute('data-service');
    modal.classList.add('active');
    document.body.classList.add('no-scroll'); // Add class to prevent scrolling
    showServiceFields(service);
  });
});

// Add event listener to close modal button
closeModal.addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.classList.remove('no-scroll');
  hideAllForms();
});

// Function to check if all required fields have been filled in
function checkRequiredFields(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let allFieldsFilled = true;
  
    requiredFields.forEach(field => {
      if (field.value === '') {
        allFieldsFilled = false;
      }
    });
  
    return allFieldsFilled;
  }
  
  // Update the setupFormSubmission function to check for required fields
  function setupFormSubmission(serviceType, formId, submitBtnId) {
    const form = document.getElementById(formId);
    const submitBtn = document.getElementById(submitBtnId);
  
    if (submitBtn && form) {
      submitBtn.addEventListener('click', () => {
        if (checkRequiredFields(form)) {
          const formData = {
            'Service': serviceType,
            'Name': form.querySelector('[name="name"]').value,
            'Phone': form.querySelector('[name="phone"]').value,
            'Address': form.querySelector('[name="address"]').value,
          };
  
          // Add type if exists
          const typeSelect = form.querySelector('select[id$="Type"]');
          if (typeSelect) {
            formData[`${serviceType} Type`] = typeSelect.value;
          }
  
          // Add service type if exists
          const serviceSelect = form.querySelector('select[id$="Service"]');
          if (serviceSelect) {
            formData['Service Type'] = serviceSelect.value;
          }
  
          // Add issue description if exists
          const issueTextarea = form.querySelector('textarea[id$="Issue"]');
          if (issueTextarea) {
            formData['Issue Description'] = issueTextarea.value;
          }
  
          const message = createWhatsAppMessage(formData);
          const whatsappUrl = `https://wa.me/919886106311?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, '_blank');
          modal.classList.remove('active');
          document.body.classList.remove('no-scroll');
          hideAllForms();
          form.reset();
        } else {
          alert('Please fill in all required fields.');
        }
      });
    }
  }
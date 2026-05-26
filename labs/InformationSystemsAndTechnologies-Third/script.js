const registrationForm = document.getElementById('registrationForm');
const formSection = document.getElementById('form-section');
const welcomeSection = document.getElementById('welcome-section');

const patterns = {
    name: /^[а-яА-ЯёЁ\s-]{2,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\d\s\-+()]{10,20}$/,
    city: /^[а-яА-ЯёЁ\s-]{2,50}$/,
    street: /^[а-яА-ЯёЁ\d\s.,\-()]{2,100}$/,
    house: /^[а-яА-ЯёЁ\d\-\/]{1,10}$/,
    apartment: /^[а-яА-ЯёЁ\d\-]{1,10}$/,
};

const errors = {};

function clearError(fieldName) {
    const errorElement = document.getElementById(`${fieldName}Error`);
    if (errorElement) {
        errorElement.textContent = '';
    }
    const input = document.getElementById(fieldName);
    if (input) {
        input.classList.remove('invalid');
    }
    delete errors[fieldName];
}

function showError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}Error`);
    if (errorElement) {
        errorElement.textContent = message;
    }
    const input = document.getElementById(fieldName);
    if (input) {
        input.classList.add('invalid');
    }
    errors[fieldName] = message;
}

function validateLastName() {
    const value = document.getElementById('lastName').value.trim();
    clearError('lastName');
    
    if (!value) {
        showError('lastName', 'Фамилия обязательна');
        return false;
    }
    if (!patterns.name.test(value)) {
        showError('lastName', 'Фамилия должна содержать только буквы');
        return false;
    }
    return true;
}

function validateFirstName() {
    const value = document.getElementById('firstName').value.trim();
    clearError('firstName');
    
    if (!value) {
        showError('firstName', 'Имя обязательно');
        return false;
    }
    if (!patterns.name.test(value)) {
        showError('firstName', 'Имя должно содержать только буквы');
        return false;
    }
    return true;
}

function validatePatronymic() {
    const value = document.getElementById('patronymic').value.trim();
    clearError('patronymic');
    
    if (value && !patterns.name.test(value)) {
        showError('patronymic', 'Отчество должно содержать только буквы');
        return false;
    }
    return true;
}

function validateEmail() {
    const value = document.getElementById('email').value.trim();
    clearError('email');
    
    if (!value) {
        showError('email', 'Email обязателен');
        return false;
    }
    if (!patterns.email.test(value)) {
        showError('email', 'Введите корректный email');
        return false;
    }
    return true;
}

function validatePhone() {
    const value = document.getElementById('phone').value.trim();
    clearError('phone');
    
    if (!value) {
        showError('phone', 'Телефон обязателен');
        return false;
    }
    if (!patterns.phone.test(value)) {
        showError('phone', 'Введите корректный номер телефона');
        return false;
    }
    return true;
}

function validateCity() {
    const value = document.getElementById('city').value.trim();
    clearError('city');
    
    if (!value) {
        showError('city', 'Город обязателен');
        return false;
    }
    if (!patterns.city.test(value)) {
        showError('city', 'Введите корректное название города');
        return false;
    }
    return true;
}

function validateStreet() {
    const value = document.getElementById('street').value.trim();
    clearError('street');
    
    if (!value) {
        showError('street', 'Улица обязательна');
        return false;
    }
    if (!patterns.street.test(value)) {
        showError('street', 'Введите корректное название улицы');
        return false;
    }
    return true;
}

function validateHouse() {
    const value = document.getElementById('house').value.trim();
    clearError('house');
    
    if (!value) {
        showError('house', 'Номер дома обязателен');
        return false;
    }
    if (!patterns.house.test(value)) {
        showError('house', 'Введите корректный номер дома');
        return false;
    }
    return true;
}

function validateApartment() {
    const value = document.getElementById('apartment').value.trim();
    clearError('apartment');
    
    if (value && !patterns.apartment.test(value)) {
        showError('apartment', 'Введите корректный номер квартиры');
        return false;
    }
    return true;
}

function validateInvestmentAmount() {
    const value = document.getElementById('investmentAmount').value.trim();
    clearError('investmentAmount');
    
    if (!value) {
        showError('investmentAmount', 'Сумма обязательна');
        return false;
    }
    const amount = parseFloat(value);
    if (isNaN(amount) || amount < 1000) {
        showError('investmentAmount', 'Минимум 1000 рублей');
        return false;
    }
    return true;
}

function validateExperience() {
    const value = document.getElementById('experience').value;
    clearError('experience');
    
    if (!value) {
        showError('experience', 'Выберите опыт');
        return false;
    }
    return true;
}

function validateAssets() {
    const checkboxes = document.querySelectorAll('input[name="assets"]:checked');
    clearError('assets');
    
    if (checkboxes.length === 0) {
        showError('assets', 'Выберите хотя бы один актив');
        return false;
    }
    return true;
}

function validateAgree() {
    const value = document.getElementById('agree').checked;
    clearError('agree');
    
    if (!value) {
        showError('agree', 'Согласитесь с условиями');
        return false;
    }
    return true;
}

function validateForm() {
    return validateLastName() && validateFirstName() && validatePatronymic() && 
           validateEmail() && validatePhone() && validateCity() && validateStreet() && 
           validateHouse() && validateApartment() && validateInvestmentAmount() && 
           validateExperience() && validateAssets() && validateAgree();
}

document.getElementById('lastName').addEventListener('blur', validateLastName);
document.getElementById('firstName').addEventListener('blur', validateFirstName);
document.getElementById('patronymic').addEventListener('blur', validatePatronymic);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('phone').addEventListener('blur', validatePhone);
document.getElementById('city').addEventListener('blur', validateCity);
document.getElementById('street').addEventListener('blur', validateStreet);
document.getElementById('house').addEventListener('blur', validateHouse);
document.getElementById('apartment').addEventListener('blur', validateApartment);
document.getElementById('investmentAmount').addEventListener('blur', validateInvestmentAmount);
document.getElementById('experience').addEventListener('change', validateExperience);

document.querySelectorAll('input[name="assets"]').forEach(checkbox => {
    checkbox.addEventListener('change', validateAssets);
});

document.getElementById('agree').addEventListener('change', validateAgree);

function getExperienceLabel(value) {
    const labels = {
        'beginner': 'Новичок (0-1 года)',
        'intermediate': 'Опытный (1-5 лет)',
        'advanced': 'Продвинутый (5+ лет)'
    };
    return labels[value] || value;
}

function getAssetsLabels() {
    const labels = {
        'stocks': 'Акции',
        'bonds': 'Облигации',
        'crypto': 'Криптовалюты',
        'realestate': 'Недвижимость'
    };
    const checkboxes = document.querySelectorAll('input[name="assets"]:checked');
    const selected = [];
    checkboxes.forEach(checkbox => {
        selected.push(labels[checkbox.value]);
    });
    return selected.join(', ');
}

function showWelcomeScreen(formData) {
    const formSectionElement = document.getElementById('form-section');
    formSectionElement.style.display = 'none';
    welcomeSection.classList.remove('hidden');
    welcomeSection.style.display = 'block';

    const fullName = `${formData.lastName} ${formData.firstName} ${formData.patronymic}`.trim();
    document.getElementById('welcomeName').textContent = formData.firstName;
    document.getElementById('displayFullName').textContent = fullName;
    document.getElementById('displayEmail').textContent = formData.email;
    document.getElementById('displayPhone').textContent = formData.phone;
    
    const address = `${formData.city}, ${formData.street}, д. ${formData.house}${formData.apartment ? `, кв. ${formData.apartment}` : ''}`;
    document.getElementById('displayAddress').textContent = address;
    document.getElementById('displayAmount').textContent = `${formData.investmentAmount} руб.`;
    document.getElementById('displayExperience').textContent = getExperienceLabel(formData.experience);
    document.getElementById('displayAssets').textContent = getAssetsLabels();
}

registrationForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const formData = {
        lastName: document.getElementById('lastName').value.trim(),
        firstName: document.getElementById('firstName').value.trim(),
        patronymic: document.getElementById('patronymic').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        city: document.getElementById('city').value.trim(),
        street: document.getElementById('street').value.trim(),
        house: document.getElementById('house').value.trim(),
        apartment: document.getElementById('apartment').value.trim(),
        investmentAmount: document.getElementById('investmentAmount').value.trim(),
        experience: document.getElementById('experience').value
    };

    console.log('Данные:', formData);
    showWelcomeScreen(formData);
});

function resetForm() {
    registrationForm.reset();
    
    Object.keys(errors).forEach(key => clearError(key));
    
    const formSectionElement = document.getElementById('form-section');
    formSectionElement.style.display = 'block';
    welcomeSection.classList.add('hidden');
    welcomeSection.style.display = 'none';
}

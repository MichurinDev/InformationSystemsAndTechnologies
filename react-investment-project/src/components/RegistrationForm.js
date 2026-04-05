import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    patronymic: '',
    email: '',
    phone: '',
    city: '',
    street: '',
    house: '',
    apartment: '',
    investmentAmount: '',
    experience: '',
    assets: [],
    agree: false
  });

  const [errors, setErrors] = useState({});
  const [showWelcome, setShowWelcome] = useState(false);

  const patterns = {
    name: /^[а-яА-ЯёЁ\s\-]{2,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\d\s\-\+()]{10,20}$/,
    city: /^[а-яА-ЯёЁ\s\-]{2,50}$/,
    street: /^[а-яА-ЯёЁ\d\s.,\-\+()]{2,100}$/,
    house: /^[а-яА-ЯёЁ\d\-\/]{1,10}$/,
    apartment: /^[а-яА-ЯёЁ\d\-]{1,10}$/,
  };

  const clearError = (fieldName) => {
    setErrors(prev => ({ ...prev, [fieldName]: '' }));
  };

  const showError = (fieldName, message) => {
    setErrors(prev => ({ ...prev, [fieldName]: message }));
  };

  const validateLastName = () => {
    const value = formData.lastName.trim();
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
  };

  const validateFirstName = () => {
    const value = formData.firstName.trim();
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
  };

  const validatePatronymic = () => {
    const value = formData.patronymic.trim();
    clearError('patronymic');

    if (value && !patterns.name.test(value)) {
      showError('patronymic', 'Отчество должно содержать только буквы');
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    const value = formData.email.trim();
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
  };

  const validatePhone = () => {
    const value = formData.phone.trim();
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
  };

  const validateCity = () => {
    const value = formData.city.trim();
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
  };

  const validateStreet = () => {
    const value = formData.street.trim();
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
  };

  const validateHouse = () => {
    const value = formData.house.trim();
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
  };

  const validateApartment = () => {
    const value = formData.apartment.trim();
    clearError('apartment');

    if (value && !patterns.apartment.test(value)) {
      showError('apartment', 'Введите корректный номер квартиры');
      return false;
    }
    return true;
  };

  const validateInvestmentAmount = () => {
    const value = formData.investmentAmount.trim();
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
  };

  const validateExperience = () => {
    const value = formData.experience;
    clearError('experience');

    if (!value) {
      showError('experience', 'Выберите опыт');
      return false;
    }
    return true;
  };

  const validateAssets = () => {
    clearError('assets');

    if (formData.assets.length === 0) {
      showError('assets', 'Выберите хотя бы один актив');
      return false;
    }
    return true;
  };

  const validateAgree = () => {
    clearError('agree');

    if (!formData.agree) {
      showError('agree', 'Согласитесь с условиями');
      return false;
    }
    return true;
  };

  const validateForm = () => {
    return validateLastName() && validateFirstName() && validatePatronymic() &&
           validateEmail() && validatePhone() && validateCity() && validateStreet() &&
           validateHouse() && validateApartment() && validateInvestmentAmount() &&
           validateExperience() && validateAssets() && validateAgree();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'assets') {
        setFormData(prev => ({
          ...prev,
          assets: checked
            ? [...prev.assets, value]
            : prev.assets.filter(asset => asset !== value)
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleBlur = (fieldName) => {
    switch (fieldName) {
      case 'lastName': validateLastName(); break;
      case 'firstName': validateFirstName(); break;
      case 'patronymic': validatePatronymic(); break;
      case 'email': validateEmail(); break;
      case 'phone': validatePhone(); break;
      case 'city': validateCity(); break;
      case 'street': validateStreet(); break;
      case 'house': validateHouse(); break;
      case 'apartment': validateApartment(); break;
      case 'investmentAmount': validateInvestmentAmount(); break;
      default: break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log('Данные:', formData);
    setShowWelcome(true);
  };

  const resetForm = () => {
    setFormData({
      lastName: '',
      firstName: '',
      patronymic: '',
      email: '',
      phone: '',
      city: '',
      street: '',
      house: '',
      apartment: '',
      investmentAmount: '',
      experience: '',
      assets: [],
      agree: false
    });
    setErrors({});
    setShowWelcome(false);
  };

  const getExperienceLabel = (value) => {
    const labels = {
      'beginner': 'Новичок (0-1 года)',
      'intermediate': 'Опытный (1-5 лет)',
      'advanced': 'Продвинутый (5+ лет)'
    };
    return labels[value] || value;
  };

  const getAssetsLabels = () => {
    const labels = {
      'stocks': 'Акции',
      'bonds': 'Облигации',
      'crypto': 'Криптовалюты',
      'realestate': 'Недвижимость'
    };
    return formData.assets.map(asset => labels[asset]).join(', ');
  };

  if (showWelcome) {
    const fullName = `${formData.lastName} ${formData.firstName} ${formData.patronymic}`.trim();
    const address = `${formData.city}, ${formData.street}, д. ${formData.house}${formData.apartment ? `, кв. ${formData.apartment}` : ''}`;

    return (
      <div className="welcome-wrapper">
        <h1>Добро пожаловать, <span>{formData.firstName}</span>!</h1>

        <div className="welcome-table">
          <div className="table-row">
            <span className="table-label">ФИО:</span>
            <span className="table-value">{fullName}</span>
          </div>
          <div className="table-row">
            <span className="table-label">Email:</span>
            <span className="table-value">{formData.email}</span>
          </div>
          <div className="table-row">
            <span className="table-label">Телефон:</span>
            <span className="table-value">{formData.phone}</span>
          </div>
          <div className="table-row">
            <span className="table-label">Адрес:</span>
            <span className="table-value">{address}</span>
          </div>
          <div className="table-row">
            <span className="table-label">Сумма инвестиции:</span>
            <span className="table-value">{formData.investmentAmount} руб.</span>
          </div>
          <div className="table-row">
            <span className="table-label">Опыт:</span>
            <span className="table-value">{getExperienceLabel(formData.experience)}</span>
          </div>
          <div className="table-row">
            <span className="table-label">Активы:</span>
            <span className="table-value">{getAssetsLabels()}</span>
          </div>
        </div>

        <p className="message">Ваша регистрация завершена. Мы свяжемся с вами в ближайшее время.</p>
        <button className="submit-btn" onClick={resetForm}>Зарегистрироваться снова</button>
      </div>
    );
  }

  return (
    <div className="form-wrapper">
      <h1>Регистрация инвестора</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="lastName">Фамилия *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={() => handleBlur('lastName')}
            className={errors.lastName ? 'invalid' : ''}
          />
          <span className="error">{errors.lastName}</span>
        </div>

        <div className="form-group">
          <label htmlFor="firstName">Имя *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={() => handleBlur('firstName')}
            className={errors.firstName ? 'invalid' : ''}
          />
          <span className="error">{errors.firstName}</span>
        </div>

        <div className="form-group">
          <label htmlFor="patronymic">Отчество</label>
          <input
            type="text"
            id="patronymic"
            name="patronymic"
            value={formData.patronymic}
            onChange={handleChange}
            onBlur={() => handleBlur('patronymic')}
            className={errors.patronymic ? 'invalid' : ''}
          />
          <span className="error">{errors.patronymic}</span>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => handleBlur('email')}
            className={errors.email ? 'invalid' : ''}
          />
          <span className="error">{errors.email}</span>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Телефон *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={() => handleBlur('phone')}
            className={errors.phone ? 'invalid' : ''}
          />
          <span className="error">{errors.phone}</span>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">Город *</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              onBlur={() => handleBlur('city')}
              className={errors.city ? 'invalid' : ''}
            />
            <span className="error">{errors.city}</span>
          </div>
          <div className="form-group">
            <label htmlFor="street">Улица *</label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              onBlur={() => handleBlur('street')}
              className={errors.street ? 'invalid' : ''}
            />
            <span className="error">{errors.street}</span>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="house">Дом *</label>
            <input
              type="text"
              id="house"
              name="house"
              value={formData.house}
              onChange={handleChange}
              onBlur={() => handleBlur('house')}
              className={errors.house ? 'invalid' : ''}
            />
            <span className="error">{errors.house}</span>
          </div>
          <div className="form-group">
            <label htmlFor="apartment">Квартира</label>
            <input
              type="text"
              id="apartment"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              onBlur={() => handleBlur('apartment')}
              className={errors.apartment ? 'invalid' : ''}
            />
            <span className="error">{errors.apartment}</span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="investmentAmount">Сумма инвестиции (руб.) *</label>
          <input
            type="number"
            id="investmentAmount"
            name="investmentAmount"
            min="1000"
            value={formData.investmentAmount}
            onChange={handleChange}
            onBlur={() => handleBlur('investmentAmount')}
            className={errors.investmentAmount ? 'invalid' : ''}
          />
          <span className="error">{errors.investmentAmount}</span>
        </div>

        <div className="form-group">
          <label htmlFor="experience">Опыт инвестирования *</label>
          <select
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className={errors.experience ? 'invalid' : ''}
          >
            <option value="">-- Выберите --</option>
            <option value="beginner">Новичок (0-1 года)</option>
            <option value="intermediate">Опытный (1-5 лет)</option>
            <option value="advanced">Продвинутый (5+ лет)</option>
          </select>
          <span className="error">{errors.experience}</span>
        </div>

        <div className="form-group">
          <label>Интересующие активы *</label>
          <div className="checkbox-group">
            {[
              { id: 'stocks', value: 'stocks', label: 'Акции' },
              { id: 'bonds', value: 'bonds', label: 'Облигации' },
              { id: 'crypto', value: 'crypto', label: 'Криптовалюты' },
              { id: 'realestate', value: 'realestate', label: 'Недвижимость' }
            ].map(asset => (
              <div key={asset.id}>
                <input
                  type="checkbox"
                  id={asset.id}
                  name="assets"
                  value={asset.value}
                  checked={formData.assets.includes(asset.value)}
                  onChange={handleChange}
                />
                <label htmlFor={asset.id}>{asset.label}</label>
              </div>
            ))}
          </div>
          <span className="error">{errors.assets}</span>
        </div>

        <div className="form-group">
          <input
            type="checkbox"
            id="agree"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
          />
          <label htmlFor="agree">Я согласен с условиями пользования *</label>
          <span className="error">{errors.agree}</span>
        </div>

        <button type="submit" className="submit-btn">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
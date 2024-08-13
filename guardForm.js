// Simple form validate

(function () {
    HTMLElement.prototype.guardForm = function () {
        this.querySelectorAll('.guard-input').forEach(input => {
            const id = input.id;
            const isRequired = input.classList.contains('g-required');
            const isNumber = input.classList.contains('g-number');
            const isDate = input.classList.contains('g-date');
            const isEmail = input.classList.contains('g-email');
            const regexPattern = input.dataset.regex;
            const regex = regexPattern ? new RegExp(regexPattern) : null;
            const customRegexPattern = input.dataset.customRegex;
            const customRegex = customRegexPattern ? new RegExp(customRegexPattern) : null;

            let container = input.closest('.input-container');

            if (!container) {
                container = document.createElement('div');
                container.classList.add('input-container');
                container.style.marginBottom = '1rem';
                input.parentNode.insertBefore(container, input);
                container.appendChild(input);

                let label = id.replace(/([A-Z])/g, ' $1');
                label = label.charAt(0).toUpperCase() + label.slice(1);

                if (!container.querySelector('label')) {
                    const labelElement = document.createElement('label');
                    labelElement.setAttribute('for', id);
                    labelElement.textContent = label;
                    container.insertBefore(labelElement, input);
                    container.insertBefore(document.createElement('br'), input);
                }

                if (isRequired) {
                    const errorMessage = document.createElement('div');
                    errorMessage.classList.add('error-message');
                    errorMessage.innerHTML = '<p>Error: This field is required</p>';
                    container.appendChild(errorMessage);
                }

                if (isNumber) {
                    const errorMessage = document.createElement('div');
                    errorMessage.classList.add('error-message', 'number-error');
                    errorMessage.innerHTML = '<p>Invalid number: Please enter a valid number</p>';
                    container.appendChild(errorMessage);
                }

                if (isDate) {
                    const errorMessage = document.createElement('div');
                    errorMessage.classList.add('error-message', 'date-error');
                    errorMessage.innerHTML = '<p>Invalid date: Please enter a valid date in the format MM/DD/YYYY</p>';
                    container.appendChild(errorMessage);
                }

                if (isEmail) {
                    const errorMessage = document.createElement('div');
                    errorMessage.classList.add('error-message', 'email-error');
                    errorMessage.innerHTML = '<p>Invalid email: Please enter a valid email address</p>';
                    container.appendChild(errorMessage);
                }

                if (customRegex) {
                    const errorMessage = document.createElement('div');
                    errorMessage.classList.add('error-message', 'custom-error');
                    errorMessage.innerHTML = '<p>Invalid format: Please use the correct format</p>';
                    container.appendChild(errorMessage);
                }

                if (regex) {
                    const errorMessage = document.createElement('div');
                    errorMessage.classList.add('error-message', 'regex-error');
                    errorMessage.innerHTML = '<p>Invalid format: Please use correct format</p>';
                    container.appendChild(errorMessage);
                }
            }

            if (isNumber) {
                input.addEventListener('input', function () {
                    this.value = this.value.replace(/[^0-9]/g, '');
                });
            }

            if (isDate) {
                input.addEventListener('input', function () {
                    let value = this.value.replace(/[^0-9]/g, '');
                    let formattedValue = '';

                    if (value.length > 0) {
                        formattedValue += value.substring(0, 2);
                    }
                    if (value.length > 2) {
                        formattedValue += '/' + value.substring(2, 4);
                    }
                    if (value.length > 4) {
                        formattedValue += '/' + value.substring(4, 8);
                    }

                    this.value = formattedValue;
                });
            }
        });

        this.addEventListener('submit', function (e) {
            let isValid = true;

            this.querySelectorAll('.guard-input').forEach(input => {
                const container = input.closest('.input-container');
                const value = input.value.trim();
                const isRequired = input.classList.contains('g-required');
                const isNumber = input.classList.contains('g-number');
                const isDate = input.classList.contains('g-date');
                const isEmail = input.classList.contains('g-email');
                const regexPattern = input.dataset.regex;
                const regex = regexPattern ? new RegExp(regexPattern) : null;
                const customRegexPattern = input.dataset.customRegex;
                const customRegex = customRegexPattern ? new RegExp(customRegexPattern) : null;

                container.classList.remove('g-invalid');
                container.querySelectorAll('.error-message').forEach(msg => msg.style.display = 'none');

                if (isRequired && value === '') {
                    container.classList.add('g-invalid');
                    container.querySelector('.error-message').style.display = 'block';
                    isValid = false;
                } else if (isNumber && isNaN(value)) {
                    container.classList.add('g-invalid');
                    container.querySelector('.number-error').style.display = 'block';
                    isValid = false;
                } else if (isDate && value !== '' && !isValidDate(value)) {
                    container.classList.add('g-invalid');
                    container.querySelector('.date-error').style.display = 'block';
                    isValid = false;
                } else if (isEmail) {
                    if (isRequired && value === '') {
                        container.classList.add('g-invalid');
                        container.querySelector('.error-message').style.display = 'block';
                        isValid = false;
                    } else if (value !== '' && !isValidEmail(value)) {
                        container.classList.add('g-invalid');
                        container.querySelector('.email-error').style.display = 'block';
                        isValid = false;
                    }
                } else if (customRegex && value !== '' && !customRegex.test(value)) {
                    container.classList.add('g-invalid');
                    container.querySelector('.custom-error').style.display = 'block';
                    isValid = false;
                } else if (regex && value !== '' && !regex.test(value)) {
                    container.classList.add('g-invalid');
                    container.querySelector('.regex-error').style.display = 'block';
                    isValid = false;
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });

        function isValidDate(dateString) {
            const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
            if (!regex.test(dateString)) {
                return false;
            }

            const [month, day, year] = dateString.split('/').map(num => parseInt(num, 10));
            const date = new Date(year, month - 1, day);

            return date.getMonth() === month - 1 && date.getDate() === day && date.getFullYear() === year;
        }

        function isValidEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }

        return this;
    };
})();
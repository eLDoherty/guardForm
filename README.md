GuardForm Simple Form Validation

---

# `GuardForm` Simple Form Validation

`GuardForm` is a light JavaScript library for validating HTML forms (client side). It provides basic validation for required fields, numbers, dates, emails, and custom regex patterns. This library extends the `HTMLElement` prototype to include a `guardForm` method that you can use to easily validate forms.

## Features

- **Field Validation**: Checks for required fields, numbers, dates, emails, and custom patterns.
- **Error Messaging**: Displays specific error messages for invalid input.
- **Input Formatting**: Automatically formats date input and restricts number input.

## Installation

Downlod and Include the `guardForm` script in your HTML file. 

```html
<script src="path/to/guardForm.js"></script>
```

**Or you can just simply use this :**
```HTML 
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/eLDoherty/guardForm@main/style.css" />
<script src="https://cdn.jsdelivr.net/gh/eLDoherty/guardForm@main/guardForm.js"></script>

// For minified version
<script src="https://cdn.jsdelivr.net/gh/eLDoherty/guardForm@main/guardForm.min.js"></script>
```

```javascript
document.getElementById('myForm').guardForm();
```

## Usage

### Adding `guardForm` to Your Form

1. **Add `guard-input` Class**: Apply the `guard-input` class to input elements you want to validate.
2. **Add Validation Classes and Attributes**:
   - `g-required`: Marks a field as required.
   - `g-number`: Restricts the input to numbers only.
   - `g-date`: Formats the input as MM/DD/YYYY and validates the date.
   - `g-email`: Validates email format.
   - `data-regex`: Applies a custom regex pattern.
   - `data-custom-regex`: Applies a custom regex pattern.

3. **Call `guardForm` on the Form**: Call the `guardForm` method on the form element you want to validate.

### Example form

```HTML 
    <form id="myForm">
        <input type="text" id="name" class="guard-input g-required">
        <input type="text" id="age" class="guard-input g-number">
        <input type="text" id="birthdate" class="guard-input g-date">
        <input type="text" id="email" class="guard-input g-email">
        <input type="text" id="custom" class="guard-input" data-custom-regex="^[a-zA-Z]+$">
        <button type="submit">Submit</button>
    </form>
```

### Form above will be automatically turn into like below

```HTML 
    <form id="myForm">
        <div class="input-container">
            <label for="name">Name</label>
            <input type="text" id="name" class="guard-input g-required">
            <div class="error-message">Error: This field is required</div>
        </div>
        <div class="input-container">
            <label for="age">Age</label>
            <input type="text" id="age" class="guard-input g-number">
            <div class="error-message number-error">Invalid number: Please enter a valid number</div>
        </div>
        <div class="input-container">
            <label for="birthdate">Birthdate</label>
            <input type="text" id="birthdate" class="guard-input g-date">
            <div class="error-message date-error">Invalid date: Please enter a valid date in the format MM/DD/YYYY</div>
        </div>
        <div class="input-container">
            <label for="email">Email</label>
            <input type="text" id="email" class="guard-input g-email">
            <div class="error-message email-error">Invalid email: Please enter a valid email address</div>
        </div>
        <div class="input-container">
            <label for="custom">Custom Field</label>
            <input type="text" id="custom" class="guard-input" data-custom-regex="^[a-zA-Z]+$">
            <div class="error-message custom-error">Invalid format: Please use the correct format</div>
        </div>
        <button type="submit">Submit</button>
    </form>
```

## API

### `guardForm`

Attaches validation logic to the form and handles form submission.

```javascript
HTMLElement.prototype.guardForm = function () {
    // Implementation here
};
```

#### Parameters

- None.

#### Returns

- The `this` reference to the form element.

## Error Handling

- **Required Field Error**: Displayed if a required field is empty.
- **Number Error**: Displayed if a number field contains non-numeric characters.
- **Date Error**: Displayed if a date field does not match the MM/DD/YYYY format.
- **Email Error**: Displayed if an email field does not contain a valid email address.
- **Custom Regex Error**: Displayed if a field does not match the provided custom regex pattern.
- **Regex Error**: Displayed if a field does not match the provided regex pattern.

## Editable functions

### `isValidDate(dateString)`

Validates the date format (MM/DD/YYYY).

```javascript
function isValidDate(dateString) {
    // Implementation here
}
```

### `isValidEmail(email)`

Validates the email format.

```javascript
function isValidEmail(email) {
    // Implementation here
}
```

## Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge).

## License

This library is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## Best Regards
[Leonardo Doherty](https://eldoherty.github.io/resume-portofolios/)
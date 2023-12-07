var inputName = document.getElementById('inputName');
var inputDate = document.getElementById('inputDate');
var inputGender = document.getElementById('inputGender');
var inputEmail = document.getElementById('inputEmail');
var inputPassword = document.getElementById('inputPassword');
var inputNumber = document.getElementById('inputNumber');

var nameError = document.getElementById('nameError');
var dateError = document.getElementById('dateError');
var genderError = document.getElementById('genderError');
var emailError = document.getElementById('emailError');
var passwordError = document.getElementById('passwordError');
var numberError = document.getElementById('numberError');

$("#inputNumber").mask("+7 (999) 999-99-99");
var today = new Date().toISOString().split('T')[0];
inputDate.setAttribute('max', today);

function sendAuthorizeCheck() {
    authorizeNavbar(false);
}

inputEmail.addEventListener('focusout', function(event) {
    validateEmail(inputEmail, emailError);
})

inputPassword.addEventListener('focusout', function(event) {
    validatePassword(inputPassword, passwordError);
})

inputName.addEventListener('focusout', function(event) {
    validateName(inputName, nameError);
})

inputDate.addEventListener('focusout', function(event) {
    validateDate(inputDate, dateError);
})

inputGender.addEventListener('focusout', function(event) {
    validateGender(inputGender, genderError);
})

inputNumber.addEventListener('focusout', function(event) {
    validateNumber(inputNumber, numberError);
})

document.getElementById('registerBtn').addEventListener('click',   function(event) {
    event.preventDefault();

    if (validateName(inputName, nameError) === false) {
        return;
    }

    if (validateDate(inputDate, dateError) === false) {
        return;
    }

    if (validateGender(inputGender, genderError) === false) {
        return;
    }

    if (validateNumber(inputNumber, numberError) === false) {
        return;
    }

    if (validateEmail(inputEmail, emailError) === false) {
        return;
    }

    if (validatePassword(inputPassword, passwordError) === false) {
        return;
    }

    var apiUrl = 'https://blog.kreosoft.space/api/account/register';

    var postData = {
        fullName: inputName.value,
        password: inputPassword.value,
        email: inputEmail.value,
        birthDate: inputDate.value,
        gender: inputGender.value === 'male' ? 'Male' : 'Female',
        phoneNumber: inputNumber.value
    };

    console.log(postData);

    $.ajax({
        url: apiUrl,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(postData),
        success: function(data) {
            localStorage.setItem('token', data.token);
            window.location.href = './';
        },
        error: function(error) {
            console.log(error);
        }
    });
});
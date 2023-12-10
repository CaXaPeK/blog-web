let inputName = document.getElementById('inputName');
let inputDate = document.getElementById('inputDate');
let inputGender = document.getElementById('inputGender');
let inputEmail = document.getElementById('inputEmail');
let inputPassword = document.getElementById('inputPassword');
let inputNumber = document.getElementById('inputNumber');

let nameError = document.getElementById('nameError');
let dateError = document.getElementById('dateError');
let genderError = document.getElementById('genderError');
let emailError = document.getElementById('emailError');
let passwordError = document.getElementById('passwordError');
let numberError = document.getElementById('numberError');

$("#inputNumber").mask("+7 (999) 999-99-99");
let today = new Date().toISOString().split('T')[0];
inputDate.setAttribute('max', today);

function sendAuthorizeCheck() {
    authorizeNavbar(false);
}
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

    let apiUrl = 'https://blog.kreosoft.space/api/account/register';

    let postData = {
        fullName: inputName.value,
        password: inputPassword.value,
        email: inputEmail.value,
        birthDate: inputDate.value,
        gender: inputGender.value === 'male' ? 'Male' : 'Female',
        phoneNumber: inputNumber.value
    };

    $.ajax({
        url: apiUrl,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(postData),
        success: function(data) {
            localStorage.setItem('token', data.token);
            window.location.href = '/';
        },
        error: function(error) {}
    });
});
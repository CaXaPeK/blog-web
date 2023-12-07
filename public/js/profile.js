let inputName = document.getElementById('inputName');
let inputDate = document.getElementById('inputDate');
let inputGender = document.getElementById('inputGender');
let inputEmail = document.getElementById('inputEmail');
let inputNumber = document.getElementById('inputNumber');

let nameError = document.getElementById('nameError');
let dateError = document.getElementById('dateError');
let genderError = document.getElementById('genderError');
let emailError = document.getElementById('emailError');
let numberError = document.getElementById('numberError');

let saveBtn = document.getElementById('saveBtn');

$("#inputNumber").mask("+7 (999) 999-99-99");
let today = new Date().toISOString().split('T')[0];
inputDate.setAttribute('max', today);

function sendAuthorizeCheck() {
    authorizeNavbar(true);
    getData();
}

inputEmail.addEventListener('focusout', function(event) {
    validateEmail(inputEmail, emailError);
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

function getData() {
    let apiUrl = 'https://blog.kreosoft.space/api/account/profile';

    $.ajax({
        url: apiUrl,
        type: 'GET',
        dataType: 'json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        success: function(data) {
            inputName.value = data.fullName;
            inputDate.value = data.birthDate.split('T')[0];
            inputGender.value = data.gender === "Male" ? 'male' : 'female';
            inputEmail.value = data.email;
            inputNumber.value = data.phoneNumber;
            saveBtn.classList.remove('disabled');
        },
        error: function(error) {
            console.log(error);
        }
    });
}

saveBtn.addEventListener('click',   function(event) {
    event.preventDefault();

    let apiUrl = 'https://blog.kreosoft.space/api/account/profile';

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

    let postData = {
        email: inputEmail.value,
        fullName: inputName.value,
        birthDate: inputDate.value,
        gender: inputGender.value === 'male' ? 'Male' : 'Female',
        phoneNumber: inputNumber.value
    }

    $.ajax({
        url: apiUrl,
        type: 'PUT',
        dataType: 'json',
        data: JSON.stringify(postData),
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        success: function(data) {

        },
        error: function(error) {
            if (!error.statusText == 'OK') {
                console.log(error);
                if (error.responseJSON.errors.Email == 'User with this email already exists') {
                    reportValidityError(inputEmail, emailError, "Пользователь с таким адресом электронной почты уже существует.");
                }
            }
        }
    });
});
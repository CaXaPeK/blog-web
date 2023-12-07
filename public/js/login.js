let inputEmail = document.getElementById('inputEmail');
let inputPassword = document.getElementById('inputPassword');
let emailError = document.getElementById('emailError');
let passwordError = document.getElementById('passwordError');

function sendAuthorizeCheck() {
    authorizeNavbar(false);
}

inputEmail.addEventListener('focusout', function(event) {
    validateEmail(inputEmail, emailError);
})

inputPassword.addEventListener('focusout', function(event) {
    validatePassword(inputPassword, passwordError);
})

document.getElementById('loginBtn').addEventListener('click',   function(event) {
    event.preventDefault();

    if (validateEmail(inputEmail, emailError) === false) {
        return;
    }

    if (validatePassword(inputPassword, passwordError) === false) {
        return;
    }

    let apiUrl = 'https://blog.kreosoft.space/api/account/login';

    let postData = {
        email: inputEmail.value,
        password: inputPassword.value
    };

    $.ajax({
        url: apiUrl,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(postData),
        success: function(data) {
            localStorage.setItem('token', data.token);
            window.location.href = './';
            authorizeNavbar(false);
        },
        error: function(error) {
            if (error.responseJSON.message === "Login failed") {
                reportValidityError(inputEmail, emailError, "Неверные эл. почта или пароль.");
                reportValidityError(inputPassword, passwordError, "Неверные эл. почта или пароль.");
            }
        }
    });
});

document.getElementById('registerBtn').addEventListener('click',   function(event) {
    window.location.href = './registration';
});
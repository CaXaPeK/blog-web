var inputEmail = document.getElementById('inputEmail');
var inputPassword = document.getElementById('inputPassword');
var emailError = document.getElementById('emailError');
var passwordError = document.getElementById('passwordError');

function sendAuthorizeCheck() {
    authorizeNavbar(false);
}

inputEmail.addEventListener('input', function(event) {
    validateEmail(inputEmail, emailError);
})

inputPassword.addEventListener('input', function(event) {
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

    var apiUrl = 'https://blog.kreosoft.space/api/account/login';

    var postData = {
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
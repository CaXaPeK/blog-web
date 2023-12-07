authorizeNavbar(false);

document.getElementById('registerBtn').addEventListener('click',   function(event) {
    event.preventDefault();

    var apiUrl = 'https://blog.kreosoft.space/api/account/register';

    var inputName = document.getElementById('inputName').value;
    var inputDate = document.getElementById('inputDate').value;
    var inputGender = document.getElementById('inputGender').value;
    var inputEmail = document.getElementById('inputEmail').value;
    var inputPassword = document.getElementById('inputPassword').value;
    var inputNumber = document.getElementById('inputNumber').value;

    var postData = {
        fullName: inputName,
        password: inputPassword,
        email: inputEmail,
        birthDate: inputDate,
        gender: inputGender,
        phoneNumber: inputNumber
    };

    console.log(postData);

    $.ajax({
        url: apiUrl,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(postData),
        success: function(data) {
            localStorage.setItem('token', data.token);
            window.location.href = 'main.html';
        },
        error: function(error) {
            console.log(error);
            if (error.responseJSON.message == "Login failed") {
                console.log("Login failed");
            }
        }
    });
});

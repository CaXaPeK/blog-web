document.getElementById('loginBtn').addEventListener('click',   function(event) {
    event.preventDefault();

    var apiUrl = 'https://blog.kreosoft.space/api/account/login';

    var inputEmail = document.getElementById('inputEmail').value;
    var inputPassword = document.getElementById('inputPassword').value;

    var postData = {
        email: inputEmail,
        password: inputPassword
    };

    var token = "";

    $.ajax({
        url: apiUrl,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(postData),
        success: function(data) {
            token = data.token;
            localStorage.setItem('token', token);
            window.location.href = 'main.html';
        },
        error: function(error) {
            if (error.responseJSON.message == "Login failed") {
                console.log("Login failed");
            }
        }
    });
});

    document.getElementById('registerBtn').addEventListener('click',   function(event) {
        openInsideNavbar("../html/register.html", "../js/register.js");
    });
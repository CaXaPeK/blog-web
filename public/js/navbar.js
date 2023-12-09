sendAuthorizeCheck();

let loginLink = document.getElementById('loginLink');
let profileDropdown = document.getElementById('profileDropdown');
let emailText = document.getElementById('emailText');
let createPostButton = document.getElementById('createPostButton');

var authorized = false;

function authorizeNavbar(redirectIfFail) {
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
            createPostButton.classList.remove('disabled');
            emailText.textContent = data.email;
            loginLink.style.display = "none";
            profileDropdown.style.display = "flex";
            authorized = true;
            authorizeInnerPage();

            return true;
        },
        error: function(error) {
            console.log(error);
            disableAuthorizedButtons();
            if (redirectIfFail) {
                window.location.href = './login';
            }

            return false;
        }
    });
}

function disableAuthorizedButtons() {
    var loginLink = document.getElementById('loginLink');
    var profileDropdown = document.getElementById('profileDropdown');
    var createPostButton = document.getElementById('createPostButton');

    createPostButton.classList.add('disabled');
    loginLink.style.display = "flex";
    profileDropdown.style.display = "none";
}

document.getElementById('logoutButton').addEventListener('click',   function(event) {
    var xhr = new XMLHttpRequest();
    var apiUrl = 'https://blog.kreosoft.space/api/account/logout';
    var authToken = localStorage.getItem('token');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                localStorage.setItem('token', "");
                disableAuthorizedButtons();
                window.location.href = "./login";
            } else {
                console.error('Ошибка:', xhr.statusText);
                //message: Не удалось выйти из системы.
            }
        }
    };

    xhr.open('POST', apiUrl, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + authToken);
    xhr.send();
});
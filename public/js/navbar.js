sendAuthorizeCheck();

function authorizeNavbar(redirectIfFail) {
    var email = "";

    var xhr = new XMLHttpRequest();
    var apiUrl = 'https://blog.kreosoft.space/api/account/profile';
    var authToken = localStorage.getItem('token');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var responseData = JSON.parse(xhr.responseText);
                email = responseData.email;

                var loginLink = document.getElementById('loginLink');
                var profileDropdown = document.getElementById('profileDropdown');
                var emailText = document.getElementById('emailText');
                var createPostButton = document.getElementById('createPostButton');

                createPostButton.classList.remove('disabled');
                emailText.textContent = email;
                loginLink.style.display = "none";
                profileDropdown.style.display = "flex";

                return true;
            } else {
                if (xhr.status === 401) {
                    console.error("Пользователь не авторизирован.");
                }
                disableAuthorizedButtons();
                if (redirectIfFail) {
                    window.location.href = './login';
                }
                return false;
            }
        }
    };

    xhr.open('GET', apiUrl, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + authToken);
    xhr.send();
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

document.getElementById('loginLink').addEventListener('click',   function(event) {
    window.location.href = './login';
});

document.getElementById('homeLink').addEventListener('click',   function(event) {
    window.location.href = './';
});

document.getElementById('authorsLink').addEventListener('click',   function(event) {
    window.location.href = './authors';
});

document.getElementById('communitiesLink').addEventListener('click',   function(event) {
    window.location.href = './communities';
});

document.getElementById('createPostButton').addEventListener('click',   function(event) {
    window.location.href = './post/create';
});

document.getElementById('profileLink').addEventListener('click',   function(event) {
    window.location.href = './profile';
});
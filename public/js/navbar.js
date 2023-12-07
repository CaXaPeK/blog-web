function openInsideNavbar(htmlPath, jsPath) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            removePreviousScripts();
            document.getElementById('contentContainer').innerHTML = xhr.responseText;
            loadScript();
        }
    };

    xhr.open('GET', htmlPath, true);
    xhr.send();

    function loadScript() {
        var script = document.createElement('script');
        script.src = jsPath;
        document.body.appendChild(script);
    }

    function removePreviousScripts() {
        var scripts = document.body.querySelectorAll('script');

        scripts.forEach(function(script) {
            script.parentNode.removeChild(script);
        });
    }
}

function authorizeNavbar() {
    var email = "";

    var xhr = new XMLHttpRequest();
    var apiUrl = 'https://blog.kreosoft.space/api/account/profile';
    var authToken = localStorage.getItem('token');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            var loginLink = document.getElementById('loginLink');
            var profileDropdown = document.getElementById('profileDropdown');
            var emailText = document.getElementById('emailText');
            var createPostButton = document.getElementById('createPostButton');

            if (xhr.status === 200) {
                var responseData = JSON.parse(xhr.responseText);
                email = responseData.email;

                createPostButton.classList.remove('disabled');
                emailText.textContent = email;
                loginLink.style.display = "none";
                profileDropdown.style.display = "flex";
            } else {
                console.error('Ошибка:', xhr.statusText);

                createPostButton.classList.add('disabled');
                loginLink.style.display = "none";
                profileDropdown.style.display = "flex";
            }
        }
    };

    xhr.open('GET', apiUrl, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + authToken);
    xhr.send();
}

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
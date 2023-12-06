document.getElementById('loginBtn').addEventListener('click', function() {
    var apiUrl = 'https://blog.kreosoft.space/api/account/login';

    var inputEmail = document.getElementById('inputEmail').value;
    var inputPassword = document.getElementById('inputPassword').value;

    var postData = {
        email: inputEmail,
        password: inputPassword
    };

    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    };

    fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
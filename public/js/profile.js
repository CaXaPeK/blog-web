function getData() {
    var apiUrl = 'https://blog.kreosoft.space/api/account/profile';

    var inputName = document.getElementById('inputName');
    var inputDate = document.getElementById('inputDate');
    var inputGender = document.getElementById('inputGender');
    var inputEmail = document.getElementById('inputEmail');
    var inputNumber = document.getElementById('inputNumber');

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
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function sendAuthorizeCheck() {
    authorizeNavbar(true);
    getData();
}
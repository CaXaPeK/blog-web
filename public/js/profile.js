function getData() {
    let apiUrl = 'https://blog.kreosoft.space/api/account/profile';

    let inputName = document.getElementById('inputName');
    let inputDate = document.getElementById('inputDate');
    let inputGender = document.getElementById('inputGender');
    let inputEmail = document.getElementById('inputEmail');
    let inputNumber = document.getElementById('inputNumber');

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

document.getElementById('saveBtn').addEventListener('click',   function(event) {
    let apiUrl = 'https://blog.kreosoft.space/api/account/profile';

    let inputName = document.getElementById('inputName');
    let inputDate = document.getElementById('inputDate');
    let inputGender = document.getElementById('inputGender');
    let inputEmail = document.getElementById('inputEmail');
    let inputNumber = document.getElementById('inputNumber');

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
            console.log("success");
        },
        error: function(error) {
            console.log(error);
        }
    });
});
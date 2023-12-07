function reportValidityError(input, errorField, message) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    errorField.innerText = message;
}

function reportValiditySuccess(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
}

function validateEmail(input, errorField) {
    if (input.value === '') {
        reportValidityError(input, errorField, "Это обязательное поле.");
        return false;
    }

    var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!emailRegex.test(input.value)) {
        reportValidityError(input, errorField, "Это не адрес электронной почты.");
        return false;
    }

    reportValiditySuccess(input);
    return true;
}

function validatePassword(input, errorField) {
    if (input.value === '') {
        reportValidityError(input, errorField, "Это обязательное поле.");
        return false;
    }

    if (input.value.length < 6) {
        reportValidityError(input, errorField, "Минимальная длина пароля — 6.");
        return false;
    }

    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/;
    if (!passwordRegex.test(input.value)) {
        reportValidityError(input, errorField, "Пароль должен содержать как минимум 1 букву, 1 заглавную букву, 1 цифру и 1 спецсимвол.");
        return false;
    }

    reportValiditySuccess(input);
    return true;
}
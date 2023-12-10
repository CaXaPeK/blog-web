function reportValidityError(input, errorField, message) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    errorField.innerText = message;
}

function emptyValidity(input) {
    input.classList.remove('is-valid');
    input.classList.remove('is-invalid');
}

function reportValiditySuccess(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
}

function validateEmail(input, errorField) {
    if (input.value === '') {
        reportValidityError(input, errorField, "Введите адрес электронной почты.");
        return false;
    }

    var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!emailRegex.test(input.value)) {
        reportValidityError(input, errorField, "Это не адрес электронной почты.");
        return false;
    }

    emptyValidity(input);
    //reportValiditySuccess(input);
    return true;
}

function validatePassword(input, errorField) {
    if (input.value === '') {
        reportValidityError(input, errorField, "Введите пароль.");
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

    emptyValidity(input);
    //reportValiditySuccess(input);
    return true;
}

function validateName(input, errorField) {
    if (input.value === '') {
        reportValidityError(input, errorField, "Введите ФИО.");
        return false;
    }

    emptyValidity(input);
    //reportValiditySuccess(input);
    return true;
}

function validateDate(input, errorField) {
    if (input.value === '') {
        reportValidityError(input, errorField, "Укажите дату.");
        return false;
    }

    var today = new Date().toISOString().split('T')[0];
    if (input.value > today) {
        reportValidityError(input, errorField, "Дата рождения не должна быть позже сегодня.");
        return false;
    }

    emptyValidity(input);
    //reportValiditySuccess(input);
    return true;
}

function validateGender(input, errorField) {
    if (input.value != 'male' && input.value != 'female') {
        reportValidityError(input, errorField, "Укажите пол.");
        return false;
    }

    emptyValidity(input);
    //reportValiditySuccess(input);
    return true;
}

function validateNumber(input, errorField) {
    if (input.value.length < 18 && input.value.length > 0) {
        reportValidityError(input, errorField, "Номер телефона неполный.");
        return false;
    }

    emptyValidity(input);
    //reportValiditySuccess(input);
    return true;
}

function validateTitle(input, errorField) {
    if (input.value.length == 0) {
        reportValidityError(input, errorField, "Введите заголовок поста.");
        return false;
    }

    if (input.value.length < 5) {
        reportValidityError(input, errorField, "Минимальная длина заголовка поста — 5.");
        return false;
    }

    if (input.value.length > 1000) {
        reportValidityError(input, errorField, "Максимальная длина заголовка поста — 1000.");
        return false;
    }

    emptyValidity(input);
    return true;
}

function validateReadTime(input, errorField) {
    if (input.value.length == 0) {
        reportValidityError(input, errorField, "Введите время чтения.");
        return false;
    }

    if (input.value < 1) {
        reportValidityError(input, errorField, "Минимальное время чтения — 1 мин.");
        return false;
    }

    if (input.value > 2147483647) {
        reportValidityError(input, errorField, "Максимальное время чтения — 2147483647 мин.");
        return false;
    }

    emptyValidity(input);
    return true;
}

function validateImage(input, errorField) {
    let regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|ftp:\/\/)([a-zA-Z0-9-]+\.)*[a-zA-Z]{2,}(\/.*)*$/;
    if (!regex.test(input.value) && input.value.length != 0) {
        reportValidityError(input, errorField, "Ссылка недействительна.");
        return false;
    }

    emptyValidity(input);
    return true;
}

function validateText(input, errorField) {
    if (input.value.length == 0) {
        reportValidityError(input, errorField, "Введите текст поста.");
        return false;
    }

    if (input.value.length < 5) {
        reportValidityError(input, errorField, "Минимальная длина текста поста — 5.");
        return false;
    }

    if (input.value.length > 5000) {
        reportValidityError(input, errorField, "Максимальная длина текста поста — 5000.");
        return false;
    }

    emptyValidity(input);
    return true;
}

function validateTags(input, errorField) {
    if (input.selectedOptions.length < 1) {
        reportValidityError(input, errorField, "Выберите как минимум 1 тег.");
        return false;
    }

    emptyValidity(input);
    return true;
}

function validateComment(input, errorField) {
    if (input.value.length == 0) {
        reportValidityError(input, errorField, "Комментарий не может быть пустым.");
        return false;
    }

    if (input.value.length > 1000) {
        reportValidityError(input, errorField, "Максимальная длина комментария — 1000.");
        return false;
    }

    emptyValidity(input);
    return true;
}
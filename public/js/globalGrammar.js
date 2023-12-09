function russianPlural(num, singular, less5, more5) {
    if (num > 10 && num < 20) {
        return more5;
    }
    if (num % 10 == 1) {
        return singular;
    }
    if (num % 10 > 1 && num % 10 < 5)
    {
        return less5;
    }
    else {
        return more5;
    }
}
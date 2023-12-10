loadAuthors();

function sendAuthorizeCheck() {
    authorizeNavbar(false);
}

function authorizeInnerPage() {

}

function loadAuthors() {
    let apiUrl = 'https://blog.kreosoft.space/api/author/list';

    $.ajax({
        url: apiUrl,
        type: 'GET',
        contentType: 'application/json',
        success: function(data) {
            let bestThree = getBestThree(data);
            for (let i = 0; i < data.length; i++) {
                let place = bestThree.indexOf(data[i].fullName);
                appendAuthor(data[i], place, i);
            }
        },
        error: function(error) {}
    });
}

function appendAuthor(author, place, num) {
    $.get("/templates/author.html", null, function(data) {
        let $authorTemplate = $(data).clone();
        let avatarLink = author.gender == 'Male' ? "/image/maleAvatar.jpg" : "/image/femaleAvatar.jpg";

        if (author.birthDate == null) {
            $authorTemplate.find('.birth-date-container').addClass('d-none');
        }

        if (num === 0) {
            $authorTemplate.find('.divider').addClass('d-none');
        }

        if (place == 0) {
            $authorTemplate.find('.gold-crown').removeClass('d-none');
        }
        else if (place == 1) {
            $authorTemplate.find('.silver-crown').removeClass('d-none');
        }
        else if (place == 2) {
            $authorTemplate.find('.bronze-crown').removeClass('d-none');
        }

        $authorTemplate.find('.name').text(author.fullName);
        $authorTemplate.find('.create-date').text("Создан: " + moment(author.created).format('DD.MM.YYYY'));
        $authorTemplate.find('.birth-date').text(moment(author.birthDate).format('DD.MM.YYYY'));
        $authorTemplate.find('.post-count').text(author.posts + " пост" + russianPlural(author.posts, "", "а", "ов"));
        $authorTemplate.find('.like-count').text(author.likes + " лайк" + russianPlural(author.likes, "", "а", "ов"));
        $authorTemplate.find('.image-container').attr('src', avatarLink);

        $("#authorsContainer").append($authorTemplate);
    });
}

function searchAuthor(authorCard) {
    let userName = authorCard.querySelector('.name').textContent;
    window.location.href = "/?author=" + userName;
}

function getBestThree(authors) {
    let sortedAuthors = JSON.parse(JSON.stringify(authors));

    sortedAuthors.sort(multipleAttributesSort);

    return [ sortedAuthors[0].fullName, sortedAuthors[1].fullName, sortedAuthors[2].fullName ];
}

function multipleAttributesSort(a, b) {
    if (a.posts > b.posts) return -1;
    if (a.posts < b.posts) return 1;

    if (a.likes > b.likes) return -1;
    if (a.likes < b.likes) return 1;

    return 0;
}
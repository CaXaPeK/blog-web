loadCommunity();

function sendAuthorizeCheck() {

}

function loadCommunity() {
    let id = document.querySelector('.community-container').id;
    let apiUrl = 'https://blog.kreosoft.space/api/community/' + id;

    $.ajax({
        url: apiUrl,
        type: 'GET',
        contentType: 'application/json',
        success: function(data) {
            console.log(data);
            displayCommunity(data);
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function displayCommunity(community) {
    $.get("/templates/community.html", null, function(data){
        let $communityTemplate = $(data).clone();

        $communityTemplate.attr('id', "post-" + community.id);
        $communityTemplate.find('.card-title').text(community.name);
        $communityTemplate.find('.subscribers-count').text(community.subscribersCount + " подписчик" + russianPlural(community.subscribersCount, "", "а", "ов"));
        $communityTemplate.find('.community-type').text("Тип группы: " + (community.isClosed == true ? "закрытая" : "открытая"));
        $communityTemplate.find('.btn-primary').attr('id', community.id);
        $communityTemplate.find('.btn-danger').attr('id', community.id);

        $("#" + community.id).append($communityTemplate);

        for (let i = 0; i < community.administrators.length; i++) {
            appendAdmins(community.administrators[i], i);
        }

        checkUserRole(community.id, "");
    });
}

function appendAdmins(admin, num) {
    $.get("/templates/administrator.html", null, function(data){
        let $adminTemp = $(data).clone();
        let avatarLink = admin.gender == 'Male' ? "/image/maleAvatar.jpg" : "/image/femaleAvatar.jpg";

        if (num == 0) {
            $adminTemp.find('.divider').addClass('d-none');
        }
        $adminTemp.find('.name').text(admin.fullName);
        $adminTemp.find('.image-container').attr('src', avatarLink);

        $("#adminsContainer").append($adminTemp);
    })
}

function russianPlural(num, singular, less5, more5) {
    console.log(num)
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
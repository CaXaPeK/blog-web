let communitiesLoaded = false;

loadCommunities();


function sendAuthorizeCheck() {
    authorizeNavbar(false);
}
function authorizeInnerPage() {

}

function appendCommunity(community) {
    $.get("/templates/communitySmall.html", null, function(data){
        let $communityTemplate = $(data).clone();

        $communityTemplate.attr('id', "post-" + community.id);
        $communityTemplate.find('.card-title').text(community.name);
        $communityTemplate.find('.card-title').attr('id', community.id);
        $communityTemplate.find('.btn-primary').attr('id', community.id);
        $communityTemplate.find('.btn-danger').attr('id', community.id);

        $("#communitiesContainer").append($communityTemplate);

        checkUserRole(community.id);
    })
}

function checkUserRole(communityId) {
    let apiUrl = 'https://blog.kreosoft.space/api/community/' + communityId + '/role';
    let communityCard = document.getElementById('post-' + communityId);
    let subscribeButton = communityCard.querySelector('.btn-primary');
    let unsubscribeButton = communityCard.querySelector('.btn-danger');
    $.ajax({
        url: apiUrl,
        dataType: 'json',
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        success: function(data) {
            console.log(communityId);
            console.log(data)
            if (data == null) {
                subscribeButton.classList.remove('d-none');
            }
            else if (data == 'Subscriber') {
                unsubscribeButton.classList.remove('d-none');
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function loadCommunities() {
    let apiUrl = 'https://blog.kreosoft.space/api/community';

    $.ajax({
        url: apiUrl,
        dataType: 'json',
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        success: function(data) {
            console.log(data);

            for (let i = 0; i < data.length; i++) {
                appendCommunity(data[i]);
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function openCommunity(btn) {
    window.location.href = "/communities/" + btn.id;
}

function subscribe(btn, action) {
    let apiUrl = 'https://blog.kreosoft.space/api/community/' + btn.id + "/" + action;

    let communityId = btn.id;
    let communityCard = document.getElementById('post-' + communityId);
    let subscribeButton = communityCard.querySelector('.btn-primary');
    let unsubscribeButton = communityCard.querySelector('.btn-danger');

    console.log(subscribeButton);

    let requestType = action == 'subscribe' ? 'POST' : 'DELETE';

    $.ajax({
        url: apiUrl,
        dataType: 'json',
        type: requestType,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        success: function(data) {

        },
        error: function(error) {
            if (error.status == 200) {
                if (action === 'subscribe') {
                    subscribeButton.classList.add('d-none');
                    unsubscribeButton.classList.remove('d-none');
                }
                else {
                    subscribeButton.classList.remove('d-none');
                    unsubscribeButton.classList.add('d-none');
                }
            }
        }
    });
}
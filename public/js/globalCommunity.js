function checkUserRole(communityId, containerPrefix) {
    let apiUrl = 'https://blog.kreosoft.space/api/community/' + communityId + '/role';
    let communityCard = document.getElementById(containerPrefix + communityId);
    let subscribeButton = communityCard.querySelector('.btn-subscribe');
    let unsubscribeButton = communityCard.querySelector('.btn-danger');
    let newPostBtn = document.querySelector('.btn-new-post');

    $.ajax({
        url: apiUrl,
        dataType: 'json',
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        success: function(data) {
            if (data == null) {
                subscribeButton.classList.remove('d-none');
            }
            else if (data == 'Subscriber') {
                unsubscribeButton.classList.remove('d-none');
            }
            else if (data == 'Administrator') {
                if (newPostBtn != null) {
                    newPostBtn.classList.remove('d-none');
                }
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function subscribe(btn, action, containerPrefix) {
    let apiUrl = 'https://blog.kreosoft.space/api/community/' + btn.id + "/" + action;

    let communityId = btn.id;
    let communityCard = document.getElementById(containerPrefix + communityId);
    let subscribeButton = communityCard.querySelector('.btn-subscribe');
    let unsubscribeButton = communityCard.querySelector('.btn-danger');
    let subCount = document.querySelector('.subscribers-count');

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

                if (subCount != null) {
                    subCountValue = parseFloat(subCount.textContent.split('T')[0]);
                    if (action === 'subscribe') {
                        subCount.textContent = (subCountValue + 1) + " подписчик" + russianPlural(subCountValue + 1, "", "а", "ов");
                    }
                    else {
                        subCount.textContent = (subCountValue - 1) + " подписчик" + russianPlural(subCountValue - 1, "", "а", "ов");;
                    }
                }
            }
        }
    });
}
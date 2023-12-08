let newPostBtn = document.getElementById('newPostBtn');
let tagFilter = document.getElementById('tagFilter');
let filterApplyBtn = document.getElementById('filterApplyBtn');

getTags();

function sendAuthorizeCheck() {
    authorizeNavbar(false);
}

function authorizeInnerPage() {
    newPostBtn.classList.remove('disabled');
}

function getTags() {
    let apiUrl = 'https://blog.kreosoft.space/api/tag';

    $.ajax({
        url: apiUrl,
        type: 'GET',
        contentType: 'application/json',
        success: function(data) {
            tagFilter.options.length = 0;
            for (let i = 0; i < data.length; i++) {
                let option = new Option(data[i].name, data[i].name);
                tagFilter.add(option);
            }

            filterApplyBtn.classList.remove('disabled');
        },
        error: function(error) {
            console.log(error);
        }
    });
}
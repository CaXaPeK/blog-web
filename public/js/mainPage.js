let newPostBtn = document.getElementById('newPostBtn');
let tagFilter = document.getElementById('tagFilter');
let filterApplyBtn = document.getElementById('filterApplyBtn');
let pageSize = document.getElementById('pageSize');

loadTags();
loadPosts();

function sendAuthorizeCheck() {
    authorizeNavbar(false);
}

function authorizeInnerPage() {
    newPostBtn.classList.remove('disabled');
}

function loadTags() {
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

function loadPosts() {
    let apiUrl = 'https://blog.kreosoft.space/api/post';

    $.ajax({
        url: apiUrl,
        type: 'GET',
        dataType: 'json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        success: function(data) {
            pageSize.value = data.pagination.size;
            pageSize.max = data.pagination.count;
            console.log(data);
        },
        error: function(error) {
            console.log(error);
        }
    });
}
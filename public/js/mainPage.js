let authorFilter = document.getElementById('authorFilter');
let tagFilter = document.getElementById('tagFilter');
let sortFilter = document.getElementById('sortFilter');
let minReadTimeFilter = document.getElementById('minReadTimeFilter');
let maxReadTimeFilter = document.getElementById('maxReadTimeFilter');
let myCommunitiesFilter = document.getElementById('myCommunitiesFilter');

let newPostBtn = document.getElementById('newPostBtn');

let filterApplyBtn = document.getElementById('filterApplyBtn');
let pageSize = document.getElementById('pageSize');
let notFoundText = document.getElementById('notFoundText');

let postContainer = document.getElementById('postContainer');

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
                let option = new Option(data[i].name, data[i].id);
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
    let apiUrl = 'https://blog.kreosoft.space/api/post' + window.location.search;

    $.ajax({
        url: apiUrl,
        type: 'GET',
        dataType: 'json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        success: function(data) {
            notFoundText.textContent = '';
            pageSize.value = data.pagination.size;
            pageSize.max = data.pagination.count;
            console.log(data);

            for (let i = 0; i < data.posts.length; i++) {
                appendPost(data.posts[i]);
            }

            if (data.posts.length === 0) {
                notFoundText.textContent = "Ничего не найдено :(";
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function sendFilters() {
    let params = new URLSearchParams();

    if (authorFilter.value != "") {
        params.set('author', authorFilter.value);
    }
    if (minReadTimeFilter.value != "") {
        params.set('min', minReadTimeFilter.value);
    }
    if (maxReadTimeFilter.value != "") {
        console.log(maxReadTimeFilter.value)
        params.set('max', maxReadTimeFilter.value);
    }
    if (sortFilter.value != "—") {
        params.set('sorting', sortFilter.value);
    }
    if (myCommunitiesFilter.value != false) {
        params.set('onlyMyCommunities', myCommunitiesFilter.value);
    }
    if (tagFilter.selectedOptions.length != 0) {
        for (let i = 0; i < tagFilter.selectedOptions.length; i++) {
            params.append('tags', tagFilter.selectedOptions[i].value);
        }
    }

    window.location.href = params != "" ? "/?" + params : "/";

}
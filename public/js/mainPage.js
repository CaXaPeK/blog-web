let newPostBtn = document.getElementById('newPostBtn');
let tagFilter = document.getElementById('tagFilter');
let filterApplyBtn = document.getElementById('filterApplyBtn');
let pageSize = document.getElementById('pageSize');
let notFoundText = document.getElementById('notFoundText');

let postTemplate = document.getElementById('postTemplate');
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
            notFoundText.textContent = '';
            pageSize.value = data.pagination.size;
            pageSize.max = data.pagination.count;
            console.log(data);

            for (let i = 0; i < data.posts.length; i++) {
                addPost(data.posts[i]);
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

function addPost(post) {
    let clonedPost = postTemplate.cloneNode(true);
    clonedPost.style.display = 'flex';

    let metadata = post.author + " — " + moment(post.createTime).format('HH:mm DD.MM.YYYY');
    if (post.communityId != null) {
        metadata += " в группе «" + post.communityName + "»";
    }

    let shortText = post.description;
    if (shortText.length > 300) {
        shortText = shortText.substring(0, 300) + "...";
        clonedPost.querySelector('.show-full-btn').style.display = 'flex';
    }

    let tags = "";
    for (let i = 0; i < post.tags.length; i++) {
        if (tags != "") {
            tags += "   ";
        }
        tags += "#" + post.tags[i].name;
    }

    if (post.image != null) {
        clonedPost.querySelector('.image-container').src = post.image;
        clonedPost.querySelector('.image-container').style.display = 'flex';
    }

    if (post.hasLike === true) {
        clonedPost.querySelector('.like-btn').classList.add('text-danger')
    }

    clonedPost.querySelector('.post-metadata').textContent = metadata;
    clonedPost.querySelector('.card-title').textContent = post.title;
    clonedPost.querySelector('.post-text-short').textContent = shortText;
    clonedPost.querySelector('.post-text-full').textContent = post.description;
    clonedPost.querySelector('.comment-count').textContent = post.commentsCount;
    clonedPost.querySelector('.like-count').textContent = post.likes;
    clonedPost.querySelector('.read-time').textContent = "Время чтения: " + post.readingTime + " мин";
    clonedPost.querySelector('.tags').textContent = tags;

    postContainer.appendChild(clonedPost);
}
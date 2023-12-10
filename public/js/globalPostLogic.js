const POST_LENGTH = 500;

function likePost(likeBtn) {
    if (likeBtn.classList.contains('disabled')) {
        return;
    }
    if (!authorized) {
        return;
    }

    let apiUrl = 'https://blog.kreosoft.space/api/post/' + likeBtn.id + '/like';
    let requestType = likeBtn.classList.contains('text-danger') ? 'DELETE' : 'POST';

    likeBtn.classList.add('disabled');
    $.ajax({
        url: apiUrl,
        type: requestType,
        dataType: 'json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        success: function(data) {
            setLikeLocally();
            likeBtn.classList.remove('disabled');
        },
        error: function(error) {
            if (error.status === 200) {
                setLikeLocally();
            }

            likeBtn.classList.remove('disabled');
            console.log(error);
        }
    });

    function setLikeLocally() {
        let likeCount = likeBtn.querySelector('.like-count');
        if (requestType === 'POST') {
            likeBtn.classList.add('text-danger');
            likeCount.textContent = parseFloat(likeCount.textContent) + 1;
        }
        else {
            likeBtn.classList.remove('text-danger');
            likeCount.textContent = parseFloat(likeCount.textContent) - 1;
        }
    }
}

function commentPost(commentBtn) {
    window.location.href = "/post/" + commentBtn.id + "#Комментарии";
}

function showFull(showBtn) {
    showBtn.parentNode.querySelector('.post-text-short').classList.add('d-none');
    showBtn.parentNode.querySelector('.post-text-full').classList.remove('d-none');
    showBtn.style.display = 'none';
}

function pressTitle(postTitle) {
    window.location.href = "/post/" + postTitle.id;
}

function loadTags(tagSelectName) {
    let apiUrl = 'https://blog.kreosoft.space/api/tag';
    let tagSelect = document.getElementById(tagSelectName);

    $.ajax({
        url: apiUrl,
        type: 'GET',
        contentType: 'application/json',
        success: function(data) {
            tagSelect.options.length = 0;
            for (let i = 0; i < data.length; i++) {
                let option = new Option(data[i].name, data[i].id);
                tagSelect.add(option);
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
}



function sendFilters() {
    let params = new URLSearchParams();
    let authorFilter = document.getElementById('authorFilter');
    let tagFilter = document.getElementById('tagFilter');
    let sortFilter = document.getElementById('sortFilter');
    let minReadTimeFilter = document.getElementById('minReadTimeFilter');
    let maxReadTimeFilter = document.getElementById('maxReadTimeFilter');
    let myCommunitiesFilter = document.getElementById('myCommunitiesFilter');

    if (authorFilter != null) {
        if (authorFilter.value != "") {
            params.set('author', authorFilter.value);
        }
    }
    if (minReadTimeFilter != null) {
        if (minReadTimeFilter.value != "") {
            params.set('min', minReadTimeFilter.value);
        }
    }
    if (maxReadTimeFilter != null) {
        if (maxReadTimeFilter.value != "") {
            params.set('max', maxReadTimeFilter.value);
        }
    }
    if (sortFilter != null) {
        if (sortFilter.value != "—") {
            params.set('sorting', sortFilter.value);
        }
    }
    if (myCommunitiesFilter != null) {
        if (myCommunitiesFilter.checked != false) {
            params.set('onlyMyCommunities', myCommunitiesFilter.checked);
        }
    }
    if (tagFilter != null) {
        if (tagFilter.selectedOptions.length != 0) {
            for (let i = 0; i < tagFilter.selectedOptions.length; i++) {
                params.append('tags', tagFilter.selectedOptions[i].value);
            }
        }
    }

    params.delete('page');

    window.location.search = params;
}

function loadPosts() {
    let idContainer = document.querySelector('.community-container');
    let apiUrl = "";
    if (idContainer != null) {
        apiUrl = 'https://blog.kreosoft.space/api/community/' + idContainer.id + '/post' + window.location.search;
    }
    else {
        apiUrl = 'https://blog.kreosoft.space/api/post' + window.location.search;
    }

    let notFoundText = document.getElementById('notFoundText');
    let filtersForm = document.getElementById('filtersForm');

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

            for (let i = 0; i < data.posts.length; i++) {
                appendPost(data.posts[i], false);
            }

            if (data.posts.length === 0) {
                notFoundText.textContent = "Ничего не найдено :(";
            }

            filtersForm.classList.remove('d-none');
            loadPagination(data.pagination.count, data.pagination.current, data.pagination.size);
        },
        error: function(error) {
            console.log(error);
            if (error.status == 404) {
                notFoundText.textContent = "Ничего не найдено :(";
                loadPagination(0, 1, 5);
            }
            else if (error.status == 403) {

            }
        }
    });
}

function loadPost() {
    id = document.querySelector('.post-id-container').id;
    postId = id;

    let apiUrl = 'https://blog.kreosoft.space/api/post/' + id;
    let notFoundText = document.getElementById('notFoundText');

    $.ajax({
        url: apiUrl,
        type: 'GET',
        dataType: 'json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        success: function(data) {
            console.log(data)
            notFoundText.textContent = '';

            if (data === null) {
                notFoundText.textContent = "Ничего не найдено :(";
            }

            document.getElementById('commentElements').classList.remove('d-none');

            appendPost(data, true);
            loadComments(null, data.comments, 'commentsContainer', 0, null);
        },
        error: function(error) {
            console.log(error);
            if (error.status == 404) {
                notFoundText.textContent = "Ничего не найдено :(";
                loadPagination(0, 1, 5);
            }
            else if (error.status == 403) {

            }
        }
    });
}

function appendPost(post, isDetailed) {
    $.get("/templates/post.html", null, function(data){
        let $clonedPost = $(data).clone();

        let metadata = post.author + " — " + moment(post.createTime).format('HH:mm DD.MM.YYYY');
        if (post.communityId != null) {
            metadata += " в группе «" + post.communityName + "»";
        }

        let shortText = post.description;
        if (shortText.length > POST_LENGTH) {
            shortText = shortText.substring(0, POST_LENGTH) + "...";
            $clonedPost.find('.show-full-btn').removeClass('d-none');
        }

        let tags = "";
        for (let i = 0; i < post.tags.length; i++) {
            if (tags != "") {
                tags += "   ";
            }
            tags += "#" + post.tags[i].name;
        }

        if (post.image != null) {
            $clonedPost.find('.image-container').attr("src", post.image);
            $clonedPost.find('.image-container').removeClass('d-none');
        }

        if (post.hasLike === true) {
            $clonedPost.find('.like-btn').addClass('text-danger');
        }

        if (isDetailed) {
            $clonedPost.find('.card-title').attr('onclick', '');
            $clonedPost.find('.card-title').attr('style', '');

            $clonedPost.find('.comment-btn').attr('onclick', '');
            $clonedPost.find('.comment-btn').attr('style', '');
        }

        $clonedPost.find('.post-metadata').text(metadata);
        $clonedPost.find('.card-title').text(post.title);
        $clonedPost.find('.card-title').attr("id", post.id);
        $clonedPost.find('.post-text-short').text(shortText);
        $clonedPost.find('.post-text-full').text(post.description);
        $clonedPost.find('.comment-count').text(post.commentsCount);
        $clonedPost.find('.comment-btn').attr("id", post.id);
        $clonedPost.find('.like-count').text(post.likes);
        $clonedPost.find('.like-btn').attr("id", post.id);
        $clonedPost.find('.read-time').text("Время чтения: " + post.readingTime + " мин");
        $clonedPost.find('.tags').text(tags);

        $("#postContainer").append($clonedPost);

        if (post.addressId != null) {
            let postContainer = document.getElementById('postContainer');
            let addressContainer = postContainer.childNodes[postContainer.childNodes.length - 1].querySelector('.address-container');
            loadAddress(post.addressId, addressContainer);
        }
    })
}

function loadAddress(addressId, addressContainer) {
    let apiUrl = 'https://blog.kreosoft.space/api/address/chain?objectGuid=' + addressId;

    $.ajax({
        url: apiUrl,
        type: 'GET',
        contentType: 'application/json',
        success: function(data) {
            let addressString = '';
            for (let i = 0; i < data.length; i++) {
                if (i != 0) {
                    addressString += ', ';
                }
                addressString += data[i].text;
            }

            addressContainer.querySelector('.address').textContent = addressString;
            addressContainer.classList.remove('d-none');
        },
        error: function(error) {
            console.log(error);
        }
    });
}
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

}

function showFull(showBtn) {
    showBtn.parentNode.querySelector('.post-text-short').classList.add('d-none');
    showBtn.parentNode.querySelector('.post-text-full').classList.remove('d-none');
    showBtn.style.display = 'none';
}

function pressTitle(postTitle) {
    window.location.href = "/post/" + postTitle.id;
}

function appendPost(post) {
    $.get("/templates/post.html", null, function(data){
        let $clonedPost = $(data).clone();

        let metadata = post.author + " — " + moment(post.createTime).format('HH:mm DD.MM.YYYY');
        if (post.communityId != null) {
            metadata += " в группе «" + post.communityName + "»";
        }

        let shortText = post.description;
        if (shortText.length > 300) {
            shortText = shortText.substring(0, 300) + "...";
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

        $clonedPost.find('.post-metadata').text(metadata);
        $clonedPost.find('.card-title').text(post.title);
        $clonedPost.find('.card-title').attr("id", post.id);
        $clonedPost.find('.post-text-short').text(shortText);
        $clonedPost.find('.post-text-full').text(post.description);
        $clonedPost.find('.comment-count').text(post.commentsCount);
        $clonedPost.find('.like-count').text(post.likes);
        $clonedPost.find('.like-btn').attr("id", post.id);
        $clonedPost.find('.read-time').text("Время чтения: " + post.readingTime + " мин");
        $clonedPost.find('.tags').text(tags);

        $("#postContainer").append($clonedPost);
    })
}
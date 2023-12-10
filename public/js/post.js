let tooltipTriggerList = null
let tooltipList = null
let postId = null;

let commentText = document.getElementById('commentText');
let commentError = document.getElementById('commentError');

function sendAuthorizeCheck() {
    authorizeNavbar(false);
}

function authorizeInnerPage() {
    loadPost()
}

function loadComments(parentCommentId, comments, containerId, depth, showBtn) {
    if (parentCommentId == null) {
        if (comments.length == 0) {
            document.querySelector('.comments-card').remove();
        }
        appendComments(comments, containerId, depth);
        return;
    }

    showBtn.remove();
    let apiUrl = 'https://blog.kreosoft.space/api/comment/' + parentCommentId + '/tree';

    $.ajax({
        url: apiUrl,
        type: 'GET',
        contentType: 'application/json',
        success: function(data) {
            appendComments(data, containerId, depth);
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function appendComments(comments, containerId, depth) {
    for (let i = 0; i < comments.length; i++) {
        $.get("/templates/comment.html", null, function (data) {
            let $commentTemplate = $(data).clone();

            //я думал, что на вложенные комментарии можно отвечать и написал это всё...
            if (depth < 10) {
                $commentTemplate.addClass('offset-' + depth);
            }
            else {
                $commentTemplate.addClass('offset-10');
            }

            if (comments[i].modifiedDate != null && comments[i].deleteDate == null) {
                $commentTemplate.find('.edited-text').removeClass('d-none');
                $commentTemplate.find('.edited-text').attr('data-bs-title', 'в ' + moment(comments[i].modifiedDate).format('HH:mm DD.MM.YYYY'));
            }

            if (comments[i].subComments != 0) {
                $commentTemplate.find('.expand-btn').attr('onclick', 'loadComments("' + comments[i].id + '", null, "childrenFor_' + comments[i].id + '", ' + (depth + 1) + ', this)');
                $commentTemplate.find('.expand-btn').removeClass('d-none');
                $commentTemplate.find('.child-comments-container').attr('id', 'childrenFor_' + comments[i].id);
            }

            if (depth != 0 && i == 0) {
                $commentTemplate.find('.divider-up').removeClass('d-none');
            }
            if (i + 1 == comments.length) {
                $commentTemplate.find('.divider-down').remove();
            }

            $commentTemplate.find('.comment-author').text(comments[i].author);
            $commentTemplate.find('.comment-text').text(comments[i].content);
            $commentTemplate.find('.comment-time').text(moment(comments[i].createTime).format('DD.MM.YYYY HH:mm'));
            $commentTemplate.find('.btn-comment-send').attr('onclick', 'leaveComment("' + comments[i].id + '")');
            $commentTemplate.find('.btn-comment-edit').attr('onclick', 'editComment("' + comments[i].id + '")');
            $commentTemplate.attr('id', comments[i].id);
            $commentTemplate.find('.send-comment-text').attr('id', 'commentText_' + comments[i].id);
            $commentTemplate.find('.send-comment-error').attr('id', 'commentError_' + comments[i].id);
            $commentTemplate.find('.edit-comment-text').attr('id', 'editCommentText_' + comments[i].id);
            $commentTemplate.find('.edit-comment-text').attr('value', comments[i].content);
            $commentTemplate.find('.edit-comment-error').attr('id', 'editCommentError_' + comments[i].id);
            $commentTemplate.find('.btn-delete').attr('onclick', 'deleteComment("' + comments[i].id + '")');


            if (comments[i].deleteDate != null) {
                $commentTemplate.find('.comment-author').text('[Комментарий удален]');
                $commentTemplate.find('.comment-text').text('[Комментарий удален]');
            }

            if (depth != 0) {
                $commentTemplate.find('.expand-btn').remove();
            }

            if (!authorized || depth > 0) {
                $commentTemplate.find('.reply-btn').remove();
            }

            if (comments[i].authorId == userId) {
                $commentTemplate.find('.control-icons').removeClass('d-none');
            }

            $("#" + containerId).append($commentTemplate);
            $("#" + containerId).removeClass('d-none');

            tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
            tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
        });
    }
}

function leaveComment(parentId) {
    let commentTextLocal = document.getElementById('commentText');
    let commentErrorLocal = document.getElementById('commentError')

    if (parentId != null) {
        commentTextLocal = document.getElementById('commentText' + "_" + parentId);
        commentErrorLocal = document.getElementById('commentError' + "_" + parentId);
    }

    if (validateComment(commentTextLocal, commentErrorLocal) === false) {
        return;
    }

    let postData = {
        content: commentTextLocal.value,
        parentId: parentId
    }

    let apiUrl = 'https://blog.kreosoft.space/api/post/' + postId + '/comment/';

    $.ajax({
        url: apiUrl,
        type: 'POST',
        data: JSON.stringify(postData),
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        success: function(data) {
            location.reload();
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function editComment(commentId) {
    console.log(commentId);
    let commentTextLocal = document.getElementById('editCommentText' + "_" + commentId);
    let commentErrorLocal = document.getElementById('editCommentError' + "_" + commentId);

    if (validateComment(commentTextLocal, commentErrorLocal) === false) {
        return;
    }

    let postData = {
        content: commentTextLocal.value
    }

    let apiUrl = 'https://blog.kreosoft.space/api/comment/' + commentId;

    $.ajax({
        url: apiUrl,
        type: 'PUT',
        data: JSON.stringify(postData),
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        success: function(data) {
            location.reload();
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function showReplyForm(replyBtn) {
    closeAllForms()
    replyBtn.parentNode.parentNode.querySelector('.reply-form').classList.remove('d-none');
}

function showEditForm(editBtn) {
    closeAllForms()
    editBtn.parentNode.parentNode.parentNode.querySelector('.edit-form').classList.remove('d-none');
}

function closeAllForms() {
    let replyForms = document.querySelectorAll('.reply-form');
    for (let i = 0; i < replyForms.length; i++) {
        replyForms[i].classList.add('d-none');
    }

    let editForms = document.querySelectorAll('.edit-form');
    for (let i = 0; i < editForms.length; i++) {
        editForms[i].classList.add('d-none');
    }
}

function deleteComment(commentId) {
    let apiUrl = 'https://blog.kreosoft.space/api/comment/' + commentId;

    $.ajax({
        url: apiUrl,
        type: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        success: function(data) {
            location.reload();
        },
        error: function(error) {
            console.log(error);
        }
    });
}
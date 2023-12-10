let tooltipTriggerList = null
let tooltipList = null

loadPost()

function sendAuthorizeCheck() {
    authorizeNavbar(false);
}

function authorizeInnerPage() {

}

function loadComments(parentCommentId, comments, containerId, depth, showBtn) {
    if (parentCommentId == null) {
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
    console.log(comments);
    for (let i = 0; i < comments.length; i++) {
        $.get("/templates/comment.html", null, function (data) {
            let $commentTemplate = $(data).clone();

            //я думал, что на вложенные комментарии можно отвечать и написал это...
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
            $commentTemplate.find('.comment-time').text(moment(comments[i].createDate).format('DD.MM.YYYY HH:mm'));

            if (comments[i].deleteDate != null) {
                $commentTemplate.find('.comment-author').text('[Комментарий удален]');
                $commentTemplate.find('.comment-text').text('[Комментарий удален]');
            }

            if (depth != 0) {
                $commentTemplate.find('.expand-btn').remove();
            }

            $("#" + containerId).append($commentTemplate);
            $("#" + containerId).removeClass('d-none');

            tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
            tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
        });
    }
}
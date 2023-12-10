loadTags('tagFilter');
loadPosts();

function sendAuthorizeCheck() {
    authorizeNavbar(false);
}

function authorizeInnerPage() {
    if (authorized == true) {
        document.getElementById('newPostBtn').classList.remove('disabled');
    }
}
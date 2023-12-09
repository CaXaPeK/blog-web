loadTags();
loadPosts();

function sendAuthorizeCheck() {
    authorizeNavbar(false);
}

function authorizeInnerPage() {
    document.getElementById('newPostBtn').classList.remove('disabled');
}
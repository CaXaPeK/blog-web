let communitiesLoaded = false;

loadCommunities();


function sendAuthorizeCheck() {
    authorizeNavbar(false);
}
function authorizeInnerPage() {

}

function appendCommunity(community) {
    $.get("/templates/communitySmall.html", null, function(data){
        let $communityTemplate = $(data).clone();

        $communityTemplate.attr('id', "community-" + community.id);
        $communityTemplate.find('.card-title').text(community.name);
        $communityTemplate.find('.card-title').attr('id', community.id);
        $communityTemplate.find('.btn-primary').attr('id', community.id);
        $communityTemplate.find('.btn-danger').attr('id', community.id);

        $("#communitiesContainer").append($communityTemplate);

        checkUserRole(community.id, "community-");
    })
}

function loadCommunities() {
    let apiUrl = 'https://blog.kreosoft.space/api/community';

    $.ajax({
        url: apiUrl,
        dataType: 'json',
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        success: function(data) {
            for (let i = 0; i < data.length; i++) {
                appendCommunity(data[i]);
            }
        },
        error: function(error) {}
    });
}

function openCommunity(btn) {
    window.location.href = "/communities/" + btn.id;
}
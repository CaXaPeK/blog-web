let maxAddressDepth = 1;

let postTitle = document.getElementById('postTitle');
let postText = document.getElementById('postText');
let postReadTime = document.getElementById('postReadTime');
let postImage = document.getElementById('postImage');
let postTags = document.getElementById('postTags');
let postCommunity = document.getElementById('postCommunity');

let titleError = document.getElementById('titleError');
let textError = document.getElementById('textError');
let readTimeError = document.getElementById('readTimeError');
let imageError = document.getElementById('imageError');
let tagsError = document.getElementById('tagsError');

loadTags('postTags');
loadMyCommunities();
loadAddresses(null, 1);

function sendAuthorizeCheck() {
    authorizeNavbar(true);
}

function authorizeInnerPage() {

}

function loadMyCommunities() {
    let apiUrl = 'https://blog.kreosoft.space/api/community/my';
    let communitySelect = document.getElementById('postCommunity');

    let autoSelect = null;
    let params = new URLSearchParams(window.location.search);
    if (params.has('communityId')) {
        autoSelect = params.get('communityId');
    }

    $.ajax({
        url: apiUrl,
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        success: function(data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].role == 'Administrator') {
                    loadAndAppendCommunity(data[i].communityId, autoSelect);
                }
            }
        },
        error: function(error) {}
    });
}

function loadAndAppendCommunity(id, autoSelect) {
    let apiUrl = 'https://blog.kreosoft.space/api/community/' + id;
    let communitySelect = document.getElementById('postCommunity');

    $.ajax({
        url: apiUrl,
        type: 'GET',
        contentType: 'application/json',
        success: function(data) {
            let option = new Option(data.name, id);
            communitySelect.add(option);
            if (id === autoSelect) {
                communitySelect.selectedIndex = communitySelect.options.length - 1;
            }
        },
        error: function(error) {}
    });
}

function loadAddresses(parentSelect, depth) {
    let apiUrl = 'https://blog.kreosoft.space/api/address/search';
    let guid = "";
    if (parentSelect != null) {
        guid = parentSelect.value.split(' ')[0];
    }

    if (depth != 1) {
        apiUrl += "?parentObjectId=" + guid;
    }

    if (parentSelect != null) {
        if (parentSelect.value == 'none') {
            let i = depth;
            while (document.getElementById('postAddress' + i + 'container') != null) {
                document.getElementById('postAddress' + i + 'container').remove();
                i++
            }
            maxAddressDepth = depth - 2;
            return;
        }
    }

    if (parentSelect != null) {
        let i = depth;
        while (document.getElementById('postAddress' + i + 'container') != null) {
            document.getElementById('postAddress' + i + 'container').remove();
            i++
        }
    }

    $.ajax({
        url: apiUrl,
        type: 'GET',
        contentType: 'application/json',
        success: function(data) {
            if (data.length != 0) {
                appendAddressSelect(data, depth);
            }
            maxAddressDepth = depth - 1;
        },
        error: function(error) {}
    });
}

function appendAddressSelect(addresses, depth) {
    $.get("/templates/addressSelect.html", null, function(data) {
        let $selectTemplate = $(data).clone();

        $selectTemplate.attr('id', "postAddress" + depth + 'container')
        $selectTemplate.find('.form-label').prop('for', "postAddress" + depth);
        $selectTemplate.find('.form-select').prop('id', "postAddress" + depth);
        $selectTemplate.find('.form-select').attr('onchange', 'changeTitle(this); loadAddresses(this, ' + (depth + 1) + ');');

        if (depth != 1) {
            $selectTemplate.find('.form-label').text("Следующий элемент адреса");
        }

        for (let i = 0; i < addresses.length; i++) {
            let option = $('<option>', {
                value: addresses[i].objectId + ' ' + addresses[i].objectGuid,
                text: addresses[i].text,
                id: addresses[i].objectLevelText
            });
            $selectTemplate.find('.form-select').append(option);
        }

        $("#addressSelects").append($selectTemplate);
    });
}

function changeTitle(addressSelect) {
    let addressTypeLabel = addressSelect.parentNode.querySelector('.form-label');

    if (addressSelect.value == 'none') {
        if (addressSelect.id != "postAddress1") {
            addressTypeLabel.textContent = 'Следующий элемент адреса';
            return;
        }
        return;
    }

    for (let i = 0; i < addressSelect.options.length; i++) {
        if (addressSelect.options[i].value == addressSelect.value) {
            addressTypeLabel.textContent = addressSelect.options[i].id;
        }
    }
}

function createPost() {
    if (validateTitle(postTitle, titleError) === false) {
        return;
    }

    if (validateReadTime(postReadTime, readTimeError) === false) {
        return;
    }

    if (validateTags(postTags, tagsError) === false) {
        return;
    }

    if (validateImage(postImage, imageError) === false) {
        return;
    }

    if (validateText(postText, textError) === false) {
        return;
    }

    let image = postImage.value == "" ? null : postImage.value;

    let lastAddress = maxAddressDepth == 0 ? null : document.getElementById('postAddress' + maxAddressDepth).value.split[1];

    let tags = [];

    for (let i = 0; i < postTags.selectedOptions.length; i++) {
        tags.push(postTags.selectedOptions[i].value);
    }

    let postData = {
        title: postTitle.value,
        description: postText.value,
        readingTime: postReadTime.value,
        image: image,
        addressId: lastAddress,
        tags: tags
    }

    let apiUrl = 'https://blog.kreosoft.space/api/post';

    if (postCommunity.value != 'noCommunity') {
        apiUrl = 'https://blog.kreosoft.space/api/community/' + postCommunity.value + '/post';
    }

    $.ajax({
        url: apiUrl,
        type: 'POST',
        data: JSON.stringify(postData),
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        success: function(data) {
            window.location.href = '/';

            if (postCommunity.value != 'noCommunity') {
                window.location.href = '/communities/' + postCommunity.value;
            }
        },
        error: function(error) {}
    });
}
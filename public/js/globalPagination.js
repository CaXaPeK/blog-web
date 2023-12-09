function reloadWithNewPageSize(pageSizeInput) {
    let params = new URLSearchParams(window.location.search);
    params.set('size', pageSizeInput.value);
    params.delete('page');

    window.location.search = params;
}

function showPage(pageBtn) {
    let params = new URLSearchParams(window.location.search);
    params.set('page', pageBtn.textContent);

    window.location.search = params;
}

function nextPage() {
    let params = new URLSearchParams(window.location.search);

    if (!params.has('page')) {
        params.set('page', '2');
        window.location.search = params;
    }
    else {
        let curPage = params.get('page');
        params.set('page', curPage + 1);
        window.location.search = params;
    }
}

function prevPage() {
    let params = new URLSearchParams(window.location.search);

    if (!params.has('page')) {
        window.location.search = params;
    }
    else {
        let curPage = params.get('page');
        if (curPage == 1) {
            window.location.search = params;
        }
        params.set('page', curPage - 1);
        window.location.search = params;
    }
}

function firstPage() {
    let params = new URLSearchParams(window.location.search);
    params.delete('page');
    window.location.search = params;
}

function lastPage(lastPageBtn) {
    let params = new URLSearchParams(window.location.search);
    params.set('page', lastPageBtn.parentNode.id);
    window.location.search = params;
}

function loadPagination(count, curPage, pageSize) {
    $.get("/templates/pagination.html", null, function(data){
        let $pagination = $(data).clone();

        let $firstPage = $pagination.find('#firstPage');
        let $prevPage = $pagination.find('#prevPage');
        let $page1 = $pagination.find('#page1');
        let $page2 = $pagination.find('#page2');
        let $page3 = $pagination.find('#page3');
        let $nextPage = $pagination.find('#nextPage');
        let $lastPage = $pagination.find('#lastPage');
        let $pageSize = $pagination.find('#pageSize');

        $lastPage.parent().attr('id', count);
        $pageSize.attr('value', pageSize);

        if (count == 0) {
            $page1.text(1);
            $page2.text(2);
            $page3.text(3);

            $page1.parent().addClass('disabled');
            $page2.parent().addClass('disabled');
            $page3.parent().addClass('disabled');
            $firstPage.parent().addClass('disabled');
            $prevPage.parent().addClass('disabled');
            $nextPage.parent().addClass('disabled');
            $lastPage.parent().addClass('disabled');
        }
        if (count == 1) {
            $page1.text(1);
            $page2.text(2);
            $page3.text(3);

            $page1.parent().addClass('active');
            $page2.parent().addClass('disabled');
            $page3.parent().addClass('disabled');
            $firstPage.parent().addClass('disabled');
            $prevPage.parent().addClass('disabled');
            $nextPage.parent().addClass('disabled');
            $lastPage.parent().addClass('disabled');
        }
        else if (count == 2) {
            $page1.text(1);
            $page2.text(2);
            $page3.text(3);

            $page3.parent().addClass('disabled');
            if (curPage == 1) {
                $page1.parent().addClass('active');
                $firstPage.parent().addClass('disabled');
                $prevPage.parent().addClass('disabled');
            }
            else {
                $page2.parent().addClass('active');
                $nextPage.parent().addClass('disabled');
                $lastPage.parent().addClass('disabled');
            }
        }
        else if (curPage == 1) {
            $page1.text(1);
            $page2.text(2);
            $page3.text(3);

            $page1.parent().addClass('active');
            $firstPage.parent().addClass('disabled');
            $prevPage.parent().addClass('disabled');
        }
        else if (curPage == count && curPage > 2) {
            $page1.text(curPage - 2);
            $page2.text(curPage - 1);
            $page3.text(curPage);

            $page3.parent().addClass('active');
            $nextPage.parent().addClass('disabled');
            $lastPage.parent().addClass('disabled');
        }
        else if (count > 2) {
            $page1.text(curPage - 1);
            $page2.text(curPage);
            $page3.text(curPage + 1);

            $page2.parent().addClass('active');
        }

        $("#paginationSet").append($pagination);
    })
}
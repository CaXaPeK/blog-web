openInsideNavbar("../html/login.html", "../js/login.js");

function openInsideNavbar(htmlPath, jsPath) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            removePreviousScripts();
            document.getElementById('contentContainer').innerHTML = xhr.responseText;
            loadScript();
        }
    };

    xhr.open('GET', htmlPath, true);
    xhr.send();
    console.log("page loaded");

    function loadScript() {
        var script = document.createElement('script');
        script.src = jsPath;
        document.body.appendChild(script);
        console.log("script loaded");
    }
    console.log("function end");

    function removePreviousScripts() {
        var scripts = document.body.querySelectorAll('script');

        scripts.forEach(function(script) {
            script.parentNode.removeChild(script);
        });
    }
}

document.getElementById('loginLink').addEventListener('click',   function(event) {
    openInsideNavbar("../html/login.html", "../js/login.js");
});
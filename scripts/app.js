// Instantiate Foundation
$(document).foundation();

var BASE_URL = "https://ajinkya-91.github.io/reference-notes/";

function titleCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(function (word) {
            return word[0].toUpperCase() + word.substr(1);
        })
        .join(' ');
}

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null)
        return false;
    else
        return results[1] || 0;
}

var topic = $.urlParam('topic');

if (topic != false) {

    function loadContent(url) {
        var ajaxUrl = BASE_URL + "templates/" + url + ".html";
        var title = topic.replace("/", " - ");
        title = titleCase(title);
        $(document).attr("title", title);
        $('.content > .content-title').html(title);

        $.ajax({
            type: 'GET',
            url: ajaxUrl,
            dataType: 'html',
            success: function (data) {
                $('.content > .content-body').html(data);
            }
        });
    }
    loadContent(topic);
}

function getData(x) {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    var url = $(x).data('url');
    var title = $(x).data('title');
    history.pushState(title, 'Title', "/reference-notes/?topic=" + url);
    url = BASE_URL + "templates/" + url + ".html";
    getDataContent(url);
    $(document).attr("title", title);
    $('.content > .content-title').html(title);
}

function getDataContent(url) {
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'html',
        beforeSend: function () {
            $('#loader').show();
        },
        complete: function () {
            $('#loader').hide();
        },
        success: function (data) {
            $('.content > .content-body').html(data);
        }
    });
}
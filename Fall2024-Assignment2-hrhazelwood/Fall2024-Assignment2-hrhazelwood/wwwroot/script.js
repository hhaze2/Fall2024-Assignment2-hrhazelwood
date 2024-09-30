
$("#searchButton").click(function () {
    apiSearch();
    $("#searchResults").css("visibility", "visible");
});

function apiSearch() {
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };
    
        $.ajax({
            url: 'https://api.bing.microsoft.com//v7.0/search?' + $.param(params),
            type: 'GET',
            headers: {
                'Ocp-Apim-Subscription-Key': '21fc37cef42d4e56b7bf0020a6072bba'
            }
            
        })
            .done(function (data) {
                var len = data.webPages.value.length;
                var results = '';
                for (i = 0; i < len; i++) {
                    results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
                }

                $('#searchResults').html(results);
                $('#searchResults').dialog();
            })
            .fail(function () {
                alert('error');
            });
    
}



$("#searchButton").click(function () {
    apiSearch();
    $("#searchResults").css("visibility", "visible");
});

function apiSearch(isLucky) {
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
            // data: {
            //     format: 'json'
            // },
            // dataType: 'jsonp'
            
        })
            .done(function (data) {
                var len = data.webPages.value.length;
                var results = '';
                for (i = 0; i < len; i++) {
                //for (var i = 0; i < data[1].length; i++) {
                    results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
                    //results += "<a href='" + data[3][i] + "' target='_blank'>" + data[1][i] + "</a><br>" + data[2][i] + "<br><br>";
                }
            
                if (isLucky){
                    window.open(data.webPages.value[0].url, '_blank');
                    
                }
                $('#searchResults').html(results);
                $("html").css("background-size", "cover");

                //$('#searchResults').dialog();
            })
            .fail(function () {
                alert('error');
            });
    
}
var textShowing = true;

$("#title").click(function () {
    if (textShowing) {
        $("html").css("background-image", "url(https://images.unsplash.com/photo-1463043254199-7a3efd782ad1?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)")
        textShowing = false;
    } else {
        $("html").css("background-image", "url(https://images.unsplash.com/photo-1526781100743-007e0dc2b474?q=80&w=2836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)")
        textShowing = true;
    }
});

$("#currentTime").click(function () {
    getTime();
    $("#time").css("visibility", "visible");
});

function getTime() {
    var date = new Date();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    // hour = date.toLocaleTimeString();
    // minutes = minutes.toString();
    
    if (minutes < 10){
        minutes = minutes.toString();
        minutes = "0" + minutes;
    }

    if (hour < 10){
        hour = hour.toString();
        hour = "0" + hour;
    } 
    var results = hour + ":" + minutes;
    // var results = date.toLocaleTimeString();
    // results = results.substring(0, 5);
    // var results = date.toTimeString();
    // results = results.substring(0, 5);
    
    

    $('#time').html(results);
    $('#time').dialog({
        title: "Current Time!"
    });
}
var lucky = false;
$("#luckyButton").click(function () {
    lucky = true;
    apiSearch(lucky);
    lucky = false;
});




//calls the API Search on the click of the searchButton, uses jquery to set the visibility property of searchResults to visible
$("#searchButton").click(function () {
    apiSearch();
    $("#searchResults").css("visibility", "visible");
});

//apiSearch takes an isLucky parameter to indicate if the "Im feeling lucky" button has been pressed
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
            
        })
            .done(function (data) {
                var len = data.webPages.value.length;
                var results = '';
                for (i = 0; i < len; i++) {
                    results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
                    
                }
                
                //if the lucky button has been pressed, open the first result, either way update the serachResults div
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
//set a variable pic1Showing to true to indicate that the first background image is showing 
var pic1Showing = true;

//function to toggle the background image on the click of the search engine title
$("#title").click(function () {
    if (pic1Showing) {
        $("html").css("background-image", "url(https://images.unsplash.com/photo-1463043254199-7a3efd782ad1?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)")
        pic1Showing = false;
    } else {
        $("html").css("background-image", "url(https://images.unsplash.com/photo-1557342515-ee7b94524aae?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)")
        pic1Showing = true;
    }
});

//calls the getTime() function on the click of the currentTime button, then sets the visibility of the time div to visible
$("#currentTime").click(function () {
    getTime();
    $("#time").css("visibility", "visible");
});

//function to display the current time in a jquery UI dialog box
function getTime() {
    var date = new Date();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    
    //adding formatting to ensure time is in HH:MM format. If the minute or hour is 1 digit, add a leading 0
    if (minutes < 10){
        minutes = minutes.toString();
        minutes = "0" + minutes;
    }

    if (hour < 10){
        hour = hour.toString();
        hour = "0" + hour;
    } 
    var results = hour + ":" + minutes;
    
    //display the time in the time div and in the dialog box
    $('#time').html(results);
    $('#time').dialog({
        title: "Current Time!"
    });
}
//add a variable to keep track of the pressing of the lucky button. the function will set lucky to true then pass it to the apiSearch function
//sets lucky to false after the function call
var lucky = false;
$("#luckyButton").click(function () {
    lucky = true;
    apiSearch(lucky);
    lucky = false;
    
});

//sets the three buttons to have the jquery UI button theming
$("#searchButton, #luckyButton, #currentTime").button();


$(document).ready(function(){
    var pageCounter = 1;
    // AJAX GET DEMO
    $("#butt").click(function(event){
        event.preventDefault();
        var ourRequest = new XMLHttpRequest();
        ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');
        ourRequest.onload = function(){
            if(ourRequest.status >= 200 && ourRequest.status < 400){
                var ourData = JSON.parse(ourRequest.responseText);
                renderHTML(ourData);
            }else{
                console.error('Connected to server but returned an error!');
            }
        };
        ourRequest.onerror = function(){
            console.error('Connection error!');
        };
        ourRequest.send();
        pageCounter++;
        if(pageCounter > 3){
            pageCounter = 1;
        }
    });

    // JQUERY-AJAX GET DEMO
    $("#butt2").click(function(event){
        $.ajax({
            type: 'GET',
            url:  'https://learnwebcode.github.io/json-example/animals-1.json',
            success: renderHTML,
            error: function(){
                console.error('Connection error');
            }
        });
    });

    var myData = 
    [
        {
          "name": "Meowsy",
          "species" : "cat",
          "foods": {
            "likes": ["tuna", "catnip"],
            "dislikes": ["ham", "zucchini"]
          }
        },
        {
          "name": "Barky",
          "species" : "dog",
          "foods": {
            "likes": ["bones", "carrots"],
            "dislikes": ["tuna"]
          }
        },
        {
          "name": "Purrpaws",
          "species" : "cat",
          "foods": {
            "likes": ["mice"],
            "dislikes": ["cookies"]
          }
        }
    ];

    var jsonString = JSON.stringify(myData);
    // JQUERY-AJAX POST DEMO
    $("#butt").click(function(event){
        $.ajax({
            type: "POST",
            url: "/orders",
            data: jsonString,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(recvData){
                console.log(recvData);
            },
            failure: function(errMsg) {
                alert(errMsg);
            }
        });    
    });
    
    function renderHTML(data){
        var htmlString = "";
        for(var i=0; i<data.length; i++){
            htmlString += '<p>' + data[i].name + ' is a ' + data[i].species + ' that likes to eat ';
            for(var j=0; j<data[i].foods.likes.length; j++){
                htmlString += data[i].foods.likes[j];
                if(j != data[i].foods.likes.length-1){
                    htmlString += ", ";
                }
            }
            htmlString += '.</p>';
        }
        $("#animal-info").html($("#animal-info").html() + htmlString);
    }
});

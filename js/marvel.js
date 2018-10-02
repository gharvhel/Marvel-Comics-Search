let base_url = "http://gateway.marvel.com/v1/public/";
let public_key = "1164d84497076141e3cf3df472da6874";
let hash_code = "91fbf21ae4b4a9145d513e8edf7f448b";
let limit = 3;
let action = ["comics", "characters"];
let parameters = {"format":"", "formatType":"", "noVariants":"", "dateDescriptor":"", "dateRange":"", "title":"", "titleStartsWith":"", "startYear":"", "issueNumber":"", "diamondCode":"", "digitalId":"", "upc":"", "isbn":"", "ean":"", "issn":"", "hasDigitalIssue":"", "modifiedSince":"", "creators":"", "characters":"", "series":"", "events":"", "stories":"", "sharedAppearances":"", "collaborators":"", "orderBy":"", "limit":"", "offset":""};

parameters[ts] = 1;
parameters[limit] = 3;

let url = "http://gateway.marvel.com/v1/public/comics?limit=10&ts=1&apikey=1164d84497076141e3cf3df472da6874&hash=91fbf21ae4b4a9145d513e8edf7f448b";
let message = document.getElementById("message");
let results_div = document.getElementById("results_div");
function searchFunction() {
    $.ajax({
        url: create_url(0,),
        type: "GET",
        beforeSend: function() {
            message.innerHTML = "Loading...";
        },
        complete: function() {
            message.innerHTML = "Search Result";
        },
        success: function(data) {
            let results = data.data.results;
            let html_result = "";
            for(let i = 0; i < results.length; i++) {
                let result = results[i];
                let comic_title = result.title;
                
                html_result += "<h4>" + comic_title + "</h4>" + "<br></br>";
  
            }
            results_div.innerHTML = html_result;
        },
        error: function() {
            message.innerHTML = "Oops! Refresh Page, error loading the page..."
        }
    });
};

function create_url(action_num, param) {
    ret_url = "";
    ret_url += base_url;
    ret_url += action[action_num] + "?";
    for(var key in param) {
        var value = param[key];
        if (value != "") {
            ret_url += key + "=" + value + "&";
        }     
    }
    ret_url += "apikey=" + public_key + "&hash=" + hash_code;
      
    return ret_url;
};
     

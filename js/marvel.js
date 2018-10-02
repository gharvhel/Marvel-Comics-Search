
let base_url = "http://gateway.marvel.com/v1/public/";
let public_key = "1164d84497076141e3cf3df472da6874";
let hash_code = "91fbf21ae4b4a9145d513e8edf7f448b";
let parameters = {"format":"", "formatType":"", "noVariants":"", "dateDescriptor":"", "dateRange":"", "title":"", "titleStartsWith":"", "startYear":"", "issueNumber":"", "diamondCode":"", "digitalId":"", "upc":"", "isbn":"", "ean":"", "issn":"", "hasDigitalIssue":"", "modifiedSince":"", "creators":"", "characters":"", "series":"", "events":"", "stories":"", "sharedAppearances":"", "collaborators":"", "orderBy":"", "limit":"", "offset":""};

parameters["ts"] = 1;
parameters["limit"] = 6;

let message = document.getElementById("message");
let results_div = document.getElementById("results_div");
let search_input = document.getElementById("search_value");

function searchFunction() {
    parameters["titleStartsWith"] = search_input.value;
    $.ajax({
        url: create_url(0,parameters),
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
            html_result += '<div class="row align-text-bottom">';
            for(let i = 0; i < results.length; i++) {
                let result = results[i];
                let comic_title = result.title;
                let result_images = result.images;

                if((i + 1)%1 == 0){
                    html_result += "</div>";
                    html_result += '<div class = "row align-text-bottom"><br><br>';
                }

                html_result += '<div class="col-sm-4">'; 
                html_result += '<h3 style="font-family:SuperHero;">' + comic_title + "</h3>";
                
                // No images found
                if (result_images.length == 0) {
                    html_result += create_image("img/no_image", "", "png", 1);
                } 
                // Image found
                else {
                    let image = result_images[0];
                    html_result += create_image(image["path"], "portrait_uncanny", image["extension"]);
                }

                html_result += '</div> <h4><b><u>Characters:</u></b></h4>';
  
            }
            html_result += '</div>';
            results_div.innerHTML = html_result;
        },
        error: function() {
            message.innerHTML = "Oops! Refresh Page, error loading the page..."
        }
    });
};

function create_url(action_num, param) {
    let action = ["comics", "characters"];
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
    
    console.log(ret_url)
    return ret_url;
};

function create_image(path, size, ext, option = 0){
    ret_str = '<img src="';

    if (option == 0) {
        image_path = path + '/' + size + '.' + ext;
    }else {
        image_path = path + size + '.' + ext;
    }
    
    ret_str += image_path + '">';
    return ret_str;
}

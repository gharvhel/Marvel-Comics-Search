
let base_url = "http://gateway.marvel.com/v1/public/";
let public_key = "1164d84497076141e3cf3df472da6874";
let hash_code = "91fbf21ae4b4a9145d513e8edf7f448b";
let parameters = { "format": "", "formatType": "", "noVariants": "", "dateDescriptor": "", "dateRange": "", "title": "", "titleStartsWith": "", "startYear": "", "issueNumber": "", "diamondCode": "", "digitalId": "", "upc": "", "isbn": "", "ean": "", "issn": "", "hasDigitalIssue": "", "modifiedSince": "", "creators": "", "characters": "", "series": "", "events": "", "stories": "", "sharedAppearances": "", "collaborators": "", "orderBy": "", "limit": "", "offset": "" };
let ids = [];
let offset = 0;
let data_total = 0;
parameters["ts"] = 1;
parameters["limit"] = 10;


let message = document.getElementById("message");
let results_div = document.getElementById("results_div");
let search_input = document.getElementById("search_value");
let load_div = document.getElementById("load_more");

function searchFunction(reload = true) {
    if (search_input.value == "") {
        search_input.value = " ";
    } else {
        parameters["titleStartsWith"] = search_input.value;
    }
    parameters["offset"] = offset;
    console.log("SEARCHING:" + search_input.value);
    $.ajax({
        url: create_url(0, parameters),
        type: "GET",
        beforeSend: function () {

            message.innerHTML = '<p style="color:purple;">Loading Comics...</p>';
            if (reload == false)
                load_div.innerHTML = '<button type="button" class="btn btn-info btn-lg btn-block">Loading Comics...</button>';
        },
        complete: function (data) {
            message.innerHTML = "Search Result(s)";
            if (data.status == 429)
                load_div.innerHTML = '<button type="button" class="btn btn-warning btn-lg btn-block">Please Wait 24 hours before searching again...</button>'
        },
        success: function (data) {
            let results = data.data.results;
            data_total = data.data.total;
            let html_result = "";
            html_result += '<div class="row align-text-bottom">';
            for (let i = 0; i < results.length; i++) {
                let result = results[i];
                let comic_title = result.title;
                let result_images = result.images;
                let id = result.id;
                let num_characters = result.characters.available;
                ids.push(id);

                if ((i + 1) % 1 == 0) {
                    html_result += "</div>";
                    html_result += '<div class = "row align-text-bottom"><hr class="incline-line">';
                }

                html_result += '<div class="col-sm-4">';
                html_result += '<h3 style="font-family:SuperHero;">' + '<div style="color:purple;">[ ' + (i + 1 + offset) + '/' + data_total + '] <u>Title</u></div>' + comic_title + "</h3>";

                // No images found
                if (result_images.length == 0) {
                    html_result += create_image("img/no_image", "", "png", 1);
                }
                // Image found
                else {
                    let image = result_images[0];
                    html_result += create_image(image["path"], "portrait_uncanny", image["extension"]);
                }

                html_result += '</div><h4 style="color:purple;"><b><u>Characters:</u></b></h4> <div id="' + id + '"></div>';

                // No characters found
                if (num_characters == 0) {
                    html_result += "<h5>No Characters Available</h5><div>";
                    html_result += create_image("img/no_portrait", "", "jpg", 1);
                }

            }
            html_result += '</div>';
            if (reload)
                results_div.innerHTML = html_result;
            else
                results_div.innerHTML += html_result;

            // Load characters
            for (var y = 0; y < ids.length; y++) {
                id = ids[y];
                let character_div = document.getElementById(id);
                $.ajax({
                    url: "http://gateway.marvel.com/v1/public/comics/" + id + "/characters?ts=1&apikey=1164d84497076141e3cf3df472da6874&hash=91fbf21ae4b4a9145d513e8edf7f448b",
                    type: "GET",
                    beforeSend: function () {
                        message.innerHTML = '<p style="color:purple;">Loading Characters...</p>';
                        if (reload == false)
                            load_div.innerHTML = '<button type="button" class="btn btn-info btn-lg btn-block">Loading Characters...</button>';
                    },
                    complete: function () {
                        message.innerHTML = "Search Result(s)";
                    },
                    success: function (data) {
                        let characters = data.data.results;

                        // Only for Characters found
                        for (var i = 0; i < characters.length; i++) {
                            html_str = "";
                            character = characters[i];
                            character_name = character.name;
                            image = character.thumbnail;
                            description = character.description;
                            html_str += "<h5>" + character_name + "</h5>";
                            html_str += "<div>" + create_image(image["path"], "portrait_medium", image["extension"]);
                            html_str += "<h6>Description</h6><p>" + description + "</p></div>";
                            if (reload)
                                character_div.innerHTML = html_str;
                            else
                                character_div.innerHTML += html_str;
                        }

                        if (data_total == 0) {
                            load_div.innerHTML = '<button type="button" class="btn btn-info btn-lg btn-block">No Search Results...</button>';
                        } else {
                            load_div.innerHTML = '<button type="button" class="btn btn-success btn-lg btn-block" onclick="loadFunction()">Load More</button>';
                        }

                    },
                    error: function () {
                        message.innerHTML = "Oops! Refresh Page, error loading the page..."
                    }
                });
            }
        },
        error: function () {
            message.innerHTML = "Oops! Refresh Page, error loading the page..."
        }
    });
};

function loadFunction() {
    offset += 10;
    id = []
    searchFunction(false);
}

function create_url(action_num, param) {
    let action = ["comics", "characters"];
    ret_url = "";
    ret_url += base_url;
    ret_url += action[action_num] + "?";
    for (var key in param) {
        var value = param[key];
        if (value != "") {
            ret_url += key + "=" + value + "&";
        }
    }
    ret_url += "apikey=" + public_key + "&hash=" + hash_code;

    return ret_url;
};

function create_image(path, size, ext, option = 0) {
    ret_str = '<img src="';

    if (option == 0) {
        image_path = path + '/' + size + '.' + ext;
    } else {
        image_path = path + size + '.' + ext;
    }

    ret_str += image_path + '">';
    return ret_str;
}

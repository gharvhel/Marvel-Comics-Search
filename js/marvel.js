
let base_url = "http://gateway.marvel.com/v1/public/";
let public_key = "1164d84497076141e3cf3df472da6874";
let hash_code = "91fbf21ae4b4a9145d513e8edf7f448b";
// let hash_code = "3be4e3a37f36e19fa462030f2bab613a";
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
    if (reload) {
        results_div.innerHTML = "";
        parameters = { "format": "", "formatType": "", "noVariants": "", "dateDescriptor": "", "dateRange": "", "title": "", "titleStartsWith": "", "startYear": "", "issueNumber": "", "diamondCode": "", "digitalId": "", "upc": "", "isbn": "", "ean": "", "issn": "", "hasDigitalIssue": "", "modifiedSince": "", "creators": "", "characters": "", "series": "", "events": "", "stories": "", "sharedAppearances": "", "collaborators": "", "orderBy": "", "limit": "", "offset": "" };
        ids = [];
        offset = 0;
        data_total = 0;
        parameters["ts"] = 1;
        parameters["limit"] = 10;
        message = document.getElementById("message");
        results_div = document.getElementById("results_div");
        search_input = document.getElementById("search_value");
        let search_input_value = process_str(search_input.value);
        load_div = document.getElementById("load_more");

        let e = document.getElementById("format");
        let frmt = e.options[e.selectedIndex].value;
        parameters["format"] = frmt;

        parameters["startYear"] = document.getElementById("start_year").value;
        console.log(document.getElementById("start_year").value);
        e = document.getElementById("order_by");
        ordrby = e.options[e.selectedIndex].value;
        parameters["orderBy"] = ordrby;

        if (document.getElementById("sort2").checked) {
            parameters["orderBy"] = '-' + ordrby;
        }

        if (document.getElementById("order1").checked) {
            parameters["title"] = search_input_value;
        }
        else if (document.getElementById("order2").checked) {
            parameters["titleStartsWith"] = search_input_value;
        }


    }
    parameters["offset"] = offset;

    $.ajax({
        url: create_url(0, parameters),
        type: "GET",
        beforeSend: function () {
            for (var y = 0; y < ids.length; y++) {
                id = ids[y];
                let character_div = document.getElementById(id);
                character_div.innerHTML = "LOADING...";
            }
            message.innerHTML = '<p style="color:purple;">Loading Comics...</p>';
            if (reload == false)
                load_div.innerHTML = '<button type="button" class="btn btn-info btn-lg btn-block">Loading Comics...</button>';
        },
        complete: function (data) {
            message.innerHTML = "Search Result(s)";
            if (data.status == 429) {
                load_div.innerHTML = '<button type="button" class="btn btn-danger btn-lg btn-block">Please Wait 24 hours before searching again...</button>';
                message.innerHTML = "Please Wait 24 hours before searching again...";
            }
                
        },
        success: function (data) {
            let results = data.data.results;
            data_total = data.data.total;
            let html_result = '';
            if (data_total == 0) {
                html_result += '<h4 id="message" style="font-family:SuperHero;"> Showing ' + (offset) + ' through ' + (offset+10) + ' out of ' + data_total + '</h4>';
            } else {
                if (offset + 10 < data_total) {
                    html_result += '<h4 id="message" style="font-family:SuperHero;"> Showing ' + (offset+1) + ' through ' + (offset+10) + ' out of ' + data_total + '</h4>';
                } else {
                    html_result += '<h4 id="message" style="font-family:SuperHero;"> Showing ' + (offset+1) + ' through ' + data_total + ' out of ' + data_total + '</h4>';
                }
            }
            
            html_result += '<div class="alert alert-info">Hover over cards below for information about first comic character.</div>';
            for (let i = 0; i < results.length; i++) {
                let result = results[i];
                let comic_title = result.title;
                let result_images = result.images;
                let id = result.id;
                let num_characters = result.characters.available;
                ids.push(id);

                html_result += '<div class="flip-card" style="float:left;">';
                html_result +=    '<div class="flip-card-inner">';
                html_result +=        '<div class="flip-card-front">';
                html_result +=            '<h3 style="font-family:SuperHero">';
                html_result +=             '<p style="color:purple"><u>Result </u>' + (i + 1 + offset) + '</p>' + comic_title + "</h3>";
                
                // No images found
                if (result_images.length == 0) {
                    html_result += create_image("img/no_image", "", "png", 1);
                }
                // Image found
                else {
                    let image = result_images[0];
                    html_result += create_image(image["path"], "portrait_uncanny", image["extension"]);
                }
                html_result += '</div>';
                
                html_result += '<div id="' + id + '" class="flip-card-back"></div>';
                
                html_result += '</div>'; 
                html_result += '</div>'; 
  

            }

            html_result += '<hr class="incline-line"></hr>';
            if (data_total == 0) {
                html_result += '<h4 id="message" style="font-family:SuperHero;"> Showing ' + (offset) + ' through ' + (offset+10) + ' out of ' + data_total + '</h4>';
            } else {
                if (offset + 10 < data_total) {
                    html_result += '<h4 id="message" style="font-family:SuperHero;"> Showed ' + (offset+1) + ' through ' + (offset+10) + ' out of ' + data_total + '</h4>';
                } else {
                    html_result += '<h4 id="message" style="font-family:SuperHero;"> Showed ' + (offset+1) + ' through ' + data_total + ' out of ' + data_total + '</h4>';
                }
            }
            
            html_result += '<hr class="incline-line"></hr>';

            if (reload)
                results_div.innerHTML = html_result;
            else
                results_div.innerHTML += html_result;

            // Load characters
            for (var y = 0; y < ids.length; y++) {
                id = ids[y];
                let character_div = document.getElementById(id);
                $.ajax({
                    url: "http://gateway.marvel.com/v1/public/comics/" + id + "/characters?ts=1&apikey=" + public_key +"&hash=" + hash_code,
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
                        html_str = "";
                        html_str += '<h4 style="color:White;"><b>First Character In Comic (alphabetical)</b></h4>';

                        if (characters.length == 0) {
                            html_str += create_image("img/no_portrait", "", "jpg",1);
                            html_str += '<h2><b>No Character Found</b></h2>';
                            html_str += "<p>No Description Availaible</p>";
                        } else {
                            // Only for Characters found

                            character = characters[0];
                            character_name = character.name;
                            image = character.thumbnail;
                            description = character.description;
                            html_str += create_image(image["path"], "standard_fantastic", image["extension"]);
                            html_str += '<div class="ch_container">';
                            html_str += '<h2><b>' + character_name + '</b></h2>';
                            if (description == "") {
                                html_str += "<p>No Description Availaible</p>";
                            } else {
                                html_str += "<p>" + description +"</p>";
                            }
                           
                        }


                        character_div.innerHTML = html_str;

                        if (data_total == 0) {
                            load_div.innerHTML = '<button type="button" class="btn btn-danger btn-lg btn-block">No Search Results...</button>';
                        } else {
                            if (offset + 10 < data_total) {
                                load_div.innerHTML = '<button type="button" class="btn btn-success btn-lg btn-block" onclick="loadFunction()">Load More</button>';
                            } else {
                                load_div.innerHTML = '';  
                            }
                        }

                    },
                    error: function () {
                        message.innerHTML = "Oops! Refresh Page, error loading the page..."
                    }
                });
            }
            if (data_total == 0)
                load_div.innerHTML = '<button type="button" class="btn btn-danger btn-lg btn-block">No Search Results...</button>';
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
    console.log(ret_url);

    return ret_url;
};

function create_image(path, size, ext, option = 0) {
    ret_str = '<img style="width:100%" src="';

    if (option == 0) {
        image_path = path + '/' + size + '.' + ext;
    } else {
        image_path = path + size + '.' + ext;
    }

    ret_str += image_path + '">';
    return ret_str;
}

function process_str(str) {
    ret_str = "";
    for (let i = 0; i < str.length; ++i) {
        if (str[i] == ' ') {
            ret_str += '%20';
        } else {
            ret_str += str[i];
        }
    }
    return ret_str;
}
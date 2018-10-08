How to Run
==========
To run the application, simply open index.html in a browser.

The application was only tested on Google Chrome.

The main files are index.html, script.js, and bootstap for css

Design Process
==============

At the top of the page I created a menu bar with the most common features,
the Home page and How to Use page are easily accessible from there (Flexibility and efficiency of use).
Depending on which page you are on, the link for that page will be highlight
so as to make clear to the user which page they are on (Visibility of system status
).

The main page is simple and minimalistist with only a search bar and two buttons.
Most users will not want to filter their search, so all of the filters are hidden
by default, but can be seen and accessed by click a toggle more option (Aesthetic and minimalist design).
The default text in the search bar is "Search All Comics" so as to let the user know
that they can search all of the comics by default without entering any text (Help and documentation).
When you click the search bar to input text, the search bar is responsive and grows in length (Visibility of system status).
The default is to search by "Starting Letters of Title" because it is more broad.

If the user chooses to narrow there search they can click on the toggle More Options button
which opens a panel with more options, from there they can choose to search by exact title 
and more.

The user can press enter to launch a search.

After a search is made, the search is carried over to the next page. This minimizes the user's memory load.
(Recognition rather than recall)

In the "More Options" panel, every option is designed in such a way so that we can prevent the user 
from entering wrong data. For instance, for Year Released the user can only enter years (Error prevention).

The names of the filters have been changed from Marvel's api to be more user friendly (Match between system and the real world).

When a search is made, and the system is hanging, the word "Loading" is shown to the user, 
after the search is completed, the user is told of many results there are in total (Visibility of system status). Under there,
the user is explained how to view the First Character in the Comic. This text is purposefuly in light blue, to
catch the user's attention (Help and documentation).

In order to not bombard the user with a lot of information/data, all of the data is shown in
"cards", these cards can be flipped over with a mouse hover (Aesthetic and minimalist design). When the user scrolls to the 
bottom of the page, the user can load 10 more comic (Flexibility and efficiency of use). As more comics load, the words loading is shown again.

If at any point for some reason the user makes more than the alloted amount of calls per day, 
the user is told that they need to wait 24 hours before making more searches (Visibility of system status).

If an error occurs, the user is told "Oops! Refresh Page, error loading the page..." (Visibility of system status).

Lastly, there is a "How To" page with documentation on how to use the system (Help and documentation).
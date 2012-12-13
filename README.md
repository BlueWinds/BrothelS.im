Creating new Girls
=============

First, download and extract the game to your local drive. See that "zip" button at the top-left of this page (if you're reading this from GitHub)? Yeah, use that.

Now, the "content" folder is where you'll be doing all of your work. Open up content/girls, and create a new folder, giving it the first name of the girl you want to create. Let's say, for example, you want to create Slut1.

Create an "images" folder inside Slut1. That's where you'll put all your pictures.

Copy base.js from the Sophitia folder into Slut1. That particular file is designed as a tutorial - Sophitia is a vanilla girl, but **all** available options are documented in her file. Open up base.js and start editing.

See all those lines starting in "//"? Those are comments, if you hadn't guessed. They explain things. When you create your own girl, **remove all the comments from base.js**. I will not upload girls that still contain them, and it's not my job to strip them out for you.

Check your file's syntax! I recommend something like http://javascriptlint.com/online_lint.php - just copy-paste the whole contents of the file into that box, and it will point out any problems. Smokey the Bear: Only YOU can prevent swirly screens of death.

**THIS STEP HAS CHANGED**
When you're done editing base.js and adding all the images you want to the images folder, there's just one more step before you can test the girl. Open up "index.html" in a text editor, and head to around line 30. See the list of girls? Copy one of those lines and add it to the bottom of the list, changing the src attribute so that it points to the base.js file you created earlier.

As a general rule of thumb, resize images so they're less than 150kb, and 600x600 or smaller. I want to keep the game size down! Hi-res pictures do no good when they're jammed into one corner of the screen. ;)

Load up the game in your browser. Tada! Girls created after the start of the game will show up immediately, with whatever status they're supposed to have.

Please test your girl before submitting her to me or on the forum - try to trigger all of her images, and Streetwalk a whole bunch to make sure all the images are loading properly. Broken image links are no fun.

Creating Buildings
=============

This assumes you're familiar with creating girls. It's not hard, but I don't want to have to repeat myself. ^^;;

Create a new folder inside content/buildings, named after the one you want to create, and add your building's image (unlike girls, they only have one right now).

Copy the base.js file into that folder from the Theater. Open it up and start editing. It's very well commented, and explains all possible options.

Check your file's syntax! I recommend something like http://javascriptlint.com/online_lint.php - just copy-paste the whole contents of the file into that box, and it will point out any problems. Smokey the Bear: Only YOU can prevent swirly screens of death.

**THIS STEP HAS CHANGED**
When you're done editing base.js and adding all the images you want to the images folder, there's just one more step before you can test the girl. Open up "index.html" in a text editor, and head to around line 30. See the list of girls? Copy one of those lines and add it to the bottom of the list, changing the src attribute so that it points to the base.js file you created earlier.

Just like creating a girl, open up "index.html" and add your new base.js file list of buildings - this list starts at around line 42. Tada! It will show up next time you load the game (including in games already in progress).

Creating Events
=============

This guide assumes you're familiar with creating girls. It's not hard, but I don't want to have to repeat myself. ^^;;

Unlike buildings and girls, events don't need their own folder, just a single file. In content/events, copy tentacleAttack.js and give the copy a new name - pick a descriptive name for the event(s) you want to add.

Open up your new something.js file, and read through the documentation. The tentacleAttack file is very well documented, and contains all options, even the ones it doesn't use.

Check your file's syntax! I recommend something like http://javascriptlint.com/online_lint.php - just copy-paste the whole contents of the file into that box, and it will point out any problems. Smokey the Bear: Only YOU can prevent swirly screens of death.

**This step has changed**
When you're done editing your events file, open up (you probably guessed it) index.html, and add your file to the list (Events are around line 48). Save it. Reload the page. Tada! If you didn't break anything, your new events are present in the game.

License
=============

The contents of the "content" folder are provided as is. No claim is made on the images contained within. All text is original, and released into the public domain. The contents of the "libraries" folder are not mine either.

The contents of the "modules" folder are Copyright 2012 Everblue Design and other contributors. They are released under the GNU General Public License v3.

BrothelS.im is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

BorthelS.im is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.
== Creating new Girls

First, download and extract the game to your local drive. See that "zip" button at the top-left of this page (if you're reading this from GitHub)? Yeah, use that.

Now, the "content" folder is where you'll be doing all of your work. Open up content/girls, and create a new folder, giving it the first name of the girl you want to create. Let's say, for example, you want to create Slut1.

Create an "images" folder inside Slut1. That's where you'll put all your pictures.

Copy base.js from the Sophitia folder into Slut1. That particular file is designed as a tutorial - Sophitia is a vanilla girl, but *all* available options are documented in her file. Open up base.js and start editing.

See all those lines starting in "//"? Those are comments, if you hadn't guessed. They explain things. When you create your own girl, *remove all the comments from base.js*. I will not upload girls that still contain them, and it's not my job to strip them out for you.

When you're done editing base.js and adding all the images you want to the images folder, there's just one more step before you can test the girl. In "content/girls", open up girlList.js. I assume you can see the list of girls at the top. Add your *folder name* to the list.

As a general rule of thumb, resize images so they're less than 150kb, and 600x600 or smaller. I want to keep the game size down! Hi-res pictures do no good when they're jammed into one corner of the screen. ;)

Load up the game in your browser. Tada! Girls created after the start of the game will show up immediately, with whatever status they're supposed to have.

Please test your girl before submitting her to me or on the forum - try to trigger all of her images, and Streetwalk a whole bunch to make sure all the images are loading properly. Broken image links are no fun.

== License

The contents of the "content" folder are provided as is. No claim is made on the images contained within. All text is original, and released into the public domain. The contents of the "libraries" folder are not mine either.

The contents of the "modules" folder are Copyright 2012 Everblue Design and other contributors. They are released under the GNU General Public License v3.

BrothelS.im is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

BorthelS.im is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.
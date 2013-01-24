Adding new content
=============

First, download and extract the game to your local drive. See that "zip" button at the top-left of this page (if you're reading this from GitHub)? Yeah, use that. If you're not reading this on Github, you've probably already finished this step. ;)

Now, what type of content are you creating? Girls go under content/girls, Missions under content/missions, Events... you get the picture. Girls and Buildings require a folder to themselves (content/girls/Kirino, for example), inside of which is base.js. Events, Missions and Actions can just go in the matching folder (content/missions, content/events, etc.).

Next, open up a file of the same type as the item you want to create. **The best** way to create new things is to tweak old ones - makes it less likely that you'll forget an important line. Copy the text from your example file into the new javascript file you've just created and start editing.

Documentation is primarily found in content/doc.js - it includes information about all available options for every content type. Girls, Buildings, Events, Missions, etc. - it's all in there, though not organized all that well. This stuff really needs its own wiki or something. ^^;; The documentation is best referred to when you're confused, rather than read straight through, and it's used even better in conjunction with examining am already-functioning piece of content with functionality similar to what you're trying to create.

For girls and buildings, Kirino and the Theater are nice, vanilla examples. For an idea of a fully-functioning mission tree, take a look inside Sakuya's base.js. tentacleAttack.js is a good sample event file to look at, while training.js is a good place to start for actions.

**IMPORTANT**
When you're done editing your javascript file, open up "index.html". See around line 56, where it says Actions? You have to add your new file to the approriate place. Copy one of those lines and add it to the bottom of the list, changing the src attribute so that it points to the file you created. If you forget this step, then the game won't load your file. An easy mistake to make.

License
=============

The contents of the "content" folder are provided as is. No claim is made on the images contained within. All text is original, and released into the public domain. The contents of the "libraries" folder are not mine either.

The contents of the "modules" folder are Copyright 2012 Everblue Design and other contributors. They are released under the GNU General Public License v3.

BrothelS.im is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

BorthelS.im is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.
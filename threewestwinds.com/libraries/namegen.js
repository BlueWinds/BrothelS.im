// https://github.com/gregferrell/Random-Name-Generator/, slightly modified to make more English sounding names (removed "x", "z" and several double vowels).

(function(global, className){

	//function to get random number upto m
	function getRandom(minVal,maxVal)
	{
		//when a single int is passed
		//default to between 1 and that number
		if(minVal && !maxVal)
		{
			maxVal = minVal;
			minVal = 1;
		}

		//send back the magic
		return Math.round(minVal + (Math.random() * (maxVal - minVal)));
	}

	//just what it says, returns string with first letter upperCase
	function capitalize(s)
	{
		return s.charAt(0).toUpperCase() + s.substring(1, s.length);
	}

	//marginally shorter than typing out .length - 1
	//may remove
	function last(arr)
	{
		return arr.length - 1;
	}

	//the goodies!
	function randomName(syl)
	{
		//begin variable declaration
		//defauts
		var syl = syl || 3,

		//normal consonants
		    conso 		= ["b", "c", "d", "f", "g", "h", "j", "k", "l",
						   "m", "n", "p", "r", "s", "t", "v", "w", "y"],

		    doubleCon	= ["bb", "cc", "dd", "ff", "gg", "ll",
						   "mm", "nn", "pp", "rr", "ss", "tt", "zz"],

		    jointCon	= ["bl", "br", "ch", "ck", "cks", "cl", "cm", "cn",
		    			   "cr", "ct", "dr", "fl", "fr", "ft", "fth", "ght",
		    			   "gl", "gr", "km", "kn", "lb", "ld", "lf", "lk",
		    			   "lph", "lt", "lth", "mb", "mp", "mph", "ms", "nc",
		    			   "nch", "nd", "ng", "nk", "nks", "ns", "nt", "nth",
		    			   "ph", "phr", "pl", "pr", "ps", "rch", "rd", "rds",
		    			   "rf", "rk", "rl", "rm", "rn", "rp", "rph", "rs",
		    			   "rt", "rth", "sc", "sh", "shr", "sk", "sl", "sm",
		    			   "sn", "sp", "st", "str", "sts", "sw", "tch", "th",
		    			   "thr", "tr", "tsch", "tw", "wh", "xt", "xth"],

			startCon	= ["bl", "ch", "dr", "fl", "fr", "gl", "gr", "kn",
						   "pl", "pr", "ps", "sc", "sh", "shr", "sk", "sl",
						   "sm", "sn", "sp", "st", "str", "th", "thr", "tr",
						   "tw", "wh"],

		    vowel 		= ["a", "e", "i", "o", "u"],

		    startVow	= ["ae", "ai", "ou", "au"],

		    doubleVow	= ["ee", "oo", "ie", "ou"],

		//cache for performance, minor savings
		    consoLen 		= last(conso),
		    doubleConLen 	= last(doubleCon),
		    jointConLen		= last(jointCon),
   		    startConLen 	= last(startCon),
		    vowelLen 		= last(vowel),
		    startVowLen		= last(startVow),
		    doubleVowLen	= last(doubleVow),

		//init blank word
		    word = "",

		//random starts with a vowel
		    startWithV = !!getRandom(0, 1),

			//capture starting vowel and done reuse it if double
		    startVowel = "",

			//dont use more than one double consonant
			uDoubleCon = "",

			//dont use more than one complicated consonat group
			uJointCon  = "",

			//dont use the same consonant group as the starting one
			uStartCon  = "";

		//end of variable declaration

		for(var i = 1; i <= syl; i++)
		{
			//defaults
			var curVowel = "",
				curCon = "",

			//a boolean for last item
				lastItem = (i === syl);

			//if this is a starting vowel
			if(startWithV)
			{
				if(i === 1)
				{
					//start with 80% chance for single vowel and
					//20% chance for a double vowel,
					if(getRandom(5) > 1)
					{
						curVowel = vowel[getRandom(0, vowelLen)];
					}
					else
					{
						curVowel = startVow[getRandom(0, startVowLen)];
						startVowel = curVowel;
					}

				}
				else
				{
					//start with 80% chance for single vowel and
					//20% chance for a double vowel,
					if(getRandom(5) > 1)
					{
						curVowel = vowel[getRandom(0, vowelLen)];
					}
					else
					{
						//prevent using the same starting vowel set
						do
						{
							curVowel = doubleVow[getRandom(0, doubleVowLen)];
						}
						while (startVowel === curVowel);

					}
				}

				//more complicated consonant groups should come up less
				var tempNum = getRandom(6),

				//default for generating a consonant
				    hasCon = true;

				//if last syl
				if(lastItem)
				{
					//if this is the last sylable,
					//randomize whether or not it ends in a consonant
					//if yes, randomize adding an e to the end (low chance)
					var hasCon = !!getRandom(0, 1);
				}

				//bool used to stop consonant gen
				if(hasCon)
				{
					//1 in 3 chance for a compound consonant
					if(tempNum === 1)
					{
						curCon = jointCon[getRandom(0, jointConLen)];
					}
					else if (tempNum === 2 && !lastItem)
					{
						curCon = doubleCon[getRandom(0, doubleConLen)];
					}
					else
					{
						curCon = conso[getRandom(0, consoLen)];
					}
					//if this consonant is the last one
					//do a chance for an ending e
					if(lastItem && getRandom(4) === 4)
					{
						curCon += "e";
					}
				}
			}
			//starting consonant
			else
			{
				if(i === 1)
				{
					//start with 50% chance for compoundCon and
					//50% chance for a single consonant
					if(getRandom(2) > 1)
					{
						curCon = conso[getRandom(0, consoLen)];
					}
					else
					{
						curCon = startCon[getRandom(0, startConLen)];
						uStartCon = curCon;
					}
				}
				else
				{
					//more complicated consonant groups should come up less
					var tempNum = getRandom(6);

					//1 in 3 chance for a compound consonant
					if(tempNum === 1)
					{
						//avoid using the same joint consonant as the starting one
						do
						{
							curCon = jointCon[getRandom(0, jointConLen)];
						}
						while (uStartCon === curCon)

					}
					else if (tempNum === 2 && !lastItem)
					{
						curCon = doubleCon[getRandom(0, doubleConLen)];
					}
					else
					{
						curCon = conso[getRandom(0, consoLen)];
					}
					//if this consonant is the last one
					//do a chance for an ending e
					if(lastItem && getRandom(4) === 4)
					{
						curCon += "e";
					}
				}

				//do vowels for starting consonant

				//start with 80% chance for single vowel and
				//20% chance for a double vowel,
				if(getRandom(5) > 1)
				{
					curVowel = vowel[getRandom(0, vowelLen)];
				}
				else
				{
					curVowel = doubleVow[getRandom(0, doubleVowLen)];
				}
			}

			//add to word in order of which comes first
			word += (startWithV) ? (curVowel + curCon) : (curCon + curVowel);
		}


		return word;
	}

	global[className] = {};

	global[className].randomName = randomName;
	global[className].capitalize = capitalize;


})(this, 'nameGen');

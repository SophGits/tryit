### Commands
##### Copy contents of a file to another and append a line
###### file-two.html will contain everything from file-one, as well as A NEW LINE at the end
> cat file-one.js ; echo "A NEW LINE") > file-two.html

##### Return a section of a string that's separated in some way
######  “-d,” tells it the separator is a comma
###### “-f2,3” tells it to return the 2nd and 3rd sections
> echo "nel,mezzo,del,cammin" | cut -d, -f 2,3
> >>> mezzo,del
TPT "API" Documentation:

### Auth headers
Once server assigns a session key, you need to set the following headers:

X-Auth-User-Id: *userid*  
X-Auth-Session-Key: *sessionid*

Where *userid* is a number that represents your user's id. And *sessionid* the session id string given in Login.

## /Login.json
### POST
Username=*username*&Hash=*hash*

Where *username* is the server login username, and *hash* is the product of `md5(username+"-"+md5(password))`

Example for username:password:  
`curl -F "Username=username" -F "Hash=f5af2f733681b0c4c9316ddbde870440" http://powdertoy.co.uk/Login.json`

### GET
Normal auth headers set.
Returns a JSON with Status and Error. Status 0 is logged out and 1 logged in.

## /Startup.json
### GET
Returns Notifications, Updates, MoTD and Session (bool of logged-in)
## /Browse/Tags.json
### GET
Lists popular tags.    
QueryString parameters Start and Count (max 200) define tags shown.   
Example: `curl   http://powdertoy.co.uk/Browse/Tags.json?Start=200&Count=200`

## /Browse.json
### GET
Searches saves. First page is "FrontPage" (special).    
QueryString parameters:  
Start is the offset of saves to add (used for page number)    
Count is the ammount of saves to return, default 20   
Search_Query is the search string   
Category is a weird parameter used for my-own by-date and is usually "by *user*"    
## /User.json
### GET
Returns user information.
QueryString parameter can be Name or ID
## /Profile.json
### POST
Updates you profile information. Valid fields are Biography, Location, Website
And you only need to specify the one you will update.
## /Browse/View.json
### GET
Requires QueryString parameter ID and returns the save's information such as description.
### POST
Publishes a save.
With QueryString parameter ID and Key (anti-CSRF token), the parameter "ActionPublish" should exist and contain anything.
## /Browse/Comments.json
### GET
Requires QueryString parameters ID, Start, Count and returns the Save's comments.
### POST
Requires Comment parameter AND QueryString parameter ID, and adds a comment to a save.  
Example: `curl -H "X-Auth-User-Id: 134437" -H "X-Auth-Session-Key: LETSPRETENDTHISISVALID" -F "Comment=TEST" http://powdertoy.co.uk/Browse/Comments.json?ID=2126702`
## /Vote.api
### POST
Require parameter ID and Action (Down or Up). and returns OK or a error message
Example: `curl -H "X-Auth-User-Id: 134437" -H "X-Auth-Session-Key: LETSPRETENDTHISISVALID" -F "ID=100000" -F "Action=Up" powdertoy.co.uk/Vote.api`
## /Save.api
### POST
Uploads a save.
Parameters Name, Description, Publish (Public/Private) and Data are used.
## /Browse/Favourite.json
### GET
With QueryString parameters ID and Key (anti-CSRF key), adds a save to favourites. If Mode is equal to Remove, save is removed from favourites.
## /Browse/Delete.json
### GET
Deletes or Unpublishes a save.
Requires QueryString parameter ID, Key and Mode (Unpublish/Delete)
## /Browse/Report.json
### POST
Requires QueryString parameters ID and Key, and takes parameter Reason.
## /Browse/EditTag.json
### GET
QueryString parameters Op (add/delete), ID, Tag and Key.

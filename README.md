# TPTAPI
This package interacts with [Powder Toy](powdertoy.co.uk) 's API.

### Usage:
```javascript
var opts = {
    url: 'http://powdertoy.co.uk'
};
var client = require('tptapi')(opts);
```

#### Login
Most actions need a session token you can obtain from Login: `client.login(user, passwd);` returns a boolean.

#### Check Login
To verify that your session is still valid you can run checkLogin:  `client.checkLogin()` which will return a boolean.

#### Vote [LOGIN NEEDED]
To cast a vote, you need to do `client.vote(id, type)` where type is a negative or positive number that defines if its a upvote or downvote. Returns a boolean.

#### Comment [LOGIN NEEDED]
To add a comment, you need to do `client.comment(id, text)`. Returns a boolean.

#### Add Tag [LOGIN NEEDED]
To add a tag, you need to do `client.addTag(id, name)`. Returns a boolean.

#### Delete Tag [LOGIN NEEDED]
To remove a tag, you need to do `client.delTag(id, name)`. Returns a boolean.

#### Delete Save [LOGIN NEEDED]
To remove a save, you need to do `client.delSave(id)`. Returns a boolean.

#### Unpublish Save [LOGIN NEEDED]
To unpublish a save, you need to do `client.unpublishTag(id)`. Returns a boolean.

#### Publish Save [LOGIN NEEDED]
To publish a save, you need to do `client.publishSave(id)`. Returns a boolean.

#### Update Profile [LOGIN NEEDED]
To update your profile, you need to do `client.setProfile(data)`. Returns a boolean.

#### Browse [LOGIN ENHACES OUTPUT]
To browse, you need to do `client.browse(query, count, offset)`. Returns results.

#### List Tags
To list tags, you need to do `client.listTags(start, count)`.
Returns array of tags.

#### Favourite a Save [LOGIN NEEDED]
To add a save to favutrites, you need to do `client.fav(id)`. Returns a boolean.

#### UnFavourite a Save [LOGIN NEEDED]
To remove a save from favutrites, you need to do `client.remFav(id)`. Returns a boolean.

#### Save [LOGIN NEEDED]
Saves a CPS file. Data **_has_** to be OPS1-encoded save.
```javascript
var data = fs.readFileSync("save.cps").toString();
client.save(name, description, data)
```
Returns save id.

#### Update Save [LOGIN NEEDED]
Updates a save with new description and content. Data **_has_** to be OPS1-encoded save.
```javascript
var data = fs.readFileSync("save.cps").toString();
client.updateSave(name, description, data)
```
Returns a boolean.

#### Startup Data [LOGIN ENHACES OUTPUT]
Returns Startup.json data. `client.startup()`

#### Save's Comments
Returns a save's comments. `client.comments(id, count, offset)`

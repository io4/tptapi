var rp = require('request-promise');
const crypto = require("crypto");
function md5 (d){
  return crypto.createHash("md5").update(d).digest("hex");
}
function powderClient (opts){
  var opts = opts || {};
  opts.url = opts.url || "http://powdertoy.co.uk/";
  var self = this;
  self.loginData = {};
  self.login = function(user,pass){
    var hash = md5(`${user}-${md5(pass)}`);
    var options = {
      method: 'POST',
      uri: opts.url+'Login.json',
      form: {
          Username: user,
          Hash: hash
      },
      json: true // Automatically stringifies the body to JSON
    };

    return rp(options)
    .then(function (j) {
      if(j.Status) {
        self.loginData = j;
        if(j.Notifications.length > 0) {
          console.log("User has a new notifications: "+j.Notifications.join(", "));
        }
        delete(self.loginData.Status);
        delete(self.loginData.Notifications);
      } else { throw new Error("Bad login."); }
      return Boolean(j.Status); // fail-sucess
    })
  }
  self.optionSkeleton = function(url,m) {
    return options = {
      method: m,
      uri: opts.url+url,
      headers: {
        "X-Auth-User-Id": self.loginData?self.loginData.UserID:0,
        "X-Auth-Session-Key": self.loginData?self.loginData.SessionID:0
      },
      json: true // Automatically stringifies the body to JSON
    };
  }
  self.checkLogin = function(){
    return rp(self.optionSkeleton("Login.json","GET")).then(a=>Boolean(a.Status))
  }
  self.vote = function(id,type){ // type can be -1 or +1
    var o = self.optionSkeleton("Vote.api","POST");
    o.form = {
      "ID": Number(id),
      "Action": (type>0)?"Up":"Down"
    }
    o.json = false;
    return rp(o).then(a=>(a=="OK"));
  }
  self.comment = function(id,content) {
    var o = self.optionSkeleton("Browse/Comments.json","POST");
    o.form = {
      "Comment": content
    };
    o.qs = {"ID": id}
    return rp(o).then(a=>Boolean(a.Status));
  }
  self.addTag = function (id,tag){
    var o = self.optionSkeleton("Browse/EditTag.json","GET");
    o.qs = {
      "ID": id,
      "Tag": tag,
      "Op": "add",
      "Key": self.loginData.SessionKey
    };
    return rp(o).then(a=>Boolean(a.Status));
  }
  self.delTag = function(id,tag){
    var o = self.optionSkeleton("Browse/EditTag.json","GET");
    o.qs = {
      "ID": id,
      "Tag": tag,
      "Op": "delete",
      "Key": self.loginData.SessionKey
    };
    return rp(o).then(a=>Boolean(a.Status));
  }
  self.delSave = function(id){
    var o = self.optionSkeleton("Browse/Delete.json","GET");
    o.qs = {
      "ID": id,
      "Mode": "Delete",
      "Key": self.loginData.SessionKey
    };
    return rp(o).then(a=>Boolean(a.Status));
  }
  self.unpublishSave = function(id){
    var o = self.optionSkeleton("Browse/Delete.json","GET");
    o.qs = {
      "ID": id,
      "Mode": "Unpublish",
      "Key": self.loginData.SessionKey
    };
    return rp(o).then(a=>Boolean(a.Status));
  }
  self.publishSave = function(id,content) {
    var o = self.optionSkeleton("Browse/View.json","POST");
    o.form = {
      "ActionPublish": 1
    };
    o.qs = {
      "ID": id,
      "Key": self.loginData.SessionKey
    }
    return rp(o).then(a=>Boolean(1));
  }
  self.setProfile = function(p){ // type can be -1 or +1
    var o = self.optionSkeleton("Profile.json","POST");
    o.form = p;
    return rp(o).then(a=>(a=="OK"));
  }
  self.browse = function(q,c,s){
    var o = self.optionSkeleton("Browse.json","GET");
    o.qs = {
      Start: s,
      Count: c,
      Search_Query: q
    };
    return rp(o);
  }
  self.listTags = function(c,s){
    var o = self.optionSkeleton("Browse/Tags.json","GET");
    o.qs = {
      Start: s,
      Count: c
    };
    return rp(o);
  }
  self.fav = function(id){
    var o = self.optionSkeleton("Browse/Favouritejson","GET");
    o.qs = {
      "ID": id,
      "Key": self.loginData.SessionKey
    };
    return rp(o).then(a=>Boolean(a.Status));
  }
  self.remfav = function(id){
    var o = self.optionSkeleton("Browse/Favouritejson","GET");
    o.qs = {
      "ID": id,
      "Key": self.loginData.SessionKey,
      "Mode": "Remove"
    };
    return rp(o).then(a=>Boolean(a.Status));
  }
  self.save = function(name,desc,data){ // type can be -1 or +1
    var o = self.optionSkeleton("Save.api","POST");
    o.form = {
      "Name": name,
      "Description": desc,
      "Data": data
    }
    o.json = false;
    return rp(o).then(a=>{
      if(a.split(" ")[0]=="OK") return a.split(" ")[1]
    });
  }
  self.updateSave = function(id,data,desc){ // type can be -1 or +1
    var o = self.optionSkeleton("Vote.api","POST");
    o.form = {
      "ID": Number(id),
      "Description": desc,
      "Data": data
    };
    o.json = false;
    return rp(o).then(a=>(a=="OK"));
  }
  self.saveData = function(id) {
    var o1 = self.optionSkeleton("Browse/View.json","GET");
    o1.qs = {"ID":id};
    return rp(o);
  }
  self.startup = function(){
    return rp(self.optionSkeleton("Startup.json","GET"));
  }
  self.comments = function(id,c,s){
    var o = self.optionSkeleton("Browse/Comments.json","GET");
    o.qs = {
      Start: s,
      Count: c,
      ID: id
    };
    return rp(o);
  }
  return self;
}
module.exports = powderClient;

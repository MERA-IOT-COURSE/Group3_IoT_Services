const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('profile.json')
const db = low(adapter)
const Profile = require("./profile.js")

class Configuration{
    constructor(){
        db.defaults({ "profile": new Profile()}).write()
    }

    get(){
        console.log("get profile")
        return new Profile(db.get("profile").value())
    }

    update(profile){
        db.assign({"profile": profile}).value()
        console.log("Profile was updated be_id" + profile.be_id +
            "broker host" + profile.broker.host +
            "broker port" + profile.broker.port)
    }
}

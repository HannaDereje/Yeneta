const mongoose = require("mongoose");

class DiscussionRoomRepository {

    constructor(model) {
        this.model = model;
    }

    create(discussionRoom) {
        return new Promise((resolve, reject) => {
            resolve(this.model(discussionRoom).save());
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const discussionRoom = this.model.find({});
            resolve(discussionRoom)
        });
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            const onediscussionRoom = this.model.findOne({ _id: id })
            resolve(onediscussionRoom)
        });
    }

    getCount(){

        return new Promise((resolve, reject)=>{        
            const count = this.model.count();
            resolve(count)}); 
    }
    
    updateOne(id, discussionRoom) {
        let set = {};
        for (const key in discussionRoom) {
            set[key] = discussionRoom[key];

        }
        return new Promise((resolve, reject) => {
            const onediscussionRoom = this.model.updateOne({ _id: id }, { $set: set })
            resolve(onediscussionRoom)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const onediscussionRoom = this.model.deleteOne({ _id: id })
            resolve(onediscussionRoom)
        });
    }
    deleteAll() {
        return new Promise((resolve, reject) => {
            const alldiscussionRoom = this.model.remove()
            resolve(alldiscussionRoom)
        });
    }

}

module.exports = DiscussionRoomRepository;
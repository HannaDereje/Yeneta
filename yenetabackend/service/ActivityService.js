
class ActivityService{

    constructor(activityRepository){
        this.activityRepository =  activityRepository;     
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.updateOne = this.updateOne.bind(this);
    }

     insert(activity){

        return this.activityRepository.create(activity)
                    
    }
     getAll(){

        const activitys = this.activityRepository.getAll();
        return new Promise((resolve, reject)=>{resolve(activitys)})
    }

    getOne(id){

        const activity = this.activityRepository.getOne(id);
        return new Promise((resolve, reject)=>{resolve(activity)})
    }

    updateOne(id, activity){

        const a_activity = this.activityRepository.updateOne(id, activity);
        return new Promise((resolve, reject)=>{resolve(a_activity)})
    }
    deleteOne(id){

        const deletedactivity = this.activityRepository.deleteOne(id);
        return new Promise((resolve, reject)=>{resolve(deletedactivity)})
    }
    deleteAll(){

        const deletedactivitys = this.activityRepository.deleteAll();
        return new Promise((resolve, reject)=>{resolve(deletedactivitys)})
    }

}

module.exports = ActivityService

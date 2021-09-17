class ActivityResultController{

    constructor(activityResultService){
        this.activityResultService = activityResultService
        this.getOne = this.getOne.bind(this)
        
    }

    getOne(req, res){
        return this.activityResultService.getActivityresult(req.params.id)
                                .then((response) => res.json(response))
                                .catch((err)=>{
                                    res.send(403)
                                    console.log(err);
                                })
    }



}

module.exports = ActivityResultController
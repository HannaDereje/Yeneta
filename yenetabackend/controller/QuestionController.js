
class QuestionController{

    constructor(questionService){
        this.questionService = questionService;
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.updateOne = this.updateOne.bind(this);
    }

     insert(req, res){
         return  this.questionService.insert(req.body)
                                .then((response) => res.json(response))
                                .catch((err)=>{
                                    res.status(403)
                                    console.log("err");
                                })
    }

    getAll(req, res){
        return  this.questionService.getAll()
                                .then((response) => res.json(response))
                                .catch((err)=>{
                                    res.send(403)
                                    console.log("err");
                                })
    }
    getOne(req, res){
        return this.questionService.getOne(req.params.id)
                                .then((response) => res.json(response))
                                .catch((err)=>{
                                    res.send(403)
                                    console.log("err");
                                })
    }

    updateOne(req, res){
        return this.questionService.updateOne(req.params.id, req.body)
                                .then((response) => res.json(response))
                                .catch((err)=>{
                                    res.send(403)
                                    console.log("err");
                                })
    }
    deleteOne(req, res){
        return this.questionService.deleteOne(req.params.id)
                                .then((response) => res.json(response))
                                .catch((err)=>{
                                    res.send(403)
                                    console.log("err");
                                })
    }
    deleteAll(req, res){
        return this.questionService.deleteAll()
                                .then((response) => res.json(response))
                                .catch((err)=>{
                                    res.send(403)
                                    console.log("err");
                                })
    }
    

}


module.exports = QuestionController
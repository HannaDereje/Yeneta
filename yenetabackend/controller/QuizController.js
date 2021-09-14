const path = require("path")
const fs = require("fs")

class QuizController{

    constructor(quizService){
        this.quizService = quizService;
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.updateOne = this.updateOne.bind(this);
        this.approveQuiz = this.approveQuiz.bind(this)
    }

     insert(req, res){
         return  this.quizService.insert(req.body)
                                .then((response) => res.json(response))
                                .catch((err)=>{
                                    res.status(403)
                                    console.log("err");
                                }) 
    }

    getAll(req, res){
        return  this.quizService.getAll()
                                .then((response) => res.json(response))
                                .catch((err)=>{
                                    res.send(403)
                                    console.log("err");
                                })
    }
    getOne(req, res){
        return this.quizService.getOne(req.params.id)
                                .then((response) => res.json(response))
                                .catch((err)=>{
                                    res.send(403)
                                    console.log("err");
                                })
    }

    updateOne(req, res){
        return this.quizService.updateOne(req.params.id, req.body)
                                .then((response) => res.json(response))
                                .catch((err)=>{
                                    res.send(403)
                                    console.log("err");
                                })
    }
    deleteOne(req, res){
        return this.quizService.deleteOne(req.params.id)
                                .then((response) => res.json(response))
                                .catch((err)=>{
                                    res.send(403)
                                    console.log("err");
                                })
    }
    deleteAll(req, res){
        return this.quizService.deleteAll()
                                .then((response) => res.json(response))
                                .catch((err)=>{
                                    res.send(403)
                                    console.log("err");
                                })
    }

    approveQuiz(req, res) {
        if (!req.body.approved) {
            req.body.approved = true
        }
        return this.quizService.updateOne(req.params.id, req.body)
            .then((response) => res.json(response))
            .catch((err) => {
                res.send(403)
                console.log("err");
            })


    }

    getTeachersQuiz(req, res){
    }
    

}


module.exports = QuizController
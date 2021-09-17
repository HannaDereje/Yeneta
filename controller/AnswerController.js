
class AnswerController{

    constructor(answerService){
        this.answerService = answerService;
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.updateOne = this.updateOne.bind(this);
    }

     insert(req, res){

        const answer ={
            answer : Object.entries(req.body.answer)
        }
        const one={}

        for(let i=1; i< answer.answer.length;i++){
           
            one["answer"]=answer.answer[i][1]
            one["date"]=new Date
            one["question"]= answer.answer[i][0].split("_")[1]
            //one["user"]=req.user_id._id
            
        }
        console.log(one)
        

         return  this.answerService.insert(one)
                                .then((response) => res.json(response))
                                .catch((err)=>{
                                    res.status(403)
                                    console.log(err);
                                })
    }

    getAll(req, res){
        return  this.answerService.getAll()
                                .then((response) => res.json(response))
                                .catch((err)=>{
                                    res.send(403)
                                    console.log("err");
                                })
    }
    getOne(req, res){
        return this.answerService.getOne(req.params.id)
                                .then((response) => res.json(response))
                                .catch((err)=>{
                                    res.send(403)
                                    console.log("err");
                                })
    }

    updateOne(req, res){
        return this.answerService.updateOne(req.params.id, req.body)
                                .then((response) => res.json(response))
                                .catch((err)=>{
                                    res.send(403)
                                    console.log("err");
                                })
    }
    deleteOne(req, res){
        return this.answerService.deleteOne(req.params.id)
                                .then((response) => res.json(response))
                                .catch((err)=>{
                                    res.send(403)
                                    console.log("err");
                                })
    }
    deleteAll(req, res){
        return this.answerService.deleteAll()
                                .then((response) => res.json(response))
                                .catch((err)=>{
                                    res.send(403)
                                    console.log("err");
                                })
    }
    

}


module.exports = AnswerController
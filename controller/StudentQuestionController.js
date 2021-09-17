class StudentQuestionController{

    constructor(studentService, userService, studentQuestionService, contentmanagerAnswerService){
        this.studentService = studentService;
        this.userService = userService;
        this.studentQuestionService = studentQuestionService;
        this.contentmanagerAnswerService = contentmanagerAnswerService;
        this.addQuestion = this.addQuestion.bind(this);
        this.getProfileInfo = this.getProfileInfo.bind(this)
        this.getAllquestionsandAnswer = this.getAllquestionsandAnswer.bind(this)
    }

    async addQuestion(req, res){
        
        if(req.user_id === null){
            res.status(403)
            return res.send("You need to sign in.")
        }
        var studentQuestion = {
            userquestion: req.body.userquestion,
            user:req.user_id._id
        }
        console.log(studentQuestion)
       await this.studentQuestionService.insert(studentQuestion)
       
       return res.status(200).json(studentQuestion)
    }
     getAllquestionsandAnswer(req, res){
       /* if(req.user_id === null){
            res.status(403)
            return res.send("You need to sign in.")
        }*/
        this.studentQuestionService.getAll()
            .then((questions)=>{

                console.log(questions)

                this.contentmanagerAnswerService.getAll()
                    .then((answers)=>{
                        console.log(answers)
                        return res.json({questions:questions, answers:answers})
                    })
            })
       
    }

    async getProfileInfo(req, res){

        if(req.user_id === null){
            res.status(403)
            return res.send("You need to sign in.")
        }
     return  this.userService.getOne(req.user_id._id)
                        .then((user)=>{
                            this.studentService.getOneByEmail(user.email)
                                .then((student)=>{
                                    res.status(200).json(student);
                                })
                        })
    }

    async getAnswer(req, res){

    }
}

module.exports = StudentQuestionController;
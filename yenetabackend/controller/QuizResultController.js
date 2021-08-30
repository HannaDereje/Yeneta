class QuizResultController{

    constructor(quizService, quizAnswerService, questionService, quizResultService){
        this.questionService = questionService;
        this.quizResultService = quizResultService
        this.quizService = quizService
        this.quizAnswerService = quizAnswerService
        this.checkResultForQuiz = this.checkResultForQuiz.bind(this)
        this.checkEntranceQuiz = this.checkEntranceQuiz.bind(this)
        
    }

    checkEntranceQuiz(req, res){

        console.log(req.body)

        const correctAnswers = {}
        const incorrectAnswers={}
        const ids=[]

        const answer = Object.entries(req.body.answer);

        for (let i = 1; i < answer.length; i++) {
            ids.push(answer[i][0].split("_")[1])     
        }
        return this.questionService.getMany(ids)
                .then((question)=>{

                    var result = 0;
                    for (let i = 0; i < question.length; i++) {

                        for (let j = 1; j < answer.length; j++) {

                            if(question[i]._id == answer[j][0].split("_")[1] && question[i].answer == answer[j][1]){
                                        
                                result++;
                                correctAnswers[j] = answer[j][0].split("_")[1]
                               
                            }
                        }
                        
                    }

                    res.status(200).json({"result":result, "correct":correctAnswers})

                }).catch((err)=>{
                    res.status(403)
                    console.log("err");
                }) 

         

    }

    checkResultForQuiz(req, res) {
        this.quizService.getOne(req.params.id)
            then((quiz)=>{
                this.quizAnswerService.getByQuiz(quiz._id)
                    .then((studentAnswers)=>{
                        for (question in quiz.questions) {
                            this.questionService.getOne(question.id)
                                then((result)=>{
                                    const answer = result.answer

                                    for (let i = 0; i < studentAnswers.length; i++) {
                                        if (studentAnswers[i] == answer) {
                                            total = total + 1;
                                        }
                        
                                    }
                                })
                        }

                        res.status(200).json(total);
                    })

            })
        
       


    }
}

module.exports = QuizResultController
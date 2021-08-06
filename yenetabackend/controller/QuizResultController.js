class QuizResultController{

    constructor(quizService, quizAnswerService, quizService, quizResult){
        this.questionService = questionService;
        this.quizResult = quizResult
        this.quizService = quizService
        this.quizAnswerService = quizAnswerService
        this.checkResultForActivity = this.checkResultForActivity.bind(this)
        
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
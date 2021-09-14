class QuizResultController{

    constructor(quizService, quizAnswerService, questionService, quizResultService, userService, studentService){
        this.questionService = questionService;
        this.quizResultService = quizResultService
        this.quizService = quizService
        this.userService = userService
        this.studentService = studentService
        this.quizAnswerService = quizAnswerService
        this.checkResultForQuiz = this.checkResultForQuiz.bind(this)
        this.checkEntranceQuiz = this.checkEntranceQuiz.bind(this)
        
    }

    checkEntranceQuiz(req, res){

        console.log(req.body)

        const correctAnswers = []
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
                                correctAnswers.push(answer[j][0].split("_")[1])
                                
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
        
        const correctAnswers = []
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
                        correctAnswers.push(answer[j][0].split("_")[1])
                    
                    }
                }
                
            }

            var quizResult ={
                result:result,
                user:req.user_id._id,
                quiz: req.body.quiz_id
            }

            console.log(req.user_id._id)
      this.userService.getOne(req.user_id._id)
      .then((user)=>{
          this.studentService.getOneByEmail(user.email)
              .then((student)=>{

                  const x = student.quizes.find( quiz => quiz.split("_")[0] === req.body.quiz_id );
                  if(x !== undefined){
                      let index = student.quizes.findIndex(quiz => quiz.split("_")[0] === req.body.quiz_id);
                      console.log(x, index)

                      student.quizes[index] = req.body.quiz_id + "_submitted"

                       this.studentService.updateOne(student._id, student)
                      .then(updatedStudent=>{

                         this.quizResultService.insert(quizResult)
                        .then(quiz=>{
 
                              res.status(200).json({"result":result, "correct":correctAnswers, "quiz":quiz, "student":updatedStudent})
                        })
                         
                      })
                  }
                 
                })
                 
               })
      }).
      catch((err)=>{
          res.send(404)
          console.log(err);
      })
            

           

      


    
    }

    
    
}

module.exports = QuizResultController
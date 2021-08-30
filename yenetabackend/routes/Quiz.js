const QuizController = require('../controller/QuestionController');
const Quiz = require("../Models/Quiz")
const QuizRepository = require("../repository/QuizRepository")
const QuizService = require("../service/QuizService")

const Question = require("../Models/Question")
const QuestionRepository = require("../repository/QuestionRepository")
const QuestionService = require("../service/QuestionService") 

const quizRepo = new QuizRepository(Quiz)
const quizServ = new QuizService(quizRepo)

const questionRepo = new QuestionRepository(Question)
const questionServ = new QuestionService(questionRepo)

const UserController = require('../controller/UserController');
const User = require("../Models/User")
const UserRepository = require("../repository/UserRepository")
const UserService = require("../service/UserService")

const Role = require("../Models/Role")
const RoleRepository = require("../repository/RoleRepository")
const RoleService = require("../service/RoleService")

const multiparty = require("connect-multiparty")

const MultipartyMiddleware = multiparty({uploadDir:'./uploads'})
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")



module.exports = (server) => {
    server.use(bodyParser.json())
 

    const userRepo = new UserRepository(User)
    const userServ = new UserService(userRepo)

    const roleRepo = new RoleRepository(Role)
    const roleServ = new RoleService(roleRepo)
   
    server.post("/insertQuiz", MultipartyMiddleware,(req, res)=>{

        if(req.files){
        var tempFile = req.files.upload
        var tempPathFile = tempFile.path;

        const targetPathUrl = path.join(__dirname, "../QuizImages/" + tempFile.name) 

         if(path.extname(tempFile.originalFilename).toLowerCase() === ".png" || ".jpg"){
                fs.rename(tempPathFile, targetPathUrl , err=>{

                        res.status(200).json({

                            uploaded:true,
                            url:`http://localhost:5000/${tempFile.originalFilename}`
                        })
             
                        if(err) return console.log(err)
                })
        }
        }

        const elements =[]
        const ids = []
        const Question={
                question:Object.entries(req.body.question)
        }
        const Answer = {
                answer:Object.entries(req.body.answer)
        } 
        Question.question.forEach(element=>{
                const one ={}
                Answer.answer.forEach(element2=>{

                         one["content"]=element[1]
                         one["answer"]=element2[1]
                         one["level"]=req.body.level
        
                })
                
                elements.push(one)
               
                })

                console.log(elements)
                
              return  questionServ.insertMany(elements)
                .then((questions) => {
                                console.log(questions)

                                for (let i = 0; i < questions.length; i++) {
                                        ids.push(questions[i]._id)
                                }
                                console.log(ids)

                                const quiz = {
                                        date:new Date(),
                                        level:req.body.level,
                                        questions:ids
                                }

                                console.log(quiz)

                                return quizServ.insert(quiz)
                                        .then((quiz) => {
                                                res.json(quiz)
                                        })  
                        
                        
                })
                .catch((err)=>{
                res.send(403)
                console.log("err");
                }) 

    })

    server.get("/getAllQuizes",
            new UserController(userServ, roleServ).verifyToken, 
            new UserController(userServ, roleServ).authRole("TEACHER"),  
            new QuizController(quizServ).getAll)

    

    server.get("/getQuiz/:id", 
            new UserController(userServ, roleServ).verifyToken, 
            new UserController(userServ, roleServ).authRole("TEACHER"),
            new QuizController(quizServ).getOne)

    server.put("/updateQuiz/:id", 
            new UserController(userServ, roleServ).verifyToken, 
            new UserController(userServ, roleServ).authRole("TEACHER"),
            new QuizController(quizServ).updateOne)

    server.delete("/deleteQuiz/:id", 
            new UserController(userServ, roleServ).verifyToken, 
            new UserController(userServ, roleServ).authRole("TEACHER"),
            new QuizController(quizServ).deleteOne)

    server.delete("/deleteQuizes", 
            new UserController(userServ, roleServ).verifyToken, 
            new UserController(userServ, roleServ).authRole("TEACHER"),
            new QuizController(quizServ).deleteAll)
}
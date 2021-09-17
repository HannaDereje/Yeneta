const QuizController = require('../controller/QuizController');
const Quiz = require("../Models/Quiz")
const QuizRepository = require("../repository/QuizRepository")
const QuizService = require("../service/QuizService")

const Question = require("../Models/Question")
const QuestionRepository = require("../repository/QuestionRepository")
const QuestionService = require("../service/QuestionService")

const ContentManager = require("../Models/ContentManager")
const ContentManagerRepository = require("../repository/ContentManagerRepository")
const ContentManagerService = require("../service/ContentManagerService")

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

const MultipartyMiddleware = multiparty({ uploadDir: './uploads' })
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")



module.exports = (server) => {
    server.use(bodyParser.json())


    const userRepo = new UserRepository(User)
    const userServ = new UserService(userRepo)

    const roleRepo = new RoleRepository(Role)
    const roleServ = new RoleService(roleRepo)

    const contentRepo = new ContentManagerRepository(ContentManager)
    const contentServ = new ContentManagerService(contentRepo)

    server.post("/insertImage", MultipartyMiddleware, (req, res) => {

        if (req.files) {
            var tempFile = req.files.upload
            var tempPathFile = tempFile.path;

            const targetPathUrl = path.join(__dirname, "../QuizImages/" + tempFile.name)

            if (path.extname(tempFile.originalFilename).toLowerCase() === ".png" || ".jpg") {
                fs.rename(tempPathFile, targetPathUrl, err => {

                    res.status(200).json({

                        uploaded: true,
                        url: `http://localhost:5000/${tempFile.originalFilename}`
                    })

                    if (err) return console.log(err)
                })
            }
        }

    })

    server.post("/insertQuiz", new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"), (req, res) => {


            const elements = []
            const ids = []
            var ids2 = []
            const Question = {
                question: Object.entries(req.body.question)
            }
            const Answer = {
                answer: Object.entries(req.body.answer)
            }

            Question.question.forEach(element => {
                const one = {}
                Answer.answer.forEach(element2 => {

                    one["content"] = element[1]
                    one["answer"] = element2[1]
                    one["level"] = req.body.level
                })

                elements.push(one)

            })

            console.log(elements)

            return questionServ.insertMany(elements)
                .then((questions) => {
                    console.log(questions)

                    for (let i = 0; i < questions.length; i++) {
                        ids.push(questions[i]._id)
                    }

                    return quizServ.getCount()
                        .then(number => {

                            const quiz = {
                                allowedTime: req.body.allowedTime,
                                level: req.body.level,
                                questions: ids,
                                number: number + 1,
                                user:req.user_id._id,
                                questionNumber:req.body.questionNumber
                            }
                            return quizServ.insert(quiz)
                                .then((quiz) => {
                                    res.send(quiz)


                                })
                        })



                })
                .catch((err) => {
                    res.send(403)
                    console.log(err);
                })

        })

    
    server.get("/teachersQuiz", new UserController(userServ, roleServ).verifyToken,
                                new UserController(userServ, roleServ).authRole("TEACHER"),
                                (req, res)=>{

                                    
                                if(req.user_id === null){
                                    res.status(403)
                                    return res.send("You need to sign in.")
                                }

                                return quizServ.getOneByUserId(req.user_id._id)
                                            .then(quiz=>{
                                                res.send(quiz)
                                            })
                            
                                
                            })
    




    server.get("/getAllQuizes",
        //   new UserController(userServ, roleServ).verifyToken, 
        // new UserController(userServ, roleServ).authRole("TEACHER"),  
        new QuizController(quizServ).getAll)



    server.get("/getQuiz/:id",
        //new UserController(userServ, roleServ).verifyToken,
        //new UserController(userServ, roleServ).authRole("STUDENT"),
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
     server.put("/approveQuiz/:id",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("ADMIN"),
        new QuizController(quizServ).approveQuiz) 

    

   
}
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const {check, validationResult, body} = require("express-validator");


class UserController{

    constructor(userService, roleService){
        this.userService = userService;
        this.roleService = roleService;
        this.login = this.login.bind(this);
        this.generateAuthToken = this.generateAuthToken.bind(this)
        this.verifyToken = this.verifyToken.bind(this)
        this.getAllUsers = this.getAllUsers.bind(this)
        this.authRole = this.authRole.bind(this)
    }

     generateAuthToken(id, role){

        const token = jwt.sign({_id:id, role:role}, "secret_key")
        return token
    }

    async login(req, res){

        console.log(req.body.email)
             this.userService.getOneByEmail(req.body.email)
                                        .then((user) =>{
                                        
                                            if(!user)
                                                res.status(404).send("User does not exist");
                                                
                                            if(!bcrypt.compare(req.body.password, user.password)){
                                                res.status(404).send("Wrong Password");
                                                return 
                                            }

                                            this.roleService.getOneById(user.role)
                                             .then((role)=>{

                                                const token = this.generateAuthToken(user._id, role.role)
                                       
                                                res.status(200).send({
                                                            user:user,
                                                            token:token
                                                }) 
                                                })
                                        })  
                                        .catch((err)=>{
                                            res.sendStatus(403)
                                            console.log("err");
                                        })
    }


    async getAllUsers(req, res){
        return await this.userService.getAll() 
                        .then((response) => res.json(response))
                        .catch((err)=>{
                            res.send(403)
                            console.log("err");
                        })
    }


    async verifyToken(req, res, next){

        const token = req.headers["x-access-token"] || req.headers["authorization"];
        
        if(!token) return res.status(401).json("access denied");

        try{
            const decoded = jwt.verify(token, "secret_key");
            req.user_id = decoded;  
            console.log(req.user_id)
           

            next()
            
        }catch(error){
            console.log(error)
        }
    }

     authRole(role){

        return (req, res, next) =>{
           if(req.user_id.role !== role){
               res.status(401)
               return res.send("Not Allowed")
           }
           next()
        }
    }

    async verifyUser(req, res, next){
        console.log(req.params.accessToken)
         this.userService.getOneByToken(req.params.accessToken)
                         .then((user)=>{

                            if(!user){
                                return res.status(404).send({message:"User Not found"});
                            }
                            user.status = "Active";
                            this.userService.updateOne(user._id, user)
                                     .then((user)=>{
                                         console.log(user)
                                        res.status(200).send({message:"User Verified"});  
                                     })

                            next()
                         }).catch((e)=>{ console.log("error", e)})


    }

}
module.exports = UserController

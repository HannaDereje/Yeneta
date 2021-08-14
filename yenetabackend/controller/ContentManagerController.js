class ContentManagerController {

    constructor(contentManagerService, userService) {

        this.contentManagerService = contentManagerService;
        this.userService = userService
        this.register = this.register.bind(this)
        this.getProfileInfo = this.getProfileInfo.bind(this)

    }

    async register(req, res, next){

       

        var errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).send(errors);
        }
      return this.roleService.getOne("TEACHER")
           .then((role)=>{

           let user ={
               username:req.body.username,
               password:bcrypt.hashSync(req.body.password, 10),
               email:req.body.email,
               accessToken:crypto.randomBytes(16).toString('hex'),
               role:role._id
               }

                                       
               this.userService.getOneByEmail(req.body.email)
               .then((userfromdata)=>{

                   if(userfromdata){
                      return res.status(200).json("email found")
                   }
                   else{

                       this.userService.insert(user)
                       .then((user)=>{

                           const message = `
                           <h1>Email Confirmation</h1>
                           <h2>Hello ${req.body.name}</h2>
                           <p>Thank You for subscribing. Please confirm your email by clicking the following link</p>
                           <a href = http://localhost:5000/confirm/${user.accessToken}>Click Here</a>
                           `;
                           this.sendEmail(user.email, "Registeration", message)

                           let teacher = {
                               name:req.body.name,
                               email:req.body.email,
                               experience:req.body.experience,
                               job:req.body.job,
                               user:user._id
                           }

                           this.contentManagerService.insert(teacher)
                           .then((contentManager)=>{
                               console.log(contentManager)
                       })
                           return res.status(200).send("correct")
               
                       }).catch(err=>res.json({err}))          
                           }
                           })
                                        
                           return res.status(200).send("correct")                        
                       }).
                       catch((err)=>{
                           res.send(403)
                           console.log("err");
                       })  

                     
   }

   async getProfileInfo(req, res){

    if(req.user_id === null){
        res.status(403)
        return res.send("You need to sign in.")
    }
    return  this.userService.getOne(req.user_id._id)
                    .then((user)=>{
                        this.contentManagerService.getOneByEmail(user.email)
                            .then((contentManager)=>{
                                res.status(200).json(contentManager);
                            })
                    })
}

    






}


module.exports = ContentManagerController
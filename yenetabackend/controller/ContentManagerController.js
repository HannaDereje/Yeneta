class ContentManagerController {

    constructor(contentManagerService, userService) {

        this.contentManagerService = contentManagerService;
        this.userService = userService
        this.register = this.register.bind(this)

    }

    async register(req, res, next){

       

        var errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).send(errors);
        }
       this.roleService.getOne("TEACHER")
           .then((role)=>{

           let user ={
               username:req.body.username,
               password:bcrypt.hashSync(req.body.password, 10),
               email:req.body.email,
               accessToken:crypto.randomBytes(16).toString('hex'),
               role:role._id
               }

                                        
               this.sendEmail(user.email, "Registeration", "")
                                       
               this.userService.getOneByEmail(req.body.email)
               .then((user)=>{

                   if(user){
                       res.status(200).json("email found")
                   }
                   else{
                       this.userService.insert(user)
                       .then((user)=>{

                           let teacher = {
                               name:req.body.name,
                               email:req.body.email,
                               experience:req.body.experience,
                               job:req.body.job,
                               user:user._id
                           }
                       })
                       this.contentManagerService.insert(teacher)
                           .then((student)=>{
                               console.log(teacher)
                       })
                       }
                                                           
                       })
                       })  
                     
   }

    






}


module.exports = ContentManagerController
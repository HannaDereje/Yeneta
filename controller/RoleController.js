
class RoleController{

    constructor(roleService){
        this.roleService = roleService;
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
    }

     insert(req, res){
         return  this.roleService.insert(req.body)
                                .then((response) => res.json("fine"))
                                .catch((err)=>{
                                    res.send(403)
                                    console.log("err");
                                })
    }

    getAll(req, res){
        return this.roleService.getAll()
                                .then((response) => res.json(response))
                                .catch((err)=>{
                                    res.send(403)
                                    console.log("err");
                                })
    }

}


module.exports = RoleController
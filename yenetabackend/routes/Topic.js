const TopicController = require('../controller/TopicController');
const Topic = require("../Models/Topic")
const TopicRepository = require("../repository/TopicRepository")
const TopicService = require("../service/TopicService")
const bodyParser = require("body-parser")
const topicRepo = new TopicRepository(Topic)
const topicServ = new TopicService(topicRepo)

module.exports = (server) => {
    server.use(bodyParser.json())
    server.post("/insertTopic", new TopicController(topicServ).insert)
    server.get("/getAllTopics", new TopicController(topicServ).getAll)
    server.get("/getTopic/:id", new TopicController(topicServ).getOne)
    server.put("/updateTopic/:id", new TopicController(topicServ).updateOne)
    server.delete("/deleteTopic/:id", new TopicController(topicServ).deleteOne)
    server.delete("/deleteTopics", new TopicController(topicServ).deleteAll) 
}
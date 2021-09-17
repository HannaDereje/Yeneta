const moment = require("moment");

function formatMessage (id="",like=0, report=0, username, text ){

    return{
        id,
        like,
        report,
        username,
        text,
        time:moment().format('h:mm a'),
        
    }

}

module.exports = formatMessage
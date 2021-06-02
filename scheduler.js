const axios = require('axios');
const {exec} = require('child_process');

const serverURL = "http://192.168.178.100:3000";


readNextEvent("CAM-3",
    (ret) => {
        if (ret){
            var perIniziare = parseInt(new Date(ret.data.startDate._seconds*1000) - new Date());
            console.log(' ' + perIniziare);
            if (perIniziare < 300000) {
                // lancio docker 
                // NTH - veriificare che il processo docker non sia già in eseuzione
                console.log('eccoci qua');
                            }
            else {
                // stoppo il docker
                // potrei verificare che sia in esecuzione
                console.log ('stoppo');
            }
        }
        else {
            // errore o non c'è alcun evento in programma
        }

    }
);

/*
exec('', //comando docker da eseguire
    (err, stout, stderr) => {
        if (err) {
            console.error(err);
        }
        else{
            console.log('stdout: $(stdout)');
            console.log('stderr: $(stderr)');
        }
    }
)
*/

function readNextEvent(idRberry, callback){
    axios.get(serverURL + '/event/nextEvent/' + idRberry)
        .then( res => {
            //console.log(res.data);
            return callback(res);
        })
        .catch( error => {
            //console.error(error);
            /* gestire il log su file ? */
            return callback(false);
        });
    }
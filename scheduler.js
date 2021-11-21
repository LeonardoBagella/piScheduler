const axios = require('axios');
const {exec} = require('child_process');

const serverURL = "http://192.168.178.140:3000";

const idRberry = "CAM-003";

const username = "admin";
const password = "kyklos";

const preStart =  900000; // 15 minuti = 900000 msec.

let perIniziare = 1000000000;
let eventID = '';


readNextEvent(idRberry);



async function readNextEvent(idRberry) {
    try {
        log('next event...');

        let ret = await axios.get(serverURL + '/rBerry/nextEvents/' + idRberry + '/1');
        if (ret.status != 200) return false;

        perIniziare = parseInt(new Date(ret.data.events[0].startDate._seconds*1000) - new Date());
        eventID = ret.data.events[0].eventID;

        log( eventID + ' --> ' + perIniziare + '\n');

    } catch (e) { logError(e) }

    if (perIniziare < preStart)
        try {
            log('leggo stream per eventID ' + eventID + '...\n');
            let ret = await readStreamURL(eventID);

            let streamLink = ret.data.streamData.streamURL + ret.data.streamData.streamKey
            log('streamLink: ' + streamLink);

               
            // lancio docker 
            // NTH - veriificare che il processo docker non sia già in eseuzione
            log('START del docker...');
            
            exec('sudo cp /mnt/restreamer/db/v1_start.json /mnt/restreamer/db/v1.json', 
                    (err, stout, stderr) => {
                        if (err) {
                            logError(err);
                        }
                        else{
                            log('stdout: $(stdout)');
                            log('stderr: $(stderr)');
                        }
                    })


            exec('docker run -d --restart always --name restreamer -e "RS_USERNAME=' + username + '" -e "RS_PASSWORD=' + password + '" -e "RS_MODE=RASPICAM" -e "RS_INPUTSTREAM=rtmp://localhost/live/raspicam.stream" -e "RS_OUTPUTSTREAM=' + streamLink + '" -e "RS_SNAPSHOT_INTERVAL=30s" -p 8080:8080 -v /mnt/restreamer/db:/restreamer/db -v /opt/vc:/opt/vc --privileged --tmpfs /tmp/hls datarhei/restreamer-armv7l:latest', 
                    (err, stout, stderr) => {
                        if (err) {
                            logError(err);
                        }
                        else{
                            log('stdout: $(stdout)');
                            log('stderr: $(stderr)');
                        }
                    })
            

         
            } catch (e) { logError(e) }

        else {
            // stoppo il docker
            // potrei verificare che sia in esecuzione

            log('STOP del docker...');
            
            exec('docker stop restreamer', 
                    (err, stout, stderr) => {
                        if (err) {
                            logError(err + '\n' + stderr);
                        }
                        else{
                            log(stout);
                        }
                    })

            exec('docker rm restreamer', 
                    (err, stout, stderr) => {
                        if (err) {
                            logError(err + '\n' + stderr);
                        }
                        else{
                            log(stout);
                        }
                    })

        }
}

//////////////////////////
///   INTERNAL FUNCTIONS
//////////////////////////

async function readStreamURL(eventID){
    try {
        //log('URL : ' + serverURL + '/event/eventDetails/' + eventID);
        return await axios.get(serverURL + '/event/eventDetails/' + eventID)
    } catch (e) { logError(e) }
}

    
//////////////////////////
///   LOG
//////////////////////////

function log(testo) {
    if (true)
        console.log(testo);
}

function logError(errore) {
    if (true)
        console.error(errore);
}

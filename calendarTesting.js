const axios = require('axios');

const serverURL = "http://localhost:3000";

/*
testWriteKeepAlive('CAM-001', 'ACTIVE');

testWriteKeepAlive('CAM-002', 'INACTIVE');
testWriteKeepAlive('CAM-003', 'ACTIVE');
*/


testReadKeepAlive('CAM-003');
testReadKeepAlive('CAM-002');


/*
testRegisterEvent ('CAM-001', 
    {
        basicData : {
            startDate : '2021-06-02T23:30:00',
            endDate : '2021-06-03T02:00:00',
            title : "Evento di prova 9",
            lastScreenshot : ""
        },
        streamData : {
            streamURL : "http://testImageStream.com/",
            streamKey : "asaset-4asdfsd-2453454-sdfsd449"
        }
    }       
);
*/

//testReadEventDetails ('1622664687');
//testReadEventDetails ('1622664742');

//testReadNextEvents(5);

//testReadNextEventsOnRB('CAM-003', 2);

//testReadEventsInRange({ startDay : '2021-06-02T00:00:00', endDay : '2021-06-04T00:00:00' });


/////////////////////////////////////
////
////    INTERNAL FUNCTIONS
////
/////////////////////////////////////

function testWriteKeepAlive(cam, status){
    axios.post(serverURL + '/rBerry/keepAlive/' + cam, {

            myIP : '127.0.0.' + cam,
            restreamerStatus : '' + status

        })
        .then( res => {
            console.log('sent !');
            //console.log(res);
        })
        .catch( error => {
            console.error(error);
        });
    }


function testReadKeepAlive(cam){ 
    axios.get(serverURL + '/rBerry/keepAlive/' + cam)
        .then( res => {
            console.log(res.data);
            //console.log(res);
        })
        .catch( error => {
            console.error(error);
        });
    }


function testRegisterEvent(cam, jsonData){ 
    axios.post(serverURL + '/event/registerEvent/' + cam, jsonData)
        .then( res => {
            console.log(res.data);
            //console.log(res);
        })
        .catch( error => {
            console.error(error);
        });
    }

function testReadEventDetails(idEvent){ 
    axios.get(serverURL + '/event/eventDetails/' + idEvent)
        .then( res => {
            console.log(res.data);
            //console.log(res);
        })
        .catch( error => {
            console.error(error);
        });
    }

function testReadNextEvents(days){
    axios.get(serverURL + '/event/futureEvents/' + days)
        .then( res => {
            console.log(res.data);
            //console.log(res);
        })
        .catch( error => {
            console.error(error);
        });
    }

function testReadNextEventsOnRB(idRberry, nEvents){
    axios.get(serverURL + '/rBerry/nextEvents/' + idRberry + "/" + nEvents)
        .then( res => {
            console.log(res.data);
            //console.log(res);
        })
        .catch( error => {
            console.error(error);
        });
    }

function testReadEventsInRange(jsonDateRange){
    //   (max. 50 results)
    axios.post(serverURL + '/event/rangedEvents', jsonDateRange)
        .then( res => {
            console.log(res.data);
            //console.log(res);
        })
        .catch( error => {
            console.error(error);
        });
    }
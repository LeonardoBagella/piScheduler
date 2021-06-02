const axios = require('axios');

const serverURL = "http://localhost:3000";

/*
testWriteKeepAlive('CAM-1', 'ACTIVE');
testWriteKeepAlive('CAM-2', 'INACTIVE');
testWriteKeepAlive('CAM-3', 'ACTIVE');
*/
/*
testReadKeepAlive('CAM-3');
testReadKeepAlive('CAM-2');
*/

//testReadKeepAlive('CAM-2');

/*
testRegisterEvent ('CAM-3', 
    {
        basicData : {
        startDate : '2021-05-30T17:00:00',
        endDate : '2021-05-30T19:00:00',
        title : "Evento di prova 5",
        lastScreenshot : ""
        },
        streamData : {
            streamURL : "http://testImageStream.com/",
            streamKey : "asaset-4asdfsd-2453454-sdfsd444"
        }
}
);
*/

//testReadEventDetails ('1622385394447');

//testReadNextEvents(5);

testReadDailyEvents({ startDay : new Date('2021-05-30T00:00:00'), endDay : new Date('2021-05-31T00:00:00') });


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

function testReadDailyEvents(jsonDateRange){
    axios.post(serverURL + '/event/dailyEvents', jsonDateRange)
        .then( res => {
            console.log(res.data);
            //console.log(res);
        })
        .catch( error => {
            console.error(error);
        });
    }
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

function analyse() {
    var data = fetchPostureData();
    if(!data){
        // probe(2000);
        // setTimeout('probe(1000)',3000);

        probe(1000);
        
    }
    console.log(postureMatrix +" |sum: "+ sum);
}

function probe(duration){
console.log("probing...")
console.log(navigator.vibrate([duration]));
}

function fetchPostureData(){
        
         if(!postureMatrixAlgo())
             return false;
         
         return true
}
var sum =0;
function postureMatrixAlgo(){
    sum = 0;
    var pos = postureMatrix.lastIndexOf(0);

    console.log(" calculating from position :" + pos);
    for(i = pos ; i< (postureMatrix.length); i++){
        sum = sum + parseInt(postureMatrix[i]);
    }
    
    if(sum < 0){
        console.log("wrong posture bro...");
        return false;
    }

    return true;
}

var pusher = new Pusher('b00c70560730e1432e13');
var channel = pusher.subscribe('test_channel');

channel.bind('my_event', handleMyEvent);

function handleMyEvent(serverdata) {
      var data = serverdata.message;
      console.log(data);
      if(data !== 'Perfect' && data !=='Empty Chair'){
        postureMatrix.push(-1);
      }  
      else if(data === 'Perfect'){
        postureMatrix.push(1);
      }
      else if (data === 'Empty Chair'){
        postureMatrix.push(0);
      } 
      analyse();
      renderPosture(data);
    
}

var postureMatrix = [0];

function renderPosture(data){
    switch(data){
        case 'Empty Chair' :
            $('#status').html('<img src="img/Standing.png"></img>');            
            break;
        case 'Perfect' :
            $('#status').html('<img src="img/PP.png"></img>');            
            break;
        case 'Leaning Left' :
            $('#status').html('<img src="img/LL.png"></img>');            
            break;
        case 'Leaning Right' :
            $('#status').html('<img src="img/LR.png"></img>');            
            break;
        case 'Leaning Forward' :
            $('#status').html('<img src="img/LF.png"></img>');            
            break;
    }
    
}
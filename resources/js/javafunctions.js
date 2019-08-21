'use strict';
function function2 (){
    alert("Hello options page accessed on " + new Date().getDate() + " May 2019" );
}

function function1(){
    alert("login succeeded");
}

let tweetHello = document.querySelector('#tweetButton');
if(tweetHello){
    tweetHello.addEventListener('click', function(){
        let xhr = new XMLHttpRequest();
        xhr.open('POST','/tweet');
        xhr.setRequestHeader('Content-Type','application/json');
        let helloNew = {
            text: 'test'
        };

        xhr.send(JSON.stringify(helloNew));

        // console.log('newHello');
    });
}else{
    console.log('sadness');
}

function function3(){
    function1();
    function2();
}
function3();
 
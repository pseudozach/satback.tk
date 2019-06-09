console.log("satback by pseudozach started");

// var debug = true;
var debug = false;
if(debug){
  var survey;
  setTimeout(function(){
    showProfile(null,"pz.id");
    glusername = "pz.id";
    survey = {key:123,  question_1:"wtf", created_at:123123, budget:99};
  }, 3000);
}


document.getElementById('signin-button').addEventListener('click', function() {
   blockstack.redirectToSignIn()
 })

 document.getElementById('signout-button').addEventListener('click', function() {
   blockstack.signUserOut(window.location.origin)
 })

var glusername;
 function showProfile(profile, username) {
   var person = new blockstack.Person(profile)
   // person.name()
   document.getElementById('heading-name').innerHTML = "Logged in as " + username;
   // document.getElementById('avatar-image').setAttribute('src', person.avatarUrl())
   // $("#logoutbutton").show();
   if(username == null && debug){
    username = "pz.id";
   }
   console.log("username: ", username);
   glusername = username;
   // document.getElementById('section-1').style.display = 'none'

   // var pageurl = window.location.href;
   // if(pageurl.includes("mysurveys=true")){
   // } else {
   // }

   $("#landingcard").hide();
   $("#formcard").hide();
   $("#profileli").show();

   var addsurveybutton = '<a class="btn-floating btn-lg cyan addsurveybutton" style="margin: auto; display: block;margin-top: 10px;" id="" data-toggle="tooltip" data-placement="top" title="Add Survey"><i class="fas fa-plus"></i></a>';
   $("#surveyscard").append(addsurveybutton);

   
   populateMySurveys(glusername);

   // document.getElementById('section-2').style.display = 'block'
 }

 if (blockstack.isUserSignedIn()) {
  const userData = blockstack.loadUserData()
   showProfile(userData.profile, userData.username)
 } else if (blockstack.isSignInPending()) {
   blockstack.handlePendingSignIn()
   .then(userData => {
     showProfile(userData.profile, userData.username)
   })
 }


// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.fixed-action-btn');
//     var instances = M.FloatingActionButton.init(elems, options);
//   });

//   // Or with jQuery

//   $(document).ready(function(){
//     $('.fixed-action-btn').floatingActionButton();
//   });


// firebase.auth().signInAnonymously().catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     console.log("signin err: ", errorCode, errorMessage);
//     // ...
// });

// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//         // User is signed in.
//         var isAnonymous = user.isAnonymous;
//         var uid = user.uid;
//         console.log("User signed in: ", uid);
// //         setTimeout(function(){checkCoin();}, 2000);

//         //add duckhunt.js
// //        var script2= document.createElement('script');
// //        script2.id = "dhunt";
// //        script2.src= 'duckhunt.js';
// //        document.body.appendChild(script2);

//         var balancestr = "/balance";
//         var ccurr = " Sats";
        
//   //      var ccurr = " tSats";
//   //      if(ismainnet) {
//   //        balancestr = "/mnbalance";
//   //        ccurr = " Sats";
//   //      }
  
//         if(firebase.auth().currentUser != null && firebase.auth().currentUser.uid != null) {
//           var userId = firebase.auth().currentUser.uid;
//           var balanceRef = firebase.database().ref("user-info/" + userId + balancestr);
//           balanceRef.on('value', function(snapshot2) {
//             var balance = snapshot2.val();
//             if(balance == null || balance == undefined) {
//               balance = 0;
//             }
//              console.log("balance on onAuthStateChanged ", balance);
  
//             // if(balance > 0) {
//               // var userBalance = fullObj.balance; //sats
//               var balanceint = parseInt(balance);
//               $("#balance").text(" Balance: " + balanceint + ccurr);
//               $("#balanceli").css("display", "block");
//               // console.log("balance set");
//             // }
//           });
//         }

        


//     } else {
//         console.log("user could not be logged in...");
//     }
// });


//var msglistenerref;
var optionno = 3; //init option count
var questionno = 2;
$(function(){
    
    //check if poll view/result
    var pageurl = window.location.href;
    if(pageurl.includes("pollId")){
        var pollId = pageurl.split("pollId=")[1].split("&")[0];
        console.log("signed in coming with link pollId: ", pollId);
        $("#landingcard").hide();
        $("#formcard").show();
        $("#spinner").show();
        $("#fundingcontainer").hide();
        $("#surveyscard").hide();
        // $("#surveyheader").text("Survey #"+pollId.slice(-4));
        $("#surveyheader").text("Survey #" + pollId.slice(-4));
        
        firebase.database().ref("lightpoll/" + pollId).once("value", function(snapshot){
           if(snapshot != null && snapshot.val() != null && snapshot.val().paid){
               var pollobj = snapshot.val();
               for(var j=1;j<pollobj.questioncount+1;j++){

                var questionx = '<div class="md-form" style="margin-top: 2.5rem;">'+
                  '<input type="text" id="form'+j+'" class="form-control">'+
                 '<label for="form'+j+'">'+j+'. Question</label>'+
                '</div>'+
                
                '<div class="md-form input-group mb-0">'+
                  '<div class="input-group-prepend">'+
                    '<div class="input-group-text md-addon">'+
                      '<input class="form-check-input" type="radio" id="exampleRadios'+j+'_1" value="option'+j+'_1" disabled name='+j+'>'+
                        '<label class="form-check-label" for="exampleRadios'+j+'_1"></label>'+
                    '</div>'+
                  '</div>'+
                  '<input type="text" class="form-control" aria-label="Text input with radio button" id="option'+j+'_1text" placeholder="Option '+j+'_1">'+
                '</div>'+
                
                '<div class="md-form input-group mb-0" id="option'+j+'_2group">'+
                  '<div class="input-group-prepend">'+
                    '<div class="input-group-text md-addon">'+
                      '<input class="form-check-input" type="radio" name='+j+' id="exampleRadios'+j+'_2" value="option'+j+'_2" disabled>'+
                        '<label class="form-check-label" for="exampleRadios'+j+'_2"></label>'+
                    '</div>'+
                  '</div>'+
                  '<input type="text" class="form-control" aria-label="Text input with radio button" id="option'+j+'_2text" placeholder="Option '+j+'_2">'+
                '</div>'+
                
                '<a class="btn-floating btn-sm cyan addoptionbutton" style="margin: auto; display: block;margin-top: 10px;" id="" data-toggle="tooltip" data-placement="top" title="Add Option"><i class="fas fa-plus"></i></a>';
                
                if(j!=1)
                $("#addquestionbutton").before(questionx);





                  $("#form"+j).trigger("focusin");
                  $("#form"+j).val(pollobj["question_"+j]);
                  $("#form"+j).css("border-bottom", "none")
                  $("#form"+j).attr("readonly","");


                  var tqoc=2;
                  for(var k=2;k<pollobj.optioncount+1;k++){
                    // console.log("option"+j+"_"+k+"text");
                    if(pollobj["option"+j+"_"+k+"text"]){
                      tqoc = k;
                    } else {
                      break;
                    }
                  }
                  // console.log("tqoc: ", tqoc);




                for(var i=1;i<tqoc+1;i++){

                   if(i>=3 && !$("#option"+(i).toString()+"group").length){
                       //just the ones after 2
//                       console.log("i, adding: ", i);


       var optionx = '<div class="md-form input-group mb-0" id="option'+j+'_'+i+'group"><div class="input-group-prepend">' +
                    '<div class="input-group-text md-addon">' +
                      '<input class="form-check-input" type="radio" id="exampleRadios'+j+'_'+i+'" ' + 'value="option'+j+'_'+i+'" disabled name='+j+'>' +
                        '<label class="form-check-label" for="exampleRadios'+j+'_'+i+'"></label></div></div>' +
                  '<input type="text" class="form-control" aria-label="Text input with radio button" id="option'+j+'_'+i+'text" placeholder="Option '+i+'"></div>';
        // var addafter = "#option"+(optionno-1).toString()+"group";
        // $(addafter).after(optionx);
        // $(this).prev().after(optionx);



//                        var optionx = '<div class="md-form input-group mb-0" id="option'+i+'group"><div class="input-group-prepend">' +
//                         '<div class="input-group-text md-addon">' +
//                           '<input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios'+i+'" ' + 'value="'+i+'" disabled>' +
//                             '<label class="form-check-label" for="exampleRadios'+i+'"></label></div></div>' +
//                       '<input type="text" class="form-control" aria-label="Text input with radio button" id="option'+i+ 
//                                 'text" placeholder="Option '+i+'"></div>';
// //                       <div class="input-group-append">' +
// //                           '<span class="input-group-text md-addon">'+pollobj[pollobj["option"+i+"text"]]+'</span></div>
                        var addafter = "#option"+j+"_"+(i-1).toString()+"group";
                        $(addafter).after(optionx);
                   }
                   $("#option"+j+"_"+i+"text").val(pollobj["option"+j+"_"+i+"text"]);
                   $("#exampleRadios"+j+"_"+i).val(pollobj["option"+j+"_"+i+"text"]);
                   $("#exampleRadios"+j+"_"+i).attr("disabled", false);
                   $("#option"+j+"_"+i+"text").attr("readonly","");


                   if(window.location.href.includes("result=true")){
                     //add votes of each option next to it
                      $("#option"+j+"_"+i+"text").after('<p style="margin: auto;"><i class="fas fa-vote-yea"></i> '+pollobj["option"+j+"_"+i+"vote"]+'</p>');
                   }
                   //result & text for each option
//                   console.log(pollobj, pollobj[pollobj["option"+i+"text"]], pollobj.voteCount, (parseInt(pollobj[pollobj["option"+i+"text"]]) / pollobj.voteCount) );
                   if(pollobj.voteCount > 0){
                       var perct = parseInt((parseInt(pollobj["option"+j+"_"+i+"vote"]) / pollobj.voteCount) * 100);
                   } else {
                       var perct = 0;
                   }
                   
//                   console.log("perct: ", perct);
                   if($("#optioncount"+i).length){
                       $("#optioncount"+i+" span").text(" %" + perct);
                   } else {
                       var countelement = '<div class="input-group-append optioncountcl"'+
                           'id="optioncount'+i+'" style="display:none;">' +
                       '<span class="input-group-text md-addon"> %'+perct.toFixed(0)+'</span></div>';
                       $("#option"+i+"text").after(countelement);
                   }
                   
                   if(!$("#voteCount").length && pollobj.created_at != null){
                       $("#votebutton").after('<div style="margin-top: 10px;display:none;" id="totalvoteholder"><span id="voteCount">Total: ' + pollobj.voteCount +  ' votes</span><span style="float:right;">Created on '+ new Date(pollobj.created_at).toLocaleDateString()+'</span></div>');
                   } else {
                       $("#voteCount").text('Total: ' + pollobj.voteCount +  ' votes');
                   }
                   
                   
               }







               }


               // $("#form1").trigger("focusin");
               // $("#form1").val(pollobj.question);
               // $("#form1").attr("readonly","");

               
                           
               //buttons and view
               $("#savepollbutton").hide();
               $("#votebutton").show();
               $(".addoptionbutton").hide();
               $("#addquestionbutton").hide();
               $("#price").attr("readonly","");
               
               $("#price").val(pollobj.price);
               $("#feesatoshi").text(pollobj.price);
               
               var votetype = "pays";
               if(pollobj.votetype && pollobj.votetype == "pays"){
                   votetype = pollobj.votetype;
                   
                   $("#voterpayreqcontainer").show();
               }
               $("#votetypespan").text(votetype);
               
               
               
                if(window.location.href.includes("result=true")){
                    //show results already
                    $(".optioncountcl").show();
                    $("#totalvoteholder").show();
                    
                   // sharelink
                   $("#sharecontainer").show();
                   $("#polllinktext").val(window.location.href.split("&result")[0]);

                   //admin need not vote
                   $("#voterpayreqcontainer").hide();
                   $("#votebutton").attr("disabled","disabled");
                   $("#fundingcontainer").hide();
                    
                   if(votetype == "pays"){
                        //show budget + refill
                        $(".budgetcl").show();
                        $("#budgettext").text(pollobj.budget + " Satoshis");   
                   }
                    
//                    also check if newly created - &created=true
                    if(window.location.href.includes("&created=true")){
                        $("#resultcontainer").show();
                        $("#resultlinktext").val(window.location.href.split("&created")[0]);
                    }
                    
                }
               
//               if(window.location.href.includes("withdrawcode=")){
//                   
//                   var withdrawcode = window.location.href.split("withdrawcode=")[1];
//                   $("#withdrawcontainer").show();
//                   
//                    //show results already
////                    $(".optioncountcl").show();
////                    $("#totalvoteholder").show();
//                    
//                   // sharelink
////                   $("#sharecontainer").show();
////                   $("#polllinktext").val(window.location.href.split("&result")[0]);
////                    
//////                    also check if newly created - &created=true
////                    if(window.location.href.includes("&created=true")){
////                        $("#resultcontainer").show();
////                        $("#resultlinktext").val(window.location.href.split("&created")[0]);
////                    }
//                    
//                }
               
               $("#spinner").hide();
           } else {
               console.log("doesnt exist or not paid");
               Snackbar.show({text: 'Survey does not exist or not paid.' ,pos: "bottom-center", duration:0, showAction: true, actionText:"Go to Home", onActionClick: function(element){window.location.href="./"}});
           } 
        });
        
        $("#votebutton").click(function(){
//            $(".card-body input").each(function() {
//                if(inputId.includes("Radio") && ){
//                    pollobj.question = inputText;
//                }
//            });
            
            //checks?

            //changing the voting mechanism
//            var voteoption = $('input[type=radio]:checked').val();
            if($('input[type=radio]:checked').attr("id") == null){
                 Snackbar.show({text: 'Please make a selection.' ,pos: "bottom-center"});
                return false;
            }

            var voterpayreq = $("#voterpayreqtext").val();
            if(voterpayreq == null || voterpayreq == ""){
              Snackbar.show({text: 'Invoice is required for now.' ,pos: "bottom-center"});
                return false;
            }
            
            $("#votesavecheck").hide();
            $("#votesavespin").show();
            
            var voteoption = "option"+$('input[type=radio]:checked').attr("id").split("exampleRadios")[1]+"vote";
                // console.log("voteoption: " + voteoption);

            //this needs to be an array or something
            var allvoteoptions = [];

            $("input[type=radio]:checked").each(function() {
              allvoteoptions.push("option"+$(this).attr("id").split("exampleRadios")[1]+"vote");

              // if(this.value == "No" && this.checked == true)
              // {
              //    result = "fail";
              //    return false;
              // }
            });
            console.log("allvoteoptions: ", allvoteoptions);

            
               votePoll(pollId, voteoption,allvoteoptions, voterpayreq); 
        });
        
    } else {
        //no pollId in url
        // console.log("no pollId in url");

        //check if poll view/result
        var pageurl = window.location.href;
        if(pageurl.includes("mysurveys=true")){
          if (blockstack.isUserSignedIn()) {
            const userData = blockstack.loadUserData()
            showProfile(userData.profile, userData.username)
            $("#landingcard").hide();
            $("#formcard").hide();

          } else {
            console.log("not logged in");
          }
            // var pollId = pageurl.split("pollId=")[1].split("&")[0];
            // console.log("signed in coming with link pollId: ", pollId);
            // $("#landingcard").hide();
            // $("#formcard").show();


        }


        $("#votetypedropdown").attr("disabled", false);
        $("#votetypespan").hide();
        $("#votetypedropdown").show();
    }
    
    $(document).on('click', '.addoptionbutton',
    // $(".addoptionbutton").click(
      function(){
        var questionnr = $(this).prev().attr("id").split("option")[1].split("group")[0].split("_")[0];
        var optionnr = parseInt($(this).prev().attr("id").split("option")[1].split("group")[0].split("_")[1]) + 1;
        // console.log("qo: ", questionnr, optionnr);
        var optionx = '<div class="md-form input-group mb-0" id="option'+questionnr+'_'+optionnr+'group"><div class="input-group-prepend">' +
                    '<div class="input-group-text md-addon">' +
                      '<input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios'+questionnr+'_'+optionnr+'" ' + 'value="option'+questionnr+'_'+optionnr+'" disabled>' +
                        '<label class="form-check-label" for="exampleRadios'+questionnr+'_'+optionnr+'"></label></div></div>' +
                  '<input type="text" class="form-control" aria-label="Text input with radio button" id="option'+questionnr+'_'+optionnr+'text" placeholder="Option '+optionnr+'"></div>';
        // var addafter = "#option"+(optionno-1).toString()+"group";
        // $(addafter).after(optionx);
        $(this).prev().after(optionx);
        // optionno++;
        
    });


    $("#addquestionbutton").click(function(){

          var questionx = '<div class="md-form">'+
                  '<input type="text" id="form'+questionno+'" class="form-control">'+
                 '<label for="form'+questionno+'">'+questionno+'. Question</label>'+
                '</div>'+
                
                '<div class="md-form input-group mb-0">'+
                  '<div class="input-group-prepend">'+
                    '<div class="input-group-text md-addon">'+
                      '<input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios'+questionno+'_1" value="option'+questionno+'_1" disabled>'+
                        '<label class="form-check-label" for="exampleRadios'+questionno+'_1"></label>'+
                    '</div>'+
                  '</div>'+
                  '<input type="text" class="form-control" aria-label="Text input with radio button" id="option'+questionno+'_1text" placeholder="Option 1">'+
                '</div>'+
                
                '<div class="md-form input-group mb-0" id="option'+questionno+'_2group">'+
                  '<div class="input-group-prepend">'+
                    '<div class="input-group-text md-addon">'+
                      '<input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios'+questionno+'_2" value="option'+questionno+'_2" disabled>'+
                        '<label class="form-check-label" for="exampleRadios'+questionno+'_2"></label>'+
                    '</div>'+
                  '</div>'+
                  '<input type="text" class="form-control" aria-label="Text input with radio button" id="option'+questionno+'_2text" placeholder="Option 2">'+
                '</div>'+
                
      '<a class="btn-floating btn-sm cyan addoptionbutton" style="margin: auto; display: block;margin-top: 10px;" id="" data-toggle="tooltip" data-placement="top" title="Add Question"><i class="fas fa-plus"></i></a>';
      $("#addquestionbutton").before(questionx);
      questionno++;


    });
    
    $(document).on('click', '.addsurveybutton',function(){
      $("#formcard").show();
      $("#surveyscard").hide();
    });

    $("#savepollbutton").click(function(){
        
        //extra checks
        if($("#form1").val() == "" || $("#price").val() == "" || $("#fundingtext").val() == ""){
            alert("empty fields");
            $("#addoptionbutton").removeClass("disabled");
            $("#savepollbutton").prop("disabled",false);
            $("#savecheck").show();
            $("#savespin").hide();
            return false;
        }
        
        if(parseInt($("#fundingtext").val()) < parseInt($("#price").val())){
          Snackbar.show({text: 'Funding can not be less than survey payment' ,pos: "bottom-center"});
          $("#addoptionbutton").removeClass("disabled");
            $("#savepollbutton").prop("disabled",false);
            $("#savecheck").show();
            $("#savespin").hide();
          return false;
        }
//        $("#spinner").show();
        
        //loading
        $("#addoptionbutton").addClass("disabled");
        $("#savepollbutton").prop("disabled",true);
        $("#savecheck").hide();
        $("#savespin").show();
        
        var optioncounter = 0;
        var questioncounter = 0;
        var pollobj = {};
        $(".card-body input").each(function() {
            var inputId = this.id;
            var inputText = $(this).val();
//            console.log(this.id);
//            console.log($(this).val());
            if(inputId.includes("form") && inputText != ""){
                pollobj["question_"+inputId.split("form")[1]] = inputText;
                questioncounter++;
            }
            if(inputId.includes("option") && inputText != ""){
                // inputId.split("option")[1].split("text")[0].sp
                pollobj[inputId] = inputText;
//                pollobj[inputText.toString()] = 0;
                pollobj[inputId.replace("text", "vote")] = 0;
                optioncounter++;
            }
            if(inputId.includes("price") && inputText != ""){
                pollobj[inputId] = inputText;
            }
        });
        pollobj["optioncount"] = optioncounter;
        pollobj["questioncount"] = questioncounter;
        pollobj["votetype"] = "pays";
        // $("#votetypedropdown").text().toLowerCase();
        pollobj["funding"] = $("#fundingtext").val();
       console.log("pollobj: ", pollobj);
        createPoll(pollobj, optioncounter);
//        Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"
        
    });
    
    
    
    $("#withdrawBalance").click(function() {
    
        if($("#form29").val() == null || $("#form29").val() == ""){
        Snackbar.show({text: 'Payment request can not be empty.' ,pos: "bottom-center"});
        return false;
        
    }
    
    Snackbar.show({text: 'Withdrawal requested, please wait...' ,pos: "bottom-center"});
    
    var lnendpoint = "https://aqueous-fjord-19834.herokuapp.com";
    var wdendpoint = lnendpoint + "/withdrawreqlndirect";
    var userId = null;
    if(firebase.auth().currentUser != null && firebase.auth().currentUser.uid != null) {
      userId = firebase.auth().currentUser.uid;
    }
    // if(ismainnet) {
    //   var wdstr = "bolt11=" + $("#form29").val() + "&userId=" + userId + "&mainnet=true";
    // } else {
      var wdstr = "bolt11=" + $("#form29").val() + "&userId=" + userId;
    // }
  
  
    // var str = $( "form" ).serialize();
    console.log("withdrawlnreq: " + wdstr);
  
    var contenttype = 'application/x-www-form-urlencoded'; //; charset=UTF-8"
  
    $.ajax({
        url : wdendpoint,
        type : 'GET',
        // data : {
        //     'numberOfWords' : 10
        // },
        data: wdstr,
        contentType: contenttype,
        // dataType: dataJson,
        success : function(data) {
            // console.log("Server returned: "  + data);
            $("#balanceModal").modal("hide");
  
            if(data.indexOf("heyo") !== -1) {
              var preimage = data.split(",")[1];
              // duration:0, showAction: true, actionText:"Deal Again", onActionClick: function(element){reeldagit();}
              Snackbar.show({text: 'Invoice paid.' ,pos: "bottom-center"});
              // \npayment_preimage: ' + preimage
  
            } else {
                var errormsg = data.split(",")[1];
              Snackbar.show({text: 'Invoice not paid. Try again later. Error: '+errormsg,pos: "bottom-center"});
            }
  
        },
        error : function(request,error)
        {
            $("#balanceModal").modal("hide");
            console.log("withdrawBalance error Server Request: "+JSON.stringify(request) + "error: " + error);
            Snackbar.show({text: 'Invoice still pending. Wait & try again later. ',pos: "bottom-center"});
        }
    });
  
  });
    
    
    $("#balanceli").click(function(){
       if(webln){
           var satbalance = parseInt($("#balance").text().split(" Balance: ")[1].split(" Sats")[0]);
           sendWebLnPayment(satbalance);
       } 
    });
    
    $(".vtdrop").click(function(e){
//        var txt = $(e.target).text();
        $("#votetypedropdown").text($(e.target).text());
        
        if($(e.target).text().toLowerCase() == "pays"){
           $("#fundingcontainer").show();
        } else {
            $("#fundingcontainer").hide();
        }
        
//        console.log(txt);
    });
        
    
    $("#budgetrefillbutton").click(function(){
       var refillamount = $("#budgetrefilltext").val();
        if(refillamount != ""){
            refillPoll(refillamount);
        } else {
            Snackbar.show({text: 'Enter an amount to refill the Poll budget.' ,pos: "bottom-center"});
        }
        
    });
//    $("#form-check-input").    

    new ClipboardJS('.btncopy');
    
    $("#copyinvoicebutton").click(function(){
        $("#copyinvoicebutton").html('<i class="fas fa-check ml-2" aria-hidden="true"></i> Copied');
        setTimeout(function(){
            $("#copyinvoicebutton").html('<i class="fas fa-copy ml-2" aria-hidden="true"></i> Copy');
        }, 1500);
    });
    
    $("#polllinkcopybutton").click(function(){
        $("#polllinkcopybutton").html('<i class="fas fa-check ml-2" aria-hidden="true"></i> Copied');
        setTimeout(function(){
            $("#polllinkcopybutton").html('<i class="fas fa-copy ml-2" aria-hidden="true"></i> Copy');
        }, 1500);
    });
    
    $('[data-toggle="tooltip"]').tooltip();
    
    setupWebLN();

}); //end of ready


function populateMySurveys(userId){
    // var userhassurvey = false;
    $("#surveyscard").show();


    firebase.database().ref("lightpoll").once("value", function(snapshot){
     if(snapshot.exists() && snapshot != null && snapshot.val() != null){
         snapshot.forEach(child => {
            var survey = child.val();
            if(survey.userId == userId && survey.paid){
              // console.log("setting surveyscard show");
              
              var surveydate = new Date(survey.created_at).toString().split(" GMT")[0];
              // console.log(surveydate.toString().split(" GMT")[0]);

              var summarycard = '<div class="card" style="margin-top: 10px;">'+

                  '<div class="view overlay">'+
                  '<h4 class="cardhead warning-color" style="text-align: center;margin-bottom: 0;">Survey #'+ child.key.slice(-4) + 
                  '</h4>'+
                  //   // '<img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/food.jpg" alt="Card image cap">'+
                  //   // '<a>'+
                  //   //   '<div class="mask rgba-white-slight"></div>'+
                  //   // '</a>'+
                  '</div>'+

                  '<a class="btn-floating btn-action ml-auto mr-4 special-color lighten-3" href="./?pollId='+child.key+'&result=true"><i class="fas fa-chevron-right pl-1"></i></a>'+

                  '<div class="card-body">'+
                    '<h4 class="card-title">'+survey.question_1+'</h4>'+
                    // '<hr>'+
                    '<p>...</p>'+
                    // '<p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>'+
                  '</div>'+

                  '<div class="rounded-bottom special-color lighten-3 text-center pt-3">'+
                    '<ul class="list-unstyled list-inline font-small">'+
                      '<li class="list-inline-item pr-2 white-text" data-toggle="tooltip" data-placement="top" title="Survey Date"><i class="far fa-clock pr-1"></i>'+surveydate+'</li>'+
                      '<li class="list-inline-item pr-2" data-toggle="tooltip" data-placement="top" title="Number of Responses"><a class="white-text"><i class="far fa-comments pr-1"></i>'+survey.voteCount+'</a></li>'+
                      '<li class="list-inline-item pr-2" data-toggle="tooltip" data-placement="top" title="Remaining Survey Budget"><a class="white-text"><i class="fas fa-wallet pr-1"> </i>'+survey.budget+'</a></li>'+
                      // '<li class="list-inline-item"><a href="#" class="white-text"><i class="fab fa-twitter pr-1"> </i>5</a></li>'+
                    '</ul>'+
                  '</div>'+

                '</div>';

                $("#surveyscard").append(summarycard);


            } else {
              // console.log("survey.userId dont match");
            }
         });



     } else {
      console.log("no surveys");
     }

     $('[data-toggle="tooltip"]').tooltip();
   });





}


//new backend
var locallnendpoint = "http://localhost:5000";
var lnendpoint = "https://aqueous-fjord-19834.herokuapp.com";

function createPoll(pollObject){
    voting = false;
    refilling = false;
//    var str = "phoneNo=" + phoneNo + "&userId=" + uid;
//    "poll=" + 
    // pollObject.userId = firebase.auth().currentUser.uid;

    var chargeamount = 100 + parseInt(pollObject.funding);
    $("#feesatoshi").text(chargeamount);

    pollObject.userId = glusername;
    pollObject.customdesc = "Create Survey on Satback.tk";

    var str = JSON.stringify(pollObject);
    console.log("query: ", lnendpoint + "/createpoll" + str);
    $('#pickCardModal').modal("show");
    
    //DEBUG
//    console.log("DEBUG!!!!");
//    return false;
    
    //AJAX to server and get invoice
    $.ajax({
      url : lnendpoint + "/createpoll",
      type : 'POST',
      // data : {
      //     'numberOfWords' : 10
      // },
      data: str,
        contentType: 'application/json', 
    //              contentType: contenttype,
      // dataType: dataJson,
      success : function(data) {
    //                   console.log("listenmsg Server returned: "  + data);

          var orderId = data.split(",")[1];
          var pwstr = data.split(",")[2];
          var obfOrderId = orderId.replace(/[^0-9a-z]/gi, '');
          //start checking for invoice payment
          checkInvoice(obfOrderId, orderId, pwstr);

      },
      error : function(request,error)
      {
          console.log("error Server Request: "+JSON.stringify(request) + "error: " + error);
      }
    });
}

function votePoll(pollId, voteoption,allvoteoptions, voterpayreq){
    voting = true;
    refilling = false;
    var str = "pollId=" + pollId + "&voteoption=" + voteoption + "&voterpayreq=" + voterpayreq + "&allvoteoptions=" + allvoteoptions;
//    "poll=" + 
//    var str = JSON.stringify(pollObject);
    // $("#paymentstatus").text("Creating Invoice...");
//    console.log("query: ", lnendpoint + "/votepoll?" + str);
   // $('#pickCardModal').modal("show");
//    return false;
    
    //AJAX to server and get invoice
    $.ajax({
      url : lnendpoint + "/votepoll",
      type : 'GET',
      // data : {
      //     'numberOfWords' : 10
      // },
      data: str,
    //              contentType: contenttype,
      // dataType: dataJson,
      success : function(data) {
    //                   console.log("listenmsg Server returned: "  + data);

          if(data.includes("fail")){
              console.log("votePoll req failed: ", data);
              $('#pickCardModal').modal("hide");
              Snackbar.show({text: 'Error: '+data ,pos: "bottom-center"});
              $("#votesavecheck").show();
              $("#votesavespin").hide();
              
          } else {
              if(voterpayreq != ""){
                  
                  setupAfterVoting();
                  $("#voterpayreqtext").val("");
//                  , duration:0, showAction: true, actionText:"Go to Results", onActionClick: function(element){window.location.href=window.location.href+"&result=true";}
                  Snackbar.show({text: 'Payment sent!' ,pos: "bottom-center"});
              } else {
                  Snackbar.show({text: 'Thanks for completing the survey.' ,pos: "bottom-center"});
                  // var orderId = data.split(",")[1];
                  // var pwstr = data.split(",")[2];
                  // var obfOrderId = orderId.replace(/[^0-9a-z]/gi, '');
                  // //start checking for invoice payment
                  // checkInvoice(obfOrderId, orderId, pwstr);  
              }
                           
          }
          

      },
      error : function(request,error)
      {
          console.log("error Server Request: "+JSON.stringify(request) + "error: " + error);
      }
    });
}

var refilling = false;
function refillPoll(budgetamount){
    voting = false;
    refilling = true;
    var pollId = window.location.href.split("pollId=")[1].split("&")[0];

    var customdesc = "Refill budget for Satback Survey " + pollId;

    var str = "pollId=" + pollId + "&amount=" + budgetamount + "&customdesc="+customdesc;

    $("#feesatoshi").text(budgetamount);
//    "poll=" + 
//    pollObject.userId = firebase.auth().currentUser.uid;
//    var str = JSON.stringify(pollObject);
    console.log("query: ", lnendpoint + "/refillPoll" + str);
    $('#pickCardModal').modal("show");
    
    //DEBUG
//    console.log("DEBUG!!!!");
//    return false;
    
    //AJAX to server and get invoice
    $.ajax({
      url : lnendpoint + "/refillbudget",
      type : 'GET',
      // data : {
      //     'numberOfWords' : 10
      // },
      data: str,
        contentType: 'application/json', 
    //              contentType: contenttype,
      // dataType: dataJson,
      success : function(data) {
    //                   console.log("listenmsg Server returned: "  + data);

          var orderId = data.split(",")[1];
          var pwstr = data.split(",")[2];
          var obfOrderId = orderId.replace(/[^0-9a-z]/gi, '');
          //start checking for invoice payment
          checkInvoice(obfOrderId, orderId, pwstr);

      },
      error : function(request,error)
      {
          console.log("error Server Request: "+JSON.stringify(request) + "error: " + error);
      }
    });
}

function checkInvoice(obfOrderId, orderId, pwstr) {
  // var str = $( "form" ).serialize();
//   console.log("zitoshi checkInvoice: " + orderId);

  var orderPaymentStateRef = firebase.database().ref("lnorders/" + orderId + '/payment_paid');
  orderPaymentStateRef.on('value', function(snapshot) {
    var isPaid = snapshot.val();
    // console.log("isPaid: " + isPaid);
    if(isPaid) {
      paymentReceived(orderId, pwstr);
      orderPaymentStateRef.off();
    } else {
      console.log("not paid yet.");
    }

  });

  var orderInvoiceRef = firebase.database().ref("lnorders/" + orderId + '/invoice');
  orderInvoiceRef.on('value', function(snapshot) {
    var invoice = snapshot.val();
    //  console.log("fetching invoice: " + JSON.stringify(invoice));
    // console.log("invoice triggered: " + invoice.payreq);

    var payReqString = "";
//      apptype == "paybear" && 
    if(invoice && invoice.payment_request) {
      // $("#orderId").text(orderIdString);
//       console.log("ln payment requested");
      payReqString = invoice.payment_request;
    } else if(invoice && invoice.lightning_invoice.payreq) {
      console.log("opennode ln payment requested");
      payReqString = invoice.lightning_invoice.payreq;
    } else {
       console.log("payreq value issue");
    }

    if(payReqString.trim().length > 0) {
      $("#qrcodeholder").empty();
      // $("#pbqrcodeholder").empty();
      payReqString = payReqString.trim();
      if(payReqString != "") {
        // console.log("setting address: ", payReqString);
        // var totalbtcamount = 100;

        // console.log("setting payment request: ", payReqString);
        new QRCode(document.getElementById("qrcodeholder"), "lightning:" + payReqString);
//        $("#lninvoiceholder").text(payReqString);
          $("#lninvoiceholder").val(payReqString);
        $("#openwithwallet").attr("href", "lightning:" + payReqString);
      } else {
        console.log("issue with payReqString");
      }
        
    }
      
      $("#paymentstatus").text("Awaiting Payment...");
      
      if(webln != null){
//        var payReqString = $("#lninvoiceholder").text();
        requestWebLnPayment(payReqString);
      }

  });

}

function toggleCheckmark() {
  $('.circle-loader').toggleClass('load-complete');
  $('.checkmark').toggle();
  // console.log("toggle checkmark");
}

var voting = false;
function paymentReceived(orderId, pwstr) {
  console.log("paymentReceived@" + new Date());

  $("#checkmarkholder")[0].scrollIntoView({behavior: "smooth", block: "start"});

  toggleCheckmark();
  invoiceTriggered = false;
  $("#paymentstatus").text("Payment Received!");
    
    if(voting){
//      console.log("voting complete!");
//      $("#votebutton").text("Voted!");
//        $("#polllinkcopybutton").html('<i class="fas fa-check ml-2" aria-hidden="true"></i> Copied');
//        $("#votebutton").html('')    
      setupAfterVoting();
        
    }
//    orderPaymentStateRef.off();
      setTimeout(function() {

        // console.log("result: ", cardResult, pickedCard);
        //if(cardResult != null && pickedCard != null) {


          if(voting){
              $('#pickCardModal').modal("hide");
//              window.location.href = window.location.href + "?pollId=" + orderId; 
          } else {
              $('#pickCardModal').modal("hide");
              if(!refilling){
                console.log("prepare new page with pollId=xxx");
                window.location.href = window.location.href + "?pollId=" + orderId+"&result=true&created=true";
              }
              if(refilling){
                window.location.reload();
              }
              
          }
          
          

      }, 1500);

}
function setupAfterVoting(){
    $("#votesavecheck").show();
      $("#votesavespin").hide();
        
        
//        console.log("voted so disable things...");
//        $(".card-body input").each(function() {
//            //disable all things
//            this.disabled = true;
//        });
        
        $("input.form-check-input").attr("disabled", true);
        
        //totals and counts show them only here.
        $(".optioncountcl").show();
        $("#totalvoteholder").show();
        
        // sharelink
       $("#sharecontainer").show();
       $("#polllinktext").val(window.location.href);

       setTimeout(function(){
        Snackbar.show({text: 'Thanks for responding to the survey 👋' ,pos: "bottom-center", duration:0, showAction: true, actionText:"Go to Home", onActionClick: function(element){window.location.href="./"}});
       }, 2000);
}
let webln;
async function setupWebLN(){
        //webln
//    console.log("setupWebLN started");
    try {
      webln = await WebLN.requestProvider();
    } catch (err) {
      // Handle users without WebLN
        console.log("no webln");
    }
}

async function requestWebLnPayment(payReqString){
    if (webln) {
        try {
          var payresponse = await webln.sendPayment(payReqString);
        } catch (err) {
          // Handle users without WebLN
//            console.log("no payment");
        }
        if(payresponse){
            console.log("preimage: ", payresponse.preimage);
        }
    }
}

async function sendWebLnPayment(amount){
    if (webln) {
        try {
          var payreq = await webln.makeInvoice(parseInt(amount));
          console.log("paymentRequest: ", payreq.paymentRequest);
        } catch (err) {
          // Handle users without WebLN
//            console.log("no WebLN");
        }
    if(payreq){
//            console.log("paymentRequest: ", payreq.paymentRequest);  
//            return payreq.paymentRequest;
            $("#form29").trigger("focusin");
            $("#form29").val(payreq.paymentRequest);
            $("#payreqinfotext").text('Payment request generated by 💎 Joule extension. Ready to withdraw.');
            $("#payreqlabel").remove();
    }
    }
}

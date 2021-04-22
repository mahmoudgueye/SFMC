<!DOCTYPE html>
<html>
<head>
 


<script runat="server">
   Platform.Load("Core", "1");


    //Levana Test credentials 
    var payload = '{"grant_type":"client_credentials",';
        payload += '"client_id":"k9scmoaewu7492ba6k7u1qpy",'; 
        payload += '"client_secret":"mHVroO1mF7D4ig2sZslGj6t1",';
        payload += '"account_id":"100012501"}';
    var OAuth2URL = "https://mcc2gk-bp085x9503lcvgdlxx944.auth.marketingcloudapis.com/v2/token";
    var contactsUrl = "https://mcc2gk-bp085x9503lcvgdlxx944.rest.marketingcloudapis.com/sms/v1/queueMO";
    var headerNames = "Authorization";
    var headerValues = "Bearer " + accessToken;
    var contentType = 'application/json';
    var content = [0];


   function GenerateToken(){
     /* get OAuth 2.0 access token */
          /*var payload = '{"grant_type":"client_credentials",';
                payload += '"client_id":"3w9agimw025115rp3s68a3m8",';
                payload += '"client_secret":"dNP9ElFG7oyyhjpWyVMaUOHK",';
                payload += '"account_id":"100002384"}';
          var OAuth2URL = "https://mc1bc8d27m8kpk5ywx0410qk15t4.auth.marketingcloudapis.com/v2/token";*/

             
          var contentType = 'application/json';
          var accessTokenResult = HTTP.Post(OAuth2URL, contentType, payload);
          var tokenObj = Platform.Function.ParseJSON(accessTokenResult["Response"][0]);
          var accessToken = tokenObj.access_token;
          var headerNames = ["Authorization"];
          var headerValues = ["Bearer " + accessToken];
          return accessToken
   }

   function postQueueMOAPI(accessToken, mobileNumbers){
      try {

          var auth = 'Bearer ' + accessToken;
          //make a call using the messageContact route
          var headerNames = ["Authorization"];
          var headerValues = ["Bearer " + accessToken];


          var payload = '{"mobileNumbers": ' + Stringify(mobileNumbers) + ',';
          payload += '"shortCode": "36063",';
          payload += '"messageText": "SINGLEOPTIN"}';
          Write("<br><br> payload : "+payload+"<br><br>");
        
        var contactsUrl = "https://mcc2gk-bp085x9503lcvgdlxx944.rest.marketingcloudapis.com/sms/v1/queueMO";
            
          var resp = HTTP.Post(contactsUrl, contentType, payload, headerNames, headerValues);
            Write("<br><br> res : "+Stringify(resp)+"<br><br>");


      } catch(e) { 
                  Write("<br><br> erreur post : "+Stringify(e));
                  Write("<br><br> erreur post mobileNumbers : "+mobileNumbers+"<br><br>");
       }
   }

   function sleep(milliseconds) {
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
          break;
        }
      }
      var end = new Date().getTime();
      Write("<br><br> sleep from second : "+start+" to "+ end);
   }

   //main()
   try {

          var accessToken = GenerateToken();
          Write("<br><br> auth : "+accessToken )

          var sc = DataExtension.Init("MobileNumbersToSubscribe");
          var filter = {Property:"Mobile",SimpleOperator:"isNotNull"};
          var data = sc.Rows.Retrieve(filter);
          var dataLength = data.length;
          Write("<br><br> start dataLength[]  : "+dataLength);
          
          var mobileNumbers = []; //array of mobile numbers 
          var limitApiCalls = 2; //API call limit 
          var count = 1; //count reccords to compare to the limit of API Calls
          var cur = 0; //current DE reccord line

          if(data.length) {

            for(i=0 ; i<dataLength; i++) {
                mobileNumbers[i] = data[cur].Mobile;
                  Write("<br><br> mobileNumbers[i] : "+i+" "+mobileNumbers[i]);
                  

                  if (cur == dataLength-1 ){
                    Write("<br><br> Break Maxlength reached - launch api mobileNumbers : "+mobileNumbers);
                    //postQueueMOAPI(accessToken, mobileNumbers)
                    break;
                  }
                  else if (count == limitApiCalls ){
                    Write("<br><br> APILimit reached- launch api mobileNumbers : "+mobileNumbers);
                    //postQueueMOAPI(accessToken, mobileNumbers)
                    //sleep(10000); //Wait for 10 second
                    mobileNumbers = []; //Reset the mobile list
                    i = -1; //Restart the mobile list array allocation
                    count = 0; // reset the count for checking the reach of the api call limit
                  }
                  
                  cur++;
                  count++;

             }
             
          }   

    } catch(e) { Write("<br><br> error global: "+ Stringify(e)); }
</script>
</head>
  
  
</html>

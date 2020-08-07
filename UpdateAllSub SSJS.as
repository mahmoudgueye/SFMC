<script language=javascript runat=server> 
      Platform.Load("core", "1") 
        var b1 = DataExtension.Init("ent.Unsubscribed_MC_VPVPB"); //DE of unsubscibed reccorrds from _subscribers
        var data = b1.Rows.Lookup(["Status"], ["unsubscribed"]);

        //test ids
        //var subKey = '0030X00002xRCM0QAO' //test 
        //var emaiTest = 'awetzel@salesforce.com'
        //var subKey = '0030X00002wEOwqQAG' //test 
        //var emaiTest = 'elodie.mesnage-ext@johnpaul.com'

        write_debug("length = "+data.length)
        if(data){ 
          for (var i = 0; i < data.length; i++){  
            var status; 
            var EmailAddress = data[i]["EmailAddress"];  
            var SubscriberKey = data[i]["SubscriberKey"];  
            write_debug("<br> SubscriberKey = "+ SubscriberKey)


            if(EmailAddress && EmailAddress != ""){
              var results = Subscriber.Retrieve({
                Property:"SubscriberKey",SimpleOperator:"equals",Value:SubscriberKey} 
                                               ); 

              if(results && results[0] && results[0].SubscriberKey == SubscriberKey){ 
                var subObj = Subscriber.Init(SubscriberKey); 
                var subs = subObj.Lists.Retrieve();

                var updSubscriber = { 
                  "EmailAddress": EmailAddress, 
                  "Status":"Active",          
                  "EmailTypePreference": "HTML"
                                  }; 
                status = subObj.Update(updSubscriber); 
                status = status=="OK"? status + '. Updated.' : status; 

                updateSalesforce(SubscriberKey);

              }
            } 
            else{ 
              status = "Blank email id"; 
            } 
            write_debug(status);
            b1.Rows.Update({ "Status": 'Active'}  , ["SubscriberKey"], [SubscriberKey], ["LastModifiedDateMC"],[new Date()]); 

            write_debug(Stringify(data[i]["SubscriberKey"]) + status + "<br />"); 
          } 
        }

        // Update field MKT_email in John Force
        function updateSalesforce(SubscriberKey ){
          var results = 0;
          var updateSFObject = "";
          updateSFObject += "\%\%[ ";
          updateSFObject += "set @salesforceFields = UpdateSingleSalesforceObject('Contact','"+SubscriberKey+"','MKT_email__c','opt-out')";
          updateSFObject += "]\%\%";

          try {
            results = Platform.Function.TreatAsContent(updateSFObject);
          } catch (e) {

            if (debug) { Write("<br>debug updateSFHasOptedOutOfEmailFlag error: " + Stringify(e)); }
                        Write("<br>updateSFHasOptedOutOfEmailFlag error: " + Stringify(e)); 

          }

          Write("UpdateSingleSalesforceObject  "+Platform.Variable.GetValue("@salesforceFields")); // For display Status (testing purpose)
        }

        // ------------Log/display/Debug
        function write_debug(content) {
                Write('<div class="debug">'+content+'</div>');
         }
   // https://www.salesforcefan.com/post/add-update-all-subscribers-from-data-extension-via-ssjs
    </script> 


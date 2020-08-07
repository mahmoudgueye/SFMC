%%[ VAR @rs, @row, @cntr, @SubKey
set @SubKey = _subscriberkey
SET @rs = LookupRows("Test_Vol_Passager","Contact__c",@SubKey) 

if rowcount(@rs) > 0 then

    FOR @cntr = 1 to RowCount(@rs) do 

      var @Nbillet__c, @Dateduvol__c, @N_Vol__c, @APA__c, @APD__c, @PNR__c

      SET @row = Row(@rs, @cntr) 
      set @Nbillet__c = Field(@row,"Nbillet__c")
      set @Dateduvol__c = Field(@row,"Dateduvol__c")
      set @N_Vol__c = Field(@row,"N_Vol__c")
      set @APA__c = Field(@row,"APA__c")
      set @APD__c = Field(@row,"APD__c")
      set @PNR__c = Field(@row,"PNR__c")

      ]%%

      %%[ if @cntr == 1 then ]%%

        <span style="font-size:22px;"><b>Tableau Vols</b></span><br>
        <table cellspacing="0" cellpadding="0" border="1">
          <tr>
            <td>N° de billet</td>
            <td>Date du vol</td>
            <td>N° de vol</td>
            <td>APD (départ)</td>
            <td>APA (arrivée)</td>
            <td>PNR</td>
          </tr>

      %%[ endif ]%%

        <tr>
            <td>%%=v(@Nbillet__c)=%%</td>
            <td>%%=v(@Dateduvol__c)=%%</td>
            <td>%%=v(@N_Vol__c)=%%</td>
            <td>%%=v(@APA__c)=%%</td>
            <td>%%=v(@APD__c)=%%</td>
            <td>%%=v(@PNR__c)=%%</td>

        </tr>


     %%[ if @cntr == rowcount(@rs) then ]%%
        </table>
     %%[ endif ]%%

    %%[ 
      NEXT @cntr
    ]%%

%%[ else ]%%


%%[ endif ]%%
sms 

Hello %%FirstName%% https://www.visaplatinum.fr/espace-membre/connexion/?at_medium=sms&at_campaign=test_tracking&at_custom1=%%xtyear%%%%xtmonthnumeric%%%%xtday%%&at_custom2=%%_subscriberkey%%

%%[
SET @currentDate = Format(Now(1),"yyyyMMdd")
SET @URL = URLEncode(Concat("https://www.visaplatinum.fr/espace-membre/connexion/?at_medium=custum2","%26at_campaign=sms_Name","%26at_custom1=",@currentDate,"%26at_custom2=",_subscriberkey))
SET @shortURL = TRIM(HTTPGet(Concat("https://api-ssl.bitly.com/v3/shorten?access_token=2f87832bc05f2cc5fe1ba5b8266fdad0f5864495&format=txt&longUrl=",@URL)))
]%%
Hello %%FirstName%%,
%%=v(@shortURL)=%%

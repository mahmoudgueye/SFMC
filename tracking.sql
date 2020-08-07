SELECT 
SubscriberID, 
SubscriberKey, 
AccountID, 
OYBAccountID, 
JobID,
ListID,
BatchID,
EventDate,
Domain, 
TriggererSendDefinitionObjectID ,
TriggeredSendCustomerKey,
IsUnique
FROM _Open
where EventDate > dateadd(dd,-7, getdate())


SELECT 
SubscriberID, 
SubscriberKey, 
AccountID, 
OYBAccountID, 
JobID,
ListID,
BatchID,
EventDate,
Domain, 
TriggererSendDefinitionObjectID ,
TriggeredSendCustomerKey
FROM _Sent
where EventDate > dateadd(d,-2,getdate())




SELECT x.*
FROM 
(
SELECT 
SubscriberID, 
SubscriberKey, 
AccountID, 
OYBAccountID, 
JobID,
ListID,
BatchID,
EventDate,
Domain, 
TriggererSendDefinitionObjectID ,
TriggeredSendCustomerKey,
IsUnique,
URL,
LinkName,
LinkContent,
CONVERT (VARCHAR(25), EventDate, 121) AS 'CSTEventDateMilli',
row_number()over(partition by SubscriberKey,JobID,BatchID,ListID,'CSTEventDateMilli' ORDER BY EventDate DESC) AS row
From _Click
where EventDate > dateadd(dd,-7, getdate())
) x
WHERE x.row = 1





SELECT 
SubscriberID, 
SubscriberKey, 
AccountID, 
OYBAccountID, 
JobID,
ListID,
BatchID,
EventDate,
Domain, 
TriggererSendDefinitionObjectID ,
TriggeredSendCustomerKey,
IsUnique,
BounceCategoryID,
BounceCategory,
BounceSubcategoryID,
BounceSubcategory,
BounceTypeID,
BounceType,
SMTPBounceReason,
SMTPMessage,
SMTPCode
FROM _Bounce


SELECT 
SubscriberID, 
SubscriberKey, 
EmailAddress,
Status,
SubscriberType,
Locale,
BounceCount,
DateUndeliverable,
DateJoined,
DateUnsubscribed,
Domain
FROM _Subscribers


SELECT 
SubscriberID, 
SubscriberKey, 
AccountID, 
OYBAccountID, 
EventDate,
IsUnique,
Domain
FROM _Unsubscribe




SELECT 
VersionID,
JourneyID,
JourneyName,
VersionNumber,
CreatedDate,
LastPublishedDate,
ModifiedDate,
JourneyStatus
FROM _Journey


SELECT 
VersionID,
ActivityID,
ActivityName,
ActivityExternalKey,
ActivityType,
JourneyActivityObjectID
FROM _JourneyActivity



SELECT 
JobID,
EmailID,
AccountID,
AccountUserID,
FromName,
FromEmail,
SchedTime,
PickupTime,
DeliveredTime,
EventID,
TriggererSendDefinitionObjectID,
TriggeredSendCustomerKey,
IsMultipart,
JobType,
JobStatus,
ModifiedBy,
ModifiedDate,
EmailName,
EmailSubject,
IsWrapped,
TestEmailAddr,
Category,
BccEmail,
OriginalSchedTime,
CreatedDate,
CharacterSet,
IPAddress,
SalesForceTotalSubscriberCount,
SalesForceErrorSubscriberCount,
SendType,
DynamicEmailSubject,
SuppressTracking,
SendClassificationType,
SendClassification,
ResolveLinksWithCurrentData,
EmailSendDefinition,
DeduplicateByEmail
FROM _Job




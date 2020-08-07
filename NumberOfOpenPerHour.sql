
select  datepart(hour,[Time Opened]) , count(datepart(hour,[Time Opened] )) 
from ent.Import_open_57013 b 
group by datepart(hour,[Time Opened])
order by datepart(hour,[Time Opened])  OFFSET 0 ROWS
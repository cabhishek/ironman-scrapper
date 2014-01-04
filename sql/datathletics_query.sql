select * from races order by name;
select * from qualifiers order by name;

select * from athletes;
select * from athlete_races;

select count(*), a.first_name, a.last_name , a.id, a.athlinks_id
from athletes a join athlete_races ar on a.id = ar.athlete_id
group by a.id
having count(*) > 7
order by count(*) desc;

select count(*) as 'Claimed results' 
from athlete_races
where claimed = 1;

select count(*) as 'Not Claimed results' 
from athlete_races
where claimed = 0;

select count(*) as 'No of races', name, month,location
from races 
group by name
order by count(*) desc;

select count(*) as 'Total athletes'
from athletes;

select count(distinct id)  as 'Total athelete races'
from athlete_races;

select count(*) as 'No of athletes', r.name, r.year
from athlete_races ar join races r 
on ar.race_id = r.id
group by race_id
order by count(*) desc;


delete from races;
delete from qualifiers;
delete from athletes;
delete from athlete_races;


/* drop table races;
drop table qualifiers;
drop table athletes;
drop table athlete_races; */
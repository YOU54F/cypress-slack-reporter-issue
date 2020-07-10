update `ac_permissions`SET `Time` = 0;
DELETE FROM `rrbatch`;
DELETE FROM `etlfile`;
DELETE FROM `etlfiledata`;
DELETE FROM `etllicencefile`;
DELETE FROM `etltemplates`;
DELETE FROM `etltemplateslinks`;
DELETE FROM `etlfileschema`;
DELETE FROM `notification`;
DELETE FROM `logsecurityaudit`;
DELETE FROM `rrnominationnominee`;
DELETE FROM `members_upcoming_anniversary`;
DELETE FROM `rraccount`;
DELETE FROM `members` WHERE `FirstName` IN ('NewA','NewB','NewC')
DELETE from `members_blind_directory` WHERE `members_blind_directory`.`LastName` IN ('JoinerA', 'JoinerB', 'JoinerC');
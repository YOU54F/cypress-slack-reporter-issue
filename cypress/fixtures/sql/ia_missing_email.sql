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
DELETE FROM `ccvparentaccount`;
UPDATE `schemes` SET `registrationCriteriaType` = 'List-DoB' WHERE `Name` = 'Example Site'
DELETE FROM `members` WHERE `LicenceKey` IN ('ABC001', 'ABC002', 'ABC003')
DELETE from `members_blind_directory` WHERE `members_blind_directory`.`LicenceId` > 70;
INSERT INTO members (`State`,`LicenceId`,`SchemeId`,`LicenceKey`,`ReversedLicenceKey`,`GrantedDate`,`RevokedDate`,`LicenceVerification`,`LocaleId`,`ContactId`,`RegistrationDate`,`Notes`,`RemoteId`,`AddressLine1`,`AddressLine2`,`AddressLine3`,`AddressLine4`,`PostalCode`,`Latitude`,`Longitude`,`GeoHash`,`Id`) VALUES ('0','120','1','ABC0001','1000CBA','2020-06-29 17:51:41','9999-12-31 23:59:59','19800101','-1','0','0000-00-00 00:00:00','',NULL,'','','','','','0','0','',UNHEX('90EC63277A5F4B0F86B33634702AD6FC'));
INSERT IGNORE INTO `members_blind_directory` (`Id`,`LicenceId`,`ContactId`,`UserId`,`SchemeId`,`SchemeUuid`,`LastName`,`Username`,`EmailHash`,`State`) VALUES (UNHEX('90EC63277A5F4B0F86B33634702AD6FC'),'120','0','0','1',UNHEX('8A98E6B3D06D4C1885D7FC239C87A2C9'),'',NULL,NULL,'0');
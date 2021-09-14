Dumb:

mysqldump -u root -p homebuilderdb > C:\mein\pfad\zum\dump.sql

#####

Restore:

mysql -u root -p

mysql> drop database homebuildersdb;

mysql> create database homebuildersdb;

mysql> exit

mysql -u root -p homebuildersdb < C:\mein\pfad\zum\dump.sql
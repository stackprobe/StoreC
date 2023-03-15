CALL C:\Factory\SetEnv.bat
CALL Clean.bat
cx **

acp Claes20200001\Claes20200001\bin\Release\Claes20200001.exe out\*P.exe
xcp doc out

C:\apps\Compress\Compress.exe out C:\temp\HTTCmdP_T2.cmp.gz

CALL C:\home\bat\server.bat
C:\apps\HTTPClient\HTTPClient.exe http://%server%:60060/U/HTTCmdP_T2.cmp.gz /P C:\temp\HTTCmdP_T2.cmp.gz
C:\apps\HTTPClient\HTTPClient.exe http://%server%:60060/B/HTTCmdP_T2_Deploy.bat /P *
SET server=

TIMEOUT 2

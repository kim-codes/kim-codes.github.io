const RAW_CSV = `Nomination ID,Region,Segment,Industry,Product,Stage,Outcome,Value,Owner,Date Nominated,Last Updated,Reason
NOM-1013,AMER,smb,Technology,platform a,nominated,On Track,5241,PM-131,13-May-2026,03-Aug-2026,
NOM-1023,EMEA,ENTERPRISE,Retail ,PLATFORM A,UNDER DEPLOYMENT,ON TRACK,38012,PM-118,6/6/2026,2026-06-07,
NOM-1040,APAC,ENTERPRISE,Financial Services ,PLATFORM B,live,live,46098,PM-159,07/31/26,07/18/26,
NOM-1047,apj,Smb ,Technology,PLATFORM B,LIVE,Live,11847,PM-159,2026-06-04,4/24/2026,
NOM-1010,amer,Pub Sector,financial services,platform b,LIVE,LIVE,320646,PM-118,04/09/26,4/19/2026,
NOM-1046,APAC,SMB,Healthcare ,PLATFORM C,NOMINATED,on-track,5441,PM-118,4/16/2026,06/18/26,
NOM-1012,amer,SMB,Manufacturing,Platform A ,IN REVIEW,Needs Attention,16931,PM-131,7/24/2026,7/18/2026,Awaiting technical validation
NOM-1045,apj,SMB,FINANCIAL SERVICES,platform c,live,Live,5564,PM-131,06/13/26,2026-07-26,
NOM-1003,AMER,enterprise,HEALTHCARE,platform a,NOMINATED,ON TRACK,97930,PM-118,07/07/26,07/26/26,
NOM-1028, EMEA,PUBLIC SECTOR,Manufacturing ,Platform A ,IN REVIEW,blocked,207367,PM-131,02-May-2026,05-May-2026,Waiting on security review
NOM-1033, EMEA,Smb ,Manufacturing,PLATFORM B,Live,LIVE,9363,PM-163,2026-06-04,2026-07-30,
NOM-1021,emea,Enterprise,financial services,PLATFORM C,nominated,on track,38178,PM-163,5/10/2026,5/12/2026,
NOM-1036, EMEA,Smb ,HEALTHCARE,Platform C,nominated,needs-attention,5669,PM-118,04/11/26,07/19/26,Pending legal sign-off
NOM-1027,emea,enterprise,financial services,platform a,NOMINATED,On Track,31046,PM-118,26-Jul-2026,20-May-2026,
NOM-1043,APJ,Public Sector,Manufacturing ,platform b,NOMINATED,needs-attention,149907,PM-118,4/14/2026,05/09/26,Pending legal sign-off
NOM-1022,EMEA,ENTERPRISE,healthcare,Platform B ,live,live,22084,PM-172,06/29/26,5/29/2026,
NOM-1009,Amer ,Pub Sector,Healthcare,platform c,Under Deployment,On Track,338966,PM-131,19-Jun-2026,05-Jul-2026,
NOM-1004,AMER,enterprise,Financial Services ,PLATFORM C,Live,Live,139840,PM-147,05/27/26,4/15/2026,
NOM-1017,EMEA,enterprise,MANUFACTURING,platform a,nominated,LOST,51896,PM-131,08/08/26,05/04/26,Went with competitor
NOM-1008,AMER,Pub Sector,Financial Services,platform b,Nominated,on-track,258650,PM-147,2026-06-01,2026-06-01,
NOM-1034,EMEA,Smb ,financial services,Platform A ,NOMINATED,blocked,4508,PM-104,5/10/2026,03-May-2026,Waiting on security review
NOM-1030,EMEA,public sector,Financial Services ,Platform C ,LIVE,LIVE,186273,PM-163,07/14/26,29-Jul-2026,
NOM-1014,AMER,Smb ,Retail,PLATFORM B,Nominated,Needs Attention,17846,,8/3/2026,05/19/26,Missing exec sponsor
NOM-1037,APAC,ENTERPRISE,MANUFACTURING,PLATFORM A,In Review,On Track,63736,PM-163,05/16/26,02-Aug-2026,
NOM-1015,Amer ,SMB,Manufacturing ,Platform C,NOMINATED,on track,13238,PM-104,4/21/2026,2026-04-18,
NOM-1024, EMEA,enterprise,TECHNOLOGY,Platform B,IN REVIEW,blocked,48516,PM-163,4/1/2026,03-Jul-2026,Pending legal sign-off
NOM-1019,emea,Enterprise,MANUFACTURING,platform c,NOMINATED,on-track,31457,PM-118,07/18/26,2026-04-12,
NOM-1011,amer,smb,Manufacturing ,Platform C,NOMINATED,On Track,8981,PM-131,2026-04-25,07/20/26,
NOM-1038,APJ,enterprise,manufacturing,PLATFORM B,nominated,ON TRACK,55981,PM-163,2026-06-26,08/05/26,
NOM-1006,Amer ,ENTERPRISE,Financial Services,PLATFORM A,LIVE,live,74371,PM-163,07-Jul-2026,2026-06-04,
NOM-1001,amer,Enterprise,Technology,Platform C ,Under Deployment,lost,114987,PM-122,07/18/26,6/11/2026,Budget cut
NOM-1026,EMEA,Enterprise,RETAIL,platform c,Live,Live,45473,PM-122,04/22/26,08/10/26,
NOM-1041,APJ,public sector,FINANCIAL SERVICES,platform a,in review,on track,170484,PM-131,26-May-2026,06/10/26,
NOM-1000,AMER,Enterprise,financial services,Platform C,NOMINATED,needs attention,63278,PM-122,2026-04-27,2026-07-18,Pending legal sign-off
NOM-1032, EMEA,smb,healthcare,Platform C ,Nominated,On Track,11657,,07-Apr-2026,2026-04-07,
NOM-1048,APAC,smb,Manufacturing,platform a,in review,blocked,11502,PM-163,2026-08-04,07/30/26,Blocked on pricing approval
NOM-1007,AMER,PUBLIC SECTOR,retail,Platform A,LIVE,live,427942,,2026-05-16,6/16/2026,
NOM-1039,APAC,ENTERPRISE,technology,Platform B ,NOMINATED,on-track,85952,,2026-05-19,01-Jun-2026,
NOM-1016,amer,SMB,TECHNOLOGY,Platform C ,live,Live,5651,PM-147,05/23/26,06/01/26,
NOM-1020,emea,Enterprise,MANUFACTURING,platform c,UNDER DEPLOYMENT,Blocked,51759,PM-159,08-May-2026,2026-05-03,Awaiting technical validation
NOM-1005,Amer ,enterprise,RETAIL,platform c,Under Deployment,on-track,87869,PM-147,5/6/2026,07-Jun-2026,
NOM-1029,EMEA,PUBLIC SECTOR,manufacturing,PLATFORM A,live,live,267983,,8/3/2026,10-Jun-2026,
NOM-1002,Amer ,ENTERPRISE,TECHNOLOGY,platform b,NOMINATED,On Track,94671,,02-May-2026,04/21/26,
NOM-1035, EMEA,smb,Healthcare ,platform b,In Review,BLOCKED,13926,PM-122,2026-06-19,04/07/26,Procurement delay
NOM-1025,emea,enterprise,retail,Platform C ,LIVE,LIVE,41764,PM-163,05/15/26,2026-07-13,
NOM-1042,APAC,Pub Sector,Financial Services ,PLATFORM B,In Review,On Track,153182,PM-122,2026-08-04,04/04/26,
NOM-1018,emea,ENTERPRISE,retail,PLATFORM C,In Review,NEEDS ATTENTION,49664,PM-122,2026-06-07,4/28/2026,Awaiting technical validation
NOM-1031,emea,smb,Technology,Platform A ,in review,needs-attention,10232,PM-163,7/17/2026,8/3/2026,Awaiting technical validation
NOM-1044,APAC,Smb ,Manufacturing,platform b,Nominated,on track,7871,PM-147,2026-04-16,5/24/2026,`;

window.sampleData = RAW_CSV;
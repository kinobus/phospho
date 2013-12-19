'use strict';

angular.module('phosphoApp')
  .controller('ShareCtrl', function ($scope) {
    $scope.hardkinome = {"mean-drug":{"AAK1":1.0,"ABL2":0.4169149985,"ACVR1":1.0,"ACVR1B":0.7835684012,"ACVR2A":1.0,"ACVR2B":1.0,"ADRBK1":1.0,"AKT1":0.4752073901,"AKT3":1.0,"ARAF":0.4169149985,"AURKB":0.4169149985,"AURKC":1.0,"AXL":1.0,"BLK":1.0,"BMP2K":1.0,"BMPR1A":0.7144830715,"BMPR1B":1.0,"BMPR2":1.0,"BMX":0.4169149985,"BTK":0.7835684012,"BUB1":1.0,"CAMK1D":1.0,"CAMK2A":0.7144830715,"CAMK2B":1.0,"CAMK2D":0.7144830715,"CAMK2G":1.0,"CAMK4":1.0,"CAMKK1":1.0,"CAMKK2":1.0,"CDK1":1.0,"CDK15":0.4169149985,"CDK16":1.0,"CDK18":1.0,"CDK3":1.0,"CDK4":0.4169149985,"CDK5":0.4169149985,"CDK6":1.0,"CDK7":0.4169149985,"CDK9":1.0,"CDKL3":1.0,"CDKL5":0.7144830715,"CHEK2":1.0,"CLK1":0.4169149985,"CLK2":1.0,"CLK3":0.7144830715,"CLK4":1.0,"CSK":1.0,"CSNK1A1":1.0,"CSNK1A1L":1.0,"CSNK1D":0.7835684012,"CSNK1E":1.0,"CSNK1G1":1.0,"CSNK1G2":0.4169149985,"CSNK1G3":0.4169149985,"CSNK2A1":1.0,"CSNK2A2":1.0,"DCLK1":1.0,"DCLK2":1.0,"DDR1":1.0,"DDR2":0.3832779778,"DMPK":1.0,"DYRK1B":0.7835684012,"DYRK2":0.4169149985,"DYRK3":1.0,"DYRK4":0.4169149985,"EEF2K":1.0,"EIF2AK1":1.0,"EIF2AK2":0.7144830715,"EPHA3":1.0,"EPHB1":1.0,"EPHB3":0.7144830715,"FASTK":0.4169149985,"FGFR1":1.0,"FGFR2":0.4169149985,"FGFR4":0.7835684012,"FGR":0.4169149985,"FRK":0.4169149985,"FYN":1.0,"GRK5":1.0,"GRK6":0.6408099369,"GSG2":1.0,"GSK3A":1.0,"GSK3B":1.0,"HCK":1.0,"HIPK1":0.7144830715,"HIPK4":1.0,"ICK":1.0,"IGF1R":1.0,"IKBKB":1.0,"ILK":1.0,"IRAK1":1.0,"IRAK3":1.0,"ITK":1.0,"JAK2":1.0,"KIT":1.0,"KSR2":1.0,"LATS1":1.0,"LCK":0.4169149985,"LIMK2":0.7144830715,"LYN":1.0,"MAK":0.4169149985,"MAP2K1":0.7144830715,"MAP2K2":1.0,"MAP2K3":1.0,"MAP2K4":1.0,"MAP2K6":0.7144830715,"MAP2K7":1.0,"MAP3K11":1.0,"MAP3K13":1.0,"MAP3K14":1.0,"MAP3K7":0.7144830715,"MAP3K8":1.0,"MAP4K2":1.0,"MAP4K5":1.0,"MAPK1":1.0,"MAPK10":0.3832779778,"MAPK11":1.0,"MAPK12":1.0,"MAPK13":1.0,"MAPK14":0.6227265093,"MAPK15":0.4169149985,"MAPK3":0.7835684012,"MAPK6":1.0,"MAPK7":0.7835684012,"MAPK8":1.0,"MAPK9":1.0,"MAPKAPK3":1.0,"MAPKAPK5":0.4920259004,"MARK2":1.0,"MARK3":1.0,"MAST1":1.0,"MAST2":1.0,"MATK":1.0,"MET":1.0,"MKNK1":1.0,"MKNK2":1.0,"MOS":1.0,"MST4":1.0,"MYLK":1.0,"MYLK2":0.7835684012,"MYO3A":1.0,"NEK10":1.0,"NEK11":1.0,"NEK2":0.7144830715,"NEK3":1.0,"NEK4":1.0,"NEK6":1.0,"NEK7":1.0,"NEK8":1.0,"NEK9":0.4169149985,"NIM1":1.0,"NLK":1.0,"NPR2":1.0,"NRBP1":1.0,"NRBP2":0.4169149985,"NTRK3":0.7144830715,"NUAK1":1.0,"OXSR1":1.0,"PAK1":1.0,"PAK4":0.4169149985,"PAK6":0.4169149985,"PBK":1.0,"PDGFRB":1.0,"PDIK1L":1.0,"PDK3":1.0,"PDPK1":1.0,"PIK3C3":1.0,"PIK3R4":0.7144830715,"PIM1":1.0,"PIM2":1.0,"PINK1":1.0,"PKN1":1.0,"PKN3":1.0,"PLK1":0.7835684012,"PLK3":1.0,"PNCK":1.0,"PRKAA1":0.7835684012,"PRKAA2":0.7835684012,"PRKACA":0.4169149985,"PRKACB":1.0,"PRKCA":1.0,"PRKCB":1.0,"PRKCD":0.7144830715,"PRKCH":1.0,"PRKCI":1.0,"PRKCQ":0.4169149985,"PRKCZ":0.4169149985,"PRKG1":1.0,"PRKX":1.0,"PRKY":0.4169149985,"PRPF4B":1.0,"PTK2":1.0,"PTK2B":0.4169149985,"PTK6":1.0,"PXK":1.0,"RAF1":1.0,"RAGE":1.0,"RET":1.0,"RIOK1":1.0,"RIPK2":0.6408099369,"RIPK3":0.4169149985,"RPS6KA1":1.0,"RPS6KA2":1.0,"RPS6KA3":1.0,"RPS6KA4":1.0,"RPS6KA5":0.7144830715,"RPS6KA6":1.0,"RPS6KB1":1.0,"RPS6KB2":1.0,"RPS6KL1":1.0,"SCYL1":1.0,"SCYL2":1.0,"SCYL3":0.4169149985,"SGK1":1.0,"SGK2":1.0,"SGK3":1.0,"SGK494":1.0,"SIK1":0.4169149985,"SNRK":1.0,"SRPK1":1.0,"SRPK2":0.7144830715,"STK11":1.0,"STK16":0.4169149985,"STK17A":0.4169149985,"STK24":1.0,"STK25":0.7144830715,"STK3":1.0,"STK33":1.0,"STK36":1.0,"STK38":1.0,"STK38L":0.7144830715,"STK4":1.0,"STK40":1.0,"STYK1":1.0,"SYK":1.0,"TBK1":0.4169149985,"TESK2":1.0,"TGFBR2":0.4920259004,"TNK2":1.0,"TNNI3K":0.4169149985,"TRIB2":1.0,"TRIB3":0.7144830715,"TSSK2":1.0,"TTK":1.0,"TYK2":1.0,"TYRO3":0.3832779778,"UHMK1":1.0,"ULK3":1.0,"VRK1":1.0,"VRK3":1.0,"WEE1":0.4169149985,"WNK1":0.7144830715,"YES1":0.4169149985,"YSK4":1.0,"ZAP70":1.0}};
  });

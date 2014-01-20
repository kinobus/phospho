'use strict';

angular.module('phosphoApp')
  .constant('demoPathways', {
    'titles':[
      'DLBCL'
    ],
    'pathways': {
      'DLBCL':{
        'metadata' : {
          'user' : 'Ricker',
          'title' : 'DLBCL'
        },
        'graph' : {
          'links' : [ {
            'type' : 'activate',
            'target' : {
              'type' : 'prot',
              'weight' : 2,
              'y' : 224.68844774992164,
              'py' : 224.7153060583604,
              'x' : 452,
              'index' : 1,
              'compartment' : 'cytosol',
              'px' : 451.8796084061953,
              'label' : 'PIK3CD',
              'id' : 1
            },
            'source' : {
              'type' : 'prot',
              'weight' : 2,
              'y' : 50,
              'py' : 50.33755321614746,
              'x' : 450.21046031635507,
              'index' : 0,
              'compartment' : 'membrane',
              'px' : 450.03173202676385,
              'label' : 'BCR',
              'id' : 0
            }
          }, {
            'type' : 'activate',
            'target' : {
              'type' : 'prot',
              'weight' : 2,
              'y' : 392.9216145167253,
              'py' : 392.9001376185796,
              'x' : 452,
              'index' : 2,
              'compartment' : 'cytosol',
              'px' : 451.7897960175096,
              'label' : 'PIK3R1',
              'id' : 2
            },
            'source' : {
              'type' : 'prot',
              'weight' : 2,
              'y' : 224.68844774992164,
              'py' : 224.7153060583604,
              'x' : 452,
              'index' : 1,
              'compartment' : 'cytosol',
              'px' : 451.8796084061953,
              'label' : 'PIK3CD',
              'id' : 1
            }
          }, {
            'type' : 'activate',
            'target' : {
              'type' : 'event',
              'weight' : 3,
              'y' : 550,
              'py' : 549.6043471039133,
              'x' : 373.38303574629225,
              'index' : 3,
              'compartment' : 'nucleus',
              'px' : 373.27031489907876,
              'label' : 'Cell Growth',
              'id' : 3
            },
            'source' : {
              'type' : 'prot',
              'weight' : 2,
              'y' : 392.9216145167253,
              'py' : 392.9001376185796,
              'x' : 452,
              'index' : 2,
              'compartment' : 'cytosol',
              'px' : 451.7897960175096,
              'label' : 'PIK3R1',
              'id' : 2
            }
          }, {
            'type' : 'inhibit',
            'target' : {
              'type' : 'prot',
              'weight' : 2,
              'y' : 50,
              'py' : 50.33755321614746,
              'x' : 450.21046031635507,
              'index' : 0,
              'compartment' : 'membrane',
              'px' : 450.03173202676385,
              'label' : 'BCR',
              'id' : 0
            },
            'source' : {
              'type' : 'prot',
              'weight' : 3,
              'y' : 86,
              'py' : 86.13733570298486,
              'x' : 316.61067609024724,
              'index' : 4,
              'compartment' : 'cytosol',
              'px' : 316.5000886498214,
              'label' : 'LYN',
              'id' : 4
            }
          }, {
            'type' : 'inhibit',
            'target' : {
              'type' : 'prot',
              'weight' : 1,
              'y' : 50,
              'py' : 50.18739503610086,
              'x' : 169.32341269595867,
              'index' : 5,
              'compartment' : 'membrane',
              'px' : 169.5169169193375,
              'label' : 'CD79',
              'id' : 5
            },
            'source' : {
              'type' : 'prot',
              'weight' : 3,
              'y' : 86,
              'py' : 86.13733570298486,
              'x' : 316.61067609024724,
              'index' : 4,
              'compartment' : 'cytosol',
              'px' : 316.5000886498214,
              'label' : 'LYN',
              'id' : 4
            }
          }, {
            'type' : 'activate',
            'target' : {
              'type' : 'prot',
              'weight' : 2,
              'y' : 143.41742114671962,
              'py' : 143.473077605551,
              'x' : 175.97240135687494,
              'index' : 6,
              'compartment' : 'cytosol',
              'px' : 176.14840573748577,
              'label' : 'SYK',
              'id' : 6
            },
            'source' : {
              'type' : 'prot',
              'weight' : 3,
              'y' : 86,
              'py' : 86.13733570298486,
              'x' : 316.61067609024724,
              'index' : 4,
              'compartment' : 'cytosol',
              'px' : 316.5000886498214,
              'label' : 'LYN',
              'id' : 4
            }
          }, {
            'type' : 'activate',
            'target' : {
              'type' : 'prot',
              'weight' : 2,
              'y' : 173.06391427352838,
              'py' : 173.0940705546058,
              'x' : 299.00626472515916,
              'index' : 11,
              'compartment' : 'cytosol',
              'px' : 298.9433143708884,
              'label' : 'BTK',
              'id' : 11
            },
            'source' : {
              'type' : 'prot',
              'weight' : 2,
              'y' : 143.41742114671962,
              'py' : 143.473077605551,
              'x' : 175.97240135687494,
              'index' : 6,
              'compartment' : 'cytosol',
              'px' : 176.14840573748577,
              'label' : 'SYK',
              'id' : 6
            }
          }, {
            'type' : 'activate',
            'target' : {
              'type' : 'event',
              'weight' : 2,
              'y' : 50,
              'py' : 50.45679893871002,
              'x' : 242.6763779240988,
              'index' : 10,
              'compartment' : 'membrane',
              'px' : 242.6928168183393,
              'label' : 'Ca2+ Rel',
              'id' : 10
            },
            'source' : {
              'type' : 'prot',
              'weight' : 2,
              'y' : 173.06391427352838,
              'py' : 173.0940705546058,
              'x' : 299.00626472515916,
              'index' : 11,
              'compartment' : 'cytosol',
              'px' : 298.9433143708884,
              'label' : 'BTK',
              'id' : 11
            }
          }, {
            'type' : 'activate',
            'target' : {
              'type' : 'prot',
              'weight' : 2,
              'y' : 255.36882283882295,
              'py' : 255.34439695437354,
              'x' : 233.08575662151185,
              'index' : 12,
              'compartment' : 'cytosol',
              'px' : 233.15458761351803,
              'label' : 'CARD11',
              'id' : 12
            },
            'source' : {
              'type' : 'event',
              'weight' : 2,
              'y' : 50,
              'py' : 50.45679893871002,
              'x' : 242.6763779240988,
              'index' : 10,
              'compartment' : 'membrane',
              'px' : 242.6928168183393,
              'label' : 'Ca2+ Rel',
              'id' : 10
            }
          }, {
            'type' : 'activate',
            'target' : {
              'type' : 'pathway',
              'weight' : 4,
              'y' : 423.97438164271637,
              'py' : 423.9468607078052,
              'x' : 267.14799166369687,
              'index' : 9,
              'compartment' : 'cytosol',
              'px' : 267.162328615741,
              'label' : 'NFKB Path',
              'id' : 9
            },
            'source' : {
              'type' : 'prot',
              'weight' : 2,
              'y' : 255.36882283882295,
              'py' : 255.34439695437354,
              'x' : 233.08575662151185,
              'index' : 12,
              'compartment' : 'cytosol',
              'px' : 233.15458761351803,
              'label' : 'CARD11',
              'id' : 12
            }
          }, {
            'type' : 'activate',
            'target' : {
              'type' : 'prot',
              'weight' : 2,
              'y' : 487.6135134716127,
              'py' : 487.49714908009736,
              'x' : 60,
              'index' : 14,
              'compartment' : 'cytosol',
              'px' : 60.14678586489781,
              'label' : 'STAT3',
              'id' : 14
            },
            'source' : {
              'type' : 'prot',
              'weight' : 1,
              'y' : 359.19156009204363,
              'py' : 359.1899882457777,
              'x' : 60,
              'index' : 13,
              'compartment' : 'cytosol',
              'px' : 60.12112932256862,
              'label' : 'JAK2',
              'id' : 13
            }
          }, {
            'type' : 'activate',
            'target' : {
              'type' : 'event',
              'weight' : 2,
              'y' : 550,
              'py' : 549.7116841090316,
              'x' : 173.56180714414378,
              'index' : 15,
              'compartment' : 'nucleus',
              'px' : 173.6767577500262,
              'label' : 'Cell Survival',
              'id' : 15
            },
            'source' : {
              'type' : 'prot',
              'weight' : 2,
              'y' : 487.6135134716127,
              'py' : 487.49714908009736,
              'x' : 60,
              'index' : 14,
              'compartment' : 'cytosol',
              'px' : 60.14678586489781,
              'label' : 'STAT3',
              'id' : 14
            }
          }, {
            'type' : 'activate',
            'target' : {
              'type' : 'pathway',
              'weight' : 4,
              'y' : 423.97438164271637,
              'py' : 423.9468607078052,
              'x' : 267.14799166369687,
              'index' : 9,
              'compartment' : 'cytosol',
              'px' : 267.162328615741,
              'label' : 'NFKB Path',
              'id' : 9
            },
            'source' : {
              'type' : 'prot',
              'weight' : 1,
              'y' : 449.53185177377395,
              'py' : 449.4324712364145,
              'x' : 393.25710587948765,
              'index' : 7,
              'compartment' : 'cytosol',
              'px' : 393.13359618913154,
              'label' : 'IRAK4',
              'id' : 7
            }
          }, {
            'type' : 'activate',
            'target' : {
              'type' : 'event',
              'weight' : 3,
              'y' : 550,
              'py' : 549.6043471039133,
              'x' : 373.38303574629225,
              'index' : 3,
              'compartment' : 'nucleus',
              'px' : 373.27031489907876,
              'label' : 'Cell Growth',
              'id' : 3
            },
            'source' : {
              'type' : 'prot',
              'weight' : 1,
              'y' : 514,
              'py' : 513.8720779231078,
              'x' : 256.6041009188875,
              'index' : 8,
              'compartment' : 'cytosol',
              'px' : 256.614781054301,
              'label' : 'BCL6',
              'id' : 8
            }
          }, {
            'type' : 'activate',
            'target' : {
              'type' : 'event',
              'weight' : 2,
              'y' : 550,
              'py' : 549.7116841090316,
              'x' : 173.56180714414378,
              'index' : 15,
              'compartment' : 'nucleus',
              'px' : 173.6767577500262,
              'label' : 'Cell Survival',
              'id' : 15
            },
            'source' : {
              'type' : 'pathway',
              'weight' : 4,
              'y' : 423.97438164271637,
              'py' : 423.9468607078052,
              'x' : 267.14799166369687,
              'index' : 9,
              'compartment' : 'cytosol',
              'px' : 267.162328615741,
              'label' : 'NFKB Path',
              'id' : 9
            }
          }, {
            'type' : 'activate',
            'target' : {
              'type' : 'event',
              'weight' : 3,
              'y' : 550,
              'py' : 549.6043471039133,
              'x' : 373.38303574629225,
              'index' : 3,
              'compartment' : 'nucleus',
              'px' : 373.27031489907876,
              'label' : 'Cell Growth',
              'id' : 3
            },
            'source' : {
              'type' : 'pathway',
              'weight' : 4,
              'y' : 423.97438164271637,
              'py' : 423.9468607078052,
              'x' : 267.14799166369687,
              'index' : 9,
              'compartment' : 'cytosol',
              'px' : 267.162328615741,
              'label' : 'NFKB Path',
              'id' : 9
            }
          } ],
          'nodes' : [ {
            'type' : 'prot',
            'weight' : 2,
            'y' : 50,
            'py' : 50.33755321614746,
            'x' : 450.21046031635507,
            'index' : 0,
            'compartment' : 'membrane',
            'px' : 450.03173202676385,
            'label' : 'BCR',
            'id' : 0
          }, {
            'type' : 'prot',
            'weight' : 2,
            'y' : 224.68844774992164,
            'py' : 224.7153060583604,
            'x' : 452,
            'index' : 1,
            'compartment' : 'cytosol',
            'px' : 451.8796084061953,
            'label' : 'PIK3CD',
            'id' : 1
          }, {
            'type' : 'prot',
            'weight' : 2,
            'y' : 392.9216145167253,
            'py' : 392.9001376185796,
            'x' : 452,
            'index' : 2,
            'compartment' : 'cytosol',
            'px' : 451.7897960175096,
            'label' : 'PIK3R1',
            'id' : 2
          }, {
            'type' : 'event',
            'weight' : 3,
            'y' : 550,
            'py' : 549.6043471039133,
            'x' : 373.38303574629225,
            'index' : 3,
            'compartment' : 'nucleus',
            'px' : 373.27031489907876,
            'label' : 'Cell Growth',
            'id' : 3
          }, {
            'type' : 'prot',
            'weight' : 3,
            'y' : 86,
            'py' : 86.13733570298486,
            'x' : 316.61067609024724,
            'index' : 4,
            'compartment' : 'cytosol',
            'px' : 316.5000886498214,
            'label' : 'LYN',
            'id' : 4
          }, {
            'type' : 'prot',
            'weight' : 1,
            'y' : 50,
            'py' : 50.18739503610086,
            'x' : 169.32341269595867,
            'index' : 5,
            'compartment' : 'membrane',
            'px' : 169.5169169193375,
            'label' : 'CD79',
            'id' : 5
          }, {
            'type' : 'prot',
            'weight' : 2,
            'y' : 143.41742114671962,
            'py' : 143.473077605551,
            'x' : 175.97240135687494,
            'index' : 6,
            'compartment' : 'cytosol',
            'px' : 176.14840573748577,
            'label' : 'SYK',
            'id' : 6
          }, {
            'type' : 'prot',
            'weight' : 1,
            'y' : 449.53185177377395,
            'py' : 449.4324712364145,
            'x' : 393.25710587948765,
            'index' : 7,
            'compartment' : 'cytosol',
            'px' : 393.13359618913154,
            'label' : 'IRAK4',
            'id' : 7
          }, {
            'type' : 'prot',
            'weight' : 1,
            'y' : 514,
            'py' : 513.8720779231078,
            'x' : 256.6041009188875,
            'index' : 8,
            'compartment' : 'cytosol',
            'px' : 256.614781054301,
            'label' : 'BCL6',
            'id' : 8
          }, {
            'type' : 'pathway',
            'weight' : 4,
            'y' : 423.97438164271637,
            'py' : 423.9468607078052,
            'x' : 267.14799166369687,
            'index' : 9,
            'compartment' : 'cytosol',
            'px' : 267.162328615741,
            'label' : 'NFKB Path',
            'id' : 9
          }, {
            'type' : 'event',
            'weight' : 2,
            'y' : 50,
            'py' : 50.45679893871002,
            'x' : 242.6763779240988,
            'index' : 10,
            'compartment' : 'membrane',
            'px' : 242.6928168183393,
            'label' : 'Ca2+ Rel',
            'id' : 10
          }, {
            'type' : 'prot',
            'weight' : 2,
            'y' : 173.06391427352838,
            'py' : 173.0940705546058,
            'x' : 299.00626472515916,
            'index' : 11,
            'compartment' : 'cytosol',
            'px' : 298.9433143708884,
            'label' : 'BTK',
            'id' : 11
          }, {
            'type' : 'prot',
            'weight' : 2,
            'y' : 255.36882283882295,
            'py' : 255.34439695437354,
            'x' : 233.08575662151185,
            'index' : 12,
            'compartment' : 'cytosol',
            'px' : 233.15458761351803,
            'label' : 'CARD11',
            'id' : 12
          }, {
            'type' : 'prot',
            'weight' : 1,
            'y' : 359.19156009204363,
            'py' : 359.1899882457777,
            'x' : 60,
            'index' : 13,
            'compartment' : 'cytosol',
            'px' : 60.12112932256862,
            'label' : 'JAK2',
            'id' : 13
          }, {
            'type' : 'prot',
            'weight' : 2,
            'y' : 487.6135134716127,
            'py' : 487.49714908009736,
            'x' : 60,
            'index' : 14,
            'compartment' : 'cytosol',
            'px' : 60.14678586489781,
            'label' : 'STAT3',
            'id' : 14
          }, {
            'type' : 'event',
            'weight' : 2,
            'y' : 550,
            'py' : 549.7116841090316,
            'x' : 173.56180714414378,
            'index' : 15,
            'compartment' : 'nucleus',
            'px' : 173.6767577500262,
            'label' : 'Cell Survival',
            'id' : 15
          } ]
        }
      }
    }
  });

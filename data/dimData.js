const dimData = [
  {
    "nps": "1/8",
    "dn": "6",
    "schedule": "10S",
    "kgPerM": 0.2827504
  },
  {
    "nps": "1/8",
    "dn": "6",
    "schedule": "40S",
    "kgPerM": 0.3571584
  },
  {
    "nps": "1/8",
    "dn": "6",
    "schedule": "80S",
    "kgPerM": 0.46132959999999995
  },
  {
    "nps": "1/8",
    "dn": "6",
    "schedule": "160S",
    "kgPerM": 0.5506192
  },
  {
    "nps": "1/4",
    "dn": "8",
    "schedule": "5S",
    "kgPerM": 0.0
  },
  {
    "nps": "1/4",
    "dn": "8",
    "schedule": "10S",
    "kgPerM": 0.4910928
  },
  {
    "nps": "1/4",
    "dn": "8",
    "schedule": "40S",
    "kgPerM": 0.6399087999999999
  },
  {
    "nps": "1/4",
    "dn": "8",
    "schedule": "80S",
    "kgPerM": 0.8036064
  },
  {
    "nps": "1/4",
    "dn": "8",
    "schedule": "160S",
    "kgPerM": 0.9077776
  },
  {
    "nps": "3/8",
    "dn": "10",
    "schedule": "5S",
    "kgPerM": 0.0
  },
  {
    "nps": "3/8",
    "dn": "10",
    "schedule": "10S",
    "kgPerM": 0.6250271999999999
  },
  {
    "nps": "3/8",
    "dn": "10",
    "schedule": "40S",
    "kgPerM": 0.8482511999999999
  },
  {
    "nps": "3/8",
    "dn": "10",
    "schedule": "80S",
    "kgPerM": 1.1012384
  },
  {
    "nps": "3/8",
    "dn": "10",
    "schedule": "160S",
    "kgPerM": 1.2946992
  },
  {
    "nps": "1/2",
    "dn": "15",
    "schedule": "5S",
    "kgPerM": 0.8036064
  },
  {
    "nps": "1/2",
    "dn": "15",
    "schedule": "10S",
    "kgPerM": 0.9970672
  },
  {
    "nps": "1/2",
    "dn": "15",
    "schedule": "40S",
    "kgPerM": 1.2649359999999998
  },
  {
    "nps": "1/2",
    "dn": "15",
    "schedule": "80S",
    "kgPerM": 1.6220944
  },
  {
    "nps": "1/2",
    "dn": "15",
    "schedule": "160S",
    "kgPerM": 194.94896
  },
  {
    "nps": "3/4",
    "dn": "20",
    "schedule": "5S",
    "kgPerM": 1.0119488
  },
  {
    "nps": "3/4",
    "dn": "20",
    "schedule": "10S",
    "kgPerM": 1.2798175999999999
  },
  {
    "nps": "3/4",
    "dn": "20",
    "schedule": "40S",
    "kgPerM": 1.6816207999999997
  },
  {
    "nps": "3/4",
    "dn": "20",
    "schedule": "80S",
    "kgPerM": 2.2024768
  },
  {
    "nps": "3/4",
    "dn": "20",
    "schedule": "160S",
    "kgPerM": 2.901912
  },
  {
    "nps": "1",
    "dn": "25",
    "schedule": "5S",
    "kgPerM": 1.2946992
  },
  {
    "nps": "1",
    "dn": "25",
    "schedule": "10S",
    "kgPerM": 2.0983055999999998
  },
  {
    "nps": "1",
    "dn": "25",
    "schedule": "40S",
    "kgPerM": 2.5001087999999996
  },
  {
    "nps": "1",
    "dn": "25",
    "schedule": "80S",
    "kgPerM": 3.2293071999999996
  },
  {
    "nps": "1",
    "dn": "25",
    "schedule": "160S",
    "kgPerM": 4.241256
  },
  {
    "nps": "1 1/4",
    "dn": "32",
    "schedule": "5S",
    "kgPerM": 1.6518576
  },
  {
    "nps": "1 1/4",
    "dn": "32",
    "schedule": "10S",
    "kgPerM": 2.6935696
  },
  {
    "nps": "1 1/4",
    "dn": "32",
    "schedule": "40S",
    "kgPerM": 3.3781231999999997
  },
  {
    "nps": "1 1/4",
    "dn": "32",
    "schedule": "80S",
    "kgPerM": 4.46448
  },
  {
    "nps": "1 1/4",
    "dn": "32",
    "schedule": "160S",
    "kgPerM": 5.6103632
  },
  {
    "nps": "1 1/2",
    "dn": "40",
    "schedule": "5S",
    "kgPerM": 1.9048448
  },
  {
    "nps": "1 1/2",
    "dn": "40",
    "schedule": "10S",
    "kgPerM": 3.1102543999999996
  },
  {
    "nps": "1 1/2",
    "dn": "40",
    "schedule": "40S",
    "kgPerM": 4.0477952
  },
  {
    "nps": "1 1/2",
    "dn": "40",
    "schedule": "80S",
    "kgPerM": 5.4020208
  },
  {
    "nps": "1 1/2",
    "dn": "40",
    "schedule": "160S",
    "kgPerM": 7.2324576
  },
  {
    "nps": "2",
    "dn": "50",
    "schedule": "5S",
    "kgPerM": 2.3959376
  },
  {
    "nps": "2",
    "dn": "50",
    "schedule": "10S",
    "kgPerM": 3.9287424
  },
  {
    "nps": "2",
    "dn": "50",
    "schedule": "40S",
    "kgPerM": 5.4466656
  },
  {
    "nps": "2",
    "dn": "50",
    "schedule": "80S",
    "kgPerM": 7.4854448
  },
  {
    "nps": "2",
    "dn": "50",
    "schedule": "160S",
    "kgPerM": 11.116555199999999
  },
  {
    "nps": "2 1/2",
    "dn": "65",
    "schedule": "5S",
    "kgPerM": 3.6906367999999996
  },
  {
    "nps": "2 1/2",
    "dn": "65",
    "schedule": "10S",
    "kgPerM": 5.2532048
  },
  {
    "nps": "2 1/2",
    "dn": "65",
    "schedule": "40S",
    "kgPerM": 8.631328
  },
  {
    "nps": "2 1/2",
    "dn": "65",
    "schedule": "80S",
    "kgPerM": 11.414187199999999
  },
  {
    "nps": "2 1/2",
    "dn": "65",
    "schedule": "160S",
    "kgPerM": 14.911363199999998
  },
  {
    "nps": "3",
    "dn": "80",
    "schedule": "5S",
    "kgPerM": 4.5091247999999995
  },
  {
    "nps": "3",
    "dn": "80",
    "schedule": "10S",
    "kgPerM": 6.458614399999999
  },
  {
    "nps": "3",
    "dn": "80",
    "schedule": "40S",
    "kgPerM": 11.2802528
  },
  {
    "nps": "3",
    "dn": "80",
    "schedule": "80S",
    "kgPerM": 15.2685216
  },
  {
    "nps": "3",
    "dn": "80",
    "schedule": "160S",
    "kgPerM": 21.340214399999997
  },
  {
    "nps": "3 1/2",
    "dn": "90",
    "schedule": "5S",
    "kgPerM": 5.1787968
  },
  {
    "nps": "3 1/2",
    "dn": "90",
    "schedule": "10S",
    "kgPerM": 7.411036800000001
  },
  {
    "nps": "3 1/2",
    "dn": "90",
    "schedule": "40S",
    "kgPerM": 13.572019199999998
  },
  {
    "nps": "3 1/2",
    "dn": "90",
    "schedule": "80S",
    "kgPerM": 18.631763199999998
  },
  {
    "nps": "4",
    "dn": "100",
    "schedule": "5S",
    "kgPerM": 5.833587199999999
  },
  {
    "nps": "4",
    "dn": "100",
    "schedule": "10S",
    "kgPerM": 8.3634592
  },
  {
    "nps": "4",
    "dn": "100",
    "schedule": "40S",
    "kgPerM": 16.072128
  },
  {
    "nps": "4",
    "dn": "100",
    "schedule": "80S",
    "kgPerM": 22.3224
  },
  {
    "nps": "4",
    "dn": "100",
    "schedule": "160S",
    "kgPerM": 33.5282448
  },
  {
    "nps": "5",
    "dn": "125",
    "schedule": "5S",
    "kgPerM": 9.4646976
  },
  {
    "nps": "5",
    "dn": "125",
    "schedule": "10S",
    "kgPerM": 11.5778848
  },
  {
    "nps": "5",
    "dn": "125",
    "schedule": "40S",
    "kgPerM": 21.7717808
  },
  {
    "nps": "5",
    "dn": "125",
    "schedule": "80S",
    "kgPerM": 30.953727999999998
  },
  {
    "nps": "5",
    "dn": "125",
    "schedule": "160S",
    "kgPerM": 49.0943984
  },
  {
    "nps": "6",
    "dn": "150",
    "schedule": "5S",
    "kgPerM": 11.295134399999998
  },
  {
    "nps": "6",
    "dn": "150",
    "schedule": "10S",
    "kgPerM": 13.839888
  },
  {
    "nps": "6",
    "dn": "150",
    "schedule": "40S",
    "kgPerM": 28.260158399999995
  },
  {
    "nps": "6",
    "dn": "150",
    "schedule": "80S",
    "kgPerM": 42.561376
  },
  {
    "nps": "6",
    "dn": "150",
    "schedule": "160S",
    "kgPerM": 67.5475824
  },
  {
    "nps": "8",
    "dn": "200",
    "schedule": "5S",
    "kgPerM": 14.762547199999998
  },
  {
    "nps": "8",
    "dn": "200",
    "schedule": "10S",
    "kgPerM": 19.9562256
  },
  {
    "nps": "8",
    "dn": "200",
    "schedule": "40S",
    "kgPerM": 42.5316128
  },
  {
    "nps": "8",
    "dn": "200",
    "schedule": "80S",
    "kgPerM": 64.63078879999999
  },
  {
    "nps": "10",
    "dn": "250",
    "schedule": "5S",
    "kgPerM": 22.6349136
  },
  {
    "nps": "10",
    "dn": "250",
    "schedule": "10S",
    "kgPerM": 27.7839472
  },
  {
    "nps": "10",
    "dn": "250",
    "schedule": "40S",
    "kgPerM": 60.300243200000004
  },
  {
    "nps": "10",
    "dn": "250",
    "schedule": "80S",
    "kgPerM": 81.5362864
  },
  {
    "nps": "12",
    "dn": "300",
    "schedule": "5S",
    "kgPerM": 31.25136
  },
  {
    "nps": "12",
    "dn": "300",
    "schedule": "10S",
    "kgPerM": 35.9985904
  },
  {
    "nps": "12",
    "dn": "300",
    "schedule": "40S",
    "kgPerM": 73.8276176
  },
  {
    "nps": "12",
    "dn": "300",
    "schedule": "80S",
    "kgPerM": 97.4447168
  },
  {
    "nps": "14",
    "dn": "350",
    "schedule": "5S",
    "kgPerM": 34.3616144
  },
  {
    "nps": "14",
    "dn": "350",
    "schedule": "10S",
    "kgPerM": 41.3113216
  },
  {
    "nps": "14",
    "dn": "350",
    "schedule": "40S",
    "kgPerM": 81.28329919999999
  },
  {
    "nps": "14",
    "dn": "350",
    "schedule": "80S",
    "kgPerM": 107.38562559999998
  },
  {
    "nps": "16",
    "dn": "400",
    "schedule": "5S",
    "kgPerM": 41.5643088
  },
  {
    "nps": "16",
    "dn": "400",
    "schedule": "10S",
    "kgPerM": 47.2937248
  },
  {
    "nps": "16",
    "dn": "400",
    "schedule": "40S",
    "kgPerM": 93.2183424
  },
  {
    "nps": "16",
    "dn": "400",
    "schedule": "80S",
    "kgPerM": 123.29405599999998
  },
  {
    "nps": "18",
    "dn": "450",
    "schedule": "5S",
    "kgPerM": 46.7728688
  },
  {
    "nps": "18",
    "dn": "450",
    "schedule": "10S",
    "kgPerM": 53.27612799999999
  },
  {
    "nps": "18",
    "dn": "450",
    "schedule": "40S",
    "kgPerM": 105.138504
  },
  {
    "nps": "18",
    "dn": "450",
    "schedule": "80S",
    "kgPerM": 139.2024864
  },
  {
    "nps": "20",
    "dn": "500",
    "schedule": "5S",
    "kgPerM": 59.2585312
  },
  {
    "nps": "20",
    "dn": "500",
    "schedule": "10S",
    "kgPerM": 68.604176
  },
  {
    "nps": "20",
    "dn": "500",
    "schedule": "40S",
    "kgPerM": 117.0735472
  },
  {
    "nps": "20",
    "dn": "500",
    "schedule": "80S",
    "kgPerM": 155.1109168
  },
  {
    "nps": "22",
    "dn": "550",
    "schedule": "5S",
    "kgPerM": 65.2409344
  },
  {
    "nps": "22",
    "dn": "550",
    "schedule": "10S",
    "kgPerM": 75.53900159999999
  },
  {
    "nps": "22",
    "dn": "550",
    "schedule": "40S",
    "kgPerM": 0.0
  },
  {
    "nps": "22",
    "dn": "550",
    "schedule": "80S",
    "kgPerM": 0.0
  },
  {
    "nps": "24",
    "dn": "600",
    "schedule": "5S",
    "kgPerM": 82.4738272
  },
  {
    "nps": "24",
    "dn": "600",
    "schedule": "10S",
    "kgPerM": 94.4535152
  },
  {
    "nps": "24",
    "dn": "600",
    "schedule": "40S",
    "kgPerM": 140.94363359999997
  },
  {
    "nps": "24",
    "dn": "600",
    "schedule": "80S",
    "kgPerM": 186.92777759999998
  },
  {
    "nps": "30",
    "dn": "750",
    "schedule": "5S",
    "kgPerM": 118.3236016
  },
  {
    "nps": "30",
    "dn": "750",
    "schedule": "10S",
    "kgPerM": 147.3576032
  },
  {
    "nps": "30",
    "dn": "750",
    "schedule": "40S",
    "kgPerM": 0.0
  },
  {
    "nps": "30",
    "dn": "750",
    "schedule": "80S",
    "kgPerM": 0.0
  }
];

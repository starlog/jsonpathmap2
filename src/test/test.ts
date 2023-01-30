import {jsonpathmap2} from "../jsonpathmap2";

const extract = {
  count: '%.list[*].name',
  stringCount: '#.list[*].name',
  type: '$.type',
  fruits: [
    {
      name: '$.list[*].name',
      rating: '$.list[*].rating',
      recordsFor2022: '$.list[*].metadata.records[?(@["year-end"] === 2022)].rating',
      test: [
        {
          item1: '$.list[!].metadata.records[*].rating',
          item2: '$.list[!].metadata.records[*]["year-end"]',
        }
      ]
    }
  ]
}

const data = {
  type: 'fruit',
  list: [
    {
      name: 'apple',
      rating: 10,
      metadata: {
        color: 'red',
        size: 'middle',
        records: [
          {
            'year-end': 2020,
            rating: 10
          },
          {
            year: 2021,
            rating: 8
          },
          {
            year: 2022,
            rating: 6
          },
        ]
      }
    },
    {
      name: 'mango',
      rating: 6,
      metadata: {
        color: 'yellow',
        size: 'big',
        records: [
          {
            year: 2020,
            rating: 7
          },
          {
            year: 2021,
            rating: 5
          },
          {
            year: 2022,
            rating: 3
          },
        ]
      }
    },
    {
      name: 'grape',
      rating: 8,
      metadata: {
        color: 'violet',
        size: 'small',
        records: [
          {
            year: 2020,
            rating: 4
          },
          {
            year: 2021,
            rating: 4
          },
          {
            year: 2022,
            rating: 2
          },
        ]
      }
    }
  ]
};

// const extract = {
//   val: '$["year-around"]',
// }
//
// const data = {
//   'year-around': 'babo'
//
// }

// const data = {
//   data: {
//     "code": 200,
//     "message": "success",
//     "data": {
//       "array": [
//         {
//           "day": "2020-01-01",
//           "slots": [
//             {
//               "start": 0,
//               "end": 7,
//               "color": "#232323",
//               "label": "00-06시 새벽"
//             }
//           ],
//           "deliveryFee": 0,
//           "holyDayCount": 0
//         },
//         {
//           "day": "2020-01-02",
//           "slots": [
//             {
//               "start": 0,
//               "end": 7,
//               "color": "#232323",
//               "label": "00-06시 새벽"
//             }
//           ],
//           "deliveryFee": 0,
//           "holyDayCount": 0
//         },
//         {
//           "day": "2020-01-03",
//           "slots": [
//             {
//               "start": 0,
//               "end": 7,
//               "color": "#232323",
//               "label": "00-06시 새벽"
//             }
//           ],
//           "deliveryFee": 0,
//           "holyDayCount": 0
//         },
//         {
//           "day": "2020-01-04",
//           "slots": [
//             {
//               "start": 0,
//               "end": 7,
//               "color": "#232323",
//               "label": "00-06시 새벽"
//             }
//           ],
//           "deliveryFee": 0,
//           "holyDayCount": 0
//         },
//         {
//           "day": "2020-01-05",
//           "slots": [
//             {
//               "start": 0,
//               "end": 7,
//               "color": "#232323",
//               "label": "00-06시 새벽"
//             }
//           ],
//           "deliveryFee": 0,
//           "holyDayCount": 0
//         },
//         {
//           "day": "2020-01-06",
//           "slots": [
//             {
//               "start": 0,
//               "end": 7,
//               "color": "#232323",
//               "label": "00-06시 새벽"
//             }
//           ],
//           "deliveryFee": 0,
//           "holyDayCount": 0
//         },
//         {
//           "day": "2020-01-07",
//           "slots": [
//             {
//               "start": 0,
//               "end": 7,
//               "color": "#232323",
//               "label": "00-06시 새벽"
//             }
//           ],
//           "deliveryFee": 0,
//           "holyDayCount": 0
//         },
//         {
//           "day": "2020-01-08",
//           "slots": [
//             {
//               "start": 0,
//               "end": 7,
//               "color": "#232323",
//               "label": "00-06시 새벽"
//             }
//           ],
//           "deliveryFee": 0,
//           "holyDayCount": 0
//         },
//         {
//           "day": "2020-01-09",
//           "slots": [
//             {
//               "start": 0,
//               "end": 7,
//               "color": "#232323",
//               "label": "00-06시 새벽"
//             }
//           ],
//           "deliveryFee": 0,
//           "holyDayCount": 0
//         },
//         {
//           "day": "2020-01-10",
//           "slots": [
//             {
//               "start": 0,
//               "end": 7,
//               "color": "#232323",
//               "label": "00-06시 새벽"
//             }
//           ],
//           "deliveryFee": 0,
//           "holyDayCount": 0
//         },
//         {
//           "day": "2020-01-11",
//           "slots": [
//             {
//               "start": 0,
//               "end": 7,
//               "color": "#232323",
//               "label": "00-06시 새벽"
//             }
//           ],
//           "deliveryFee": 0,
//           "holyDayCount": 0
//         },
//         {
//           "day": "2020-01-12",
//           "slots": [
//             {
//               "start": 0,
//               "end": 7,
//               "color": "#232323",
//               "label": "00-06시 새벽"
//             }
//           ],
//           "deliveryFee": 0,
//           "holyDayCount": 0
//         },
//         {
//           "day": "2020-01-13",
//           "slots": [
//             {
//               "start": 0,
//               "end": 7,
//               "color": "#232323",
//               "label": "00-06시 새벽"
//             }
//           ],
//           "deliveryFee": 0,
//           "holyDayCount": 0
//         },
//         {
//           "day": "2020-01-14",
//           "slots": [
//             {
//               "start": 0,
//               "end": 7,
//               "color": "#232323",
//               "label": "00-06시 새벽"
//             }
//           ],
//           "deliveryFee": 0,
//           "holyDayCount": 0
//         }
//       ],
//       "isSuccess": "Y"
//     }
//   }
// }
//
// const extract = {
//   code: '$.data.code',
//   message: '$.data.message',
//   data: '$.data.data'
// };

const startTime = new Date().valueOf();
const myResult2 = jsonpathmap2(extract, data);
const endTime = new Date().valueOf();
console.log(`Time=${endTime - startTime}`);
console.log(JSON.stringify(myResult2, null, 2));

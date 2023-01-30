# jsonpathmap2

Handle jsonpath query for target structure.

Usage:
const myResult = jsonpathmap2(extract, data);
extract: object contain query;
data: object contain data;

Special notation:
$. denotes jsonpath notation (standard)
#. denotes jsonpath notation's count in string (custom to this lib)
%. denotes jsonpath notation's count in number (custom to this lib)
[!]. denotes separate next [*] iteration within branch (custom to this lib) 

For example, lets set this as data.

~~~
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
            year: 2020,
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
}
~~~

And target structure with jsonpath query as follows;
~~~
const extract = {
  count: '%.list[*].name',
  stringCount: '#.list[*].name',
  fruits: [
    {
      name: '$.list[*].name',
      rating: '$.list[*].rating',
      recordsFor2022: '$.list[*].metadata.records[?(@.year === 2022)].rating',
      test: [
        {
          item1: '$.list[!].metadata.records[*].rating',
          item2: '$.list[!].metadata.records[*].year',
        }
      ]
    }
  ]
}
~~~

when call, it prints out result as follows;
~~~
const myResult = jsonpathmap2(extract, data);
console.log(JSON.stringify(myResult, null, 2));

{
  "count": 3,
  "stringCount": "3",
  "fruits": [
    {
      "name": "apple",
      "rating": 10,
      "recordsFor2022": 6,
      "test": [
        {
          "item1": 10,
          "item2": 2020
        },
        {
          "item1": 8,
          "item2": 2021
        },
        {
          "item1": 6,
          "item2": 2022
        }
      ]
    },
    {
      "name": "mango",
      "rating": 6,
      "recordsFor2022": 3,
      "test": [
        {
          "item1": 7,
          "item2": 2020
        },
        {
          "item1": 5,
          "item2": 2021
        },
        {
          "item1": 3,
          "item2": 2022
        }
      ]
    },
    {
      "name": "grape",
      "rating": 8,
      "recordsFor2022": 2,
      "test": [
        {
          "item1": 4,
          "item2": 2020
        },
        {
          "item1": 4,
          "item2": 2021
        },
        {
          "item1": 2,
          "item2": 2022
        }
      ]
    }
  ]
}
~~~

Other example of data:
~~~
const _mydata = {
    type: 'fruit',
    list: [
        {
            name: 'apple',
            taste: 'best'
        },
        {
            name: 'banana',
            taste: 'wow'
        },
        {
            name: 'mango',
            taste: 'delicious'
        }
    ]
}
~~~
query object
~~~
const _myTargetStructure = {
    type: '$.type',
    count: '%.list[0,1]',
    list: [
        {
            name: '$.list[0,1].name'
        }
    ],
    fullcount: '#.list[*]',
    fulllist: [
        {
            name: '$.list[*].name',
            taste: '$.list[*].taste',
        }
    ]
}
~~~
result
~~~
{
  "type": "fruit",
  "count": 2,
  "list": [
    {
      "name": "apple"
    },
    {
      "name": "banana"
    }
  ],
    {
      "name": [
        "apple",
        "banana"
      ]
    }
  ],
  "fullcount": "3",
  "fulllist": [
    {
      "name": "apple",
      "taste": "best"
    },
    {
      "name": "banana",
      "taste": "wow"
    },
    {
      "name": "mango",
      "taste": "delicous"
    }
  ]
}
~~~

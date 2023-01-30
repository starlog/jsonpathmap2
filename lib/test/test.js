"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonpathmap2_1 = require("../jsonpathmap2");
var extract = {
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
};
var data = {
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
};
var startTime = new Date().valueOf();
var myResult2 = (0, jsonpathmap2_1.jsonpathmap2)(extract, data);
var endTime = new Date().valueOf();
console.log("Time=".concat(endTime - startTime));
console.log(JSON.stringify(myResult2, null, 2));
//# sourceMappingURL=test.js.map
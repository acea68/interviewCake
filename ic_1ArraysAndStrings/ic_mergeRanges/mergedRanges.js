/* Your company built an in-house calendar tool called HiCal. You want to add a feature to see the times in a day when everyone is available.

To do this, you’ll need to know when any team is having a meeting. In HiCal, a meeting is stored as objects ↴ with integer properties startTime and endTime. These integers represent the number of 30-minute blocks past 9:00am.

For example:

  { startTime: 2, endTime: 3 }  // meeting from 10:00 – 10:30 am
{ startTime: 6, endTime: 9 }  // meeting from 12:00 – 1:30 pm

JavaScript
Write a function mergeRanges() that takes an array of multiple meeting time ranges and returns an array of condensed ranges.

For example, given:

  [
  { startTime: 0,  endTime: 1 },
  { startTime: 3,  endTime: 5 },
  { startTime: 4,  endTime: 8 },
  { startTime: 10, endTime: 12 },
  { startTime: 9,  endTime: 10 },
]

JavaScript
your function would return:

  [
  { startTime: 0, endTime: 1 },
  { startTime: 3, endTime: 8 },
  { startTime: 9, endTime: 12 },
]

JavaScript
Do not assume the meetings are in order. The meeting times are coming from multiple teams.

Write a solution that's efficient even when we can't put a nice upper bound on the numbers representing our time ranges. Here we've simplified our times down to the number of 30-minute slots past 9:00 am. But we want the function to work even for very large numbers, like Unix timestamps. In any case, the spirit of the challenge is to merge meetings where startTime and endTime don't have an upper bound. */

function mergeRanges(meetings) {
  // Merge meetings ranges

  // i: array of objs representing meeting times of various teams
  // o: array of objects condensing all times into window chunks
  // c: 0 = 9am, each integer = 30 min time block. all meetings have start and end times
  // e: meetings may overlap:; condense these into one large meeting. meetings may contain smaller meetings inside (can disregard these)

  // create meeting chunk var depicting potential range of busy time window
  // iterate thru elems of input arr
  // start time = start of potential range
  // end time of first meeting = end of potential range
  // if next meeting (or any subsequent meeting time) starts before first meeting ended, note end time:
    // if nested end time > parent end time, replace end time with current end time
  // if new elem start time > any end time recorded, create new window
  // repeat process

  let result = [];
  let start, end;
  let sortedMeetings = meetings.sort((a,b) => a.startTime - b.startTime);
  for (let i = 0; i < sortedMeetings.length; i++) {
    let meeting = sortedMeetings[i];
    if (i === 0) {
      start = meeting.startTime;
      end = meeting.endTime;
      continue;
    }
    if (meeting.startTime <= end && meeting.endTime >= end) {
      end = meeting.endTime;
    } else {
      if (meeting.endTime <= end) continue;
      result.push({startTime: start, endTime: end});
      start = meeting.startTime;
      end = meeting.endTime;
    }
  }
  result.push({startTime: start, endTime: end});
  return result;
}


















// Tests
var desc, actual, expected;
// desc = 'meetings overlap';
// actual = mergeRanges([{ startTime: 1, endTime: 3 }, { startTime: 2, endTime: 4 }]);
// expected = [{ startTime: 1, endTime: 4 }];
// assertArrayEquals(actual, expected, desc);

// desc = 'meetings touch';
// actual = mergeRanges([{ startTime: 5, endTime: 6 }, { startTime: 6, endTime: 8 }]);
// expected = [{ startTime: 5, endTime: 8 }];
// assertArrayEquals(actual, expected, desc);

desc = 'meeting contains other meeting';
actual = mergeRanges([{ startTime: 1, endTime: 8 }, { startTime: 2, endTime: 5 }]);
expected = [{ startTime: 1, endTime: 8 }];
assertArrayEquals(actual, expected, desc);

// desc = 'meetings stay separate';
// actual = mergeRanges([{ startTime: 1, endTime: 3 }, { startTime: 4, endTime: 8 }]);
// expected = [{ startTime: 1, endTime: 3 }, { startTime: 4, endTime: 8 }];
// assertArrayEquals(actual, expected, desc);

// desc = 'multiple merged meetings';
// actual = mergeRanges([
//   { startTime: 1, endTime: 4 },
//   { startTime: 2, endTime: 5 },
//   { startTime: 5, endTime: 8 },
// ]);
// expected = [{ startTime: 1, endTime: 8 }];
// assertArrayEquals(actual, expected, desc);

// desc = 'meetings not sorted';
// actual = mergeRanges([
//   { startTime: 5, endTime: 8 },
//   { startTime: 1, endTime: 4 },
//   { startTime: 6, endTime: 8 },
// ]);
// expected = [{ startTime: 1, endTime: 4 }, { startTime: 5, endTime: 8 }];
// assertArrayEquals(actual, expected, desc);

desc = 'oneLongMeetingContainsSmallerMeetings';
actual = mergeRanges([
  { startTime: 1, endTime: 10 },
  { startTime: 2, endTime: 5 },
  { startTime: 6, endTime: 8 },
  { startTime: 9, endTime: 10 },
  { startTime: 10, endTime: 12 }
]);
expected = [
  { startTime: 1, endTime: 12 }
];
assertArrayEquals(actual, expected, desc);

desc = 'sample input';
actual = mergeRanges([
  { startTime: 0, endTime: 1 },
  { startTime: 3, endTime: 5 },
  { startTime: 4, endTime: 8 },
  { startTime: 10, endTime: 12 },
  { startTime: 9, endTime: 10 },
]);
expected = [
  { startTime: 0, endTime: 1 },
  { startTime: 3, endTime: 8 },
  { startTime: 9, endTime: 12 },
];
assertArrayEquals(actual, expected, desc);

function assertArrayEquals(a, b, desc) {
  // Sort the keys in each meeting to avoid
  // failing based on differences in key order.
  orderedA = a.map( function(meeting) {
    return JSON.stringify(meeting, Object.keys(meeting).sort());
  });
  orderedB = b.map( function(meeting) {
    return JSON.stringify(meeting, Object.keys(meeting).sort());
  });
  const arrayA = JSON.stringify(orderedA);
  const arrayB = JSON.stringify(orderedB);
  if (arrayA !== arrayB) {
    console.log(`${desc} ... FAIL: ${JSON.stringify(a)} != ${JSON.stringify(b)}`)
  } else {
    console.log(`${desc} ... PASS`);
  }
}
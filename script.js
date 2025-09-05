// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

function checkCourse(course, ag) {
  if (course.id !== ag.course_id) {
    throw new Error("Assignments does not belong to its course input invalid");
  }
}

function checkPoints(points) {
  if (typeof points !== "number") {
    throw new Error("Points must be a number!");
  }
  if (points <= 0) {
    throw new Error("Points must be greater than 0!");
  }
}

let submissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function crossCheck (main, secondary) {

    for (let i = 0; i < secondary.length; i++) {
        let found = false;
        for (let j = 0; j < main.assignments.length; j++) {
            if (secondary[i].assignment_id === main.assignments[j].id) {
                found = true;
                break;
            }
        }
        if (!found) {
            throw new Error(`No such Assignment ID ${secondary[i].assignment_id}`)
        }
    }
    return true;
}

function get (submissions, AssignmentGroup) {
    let newLearners = [];
    let newSubmissions = submissions;
    let learnerId;
    let result = [];

    while (newSubmissions.length > 0) {
        let currentId = newSubmissions[0].learner_id;
        for (let i = 0; i < newSubmissions.length; i++) {
            if (newLearners == []) {
                newLearners.push(newSubmissions[i]);
                newSubmissions.splice(0, 1);
            } else if (currentId == newSubmissions[i].learner_id) {
                newLearners.push(newSubmissions[i]);
                newSubmissions.splice(0, 1);
            } else if (currentId != newSubmissions[i].learner_id) {
                continue;
            }
        }
        try {
            crossCheck(AssignmentGroup, newLearners);
        } catch (error) {
            console.log(error);
        }
    }
    return newLearners;
}

console.log(get(submissions, AssignmentGroup));

function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
  try {
    checkCourse(course, ag);
    ag.assignments.forEach((a) => checkPoints(a.points_possible));
  } catch (error) {
    console.log(error);
  }

  let sameLearnerId = {};

  for (let i = 0; i < submissions.length; i++) {
    let learnerid = submissions[i].learner_id;

    if (!sameLearnerId[learnerid]) {
      sameLearnerId[learnerid] = [];
    }

    sameLearnerId[learnerid].push(submissions[i]);
  }

  for (let i = 0; i < ag.assignments.length; i++) {
    for (let j = 0; j < sameLearnerId.length; i++) {}
  }
  if (ag.assignments) {}

  const result = [];

//   const result = [
//     {
//       id: 125,
//       avg: 0.985, // (47 + 150) / (50 + 150)
//       1: 0.94, // 47 / 50
//       2: 1.0, // 150 / 150
//     },
//     {
//       id: 132,
//       avg: 0.82, // (39 + 125) / (50 + 150)
//       1: 0.78, // 39 / 50
//       2: 0.833, // late: (140 - 15) / 150
//     },
//   ];

  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);

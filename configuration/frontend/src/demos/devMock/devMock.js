import logo from 'assets/img/logo/logo_200.png'; //url: https://logomakr.com/3kgWwe
// logomakr.com/6E4ThA

import { ENGLISH_ICON, MATHEMATICS_ICON, READING_ICON, SCIENCE_ICON, STAR_ICON, TARGET_ICON, ALERT_ICON, QUESTION_ICON, TIME_ICON } from 'assets/icons';
export const CONSTANTS = {
    TEST_TYPE: "ACT",
    TEST_SECTIONS: {
        ENGLISH: {
            TITLE: "English",
            ICON: ENGLISH_ICON,
        },
        MATHEMATICS: {
            TITLE: "Mathematics",
            ICON: MATHEMATICS_ICON,
        },
        READING: {
            TITLE: "Reading",
            ICON: READING_ICON,
        },
        SCIENCE: {
            TITLE: "Science",
            ICON: SCIENCE_ICON,
        },
    },
    QUESTION_NUMBERS: {
        NUM_ENGLISH_QUESTIONS: 75,
        NUM_MATHEMATICS_QUESTIONS: 75,
        NUM_READING_QUESTIONS: 40,
        NUM_SCIENCE_QUESTIONS: 40,
    }
};

// in addition to the students and tutors, there needs to be organization administrators who have an overview of the process.
// So, someone like James needs to be able to read the notes and view the results of all of the students and tutors.

export const institutionAdmin = {};

// Perhaps parents might want to have an account, read notes and see statistics about their child's progress
    // maybe parents will have access to the dashboard, but not to the profile

export const careGiver = {};

export const mockStudent = {
    id: "s3ri4liz3d User numb3r",
    type: "Student",
    name : {
        firstName: "{Student}",
        lastName: "{Name}",
    },
    institution: "{s3ri4liz3d s7ud3n7 numb3r}",
    status: {
        role: "Student",
        tutors: ["{s3ri4liz3d Tutor numb3r}", 'James', 'Penny'],
        students: null
    },
    progressReports: [
        {
            date: 'UTC',
            notes: '',
            // include graphs of scores?
        }
    ],
    homework: {
        tests: [
            {
                test: "67F",
                sections: [1,2,3]
            },
            {
                test: "68C",
                sections: [2,3]
            },
            {
                test: "71B",
                sections: [1,2]
            }
        ],
        readings: ['Comma Splice', 'Who/Whom'],
        packetExercises: [{packet: "Grammar", sections: ['Comma Splices', 'Who/Whom']}]
    },
    testInfo: {
        diagnostic: "71F",
        tests: {
            partially_completed: [
                {
                    id:"61C",
                    sectoins: {
                        "English": {
                            correct_answers: ['a','b','g','f','c','a','d','a'],
                            student_answers : ['a','b','g','f','c','a','d','c'],
                            missed: [
                                {
                                    number: 8,
                                    theme: "punctuation"
                                },
                                {
                                    number: 18,
                                    theme: "Has/Had"
                                },
                                {
                                    number: 61,
                                    theme: "participles"
                                },
                                {
                                    number: 37,
                                    theme: "Has/Had"
                                }
                            ]
                        }
                    },
                    overall: 28,
                    missed_themes: ["punctuation", "Has/Had", "participeles", "Has/Had", "Who/Whom"],
                    most_missed_theme: {theme:"Has/Had", number_missed: 5},
                },
                {
                    id:"61D",
                    sectoins: [
                        {number: 1, score: 26},
                        {number: 3, score: 30},
                    ],
                    overall: 28
                },
            ],
            completed: [
                {
                    id:"61F",
                    sectoins: [
                        {number: 1, score: 26},
                        {number: 2, score: 28},
                        {number: 3, score: 30},
                        {number: 4, score: 28},
                    ],
                    overall: 28
                },
                {
                    id:"71F",
                    sectoins: [
                        {number: 1, score: 26},
                        {number: 2, score: 28},
                        {number: 3, score: 30},
                        {number: 4, score: 28},
                    ],
                    overall: 28
                }
            ]
    },
    studyMaterial: ['grammarPacket'],
    contact: {
        email: 'studentEmail@host.com',
        phone: '123-456-7890'
    }
    }
};

// Perhaps at some point, experienced tutors will have oversight over other tutors
export const mockTutor = {
    id: "s3ri4liz3d Tutor numb3r",
    type: "Tutor",
    name : {
        firstName: "{Tutor}",
        lastName: "{Name}"
    },
    institution: "s3ri4liz3d Institution numb3r",
    status: {
        role: "tutor",
        tutors: null,
        students: [
            mockStudent.id,
            'Anya',
            'Matthew'
        ]
    },
    material: {
        packets: ['grammar', 'functions'],
        tests: {
            version: {
                act: ['61C', '61D', '61F', '63C', '64E'],
                sat: ['a','b','c','d','e']
            }
        }
    },
    contact: {
        email: 'tutorEmail@host.com',
        availability: 'So that tutors can exchange hours easily',
        phone: '123-456-7890'
    }
};

export const mockInstitution = {
    id: "s3ri4liz3d Institution numb3r",
    title: "{Institution Name}",
    admin: "{institutionAdmin}",
    URL: "http://www.instutionwebsite.com",
    contact: "{object}",
    logo: logo
};
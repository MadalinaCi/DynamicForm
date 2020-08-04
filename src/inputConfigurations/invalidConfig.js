const config = {
  quizId: "123uid",
  questionsNo: 5,
  stepsNo: 2,
  steps: [
    [
      {
        questionId: "1q000",
        question: "Please enter your name.",
        required: true
      },
      {
        questionId: "2q000",
        question: "Select your gender:",
        required: false,
        answerType: "radiobtn",
        answerList: ["Male", "Female", "Other"]
      },
      {
        questionId: "3q000",
        question: "What is your birth date?",
        required: true,
        answerType: "datepicker"
      }
    ],
    [
      {
        questionId: "4q000",
        question: "Select the technologies you have experience with.",
        required: true,
        answerType: "checkbox",
        answerList: [
          "JavaScript",
          "TypeScript",
          "Vue.js",
          "HTML",
          "CSS",
          "React",
          "Angular",
          "NodeJS"
        ]
      },
      {
        questionId: "5q000",
        question: "How many years of experience with JavaScript do you have?",
        required: true,
        answerType: "dropdown",
        answerList: ["< 1 year", "1-2 years", "2-4years", "> 5 years"]
      }
    ]
  ]
};

export default config;

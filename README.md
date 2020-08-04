# dynamic-questionnaire

This repository contains a dynamic form based on configurations.

## Table of Contents

* [Overview](#overview)
* [Installation](#installation)
* [Use](#use)
* [Documentation](#documentation)
* [License](#license)

## Overview <a name="overview"></a>
This project generates forms based on config jsons.

It also have the creation side, where you can generate your configuration based on a dynamic form ui.

## Installation <a name="installation"></a>

### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

## Use <a name="use"></a>
There are 2 major flows: 
### 1. navigate to http://localhost:8080/
Here will be displayed a generated Form based on the configuration taken from /src/inputConfigurations/validCompleteConfig1.js.

At this step there is also validation on the configuration. In case of an invalid one, a message will be displayed and more information can be found in the console.
This feature can be tested by changing this line in Questionnaire.vue: 
``` javascript
import configuration from "@/inputConfigurations/validCompleteConfig1.js";
```

with

``` javascript
import configuration from "@/inputConfigurations/invalidConfig.js";
```

Or by not providing all the features to the question in the /create page (ex: don't select type).

After submitting the responses, you will be redirected to output page where you can see displayed the output configuration that was generated based on your responses.

### 2. navigate to http://localhost:8080/create
Here you can configure your own form dynamically. You can: 

* add/remove groups
* add/remove questions
* configure the questions : question, type, required, predefined answer options

After generating the form, you will be redirected to see the form you've just configured. 

## Documentation <a name="documentation"></a>

### Configuration input
This is an example of a valid configuration: 
``` javascript
{
  quizId: "123uid",
  questionsNo: 5,
  stepsNo: 2,
  steps: [
    [
      {
        questionId: "1q000",
        question: "Please enter your name.",
        required: true,
        answerType: "text"
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
}
```

### Configuration output
This is an example of a valid configuration for the previous input configuration: 
``` javascript
{
   quizId: "123uid",
   steps: [
     [
       {
         questionId: "1q000",
         answer: "test"
       },
       {
         questionId: "2q000",
         answer: "Male"
       },
       {
         questionId: "3q000",
         answer: "2020-07-29"
       }
     ],
     [
       {
         questionId: "4q000",
         "answer": [
           "HTML",
           "CSS"
         ]
       },
       {
         questionId: "5q000",
         answer: "1-2 years"
       }
     ]
   ]
 }
```

## License <a name="license"></a>
UNLICENSED

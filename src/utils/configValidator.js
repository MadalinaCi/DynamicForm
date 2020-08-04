function validate(config) {
  if (!config) {
    return false;
  }

  return (
    checkMandatoryRootFields(config) &&
    checkConsistency(config) &&
    checkQuestions(config)
  );
}

function checkMandatoryRootFields(config) {
  if (!config.quizId) {
    console.error('[Config Validation]: "quizId" field is mandatory!');
    return false;
  }

  if (!config.questionsNo) {
    console.error('[Config Validation]: "questionsNo" field is mandatory!');
    return false;
  }

  if (!config.stepsNo) {
    console.error('[Config Validation]: "stepsNo" field is mandatory!');
    return false;
  }

  if (!config.steps) {
    console.error('[Config Validation]: "steps" field is mandatory!');
    return false;
  }
  return true;
}

function checkConsistency(config) {
  const questionsNo = config.questionsNo,
    stepsNo = config.stepsNo,
    steps = config.steps;

  if (steps.length == stepsNo) {
    let questionsCounter = 0;
    steps.forEach(step => {
      questionsCounter = questionsCounter + step.length;
    });
    if (questionsCounter == questionsNo) {
      return true;
    }
  }
  return false;
}

function checkQuestions(config) {
  const steps = config.steps,
    stepsNo = config.stepsNo;

  for (let step = 0; step < stepsNo; step++) {
    for (let question = 0; question < steps[step].length; question++) {
      if (!checkQuestionFields(steps[step][question])) {
        return false;
      }
    }
  }
  return true;
}

function checkQuestionFields(question) {
  if (!question.questionId) {
    console.error('[Config Validation]: "questionId" field is mandatory!');
    return false;
  }

  if (!question.question) {
    console.error('[Config Validation]: "question" field is mandatory!');
    return false;
  }

  // eslint-disable-next-line no-prototype-builtins
  if (!question.hasOwnProperty("required")) {
    console.error('[Config Validation]: "required" field is mandatory!');
    return false;
  }

  const answerTypes = [
    "radiobtn",
    "checkbox",
    "text",
    "datepicker",
    "dropdown"
  ];
  if (!question.answerType || !answerTypes.includes(question.answerType)) {
    console.error(
      "[Config Validation]: \"answerType\" field  is mandatory and should have one of the following values: 'radiobtn', 'checkbox', 'text', 'datepicker', 'dropdown'!"
    );
    return false;
  }

  if (["radiobtn", "checkbox", "dropdown"].indexOf(question.answerType) > -1) {
    if (!question.answerList) {
      console.error('[Config Validation]: "answerList" field is mandatory!');
      return false;
    }
  }

  return true;
}

export default validate;

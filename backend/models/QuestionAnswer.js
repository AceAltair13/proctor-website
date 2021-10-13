import Option from "./Option.js";

class QuestionAnswer {
  constructor(question, options, questionId) {
    this.questionId = questionId;
    let optionId = 0;
    this.question = question;
    this.options = [];
    options.map((option) => {
      const optionObj = new Option(
        optionId,
        option.optionDesc,
        option.isCorrect
      );
      this.options.push(optionObj);
      optionId++;
    });
  }
  toJson = () => {
    return {
      questionId: this.questionId,
      question: this.question,
      options: this.options,
    };
  };
}
export default QuestionAnswer;

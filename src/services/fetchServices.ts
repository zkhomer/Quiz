import axios from "axios";
import { Question } from "@/types/quiz";

export class QuizService {
  async fetchCategories() {
    try {
      const response = await fetch("https://opentdb.com/api_category.php");
      const data = await response.json();
      return data.trivia_categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  async fetchDifficulties() {
    try {
      const response = await fetch("https://opentdb.com/api_config.php");
      const data = await response.json();
      return data.difficulty_levels;
    } catch (error) {
      console.error("Error fetching difficulties:", error);
      throw error;
    }
  }

  async startQuiz(
    numQuestions: number,
    selectedCategory: string,
    selectedDifficulty: string
  ) {
    if (numQuestions < 1 || numQuestions > 116) {
      alert("Number of Questions should be between 1 and 116");
      return [];
    }
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=${numQuestions}&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`
      );
      const questions: Question[] = response.data.results.map(
        (question: any) => ({
          question: question.question,
          correctAnswer: question.correct_answer,
          incorrectAnswers: question.incorrect_answers,
        })
      );
      return questions;
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      throw error;
    }
  }
}

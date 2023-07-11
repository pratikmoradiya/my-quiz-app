export interface Question {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    answers_options: string[];
    user_answer: string;
}

export interface QuestionResponse {
    results: Question[];
}

export interface QuestionParams {
    category: string;
    difficulty: string;
}
import axios from '../../axios/axios-quiz';
import {
	FETCH_QUIZES_START,
	FETCH_QUIZES_SUCCESS,
	FETCH_QUIZES_ERROR,
	FETCH_QUIZ_SUCCESS,
	QUIZ_SET_STATE,
	FINISH_QUIZ,
	NEXT_QUIZ_QUESTION,
	QUIZ_RETRY,
} from './actionTypes';

export function fetchQuizes() {
	return async dispatch => {
		dispatch(fetchQuizesStart());
		try {
			const response = await axios.get('/quizes.json');
			const quizes = [];
			Object.keys(response.data).forEach((key, index) => {
				quizes.push({id: key, name: `Test ${index + 1}`});
			});
			dispatch(fetchQuizesSuccess(quizes));
		} catch (e) {
			dispatch(fetchQuizesError(e));
		}
	};
}

export function fetchQuizesById(quizId) {
	return async dispatch => {
		dispatch(fetchQuizesStart);
		try {
			const response = await axios.get(`/quizes/${quizId}.json`);
			const quiz = response.data;

			dispatch(fetchQuizSuccess(quiz));
		} catch (e) {
			dispatch(fetchQuizesError(e));
		}
	};
}

export function fetchQuizSuccess(quiz) {
	return {type: FETCH_QUIZ_SUCCESS, quiz};
}

export function fetchQuizesStart() {
	return {
		type: FETCH_QUIZES_START,
	};
}

export function fetchQuizesSuccess(quizes) {
	return {
		type: FETCH_QUIZES_SUCCESS,
		quizes,
	};
}

export function fetchQuizesError(error) {
	return {
		type: FETCH_QUIZES_ERROR,
		error,
	};
}

export function quizSetState(answerState, results) {
	return {
		type: QUIZ_SET_STATE,
		answerState,
		results,
	};
}

export function finishQuiz() {
	return {
		type: FINISH_QUIZ,
	};
}

export function retryQuiz() {
	return {
		type: QUIZ_RETRY,
	};
}

export function nextQuizQuestion(number) {
	return {
		type: NEXT_QUIZ_QUESTION,
		number,
	};
}

export function quizAnswerClick(answerId) {
	return (dispatch, getState) => {
		const state = getState().quiz;

		if (state.answerState) {
			const key = Object.keys(state.answerState)[0];

			if (state.answerState[key] === 'success') {
				return;
			}
		}

		const question = state.quiz[state.activeQestion];
		const results = state.results;

		if (question.rightAnswerId === answerId) {
			if (!results[question.id]) {
				results[question.id] = 'success';
			}
			dispatch(quizSetState({[answerId]: 'success'}, results));
		} else {
			results[question.id] = 'error';
			dispatch(quizSetState({[answerId]: 'error'}, results));
		}
		const timeaut = setTimeout(() => {
			if (isQuizFinished(state)) {
				dispatch(finishQuiz());
			} else {
				dispatch(nextQuizQuestion(state.activeQestion + 1));
			}
			clearTimeout(timeaut);
		}, 1000);

		function isQuizFinished() {
			return state.activeQestion + 1 === state.quiz.length;
		}
	};
}

import {put} from 'redux-saga/effects';

import axios from "../../axios-order";
import * as actions from '../actions/index';

export function* initIngredientsSaga(action) {
    try {
        const response = yield axios.get('https://burger-react-e74f2.firebaseio.com/ingredients.json');
        yield put(actions.setIngredients(response.data))
    } catch (error) {
        yield put(actions.fetchIngredientsFailed())
    }
}
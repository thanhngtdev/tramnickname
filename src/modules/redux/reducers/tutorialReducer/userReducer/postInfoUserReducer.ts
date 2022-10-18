import { IAction } from 'src/data/interfaces/common';
import {
    postInfoUserTypes
} from 'src/modules/redux/actions/tutorialAction/user';
import BaseReducer from '../../handler/baseReducer';

const reducerHandler = new BaseReducer<any, IAction<any>>(postInfoUserTypes);

export default reducerHandler;

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import sessionsReducer from './sessionsReducer';
import usersReducer from './usersReducer';
import errorsReducer from './errorsReducer';
import stockReducer from './stockReducer';
import transactionsReducer from './transactionsReducer';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    sessionsReducer,
    usersReducer,
    errorsReducer,
    stockReducer,
    transactionsReducer
});

// export default persistReducer(persistConfig, rootReducer);
export default rootReducer;



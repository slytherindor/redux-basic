import {
  createStore,
  compose,
  applyMiddleware,
  bindActionCreators,
  combineReducers
} from "redux";

const makeLouder = (string) => string.toUpperCase();
const repeatThrice = (string) => string.repeat(3);
const makeQuieter = (string) => string.toLoweCase();

const makeLoudEcho = compose(makeLouder, repeatThrice);
console.log(makeLoudEcho("d"));

const initialState = { add: 0, sub: 100 };

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const ADD = "ADD";
const incrementAction = {
  type: INCREMENT,
  payload: 10,
  meta: "Other info about action",
  error: "some error "
};
const addAction = {
  type: ADD,
  payload: 5,
  meta: "Other info about action",
  error: "some error "
};

const incrementActionCreator = (amount) => ({
  type: INCREMENT,
  payload: amount
});

const addActionCreator = (amount) => ({
  type: ADD,
  payload: amount
});

const subtractReducers = (state = initialState.sub, action) => {
  console.log("subtract reducer", action);
  if (action.type === DECREMENT) {
    return state - action.payload;
  }
  return state;
};

const addReducers = (state = initialState.add, action) => {
  console.log("add reducer", action);
  if (action.type === INCREMENT) {
    return state + action.payload;
  }

  if (action.type === ADD) {
    return {
      value: state + action.payload
    };
  }
  return state;
};

const reducer = combineReducers({ add: addReducers, sub: subtractReducers });
const store = createStore(reducer, () => {});

console.log(store);

store.dispatch(incrementActionCreator(20));

const subscriber = () => console.log("SUBSCRIBER", store.getState());
// store.subscribe(subscriber);

const actions = bindActionCreators(
  {
    incrementActionCreator,
    addActionCreator
  },
  store.dispatch
);

console.log(actions);

// actions.addActionCreator(22);

store.dispatch(incrementActionCreator(30));
store.dispatch(incrementActionCreator(40));

console.log(store.getState());

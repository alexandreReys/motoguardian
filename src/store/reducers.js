import { combineReducers } from "redux";
import loginReducer from "./reducers/loginReducer";
import oficinaReducer from "./reducers/oficinaReducer";
import clienteReducer from "./reducers/clienteReducer";
import veiculoReducer from "./reducers/veiculoReducer";
import defaultReducer from "./reducers/defaultReducer";

export default combineReducers({
  loginState: loginReducer,
  oficinaState: oficinaReducer,
  clienteState: clienteReducer,
  veiculoState: veiculoReducer,
  defaultState: defaultReducer,
});

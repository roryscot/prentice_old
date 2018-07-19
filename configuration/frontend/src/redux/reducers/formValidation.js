import { combineForms, createForms, } from 'react-redux-form';

// Models

const initialUserState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
};


//Reducer
const myForms = combineForms({
    user: initialUserState
});

export default myForms;
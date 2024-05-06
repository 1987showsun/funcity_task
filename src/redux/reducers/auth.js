const AUTH = (
    state = {
        userId : null,
        token  : null
    },
    action
) => {

    const { type, payload } = action;
    switch(type){
        case "SET_AUTH_TOKEN":
            state = {
                ...state,
                userId : payload? payload.id:payload,
                token  : payload? payload.token:payload
            }
            break;

        default:
            const userId = localStorage.getItem('USER_ID'); 
            const token  = localStorage.getItem('AUTH_TOKEN');
            state = {
                ...state,
                userId : userId,
                token  : token
            }
            break;
    }
    return state;
}

export default AUTH;
const Account = (
    state = {
        accounts: [],
        postTags: [ "history","american", "crime","science", "fiction", "fantasy", "space", "adventure", "nature", "environment", "philosophy", "psychology", "health"]
    },
    action
) => {

    const { type, payload } = action;

    switch(type){
        case "SET_ACCOUNTS":
            state = {
                ...state,
                accounts: payload
            }
            break;

        case "SET_POST_TAGS":
            state = {
                ...state,
                postTags: payload
            };
            break;

        default:
            break;
    }

    return state;
}

export default Account;
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

// Actions
import { getAllAccounts } from '../../redux/actions/account';

const Index = () => {

    const dispatch = useDispatch();
    const {
        token = null
    } = useSelector(state => state.auth);
    

    useEffect(() => {
        if(token){
            const { role="user" } = jwtDecode(token);
            if( role==="admin" ){
                (async() => {
                    await dispatch(
                        getAllAccounts({})
                    );
                })();
            }
        }
    }, [dispatch, token]);

    return (
        <Outlet />
    );
}

export default Index;
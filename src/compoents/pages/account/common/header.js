import { useDispatch } from 'react-redux';
import { Button } from 'antd';

// Actions
import { logoutUserAction } from '../../../../redux/actions/auth';

// Stylesheets
import './public/stylesheets/header.scss';

const Header = ({
    headerLeft  = null,
    headerRight = null
}) => {

    const dispatch = useDispatch();

    const handleLogout = async() => {
        await dispatch(
            logoutUserAction()
        )
    }

    return(
        <header
            id = "account-header"
        >
            <div className='wrap-center'>
                <div className='header-col left'>
                    {headerLeft}
                </div>
                <div className='header-col right'>
                    {headerRight}
                    <Button 
                        onClick = {handleLogout.bind(this)}
                        style   = {{
                            backgroundColor: "transparent",
                            fontSize: "1.2rem",
                            color: "#f95a4f"
                        }}
                    >
                        LOGOUT
                    </Button>
                </div>
            </div>
        </header>
    );
}

export default Header;
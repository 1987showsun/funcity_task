import Header from './header';

// Stylesheets
import './public/stylesheets/container.scss';

const Container = ({
    title       = null,
    headerLeft  = null,
    headerRight = null,
    children    = null
}) => {
    return (
        <div
            id = "account-wrapper"
        >
            <Header
                headerLeft  = {headerLeft}
                headerRight = {headerRight}
            />
            <div id="account-container">
                <div className='wrap-center'>
                    {title && <div className='account-page-title'>{title}</div>}
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Container;
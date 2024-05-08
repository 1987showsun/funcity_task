import { memo, useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { jwtDecode } from "jwt-decode";

// Components
import Item from '../../common/item/post';
import Note from '../../../../common/note';

// Stylesheets
import './public/stylesheets/list.scss';

const PostInfo = ({
    title   = null,
    value   = 0,
    bgColor = null
}) => {
    return(
        <div className='post-info-item-wrap' style={{ backgroundColor: bgColor }}>
            {title && <div className='post-info-item-title'>{title}</div>}
            <div className='post-info-item-value'>{value}</div>
        </div>
    );
}

const List = memo(({
    data         = null,
    handleAction = () => {}
}) => {

    const { token=null } = useSelector(state => state.auth);
    const { accounts=[] } = useSelector(state => state.account);

    const [ stateRole, setRole ] = useState(null);


    useEffect(() => {
        if(token){
            const { role="user" } = jwtDecode(token);
            setRole(role==="user"? null:role);
        }
    }, [token]);

    const showInfo = useMemo(() => {
        if( data ){
            const accountLength = accounts.length;
            return [
                {
                    key  : 'accountLength',
                    bgColor: 'var(--info-total-post-bg)',
                    title: 'Total Account',
                    value: accountLength
                },
                {
                    key  : 'totalPosts',
                    bgColor: 'var(--info-total-account-bg)',
                    title: 'Total Post',
                    value: data.pagination.totalPosts
                },
                {
                    key  : 'totalMyPosts',
                    bgColor: 'var(--info-total-mypost-bg)',
                    title: 'My Post',
                    value: data.pagination.totalMyPosts
                }
            ]
        };
        return null;
    }, [data, accounts]);
    

    return (
        <div className="post-wrap">
            {
                stateRole &&
                    <div className='post-info-wrap'>
                        {
                            showInfo.map(item => {
                                return(
                                    <PostInfo key={item.key} {...item}/>
                                )
                            })
                        }
                    </div>
            }
            {
                data?.list.length>0? (
                    <div className='post-list'>
                        {
                            data.list.map(item => {
                                return(
                                    <Item 
                                        key = {item.id}
                                        {...item}
                                        handleAction = {(val) => handleAction({ ...val, data: item })}
                                    />
                                );
                            })
                        }
                    </div>
                ):(
                    <Note>No post at all.</Note>
                )
            }
        </div>
    );
});

export default List;
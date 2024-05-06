import { memo } from 'react';

// Components
import Item from '../../common/item/post';
import Note from '../../../../common/note';

// Stylesheets
import './public/stylesheets/list.scss';

const List = memo(({
    data         = null,
    handleAction = () => {}
}) => {

    return (
        <div className="post-wrap">
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
import { memo } from "react";
import dayjs from "dayjs";
import { Button, Space, ConfigProvider } from "antd";

// Stylesheets
import './public/stylesheets/post.scss';

const PostItem = memo(({
    body,
    date,
    tags,
    title,
    handleAction = () => {}
}) => {
    return(
        <div className="post-item">
            <div className="post-item-date">{dayjs(date).format('YYYY/MM/DD')}</div>
            <div className="post-item-title">{title}</div>
            <div className="post-item-body">{body}</div>
            <div>
                <Space size={[10,10]} style={{flexWrap: "wrap"}}>
                    {
                        tags.map( item => {
                            return(
                                <span key={item} className="tag-item">{item}</span>
                            );
                        })
                    }
                </Space>
            </div>
            <div className="post-item-footer">
                <Button className="button edit" onClick={handleAction.bind(this, {type: 'EDIT'})}>Edit</Button>
                <Button className="button view" onClick={handleAction.bind(this, {type: 'VIEW'})}>View</Button>
                <Button className="button delete" onClick={handleAction.bind(this, {type: 'DELETE'})}>Delete</Button>
            </div>
        </div>
    );
});

export default PostItem;
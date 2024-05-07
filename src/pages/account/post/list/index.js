import {memo, useState, useEffect } from 'react';
import { ConfigProvider, Pagination, Button, Spin } from 'antd';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from 'react-redux';

// Components
import Container from '../../../../compoents/pages/account/common/container';
import List from '../../../../compoents/pages/account/posts/list/list';
import PostModal from '../../../../compoents/pages/account/posts/list/postModal';
import Note from '../../../../compoents/common/note';

// Actions
import { getPostListAction } from '../../../../redux/actions/post';

const Posts = memo(({}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const limit = Number(searchParams.get('limit')) || 9;
    const page  = Number(searchParams.get('page'))  || 1;

    const [ stateAddPostModalStatus, setAddPostModalStatus ] = useState(false);
    const [ stateHandleActionType  , setHandleActionType   ] = useState(null);
    const [ stateSelectedItem      , setSelectedItem       ] = useState(null);

    const {
        isLoading: postListLoading,
        isSuccess,
        data: post,
        refetch
    } = useQuery({
        queryKey: [`POST_PAGE_${page}_LIST`],
        meta    : { page, limit },
        queryFn : async(params) => {
            const { limit, page } = params.meta;
            return await dispatch(
                getPostListAction({
                    params: {
                        limit,
                        page
                    }
                })
            )
        },
    })

    useEffect(() => {
        refetch({ page, limit });
    }, [refetch, page, limit]);

    const handleAction = ({ type, data }) => {
        switch(type){
            case "VIEW":
                navigate(`/account/post/${data.id}`);
                break;

            default:
                setAddPostModalStatus(true);
                setHandleActionType(type);
                setSelectedItem(data);
                break;
        }
    }
    
    return(
        <Container
            title      = "Post List"
            headerLeft = {
                <>
                    <Button 
                        onClick= {() => {
                            setHandleActionType('ADD');
                            setAddPostModalStatus(true);
                        }}
                        style  = {{
                            backgroundColor: "#f7b959",
                            fontSize: ".8rem",
                            color: "#000",
                            borderRadius: "100px",
                            border: "none"
                        }}
                    >Add New Post</Button>
                </>
            }
        >
            {
                !postListLoading?(
                    isSuccess?(
                        <List
                            data         = {post}
                            handleAction = {handleAction}
                        />
                    ):(
                        null
                    )
                ):(
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: "#f7b959",
                                colorBgContainer: "transparent"
                            },
                        }}
                    >  
                        <Spin 
                            tip      = "Loading" 
                            size     = "large"
                            spinning = {postListLoading}
                        >
                            <div 
                                style={{
                                    padding: 50,
                                }} 
                            />
                        </Spin>
                    </ConfigProvider>
                )
            }
            {
                (isSuccess && post.pagination.totalPosts!==0) &&
                    <Pagination 
                        className      = 'common-pagination-style'
                        defaultPageSize= {limit}
                        defaultCurrent = {post?.pagination.page} 
                        current        = {post?.pagination.page}
                        total          = {post?.pagination.totalPosts} 
                        onChange       = {(page) => {setSearchParams({page})}}
                        style          = {{ textAlign: 'center' }}
                        itemRender     = {(_, type, originalElement) => {
                            if (type === "prev" || type === "next") {
                                return null;
                            }
                            return originalElement;
                        }}
                    /> 
            }
            <PostModal
                actionType         = {stateHandleActionType}
                data               = {stateSelectedItem}
                refetchPostfn      = {() => refetch({ page, limit })}
                addPostModalStatus = {stateAddPostModalStatus}
                closeModal         = {() => setAddPostModalStatus(false)}
            />
        </Container>
    );
});

export default Posts;
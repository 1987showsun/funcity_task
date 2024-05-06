import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// Actions
import { getPostDetailAction } from '../../../../../redux/actions/post';

// Stylesheets
import './public/stylesheets/style.scss';

const Content = () => {

    const dispatch = useDispatch();
    const { id }   = useParams();

    const {
        refetch: refetchPostDetail,
        isLoading,
        isSuccess,
        data: postDetail,
    } = useQuery({
        queryKey: [`POST_DETAIL_${id}`],
        meta    : { id },
        queryFn : async({ meta }) => {
            return await dispatch(
                getPostDetailAction({
                    params: {
                        id
                    }
                })
            );
        }
    });

    useEffect(() => {
        refetchPostDetail({ id });
    }, [id])

    return(
        <div className="post-content-wrap">
            {
                isSuccess?(
                    isLoading?(
                        <div>loading</div>
                    ):(
                        <>
                            <h1  className="title-wrap">{postDetail.title}</h1>
                            <div className='body-wrap'>{postDetail.body}</div>
                            <div className="tags-wrap">
                                {
                                    postDetail.tags.map(item => {
                                        return(
                                            <span key={item}>{item}</span>
                                        );
                                    })
                                }
                            </div>
                        </>
                    )
                ):(null)
            }
        </div>
    );
}

export default Content;
import { memo, useState, useEffect, useCallback, useMemo } from 'react';
import { Button, Modal, Form, Select, Input, Space, notification } from 'antd';
import { useDispatch } from 'react-redux';

// Actions
import { addPostAction, editPostAction, deletePostAction } from '../../../../../redux/actions/post';

// Stylesheets
import './public/stylesheets/postModal.scss';

const FormFooter = ({
    loading,
    actionType,
    closeModal
}) => {

    const setButtonText = useMemo(() => {
        switch(actionType){
            case "ADD":
                return {
                    cancel : "Cancel",
                    submit : "Add"
                }

            case "EDIT":
                return {
                    cancel : "Cancel",
                    submit : "Edit"
                }

            default:
                return{
                    cancel : "Cancel",
                    submit : "Delete"
                }
        }
    }, [actionType]);

    return (
        <Form.Item
            style          = {{ justifyContent: 'center', textAlign: 'center' }}
        >
            <Space 
                align = "center"
                size  = {[20, 0]}
                wrap
            >
                <Button
                    shape        = "round"
                    size         = "large"  
                    htmlType     = "button"
                    onClick      = {() => closeModal()}
                    style        = {{width: '150px'}}
                    className    = 'button cancel'
                >
                    {setButtonText.cancel}
                </Button>
                <Button
                    shape        = "round"
                    size         = "large" 
                    htmlType     = "submit"
                    loading      = {loading}
                    style        = {{width: '150px'}}
                    className    = 'button submit'
                >
                    {setButtonText.submit}
                </Button>
            </Space>
        </Form.Item>
    );
}

const PostDelete = ({
    form,
    loading,
    actionType,
    closeModal,
    handleSubmit,
}) => {
    return (
        <Form
            form          = {form}
            onFinish      = {handleSubmit}
        >
            <Form.Item style={{ textAlign: 'center' }}>
                <p>Are you sure you want to delete this post?</p>
            </Form.Item>
            <FormFooter 
                loading    = {loading}
                actionType = {actionType}
                closeModal = {closeModal}
            />
        </Form>
    );
}

const PostForm = ({
    form,
    loading,
    actionType,
    closeModal,
    handleSubmit,
}) => {
    return(
        <Form
            form          = {form}
            onFinish      = {handleSubmit}
        >
            <Form.Item 
                label        = "Title" 
                name         = "title"
                labelCol     = {{ span: 24 }}
                wrapperCol   = {{ span: 24 }}
                rules        = {[
                    {
                        required : true,
                        message  : 'Please input title!',
                    },
                ]}
            >
                <Input 
                    size         = "large"
                />
            </Form.Item>
            <Form.Item 
                label        = "Content" 
                name         = "body"
                labelCol     = {{ span: 24 }}
                wrapperCol   = {{ span: 24 }}
                rules        = {[
                    {
                        required : true,
                        message  : 'Please input content!',
                    },
                ]}
            >
                <Input.TextArea
                    size         = "large"
                    rows         = {4}
                />
            </Form.Item>
            <Form.Item
                label        = "Tag" 
                name         = "tags"
                labelCol     = {{ span: 24 }}
                wrapperCol   = {{ span: 24 }}
                rules        = {[
                    {
                        required : true,
                        message  : 'Please input tag!',
                    },
                ]}
            >
                <Select 
                    size         = "large"
                    mode         = "tags"
                    open         = {false}
                />
            </Form.Item>
            <FormFooter 
                loading    = {loading}
                actionType = {actionType}
                closeModal = {closeModal}
            />
        </Form>
    );
}

const PostModal = memo(({
    actionType         = null,
    data               = null,
    addPostModalStatus = false,
    refetchPostfn      = () => {},
    closeModal         = () => {},
}) => {    

    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    const [ stateLoading, setLoading ] = useState(false);

    const handleSubmit = async() => {

        const selectActionFn = (type) => {
            if( type==="ADD" ){
                return addPostAction({
                    data: form.getFieldValue()
                })
            }else if(type==="EDIT"){
                return editPostAction({
                    data: form.getFieldValue()
                })
            }else if(type==="DELETE"){
                return deletePostAction({
                    data: form.getFieldValue()
                })
            }
        }

        setLoading(true);
        const { status, message } = await dispatch( selectActionFn(actionType) );
        const regex = /^2\d{2}$/;
        const isSuccess = regex.test(status.toString());
        setLoading(false);

        if( isSuccess ){
            closeModal();
            refetchPostfn();
            form.resetFields();
            api["success"]({
                message     : `${actionType} success`,
                description : message,
                placement   : 'topRight',
            });
            return false;
        }
    }

    useEffect(() => {
        if(actionType==="ADD"){
            form.resetFields();
        }else{
            if( data ){
                form.setFieldsValue(data);
            }
        }
    }, [form, actionType, data]);

    const setModalTitle = useCallback(() => {
        switch(actionType){
            case "EDIT":
                return <div className='modal-title-customize'>Edit Post</div>;

            case "ADD":
                return <div className='modal-title-customize'>Add Post</div>;

            default:
                return <div className={`modal-title-customize status ${actionType.toLowerCase()}`}>{data.title}</div>;
        }
    }, [actionType, data]);

    if( actionType==="ADD" || data ){
        return(
            <Modal
                closeIcon = {null}
                open      = {addPostModalStatus}
                title     = {setModalTitle()}
                onCancel  = {closeModal}
                footer    = {false}
            >
                {
                    actionType==="DELETE"?(
                        <PostDelete
                            form         = {form}
                            loading      = {stateLoading}
                            actionType   = {actionType}
                            closeModal   = {closeModal}
                            handleSubmit = {handleSubmit}
                        />
                    ):(
                        <PostForm 
                            form         = {form}
                            loading      = {stateLoading}
                            actionType   = {actionType}
                            closeModal   = {closeModal}
                            handleSubmit = {handleSubmit}
                        />
                    )
                }
                {contextHolder}
            </Modal>
        );
    }
    return null;
});

export default PostModal;
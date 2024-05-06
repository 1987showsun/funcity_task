import { Button } from "antd";
import { useNavigate } from "react-router-dom";

// Components
import Container from "../../../../compoents/pages/account/common/container";
import Content from '../../../../compoents/pages/account/posts/details/content';

const Index = () => {

    const navigate = useNavigate();

    return(
        <>
            <Container
                title      = "View Post"
                headerLeft = {
                    <>
                        <Button 
                            onClick= {() => navigate(-1)}
                            style  = {{
                                backgroundColor: "#f7b959",
                                fontSize: ".8rem",
                                color: "#000",
                                borderRadius: "100px",
                                border: "none"
                            }}
                        >Back</Button>
                    </>
                }
            >
                <Content />
            </Container>
        </>
    );
}

export default Index;
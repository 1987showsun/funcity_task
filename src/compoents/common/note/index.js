import styled from "styled-components";

const NoteStyle = styled.div`
    width: 100%;
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: #999;
`;

const Note = ({
    children = null,
}) => {
    if( children ){
        return(
            <NoteStyle>{children}</NoteStyle>
        );
    }
    return null;
}

export default Note;

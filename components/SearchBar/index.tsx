'use client'
import styled from "@emotion/styled";

interface Props {
    userInput: string;
    setUserInput: React.Dispatch<React.SetStateAction<string>>;
    onKeyDown?: (e: React.KeyboardEvent) => void;
}

const SearchBar = ( { userInput, setUserInput, onKeyDown }: Props ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };


    return (
        <Wrapper>
            <TextField 
                type="text" 
                value={userInput} 
                onChange={handleChange} 
                onKeyDown={onKeyDown}
                placeholder="할 일을 입력해주세요" />
        </Wrapper>
    )
}

export default SearchBar;

const Wrapper = styled.div`
    width: 100%;
    border-radius: 24px;
    padding-left: 1rem;
    background-color: #E2E8F0;
    border: 2px solid;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 6px 4px 0 #0F172A;
    display: flex;
    align-items: center;
`

const TextField = styled.input`
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 16px;
    width: 100%;
`
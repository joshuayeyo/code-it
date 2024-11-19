import SearchBar from "@/components/SearchBar";
import axios from "axios";
import { useState } from "react";
import styled from "@emotion/styled";
import Button from "@/components/Button";
import { TodoProps } from "@/types";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL

const SearchBarSection = ({ addTodo }: {addTodo: (newTodo: TodoProps) => void }) => {
    const [userInput, setUserInput] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput) {
            alert("Todo가 입력되지 않았습니다!")
            return;
        }
        try {
            const response = await axios.post(`${BASEURL}/api/joshuayeyo/items`, { name: userInput });
            addTodo(response.data)
        } catch (error) {
            console.log(error); 
        } finally {
            setUserInput('')
        }
    };

    return(
            <FormContainer onSubmit={handleSubmit}>
            <SearchBar userInput={userInput} setUserInput={setUserInput} />
            <Button
                type="submit"
                variant="post"
                userInput={userInput}
                onClick={handleSubmit}
            />
        </FormContainer>
    )
}

export default SearchBarSection;

const FormContainer = styled.form`
    gap: 8px;
    display: flex;
    flex-direction: row;
    height: 56px;
    padding: 1rem;
    justify-content: center;
`
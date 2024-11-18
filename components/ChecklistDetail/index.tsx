import { TodoProps } from "@/types";
import styled from "@emotion/styled";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

interface Props {
    todo: TodoProps;
    setItemName: (name: string) => void;
    itemName: string;
}

const ChecklistDetail = ({ todo, itemName, setItemName }: Props) => {
    const [completed, setCompleted] = useState(todo.isCompleted);
    const imagePath = completed ? "/check/whiteCheck.png" : "";
    if (!todo) {
        return <div>할 일 데이터가 없습니다.</div>;
    }

    // 완료 상태를 토글하는 함수입니다.
    const updateStatus = async () => {
        const newStatus = !completed;
        try {
                await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/joshuayeyo/items/${todo.id}`, {
                isCompleted: newStatus,
            });
            setCompleted(newStatus)
        } catch (error) {
            console.log("Error updating status:", error);
        }
    };

    const handleNameUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemName(e.target.value);       // itemName 상태 업데이트
    }

    return(
        <Wrapper>
            <BarConatiner isCompleted={completed}>
                <TodoButton isCompleted={completed} onClick={updateStatus} >
                    {imagePath && (
                        <Image 
                        src={imagePath} 
                        alt="Vector icon"
                        width={16}
                        height={16}
                        />
                    )}
                </TodoButton>                
                <ItemName>
                    <NameInput
                        value={itemName}
                        onChange={handleNameUpdate}
                    />
                </ItemName>
            </BarConatiner>
        </Wrapper>
    )
}
export default ChecklistDetail;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;

`

const BarConatiner = styled.div<{ isCompleted: boolean }>`
    width: 996px;
    height: 64px;
    border-radius: 24px;
    border: 2px solid;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ isCompleted }) => (isCompleted ? '#DDD6FE' : '#FEFCE8')};
`

const TodoButton = styled.button<{ isCompleted: boolean }>`
    width: 32px;
    height: 32px;
    border: 2px solid;
    border-radius: 100%;
    background-color: ${({ isCompleted }) => (isCompleted ? '#7C3AED' : '#FEFCE8')};
    border-color: ${({ isCompleted }) => (isCompleted ? 'none' : '#000')};
    cursor: pointer;
    transition: background-color 0.3s ease, border-color 0.3s ease;
`

const ItemName = styled.span`
    margin-left: 1rem;
    font-size: 16px;
    text-decoration: underline;
`

const NameInput = styled.input`
    border: none;
    background-color: transparent;
    font-size: 16px;
    text-decoration: underline;
    outline: none;
    width: 300%;
`;
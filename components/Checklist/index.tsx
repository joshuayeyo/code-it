'use client'
import styled from "@emotion/styled";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
    item: {
        id: number;
        name: string;
        memo?: string;
        isCompleted: boolean;
    };
    isCompleted: boolean;
    updateTodoCompletion: (id: number, completed: boolean) => void;
}

const Checklist = ({item, isCompleted, updateTodoCompletion}: Props) => {
    const router = useRouter();
    const updateStatus = async () => {
        const newStatus = !isCompleted;
        updateTodoCompletion(item.id, newStatus);
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/joshuayeyo/items/${item.id}`, {
                isCompleted: newStatus,
            });
            console.log("Completed status updated:", response.data);
        } catch (error) {
            console.log("Error updating status:", error);
        }
    };


    const navigateToDetailPage = () => {
        router.push(`/items/${item.id}`);
    };

    const imagePath = isCompleted ? "/check/whiteCheck.png" : "";

    return (
        <Wrapper>
            <TodoContainer>
                <TodoButton isCompleted={isCompleted} onClick={updateStatus}>
                    {imagePath && (
                        <Image 
                        src={imagePath} 
                        alt="Vector icon"
                        width={16}
                        height={16}
                        />
                    )}
                </TodoButton>
                <TodoText isCompleted={isCompleted} onClick={navigateToDetailPage}>
                    {item.name}
                </TodoText>
            </TodoContainer>
        </Wrapper>
    )
}

export default Checklist;

const Wrapper = styled.div`
    width: 100%;
    height: 50px;
    border-radius: 27px;
    border: 2px solid rgba(0, 0, 0);
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    @media (max-width: 1199px) {
        width: 90%;
    }
    @media (min-width: 1200px) {
        width: 588px
    }
`

const TodoContainer = styled.div`
    width: 100%;
    height: 100%;
    margin-left: 1rem;
    display: flex;
    align-items: center;
`

const TodoButton = styled.button<{ isCompleted: boolean}>`
    width: 32px;
    height: 32px;
    border: 2px solid;
    border-radius: 100%;
    background-color: ${({ isCompleted }) => (isCompleted ? '#7C3AED' : '#FEFCE8')};
    border-color: ${({ isCompleted }) => (isCompleted ? 'none' : '#000')};
    cursor: pointer;
    transition: background-color 0.3s ease, border-color 0.3s ease;
`

const TodoText = styled.span<{ isCompleted: boolean }>`
    margin-left: 1rem;
    font-size: 16px;
    text-decoration: ${({ isCompleted }) => (isCompleted ? 'line-through' : 'none')};
    cursor: pointer;
`
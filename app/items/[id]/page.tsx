'use client'
import ChecklistDetail from "@/components/ChecklistDetail";
import TodoDetailSection from "@/sections/DetailSection";
import { TodoProps } from "@/types";
import styled from "@emotion/styled";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


const ItemDetailPage = () => {
    const { id } = useParams();
    const [todos, setTodos] = useState<TodoProps>();
    const[isLoading, setIsLoading] = useState(true);
    const [itemName, setItemName] = useState<string>("");

    // Todo 상세 데이터 가져오는 훅
    useEffect(() => {
        if (!id) return;
        const fetchItemDetail = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/joshuayeyo/items/${id}`
                    );
                setTodos(response.data);
                setItemName(response.data.name)
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false)
            }
        };
        fetchItemDetail();
    }, [id]);

    if (isLoading) {
        return <></>;
    }
    
    return (
        <Wrapper>
            {todos?.id !== undefined && (
                <ChecklistDetail 
                    todo={todos}
                    setItemName={setItemName}
                    itemName={itemName}
                />
            )}
            {todos && 
                <TodoDetailSection
                    todo={todos}
                    itemName={itemName}
                />
            }
        </Wrapper>
    );
};

export default ItemDetailPage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    height: calc(100vh - 60px);
`;
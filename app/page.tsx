'use client'
import SearchBarSection from "@/sections/SearchBarSection";
import TodoListSection from "@/sections/TodoListSection";
import { TodoProps } from "@/types";
import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Home() {
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [currentPage] = useState(1);

  const fetchTodos = async (page: number) => {
    const limit = 20;
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/joshuayeyo/items`, {
        params: { page, limit}
      });
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchTodos(currentPage);
  }, [currentPage]);


  const addTodo = (newTodo: TodoProps) => {
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  // // 페이지네이션을 위한 함수 추가
  // const paginate = (pageNumber: number) => {
  //   setCurrentPage(pageNumber); 
  // }

  return (
    <Wrapper>
    <SearchBarSection addTodo={addTodo} />
    <TodoListSection todos={todos} setTodos={setTodos} />
    </Wrapper>   
  );
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`
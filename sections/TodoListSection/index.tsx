import Image from "next/image";
import Checklist from "@/components/Checklist";
import styled from "@emotion/styled";
import { TodoProps } from "@/types";

const TodoListSection = ({ todos, setTodos }: { todos: TodoProps[]; setTodos: React.Dispatch<React.SetStateAction<TodoProps[]>> }) => {
        const updateTodoCompletion = (id: number, completed: boolean) => {
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === id ? { ...todo, isCompleted: completed } : todo
                )
            );
        };   

    return(
        <Wrapper>
            <TodoSection>
                <Image src="/labels/todo.png" alt="Todo Label" width={101} height={36} />
                {todos.filter((todo) => !todo.isCompleted).length > 0 ? (
                    <ChecklistContainer>
                        {todos.filter((todo) => !todo.isCompleted).map((todo) => {
                            return(
                                <div key={todo.id}>
                                    <Checklist item={todo} isCompleted={todo.isCompleted} updateTodoCompletion={updateTodoCompletion} />
                                </div>
                            )
                        })}
                    </ChecklistContainer>
                ) : (
                    <EmptyContainer>
                        <Image src="/empty/Todo.png" alt="Todo Empty" width={240} height={240} />
                        <span>할 일이 없어요.</span>
                        <span>TODO를 새롭게 추가해주세요!</span>
                    </EmptyContainer>
                )}
            </TodoSection>
            <TodoSection>
                <Image src="/labels/done.png" alt="Done Label" width={101} height={36} />
                {todos.filter((todo) => todo.isCompleted).length ? (
                    <ChecklistContainer>
                        {todos.filter((todo) => todo.isCompleted).map((todo) => {
                            return(
                                <div key={todo.id}>
                                    <Checklist item={todo} isCompleted={todo.isCompleted} updateTodoCompletion={updateTodoCompletion} />
                                </div>
                            )
                        })}
                    </ChecklistContainer>
                ) : (
                    <EmptyContainer>
                        <Image src="/empty/Done.png" alt="Done Empty" width={240} height={240} />
                        <span>아직 다 한 일이 없어요.</span>
                        <span>해야 할 일을 체크해보세요!</span>
                    </EmptyContainer>
                )}
            </TodoSection>
        </Wrapper>
    )
}

export default TodoListSection;

const Wrapper = styled.div`
    padding: 1rem;
    display: flex;
    width: 100%;
    height: auto;
    @media (max-width: 1199px) {
        flex-direction: column;
    }
    @media (min-width: 1200px) {
        flex-direction: row;
    }

`

const TodoSection = styled.section`
    flex-direction: column;
    width: 50%;
    display: flex;
    gap: 1rem;
    @media (max-width: 1199px) {
        width: 100%;
    }
    @media (min-width: 1200px) {
        width: 100%;
    }
`

const ChecklistContainer = styled.div`
    justify-content: center;
    width: 100%;
`

const EmptyContainer = styled.div`
    height: 30vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 16px;
    color: #94A3B8;
    text-align: center;
`
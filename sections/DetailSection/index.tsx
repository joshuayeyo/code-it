import Button from "@/components/Button";
import ImageUploader from "@/components/ImageUploader";
import { TodoProps } from "@/types";
import styled from "@emotion/styled";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
    todo: TodoProps;
    itemName: string;
}

const TodoDetailSection = ({todo, itemName}: Props) => {
    const [userMemo, setUserMemo] = useState(todo.memo);
    const [uploadedUrl, setUploadedUrl] = useState(todo.imageUrl);
    const router = useRouter();
    const [preview, setPreview] = useState<string | null>(null); // 프리뷰 URL 상태
    const [isUploaded, setIsUploaded] = useState<boolean>(false)
    
    useEffect(() => {
        if (todo.imageUrl) {
            setPreview(todo.imageUrl);      // 서버에서 이미지를 받아왔다면 미리보기로 해당 이미지 설정
            setIsUploaded(true);            // 서버에서 이미지를 받아왔다면, 업로드 된 것으로 변경
        }
    }, [todo.imageUrl]);


    const handleFileUpload = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append("image", file);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/joshuayeyo/images/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            });
            setUploadedUrl(response.data.url);
            setIsUploaded(true);
        } catch (error) {
            console.error("Error during file upload:", error);
        }
    };

    const handleSubmit = async () => {
        try {
            if (!isUploaded && uploadedUrl != todo.imageUrl) {
                alert("이미지 업로드가 진행중입니다.");
                return;
            }

            const updatedData = {
                name: itemName,
                memo: userMemo !== todo.memo ? userMemo : "",       // 서버는 null을 허용하기 않기 때문에, 입력된 메모가 없을 경우 빈 스트링으로 처리
                imageUrl: uploadedUrl !== todo.imageUrl ? uploadedUrl : (todo.imageUrl || ""),     // 서버는 null을 허용하기 않기 때문에, 입력된 이미지가 없을 경우 빈 스트링으로 처리
            };

            await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/joshuayeyo/items/${todo.id}`, updatedData);
            router.push(`/`);
        } catch (error) {
            console.error("아이템 제출 오류:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/joshuayeyo/items/${todo.id}`);
        } catch (error) {
            console.error("Error deleting item:", error);
            alert("아이템 삭제에 실패했습니다.");
        } finally {
            router.push(`/`);
        } 
    }

    return(
        <Wrapper>
            <EditContainer>
                <ImageUploader onUpload={handleFileUpload} preview={preview} />
                <MemoContainer>
                    <Title>Memo</Title>
                    <TextAreaContainer> {/* TextArea를 정렬할 컨테이너 */}
                        <TextArea 
                        value={userMemo != null ? userMemo : ""} 
                        onChange={(e) => setUserMemo(e.target.value)} 
                        placeholder="메모를 작성해 주세요."
                        />
                    </TextAreaContainer>
                </MemoContainer>
            </EditContainer>
            <ButtonContainer>
                <Button type="submit" variant="edit" isUploaded={isUploaded} userMemo={userMemo || ""} onClick={handleSubmit} />
                <Button type="submit" variant="delete" onClick={handleDelete} />
            </ButtonContainer>
        </Wrapper>
    );
}

export default TodoDetailSection;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const EditContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    padding: 2rem;
    gap: 32px;

    @media (min-width: 1200px) {
        justify-content: center;
        flex-direction: row;
        width: 100%;
    }
`

const MemoContainer = styled.div`
    width: 588px;
    height: 311px;
    background-color: #FEFCE8;
    border-radius: 24px;
    padding: 16px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border: none;
    position: relative;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    cursor: text;
    overflow-y: scroll;


    &::before {
        content: '';
        position: absolute;
        top: 40px;
        left: 16px;
        right: 16px;
        height: calc(100% - 40px);
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
        background-size: 100% 32px;
        z-index: 0;
    }

    @media (max-width: 1199px) {
        width: 100%;
    }
`

const ButtonContainer = styled.div`
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    gap: 16px;
    width: 90%;
    margin-right: 10px;

    @media (min-width: 1199px) {
        justify-content: flex-end;
        margin-right: 20px;
    }
`

const Title = styled.h3`
    position: relative;
    font-size: 18px;
    font-weight: bold;
    color: #92400E;
    margin-bottom: 16px; /* 타이틀 아래 여백 */
`;

const TextAreaContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    overflow: hidden;
`


const TextArea = styled.textarea`
    width: 100%;
    height: 100%;
    resize: none;
    padding: 16px;
    font-size: 16px;
    color: #1E293B;
    background-color: transparent;
    border: none;
    outline: none;
    z-index: 10;
    display: flex;
    text-align: center;

    font-family: "NanumSqaure", sans-serif;
    overflow-y: auto;

    &::placeholder {
        color: #1E293B;
    }
`;
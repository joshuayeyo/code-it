import styled from "@emotion/styled";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";

const ImageUploader = ({onUpload, preview}: {onUpload: (file: File) => void, preview: string | null}) => {
    const [localPreview, setLocalPreview] = useState<string | null>(preview)
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    
    // 이미지 업로드 창 열기
    const handleButtonClick = () => {
        fileInputRef.current?.click();
    }

    // 파일 업로드 감지 함수
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            alert("파일 크기는 5MB 이하로 업로드해주세요.");
            return;
        }

        const englishNameRegex = /^[a-zA-Z0-9_.-]+$/;
        if (!englishNameRegex.test(file.name)) {
            alert("파일 이름은 영어와 숫자, '_', '-', '.'만 포함할 수 있습니다.");
            return;
        }
        
        setLocalPreview(URL.createObjectURL(file));
        onUpload(file);
        };

        useEffect(() => {
            setLocalPreview(preview); // 외부에서 받은 preview로 업데이트
        }, [preview]);
    

    return (
        <Wrapper>
            { localPreview ? (
                <PreviewImage src={localPreview} alt={"Preview"} />
            ) : (
                <Image src="/icons/img.png" alt="이미지" width={64} height={64} />
            )}
            { localPreview ? (
                <UploadButton onClick={handleButtonClick}> <Image src="/icons/edit.png" alt={"Edit Button"} width={24} height={24} /> </UploadButton>
            ) : (
                <UploadButton onClick={handleButtonClick} hasPreview={!localPreview}> + </UploadButton>
            )}
            <HiddenInput
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
            />
        </Wrapper>
    )

}

export default ImageUploader;

const Wrapper = styled.div`
    width: 384px;
    height: 311px;
    background-color: #F8FAFC;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed #CBD5E1;    
    border-radius: 24px;
    position: relative;

    @media (max-width: 1199px) {
        width: 100%;
    }
`

const PreviewImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 24px;
`;

const UploadButton = styled.button<{hasPreview?: boolean}>`
    background-color: ${({ hasPreview }) => (hasPreview ? "#E2E8F0" : "#0F172A80")}; /* localPreview에 따라 배경색 변경 */
    width: 64px !important;
    height: 64px !important;
    border-radius: 50%;
    border: 2px solid ${({ hasPreview }) => (hasPreview ? "#0F172A" : "none")}; /* localPreview에 따라 배경색 변경 */
    font-size: 48px;
    color: #64748B;
    position: absolute;
    bottom: 10px;
    right: 10px;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
`

const HiddenInput = styled.input`
    display: none;
`
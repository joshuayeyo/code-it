'use client'
import { ButtonProps } from "@/types";
import styled from "@emotion/styled";
import Image from "next/image";
import { useState, useEffect } from "react";

const Button = ({ type, onClick, userMemo, userInput, variant, isUploaded }: ButtonProps) => {
    const [isMobileScreen, setIsMobileScreen] = useState(false);

    useEffect(() => {
        const updateImageSrc = () => {
            setIsMobileScreen(window.innerWidth <= 768);
        };
        updateImageSrc();
        
        window.addEventListener('resize', updateImageSrc);
        
        return () => window.removeEventListener('resize', updateImageSrc);
    }, []);

    return (
        <Wrapper>
            <StyledButton type={type} onClick={onClick} variant={variant} userMemo={userMemo != null ? userMemo : ""} userInput={userInput} isUploaded={isUploaded}>
                {variant === "delete" && (
                    <>
                        <Image src="/icons/X.png" alt="White X" width={16} height={16} />
                        <Text>삭제 완료</Text>
                    </>
                )}
                {variant === "edit" && (
                    <>
                        <Image src="/check/blackCheck.png" alt="Black Check" width={16} height={16} />
                        <Text>수정 완료</Text>
                    </>
                )}
                {variant === "post" && (
                    <>
                        {isMobileScreen ? "+" : "+ 추가하기"}
                    </>
                )}
            </StyledButton>
        </Wrapper>
    );
};

export default Button;

const Wrapper = styled.div``;

const StyledButton = styled.button<{ variant: string; userMemo?: string; userInput?: string; isUploaded?:boolean }>`
    color: ${(props) => {
        if (props.variant === "edit") return "black";
        if (props.variant === "post") return props.userInput?.trim() ? "white" : "black";
        return "white"; // 기본 색상
    }};
    border-radius: 24px;
    background-color: ${(props) => {
        if (props.variant === "delete") return "#F43F5E";
        if (props.variant === "edit") {
            if (props.isUploaded) return "#BEF264";         // 이미지가 새롭게 업로드 완료 됐을 때 색상 변경
            return props.userMemo?.trim() ? "#BEF264" : "#E2E8F0";
        }
        if (props.variant === "post") return props.userInput?.trim() ? "#7C3AED" : "#E2E8F0";
        return "#E2E8F0"; // 기본 색상
    }};
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1), 4px 6px 0 #0F172A;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 1;
    
    width: 164.35px;
    height: 56px;

    @media (max-width: 767px) {
        width: ${(props) => (props.variant === "post" ? "56px" : "164.35px")};
        height: ${(props) => (props.variant === "post" ? "56px" : "56px")};
    };
`;

const Text = styled.span`
    font-size: 16px;
`;
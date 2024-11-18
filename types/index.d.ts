export interface TodoProps{
    id: number;
    name: string;
    memo?: string;
    imageUrl?: string;
    isCompleted: boolean;
}

export interface ButtonProps {
    type: "submit" | "button";
    onClick: (e: React.FormEvent) => void;
    userMemo?: string | null;  // EditButton에서만 사용되는 필드
    userInput?: string;
    variant: "delete" | "edit" | "post"; // 버튼 타입을 구분하기 위한 필드
    isUploaded?: boolean; // 이미지 업로드 상태를 체크하기 위한 필드
}
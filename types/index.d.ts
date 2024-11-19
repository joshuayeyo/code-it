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
    isCompleted?: boolean;      // statusToggle을 위한 버튼에 사용되는 Prop
    userMemo?: string | null;  // EditButton에서만 사용되는 Prop
    userInput?: string;
    variant: "delete" | "edit" | "post" | "statusToggle"; // 버튼 타입을 구분하기 위한 Prop
    isUploaded?: boolean; // 이미지 업로드 상태를 체크하기 위한 Prop
}
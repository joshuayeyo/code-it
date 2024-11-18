'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";

const Header = () => {
    const [imageSrc, setImageSrc] = useState("/logos/Large.png");
    const [imageWidth, setImageWidth] = useState(151);
    const router = useRouter();

    useEffect(() => {
        const updateImageSrc = () => {
            if (window.innerWidth <= 768) {
                setImageSrc('/logos/Small.png');
                setImageWidth(76);
            } else {
                setImageSrc('/logos/Large.png');
                setImageWidth(151);
            }
        }
        updateImageSrc();

        window.addEventListener('resize', updateImageSrc);

        return () => window.removeEventListener('resize', updateImageSrc);
    }, [])

    const handleNavigate = () => {
        router.push('/');
    }

    return (
        <Wrapper>
            <Container>
                <Image 
                    src={imageSrc}
                    alt="Logo" 
                    width={imageWidth} 
                    height={40}
                    onClick={handleNavigate} 
                    style={{ cursor: 'pointer' }}
                    sizes="(max-width: 768px) 76px, 151px"
                    />
            </Container>
        </Wrapper>

    )
}

export default Header;

const Wrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 60px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 1rem;
`

const Container = styled.div`
    @media (max-width: 1199px){
    width: 100%;
}

@media (min-width: 1200px) {
    width: 60%;
}
`
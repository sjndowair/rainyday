import {useEffect} from "react";
import InputBox from "../inputBox";
import Form from "../../atoms/form";


interface IPostCreationFormProps {
    onClick?: () => void;
    isOpenModal?: boolean;
}

const PostCreationForm = ({onClick, isOpenModal}: IPostCreationFormProps) => {

    const onClickInnerBox = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    useEffect(() => {
        if(isOpenModal) document.body.style.overflow = "hidden";
        return () => {document.body.style.overflow = "initial";};
    }, [isOpenModal]);


    return (
        <div onClick={onClick} className={`bg-purple-500 bg-opacity-50 w-[100%] min-h-screen h-[1300px] absolute top-0 left-0 z-[1] `}>
        <div
            onClick={onClickInnerBox}
            className={`w-[100%] px-[5rem] pt-[4rem] max-w-[900px] h-[40rem] bg-white absolute top-[7rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2"  z-[9999] rounded-2xl`}>
            <Form>
                <label>
                    <h3 className={`text-[1.25rem] text-purple-500 pb-3 font-bold`}>제목</h3>
                    <InputBox type={`text`}/>
                </label>
                <label >
                    <h3 className={`py-7 text-[1.25rem] mt-3 text-purple-500 font-bold`}>글쓰기</h3>
                    <textarea className={`bg-purple-100 rounded-xl bg-opacity-90 w-full p-5 h-[15rem]`} />
                </label>
            </Form>
        </div>
        </div>
    )
}

export default PostCreationForm
import {SetStateAction, useEffect, useState} from "react";

import MyPageButton from "../../atoms/myPageButton";

interface IPostBoxProps {
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    onKeyDown? : (e: React.KeyboardEvent<HTMLButtonElement>) => void;
    onChange? : (e:React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isIntroSave?: boolean;
    setIsOpenMessageBox?: React.Dispatch<React.SetStateAction<boolean>>;
    setIsIntroSave?: React.Dispatch<React.SetStateAction<boolean>>;
}





const PostBox = ({onClick, onSubmit, onChange, onKeyDown, setIsOpenMessageBox, setIsIntroSave}:IPostBoxProps) => {


    const onClickDirection = () => {
        setIsIntroSave?.(false)
        setIsOpenMessageBox?.(false)
    }





    return (
        <div
            className={`max-w-[500px] w-[100%] rounded-2xl  h-[20rem] bg-white bg-opacity-60 absolute top-[50%] translate-x-[-50%]  translate-y-[-50%] left-[50%]  z-[10] `}>
            <label className={`flex flex-col gap-10  h-[100%]`}>
                <p className={`font-bold bg-purple-500 mb-10 w-100 text-white rounded-t-2xl py-2 flex items-center justify-center text-2xl`}>자신을
                    소개 해주세요!</p>
                <form method="post" onSubmit={(e) => onSubmit!(e)}
                      className={`flex flex-col justify-center items-center  gap-10 w-full`}>
                    <input onChange={onChange}
                           className={`border indent-2 w-[80%] px-5 rounded-md border-purple-600 h-[2.75rem]`}
                           placeholder={`한줄 소개글을 입력해주세요`}/>
                    <div className={`flex gap-10`}>
                    <button
                        onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => onKeyDown?.(e)}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => onClick?.(e)}
                        className={`h-[2.5rem] bg-purple-500 text-white rounded-md p-2`}
                        type={"button"}>저장
                    </button>
                    <button
                        onClick={() => onClickDirection?.()}
                        className={`h-[2.5rem] bg-purple-500 text-white rounded-md p-2`} type={"button"}>취소
                    </button>
                    </div>
                </form>
            </label>
        </div>
    )


}

export default PostBox
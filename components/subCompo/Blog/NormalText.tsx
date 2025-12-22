import { fonnts_com_Lyon_Roman } from "../fonts"

export default function NormalText({ children, firstCapital }: { children: string, firstCapital?: boolean }) {
    return (
        <div className={`${fonnts_com_Lyon_Roman.className} lg:px-[17%] xl:px-[20%] text-xl xl:text-xl 2xl:text-2xl md:text-left ${firstCapital ? 'first-letter:text-[4rem] first-letter:font-normal first-letter:leading-none first-letter:float-left first-letter:mr-2' : ''}`}>
            {children}
        </div>
    )
}
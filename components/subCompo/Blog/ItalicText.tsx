import { fonnts_com_Lyon_Italic } from "../fonts"

export default function ItalicText({children}: {children: string}) {
    return (
        <div className={`${fonnts_com_Lyon_Italic.className} font-italic lg:px-[17%] xl:px-[20%] flex justify-center text-xl xl:text-2xl md:text-left`}>
            {children}
        </div>
    )
}
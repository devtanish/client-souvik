import * as motion from "motion/react-client"
import SplitText from "../SplitText";

export default function Section2() {
  return (
    <section className="text-white text-3xl h-[80vh] w-full bg-black border-b border-gray-800  flex flex-col justify-center items-center px-5">
        <motion.div className="box" ><SplitText text="At Vence, we excel in creating captivating content that not only captures attention but also drives meaningful engagement. We leverages cutting-edge technology and innovative storytelling techniques to produce visually stunning commercials."/></motion.div>
    </section>
  );
}
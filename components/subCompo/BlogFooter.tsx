import { ppplayground} from "./fonts";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function BlogFooter() {
  return (
    <div className="bg-black text-white py-15 px-4">
      {/* Heading */}
      <div className="flex flex-col items-center text-center gap-2">
        <div className="flex flex-wrap justify-center gap-3 text-3xl sm:text-4xl md:text-5xl leading-none">
          <span>Jewellery Insights</span>
          <span
            className={`${ppplayground.className} text-5xl sm:text-6xl md:text-7xl leading-none md:-translate-y-2`}
          >
            straight
          </span>
        </div>

        <div className="text-3xl sm:text-4xl md:text-5xl -translate-y-5 leading-none">
          your inbox.
        </div>
      </div>

      {/* Form */}
      <div className="mt-10 flex justify-center -translate-y-5">
        <form className="w-full max-w-xl xl:max-w-4xl flex flex-col md:flex-row items-center gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full py-5 px-4 text-white rounded-full border border-white focus-visible:ring-0 focus:outline-none"
          />

          <Input
            type="text"
            placeholder="First Name"
            className="w-full py-5 px-4 text-white rounded-full border border-white focus-visible:ring-0"
          />

          <Button
            type="submit"
            className="w-full md:w-auto px-8 py-5 font-semibold text-black bg-white rounded-full hover:bg-gray-200 transition-colors"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

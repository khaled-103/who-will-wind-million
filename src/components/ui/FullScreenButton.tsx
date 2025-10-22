import { handleFullScreen } from "../../lib/helper";

export default function FullScreenButton() {
    return (
        <>
            {/* زر ملء الشاشة */}
            <button
                onClick={handleFullScreen}
                className="absolute cursor-pointer top-4 end-4 text-sm bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-lg shadow-md transition"
            >
                ملء الشاشة
            </button>
        </>
    );
}
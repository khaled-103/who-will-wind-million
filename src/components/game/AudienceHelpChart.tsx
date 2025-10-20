import type { AudienceHelpChartOption } from "../../types";


export default function AudienceHelpChart({ options }: {options:AudienceHelpChartOption}) {
  return (
    <div className="w-full mx-auto max-w-xs p-1 bg-gray-800 rounded-xl shadow-lg flex flex-col items-center">
      <h3 className="text-white font-bold text-lg mb-3">مساعدة الجمهور</h3>
      <div className="flex justify-around w-full h-32">
        {options.map((opt) => (
          <div key={opt.id} className="flex flex-col items-center">
            <span className="text-white text-sm mb-1">{opt.text}</span>
            <div className="w-4 bg-gray-600 rounded-t-full flex-1 flex items-end">
              <div
                className="bg-yellow-500 w-full rounded-t-full transition-all duration-500"
                style={{ height: `${opt.percent}%` }}
              ></div>
            </div>
            <span className="text-white text-sm mt-1">{opt.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
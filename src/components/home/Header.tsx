// src/components/Header.tsx
import Logo from "../Logo";

export default function Header() {
  return (
    <header className="text-center flex flex-col items-center gap-4">
      {/* Logo مع حركة ناعمة */}
      <div className="w-24 h-24 sm:w-28 sm:h-28">
        <Logo className="w-full h-full" />
      </div>

      {/* العنوان */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-millionaire-gold tracking-wide drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]">
        من سيربح المليون؟
      </h1>

      {/* الوصف */}
      <p className="text-yellow-300/90 text-sm sm:text-lg italic">
        هل تمتلك المعرفة لتصل إلى المليون؟ 💰
      </p>
    </header>
  );
}

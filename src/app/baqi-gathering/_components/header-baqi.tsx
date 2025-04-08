import Image from "next/image";
import Link from "next/link";

const HeaderBaqi = () => {
    const navItems = [
        {href: "#about", label: "عن الملتقى"},
        {href: "#objectives", label: "الأهداف"},
        {href: "#speakers", label: "المتحدثون"},
        {href: "#schedule", label: "جدول الأعمال"},
        {href: "/baqi-gathering/gallery", label: "معرض الصور"},
        {href: "/", label: "مؤسسة الإمام زين العابدين (عليه السلام)"},
    ];
    return (
        <header className=" fixed top-0 right-0 z-50 w-full bg-[#0B1F47] text-white py-1 border-b-4 border-[#eec67d]">
            <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between">
                <Link href='/baqi-gathering' className="flex items-start h-24 overflow-hidden">
                    <Image
                        src="/baqi-gathering/ملتقى-البقيع-شعار-الابيض.png"
                        width={1000}
                        height={1000}
                        className="w-14  cursor-pointer py-2"
                        alt="Logo"
                    />
                </Link>
                <nav>
                    <ul className="flex  justify-center mt-4 md:mt-0">
                        {navItems.map((item) => (
                            <li key={item.href} className="px-2">
                                <a
                                    href={`${item.href}`}
                                    className="text-lg hover:text-[#c49e38] transition-all duration-300"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default HeaderBaqi;


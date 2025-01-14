import { 
	PlayButtonIcon, 
} from "@/assets/icons/reusable"


export default function Live(){
  return (
    <>
    <div className="w-4/5 mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-8 xl:gap-16">
				<div className="text-center md:text-right space-y-3 lg:w-1/3 xl:text-center">
					<h1 className="text-primary font-bold text-3xl md:text-5xl xl:text-7xl tracking-wide">
						البــــــث <br className="hidden md:block" />
						المباشر
					</h1>
					<h2 className="font-semibold text-base md:text-lg xl:text-3xl">
						برنامج الصحيفة السجادية
					</h2>
					<p className="text-slate-500 text-xs md:text-sm xl:text-2xl">
						برنامج حواري مع السيد غسان الخرسان
					</p>
				</div>
				<div className="group text-center">
					<div className="relative w-[300px] h-[280px] md:w-[400px] md:h-[300px] lg:w-[550px] lg:h-[350px] xl:w-[700px] xl:h-[450px] 2xl:w-[800px] 2xl:h-[550px] bg-[url('/images/alqibla-gate.jpg')] bg-center bg-cover rounded-[25px] md:rounded-[30px] lg:rounded-[70px] shadow-2xl cursor-pointer group-hover:scale-105 duration-500 overflow-hidden flex items-center justify-center">
						<div className="absolute inset-0 bg-gradient-to-t from-[#00663055] via-transparent to-transparent" />
						<div className="flex flex-col items-center">
							<div className="border-2 border-red-600 rounded-full p-2 group-hover:scale-105 duration-500">
								<div className="bg-white rounded-full p-4">
									<PlayButtonIcon
										className="rotate-180 w-4 lg:w-6 xl:w-8 h-auto"
										fill="#ff0000"
									/>
								</div>
							</div>
							<div className="flex items-center gap-2 mt-8 text-xs lg:text-base font-semibold text-white">
								<div className="w-1.5 h-1.5 lg:w-2 lg:h-2 -translate-y-0.5 bg-[#ff0000] rounded-full" />
								<span>البث الحي</span>
							</div>
						</div>
					</div>
				</div>
			</div>
    </>
  )
}
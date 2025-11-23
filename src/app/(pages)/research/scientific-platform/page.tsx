"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import StudentResearch from "./components/student-research"
import Journals from "./components/journals"
import ConferencePapers from "./components/conference-papers"
import Breadcrumbs from "@/components/breadcrumb"

type ActiveView = "student-research" | "conferences" | "journals"

export default function Page() {
	const searchParams = useSearchParams()
	const [activeView, setActiveView] = useState<ActiveView>("student-research")

	useEffect(() => {
		// Get type param
		const typeParam = (searchParams.get("type") ||
			"student-research") as ActiveView
		setActiveView(typeParam)

		console.log("type from query:", typeParam)
	}, [searchParams])

	return (
		<div className="p-6 ">
			{/* Breadcrumbs الديناميكي */}
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "الصفحة العلمية", url: "/research" },
				]}
			/>
			{/* الأزرار بتصميم الروابط */}
			<div className="flex flex-wrap justify-center items-center gap-4 mb-16 mt-6 ">
				{[
					{ id: "conferences", title: "📑 بحوث المؤتمرات" },
					{ id: "student-research", title: "🎓 بحوث التخرج" },
					{ id: "journals", title: "📚 الدوريات العربية" },
				].map((btn) => {
					const isActive = activeView === btn.id

					return (
						<motion.div
							key={btn.id}
							whileHover={{ scale: 1.07, y: -3 }}
							whileTap={{ scale: 0.96 }}
							transition={{
								type: "spring",
								stiffness: 250,
								damping: 15,
							}}
						>
							<button
								onClick={() =>
									setActiveView(btn.id as ActiveView)
								}
								className={`group relative flex items-center justify-center px-6 py-3 h-14 rounded-xl font-medium text-lg shadow-lg border transition-all duration-300 overflow-hidden 
                  ${
						isActive
							? "bg-primary text-white border-primary"
							: "bg-primary/15 text-primary hover:border-primary border-transparent"
					}`}
							>
								{/* تأثير الإضاءة */}
								<span
									className={`absolute inset-0 bg-gradient-to-r from-secondary/0 via-primary/20 to-secondary/0 opacity-0 group-hover:opacity-100 blur-lg transition duration-500 
                    ${isActive ? "opacity-100" : ""}`}
								></span>

								{/* النص */}
								<span className="relative z-10">
									{btn.title}
								</span>
							</button>
						</motion.div>
					)
				})}
			</div>

			{/* عرض الواجهة */}
			<div>
				{activeView === "conferences" && <ConferencePapers />}
				{activeView === "student-research" && <StudentResearch />}
				{activeView === "journals" && <Journals />}
			</div>
		</div>
	)
}

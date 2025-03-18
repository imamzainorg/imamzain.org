import React from "react"

const BoxesList = () => {
	const data = [
		{
			id: 1,
			title: "Amazing Feature",
			content:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, alias?",
		},
		{
			id: 2,
			title: "Great Performance",
			content:
				"Ratione, odit facilis sit magni praesentium accusamus omnis debitis distinctio deleniti a!",
		},
		{
			id: 3,
			title: "User-Friendly",
			content:
				"Another paragraph to test how it looks in a separate box.",
		},
		{
			id: 4,
			title: "Secure & Reliable",
			content:
				"More content goes here to test the layout with multiple boxes.",
		},
	]

	return (
		<div className="grid md:grid-cols-2 gap-6 p-6">
			{data.map((item) => (
				<div
					key={item.id}
					className="bg-gray-50 border border-primary rounded-xl p-6 shadow-lg flex flex-col 
                     cursor-pointer transition duration-300 hover:opacity-80 hover:border-gray-700 hover:scale-105"
				>
					<h3 className="text-xl font-semibold text-primary mb-2">
						{item.title}
					</h3>
					<p className="text-gray-700 leading-relaxed">
						{item.content}
					</p>
				</div>
			))}
		</div>
	)
}

export default BoxesList

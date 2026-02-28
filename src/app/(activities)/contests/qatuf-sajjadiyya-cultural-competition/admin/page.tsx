"use client"

import { useState, useEffect } from "react"
import { Download, RefreshCw, Users, Clock, CheckCircle } from "lucide-react"

type Submission = {
	name: string
	contact: string
	contactType: "phone" | "email"
	answers: { [key: string]: string }
	timeSpent: number
	submittedAt: string
	url?: string
}

function formatTime(seconds: number): string {
	const hours = Math.floor(seconds / 3600)
	const minutes = Math.floor((seconds % 3600) / 60)
	const secs = seconds % 60

	if (hours > 0) {
		return `${hours}h ${minutes}m ${secs}s`
	}
	return `${minutes}m ${secs}s`
}

export default function AdminSubmissionsPage() {
	const [submissions, setSubmissions] = useState<Submission[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")

	const fetchSubmissions = async () => {
		setLoading(true)
		setError("")

		try {
			const response = await fetch(
				"/api/contests/qatuf-sajjadiyya/admin/submissions",
			)

			if (!response.ok) {
				throw new Error("Failed to fetch submissions")
			}

			const data = await response.json()
			setSubmissions(data.submissions)
		} catch (err) {
			setError(
				"Failed to load submissions. Make sure the API route exists.",
			)
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchSubmissions()
	}, [])

	const exportToCSV = () => {
		const headers = [
			"Name",
			"Contact",
			"Contact Type",
			"Time Spent",
			"Submitted At",
			"Total Answers",
		]
		const rows = submissions.map((sub) => [
			sub.name,
			sub.contact,
			sub.contactType,
			formatTime(sub.timeSpent),
			new Date(sub.submittedAt).toLocaleString("ar-IQ"),
			Object.keys(sub.answers).length,
		])

		const csv = [
			headers.join(","),
			...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
		].join("\n")

		const blob = new Blob([csv], { type: "text/csv" })
		const url = URL.createObjectURL(blob)
		const a = document.createElement("a")
		a.href = url
		a.download = `contest-submissions-${Date.now()}.csv`
		a.click()
		URL.revokeObjectURL(url)
	}

	const exportAllJSON = () => {
		const blob = new Blob([JSON.stringify(submissions, null, 2)], {
			type: "application/json",
		})
		const url = URL.createObjectURL(blob)
		const a = document.createElement("a")
		a.href = url
		a.download = `contest-submissions-${Date.now()}.json`
		a.click()
		URL.revokeObjectURL(url)
	}

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<RefreshCw className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
					<p className="text-lg text-slate-600">
						جاري تحميل البيانات...
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-slate-50 py-8 px-4">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6">
					<div className="flex items-center justify-between flex-wrap gap-4">
						<div>
							<h1 className="text-3xl font-bold text-slate-800 mb-2">
								إدارة المشاركات
							</h1>
							<p className="text-slate-600">
								مسابقة قبسات من حياة الإمام السجاد (عليه السلام)
							</p>
						</div>
						<div className="flex gap-3">
							<button
								onClick={fetchSubmissions}
								className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-all flex items-center gap-2"
							>
								<RefreshCw className="w-4 h-4" />
								تحديث
							</button>
							<button
								onClick={exportToCSV}
								className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
							>
								<Download className="w-4 h-4" />
								تصدير CSV
							</button>
							<button
								onClick={exportAllJSON}
								className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
							>
								<Download className="w-4 h-4" />
								تصدير JSON
							</button>
						</div>
					</div>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
					<div className="bg-white rounded-xl shadow border border-slate-200 p-6">
						<div className="flex items-center gap-4">
							<div className="p-3 bg-primary/10 rounded-lg">
								<Users className="w-6 h-6 text-primary" />
							</div>
							<div>
								<p className="text-sm text-slate-600">
									إجمالي المشاركات
								</p>
								<p className="text-2xl font-bold text-slate-800">
									{submissions.length}
								</p>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-xl shadow border border-slate-200 p-6">
						<div className="flex items-center gap-4">
							<div className="p-3 bg-emerald-100 rounded-lg">
								<CheckCircle className="w-6 h-6 text-emerald-600" />
							</div>
							<div>
								<p className="text-sm text-slate-600">مكتملة</p>
								<p className="text-2xl font-bold text-slate-800">
									{
										submissions.filter(
											(s) =>
												Object.keys(s.answers)
													.length === 50,
										).length
									}
								</p>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-xl shadow border border-slate-200 p-6">
						<div className="flex items-center gap-4">
							<div className="p-3 bg-amber-100 rounded-lg">
								<Clock className="w-6 h-6 text-amber-600" />
							</div>
							<div>
								<p className="text-sm text-slate-600">
									متوسط الوقت
								</p>
								<p className="text-2xl font-bold text-slate-800">
									{submissions.length > 0
										? formatTime(
												Math.floor(
													submissions.reduce(
														(acc, s) =>
															acc + s.timeSpent,
														0,
													) / submissions.length,
												),
											)
										: "0m"}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Error Message */}
				{error && (
					<div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
						<p className="text-red-800">{error}</p>
					</div>
				)}

				{/* Submissions Table */}
				<div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-slate-50 border-b border-slate-200">
								<tr>
									<th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
										#
									</th>
									<th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
										الاسم
									</th>
									<th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
										الاتصال
									</th>
									<th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
										النوع
									</th>
									<th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
										الإجابات
									</th>
									<th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
										الوقت المستغرق
									</th>
									<th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
										تاريخ التقديم
									</th>
									<th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
										الإجراءات
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-200">
								{submissions.length === 0 ? (
									<tr>
										<td
											colSpan={8}
											className="px-6 py-12 text-center text-slate-500"
										>
											لا توجد مشاركات حتى الآن
										</td>
									</tr>
								) : (
									submissions.map((submission, index) => (
										<tr
											key={index}
											className="hover:bg-slate-50 transition-colors"
										>
											<td className="px-6 py-4 text-sm text-slate-600">
												{index + 1}
											</td>
											<td className="px-6 py-4 text-sm font-medium text-slate-800">
												{submission.name}
											</td>
											<td className="px-6 py-4 text-sm text-slate-600 font-mono">
												{submission.contact}
											</td>
											<td className="px-6 py-4 text-sm text-slate-600">
												<span
													className={`px-2 py-1 rounded-full text-xs font-semibold ${
														submission.contactType ===
														"phone"
															? "bg-blue-100 text-blue-700"
															: "bg-purple-100 text-purple-700"
													}`}
												>
													{submission.contactType ===
													"phone"
														? "هاتف"
														: "بريد إلكتروني"}
												</span>
											</td>
											<td className="px-6 py-4 text-sm text-slate-600">
												{
													Object.keys(
														submission.answers,
													).length
												}{" "}
												/ 50
											</td>
											<td className="px-6 py-4 text-sm text-slate-600">
												{formatTime(
													submission.timeSpent,
												)}
											</td>
											<td className="px-6 py-4 text-sm text-slate-600">
												{new Date(
													submission.submittedAt,
												).toLocaleString("ar-IQ")}
											</td>
											<td className="px-6 py-4">
												{submission.url && (
													<a
														href={submission.url}
														target="_blank"
														rel="noopener noreferrer"
														className="text-primary hover:text-primary/80 font-semibold text-sm"
													>
														عرض
													</a>
												)}
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

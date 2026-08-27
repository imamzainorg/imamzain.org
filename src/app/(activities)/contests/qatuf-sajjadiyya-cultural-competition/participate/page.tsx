import questions from "@/data/contests/qatuf-sajjaddiyya/questions.json"
import ParticipateClient from "../components/participate-client"

export default function Page() {
	return <ParticipateClient questions={questions} />
}

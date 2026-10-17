import { arabicNumber } from "@/lib/format"
import { Note } from "./contest-ui"

const rules = [
	"يشترط أن يكون الورق من النوع المقهر وبخلفية فاتحة، ولا يجوز استخدام الورق الأبيض. حجم الورقة يجب أن يكون (٧٠ × ٥٠) سم لجميع الخطوط. يُستبعد من لم يلتزم بذلك.",
	"يمكن للمتسابق الاشتراك بثلاثة أنواع من الخطوط فقط، ولا يحق له الاشتراك بأكثر من عمل في النوع الواحد.",
	"يجوز اعتماد أي رسم قرآني في النصوص القرآنية.",
	"يجب التقيد بالقواعد الإملائية والنحوية في النصوص غير القرآنية.",
	"يجب أن تكون الأعمال خالية من التوقيع أو أي إشارة لكاتبها، وألا تكون مزخرفة أو مذهبة أو ذات حدود أو ملصقة على ورق مقوى أو خشب. تُرسل بطريقة تحافظ على سلامة اللوحة.",
	"تُعدّ جميع الأعمال ملكاً للعتبة الحسينية المقدسة - مؤسسة الإمام زين العابدين (عليه السلام) سواء فازت أو لم تفز.",
	"على كل مشارك الالتزام بالشروط والنصوص الواردة، ويُستبعد كل عمل يخالف ذلك.",
	"يحق للمتسابق اختيار لون الحبر بحرية، ويمكن استخدام لون واحد أو أكثر.",
]

// The calligraphy contest's conditions, as a numbered list.
export function ContestRules() {
	return (
		<div className="rounded-[28px] border-2 border-primary/15 bg-white/60 p-6 dark:border-Muharram_primary/20 md:p-10">
			<ol>
				{rules.map((rule, index) => (
					<li key={rule} className="flex items-start gap-4 border-b border-dashed border-secondary/40 py-4">
						<span className="w-9 shrink-0 text-2xl font-bold text-secondary dark:text-Muharram_secondary">
							{arabicNumber(index + 1)}
						</span>
						<span className="text-lg leading-loose text-gray-800 md:text-xl md:leading-loose">{rule}</span>
					</li>
				))}
			</ol>

			<div className="mt-8">
				<Note>يُرفق مع العمل: استمارة المسابقة، سيرة ذاتية مختصرة، صورة شخصية، وصورة جواز السفر</Note>
			</div>
		</div>
	)
}

import Breadcrumbs from "@/components/breadcrumb";

export default function LocationsPage() {
  return (
    <div className="p-8">
      <Breadcrumbs
        links={[
          { name: "الرئيسية", url: "/" },
          { name: "الأصدارات", url: "/publications" },
          { name: "نقاط البيع المباشر", url: "#" },
        ]}
      />
      <h1 id="Points-of-sale" className="text-2xl font-bold text-center my-6">
      نقاط البيع المباشر     </h1>
      <div className=" ">
        <div className="bg-gray-100 p-4 rounded-xl shadow-md my-2">
          
          <h2 className="text-lg font-semibold text-center sm:text-right">النجف الاشرف</h2>
          <h4 className="text-black font-medium mr-2 mt-2">المقر الرئيسي</h4>
          <p className="text-gray-800 mr-2 border-b-2 pr-2 pl-2 mb-4">
            حي الزهراء - ملحق شارع  الروان
        <span className="" > <br />رقم الهاتف : 07829439996</span></p>
        <h4 className="text-black font-medium mr-2 mt-2">معرض الكتاب الدائم</h4>
          <p className="ttext-gray-800 mr-2 border-b-2 pr-2 pl-2 mb-4">
            العتبة الحسينية المقدسة - شارع الرسول (صلى الله عليه واله وسلم)قرب فدق
            
          القاسم (عليه السلام) مقابل مكتب السيد السيستاني
        <span className="" > <br />رقم الهاتف : 07725890454</span></p>
        <h4 className="text-black font-medium mr-2 mt-2">دار البذرة للطباعة والنشر</h4>
          <p className="text-gray-800 mr-2  pr-2 pl-2 mb-4">
          امتداد شارع الرسول (صلى الله عليه واله وسلم) قرب مدرسة النضال
            الابتدائية مقابل فندق الرسول (صلى الله عليه واله وسلم) السياحي{" "}
           <span className=""><br />رقم الهاتف : 07802450230 - 07601804421</span></p>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold my-2 text-center sm:text-right">كربلاء المقدسة</h2>
          <h4 className="text-black font-medium mr-2 mt-2">معرض الكتاب الدائم</h4>
        
          <p className="text-gray-800 mr-2  pr-2 pl-2 mb-4">
            بين الحرمين الشريفين
          <span className=""><br />رقم الهاتف  :   07725108015  </span></p></div>
      
      </div>
    </div>
  );
}

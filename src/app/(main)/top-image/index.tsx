import Image from "next/image";
export default function TopImage() {
    return (
        <>
            <div
                className="relative w-full h-[100vh] overflow-hidden"
                style={{
                    WebkitMaskImage: `url('/images/masks.png')`,
                    maskImage: `url('/images/masks.png')`,
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskSize: '100%',
                    maskSize: '100%',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'bottom',
                }}
            >
                {/* Next.js 13+ usage with the `fill` prop */}
                <Image
                    src="/images/landing.jpg"
                    alt="Some image"
                    fill
                    className="object-cover"
                    /*
                      object-cover  => preserves aspect ratio, crops if needed
                      object-contain => preserves aspect ratio, leaves blank space if it doesn’t fill
                      object-fill   => stretches the image to exactly fill the box (aspect ratio may be lost)
                    */
                />
            </div>
        </>
    );

}

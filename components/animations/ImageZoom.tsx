import Image from 'next/image';

export default function ImageHoverZoom({ url }: {url: string}) {
  return (
    <div className="relative overflow-hidden shadow-md">
      <div className="relative w-full h-60 md:h-105 lg:h-75 xl:h-70 2xl:h-85 overflow-hidden">
        <Image
          src={url}
          alt="Zoomable image"
          fill
          className="object-cover transition-transform duration-500 ease-out hover:scale-102 hover:brightness-[0.8]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
}
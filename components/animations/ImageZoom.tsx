import Image from 'next/image';

export default function ImageHoverZoom({ url }: {url: string}) {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg">
      <div className="relative w-full h-90 overflow-hidden">
        <Image
          src={url}
          alt="Zoomable image"
          fill
          className="object-cover transition-transform duration-500 ease-out hover:scale-102"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
}
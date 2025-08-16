import Image from "next/image";

type Props = {
  src?: string;
  imageOpacityClassName?: string; // ej: "opacity-40"
  overlayClassName?: string;      // ej: "bg-gradient-to-br from-rose-950/70 via-rose-900/60 to-red-800/70"
  priority?: boolean;
};

export default function HeroBackground({
  src = "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=1600&q=80",
  imageOpacityClassName = "opacity-40",
  overlayClassName = "bg-gradient-to-br from-rose-950/70 via-rose-900/60 to-red-800/70",
  priority = true,
}: Props) {
  return (
    <div className="absolute inset-0 -z-10">
      <Image
        src={src}
        alt=""
        fill
        style={{ objectFit: "cover" }}
        className={imageOpacityClassName}
        priority={priority}
      />
      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  );
}
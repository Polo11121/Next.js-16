import Image from "next/image";

interface EventDetailItemProps {
  icon: string;
  alt: string;
  label: string;
}

export const EventDetailItem = ({ icon, alt, label }: EventDetailItemProps) => (
  <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
);

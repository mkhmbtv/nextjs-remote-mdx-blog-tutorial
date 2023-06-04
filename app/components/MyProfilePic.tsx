import Image from "next/image";

export default function MyProfilePic() {
  return (
    <section className="min-w-full mx-auto">
      <Image
        priority
        src="/images/profile.jpg"
        className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
        height={200}
        width={200}
        alt=""
      />
    </section>
  );
}

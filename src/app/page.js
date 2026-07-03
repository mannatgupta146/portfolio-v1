import TextReveal from "@/components/TextReveal";

export default function Page() {
  return (
    <main className='h-[200vh] w-full '>
      <div className="h-[50%] "></div>
      <TextReveal splitBy="words" trigger= "scroll">
        <h1 className='text-4xl'>Welcome to the Page</h1>
      </TextReveal>
    </main>
  );
}
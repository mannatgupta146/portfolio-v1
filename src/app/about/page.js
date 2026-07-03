import TextReveal from "@/components/TextReveal";

export default function Page() {
    return (
        <TextReveal splitBy="chars">
            <div className="text-4xl">This is about page</div>
        </TextReveal>
    );
}
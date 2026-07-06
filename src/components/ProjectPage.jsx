import TextReveal from "./TextReveal"

const ProjectPage = ({ project }) => {
  return (
    <>
      <main>
        <section className="h-screen w-full flex pt-16 pb-3 px-8">
            <div className="firstSegment h-full w-[5%]">
                <TextReveal delay="1.3" splitBy="chars" stagger="0.05">
                    <h3 className="text-2xl">{project.number}</h3>
                </TextReveal>
            </div>

            <div className="secondSegment h-[85%] w-[40%]">
                <div className="imageDiv h-full w-full">
                    <img className="h-full w-full object-cover" src={project.coverImage} alt={project.title} />
                </div>
            </div>
            
            <div className="thirdSegment h-[85%] w-[55%] pl-10 flex flex-col justify-end">
                <div className="heading">
                    <TextReveal delay="1.3" splitBy="chars" stagger="0.05">
                        <h1 className="text-[1.9rem] leading-1.1">{project.title}</h1>
                    </TextReveal>
                </div>

                <div className="subHeading flex gap-3 items-baseline">
                    <TextReveal delay="1.5" splitBy="words" stagger="0.05">
                        <h1 className="text-[1.6rem] text-gray-700 tracking-[-2px]">{project.subtitle}</h1>
                    </TextReveal>
                    <TextReveal delay="1.6" splitBy="chars" stagger="0.05">
                        <h1 className="text-[1.2rem] tracking-[-1px]">{project.year}</h1>
                    </TextReveal>
                </div>

                <div className="description mt-5 mb-2">
                    <TextReveal delay="1.8" splitBy="lines">
                        <h1 className="leading-[1.2] text-[1.1rem] text-gray-600">{project.description}</h1>
                    </TextReveal>
                </div>
            </div>
    
        </section>

        <section></section>

        <section></section>

        <section></section>

        <section></section>

        <footer></footer>
      </main>
    </>
  )
}

export default ProjectPage

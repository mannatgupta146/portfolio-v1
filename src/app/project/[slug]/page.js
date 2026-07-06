import ProjectPage from "@/components/ProjectPage";
import { projects } from "@/data/projects";

export default async function Page({ params }) {

    const { slug } = await params;

    const projectIndex = projects.findIndex((p) => p.slug === slug);
    const project = projects[projectIndex];

    const nextProject = projects[(projectIndex + 1) % projects.length] || null;
    const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length] || null;

    return (
        <>
          <ProjectPage project={project} nextProject={nextProject} prevProject={prevProject} />
        </>
    );
}
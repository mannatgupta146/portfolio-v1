import ProjectPage from "@/components/ProjectPage";
import { projects } from "@/data/projects";

export default async function Page({ params }) {

    const { slug } = await params;

    const projectIndex = projects.findIndex((p) => p.slug === slug);
    const project = projects[projectIndex];

    return (
        <>
          <ProjectPage project={project} />
        </>
    );
}
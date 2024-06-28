import React from "react";
import { useEmail } from "../context/EmailContext";
import { useGetProjectListByUserEmail } from "../hooks/queryHooks/useGetProjectListByUserEmail";
import LogoBar from "../components/Logobar";
import HeadingText from "../components/HeadingText";
import CreateProjectBtn from "../components/CreateProjectBtn";
import heroImage from "../assets/Home.svg";
import "../styles/home.css";
import ProjectCard from "../components/ProjectCard";

const HomeWithoutEmailAndProjects = () => (
    <div className="container-95 home">
        <LogoBar />
        <section className="home-section container-85">
            <HeadingText text={"Create a New Project "} type={1} />
            <img src={heroImage} alt="Hero" className="heroImage" />
            <p className="home-text container-80">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in.
            </p>
            <CreateProjectBtn />
        </section>
    </div>
);

const HomeWithEmailAndWithProjects = ({ projectList }) => (
    <div className="container-95">
        <LogoBar />
        <section className="container-80">
           <div className="home-header">

            <HeadingText text={"Projects"} />
            <CreateProjectBtn />
           </div>
            <div className="project-grid">
                {projectList.map((project) => (
                    <ProjectCard project={project} key={project._id} />
                ))}
            </div>
        </section>
    </div>
);

const Loading = () => (
    <div className="container-95 home">
        <LogoBar />
        <section className="home-section container-85">
            <HeadingText text={"Loading Projects..."} type={1} />
            <p className="home-text container-80">Please wait while we load your projects.</p>
        </section>
    </div>
);

const Home = () => {
    const { email } = useEmail();
   
    const { data: projects, isLoading: isProjectsLoading, error } = useGetProjectListByUserEmail(email);

    if (isProjectsLoading) {
        return <Loading />;
    }

    return (
        <>
            {projects && projects.length > 0 ? (
                <HomeWithEmailAndWithProjects projectList={projects} />
            ) : (
                <HomeWithoutEmailAndProjects />
            )}
        </>
    );
};

export default Home;

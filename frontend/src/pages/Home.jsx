import React, { useState, useEffect } from "react";
import { useEmail } from "../context/EmailContext";
import { useGetProjectListByUserEmail } from "../hooks/queryHooks/useGetProjectListByUserEmail";
import LogoBar from "../components/Logobar";
import HeadingText from "../components/HeadingText";
import CreateProjectBtn from "../components/CreateProjectBtn";
import heroImage from "../assets/Home.svg";
import "../styles/home.css";
import ProjectCard from "../components/ProjectCard";
import { slugify } from '../utils/slugify';

const ITEMS_PER_PAGE = 9;
const MAX_PAGES_DISPLAYED = 3;

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

const HomeWithEmailAndWithProjects = ({ projectList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const sortedProjects = projectList.sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
    const totalProjects = sortedProjects.length;
    const totalPagesCount = Math.ceil(totalProjects / ITEMS_PER_PAGE);
    setTotalPages(totalPagesCount);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setVisibleProjects(sortedProjects.slice(startIndex, endIndex));
  }, [projectList, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(startPage + MAX_PAGES_DISPLAYED - 1, totalPages);

    // Previous button
    pages.push(
      <button key="prev" onClick={handlePreviousPage} disabled={currentPage === 1}>
        Prev
      </button>
    );

    // Start button
    if (startPage > 1) {
      pages.push(
        <button key="start" onClick={() => goToPage(1)}>
          Start
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }

    // End button
    if (endPage < totalPages) {
      pages.push(
        <button key="end" onClick={() => goToPage(totalPages)}>
          End
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    );

    return pages;
  };

  return (
    <div className="container-95">
      <LogoBar />
      <section className="container-80">
        <div className="home-header-project">
          <HeadingText text={"Projects"} />
          <CreateProjectBtn />
        </div>
        <div className="project-grid">
          {visibleProjects.map((project, index) => (
            <ProjectCard project={project} key={project._id} index={index} />
          ))}
        </div>
        {totalPages > 1 && (
          <div className="pagination">
            {renderPaginationButtons()}
          </div>
        )}
      </section>
    </div>
  );
};

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

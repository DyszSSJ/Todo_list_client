import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Card from "@/components/Card";
import useGetUser from "@/hooks/useGetUser";
import { DotWave } from "@uiball/loaders";
import ModalForm from "@/components/ModalForm";
import { useRouter } from "next/router";

function Inicio() {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const { data, loading, error, isToken, refetch } = useGetUser();

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    if (!isToken && !data?.getUser && !loading) {
      router.push("/");
    }
  }, [isToken, data, loading]);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setShowLoading(false);
      }, 3000);
    }
  }, [loading]);

  if (showLoading)
    return (
      <div className="flex justify-center mt-[8rem]">
        <DotWave size={47} speed={1} color="black" />
      </div>
    );

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Layout paginas={"Inicio"}>
      <div>
        <div className="flex justify-end p-12">
          <button className="buttonAdd" onClick={openModal}>
            Agregar nuevo proyecto
          </button>
        </div>
        <ModalForm
          closeModal={closeModal}
          modalIsOpen={modalIsOpen}
          refetch={refetch}
        />
        <h1 className="text-center font-bold text-[2.5rem] mt-2">
          Todos los proyectos 😎
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-16">
          {data?.getUser?.proyects.slice(start, end).map((project) => (
            <>
              <div key={project.id}>
                <Card
                  name={project.name}
                  description={project.description}
                  imageUrl={project.imageUrl}
                  date={project.date}
                  id={project.id}
                  closeModal={closeModal}
                  modalIsOpen={modalIsOpen}
                  setModalIsOpen={setModalIsOpen}
                />
              </div>
            </>
          ))}
        </div>
        <div className="flex justify-center mt-4 mb-4">
          {currentPage > 1 && (
            <button
              className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Anterior
            </button>
          )}
          {currentPage * itemsPerPage < data?.getUser?.proyects.length && (
            <button
              className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Siguiente
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
export default Inicio;

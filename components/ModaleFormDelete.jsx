import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "@/schema/gql/QuerysAndMutations";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGetUser from "@/hooks/useGetUser";
import Modal from "react-modal";

function ModaleFormDelete({ modalIsOpenDelete, closeModalDelete, id }) {
  const { refetch } = useGetUser();
  const [deleteProject] = useMutation(DELETE_PROJECT);

  const handleDelete = async (id) => {
    try {
      const { data } = await deleteProject({ variables: { id } });
      toast.success("Proyecto eliminado:", data);
      closeModalDelete();
      refetch();
    } catch (error) {
      console.error("Error eliminando el proyecto:", error);
    }
  };

  return (
    <Modal
      isOpen={modalIsOpenDelete}
      onRequestClose={closeModalDelete}
      contentLabel="Agregar nuevo proyecto"
      className="w-full md:w-3/4 mx-auto bg-white p-8 rounded-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          ¿Seguro que quieres eliminar este proyecto?
        </h2>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex items-center justify-center">
            <button
              className="buttonAdd"
              type="submit"
              onClick={() => handleDelete(id)}
            >
              Eliminar Proyecto
            </button>
          </div>
        </form>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-300 ease-in-out"
          onClick={closeModalDelete}
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
}

export default ModaleFormDelete;

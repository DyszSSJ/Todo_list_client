import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useMutation } from "@apollo/client";
import {
  CREATE_PROYECT_FORM,
  UPDATE_PROJECT,
} from "@/schema/gql/QuerysAndMutations";
import useGetUser from "@/hooks/useGetUser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModalForm({
  id,
  name,
  description,
  imageUrl,
  date,
  modalIsOpen,
  closeModal,
}) {
  const { idUser } = useGetUser();
  const [nameForm, setNameForm] = useState(name);
  const [descriptionForm, setDescriptionForm] = useState(description);
  const [dateForm, setDateForm] = useState(date);
  const { refetch } = useGetUser();
  const [createProyect] = useMutation(CREATE_PROYECT_FORM);
  const [updateProject] = useMutation(UPDATE_PROJECT);

  const handleEdit = async (event) => {
    event.preventDefault();
    const input = {
      name: nameForm,
      description: descriptionForm,
      date: dateForm,
    };

    try {
      await updateProject({
        variables: {
          id,
          input,
        },
      });
      toast.success("Proyecto actualizado correctamente");
      closeModal();
    } catch (err) {
      toast.error("Error al actualizar el proyecto:", err);
      console.log(err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (id) {
      handleEdit(event);
    } else {
      const input = {
        name: nameForm,
        description: descriptionForm,
        date: dateForm,
        userId: idUser.user?.id,
      };
      try {
        const response = await createProyect({
          variables: {
            input,
          },
        });
        toast.success(
          "Se ha creado correctamente",
          response.data.createProyect
        );
        closeModal();
      } catch (err) {
        toast.error("Error al crear el proyecto:", err);
      } finally {
        setNameForm("");
        setDescriptionForm("");
        setDateForm("");
      }
    }
    refetch();
  };

  useEffect(() => {
    setNameForm(name);
    setDescriptionForm(description);
    setDateForm(date);
  }, [name, description, imageUrl, date]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Agregar nuevo proyecto"
      className="w-full md:w-3/4 mx-auto bg-white p-8 rounded-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Agregar nuevo proyecto
        </h2>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="projectName"
            >
              Nombre del proyecto <span className="text-red-600">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="projectName"
              type="text"
              placeholder="Nombre del proyecto"
              value={nameForm}
              onChange={(e) => setNameForm(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="projectDescription"
            >
              Descripción <span className="text-red-600">*</span>
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
              id="projectDescription"
              placeholder="Descripción del proyecto"
              value={descriptionForm}
              onChange={(e) => setDescriptionForm(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="projectDate"
            >
              Fecha <span className="text-red-600">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="projectDate"
              type="date"
              value={dateForm}
              onChange={(e) => setDateForm(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="buttonAdd" type="submit">
              {id ? "Editar Proyecto" : "Agregar proyecto"}
            </button>
          </div>
        </form>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-300 ease-in-out"
          onClick={closeModal}
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
}

export default ModalForm;

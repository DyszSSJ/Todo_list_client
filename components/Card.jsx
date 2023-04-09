import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ModalForm from "./ModalForm";
import ModaleFormDelete from "./ModaleFormDelete";
import CompleteOrNoComplete from "./CompleteOrNoComplete";

const Card = ({ name, description, imageUrl, date, id }) => {
  const [expanded, setExpanded] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const shortDescription = description.slice(0, 50);
  const showReadMoreButton = description.length > 50;

  const handleEdit = () => {
    setModalIsOpen(true);
  };

  const handleDeleteForm = () => {
    setModalIsOpenDelete(true);
  };

  return (
    <div className="card mt-12 flex flex-col justify-evenly bg-white rounded-lg shadow-lg p-4">
      <div className="tools">
        <div className="circle">
          <span className="red box"></span>
        </div>
        <div className="circle">
          <span className="yellow box"></span>
        </div>
        <div className="circle">
          <span className="green box"></span>
        </div>
      </div>
      <div className="w-full h-52 overflow-hidden rounded-t-lg">
        {imageUrl ? (
          <Link href={"/proyect/:id"}>
            <Image
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
              width={100}
              height={100}
            />
          </Link>
        ) : (
          <Link href={`/proyectos/${id}`}>
            <Image
              src={"/imagen_proyecto.png"}
              alt={name}
              className="w-full h-full object-cover"
              width={800}
              height={100}
            />
          </Link>
        )}
      </div>
      <div className="p-4 w-full">
        <h2 className="text-2xl font-semibold mb-2 text-white">{name}</h2>
        <div
          className={`text-base mb-2 overflow-hidden transition-all duration-300 ease-in-out text-justify text-white ${
            expanded ? "h-auto max-h-full" : "h-12 lg:h-8"
          }`}
        >
          <p>{expanded ? description : shortDescription}</p>
        </div>
        {showReadMoreButton && (
          <button
            onClick={toggleExpanded}
            className="text-[#18a49d] font-bold -mt-4 mb-3"
          >
            Leer {expanded ? "menos" : "más"}
          </button>
        )}
        <p className="text-[#18a49d] font-bold">{date}</p>
      </div>
      <div className="flex xl:flex-row gap-4 justify-between xl:w-full w-[50%] px-4 pb-8">
        <div className="flex flex-col gap-4">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-300 ease-in-out flex items-center gap-2"
            onClick={handleDeleteForm}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
            Eliminar
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300 ease-in-out flex items-center gap-2"
            onClick={handleEdit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 012.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            Editar
          </button>
        </div>
        <div>
          <CompleteOrNoComplete id={id}/>
        </div>
      </div>
      {modalIsOpen && (
        <ModalForm
          id={id}
          name={name}
          description={description}
          imageUrl={imageUrl}
          date={date}
          modalIsOpen={modalIsOpen}
          closeModal={() => setModalIsOpen(false)}
        />
      )}

      {modalIsOpenDelete && (
        <ModaleFormDelete
          closeModalDelete={() => setModalIsOpenDelete(false)}
          modalIsOpenDelete={modalIsOpenDelete}
          id={id}
        />
      )}
    </div>
  );
};

export default Card;

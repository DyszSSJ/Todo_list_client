import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_PROYECT_DETAILS } from "@/schema/gql/QuerysAndMutations";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
import { DotWave } from "@uiball/loaders";
import { useState, useEffect } from "react";
import useGetUser from "@/hooks/useGetUser";
import CompleteOrNoComplete from "@/components/CompleteOrNoComplete";

function Proyecto() {
  const [showLoading, setShowLoading] = useState(true);
  const { isToken } = useGetUser();
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useQuery(GET_PROYECT_DETAILS, {
    variables: {
      idProyecto: id,
    },
  });

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

  return (
    <Layout paginas={data?.proyecto.name}>
      <div className="mt-8 mb-8">
        {loading ? (
          <div className="flex justify-center mt-[13rem]">
            <DotWave size={47} speed={1} color="black" />
          </div>
        ) : (
          <div className="cardDetails">
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
            <div className="xl:w-[60%] m-auto">
              <div className="w-full h-auto overflow-hidden rounded-t-lg">
                {data?.proyecto.image ? (
                  <Image
                    src={data?.proyecto.image}
                    alt={data?.proyecto.name}
                    className="w-full h-[40vh] object-cover"
                    width={100}
                    height={100}
                  />
                ) : (
                  <Image
                    src={"/imagen_proyecto.png"}
                    alt={data?.proyecto.name}
                    className="w-full h-[50vh] object-cover m-auto"
                    width={800}
                    height={800}
                  />
                )}
              </div>
              <div className="mt-10 text-white mb-6">
                <div className="flex justify-between">
                  <h2 className="font-bold text-[2.5rem]">
                    {data?.proyecto.name}
                  </h2>
                  <CompleteOrNoComplete id={id} />
                </div>
                <p className="text-justify mt-5">
                  {data?.proyecto.description}
                </p>
                <div className="flex xl:flex-row flex-col justify-between mt-12 xl:items-center gap-4">
                  <p className="text-[#18a49d] font-semibold text-[1.3rem]">
                    {data?.proyecto.date}
                  </p>
                  <Link href="/inicio" className="buttonAdd text-center">
                    Regresar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Proyecto;

import Layout from "@/components/Layout";
import { DotWave } from "@uiball/loaders";
import { useState, useEffect } from "react";
import useGetUser from "@/hooks/useGetUser";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_USER_DATA, UPDATE_USER } from "@/schema/gql/QuerysAndMutations";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [showLoading, setShowLoading] = useState(true);
  const { isToken, data, loading, idUser, refetch } = useGetUser();
  const router = useRouter();
  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      toast.success("Perfil actualizado");
    },
    onError: (error) => {
      toast.error("Perfil no actualizado:", error);
    },
  });

  const userId = idUser.user?.id;
  const {
    loading: userDataLoading,
    error: userDataError,
    data: userData,
  } = useQuery(GET_USER_DATA, {
    variables: { userId },
    skip: !userId,
  });

  useEffect(() => {
    if (userData?.getUser) {
      setFullName(userData.getUser.name);
      setEmail(userData.getUser.email);
    }
  }, [userData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateUser({
        variables: {
          userId,
          input: {
            name: fullName,
            email,
          },
        },
      });
      refetch();
    } catch (error) {
      toast.error("Perfil no actualizado:", error);
    }
  };

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
    <Layout paginas={"Profile"}>
      <form
        onSubmit={handleSubmit}
        className="form xl:w-[50%] w-[95%] m-auto mt-28"
      >
        <p className="heading">Perfil</p>
        <input
          className="input"
          placeholder="Nombre Completo"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          className="input"
          placeholder="Correo Eléctronico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn">Actualizar informacion</button>
      </form>
    </Layout>
  );
}

export default Profile;

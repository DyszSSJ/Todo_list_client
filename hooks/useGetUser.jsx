import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/schema/gql/QuerysAndMutations";
import { getLocal } from "@/assets/localStorage";
import jwtDecode from "jwt-decode";

function useGetUser() {
  const [idUser, setIdUser] = useState("");
  const [isToken, setIsToken] = useState(false);

  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: {
      userId: idUser.user?.id,
    },
  });

  useEffect(() => {
    const token = getLocal("token");
    if (token) {
      const decode = jwtDecode(token);
      setIdUser(decode);
      setIsToken(true)
    } else {
      setIsToken(false)
    }
  }, []);

  return {
    data,
    loading,
    error,
    idUser,
    isToken,
    refetch
  };
}

export default useGetUser;

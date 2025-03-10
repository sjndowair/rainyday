import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, doc, onSnapshot, updateDoc, arrayUnion, arrayRemove, orderBy, query } from "firebase/firestore";
import { db } from "../../constants/firebase-contants"
import {useEffect, useState} from "react";


const useFirestoreQuery = ({queryKey, queryFn}: any) => {
const [isData, setIsData] = useState(null);

    useEffect(() => {
        const unsubscribe = queryFn(setIsData);
        return unsubscribe();
    }, [queryKey]);
    return useQuery({
        queryKey,
        queryFn: () => isData,
        enabled: !!isData,
        refetchOnWindowFocus: false,
    })
}


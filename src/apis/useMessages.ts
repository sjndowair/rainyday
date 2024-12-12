import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useAuthState} from "react-firebase-hooks/auth";
import {collection, query, orderBy, onSnapshot, where} from "firebase/firestore"
import {db ,auth} from "../constants/firebase-contants"

interface Message {
    id: string;
    content: string;
    sender: string;
    timestamp: any;
}






export const useMessages = (chatId: string | null) => {
    const [user] = useAuthState(auth);
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ['messages', chatId],
        queryFn: () =>
            new Promise<Message[]>((resolve) => {
                if (!chatId || !user) {
                    resolve([]);
                    return;
                }

                const q = query(collection(db, 'messages'), where('chatId', '==', chatId), orderBy('timestamp', 'asc'));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const messages = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...(doc.data() as Omit<Message, 'id'>),
                        userId: user.uid
                    }));
                    queryClient.setQueryData(['messages', chatId], messages);
                    resolve(messages);
                });

                return () => unsubscribe();
            }),
        enabled: !!chatId && !!user,
        refetchOnWindowFocus: false,
        staleTime: Infinity
    });
};
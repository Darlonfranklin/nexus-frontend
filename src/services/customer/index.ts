import { AxiosResponse } from "axios";
import { ICustomer } from "../../models/customer";
import client from "../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useCustomerService = () => {

    const navigate = useNavigate();

    const save = async (customer: ICustomer): Promise<ICustomer | undefined> => {
        const token = localStorage.getItem("@nexus.application:token");
        if (!token) {
            toast.error("Você precisa estar logado para acessar os clientes!");
            return;
        }

        try {
            const response: AxiosResponse<ICustomer> = await client.post<ICustomer>("/clients", customer);
            toast.success("Salvo com sucesso!!!");
            navigate("listar");
            return response.data;
        } catch (error) {
            toast.error("Erro ao salvar!!!");
            navigate("/cadastros/cliente");
        }
    }


    const update = async (customerId: any, newData: any): Promise<any | undefined> => {
        try {
            const response: AxiosResponse<ICustomer> = await client.put<ICustomer>(`/clients/${customerId}`, newData);
            console.log("Dados do cliente atualizados:", response.data);
            toast.success("Dados do cliente atualizados com sucesso!!!");
            navigate("listar");
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar os dados do cliente:", error);
            toast.error("Erro ao atualizar os dados do cliente!!!");
            throw error;
        }
    };

    return { save, update }
}
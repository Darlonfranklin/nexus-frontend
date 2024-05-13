import { AxiosResponse } from "axios";
import { ICustomer } from "../../models/customer";
import client from "../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const useCustomerService = () => {

    const navigate = useNavigate();


    const save = async (customer: ICustomer): Promise<ICustomer | undefined> => {
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

    const update = async (customerId: string, newData: ICustomer): Promise<ICustomer | undefined> => {
        try {
            const response: AxiosResponse<ICustomer> = await client.put<ICustomer>(`/clients/${customerId}`, newData);
            toast.success("Dados do cliente atualizados com sucesso!!!");
            navigate("/cadastros/cliente/listar");
            return response.data;
        } catch (error) {
            toast.error("Erro ao atualizar os dados do cliente!!!");
            navigate("/cadastros/editar");
        }
    };

    return { save, update }
}
import { AxiosResponse } from "axios";
import { ICustomer } from "../../models/customer";
import client from "../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useCustomerService = () => {

    const navigate = useNavigate();

    const save = async (cliente: ICustomer): Promise<ICustomer | undefined> => {
        try {
            const response: AxiosResponse<ICustomer> = await client.post<ICustomer>("/clients", cliente);
            toast.success("Salvo com sucesso!!!");
            navigate("listar");
            return response.data;
        } catch (error) {
            toast.error("Erro ao salvar!!!");
            navigate("/cadastros/cliente");
        }
    }
    return { save }
}
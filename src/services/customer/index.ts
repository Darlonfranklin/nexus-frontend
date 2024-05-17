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
            return response.data;
        } catch (error: any) {
            if (error.response) {
                const statusCode = error.response.status;
                if (statusCode === 403) {
                    toast.error("CPF ou E-MAIL já em uso!");
                } else if (statusCode === 500) {
                    toast.error("ERRO ao salvar");
                } else {
                    toast.error("Ocorreu um erro inesperado");
                }
            } else {
                toast.error("Erro de conexão. Verifique sua rede e tente novamente.");
            }
        }
    };

    const update = async (customerId: string, newData: ICustomer): Promise<ICustomer | undefined> => {
        try {
            const response: AxiosResponse<ICustomer> = await client.put<ICustomer>(`/clients/${customerId}`, newData);
            toast.success("Dados do cliente atualizados com sucesso!!!");
            return response.data;
        } catch (error) {
            toast.error("Erro ao atualizar os dados do cliente!!!");
            navigate("/cadastros/editar");
        }
    };

    return { save, update }
}
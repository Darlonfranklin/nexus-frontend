import { AxiosResponse } from "axios";
import { ICustomer } from "../../models/customer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../axios";

export const useCustomerService = () => {
  const navigate = useNavigate();

  const save = async (customer: ICustomer): Promise<ICustomer | undefined> => {
    try {
      const response: AxiosResponse<ICustomer> = await api.post<ICustomer>(
        "/clients",
        customer
      );
      toast.success("Salvo com sucesso!!!");
      return response.data;
    } catch (error: any) {
      const statusCode = error.response.status;
      if (statusCode === 400) {
        toast.error("CPF ou E-MAIL já em uso!");
      } else {
        toast.error("Erro de conexão. Verifique sua rede e tente novamente.");
      }
    }
  };

  const update = async (
    customerId: string,
    newData: ICustomer
  ): Promise<ICustomer | undefined> => {
    try {
      const response: AxiosResponse<ICustomer> = await api.put<ICustomer>(
        `/clients/${customerId}`,
        newData
      );
      toast.success("Dados do cliente atualizados com sucesso!!!");
      return response.data;
    } catch (error) {
      toast.error("Erro ao atualizar os dados do cliente!!!");
      navigate("/cadastros/editar");
    }
  };

  const deleteId = async (customerId: string) => {
    try {
      const response: AxiosResponse = await api.delete(
        `/clients/${customerId}`
      );
      toast.success("Cliente deletado com sucesso!!!");
      return response;
    } catch (error) {
      toast.error("Erro ao exluir cliente!!!");
    }
  };

  return { save, update, deleteId };
};

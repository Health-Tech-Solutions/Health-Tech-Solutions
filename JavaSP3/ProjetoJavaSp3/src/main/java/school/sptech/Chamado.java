package school.sptech;

import school.sptech.DAO.ChamadoDAO;

public class Chamado {

    ChamadoDAO chamadoDAO = new ChamadoDAO();

    public void abrirChamado(String nivel, String estado, String sla,
                             String descricao, int idComponente) {
        chamadoDAO.inserirChamado(nivel, estado, sla, descricao, idComponente);
    }
}

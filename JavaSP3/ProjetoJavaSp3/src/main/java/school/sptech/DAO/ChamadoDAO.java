package school.sptech.DAO;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.Conexoes.Conexao;

public class ChamadoDAO extends DAO{


    public void inserirChamado(String nivel, String estado, String sla,
                               String descricao, int idPeca) {
        con.update("INSERT INTO chamado (nivel, estado, sla, descricao, dataHora, fkRegistro) VALUES \n" +
                "(?, ?, ?, ?, NOW(), (SELECT fkMaquinario FROM peca WHERE idPeca = ?));", nivel, estado, sla, descricao,idPeca);
    }
}

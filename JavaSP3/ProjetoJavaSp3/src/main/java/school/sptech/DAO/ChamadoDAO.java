package school.sptech.DAO;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.Conexoes.Conexao;

public class ChamadoDAO extends DAO{


    public void inserirChamado(String nivel, String estado, String sla,
                               String descricao, int idPeca) {

        con.update("INSERT INTO chamado (nivel, estado, sla, descricao, dataHora, fkRegistro) VALUES \n" +
                "(?, ?, ?, ?, GETDATE(), (SELECT TOP 1 idRegistro FROM registro WHERE fkPeca = ? ORDER BY idRegistro DESC));", nivel, estado, sla, descricao,idPeca);
//        conMySql.update("INSERT INTO chamado (nivel, estado, sla, descricao, dataHora, fkRegistro) VALUES \n" +
//                "(?, ?, ?, ?, NOW(), (SELECT idRegistro FROM registro WHERE fkPeca = ? ORDER BY idRegistro DESC LIMIT 1));", nivel, estado, sla, descricao,idPeca);
    }
}

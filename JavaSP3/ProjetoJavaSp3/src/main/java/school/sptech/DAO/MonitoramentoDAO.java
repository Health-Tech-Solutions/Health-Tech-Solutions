package school.sptech.DAO;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.Componente;
import school.sptech.ComponenteRowMapper;
import school.sptech.Conexao;

import java.util.List;

public class MonitoramentoDAO {
    Conexao conexao = new Conexao();
    JdbcTemplate con = conexao.getConexao();

    public void inserirRegistros(String data, int fkMaquina,int fkPeca,int fkTipoRegistro,double valor,int fkMedidaRegistro){
        con.update(  "INSERT INTO registro (dataHora, fkMaquina, fkPeca, fkTipoRegistro, valor, fkMedidaRegistro ) VALUES (?, ?, ?, ?, ?, ? )",
                data, fkMaquina, fkPeca, fkTipoRegistro, valor, fkMedidaRegistro);
    }

    public List<Componente> getComponentesMonitorados(){
        return con.query("SELECT * FROM peca", new ComponenteRowMapper());
    }

}

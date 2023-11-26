package school.sptech.DAO;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.Componente;
import school.sptech.RowMapper.ComponenteRowMapper;
import school.sptech.Conexao;

import java.util.List;

public class MonitoramentoDAO {
    Conexao conexao = new Conexao();
    JdbcTemplate con = conexao.getConexao();

    public void inserirRegistros(String data,double valor, int fkMaquina,int fkPeca ){
        con.update(  "INSERT INTO registro (dataHora, fkMaquina, fkPeca,  valor ) VALUES (?, ?, ?, ?)",
                data, fkMaquina, fkPeca, valor);
    }

    public List<Componente> getComponentesMonitorados(){
        return con.query("SELECT * FROM peca", new ComponenteRowMapper());
    }

}

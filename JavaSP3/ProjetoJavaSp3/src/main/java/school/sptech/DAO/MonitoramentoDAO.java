package school.sptech.DAO;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.Componente;
import school.sptech.Conexoes.ConexaoSQlServer;
import school.sptech.RowMapper.ComponenteRowMapper;
import school.sptech.Conexoes.Conexao;

import java.util.List;

public class MonitoramentoDAO {
    Conexao conexao = new Conexao();
//    ConexaoSQlServer conexao = new ConexaoSQlServer();
    JdbcTemplate con = conexao.getConexao();

    public void inserirRegistros(String data,double valor, int fkMaquina,int fkPeca ){
        con.update(  "INSERT INTO registro (dataHora, fkMaquina, fkPeca,  valor ) VALUES (?, ?, ?, ?)",
                data, fkMaquina, fkPeca, valor);
//        con.update("INSERT INTO registro (dataHora,fkMaquina,fkPeca,valor) VALUES (GETDATE(),?,?,?)",fkMaquina,fkPeca,valor);
    }

    public List<Componente> getComponentesMonitorados(){
        return con.query("SELECT * FROM peca", new ComponenteRowMapper());
    }

    public List<Componente> getLimiteComponente(){
        return con.query("SELECT * FROM limite", new ComponenteRowMapper());
    }

}

package school.sptech.DAO;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.Componente;
import school.sptech.Conexoes.ConexaoSQlServer;
import school.sptech.RowMapper.ComponenteRowMapper;
import school.sptech.Conexoes.Conexao;

import java.util.List;

<<<<<<< HEAD
public class MonitoramentoDAO {
    Conexao conexao = new Conexao();
//    ConexaoSQlServer conexao = new ConexaoSQlServer();
    JdbcTemplate con = conexao.getConexao();
=======
public class MonitoramentoDAO extends DAO{

>>>>>>> f184b393e09aab77e349a2843ccbf08a8264ef59

    public void inserirRegistros(String data,double valor, int fkMaquina,int fkPeca ){
        conMySql.update("INSERT INTO registro (dataHora, fkMaquina, fkPeca, valor) VALUES (?, ?, ?, ?)",
                data, fkMaquina, fkPeca, valor);
        con.update("INSERT INTO registro (dataHora,fkMaquina,fkPeca,valor) VALUES (GETDATE(),?,?,?)",fkMaquina,fkPeca,valor);
    }

    public List<Componente> getComponentesMonitorados(){
        return con.query("SELECT \n" +
                "\tp.idPeca AS idPeca,\n" +
                "    p.nome AS nome,\n" +
                "    p.modelo AS modelo,\n" +
                "    p.fkTipoRegistro AS fkTipoRegistro,\n" +
                "    p.fkMaquinario AS fkMaquinario,\n" +
                "    l.valor AS valor\n" +
                " FROM peca AS p \n" +
                " JOIN limite AS l ON l.fkPeca = p.idPeca ;",  new ComponenteRowMapper());
    }

    public List<Componente> getLimiteComponente(){
        return con.query("SELECT * FROM peca JOIN limite ON fkPeca = idPeca;", new ComponenteRowMapper());
    }


}

package school.sptech.DAO;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.Conexoes.Conexao;
import school.sptech.Conexoes.ConexaoSQlServer;

public abstract class DAO {

    static final Conexao conexao = new Conexao();
    static final ConexaoSQlServer conexaoSQlServer = new ConexaoSQlServer();
    static final JdbcTemplate conMySql = conexao.getConexao();
    static final JdbcTemplate con = conexaoSQlServer.getConexao();



}

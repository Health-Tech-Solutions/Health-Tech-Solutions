package school.sptech.Conexoes;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class ConexaoSQlServer {
    private JdbcTemplate conexao;
    public ConexaoSQlServer(){
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        dataSource.setUrl("jdbc:sqlserver://3.221.69.161:1433;databaseName=hts;encrypt=false");
        dataSource.setUsername("sa");
        dataSource.setPassword("urubu100");

        conexao = new JdbcTemplate(dataSource);
    }

    public JdbcTemplate getConexao() {
        return conexao;
    }

    public void setConexao(JdbcTemplate conexao) {
        this.conexao = conexao;
    }
}

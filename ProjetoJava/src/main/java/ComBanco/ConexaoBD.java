package ComBanco;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class ConexaoBD {
    private JdbcTemplate conexaoBanco;
    public ConexaoBD(){
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/htsJava");
        dataSource.setUsername("root");
        dataSource.setPassword("spt3ch");

        conexaoBanco = new JdbcTemplate(dataSource);
    }

    public JdbcTemplate getConexaoBanco() {
        return conexaoBanco;
    }

    public void setConexaoBanco(JdbcTemplate conexaoBanco) {
        this.conexaoBanco = conexaoBanco;
    }
}

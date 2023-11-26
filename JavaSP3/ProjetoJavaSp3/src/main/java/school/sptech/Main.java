package school.sptech;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.Conexoes.ConexaoSQlServer;
import school.sptech.RowMapper.ComponenteRowMapper;

import java.util.List;

public class Main {
    public static void main(String[] args) {

        ConexaoSQlServer conexao = new ConexaoSQlServer();
        JdbcTemplate con = conexao.getConexao();
        List<Componente> componentes = con.query("SELECT * FROM peca", new ComponenteRowMapper());
        for (Componente componente : componentes) {
            System.out.println(componente);
        }
//        Maquina maq = new Maquina();
//        maq.pegarEnderecoMac();
    }
}
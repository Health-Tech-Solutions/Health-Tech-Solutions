package school.sptech.DAO;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.Conexao;
import school.sptech.Maquina;

import java.util.List;

public class MaquinaDAO {

    Conexao conexao = new Conexao();
    JdbcTemplate con = conexao.getConexao();

    public void inserirMaquinario(String tipo, String modeloMaquina, String numeroSerie){
        con.update("INSERT INTO maquina (tipo,modelo,numeroSerie) VALUES (?, ?, ?);",tipo,modeloMaquina,numeroSerie);
    }

    public List<Maquina> listarMaquinas(){
        return con.query("SELECT * FROM maquina", new BeanPropertyRowMapper<>(Maquina.class));
    }
}

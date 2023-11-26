package school.sptech.DAO;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.Conexao;
import school.sptech.Maquina;
import school.sptech.MaquinaRowMapper;

import java.sql.SQLException;
import java.util.List;

public class MaquinaDAO {

    Conexao conexao = new Conexao();
    JdbcTemplate con = conexao.getConexao();

    public void inserirMaquinario(String tipo, String modeloMaquina, String numeroSerie){
        con.update("INSERT INTO maquinario (tipo,modelo,numeroSerie) VALUES (?, ?, ?);",tipo,modeloMaquina,numeroSerie);
    }

    public void inserirMaquinarioMac(int fkModelo, int fkHospital, String mac){
        int id = 456;
        con.update("INSERT INTO maquinario (idMaquinario, fkModelo, fkHospital,macAdress) VALUES (?,?,?,?)",id,fkModelo,fkHospital,mac);

    }

    public List<Maquina> listarMaquinas(){
        return con.query("SELECT * FROM maquinario", new MaquinaRowMapper());
    }

    public void inserirEnderecoMac(String MAC){
        con.update("UPDATE maquinario SET macAdress = ? WHERE idMaquinario = 7", MAC);
    }
}

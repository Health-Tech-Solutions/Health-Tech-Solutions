package school.sptech.DAO;

import com.github.britooo.looca.api.group.processador.Processador;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.Conexao;
import school.sptech.Looca;
import school.sptech.Maquina;
import school.sptech.RowMapper.MaquinaRowMapper;

import java.util.List;

public class MaquinaDAO {

    Conexao conexao = new Conexao();
    JdbcTemplate con = conexao.getConexao();

    public void inserirMaquinario(String tipo, String modeloMaquina, String numeroSerie){
        con.update("INSERT INTO maquinario (tipo,modelo,numeroSerie) VALUES (?, ?, ?);",tipo,modeloMaquina,numeroSerie);
    }

    public void inserirMaquinarioMac(int id,int fkModelo, int fkHospital, String mac){
        con.update("INSERT INTO maquinario (idMaquinario, dataCadastramento,fkModelo, fkHospital,macAdress) VALUES (?,now(),?,?,?)",id,fkModelo,fkHospital,mac);
        inserirCPU(id);
    }

    public void inserirCPU(int id){
        Processador processador = new Processador();
        String nomeProcessador = "CPU";
        String descricao = processador.getNome();
        con.update("INSERT INTO peca(nome,descricao,fkTipoRegistro,fkMaquinario) VALUES (?,?,?,?)",nomeProcessador,descricao,1,id);
    }

    public List<Maquina> listarMaquinas(){
        return con.query("SELECT * FROM maquinario", new MaquinaRowMapper());
    }

    public void inserirEnderecoMac(String MAC){
        con.update("UPDATE maquinario SET macAdress = ? WHERE idMaquinario = 7", MAC);
    }
}

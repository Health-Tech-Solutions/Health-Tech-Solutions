package school.sptech.DAO;

import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.Conexoes.Conexao;
import school.sptech.Conexoes.ConexaoSQlServer;
import school.sptech.Maquina;
import school.sptech.RowMapper.MaquinaRowMapper;

import java.util.List;

public class MaquinaDAO extends DAO{

/*
    public void inserirMaquinario(String tipo, String modeloMaquina, String numeroSerie){
        String insert = String.format("INSERT INTO maquinario (tipo,modelo,numeroSerie) VALUES (?, ?, ?);",tipo,modeloMaquina,numeroSerie);

        con.update(insert);
        conMySql.update(insert);
    }

 */

    public void inserirMaquinarioMac(int id,int fkModelo, int fkHospital, String mac){
        con.update("INSERT INTO maquinario (idMaquinario, dataCadastramento,fkModelo, fkHospital,macAdress) VALUES (?,GETDATE(),?,?,?)",id,fkModelo,fkHospital,mac);
        this.inserirCPU(id);
    }



    public void inserirCPU(int id){
        Processador processador = new Processador();
        String nomeProcessador = "CPU";
        String modelo = processador.getNome();
        String insert = String.format("INSERT INTO peca(nome,fkTipoRegistro,fkMaquinario) VALUES (?,?,?)",nomeProcessador,1,id);

        con.update("INSERT INTO peca(nome,fkTipoRegistro,fkMaquinario) VALUES (?,?,?)",nomeProcessador,1,id);


        inserirLimiteCPU(id);
    }


    public void inserirLimiteCPU(int id){

        con.update("INSERT INTO limite(valor, fkPeca)\n" +
                "SELECT 85, MAX(idPeca)\n" +
                "FROM peca;");

        inserirRAM(id);
    }


    public void inserirRAM(int id){
        Memoria memoria = new Memoria();
        String nomeMemoria = "RAM";
        String insert = String.format("INSERT INTO peca(nome,fkTipoRegistro,fkMaquinario) VALUES (?,?,?)", nomeMemoria,1,id);

        con.update("INSERT INTO peca(nome,fkTipoRegistro,fkMaquinario) VALUES (?,?,?)", nomeMemoria,1,id);


        inserirLimiteRAM();
    }


    public void inserirLimiteRAM(){

        con.update("INSERT INTO limite(valor, fkPeca)\n" +
                "SELECT 85, MAX(idPeca)\n" +
                "FROM peca;");
    }

    public void inserirLimiteRamMySql(){
        conMySql.update("INSERT INTO limite(valor,fkPeca) VALUES (85,(SELECT idPeca FROM peca ORDER BY idPeca DESC LIMIT 1))");
    }
    public List<Maquina> listarMaquinas(){
        return con.query("SELECT * FROM maquinario", new MaquinaRowMapper());
    }



    public void inserirMaquinarioMySql(int id,int fkModelo, int fkHospital, String mac){
        conMySql.update("INSERT INTO maquinario (idMaquinario, dataCadastramento,fkModelo, fkHospital,macAdress) VALUES (?,now(),?,?,?)",id,fkModelo,fkHospital,mac);
    }

    public void inserirCpuMysql(int id){
        Processador processador = new Processador();
        String nomeProcessador = "CPU";
        String modelo = processador.getNome();
        conMySql.update("INSERT INTO peca(nome,modelo,fkTipoRegistro,fkMaquinario) VALUES (?,?,?,?)",nomeProcessador,modelo,1,id);
    }

    public void inserirLimiteCpuMysql(int id){
        conMySql.update("INSERT INTO limite(valor,fkPeca) VALUES (85,(SELECT idPeca " +
                "FROM peca " +
                "ORDER BY idPeca DESC LIMIT 1))");
    }
    public void inserirRamMySql(int id){
        Memoria memoria = new Memoria();
        String nomeMemoria = "RAM";
        String insert = String.format("INSERT INTO peca(nome,fkTipoRegistro,fkMaquinario) VALUES (?,?,?)", nomeMemoria,1,id);
        conMySql.update(insert);
    }

}

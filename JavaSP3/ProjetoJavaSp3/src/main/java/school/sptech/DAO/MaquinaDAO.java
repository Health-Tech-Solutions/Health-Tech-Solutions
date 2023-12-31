package school.sptech.DAO;

import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.Componente;
import school.sptech.Conexoes.Conexao;
import school.sptech.Conexoes.ConexaoSQlServer;
import school.sptech.Maquina;
import school.sptech.RowMapper.ComponenteRowMapper;
import school.sptech.RowMapper.MaquinaRowMapper;

import java.util.List;

public class MaquinaDAO extends DAO{



    public synchronized int pegarPecas(){
        List<Componente> count =  con.query("SELECT \n" +
                "\tp.idPeca AS idPeca,\n" +
                "    p.nome AS nome,\n" +
                "    p.modelo AS modelo,\n" +
                "    p.fkTipoRegistro AS fkTipoRegistro,\n" +
                "    p.fkMaquinario AS fkMaquinario,\n" +
                "    l.valor AS valor\n" +
                " FROM peca AS p \n" +
                " LEFT JOIN limite AS l ON l.fkPeca = p.idPeca "
                , new ComponenteRowMapper());
        return count.size();
    }

    public void inserirMaquinarioMac(int id,int fkModelo, int fkHospital, String mac){
        con.update("INSERT INTO maquinario (idMaquinario, dataCadastramento,fkModelo, fkHospital,macAdress) VALUES (?,GETDATE(),?,?,?)",id,fkModelo,fkHospital,mac);
//        inserirMaquinarioMySql(id,fkModelo,fkHospital,mac);
        this.inserirCPU(id);

    }

    public void inserirCPU(int id){
        Processador processador = new Processador();
        String nomeProcessador = "CPU";
        String modelo = processador.getNome();

        con.update("INSERT INTO peca(nome,modelo, fkTipoRegistro,fkMaquinario) VALUES (?,?,?,?)",nomeProcessador,modelo,1,id);

//        inserirCpuMysql(id);
        inserirLimiteCPU(id);
    }

    public void inserirLimiteCPU(int id){

        con.update("INSERT INTO limite(valor, fkPeca)\n" +
                "SELECT 85, MAX(idPeca)\n" +
                "FROM peca;");
//        inserirLimiteCpuMysql(id);
        inserirRAM(id);
    }


    public void inserirRAM(int id){
        Memoria memoria = new Memoria();
        String nomeMemoria = "RAM";
        String insert = String.format("INSERT INTO peca(nome,fkTipoRegistro,fkMaquinario) VALUES (?,?,?)", nomeMemoria,1,id);

        con.update("INSERT INTO peca(nome,fkTipoRegistro,fkMaquinario) VALUES (?,?,?)", nomeMemoria,1,id);

//        inserirRamMySql(id);
//        inserirLimiteRAM();
    }

    public void inserirLimiteRAM(){
        con.update("INSERT INTO limite(valor, fkPeca)\n" +
                "SELECT 85, MAX(idPeca)\n" +
                "FROM peca;");
//        inserirLimiteRamMySql();
    }

    public void inserirLimiteRamMySql(){
        conMySql.update("INSERT INTO limite(valor,fkPeca) VALUES (85,(SELECT idPeca FROM peca ORDER BY idPeca DESC LIMIT 1))");

    }

    public List<Maquina> listarMaquinas(){
        return con.query("SELECT * FROM maquinario", new MaquinaRowMapper());
    }

    public void inserirMaquinarioMySql(int id,int fkModelo, int fkHospital, String mac){
        conMySql.update("INSERT INTO maquinario (idMaquinario, dataCadastramento,fkModelo, fkHospital,macAdress) VALUES (?,now(),?,?,?);",id,fkModelo,fkHospital,mac);
    }

    public void inserirCpuMysql(int id){
        Processador processador = new Processador();
        String nomeProcessador = "CPU";
        String modelo = processador.getNome();
        int idPeca = this.pegarPecas() + 1;
        conMySql.update("INSERT INTO peca(idPeca,nome,modelo,fkTipoRegistro,fkMaquinario) VALUES (?,?,?,?,?)",idPeca,nomeProcessador,modelo,1,id);
    }

    public void inserirLimiteCpuMysql(int id){

        conMySql.update("INSERT INTO limite(valor,fkPeca) VALUES (85,(SELECT idPeca " +
                "FROM peca " +
                "ORDER BY idPeca DESC LIMIT 1))");
    }
    public void inserirRamMySql(int id){
        Memoria memoria = new Memoria();
        String nomeMemoria = "RAM";
        int idPeca = this.pegarPecas() +1;
        conMySql.update("INSERT INTO peca(idPeca,nome,fkTipoRegistro,fkMaquinario) VALUES (?,?,?,?)", idPeca,nomeMemoria,1,id);
    }

}

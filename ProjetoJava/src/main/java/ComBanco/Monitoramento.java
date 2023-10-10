package ComBanco;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.discos.DiscoGrupo;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.processos.ProcessoGrupo;
import com.github.britooo.looca.api.group.sistema.Sistema;
import com.github.britooo.looca.api.group.temperatura.Temperatura;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Scanner;

public class Monitoramento {
    Looca looca = new Looca();
    private Sistema sistema = looca.getSistema();
    private Memoria memoria = looca.getMemoria();
    private Processador processador = looca.getProcessador();
    private Temperatura temperatura = looca.getTemperatura();
    private ProcessoGrupo grupoDeProcessos = looca.getGrupoDeProcessos();
    private DiscoGrupo grupoDeDiscos = looca.getGrupoDeDiscos();
    private List<Disco> discos = grupoDeDiscos.getDiscos();

    private Scanner leitura = new Scanner(System.in);

    private double memEmUso;
    private double memDisp;
    private double memTotal;
    private double freqCpu;
    private double cpuEmUso;
    private double tamDisco;

    ConexaoBD conexao = new ConexaoBD();
    JdbcTemplate con = conexao.getConexaoBanco();

    public void tratarDados() {
        Long memoriaEmUso = memoria.getEmUso();
        double memEmUsoDouble = (double) memoriaEmUso;
        memEmUso = memEmUsoDouble / (Math.pow(10,9));

        Long memoriaDisponivel = memoria.getDisponivel();
        double memDispDouble = (double) memoriaDisponivel;
        memDisp = memDispDouble / (Math.pow(10,9));

        Long memoriaTotal = memoria.getTotal();
        double memTotalDouble = (double) memoriaTotal;
        memTotal = memTotalDouble / Math.pow(10,9);

        Long frequenciaCpu = processador.getFrequencia();
        double freqCpuDouble = (double) frequenciaCpu;
        freqCpu = freqCpuDouble / Math.pow(10,9);

        cpuEmUso = Math.round(processador.getUso());


    }

    public void monitorarMaquinas() {
        /*Maquina maquina = new Maquina();
        maquina.listarMaquinas();
        System.out.println("Informe o ID da máquina que você deseja monitorar: ");
        Integer id = leitura.nextInt();

        List<Maquina> maquinas = con.query(
                "SELECT * FROM maquinas WHERE id = ?", new BeanPropertyRowMapper<>(Maquina.class), id);*/

        tratarDados();


        System.out.printf("""
                Sistema: 
                %s
                Memória: 
                Em uso: %.2f GiB
                Disponível: %.2f GiB
                Total: %.2f GiB
                
                Processador: 
                Fabricante: %s
                Nome: %s
                Identificador: %s
                Microarquitetura: %s
                Nº de CPUs Físicas: %s
                Nº de CPUs Lógicas: %s
                Frequência: %f GHz
                Em uso: %.0f%%
                
                Disco:
                """,
                sistema, memEmUso, memDisp, memTotal, processador.getFabricante(), processador.getNome(),
                processador.getIdentificador(), processador.getMicroarquitetura(), processador.getNumeroCpusFisicas(),
                processador.getNumeroCpusLogicas(), freqCpu, cpuEmUso);


        for (Disco disco : discos) {
            Long tamanhoDisco = disco.getTamanho();
            double tamDiscoDouble = (double) tamanhoDisco;
            tamDisco = tamDiscoDouble / Math.pow(10,9);

            System.out.printf("""
                    Serial: %s
                    Nome: %s
                    Modelo: %s
                    Tamanho: %.2f GB
                    
                    """, disco.getSerial(), disco.getNome(), disco.getModelo(), tamDisco);
        }
    }

}

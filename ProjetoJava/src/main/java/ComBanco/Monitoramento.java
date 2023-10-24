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

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

    private String padrao = "\u001B[0m"; // redefinir a formatação depois de estilizar
    private String negrito = "\u001B[1m";
    private String vermelho = "\u001B[31m";
    private String verde = "\u001B[32m";
    private String amarelo = "\u001B[33m";
    private String azul = "\u001B[34m";
    private String magenta = "\u001B[35m";
    private String ciano = "\u001B[36m";

    private String enfeite15 = "-".repeat(15);

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

        LocalDateTime dataHora = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String dataFormatada = formatter.format(dataHora);

        System.out.println("\n" + negrito + magenta + enfeite15 + " MONITORAMENTO " + enfeite15 + padrao);

        System.out.printf("""
              %sSistema: %s
              %s
              %sMemória: %s
              Em uso: %.2f GiB
              Disponível: %.2f GiB
              Total: %.2f GiB
                
              %sProcessador: %s
              Fabricante: %s
              Nome: %s
              Identificador: %s
              Microarquitetura: %s
              Nº de CPUs Físicas: %s
              Nº de CPUs Lógicas: %s
              Frequência: %.2f GHz
              Em uso: %.0f%%
                
              %sDisco: %s
                """,
                negrito, padrao, sistema, negrito, padrao, memEmUso, memDisp, memTotal, negrito, padrao, processador.getFabricante(),
                processador.getNome(), processador.getIdentificador(), processador.getMicroarquitetura(),
                processador.getNumeroCpusFisicas(), processador.getNumeroCpusLogicas(), freqCpu, cpuEmUso,
                negrito, padrao);

        // Memória
        con.update(
                "INSERT INTO registro (dataHora, fkMaquina, fkPeca, fkTipoRegistro, valor, fkMedidaRegistro ) " +
                        "VALUES (?, ?, ?, ?, ?, ? );", dataFormatada, 2000, 1, 1, memEmUso, 1
                );
        con.update(
                "INSERT INTO registro (dataHora, fkMaquina, fkPeca, fkTipoRegistro, valor, fkMedidaRegistro ) " +
                        "VALUES (?, ?, ?, ?, ?, ? );", dataFormatada, 2000, 1, 2, memDisp, 1
        );
        con.update(
                "INSERT INTO registro (dataHora, fkMaquina, fkPeca, fkTipoRegistro, valor, fkMedidaRegistro ) " +
                        "VALUES (?, ?, ?, ?, ?, ? );", dataFormatada, 2000, 1, 3, memTotal, 1
        );

        // CPU
        con.update(
                "INSERT INTO registro (dataHora, fkMaquina, fkPeca, fkTipoRegistro, valor, fkMedidaRegistro ) " +
                        "VALUES (?, ?, ?, ?, ?, ? );", dataFormatada, 2000, 2, 4, freqCpu, 2
        );
        con.update(
                "INSERT INTO registro (dataHora, fkMaquina, fkPeca, fkTipoRegistro, valor, fkMedidaRegistro ) " +
                        "VALUES (?, ?, ?, ?, ?, ? );", dataFormatada, 2000, 2, 1, cpuEmUso, 3
        );


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

            // Disco
            con.update(
                    "INSERT INTO registro (dataHora, fkMaquina, fkPeca, fkTipoRegistro, valor, fkMedidaRegistro ) " +
                            "VALUES (?, ?, ?, ?, ?, ? );", dataFormatada, 2000, 3, 3, tamDisco, 4
            );
        }
    }

    public void listarProcessos() {
        System.out.println("\n" + negrito + magenta + enfeite15 + " LISTA DE PROCESSOS " + enfeite15 + padrao);

        System.out.println(grupoDeProcessos.getProcessos());
        System.out.println(negrito + "Total de processos: " + grupoDeProcessos.getTotalProcessos() + padrao);
    }

}

package school.sptech;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.discos.DiscoGrupo;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.processos.ProcessoGrupo;
import com.github.britooo.looca.api.group.sistema.Sistema;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.DAO.MonitoramentoDAO;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class Monitoramento {

    Looca looca = new Looca();
    private Sistema sistema = new Sistema();
    private Memoria memoria = new Memoria();
    private Processador processador = new Processador();
    private ProcessoGrupo grupoDeProcessos = new ProcessoGrupo();
    private DiscoGrupo grupoDeDiscos = looca.getGrupoDeDiscos();
    private List<Disco> discos = grupoDeDiscos.getDiscos();
    private MonitoramentoDAO monitoramentoDAO;
    private List<Componente> componentesMonitorados;

    private Long memEmUso;
    private Long memDisp;
    private Long memTotal;
    private Long freqCpu;
    private double cpuEmUso;
    private double tamDisco;

    public Monitoramento() {
        this.monitoramentoDAO = new MonitoramentoDAO();
        this.componentesMonitorados = this.monitoramentoDAO.getComponentesMonitorados();
        this.memEmUso = memoria.getEmUso();
        this.memDisp = memoria.getDisponivel();
        this.memTotal = memoria.getTotal();
        this.freqCpu = processador.getFrequencia();
        this.cpuEmUso = Math.round(processador.getUso());
    }

    public Double tratarDados(Long variavel){
        double variavelDouble = (double) variavel;
        variavelDouble = variavelDouble / (Math.pow(10,9));
        return variavelDouble;
    }

    public void monitorarMaquinas(int idMaquina) {
        Double memEmUso = tratarDados(this.memEmUso);
        Double memDisp = tratarDados(this.memDisp);
        Double memTotal = tratarDados(this.memTotal);
        Double freqCpu = tratarDados(this.freqCpu);
        LocalDateTime dataHora = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String dataFormatada = formatter.format(dataHora);

        do{
            try{
                Thread.sleep(2000);
                System.out.println("MONITORAMENTO");
                System.out.printf("""
                +--------------------------+
                | Sistema:                 |
                | %s                       |
                +--------------------------+
                | Memória:                 |
                | Em uso: %.2f GB          |
                | Disponivel: %.2f GB      |
                | Total: %.2f GB           |
                +--------------------------+
                | Processador:             |
                | Fabricante:%s            |
                | Nome: %s                 |
                | Identificador: %s        |
                | Microarquitetura: %s     |
                | Nº de CPUs Físicas: %s   |
                | Nº de CPUs Lógicas: %s   |
                | Frequência: %d GHz       |
                | Em uso: %.0f%%           |
                +--------------------------+
                """,sistema,memEmUso,memDisp,memTotal,processador.getFabricante(),processador.getNome(),
                        processador.getNome(),processador.getIdentificador(),processador.getMicroarquitetura(),
                        processador.getNumeroCpusFisicas(),processador.getNumeroCpusLogicas(),freqCpu,cpuEmUso);

                if(!this.componentesMonitorados.isEmpty()){
                    for (Componente componenteMonitorado : this.componentesMonitorados) {
                        if(componenteMonitorado.getFkMaquina().equals(idMaquina)){
                            if(componenteMonitorado.getFkTipoRegistro().equals(1)){ // Tipo registro é percentual de uso
                                if(componenteMonitorado.getNome().equalsIgnoreCase("CPU")){
                                    monitoramentoDAO.inserirRegistros( dataFormatada,memEmUso, componenteMonitorado.getFkMaquina(), componenteMonitorado.getIdComponente());
                                } else if(componenteMonitorado.getNome().equalsIgnoreCase("RAM")){
                                    monitoramentoDAO.inserirRegistros(dataFormatada,cpuEmUso, componenteMonitorado.getFkMaquina(), componenteMonitorado.getIdComponente());
                                }
                            } else if (componenteMonitorado.getFkTipoRegistro().equals(2)) { // Tipo de registro é percentual disponivel
                                if(componenteMonitorado.getNome().equalsIgnoreCase("RAM")){
                                    monitoramentoDAO.inserirRegistros(dataFormatada,memDisp , componenteMonitorado.getFkMaquina(), componenteMonitorado.getIdComponente());
                                }
                            } else if(componenteMonitorado.getFkTipoRegistro() == 3){
                                monitoramentoDAO.inserirRegistros(dataFormatada, memTotal, componenteMonitorado.getFkMaquina(), componenteMonitorado.getIdComponente());
                            } else if (componenteMonitorado.getFkTipoRegistro() == 4) {
                                monitoramentoDAO.inserirRegistros(dataFormatada,freqCpu, componenteMonitorado.getFkMaquina(), componenteMonitorado.getIdComponente());
                            }
                        }
                    }
                } else {
                    System.out.println("A sua maquina não tem componentes cadastrados para ser monitorados");
                }

                for (Disco disco : discos) {
                    Long tamanhoDisco = disco.getTamanho();
                    double tamDiscoDouble = (double) tamanhoDisco;
                    tamDisco = tamDiscoDouble / Math.pow(10, 9);

                    System.out.printf("""
                    Serial: %s
                    Nome: %s
                    Modelo: %s
                    Tamanho: %.2f GB
                                        
                    """, disco.getSerial(), disco.getNome(), disco.getModelo(), tamDisco);

//                monitoramentoDAO.inserirRegistros(dataFormatada,tamDisco, 2000, 3);

                }
            } catch (InterruptedException e){
            }

        } while(true);

    }
    public void listarProcessos() {
        System.out.println("\n" + " LISTA DE PROCESSOS ");
        System.out.println(grupoDeProcessos.getProcessos());
        System.out.println("Total de processos: " + grupoDeProcessos.getTotalProcessos());
    }
}









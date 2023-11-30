package school.sptech;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.discos.DiscoGrupo;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.processos.ProcessoGrupo;
import com.github.britooo.looca.api.group.sistema.Sistema;
import org.checkerframework.checker.units.qual.A;
import org.checkerframework.checker.units.qual.C;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.DAO.MonitoramentoDAO;
import school.sptech.Jira.AbrirChamado;

import javax.sound.midi.spi.SoundbankReader;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class Monitoramento {

    Looca looca = new Looca();
    private int fkMaquina;
    private Sistema sistema = new Sistema();
    private Memoria memoria = new Memoria();
    private Processador processador = new Processador();
    private ProcessoGrupo grupoDeProcessos = new ProcessoGrupo();
    private DiscoGrupo grupoDeDiscos = looca.getGrupoDeDiscos();
    private List<Disco> discos = grupoDeDiscos.getDiscos();
    private MonitoramentoDAO monitoramentoDAO;
    private List<Componente> componentesMonitorados;
    private List<Componente> limitesComponente;
    private Chamado chamado;
    private AbrirChamado chamadoJira;
    private String macMaquina;
    public Monitoramento(int idMaquina,String macMaquina) {
        this.fkMaquina = idMaquina;
        this.monitoramentoDAO = new MonitoramentoDAO();
        this.componentesMonitorados = this.monitoramentoDAO.getComponentesMonitorados();
        this.limitesComponente = this.monitoramentoDAO.getLimiteComponente();
        this.chamado = new Chamado();
        this.chamadoJira = new AbrirChamado();
        this.macMaquina = macMaquina;

    }

    public Monitoramento() {

    }

    public void monitorarMaquinas() {
        AbrirChamado abrirChamado = new AbrirChamado();
        school.sptech.Looca looca = new school.sptech.Looca(
                memoria.getEmUso(),
                memoria.getDisponivel(),
                memoria.getTotal(),
                processador.getFrequencia(),
                processador.getUso(),
                grupoDeDiscos.getTamanhoTotal()
        );

        Double memEmUso = looca.castingMonitoramento(looca.getMemEmUso());
        Double memDisp = looca.castingMonitoramento(looca.getMemDisp());
        Double memTotal = looca.castingMonitoramento(looca.getMemTotal());
        Double freqCpu = looca.castingMonitoramento(looca.getFreqCpu());
        Double cpuEmUso = looca.getCpuEmUso();
        Double tamDisco = looca.getTamDisco();

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
                this.componentesMonitorados = monitoramentoDAO.getComponentesMonitorados();
                if(!this.componentesMonitorados.isEmpty()){

                    for (Componente componenteMonitorado : this.componentesMonitorados) {
                        System.out.println(componenteMonitorado.getFkMaquina());
                        System.out.println(this.fkMaquina);
                        if(componenteMonitorado.getFkMaquina().equals(this.fkMaquina)){
                            System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEEEEEEEEEEE");
                            if(componenteMonitorado.getFkTipoRegistro().equals(1)){ // Tipo registro é percentual de uso
                                if(componenteMonitorado.getNome().equalsIgnoreCase("CPU")){
                                    monitoramentoDAO.inserirRegistros( dataFormatada,memEmUso, componenteMonitorado.getFkMaquina(),
                                            componenteMonitorado.getIdComponente());
                                    abrirChamado(componenteMonitorado, memEmUso);
                                } else if(componenteMonitorado.getNome().equalsIgnoreCase("RAM")){
                                    monitoramentoDAO.inserirRegistros(dataFormatada,cpuEmUso, componenteMonitorado.getFkMaquina(),
                                            componenteMonitorado.getIdComponente());
                                    abrirChamado(componenteMonitorado, cpuEmUso);
                                }

                            } else if (componenteMonitorado.getFkTipoRegistro().equals(2)) { // Tipo de registro é percentual disponivel
                                if(componenteMonitorado.getNome().equalsIgnoreCase("RAM")){
                                    monitoramentoDAO.inserirRegistros(dataFormatada,memDisp , componenteMonitorado.getFkMaquina(),
                                            componenteMonitorado.getIdComponente());
                                    abrirChamado(componenteMonitorado,memDisp);
                                }
                            } else if(componenteMonitorado.getFkTipoRegistro() == 3){
                                monitoramentoDAO.inserirRegistros(dataFormatada, memTotal, componenteMonitorado.getFkMaquina(),
                                        componenteMonitorado.getIdComponente());
                                abrirChamado(componenteMonitorado, memTotal);
                            } else if (componenteMonitorado.getFkTipoRegistro() == 4) {
                                monitoramentoDAO.inserirRegistros(dataFormatada,freqCpu, componenteMonitorado.getFkMaquina(),
                                        componenteMonitorado.getIdComponente());
                                abrirChamado(componenteMonitorado,freqCpu);
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


    public void abrirChamado(Componente componenteMonitorado, double valor) {

        if(valor < componenteMonitorado.getValorLimite()){
            System.out.println("AAAAAAAAAAAAAAAAAAAAAAA " + valor + componenteMonitorado.getValorLimite());
            chamado.abrirChamado("Alto", "Aberto", "2 Horas", "Memoria ultrapassada",componenteMonitorado.getIdComponente());
        chamadoJira.AbrirChamado(macMaquina,componenteMonitorado.getNome(),valor,1);
        }

//        for (Componente limite : limitesComponente) {
//            if (memEmUso > limite.getValorLimite()) {
//                System.out.println("Limite de memória ultrapassado!");11
//                IntegracaoJira.criarChamado();
//            } else if (freqCpu > limite.getValorLimite()) {
//                System.out.println("Limite de CPU ultrapassado!");
//                IntegracaoJira.criarChamado();
//            }
//        }
//        todo: fazer a lógica para criar o chamado (pegar o valor da tabela LIMITE e
//         comparar com o uso da CPU, RAM e disco)
    }




}









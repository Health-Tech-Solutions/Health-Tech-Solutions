package school.sptech;

public class Looca extends com.github.britooo.looca.api.core.Looca {

    private Long memEmUso;
    private Long memDisp;
    private Long memTotal;
    private Long freqCpu;
    private double cpuEmUso;
    private double tamDisco;


    public Looca(Long memEmUso, Long memDisp, Long memTotal, Long freqCpu, double cpuEmUso, double tamDisco) {
        this.memEmUso = memEmUso;
        this.memDisp = memDisp;
        this.memTotal = memTotal;
        this.freqCpu = freqCpu;
        this.cpuEmUso = cpuEmUso;
        this.tamDisco = tamDisco;
    }


    public Double castingMonitoramento(Long variavel){
        double variavelDouble = (double) variavel;
        variavelDouble = variavelDouble / (Math.pow(10,9));
        return variavelDouble;
    }


    public Long getMemEmUso() {
        return memEmUso;
    }

    public void setMemEmUso(Long memEmUso) {
        this.memEmUso = memEmUso;
    }

    public Long getMemDisp() {
        return memDisp;
    }

    public void setMemDisp(Long memDisp) {
        this.memDisp = memDisp;
    }

    public Long getMemTotal() {
        return memTotal;
    }

    public void setMemTotal(Long memTotal) {
        this.memTotal = memTotal;
    }

    public Long getFreqCpu() {
        return freqCpu;
    }

    public void setFreqCpu(Long freqCpu) {
        this.freqCpu = freqCpu;
    }

    public double getCpuEmUso() {
        return cpuEmUso;
    }

    public void setCpuEmUso(double cpuEmUso) {
        this.cpuEmUso = cpuEmUso;
    }

    public double getTamDisco() {
        return tamDisco;
    }

    public void setTamDisco(double tamDisco) {
        this.tamDisco = tamDisco;
    }
}

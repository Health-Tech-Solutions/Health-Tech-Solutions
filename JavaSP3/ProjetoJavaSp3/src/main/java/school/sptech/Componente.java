package school.sptech;

public class Componente {

    private Integer idComponente;
    private Integer fkMaquina;
    private String nome;
    private String modelo;
    private Integer fkTipoRegistro;
    private double valorLimite;

    public Componente() {

    }

    public Integer getIdComponente() {
        return idComponente;
    }

    public void setIdComponente(Integer idComponente) {
        this.idComponente = idComponente;
    }

    public Integer getFkMaquina() {
        return fkMaquina;
    }

    public void setFkMaquina(Integer fkMaquina) {
        this.fkMaquina = fkMaquina;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public Integer getFkTipoRegistro() {
        return fkTipoRegistro;
    }

    public void setFkTipoRegistro(Integer fkTipoRegistro) {
        this.fkTipoRegistro = fkTipoRegistro;
    }

    public double getValorLimite() {
        return valorLimite;
    }

    public void setValorLimite(double valorLimite) {
        this.valorLimite = valorLimite;
    }

    @Override
    public String toString() {
        return "Componente{" +
                "idComponente=" + idComponente +
                ", fkMaquina=" + fkMaquina +
                ", nome='" + nome + '\'' +
                ", modelo='" + modelo + '\'' +
                ", fkTipoRegistro=" + fkTipoRegistro +
                ", valorLimite=" + valorLimite +
                '}';
    }
}

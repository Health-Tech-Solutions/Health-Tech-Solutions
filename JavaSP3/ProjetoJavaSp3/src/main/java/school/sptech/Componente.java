package school.sptech;

public class Componente {

    private Integer idComponente;
    private Integer fkMaquina;
    private String nome;
    private String descricao;
    private Integer fkTipoRegistro;

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

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Integer getFkTipoRegistro() {
        return fkTipoRegistro;
    }

    public void setFkTipoRegistro(Integer fkTipoRegistro) {
        this.fkTipoRegistro = fkTipoRegistro;
    }

    @Override
    public String toString() {
        return "Componente{" +
                "idComponente=" + idComponente +
                ", fkMaquina=" + fkMaquina +
                ", nome='" + nome + '\'' +
                ", descricao=" + descricao +
                ", fkTipoRegistro=" + fkTipoRegistro +
                '}';
    }
}

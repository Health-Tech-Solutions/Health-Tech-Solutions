package SemBanco.Relatorios;

public interface Relatorio {

    public void gerarCabecalho();
    public void gerarCorpo();
    public void gerarRodape();
    public void imprimir();

}

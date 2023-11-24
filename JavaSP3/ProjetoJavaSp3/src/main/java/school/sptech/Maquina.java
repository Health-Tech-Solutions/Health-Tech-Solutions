package school.sptech;

import org.springframework.jdbc.core.BeanPropertyRowMapper;

import school.sptech.DAO.MaquinaDAO;
import java.util.Scanner;

public class Maquina {
    private int idMaquina;
    private String tipo;
    private String modelo;
    private String numeroSerie;
    private Scanner leitorInteiros = new Scanner(System.in);
    private Scanner leitorStrings = new Scanner(System.in);
    private MaquinaDAO maquinaDAO;

    public Maquina() {
        this.maquinaDAO = new MaquinaDAO();
    }


    public void menu(){
        while(true){
            System.out.printf("""
                    +------------------------------------
                    |               MENU                |
                    +-----------------------------------+
                    |Opções:                            |
                    | 1 - Cadastrar máquina             |
                    | 2 - Monitorar máquina             |
                    | 3 - Listar processos              |
                    | 4 - Listar máquinas               |
                    | 5 - Listar usuário                |
                    | 6 - Sair                          |
                    +-----------------------------------+
                   
                    """);
            if(leitorInteiros.hasNextInt()){
            int opcao = leitorInteiros.nextInt();
                switch (opcao){
                    case 1:
                        cadastrarMaquinas();
                        break;
                    case 2:
                        Monitoramento informacoes = new Monitoramento();
                        informacoes.monitorarMaquinas();
                        break;
                    case 3:
                        Monitoramento processos = new Monitoramento();
                        processos.listarProcessos();
                        break;
                    case 4:
                        listarMaquinas();
                        break;
                    case 5:
                        Usuario usuario = new Usuario();
                        usuario.listarUsuarios();
                        break;
                    case 6:
                        System.out.println("Saindo da sua conta");
                        return;
                }
            }

        }
    }

    public void cadastrarMaquinas(){
        System.out.println("Cadastro de máquinas");

        System.out.println("Digite o tipo da máquina");
        String tipo = leitorStrings.nextLine();

        System.out.println("Digite o modelo da máquina");
        String modeloMaquina = leitorStrings.nextLine();

        System.out.println("Número de série: ");
        String numeroSerie = leitorStrings.nextLine();

        maquinaDAO.inserirMaquinario(tipo,modeloMaquina,numeroSerie);

        System.out.println("Máquina cadastrada com sucesso");

    }

    public void listarMaquinas(){
        System.out.println("Lista de máquinas");

        for (Maquina maquina : maquinaDAO.listarMaquinas()) {
            Maquina maquinaDaVez = maquina;
            System.out.printf("""
                    Id da máquina: %d
                    Tipo da máquina: %s
                    Modelo da máquina: %s
                    Número de série: %s
                    """,maquina.getIdMaquina(),maquina.getTipo(),maquina.getModelo(),maquina.getNumeroSerie());
        };

    }

    public int getIdMaquina() {
        return idMaquina;
    }

    public String getTipo() {
        return tipo;
    }

    public String getModelo() {
        return modelo;
    }

    public String getNumeroSerie() {
        return numeroSerie;
    }

    public void setIdMaquina(int idMaquina) {
        this.idMaquina = idMaquina;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public void setNumeroSerie(String numeroSerie) {
        this.numeroSerie = numeroSerie;
    }

    public void setLeitorInteiros(Scanner leitorInteiros) {
        this.leitorInteiros = leitorInteiros;
    }

    public void setLeitorStrings(Scanner leitorStrings) {
        this.leitorStrings = leitorStrings;
    }

    public void setMaquinaDAO(MaquinaDAO maquinaDAO) {
        this.maquinaDAO = maquinaDAO;
    }


}

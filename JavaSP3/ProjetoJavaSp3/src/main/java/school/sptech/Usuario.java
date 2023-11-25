package school.sptech;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.DAO.UsuarioDAO;

import java.util.List;
import java.util.Scanner;

public class Usuario {
    private int idUsuario;
    private String nome;
    private String senha;
    private String empresa;
    private String cargo;
    private Scanner leitorInteiros = new Scanner(System.in);
    private Scanner leitorStrings = new Scanner((System.in));

    UsuarioDAO usuarioDAO = new UsuarioDAO();

//    todo: Criar uma classe só p o menu

    public void menu(){
        System.out.println("Sistema de monitoramento");

        while(true){
            System.out.printf("""
                    +------------------------+
                    | Selecione uma opção    |
                    | 1. Cadastro            |
                    | 2. Login               |
                    | 3. Sair                |
                    +------------------------+
                    """);

            if(leitorInteiros.hasNextInt()){
                int opcao = leitorInteiros.nextInt();
                switch (opcao){
                    case 1:
                        cadastrar();
                        break;
                    case 2:
                        logar();
                        break;
                    case 3:
                        return;
                    default:
                        System.out.println("Opção invalida");
                }
            } else {
                String entradaInvalida = leitorInteiros.next();
                System.out.println("Opção inválida");
            }
        }
    }

    public void cadastrar(){
        System.out.println("CADASTRAR");
        System.out.println("Digite o nome do usuário");
        String nomeCadastro = leitorStrings.nextLine();


        if(usuarioDAO.verificarExistenciaNome(nomeCadastro)){
            System.out.println("Esse nome ja existe, favor escolher outro nome");
            cadastrar();
        }else {
            System.out.println("Digite a senha");
            String senha = leitorStrings.nextLine();
            System.out.println("Digite a empresa");
            String empresa = leitorStrings.nextLine();
            System.out.println("Digite o cargo");
            String cargo = leitorStrings.nextLine();

            usuarioDAO.inserirUsuario(nomeCadastro,senha,empresa,cargo);

            System.out.printf("""
                    Usuario cadastrado com sucesso!
                    Você será redirecionado para o login
                    """);
            logar();
        }
    }

    public void logar(){
        System.out.println("LOGIN");
        System.out.println("Usuário");
        String nomeLogin = leitorStrings.nextLine();
        System.out.println("Senha");
        String senhaLogin = leitorStrings.nextLine();

        if(usuarioDAO.verificarSenha(nomeLogin, senhaLogin)) {
            menuLogado();
        } else {
            menuErro();
        }
    }

    public void menuErro(){
        System.out.printf("""
                    \n nome de usuário ou senha incorretos!
                    """);
        while(true){
            System.out.printf("""
                        \n
                        1- Continuar no login
                        2- Fazer cadastro  
                      
                        """);

            if(leitorInteiros.hasNextInt()){
                int opcao =  leitorInteiros.nextInt();
                switch (opcao){
                    case 1:
                        logar();
                        break;
                    case 2:
                        cadastrar();
                        break;
                    default:
                        System.out.println("Opção invalida");
                }
            }else {
                String entradaInvalida = leitorInteiros.next();
                System.out.printf("'%s' é uma opção inválida", entradaInvalida);
            }
        }
    }

    public void menuLogado(){
        Maquina maquina = new Maquina();
        maquina.menu();
    }

    public void listarUsuarios(){
        System.out.println("LISTA DE USUARIOS");
        for (Usuario u : usuarioDAO.listarUsuarios()) {
            System.out.printf("""
                    ID do Usuário: %d
                    Nome: %s
                    Empresa: %s
                    Cargo: %s
                    """,u.getIdUsuario(),u.getNome(),u.getEmpresa(),u.getCargo());
        }
        System.out.println("entrou e saiu");
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public String getNome() {
        return nome;
    }

    public String getSenha() {
        return senha;
    }

    public String getEmpresa() {
        return empresa;
    }

    public String getCargo() {
        return cargo;
    }

    public Scanner getLeitorInteiros() {
        return leitorInteiros;
    }

    public Scanner getLeitorStrings() {
        return leitorStrings;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public void setEmpresa(String empresa) {
        this.empresa = empresa;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public void setLeitorInteiros(Scanner leitorInteiros) {
        this.leitorInteiros = leitorInteiros;
    }

    public void setLeitorStrings(Scanner leitorStrings) {
        this.leitorStrings = leitorStrings;
    }

}

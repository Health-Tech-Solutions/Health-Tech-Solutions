package ComBanco;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Scanner;

public class Usuario {
    private Integer idUsuario;
    private String nome;
    private String senha;
    private String empresa;
    private String cargo;

    private Scanner scanInt = new Scanner(System.in);
    private Scanner scanString = new Scanner(System.in);

    private String enfeite = "-".repeat(65);
    private String enfeite15 = "-".repeat(15);
    private String igual30 = "=".repeat(30);

    // cores

    private String padrao = "\u001B[0m"; // redefinir a formatação depois de estilizar
    private String negrito = "\u001B[1m";
    private String vermelho = "\u001B[31m";
    private String verde = "\u001B[32m";
    private String amarelo = "\u001B[33m";
    private String azul = "\u001B[34m";
    private String magenta = "\u001B[35m";
    private String ciano = "\u001B[36m";


    ConexaoBD conexao = new ConexaoBD();
    JdbcTemplate con = conexao.getConexaoBanco();

    public void menu() {
        System.out.println(negrito + enfeite);
        System.out.println(" Bem-vindo ao sistema de monitoramento Health Tech Solutions! ");
        System.out.println(enfeite + negrito);

        while (true) {
            System.out.printf("""
                                        
                    +---------------------------+
                    | %s  Health Tech Solutions  %s |
                    +---------------------------+
                    |%s Selecione uma opção:      |
                    | 1. Cadastro               |
                    | 2. Login                  |
                    | 3. Sair   %s                |
                    +---------------------------+
                    """, vermelho, padrao, negrito, padrao);

            if (scanInt.hasNextInt()) {
                Integer opcaoEscolhida = scanInt.nextInt();
                if (opcaoEscolhida == 1) {
                    cadastrar();
                } else if (opcaoEscolhida == 2) {
                    logar();
                } else if (opcaoEscolhida == 3) {
                    System.out.println(negrito + "Até logo!" + padrao);
                    return;
                } else {
                    System.out.println(vermelho + "Opção inválida!" + padrao);
                }
            } else {
                String entradaInvalida = scanInt.next();
                System.out.printf("%s'%s' é uma opção inválida! %s", vermelho, entradaInvalida, padrao);
            }

        }
    }



    public void cadastrar() {
        System.out.println("\n" + negrito + ciano + enfeite15 + " CADASTRAR " + enfeite15 + padrao);
        System.out.println("Digite o nome do usuário:");
        String nomeCadastro = scanString.nextLine();

        List<Usuario> nomes = con.query(
                "SELECT nome FROM usuario", new BeanPropertyRowMapper<>(Usuario.class));

        boolean nomeJaExiste = false;
        for (Usuario nome : nomes) {
            if (nome.getNome().equals(nomeCadastro)) {
                nomeJaExiste = true;
                break;
            }
        }

        if (nomeJaExiste) {
            System.out.println(vermelho + "Nome de usuário já existe! Escolha outro nome." + padrao);
            cadastrar();
        } else {
            System.out.println("Digite a senha:");
            String senhaCadastro = scanString.nextLine();
            System.out.println("Digite a empresa:");
            String empresaCadastro = scanString.nextLine();
            System.out.println("Digite o cargo:");
            String cargoCadastro = scanString.nextLine();

            con.update(
                    "INSERT INTO usuario (nome, senha, empresa, cargo) VALUES (?, ?, ?, ?);",
                    nomeCadastro, senhaCadastro, empresaCadastro, cargoCadastro);
            System.out.printf("""
                    
                            %sUsuário cadastrado com sucesso! %s
                            Você está sendo redirecionado para o Login...
                            """, verde, padrao);
            logar();
        }
    }

    public void logar() {
        System.out.println("\n" + negrito + ciano + enfeite15 + " LOGIN " + enfeite15 + padrao);
        System.out.println("User: ");
        String nomeLogin = scanString.nextLine();
        System.out.println("Senha: ");
        String senhaLogin = scanString.nextLine();

        List<Usuario> login = con.query(
                "SELECT nome, senha FROM usuario", new BeanPropertyRowMapper<>(Usuario.class));

        boolean loginValidado = false;
        for (Usuario u : login) {
            if (nomeLogin.equalsIgnoreCase(u.getNome()) && senhaLogin.equalsIgnoreCase(u.getSenha())) {
                loginValidado = true;
                System.out.println(negrito + "Entrando..." + padrao);
                menuLogado();
                break;
            }
        }

        if (!loginValidado) {
            System.out.printf(""" 
                              \n%sNome de usuário ou senha incorretos!
                              Ou talvez você não possua um cadastro%s
                              """, vermelho, padrao);

            while (true) {
                System.out.println("""
                      \n1- Continuar no Login
                      2- Fazer cadastro
                        """);

                if (scanInt.hasNextInt()) {
                    Integer escolha = scanInt.nextInt();
                    if (escolha == 1) {
                        logar();
                    } else if (escolha == 2) {
                        cadastrar();
                        return;
                    } else {
                        System.out.println(vermelho + "Opção inválida!" + padrao);
                    }
                } else {
                    String entradaInvalida = scanInt.next();
                    System.out.printf("%s'%s' é uma opção inválida! %s", vermelho, entradaInvalida, padrao);
                }

            }
        }
    }

    public void menuLogado() {
        Maquina maquina = new Maquina();
        maquina.menuMaquina();
    }

    public void listarUsuarios() {
        System.out.println("\n" + negrito + magenta + enfeite15 + " LISTA DE USUÁRIOS " + enfeite15 + padrao);
        System.out.println(negrito + igual30 + padrao);

        List<Usuario> usuarios = con.query("SELECT * FROM usuario;",
                new BeanPropertyRowMapper<>(Usuario.class));
        for (int i = 0; i < usuarios.size(); i++) {
            Usuario usuarioDaLista = usuarios.get(i);
            System.out.printf("""
                            ID do usuário: %d
                            Nome: %s
                            Empresa: %s
                            Cargo: %s
                            """, usuarioDaLista.getIdUsuario(), usuarioDaLista.getNome(),
                    usuarioDaLista.getEmpresa(), usuarioDaLista.getCargo());
            System.out.println(negrito + igual30 + padrao);
            if (usuarios.size() == (i+1)) {
                break;
            }
        }
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getEmpresa() {
        return empresa;
    }

    public void setEmpresa(String empresa) {
        this.empresa = empresa;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public Scanner getScanInt() {
        return scanInt;
    }

    public void setScanInt(Scanner scanInt) {
        this.scanInt = scanInt;
    }

    public Scanner getScanString() {
        return scanString;
    }

    public void setScanString(Scanner scanString) {
        this.scanString = scanString;
    }
}

package ComBanco;

import SemBanco.Relatorios.App.Maquinario;
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

    ConexaoBD conexao = new ConexaoBD();
    JdbcTemplate con = conexao.getConexaoBanco();

    public void menu() {
        System.out.println("Bem-vindo ao sistema de monitoramento Health Tech Solutions!");
        while (true) {
            System.out.println("""
                    Selecione uma opção:
                    1. Cadastro
                    2. Login
                    3. Sair""");
            Integer opcaoEscolhida = scanInt.nextInt();

            switch (opcaoEscolhida) {
                case 1:
                    cadastrar();
                case 2:
                    logar();
                case 3:
                    System.out.println("Até logo!");
                    return;
                default:
                    System.out.println("Opção inválida. Tente novamente.");
                    break;
            }
        }
    }

    public void cadastrar() {
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
            System.out.println("Nome de usuário já existe! Escolha outro nome.");
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
            System.out.println("""
                    Usuário cadastrado com sucesso!
                    Você está sendo redirecionado para o Login...""");
            logar();
        }
    }

    public void logar() {
        System.out.println("Digite o nome de usuário:");
        String nomeLogin = scanString.nextLine();
        System.out.println("Digite a senha:");
        String senhaLogin = scanString.nextLine();

        List<Usuario> login = con.query(
                "SELECT nome, senha FROM usuario", new BeanPropertyRowMapper<>(Usuario.class));

        boolean loginValidado = false;
        for (Usuario u : login) {
            if (u.getNome().equals(nomeLogin) && u.getSenha().equals(senhaLogin)) {
                loginValidado = true;
                System.out.println("Entrando...");
                menuLogado();
                break;
            }
        }

        if (!loginValidado) {
            System.out.println(""" 
            Nome de usuário ou senha incorretos!
            Ou talvez você não possua um cadastro
            """);

            while (true) {
                System.out.println("""
                        1- Continuar no Login
                        2- Fazer cadastro
                        """);
                Integer escolha = scanInt.nextInt();

                if (escolha == 1) {
                    // continua no login
                    break;
                } else if (escolha == 2) {
                    cadastrar();
                    return;
                } else {
                    System.out.println("Opção inválida!");
                }
            }
        }
    }

    public void menuLogado() {
        Maquina maquina = new Maquina();
        maquina.menuMaquina();
    }

    public void listarUsuarios() {
        System.out.println("Lista de usuários:");

        List<Usuario> usuarios = con.query("SELECT * FROM usuario;",
                new BeanPropertyRowMapper<>(Usuario.class));
        for (int i = 0; i < usuarios.size(); i++) {
            System.out.println("=".repeat(30));
            Usuario usuarioDaLista = usuarios.get(i);
            System.out.printf((i+1) + """
                            ID do usuário: %d
                            Nome: %s
                            Empresa: %s
                            Cargo: %s
                            """, usuarioDaLista.getIdUsuario(), usuarioDaLista.getNome(),
                    usuarioDaLista.getEmpresa(), usuarioDaLista.getCargo());
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

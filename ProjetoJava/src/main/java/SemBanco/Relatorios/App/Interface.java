package SemBanco.Relatorios.App;

import java.util.Scanner;

import SemBanco.Relatorios.RelatorioUsuario;
import SemBanco.Relatorios.RelatorioMaquinario;
import SemBanco.Relatorios.Relatorio;
import org.springframework.jdbc.core.JdbcTemplate;


public class Interface {
    public static void main(String[] args) {
        Conexao conexao = new Conexao();
        JdbcTemplate con = conexao.getConexaoDoBanco();

        Scanner scanner = new Scanner(System.in);

        Usuario usuario = null;
        Maquinario maquina = null;

        //cadastro de usuários

        Usuario usuario1 = new Usuario("Bruna", "sptech", "Health Tech Solutions", "admin");
        usuario1.addUsuarioCadastrado(usuario1);
        Usuario usuario2 = new Usuario("Lucas", "sptech", "Health Tech Solutions", "Analista");
        usuario2.addUsuarioCadastrado(usuario2);
        Usuario usuario3 = new Usuario("Luanna", "sptech", "Health Tech Solutions", "Desenvolvedora");
        usuario3.addUsuarioCadastrado(usuario3);

        //cadastro de máquinas

        Maquinario maquinario1 = new Maquinario("Ultrasssom", "Logic 2100", "35863-00");
        Maquinario maquinario2 = new Maquinario(
                "Máquina de Anestesia",
                "Flow-c",
                "935820-23");
        maquinario1.addMaquinarioCadastrado(maquinario1);
        maquinario2.addMaquinarioCadastrado(maquinario2);


        Boolean loginRealizado = false;

        System.out.println("Bem vindo ao sistema de monitoramento Health Tech Solutions!");
        while (true) {
            System.out.println("Selecione uma opção:");
            System.out.println("1. Cadastro");
            System.out.println("2. Login");
            System.out.println("3. Sair");

            int opcao = scanner.nextInt();

            switch (opcao) {
                case 1:
                    System.out.println("Digite o nome do usuário:");
                    String nomeCadastro = scanner.next();

                    boolean nomeJaExiste = false;
                    for (Usuario u : Usuario.getUsuariosCadastrados()) {
                        if (u.getNome().equals(nomeCadastro)) {
                            nomeJaExiste = true;
                            break;
                        }
                    }


                    if (nomeJaExiste) {
                        System.out.println("Nome de usuário já existe. Escolha outro nome.");
                    } else {
                        System.out.println("Digite a senha:");
                        String senhaCadastro = scanner.next();
                        System.out.println("Digite a empresa:");
                        String empresaCadastro = scanner.next();
                        System.out.println("Digite o cargo:");
                        String cargoCadastro = scanner.next();


                        con.update(
                                "INSERT INTO usuario (nome, senha, empresa, cargo) VALUES (?, ?, ?, ?);",
                                nomeCadastro, senhaCadastro, empresaCadastro, cargoCadastro);
                        usuario = new Usuario(nomeCadastro, senhaCadastro, empresaCadastro, cargoCadastro);
                        usuario.addUsuarioCadastrado(usuario);

                        System.out.println("Usuário cadastrado com sucesso!");
                    }
                    break;
                case 2:

                    System.out.println("Digite o nome de usuário:");
                    String nomeLogin = scanner.next();
                    System.out.println("Digite a senha:");
                    String senhaLogin = scanner.next();

                    boolean loginSucesso = false;
                    for (Usuario u : Usuario.getUsuariosCadastrados()) {
                        if (u.validarLogin(nomeLogin, senhaLogin)) {
                            System.out.println("Login realizado com sucesso!");
                            loginSucesso = true;
                            loginRealizado = true;
                            usuario = u;
                            break;
                        }
                    }

                    if (!loginSucesso) {
                        System.out.println("Nome de usuário ou senha inválidos.");
                    }
                    break;
                case 3:
                    System.out.println("Saindo...");
                    loginRealizado = false;
                    scanner.close();
                    System.exit(0);
                    break;
                default:
                    System.out.println("Opção inválida. Tente novamente.");
                    break;
            }

            while (loginRealizado) {

                usuario.menuMaquina();

                int opcaoMenu = scanner.nextInt();

                switch (opcaoMenu) {
                    case 1:
                        System.out.println("Digite o tipo de máquina:");
                        String tipoMaquina = scanner.next();
                        System.out.println("Digite o modelo da máquina:");
                        String nomeMaquina = scanner.next();
                        System.out.println("Número de série:");
                        String numSerie = scanner.next();

                        boolean serieJaExiste = false;
                        for (Maquinario m : Maquinario.getMaquinarioCadastrados()) {
                            if (m.getNumSerie().equals(numSerie)) {
                                serieJaExiste = true;
                                break;
                            }
                        }
                        if (serieJaExiste) {
                            System.out.println("Número de série já existe.");
                        } else {

                            con.update("INSERT INTO maquina (tipo, modelo, numeroSerie) VALUES (?, ?, ?);",
                                    tipoMaquina, nomeMaquina, numSerie);
                            maquina = new Maquinario(tipoMaquina, nomeMaquina, numSerie);
                            maquina.addMaquinarioCadastrado(maquina);

                            System.out.println("Máquina cadastrada com sucesso!");
                        }


                        break;
                    case 2:
                            System.out.println("Lista de Máquinas:");
                            for (int i = 0; i < Maquinario.getMaquinarioCadastrados().size(); i++) {
                                Maquinario maquinarioDaLista = Maquinario.getMaquinarioCadastrados().get(i);
                                System.out.println("=".repeat(30));
                                System.out.println((i + 1) + ".Tipo de máquina: " + maquinarioDaLista.getTipoMaquina()
                                        + "\nModelo da máquina: " + maquinarioDaLista.getModeloMaquina()
                                        + "\nNúmero de série: " + maquinarioDaLista.getNumSerie());

                            }

                            System.out.println("""
                                    Escolha uma opção:
                                    1. Voltar ao menu
                                    2. Criar relatório de máquinas
                                    """);
                            Integer numDigitado = scanner.nextInt();

                            switch (numDigitado) {
                                case 1:
                                    usuario.menuMaquina();
                                    break;
                                case 2:
                                    if (!Maquinario.getMaquinarioCadastrados().isEmpty()) {
                                        Relatorio relatorioMaquina = new RelatorioMaquinario(maquina);
                                        relatorioMaquina.gerarCabecalho();
                                        relatorioMaquina.gerarCorpo();
                                        relatorioMaquina.gerarRodape();
                                        relatorioMaquina.imprimir();
                                        System.out.println("Relatório de Máquinas criado com sucesso\n");
                                    }

                            }
                        break;
                    case 3:
                        System.out.println("Lista de Usuários:");
                        for (int i = 0; i < Usuario.getUsuariosCadastrados().size(); i++) {
                            Usuario usuarioDaLista = Usuario.getUsuariosCadastrados().get(i);
                            System.out.println("=".repeat(60));
                            System.out.println((i + 1) + ". Nome: " + usuarioDaLista.getNome() + ", Cargo: " +
                                    usuarioDaLista.getCargo()
                                    + ", Empresa: " + usuarioDaLista.getEmpresa());
                        }
                        System.out.println("""
                                Escolha uma opção:
                                1. Voltar ao menu
                                2. Criar relatório de usuários
                                """);
                        numDigitado = scanner.nextInt();

                        switch (numDigitado) {
                            case 1:

                                break;
                            case 2:
                                if (!Usuario.getUsuariosCadastrados().isEmpty()) {
                                    Relatorio relatorioUsuarios = new RelatorioUsuario(usuario);
                                    relatorioUsuarios.gerarCabecalho();
                                    relatorioUsuarios.gerarCorpo();
                                    relatorioUsuarios.gerarRodape();
                                    relatorioUsuarios.imprimir();
                                    System.out.println("Relatório de Usuários criado com sucesso");
                                }
                                break;
                        }

                        break;
                    case 4:
                        System.out.println("Saindo...");
                        System.out.println("Até logo!");
                        loginRealizado = false;
                        scanner.close();
                        System.exit(0);
                        break;
                    default:
                        System.out.println("Opção inválida. Tente novamente.");
                        break;

                }
            }
        }
    }

}



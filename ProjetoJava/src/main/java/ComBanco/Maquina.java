package ComBanco;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Scanner;

public class Maquina {
    private Integer idMaquina;
    private String tipo;
    private String modelo;
    private String numeroSerie;

    private Scanner scanInt = new Scanner(System.in);
    private Scanner scanString = new Scanner(System.in);

    // cores
    private String padrao = "\u001B[0m"; // redefinir a formatação depois de estilizar
    private String negrito = "\u001B[1m";
    private String vermelho = "\u001B[31m";
    private String verde = "\u001B[32m";
    private String amarelo = "\u001B[33m";
    private String azul = "\u001B[34m";
    private String magenta = "\u001B[35m";
    private String ciano = "\u001B[36m";

    private String enfeite15 = "-".repeat(15);
    private String igual30 = "=".repeat(30);


    ConexaoBD conexao = new ConexaoBD();
    JdbcTemplate con = conexao.getConexaoBanco();


    public void menuMaquina() {
        while (true) {
            System.out.printf("""
                
                +---------------------------+
                |        %s    MENU     %s      |
                +---------------------------+
                |%s Opções:                   |
                | 1. Cadastrar máquina      |
                | 2. Monitorar máquina      |
                | 3. Listar processos       |
                | 4. Listar máquinas        |
                | 5. Listar usuários        |
                | 6. Sair                 %s  |
                +---------------------------+
                """, azul, padrao, negrito, padrao);

            if (scanInt.hasNextInt()) {
                Integer opcaoMenu = scanInt.nextInt();
                switch (opcaoMenu) {
                    case 1:
                        cadastrarMaquinas();
                        break;
                    case 2:
                        Monitoramento monitoramento = new Monitoramento();
                        monitoramento.monitorarMaquinas();
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
                        System.out.println(negrito + "Saindo da sua conta..." + padrao);
                        return;
                }
            } else {
                String entradaInvalida = scanInt.next();
                System.out.printf("%s'%s' é uma opção inválida! %s", vermelho, entradaInvalida, padrao);
            }
        }
    }

    public void cadastrarMaquinas() {
        System.out.println("\n" + negrito + magenta + enfeite15 + " CADASTRO DE MÁQUINAS " + enfeite15 + padrao);

        System.out.println("Digite o tipo de máquina:");
        String tipoMaquina = scanString.nextLine();
        System.out.println("Digite o modelo da máquina:");
        String modeloMaquina = scanString.nextLine();
        System.out.println("Número de série:");
        String numSerie = scanString.nextLine();

        con.update(
                "INSERT INTO maquina (tipo, modelo, numeroSerie) VALUES (?, ?, ?);",
                tipoMaquina, modeloMaquina, numSerie);

        System.out.println("");
        System.out.println(verde + "Máquina cadastrada com sucesso!" + padrao);
    }

    public void listarMaquinas() {
        System.out.println("\n" + negrito + magenta + enfeite15 + " LISTA DE MÁQUINAS " + enfeite15 + padrao);
        System.out.println(negrito + igual30 + padrao);

        List<Maquina> maquinas = con.query("SELECT * FROM maquina;",
                new BeanPropertyRowMapper<>(Maquina.class));

        for (int i = 0; i < maquinas.size(); i++) {
            Maquina maquinaDaLista = maquinas.get(i);
            System.out.printf("""
                            ID da máquina: %d
                            Tipo da máquina: %s
                            Modelo da máquina: %s
                            Número de série: %s
                            """, maquinaDaLista.getIdMaquina(), maquinaDaLista.getTipo(),
                    maquinaDaLista.getModelo(), maquinaDaLista.getNumeroSerie());
            System.out.println(negrito + igual30 + padrao);
            if (maquinas.size() == (i+1)) {
                return;
            }
        }
    }

    public Integer getIdMaquina() {
        return idMaquina;
    }

    public void setIdMaquina(Integer idMaquina) {
        this.idMaquina = idMaquina;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getNumeroSerie() {
        return numeroSerie;
    }

    public void setNumeroSerie(String numeroSerie) {
        this.numeroSerie = numeroSerie;
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

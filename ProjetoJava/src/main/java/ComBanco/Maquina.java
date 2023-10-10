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

    ConexaoBD conexao = new ConexaoBD();
    JdbcTemplate con = conexao.getConexaoBanco();


    public void menuMaquina() {
        while (true) {
            System.out.println("""
                Opções:
                1. Cadastrar máquina
                2. Monitorar máquinas
                3. Listar máquinas
                4. Listar usuários
                5. Sair""");
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
                    listarMaquinas();
                    break;
                case 4:
                    Usuario usuario = new Usuario();
                    usuario.listarUsuarios();
                    break;
                case 5:
                    return;
            }
        }
    }

    public void cadastrarMaquinas() {
        System.out.println("Digite o tipo de máquina:");
        String tipoMaquina = scanString.nextLine();
        System.out.println("Digite o modelo da máquina:");
        String modeloMaquina = scanString.nextLine();
        System.out.println("Número de série:");
        String numSerie = scanString.nextLine();

        con.update(
                "INSERT INTO maquina (tipo, modelo, numeroSerie) VALUES (?, ?, ?);",
                tipoMaquina, modeloMaquina, numSerie);

        System.out.println("Máquina cadastrada com sucesso!");
    }

    public void listarMaquinas() {
        List<Maquina> maquinas = con.query("SELECT * FROM maquina;",
                new BeanPropertyRowMapper<>(Maquina.class));

        System.out.println("Lista de máquinas:");
        for (int i = 0; i < maquinas.size(); i++) {
            System.out.println("=".repeat(30));
            Maquina maquinaDaLista = maquinas.get(i);
            System.out.printf((i+1) + """
                            .
                            ID da máquina: %d
                            Tipo da máquina: %s
                            Modelo da máquina: %s
                            Número de série: %s
                            """, maquinaDaLista.getIdMaquina(), maquinaDaLista.getTipo(),
                    maquinaDaLista.getModelo(), maquinaDaLista.getNumeroSerie());
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

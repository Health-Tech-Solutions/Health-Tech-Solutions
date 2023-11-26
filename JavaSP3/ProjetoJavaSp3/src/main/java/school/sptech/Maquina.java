package school.sptech;

import org.springframework.jdbc.core.BeanPropertyRowMapper;

import school.sptech.DAO.MaquinaDAO;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.List;
import java.util.Scanner;

public class Maquina {
    private int idMaquina;
    private String tipo;
    private String modelo;
    private String numeroSerie;
    private Scanner leitorInteiros = new Scanner(System.in);
    private Scanner leitorStrings = new Scanner(System.in);
    private String MAC;
    private boolean isRowMapper;
    private MaquinaDAO maquinaDAO;

    public Maquina() {
        this.maquinaDAO = new MaquinaDAO();
        this.MAC = pegarEnderecoMac();
        verificarExistenciaMaquina();
    }

    public Maquina(boolean isRowMapper) {
        this.isRowMapper = isRowMapper;
    }

    public String pegarEnderecoMac()  {
        StringBuilder enderecoMac = new StringBuilder();
        try{
            InetAddress ipLocal = InetAddress.getLocalHost();
            NetworkInterface interfaceRede = NetworkInterface.getByInetAddress(ipLocal);
            byte[] enderecoBytesMac = interfaceRede.getHardwareAddress();

            for (int i = 0;i < enderecoBytesMac.length; i++) {
                enderecoMac.append(String.format("%02X%s", enderecoBytesMac[i], (i < enderecoBytesMac.length - 1) ? "-" : ""));
            }
//            maquinaDAO.inserirEnderecoMac(enderecoMac.toString());
        }catch (UnknownHostException  | SocketException exception){
            exception.printStackTrace();
        }
        return enderecoMac.toString();
    }

    public void verificarExistenciaMaquina(){
        boolean jaExiste = false;
        List<Maquina> maquinas =  maquinaDAO.listarMaquinas();

            for (Maquina maquina : maquinas) {
                if(maquina.getMAC() != null){
                    if(maquina.getMAC().equalsIgnoreCase(this.getMAC())){
                        this.setIdMaquina(maquina.getIdMaquina());
                        jaExiste = true;
                    }
                }
            }
            Monitoramento monitoramento  = new Monitoramento();
            if(jaExiste){
                monitoramento.monitorarMaquinas(this.idMaquina);
            } else {
                this.setIdMaquina(maquinas.size() + 1);
                maquinaDAO.inserirMaquinarioMac(this.idMaquina,1,1,this.MAC);
                monitoramento.monitorarMaquinas(this.idMaquina);
            }

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
                        informacoes.monitorarMaquinas(this.idMaquina);
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
        }
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

    public String getMAC() {
        return MAC;
    }

    public void setMAC(String MAC) {
        this.MAC = MAC;
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

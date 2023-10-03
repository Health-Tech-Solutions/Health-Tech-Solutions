package SemBanco.Relatorios.App;

import java.util.*;

import org.springframework.jdbc.core.JdbcTemplate;

public class Usuario {
    private String nome;
    private String senha;
    private String empresa;
    private String cargo;

    private static List<Usuario> usuariosCadastrados = new ArrayList<>();

    private Conexao conexaoLogin = new Conexao();
    private JdbcTemplate con = conexaoLogin.getConexaoDoBanco();



    public Usuario(String nome, String senha, String empresa, String cargo) {
        this.nome = nome;
        this.senha = senha;
        this.empresa = empresa;
        this.cargo = cargo;
    }



    public boolean validarLogin(String nome, String senha) {
        for (Usuario usuario : usuariosCadastrados) {
            if (usuario.getNome().equals(nome) && usuario.getSenha().equals(senha)) {
                return true; // Se encontrou um usuário válido, retorna true
            }
        }
        return false; // Se não encontrou nenhum usuário válido, retorna false
    }


    public void menuMaquina() {
        System.out.println("\nOpções:");
        System.out.println("1. Cadastrar Máquina");
        System.out.println("2. Listar Máquinas");
        System.out.println("3. Listar usuários");
        System.out.println("4. Sair\n");
    }

    public static List<Usuario> getUsuariosCadastrados() {
        return usuariosCadastrados;
    }

    public void addUsuarioCadastrado(Usuario usuario){
        usuariosCadastrados.add(usuario);
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

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }
}

package school.sptech.DAO;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.Conexoes.Conexao;
import school.sptech.Usuario;

import java.util.List;

public class UsuarioDAO {

    Conexao conexao = new Conexao();
    JdbcTemplate con = conexao.getConexao();

    public List<Usuario> listarUsuarios(){
        List<Usuario> usuarios = con.query("SELECT * FROM usuario",new BeanPropertyRowMapper<>(Usuario.class));
        return usuarios;
    }

    public boolean verificarExistenciaNome(String nome){
        List<Usuario> nomes = con.query("SELECT nome FROM usuario",
                new BeanPropertyRowMapper<>(Usuario.class));
        for (Usuario usuario : nomes) {
            if(usuario.getNome().equalsIgnoreCase(nome)){
                return true;
            }
        }
        return false;
    }

    public void inserirUsuario(String nome,String senha, String empresa, String cargo){
        con.update("INSERT INTO usuario (nome, senha, empresa, cargo) VALUES (?, ?, ?, ?);",
                nome, senha, empresa, cargo);
    }

    public boolean verificarSenha(String nome,String senha){
        for (Usuario usuario : listarUsuarios()) {
            if(usuario.getNome().equals(nome) && usuario.getSenha().equals(senha)){
                return true;
            }
        }
        return false;
    }

}

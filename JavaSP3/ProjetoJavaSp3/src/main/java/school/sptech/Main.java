package school.sptech;

public class Main {
    public static void main(String[] args) {

//        Conexao conexao = new Conexao();
//        JdbcTemplate con = conexao.getConexao();
//
//        List<Componente> componentes = con.query("SELECT * FROM peca", new ComponenteRowMapper());
//
//        System.out.println(componentes.toString());

        Maquina maq = new Maquina();
        maq.menu();
        // Usuario user = new Usuario();
        // user.menu();
    }
}
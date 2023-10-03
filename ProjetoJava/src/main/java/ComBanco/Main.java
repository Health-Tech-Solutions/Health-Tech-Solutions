package ComBanco;

import SemBanco.Relatorios.App.Maquinario;
import org.springframework.jdbc.core.JdbcTemplate;

public class Main {
    public static void main(String[] args) {
        Usuario user = new Usuario();
        user.menu();
    }
}

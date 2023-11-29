package school.sptech.RowMapper;

import org.springframework.jdbc.core.RowMapper;
import school.sptech.Componente;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ComponenteRowMapper implements RowMapper<Componente> {
    @Override
    public Componente mapRow(ResultSet resultSet, int i) throws SQLException {
        Componente componente = new Componente();
        componente.setIdComponente(resultSet.getInt("idPeca"));
        componente.setNome(resultSet.getString("nome"));
        componente.setModelo(resultSet.getString("modelo"));
        componente.setFkMaquina(resultSet.getInt("fkMaquinario"));
        componente.setFkTipoRegistro(resultSet.getInt("fkTipoRegistro"));
        componente.setValorLimite(resultSet.getDouble("valor"));
        return componente;
    }


}

package school.sptech.RowMapper;

import org.springframework.jdbc.core.RowMapper;
import school.sptech.Maquina;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MaquinaRowMapper implements RowMapper {
    @Override
    public Object mapRow(ResultSet resultSet, int i) throws SQLException {
     Maquina maquina = new Maquina(true);
          maquina.setIdMaquina(resultSet.getInt("idMaquinario"));
         maquina.setMAC(resultSet.getString("macAdress"));
        return maquina;
    }
}

package App;


import java.util.ArrayList;
import java.util.List;

public class Maquinario {

    private String tipoMaquina;

    private String modeloMaquina;

    private String numSerie;

    private static List<Maquinario> maquinarioCadastrados = new ArrayList<>();

    public Maquinario(String tipoMaquina, String modeloMaquina, String numSerie) {
        this.tipoMaquina = tipoMaquina;
        this.modeloMaquina = modeloMaquina;
        this.numSerie = numSerie;
    }


    public static List<Maquinario> getMaquinarioCadastrados() {
        return maquinarioCadastrados;
    }

    public void addMaquinarioCadastrado(Maquinario maquinario){
        maquinarioCadastrados.add(maquinario);
    }

    public String getTipoMaquina() {
        return tipoMaquina;
    }


    public String getModeloMaquina() {
        return modeloMaquina;
    }




    public String getNumSerie() {
        return numSerie;
    }


}




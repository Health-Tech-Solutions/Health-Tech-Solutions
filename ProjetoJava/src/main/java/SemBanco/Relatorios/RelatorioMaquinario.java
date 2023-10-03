package SemBanco.Relatorios;

import SemBanco.Relatorios.App.Maquinario;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;

public class RelatorioMaquinario implements Relatorio{


    private Maquinario maquinario;
    private Document documentoMaquinario;
    private String pathRelatorio = "RelatorioMaquinario.pdf";

    public RelatorioMaquinario(Maquinario maquinario){
        this.maquinario = maquinario;
        this.documentoMaquinario = new Document();
        try {
            PdfWriter.getInstance(this.documentoMaquinario, new FileOutputStream(pathRelatorio));
            this.documentoMaquinario.open();
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
    @Override
    public void gerarCabecalho() {
        Paragraph paragraphTitulo = new Paragraph();
        paragraphTitulo.setAlignment(Element.ALIGN_CENTER);
        paragraphTitulo.add(
                new Chunk("Relatório de máquinas cadastradas", new Font(Font.TIMES_ROMAN, 20)));


        this.documentoMaquinario.add(paragraphTitulo);

        this.documentoMaquinario.add(new Paragraph("  "));


    }

    @Override
    public void gerarCorpo() {
        Paragraph paragraphMaquinario = new Paragraph();
        paragraphMaquinario.setAlignment(Element.ALIGN_LEFT);
        paragraphMaquinario.add(new Chunk("Máquinas cadastradas:", new Font(Font.TIMES_ROMAN, 15)));

        this.documentoMaquinario.add(paragraphMaquinario);
        this.documentoMaquinario.add(new Paragraph("  "));

        for (Maquinario maquinario : Maquinario.getMaquinarioCadastrados()){
            Paragraph paragraphDadosMaquina = new Paragraph();
            paragraphDadosMaquina.add("Tipo da máquina: " + maquinario.getTipoMaquina() + "\nModelo da Máquina: " + maquinario.getModeloMaquina()
                    + "\nNúmero de Série: " + maquinario.getNumSerie());


            this.documentoMaquinario.add(paragraphDadosMaquina);
            this.documentoMaquinario.add(new Paragraph("=".repeat(50), new Font(Font.TIMES_ROMAN)));
        }

    }

    @Override
    public void gerarRodape() {
        Paragraph paragraphRodape = new Paragraph();
        paragraphRodape.setAlignment(Element.ALIGN_CENTER);
        paragraphRodape.add(
                new Chunk("Relatório gerado por Health Tech Solutions", new Font(Font.TIMES_ROMAN, 9)));
        this.documentoMaquinario.add(paragraphRodape);

    }

    @Override
    public void imprimir() {

        if(this.documentoMaquinario.isOpen() && this.documentoMaquinario != null){
            this.documentoMaquinario.close();
        }

    }
}

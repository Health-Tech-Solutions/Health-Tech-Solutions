package SemBanco.Relatorios;

import SemBanco.Relatorios.App.Usuario;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;

public class RelatorioUsuario implements Relatorio{


    private Usuario usuario;
    private Document documentoUsuario;
    private String pathRelatorio = "RelatorioUsuario.pdf";

    public RelatorioUsuario(Usuario usuario){
        this.usuario = usuario;
        this.documentoUsuario = new Document();
        try {
            PdfWriter.getInstance(this.documentoUsuario, new FileOutputStream(pathRelatorio));
            this.documentoUsuario.open();
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
    @Override
    public void gerarCabecalho() {
        Paragraph paragraphTitulo = new Paragraph();
        paragraphTitulo.setAlignment(Element.ALIGN_CENTER);
        paragraphTitulo.add(
                new Chunk("Relatório de usuários cadastrados", new Font(Font.TIMES_ROMAN, 20)));


        this.documentoUsuario.add(paragraphTitulo);

        this.documentoUsuario.add(new Paragraph("  "));


    }

    @Override
    public void gerarCorpo() {
        Paragraph paragraphUsuarios = new Paragraph();
        paragraphUsuarios.setAlignment(Element.ALIGN_LEFT);
        paragraphUsuarios.add(new Chunk("Usuários cadastrados:", new Font(Font.TIMES_ROMAN, 15)));

        this.documentoUsuario.add(paragraphUsuarios);
        this.documentoUsuario.add(new Paragraph("  "));

        for (Usuario usuario : Usuario.getUsuariosCadastrados()){
            Paragraph paragraphDadosUsuario = new Paragraph();
            paragraphDadosUsuario.add("Nome do usuário: " + usuario.getNome() + "\nEmpresa: " + usuario.getEmpresa()
                    + "\nCargo: " + usuario.getCargo());


            this.documentoUsuario.add(paragraphDadosUsuario);
            this.documentoUsuario.add(new Paragraph("=".repeat(70), new Font(Font.TIMES_ROMAN)));
        }

    }

    @Override
    public void gerarRodape() {
        Paragraph paragraphRodape = new Paragraph();
        paragraphRodape.setAlignment(Element.ALIGN_CENTER);
        paragraphRodape.add(
                new Chunk("Relatório gerado por Health Tech Solutions", new Font(Font.TIMES_ROMAN, 9)));
        this.documentoUsuario.add(paragraphRodape);

    }

    @Override
    public void imprimir() {

        if(this.documentoUsuario.isOpen() && this.documentoUsuario != null){
            this.documentoUsuario.close();
        }

    }
}

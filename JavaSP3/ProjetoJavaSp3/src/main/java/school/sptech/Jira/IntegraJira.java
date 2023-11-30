package school.sptech.Jira;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class IntegraJira {

    private static final String EMAIL = "htssptech@gmail.com";
    private static final String TOKEN_API = "";
    private static final String AUTH = EMAIL + ":" + TOKEN_API;
    private static final String AUTH_HEADER = "";


    private static String nome;
    private static String mensagem;

    public static void mensagemChamado(String nome){
        IntegraJira.nome = nome;
        IntegraJira.mensagem = String.format("Teste feito pelo: %s",nome);
    }

    public static void postarChamado (){

        try {
            String url = "";
            String payload = mensagem;
            HttpRequest request = HttpRequest.newBuilder().uri(URI.create(url)).header("Content-Type", "application/json")
                    .header("Accept", "application/json").header("Authorization", AUTH_HEADER).POST(HttpRequest.BodyPublishers.ofString(payload))
                    .build();
            HttpClient client = HttpClient.newHttpClient();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        }catch (Exception e){
            e.printStackTrace();
        }

    }




}
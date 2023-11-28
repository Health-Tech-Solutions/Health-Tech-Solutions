package school.sptech;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;

public class IntegracaoJira {
        public static void criarChamado() {
            try {
                String jiraUrl = "https://monitoramento-hts.atlassian.net/rest/api/3/issue/DEMO";

                String apiKey = "ATATT3xFfGF0b4Enw92IvCx-VurUIckZSMSKe5BWuhVxrZKGngXUaPDdDC-M8pC_yZBbmM9bNm3ags-4F3H_MoAkyGWY85QlVXudBIPohp4PSUo0aWU03tmyui18hHJ8hYGL2wKTKxU4265dSnxT02jl4k_SW_HUwTMZyh9aCuxc6Y955EF-Wuw=7BB5D73E";

                // TODO: substituir as coisas no json e ver exemplo do Arthur
                String jsonBody = "{ \"fields\": { \"project\": { \"key\": \"DEMO\" }," +
                        " \"summary\": \"Alerta de máquina!\", \"description\": \"O limite foi atingido.\"," +
                        " \"issuetype\": { \"name\": \"Bug\" } } }";

                HttpClient httpClient = HttpClients.createDefault();
                HttpPost httpPost = new HttpPost(jiraUrl);
                httpPost.setHeader("Content-Type", "application/json");
                httpPost.setHeader("Authorization", "Basic " + apiKey);

                httpPost.setEntity(new StringEntity(jsonBody));

                HttpResponse response = httpClient.execute(httpPost);

                if (response.getStatusLine().getStatusCode() == 201) {
                    System.out.println("Chamado no Jira aberto com sucesso!");
                } else {
                    System.err.println("Falha ao abrir o chamado no Jira. Código de resposta: " + response.getStatusLine().getStatusCode());
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
}


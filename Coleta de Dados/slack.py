import requests
import json

def abrir_chamado():
    # token do bot
    slack_token = ''
    
    # canal que o bot irá mandar as mensagens
    slack_channel = 'C065QKU4RJM'

    # Configurações do bot com o python
    def post_message_to_slack(text, blocks = None):
        return requests.post('https://slack.com/api/chat.postMessage', {
            'token': slack_token,
            'channel': slack_channel,
            'text': text,
            'blocks': json.dumps(blocks) if blocks else None
        }).json()	

    # Escolhendo mensagem para ser enviada
    slack_info = f"""

        🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥                                                                                                     
    A porcentagem de uso da sua máquina está ultrapassando o limite estipulado, está em 20%
    
    """
    post_message_to_slack(slack_info)
    print(slack_info)
abrir_chamado()




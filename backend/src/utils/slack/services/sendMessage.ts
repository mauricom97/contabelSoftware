import axios from 'axios';
import { UrlsHooksSlack } from '../interfaces';

const sendMessage = async (message: { text:string }, category:string) => {
    const urls: UrlsHooksSlack = {
        bugs: process.env.SLACK_HOOK_BUGS as string,
    }
    axios.post(urls[category as keyof UrlsHooksSlack], message)
        .then(response => {
            if (response.status === 200) {
                console.log('Mensagem enviada com sucesso!');
            } else {
                console.log(`Falha ao enviar a mensagem. Status code: ${response.status}, Response: ${response.data}`);
            }
        })
        .catch(error => {
            console.error('Erro ao enviar a mensagem:', error);
        });
};
export default sendMessage;
from dbconnection import create, retrieveAll, retrieve, update, delete
from datetime import datetime
today = datetime.today()
todayfmt = today.strftime("%Y-%m-%d %H:%M:%S")

# create('TPSID0F4', 'Teste', 'Testado', todayfmt, 0)
#resultado = retrieve(35)
#resultado = retrieveAll()
#update('TPSI23ER', 'Trânsito parado.', 'Teste', '2020-06-10 22:16:00', 0, 31)
#delete(30)

from flask import Flask, request

app = Flask('UVApp')

@app.route('/api/createnotification/', methods=['POST'])
def createnotification():
    body = request.get_json()

    if "turma" not in body:
        return geraResponse(400, "O parêmetro turma é obrigatório.")
    if "text" not in body:
        return geraResponse(400, "O parêmetro text é obrigatório.")
    if "titulo" not in body:
        return geraResponse(400, "O parêmetro titulo é obrigatório.")
    if "date_time" not in body:
        return geraResponse(400, "O parêmetro date_time é obrigatório.")
    if "idUser" not in body:
        return geraResponse(400, "O parêmetro idUser é obrigatório.")

    notificacao = create(body["turma"], body["text"], body["titulo"], body["date_time"], body["idUser"])
    return geraResponse(200, "Notificação Criada", "notificationId", notificacao)

@app.route('/api/shownotifications/', methods = ['GET'])
def shownotifications():
    dados = retrieveAll()
    return geraResponse(200, "Notificações", "notificacao", dados)

@app.route('/api/shownotification/<id>', methods = ['GET'])
def shownotification(id):
    dados = retrieve(id)
    return geraResponse(200, "Notificações", "notificacao", dados)

@app.route('/api/updatenotification', methods=['PUT'])
def updatenotification():
    body = request.get_json()

    if "turma" not in body:
        return geraResponse(400, "O parêmetro turma é obrigatório.")
    if "text" not in body:
        return geraResponse(400, "O parêmetro text é obrigatório.")
    if "titulo" not in body:
        return geraResponse(400, "O parêmetro titulo é obrigatório.")
    if "date_time" not in body:
        return geraResponse(400, "O parêmetro date_time é obrigatório.")
    if "idUser" not in body:
        return geraResponse(400, "O parêmetro idUser é obrigatório.")

    notificacao = update(body["turma"], body["text"], body["titulo"], body["date_time"], body["idUser"], body["idNotification"])
    return geraResponse(200, "Notificação Atualizada", "notificationId", notificacao)

@app.route('/api/deletenotification/<id>', methods=['DELETE'])
def deletenotification(id):
    dados = delete(id)
    return geraResponse(200, "Notificação Deletada", "notificacao", dados)

def geraResponse(status, mensagem, nome_conteudo=False, conteudo=False):
    response = {}
    response["status"] = status
    response["mensagem"] = mensagem

    if (nome_conteudo and conteudo):
        response[nome_conteudo] = conteudo

    return response

if __name__ == "__main__":
    app.run()
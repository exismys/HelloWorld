from socket import AF_INET, SOCK_STREAM, socket

server_port = 12000

server_socket = socket(AF_INET, SOCK_STREAM)
server_socket.bind(('', server_port))
server_socket.listen(2)
print("The server is ready to receive.")

while True:
    connection_socket, addr = server_socket.accept()
    print("Connected with", addr)

    while True:
        sentence = connection_socket.recv(1024).decode()
        if not sentence:
            print("Connection closed by ", addr)
            break
        capitalized_sentence = sentence.upper()
        connection_socket.send((capitalized_sentence + f'({addr[1]})').encode())
    connection_socket.close()

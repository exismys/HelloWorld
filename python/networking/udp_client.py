from socket import AF_INET, SOCK_DGRAM, socket

server_name = 'localhost'
server_port = 12000

client_socket = socket(AF_INET, SOCK_DGRAM)

# We can additionally bind this socket with a port number
# which is otherwise handled by the OS internally

# client_socket.bind(('', 19157))

message = input("Enter lowercase sentence: ")

client_socket.sendto(message.encode(), (server_name, server_port))

modified_message, server_address = client_socket.recvfrom(2048)
print(modified_message.decode())
client_socket.close()

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
def create_chat_room name, description
  chat_room = ChatRoom.new
  chat_room.name = name
  chat_room.description = description
  chat_room.save
  chat_room
end

def create_user username, avatar_url, email, password
  user = User.new
  user.username = username
  user.avatar_url = avatar_url
  user.email = email
  user.password = password
  user.save
  user
end

def create_chat_room_user chat_room, user
  chat_room_user = ChatRoomUser.new
  chat_room_user.chat_room = chat_room
  chat_room_user.user = user
  chat_room_user.save
  chat_room_user
end

def create_message chat_room, user, content
  message = Message.new
  message.chat_room = chat_room
  message.user = user
  message.content = content
  message.save
  message
end

lobby = create_chat_room "Lobby", "Canal para chatear con el lobby del hotel"
restaurant = create_chat_room "Restaurant", "Canal para chatear con el restaurant del hotel"
loundry = create_chat_room "Lavanderia", "Canal para chatear con el servicio del hotel"

romer = create_user "romerramos", Faker::Avatar.image("rr", "36x36"), "romerramos@gmail.com", "18020036"
mariana = create_user "marianalegonia", Faker::Avatar.image("ml", "36x36"), "marianalegonia@gmail.com", "19565758"

create_chat_room_user lobby, romer
create_chat_room_user lobby, mariana

create_message lobby, romer, "Hablanding! probando"
create_message lobby, mariana, "Hola Romer"

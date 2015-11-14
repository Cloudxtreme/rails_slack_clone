# == Schema Information
#
# Table name: chat_room_users
#
#  id           :integer          not null, primary key
#  chat_room_id :integer
#  user_id      :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class ChatRoomUser < ActiveRecord::Base
  belongs_to :chat_room
  belongs_to :user
end
